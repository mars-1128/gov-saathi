import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Smartphone,
  PhoneCall,
  Layers,
  Lock,
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
    <div className="space-y-12 sm:space-y-16 pb-16">
      
      {/* 1. OFFICIAL HERO SECTION (CRISP WHITE / LIGHT GRAY) */}
      <section className="bg-white dark:bg-slate-900 border-b border-[#E2E8F0] dark:border-slate-800 pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-5">
          
          {/* Official Verification Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF2F6] dark:bg-slate-800 border border-[#CBD5E1] dark:border-slate-700 text-[#1B365D] dark:text-blue-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>भारत सरकार अधिकृत नागरिक सेवा संदर्भ मंच</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-white dark:bg-slate-900 font-mono font-bold border border-slate-300 dark:border-slate-700">
              .gov.in / .nic.in Grounded
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1B365D] dark:text-white leading-[1.18]">
            National Citizen Guide to{' '}
            <span className="text-[#0A2540] dark:text-blue-300 underline decoration-amber-500 decoration-3 underline-offset-6">
              Government Services
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-[#4A5568] dark:text-slate-300 leading-relaxed font-normal">
            Explain your issue or requirement in everyday language — in <strong>English, हिन्दी, తెలుగు, ಕನ್ನಡ, தமிழ்</strong>, or any language. Gov Saathi identifies the verified department, explains procedural steps, and provides authentic .gov.in links.
          </p>

          {/* Master Search Bar with Voice Input */}
          <div className="pt-2">
            <SearchBar large={true} />
          </div>

          {/* Quick Problem Triage Shortcuts */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs">
            <Link
              to="/services/swachhata-civic-complaint-app"
              className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 hover:border-[#1B365D] font-semibold text-[#1B365D] dark:text-slate-200 shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5"
            >
              <span>🛣️ Road Potholes / Sanitation</span>
            </Link>
            <Link
              to="/services/national-cyber-crime-reporting-portal"
              className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 hover:border-rose-500 font-semibold text-rose-700 dark:text-rose-300 shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5"
            >
              <span>🚨 Cyber Fraud (1930)</span>
            </Link>
            <Link
              to="/services/digilocker-digital-documents"
              className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 hover:border-[#1B365D] font-semibold text-[#1B365D] dark:text-slate-200 shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5"
            >
              <span>📄 Marksheets & Driving Licence</span>
            </Link>
            <Link
              to="/services/passport-seva-online"
              className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 hover:border-[#1B365D] font-semibold text-[#1B365D] dark:text-slate-200 shadow-2xs hover:shadow-xs transition-all flex items-center gap-1.5"
            >
              <span>✈️ Passport Online</span>
            </Link>
            <Link
              to="/problem-solver"
              className="px-3.5 py-1.5 rounded-lg bg-[#1B365D] hover:bg-[#0A2540] text-white font-bold shadow-xs transition-all flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>More Problem Scenarios</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 2. NATIONAL CITIZEN HELPLINES BAR (CLEAN & PROFESSIONAL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 p-4 sm:p-5 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-[#1B365D] dark:text-blue-300 flex items-center justify-center flex-shrink-0">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#1B365D] dark:text-blue-300">
                  National Citizen Helplines (24x7 Toll-Free)
                </h4>
                <p className="text-xs text-[#4A5568] dark:text-slate-400">
                  Official emergency and grievance numbers for direct citizen contact
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs">
              <a
                href="tel:1930"
                className="px-3 py-1 rounded-md bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 font-bold text-rose-800 dark:text-rose-300 hover:bg-rose-100 flex items-center gap-1.5"
              >
                <span>🚨 Cybercrime: 1930</span>
              </a>
              <a
                href="tel:1915"
                className="px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 font-bold text-blue-800 dark:text-blue-300 hover:bg-blue-100 flex items-center gap-1.5"
              >
                <span>⚖️ Consumer: 1915</span>
              </a>
              <a
                href="tel:112"
                className="px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 font-bold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 flex items-center gap-1.5"
              >
                <span>🚑 Emergency: 112</span>
              </a>
              <a
                href="tel:1800111555"
                className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-200 flex items-center gap-1.5"
              >
                <span>🏛️ National Portal: 1800-111-555</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM SOLVER WIZARD ENGINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProblemSolverWizard />
      </section>

      {/* 4. POPULAR VERIFIED SERVICES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E2E8F0] dark:border-slate-800">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1B365D] dark:text-blue-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Portals (.gov.in)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1B365D] dark:text-white mt-1">
              Essential Public Services
            </h2>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#1B365D] dark:text-blue-400 hover:underline"
          >
            <span>View All Verified Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-60 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 animate-pulse" />
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

      {/* 5. 18 CITIZEN CATEGORIES DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#E2E8F0] dark:border-slate-800">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1B365D] dark:text-blue-400">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Institutional Directory</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1B365D] dark:text-white mt-1">
              Browse by Department Category
            </h2>
          </div>

          <Link
            to="/categories"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#1B365D] dark:text-blue-400 hover:underline"
          >
            <span>Explore All 18 Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
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
        <div className="rounded-2xl p-6 sm:p-8 bg-[#1B365D] text-white shadow-xs border border-[#142947]">
          <div className="max-w-2xl space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-white/10 text-blue-200 border border-white/15 flex items-center gap-1.5 w-fit">
              <Smartphone className="w-3.5 h-3.5 text-amber-300" />
              Digital India Public Mobile Infrastructure
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
              Official Mobile Apps for Indian Citizens
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
              Access authentic public applications like UMANG (1,500+ Central and State services), DigiLocker, mAadhaar, and Swachhata to carry gazetted credentials and report civic issues directly from your mobile device.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/apps"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-[#1B365D] hover:bg-slate-100 font-bold text-xs shadow-xs transition-colors"
              >
                <Smartphone className="w-3.5 h-3.5 text-[#1B365D]" />
                <span>Explore Official Apps</span>
              </Link>
              <Link
                to="/documents"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-900/60 hover:bg-blue-900 text-white font-bold text-xs border border-blue-400/30 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>DigiLocker Marksheets</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PLATFORM TRUST NOTICE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-[#1B365D] dark:text-blue-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1B365D] dark:text-white">Strict .gov.in Verification</h4>
              <p className="text-xs text-[#4A5568] dark:text-slate-400 mt-1 leading-relaxed">
                Every portal link is audited and grounded strictly on genuine Indian government domains (.gov.in / .nic.in).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-600 flex-shrink-0">
              <Sparkles className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1B365D] dark:text-white">Fact-Grounded AI Engine</h4>
              <p className="text-xs text-[#4A5568] dark:text-slate-400 mt-1 leading-relaxed">
                AI Saathi operates under strict grounding constraints. It never invents helpline numbers or fees.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <Lock className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#1B365D] dark:text-white">Citizen Privacy Assured</h4>
              <p className="text-xs text-[#4A5568] dark:text-slate-400 mt-1 leading-relaxed">
                We never store Aadhaar numbers, OTPs, or passwords. Your queries are answered transparently without tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
