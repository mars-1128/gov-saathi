import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Bookmark,
  Sun,
  Moon,
  Globe,
  MapPin,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  Layers,
  FileText,
  Smartphone,
  Award,
  ExternalLink
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage, LanguageCode } from '../context/LanguageContext';
import { useLocation, INDIAN_STATES } from '../context/LocationContext';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { theme, setTheme, isDark } = useTheme();
  const { language, setLanguage, t, supportedLanguages } = useLanguage();
  const { state: userState, setState: setUserState } = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [resourcesMenuOpen, setResourcesMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [fontSizeScale, setFontSizeScale] = useState<'sm' | 'normal' | 'lg'>('normal');

  const servicesRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesMenuOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setResourcesMenuOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (stateRef.current && !stateRef.current.contains(event.target as Node)) {
        setStateDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Accessibility font size adjustments
  const adjustFontSize = (scale: 'sm' | 'normal' | 'lg') => {
    setFontSizeScale(scale);
    const root = document.documentElement;
    if (scale === 'sm') {
      root.style.fontSize = '14.5px';
    } else if (scale === 'lg') {
      root.style.fontSize = '17.5px';
    } else {
      root.style.fontSize = '16px';
    }
  };

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs">
      
      {/* 1. TOP NATIONAL UTILITY STRIP (INDIA.GOV.IN AESTHETIC) */}
      <div className="gov-utility-bar py-1.5 px-4 sm:px-8 border-b border-[#142947]">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px]">
          
          {/* Left: Official Indian Identity */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 font-bold tracking-tight text-white">
              {/* Indian Tiranga SVG Flag */}
              <svg className="w-4 h-3 rounded-[2px] shadow-xs flex-shrink-0" viewBox="0 0 640 480" aria-label="Flag of India">
                <path fill="#f93" d="M0 0h640v160H0z"/>
                <path fill="#fff" d="M0 160h640v160H0z"/>
                <path fill="#128807" d="M0 320h640v160H0z"/>
                <circle cx="320" cy="240" r="40" fill="none" stroke="#008" strokeWidth="6"/>
              </svg>
              <span>भारत सरकार</span>
              <span className="text-blue-300">|</span>
              <span className="hidden sm:inline font-normal text-slate-200">Government of India</span>
            </div>

            <span className="hidden md:inline-block text-blue-300">|</span>
            <span className="hidden md:inline-block text-slate-200 font-medium">
              राष्ट्रीय नागरिक सेवा साथी (National Citizen Guide)
            </span>
          </div>

          {/* Right: Consolidated Utilities (Accessibility, Language, State, Theme, Profile) */}
          <div className="flex items-center gap-3">
            
            {/* Font Size Scale (A- A A+) */}
            <div className="hidden sm:flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded text-[10px] font-bold text-slate-200 border border-white/10">
              <button
                onClick={() => adjustFontSize('sm')}
                className={`px-1 rounded hover:text-amber-300 ${fontSizeScale === 'sm' ? 'text-amber-300 font-extrabold' : ''}`}
                title="Decrease font size"
              >
                A-
              </button>
              <span className="text-slate-400">|</span>
              <button
                onClick={() => adjustFontSize('normal')}
                className={`px-1 rounded hover:text-amber-300 ${fontSizeScale === 'normal' ? 'text-amber-300 font-extrabold' : ''}`}
                title="Default font size"
              >
                A
              </button>
              <span className="text-slate-400">|</span>
              <button
                onClick={() => adjustFontSize('lg')}
                className={`px-1 rounded hover:text-amber-300 ${fontSizeScale === 'lg' ? 'text-amber-300 font-extrabold' : ''}`}
                title="Increase font size"
              >
                A+
              </button>
            </div>

            {/* Jurisdiction State Selector */}
            <div className="relative" ref={stateRef}>
              <button
                onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/20 hover:bg-black/30 text-white text-[11px] font-medium border border-white/15"
                title="Select State / Jurisdiction"
              >
                <MapPin className="w-3 h-3 text-amber-300" />
                <span className="max-w-[75px] truncate">{userState}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {stateDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-52 max-h-72 overflow-y-auto rounded-xl bg-white text-slate-800 shadow-2xl border border-slate-200 py-1 z-50 text-xs">
                  <div className="px-3 py-1 font-bold text-slate-400 uppercase text-[10px] border-b border-slate-100">
                    Jurisdiction Level
                  </div>
                  {INDIAN_STATES.map((st) => (
                    <button
                      key={st}
                      onClick={() => { setUserState(st); setStateDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 ${
                        userState === st ? 'font-bold text-[#1B365D] bg-blue-50' : 'text-slate-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/20 hover:bg-black/30 text-white text-[11px] font-medium border border-white/15"
              >
                <Globe className="w-3 h-3 text-emerald-300" />
                <span className="uppercase font-bold">{language}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-40 rounded-xl bg-white text-slate-800 shadow-2xl border border-slate-200 py-1 z-50 text-xs">
                  <div className="px-3 py-1 font-bold text-slate-400 uppercase text-[10px] border-b border-slate-100">
                    Select Language
                  </div>
                  {supportedLanguages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLanguage(l.code); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 flex items-center justify-between ${
                        language === l.code ? 'font-bold text-[#1B365D] bg-blue-50' : 'text-slate-700'
                      }`}
                    >
                      <span>{l.nativeName}</span>
                      <span className="text-[10px] text-slate-400 uppercase">{l.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/20 hover:bg-black/30 text-white text-[10px] font-semibold border border-white/15"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-3 h-3 text-amber-300" /> : <Moon className="w-3 h-3 text-blue-200" />}
              <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
            </button>

            {/* Saved Link */}
            <Link
              to="/profile#saved"
              className="p-1 rounded hover:bg-black/20 text-slate-200 hover:text-white"
              title="Saved Services"
            >
              <Bookmark className="w-3.5 h-3.5" />
            </Link>

            {/* User Profile / Sign In */}
            {user ? (
              <div className="flex items-center gap-1.5 pl-1 border-l border-white/20">
                <Link to="/profile" className="text-[11px] font-semibold text-amber-300 hover:underline">
                  {user.email?.split('@')[0]}
                </Link>
                <button onClick={() => signOut()} title="Logout" className="text-slate-300 hover:text-rose-400">
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="text-[11px] font-bold text-amber-300 hover:underline pl-1 border-l border-white/20">
                Sign In
              </Link>
            )}

          </div>
        </div>
      </div>

      {/* 2. TRICOLOR ACCENT RIBBON */}
      <div className="tricolor-ribbon" />

      {/* 3. CLEAN, STRUCTURED MAIN NAVIGATION BAR */}
      <div className="w-full bg-white dark:bg-slate-900 border-b border-[#E2E8F0] dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            
            {/* National Emblem & Logo */}
            <Link to="/" className="flex items-center gap-3 group py-2">
              <div className="w-11 h-11 rounded-lg bg-[#1B365D] border border-blue-900/20 flex items-center justify-center text-white shadow-xs">
                {/* Ashoka Chakra 24-spoke Dharma wheel */}
                <svg className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" strokeWidth="1.2" />
                </svg>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight text-[#1B365D] dark:text-white">
                    GOV SAATHI
                  </span>
                  <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                    <ShieldCheck className="w-2.5 h-2.5 text-emerald-600" />
                    Official Guide
                  </span>
                </div>
                <p className="text-[11px] text-[#4A5568] dark:text-slate-400 font-semibold tracking-wide">
                  भारत सरकार नागरिक सेवा मार्गदर्शक
                </p>
              </div>
            </Link>

            {/* Desktop Structured Nav Menus */}
            <nav className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#1B365D] dark:text-slate-200">
              
              {/* Home */}
              <Link to="/" className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                Home
              </Link>

              {/* Grouped Dropdown 1: Services & Categories */}
              <div className="relative" ref={servicesRef}>
                <button
                  onClick={() => { setServicesMenuOpen(!servicesMenuOpen); setResourcesMenuOpen(false); }}
                  className={`px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 ${
                    servicesMenuOpen ? 'bg-slate-100 dark:bg-slate-800 text-[#1B365D]' : ''
                  }`}
                >
                  <span>Services & Sectors</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {servicesMenuOpen && (
                  <div className="absolute left-0 mt-1 w-64 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in duration-150">
                    <Link
                      to="/services"
                      onClick={() => setServicesMenuOpen(false)}
                      className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200"
                    >
                      <Layers className="w-4 h-4 text-[#1B365D] dark:text-blue-400 mt-0.5" />
                      <div>
                        <div className="font-bold">All Verified Services</div>
                        <div className="text-[11px] text-slate-500">Central, State & Municipal Directory</div>
                      </div>
                    </Link>

                    <Link
                      to="/categories"
                      onClick={() => setServicesMenuOpen(false)}
                      className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 border-t border-slate-100 dark:border-slate-800"
                    >
                      <Award className="w-4 h-4 text-emerald-600 mt-0.5" />
                      <div>
                        <div className="font-bold">18 Citizen Categories</div>
                        <div className="text-[11px] text-slate-500">Documents, Police, Health, Transport</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Grouped Dropdown 2: Schemes & Resources */}
              <div className="relative" ref={resourcesRef}>
                <button
                  onClick={() => { setResourcesMenuOpen(!resourcesMenuOpen); setServicesMenuOpen(false); }}
                  className={`px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 ${
                    resourcesMenuOpen ? 'bg-slate-100 dark:bg-slate-800 text-[#1B365D]' : ''
                  }`}
                >
                  <span>Resources & Schemes</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${resourcesMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {resourcesMenuOpen && (
                  <div className="absolute left-0 mt-1 w-64 rounded-xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in duration-150">
                    <Link
                      to="/schemes"
                      onClick={() => setResourcesMenuOpen(false)}
                      className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200"
                    >
                      <Award className="w-4 h-4 text-amber-600 mt-0.5" />
                      <div>
                        <div className="font-bold">Welfare Schemes</div>
                        <div className="text-[11px] text-slate-500">PM-JAY, PM-Kisan, Scholarships</div>
                      </div>
                    </Link>

                    <Link
                      to="/apps"
                      onClick={() => setResourcesMenuOpen(false)}
                      className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 border-t border-slate-100 dark:border-slate-800"
                    >
                      <Smartphone className="w-4 h-4 text-purple-600 mt-0.5" />
                      <div>
                        <div className="font-bold">Official Mobile Apps</div>
                        <div className="text-[11px] text-slate-500">UMANG, DigiLocker, Swachhata</div>
                      </div>
                    </Link>

                    <Link
                      to="/documents"
                      onClick={() => setResourcesMenuOpen(false)}
                      className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200 border-t border-slate-100 dark:border-slate-800"
                    >
                      <FileText className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-bold">DigiLocker Documents</div>
                        <div className="text-[11px] text-slate-500">Marksheets, Driving Licence, RC</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Direct Link: Solve a Problem */}
              <Link
                to="/problem-solver"
                className="px-3.5 py-2 rounded-lg text-amber-800 dark:text-amber-400 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/60 transition-colors flex items-center gap-1.5 font-bold"
              >
                <HelpCircle className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <span>Solve a Problem</span>
              </Link>
            </nav>

            {/* Primary Action Button: Ask AI Saathi */}
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/ai-saathi"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1B365D] hover:bg-[#0A2540] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all border border-[#142947]"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Ask AI Saathi</span>
              </Link>
            </div>

            {/* Mobile Menu Hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <Link
                to="/ai-saathi"
                className="px-2.5 py-1.5 rounded-lg bg-[#1B365D] text-white text-xs font-bold flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI</span>
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-xl">
          <nav className="flex flex-col gap-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              Home
            </Link>
            <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              All Verified Services
            </Link>
            <Link to="/categories" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              18 Government Categories
            </Link>
            <Link to="/problem-solver" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              Solve a Citizen Problem
            </Link>
            <Link to="/schemes" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              Welfare Schemes (PM-JAY, PM-Kisan)
            </Link>
            <Link to="/apps" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              Official Mobile Apps (UMANG)
            </Link>
            <Link to="/documents" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              DigiLocker Documents
            </Link>
            <Link to="/ai-saathi" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-lg bg-[#1B365D] text-white font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Ask AI Saathi Assistant
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
