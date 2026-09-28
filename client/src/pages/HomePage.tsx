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
  Compass
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
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-8 sm:pt-20 sm:pb-16 overflow-hidden">
        
        {/* Decorative backdrop gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          
          {/* Official Badge Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-900/60 text-blue-900 dark:text-blue-300 text-xs font-semibold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Official Indian Citizen Guidance Platform</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-200 dark:bg-blue-900 font-mono">
              .gov.in verified
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Your Intelligent Guide to{' '}
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-amber-600 bg-clip-text text-transparent">
              Government Services
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Describe your problem or requirement in natural language. Gov Saathi identifies the correct government department, outlines verified steps, and directs you to genuine official portals.
          </p>

          {/* Master Search Bar */}
          <div className="pt-4">
            <SearchBar large={true} />
          </div>

          {/* Quick Problem Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
            <Link
              to="/services/swachhata-civic-complaint-app"
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 font-semibold text-slate-700 dark:text-slate-300 shadow-sm flex items-center gap-1.5"
            >
              <span>🛣️ Road Potholes</span>
            </Link>
            <Link
              to="/services/national-cyber-crime-reporting-portal"
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500 font-semibold text-slate-700 dark:text-slate-300 shadow-sm flex items-center gap-1.5"
            >
              <span>🚨 Online Scam / 1930</span>
            </Link>
            <Link
              to="/services/digilocker-digital-documents"
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 font-semibold text-slate-700 dark:text-slate-300 shadow-sm flex items-center gap-1.5"
            >
              <span>📄 Download Marksheet / DL</span>
            </Link>
            <Link
              to="/services/passport-seva-online"
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 font-semibold text-slate-700 dark:text-slate-300 shadow-sm flex items-center gap-1.5"
            >
              <span>✈️ Passport Renewal</span>
            </Link>
            <Link
              to="/problem-solver"
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-semibold shadow-md flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>More Problem Scenarios</span>
            </Link>
          </div>

        </div>
      </section>

      {/* 2. SOLVE A PROBLEM ENGINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProblemSolverWizard />
      </section>

      {/* 3. FEATURED VERIFIED SERVICES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Portals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
              Top Citizen Government Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Direct access to Central and State administrative platforms with verified fee guidelines and helplines.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>View All Services Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* 4. EXPLORE ALL CATEGORIES (18 Categories) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              <Layers className="w-4 h-4" />
              <span>Browse by Category</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
              18 Government Service Sectors
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Find schemes, certificates, complaints, and apps organized by domain.
            </p>
          </div>

          <Link
            to="/categories"
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Browse Full Taxonomy</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.slice(0, 12).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 5. OFFICIAL GOVERNMENT APPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-tr from-slate-900 via-blue-950 to-indigo-950 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Digital India Mobile Ecosystem
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Official Mobile Apps for Indian Citizens
            </h2>
            <p className="text-xs sm:text-sm text-blue-200 leading-relaxed font-normal">
              Install verified applications such as UMANG (1,500+ services), DigiLocker, mAadhaar, and Swachhata to carry documents and report grievances from your smartphone.
            </p>
            <div className="pt-2">
              <Link
                to="/apps"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs shadow-lg transition-colors"
              >
                <Smartphone className="w-4 h-4 text-blue-600" />
                <span>Explore Official Apps</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CIVIC TRUST & FACT-GROUNDED AI NOTICE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Zero Fake Portals</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Every link is audited and verified against official government .gov.in and .nic.in domains to protect citizens from phishing scams.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Strict Hallucination Control</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                AI Saathi is grounded exclusively on verified gazetted data. It never invents helpline numbers, fees, or procedural timelines.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Citizen Privacy Assured</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                We never store Aadhaar numbers, OTPs, or passwords. Your guidance happens transparently without personal data risk.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
