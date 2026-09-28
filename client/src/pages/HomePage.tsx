import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  Zap,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  PhoneCall,
  FileText,
  Building,
  ExternalLink,
  Award
} from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { ServiceCard } from '../components/ServiceCard';
import { CategoryCard } from '../components/CategoryCard';
import { ProblemSolverWizard } from '../components/ProblemSolverWizard';
import { getCategories, getServices, getApps, getDigitalDocuments } from '../lib/api';
import { Category, GovernmentService, GovernmentApp, DigitalDocument } from '../types';

export const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredServices, setFeaturedServices] = useState<GovernmentService[]>([]);
  const [apps, setApps] = useState<GovernmentApp[]>([]);
  const [documents, setDocuments] = useState<DigitalDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [cats, servs, appList, docList] = await Promise.all([
          getCategories(),
          getServices(),
          getApps(),
          getDigitalDocuments()
        ]);
        setCategories(cats);
        setFeaturedServices(servs.slice(0, 6));
        setApps(appList.slice(0, 4));
        setDocuments(docList.slice(0, 6));
      } catch (e) {
        console.error('Home data load error', e);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  return (
    <div className="space-y-16 pb-20 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      
      {/* ========================================================
          1. EXACT HERO SECTION (MATCHING SCREENSHOT)
          ======================================================== */}
      <section className="pt-14 pb-8 sm:pt-20 sm:pb-12 text-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Top Amber Tag Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFBEB] dark:bg-amber-950/40 border border-[#FDE68A] dark:border-amber-800/60 text-[#B45309] dark:text-amber-300 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>India's First Step-by-Step AI Citizen Document Navigator</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-[#1E3A8A] dark:text-blue-100 tracking-tight leading-[1.18]">
            Never Wait in Queues or Pay Brokers Again.<br className="hidden sm:inline" />{' '}
            Get Exact Step-by-Step Guidance in{' '}
            <span className="text-[#C2410C] dark:text-amber-400 font-extrabold">
              Your Language
            </span>.
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
            Type any request like "update mobile number in aadhaar". MyGov Saathi gives you the{' '}
            <span className="font-semibold text-[#2563EB] dark:text-blue-400">
              exact Step 1, Step 2, Step 3 click instructions
            </span>, official fees, and direct verified government links.
          </p>

          {/* Search Bar with "Ask AI Saathi" Stacked Button */}
          <div className="pt-2">
            <SearchBar large={true} />
          </div>

          {/* Trust Value Badges Row */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>100% Verified Official (.gov.in) Links</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Exact Step-by-Step Click Recipes</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Zero Brokerage & Fee Disclosure</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          2. STEP-BY-STEP PROBLEM SOLVER ENGINE (HOW IT WORKS)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProblemSolverWizard />
      </section>

      {/* ========================================================
          3. POPULAR CITIZEN DOCUMENTS HUB (DIGILOCKER / AADHAAR / PAN)
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <FileText className="w-4 h-4" />
              <span>Instant Digital Records</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Documents Hub — DigiLocker Verified
            </h2>
          </div>

          <Link
            to="/documents"
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>View All Document Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-blue-400 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800">
                    Digitally Signed
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {doc.document}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Issued by: {doc.issuer}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-normal">
                  {doc.format}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <a
                  href="https://www.digilocker.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>Fetch on DigiLocker</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          4. ESSENTIAL VERIFIED PUBLIC SERVICES
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Portals (.gov.in)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Top Public Services Directory
            </h2>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-60 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </section>

      {/* ========================================================
          5. NATIONAL EMERGENCY & GRIEVANCE HELPLINES
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center justify-center flex-shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  24x7 Official Citizen Helplines (Toll-Free)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Instant golden-hour cyber financial fraud reporting, consumer grievances, and emergency services.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
              <a
                href="tel:1930"
                className="px-3.5 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 font-bold text-rose-800 dark:text-rose-300 hover:bg-rose-100 flex items-center gap-1.5"
              >
                <span>🚨 Cyber Fraud: 1930</span>
              </a>
              <a
                href="tel:1915"
                className="px-3.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 font-bold text-blue-800 dark:text-blue-300 hover:bg-blue-100 flex items-center gap-1.5"
              >
                <span>⚖️ Consumer: 1915</span>
              </a>
              <a
                href="tel:112"
                className="px-3.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 font-bold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 flex items-center gap-1.5"
              >
                <span>🚑 Emergency: 112</span>
              </a>
              <a
                href="tel:1947"
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-200 flex items-center gap-1.5"
              >
                <span>🆔 Aadhaar: 1947</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
