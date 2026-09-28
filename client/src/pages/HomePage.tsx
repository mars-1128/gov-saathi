import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Smartphone,
  FileCheck2,
  PhoneCall,
  CheckCircle2,
  ExternalLink,
  Layers,
  Lock,
  Compass,
  AlertTriangle,
  Award,
  Radio,
  FileText
} from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { CategoryCard } from '../components/CategoryCard';
import { ServiceCard } from '../components/ServiceCard';
import { ProblemSolverWizard } from '../components/ProblemSolverWizard';
import { getCategories, getServices, getApps } from '../lib/api';
import { Category, GovernmentService, GovernmentApp } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredServices, setFeaturedServices] = useState<GovernmentService[]>([]);
  const [apps, setApps] = useState<GovernmentApp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [cats, servs, appList] = await Promise.all([
          getCategories(),
          getServices(),
          getApps()
        ]);
        setCategories(cats);
        setFeaturedServices(servs.slice(0, 6));
        setApps(appList.slice(0, 4));
      } catch (e) {
        console.error('Home data load error', e);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  return (
    <div className="space-y-14 sm:space-y-20 pb-16">
      
      {/* 1. OFFICIAL HERO SECTION */}
      <section className="relative pt-10 pb-8 sm:pt-16 sm:pb-14 overflow-hidden border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-white/70 via-slate-50/50 to-transparent dark:from-slate-900/60 dark:via-slate-950/40 dark:to-transparent">
        
        {/* Decorative Indian Dharma Chakra Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] opacity-[0.035] dark:opacity-[0.05] pointer-events-none -z-10">
          <svg viewBox="0 0 100 100" className="w-full h-full text-blue-900 dark:text-blue-300">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" strokeWidth="1.5"/>
            {Array.from({ length: 24 }).map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={50 + 48 * Math.cos((i * 15 * Math.PI) / 180)}
                y2={50 + 48 * Math.sin((i * 15 * Math.PI) / 180)}
                stroke="currentColor"
                strokeWidth="1.2"
              />
            ))}
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          
          {/* Official Verification Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-300 text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>भारत सरकार अधिकृत नागरिक सेवा संदर्भ मंच</span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/90 text-blue-800 dark:text-blue-200 font-mono font-bold">
              .gov.in / .nic.in Grounded
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Official Citizen Guide to{' '}
            <span className="bg-gradient-to-r from-blue-900 via-indigo-700 to-amber-600 dark:from-blue-400 dark:via-indigo-300 dark:to-amber-400 bg-clip-text text-transparent">
              Government Services
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Speak or type your requirement in <strong>English, हिन्दी, తెలుగు, ಕನ್ನಡ, தமிழ்</strong>, or any regional language. Gov Saathi identifies the exact government authority, details mandatory documents, and directs you to genuine portals.
          </p>

          {/* Master Search Bar with Voice Input */}
          <div className="pt-3">
            <SearchBar large={true} />
          </div>

          {/* Quick Problem Triage Pills */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-xs">
            <Link
              to="/services/swachhata-civic-complaint-app"
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 font-semibold text-slate-700 dark:text-slate-200 shadow-2xs hover:shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>🛣️ Road Potholes / Sanitation</span>
            </Link>
            <Link
              to="/services/national-cyber-crime-reporting-portal"
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-500 font-semibold text-slate-700 dark:text-slate-200 shadow-2xs hover:shadow-sm transition-all flex items-center gap-1.5"
            >
              <span className="text-rose-600 dark:text-rose-400">🚨 Cyber Scam (1930)</span>
            </Link>
            <Link
              to="/services/digilocker-digital-documents"
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 font-semibold text-slate-700 dark:text-slate-200 shadow-2xs hover:shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>📄 Marksheets & Driving Licence</span>
            </Link>
            <Link
              to="/services/passport-seva-online"
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 font-semibold text-slate-700 dark:text-slate-200 shadow-2xs hover:shadow-sm transition-all flex items-center gap-1.5"
            >
              <span>✈️ Passport Online</span>
            </Link>
            <Link
              to="/problem-solver"
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-bold shadow-md hover:from-blue-800 hover:to-indigo-800 transition-all flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>More Problem Scenarios</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 2. 24x7 OFFICIAL CITIZEN HELPLINE DIRECTORY STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  National Emergency & Citizen Helplines
                </h4>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">
                  Toll-Free Official Numbers for Immediate Citizen Assistance
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
              <a
                href="tel:1930"
                className="px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 font-bold text-rose-700 dark:text-rose-300 hover:bg-rose-100 flex items-center gap-1.5"
              >
                <span>🚨 Cyber Fraud: 1930</span>
              </a>
              <a
                href="tel:1915"
                className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 font-bold text-blue-700 dark:text-blue-300 hover:bg-blue-100 flex items-center gap-1.5"
              >
                <span>⚖️ Consumer Disputes: 1915</span>
              </a>
              <a
                href="tel:112"
                className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 flex items-center gap-1.5"
              >
                <span>🚑 All Emergency: 112</span>
              </a>
              <a
                href="tel:1800111555"
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 flex items-center gap-1.5"
              >
                <span>🏛️ National Portal: 1800-111-555</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOLVE A PROBLEM ENGINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProblemSolverWizard />
      </section>

      {/* 4. FEATURED VERIFIED SERVICES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Portals (.gov.in)</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Popular Public Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Direct access to Central and State administrative portals
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline"
          >
            <span>View All Verified Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </section>

      {/* 5. 18 GOVERNMENT CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
              <Layers className="w-4 h-4" />
              <span>Institutional Directory</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Browse by Citizen Category
            </h2>
          </div>

          <Link
            to="/categories"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-400 hover:underline"
          >
            <span>Explore All 18 Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.slice(0, 12).map(cat => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 6. OFFICIAL MOBILE APPS (UMANG, DIGILOCKER, SWACHHATA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 text-white shadow-xl border border-blue-900/40">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center gap-1.5 w-fit">
              <Smartphone className="w-3.5 h-3.5" />
              Digital India Public Mobile Infrastructure
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Official Mobile Apps for Indian Citizens
            </h2>
            <p className="text-xs sm:text-sm text-blue-200 leading-relaxed font-normal">
              Install authentic public applications such as UMANG (1,500+ Central and State services), DigiLocker, mAadhaar, and Swachhata to carry gazetted credentials and report civic issues directly from your mobile device.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/apps"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs shadow-lg transition-colors"
              >
                <Smartphone className="w-4 h-4 text-blue-700" />
                <span>Explore Official Apps</span>
              </Link>
              <Link
                to="/documents"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-900/60 hover:bg-blue-900 text-white font-bold text-xs border border-blue-400/30 transition-colors"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>DigiLocker Marksheets</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CIVIC TRUST & FACT-GROUNDED AI NOTICE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-700 dark:text-blue-400 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Strict .gov.in Verification</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Every portal link is audited and grounded strictly on genuine Indian government domains (.gov.in / .nic.in) to protect citizens from phishing scams.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-700 dark:text-indigo-400 flex-shrink-0">
              <Sparkles className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Zero Fake Information</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                AI Saathi operates under strict grounding constraints. It never invents helpline numbers, fees, tracking numbers, or government policies.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 dark:text-emerald-400 flex-shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Citizen Privacy Assured</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                We never store Aadhaar numbers, OTPs, or passwords. Your queries are answered transparently without personal data retention.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
