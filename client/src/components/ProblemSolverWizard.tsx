import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  Scale,
  FileQuestion,
  Zap,
  Droplets,
  Truck,
  ArrowRight,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Phone,
  RefreshCw,
  Building2
} from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { sendAIChatMessage } from '../lib/api';
import { AISaathiResponse } from '../types';

interface ProblemCategory {
  id: string;
  title: string;
  icon: any;
  defaultPrompt: string;
  expectedJurisdiction: string;
  badgeColor: string;
}

const PROBLEM_CATEGORIES: ProblemCategory[] = [
  {
    id: 'pothole',
    title: 'Pothole & Broken Roads',
    icon: Truck,
    defaultPrompt: 'There is a severe pothole and broken road near my house creating traffic accidents. How do I get it fixed by the local municipal corporation?',
    expectedJurisdiction: 'MUNICIPAL',
    badgeColor: 'text-purple-700 bg-purple-100 dark:bg-purple-950/60 dark:text-purple-300'
  },
  {
    id: 'cybercrime',
    title: 'Online Financial Scam / UPI Fraud',
    icon: ShieldAlert,
    defaultPrompt: 'I was scammed online and money was deducted from my bank account via UPI. How do I immediately report and freeze the transaction?',
    expectedJurisdiction: 'CENTRAL (1930)',
    badgeColor: 'text-red-700 bg-red-100 dark:bg-red-950/60 dark:text-red-300'
  },
  {
    id: 'consumer',
    title: 'Consumer Product / Refund Dispute',
    icon: Scale,
    defaultPrompt: 'An e-commerce seller delivered a defective item and is refusing a refund or replacement. How do I file a consumer complaint?',
    expectedJurisdiction: 'CENTRAL (1915)',
    badgeColor: 'text-amber-700 bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300'
  },
  {
    id: 'garbage',
    title: 'Garbage & Overflowing Drains',
    icon: AlertTriangle,
    defaultPrompt: 'There is an open garbage dump and overflowing sewage drain on our street. How do I lodge a municipal sanitary grievance?',
    expectedJurisdiction: 'MUNICIPAL',
    badgeColor: 'text-orange-700 bg-orange-100 dark:bg-orange-950/60 dark:text-orange-300'
  },
  {
    id: 'electricity',
    title: 'Electricity Power Delay / Wrong Bill',
    icon: Zap,
    defaultPrompt: 'My electricity bill was erroneously inflated or power supply has frequent unannounced blackouts. How do I escalate to the state discom?',
    expectedJurisdiction: 'STATE DISCOM',
    badgeColor: 'text-yellow-700 bg-yellow-100 dark:bg-yellow-950/60 dark:text-yellow-300'
  },
  {
    id: 'gov_delay',
    title: 'Government Service Delay / No Action',
    icon: Building2,
    defaultPrompt: 'My application for a government certificate/pension has been pending for over 60 days without response from the officer. How do I file on CPGRAMS?',
    expectedJurisdiction: 'CENTRAL / STATE CPGRAMS',
    badgeColor: 'text-blue-700 bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300'
  }
];

export const ProblemSolverWizard: React.FC = () => {
  const { state: userState } = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<ProblemCategory | null>(null);
  const [customDetails, setCustomDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AISaathiResponse | null>(null);

  const handleSelectProblem = async (cat: ProblemCategory) => {
    setSelectedCategory(cat);
    setResult(null);
    setCustomDetails('');
    setLoading(true);

    try {
      const res = await sendAIChatMessage({
        message: cat.defaultPrompt,
        state: userState
      });
      if (res && res.data) {
        setResult(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDetails.trim()) return;

    setLoading(true);
    try {
      const prompt = selectedCategory
        ? `${selectedCategory.title}: ${customDetails}`
        : customDetails;

      const res = await sendAIChatMessage({
        message: prompt,
        state: userState
      });
      if (res && res.data) {
        setResult(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl overflow-hidden">
      
      {/* Top Header */}
      <div className="p-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Interactive Problem Solving Engine</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          What problem are you facing right now?
        </h2>
        <p className="text-xs sm:text-sm text-blue-200 mt-1 max-w-2xl leading-relaxed">
          Select an issue below. Gov Saathi determines the exact government jurisdiction (Central vs State vs Municipal Local Body) and provides step-by-step verified guidance.
        </p>
      </div>

      <div className="p-6">
        
        {/* Category Picker Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {PROBLEM_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory?.id === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelectProblem(cat)}
                className={`p-4 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 ring-2 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cat.badgeColor}`}>
                      {cat.expectedJurisdiction}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-3">
                    {cat.title}
                  </h4>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <span>Get Official Guidance</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="p-12 text-center rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              Identifying Government Jurisdiction...
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Cross-referencing verified municipal, state, and central government databases for {userState}.
            </p>
          </div>
        )}

        {/* Generated Guidance Solution */}
        {result && !loading && (
          <div className="rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 p-6 space-y-6 animate-in fade-in duration-300">
            
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-blue-200/60 dark:border-blue-900/40">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-600 text-white shadow-sm">
                  {result.jurisdiction} JURISDICTION
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-2">
                  {result.service?.name || result.category}
                </h3>
              </div>

              {result.service?.official_helpline && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-blue-700 dark:text-blue-300">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Helpline: {result.service.official_helpline}</span>
                </div>
              )}
            </div>

            {/* Answer explanation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Official Guidance Summary
              </h4>
              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                {result.answer}
              </p>
            </div>

            {/* Step-by-Step Instructions */}
            {result.steps && result.steps.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Step-by-Step Citizen Instructions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {result.steps.map((st) => (
                    <div key={st.step_number} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-2">
                        {st.step_number}
                      </div>
                      <div className="font-bold text-xs text-slate-900 dark:text-white">
                        {st.title}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                        {st.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements & Documents */}
            {result.documents && result.documents.length > 0 && (
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Documents You May Need to Have Ready
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {result.documents.map((doc, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Open Official Portal CTA */}
            {result.service?.official_website && (
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    Ready to complete your request?
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                      .gov.in verified
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    You will be directed to the official government portal.
                  </div>
                </div>

                <a
                  href={result.service.official_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-colors"
                >
                  <span>Open Official Platform</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
