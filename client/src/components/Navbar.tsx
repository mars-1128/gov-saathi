import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Bookmark,
  Sun,
  Moon,
  Laptop,
  Globe,
  MapPin,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Shield,
  ShieldCheck,
  Search,
  HelpCircle,
  FileText,
  Volume2,
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
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [fontSizeScale, setFontSizeScale] = useState<'sm' | 'normal' | 'lg'>('normal');

  // Handle accessibility font size adjustments
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
    <header className="sticky top-0 z-40 w-full shadow-sm">
      
      {/* 1. OFFICIAL NATIONAL GOVERNMENT UTILITY STRIP */}
      <div className="gov-utility-bar py-1.5 px-4 sm:px-8 border-b border-slate-700/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px]">
          
          {/* Left: Emblem & National Title */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 font-bold tracking-tight text-slate-200">
              {/* Indian Tiranga SVG Flag */}
              <svg className="w-4 h-3 rounded-[2px] shadow-xs flex-shrink-0" viewBox="0 0 640 480" aria-label="Flag of India">
                <path fill="#f93" d="M0 0h640v160H0z"/>
                <path fill="#fff" d="M0 160h640v160H0z"/>
                <path fill="#128807" d="M0 320h640v160H0z"/>
                <circle cx="320" cy="240" r="40" fill="none" stroke="#008" strokeWidth="6"/>
              </svg>
              <span>भारत सरकार</span>
              <span className="text-slate-500">|</span>
              <span className="hidden sm:inline font-semibold">Government of India</span>
            </div>

            <span className="hidden md:inline-block text-slate-500">|</span>
            <span className="hidden md:inline-block text-slate-300 font-medium">
              राष्ट्रीय नागरिक सेवा साथी पोर्टल (National Citizen Guide)
            </span>
          </div>

          {/* Right: Accessibility, Audio & Theme Quick Tools */}
          <div className="flex items-center gap-3">
            
            {/* Font Size Scale (Official Gov Standard) */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/60 text-[10px] font-bold text-slate-300">
              <button
                onClick={() => adjustFontSize('sm')}
                className={`px-1 rounded hover:text-amber-400 ${fontSizeScale === 'sm' ? 'text-amber-400 font-extrabold' : ''}`}
                title="Decrease font size"
              >
                A-
              </button>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => adjustFontSize('normal')}
                className={`px-1 rounded hover:text-amber-400 ${fontSizeScale === 'normal' ? 'text-amber-400 font-extrabold' : ''}`}
                title="Reset font size"
              >
                A
              </button>
              <span className="text-slate-600">|</span>
              <button
                onClick={() => adjustFontSize('lg')}
                className={`px-1 rounded hover:text-amber-400 ${fontSizeScale === 'lg' ? 'text-amber-400 font-extrabold' : ''}`}
                title="Increase font size"
              >
                A+
              </button>
            </div>

            {/* Direct Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700/80 text-[10px] font-semibold transition-all"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <>
                  <Sun className="w-3 h-3 text-amber-400" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3 h-3 text-blue-300" />
                  <span>Dark</span>
                </>
              )}
            </button>

            {/* Audio Voice Guide Indicator */}
            <div className="hidden lg:flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Voice Enabled</span>
            </div>

          </div>
        </div>
      </div>

      {/* 2. NATIONAL TRICOLOR ACCENT RIBBON */}
      <div className="tricolor-ribbon" />

      {/* 3. MAIN OFFICIAL BRAND & NAVIGATION HEADER */}
      <div className="w-full glass-panel border-b border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            
            {/* National Emblem & Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-950 via-indigo-900 to-blue-900 p-0.5 shadow-md shadow-blue-900/15 border border-blue-400/40 flex items-center justify-center">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center">
                  {/* Ashoka Chakra 24-spoke Dharma wheel representation */}
                  <svg className="w-6 h-6 text-blue-800 dark:text-blue-400 group-hover:rotate-45 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" strokeWidth="1.2" />
                  </svg>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-blue-950 via-indigo-900 to-blue-800 dark:from-white dark:via-blue-100 dark:to-slate-200 bg-clip-text text-transparent">
                    GOV SAATHI
                  </span>
                  <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1 shadow-2xs">
                    <ShieldCheck className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                    Verified .gov.in
                  </span>
                </div>
                <p className="text-[10px] text-slate-700 dark:text-slate-300 font-semibold tracking-wide flex items-center gap-1">
                  <span>भारत सरकार नागरिक सेवा साथी</span>
                  <span className="text-slate-400 hidden sm:inline">•</span>
                  <span className="text-slate-700 dark:text-slate-300 hidden sm:inline">Citizen Guidance Portal</span>
                </p>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
              <Link to="/services" className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors">
                Services
              </Link>
              <Link to="/categories" className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors">
                {t('categories')}
              </Link>
              <Link to="/problem-solver" className="px-3 py-2 rounded-xl text-amber-700 dark:text-amber-400 font-bold hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Solve a Problem</span>
              </Link>
              <Link to="/schemes" className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors">
                {t('schemes')}
              </Link>
              <Link to="/apps" className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors">
                {t('apps')}
              </Link>
              <Link to="/documents" className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors flex items-center gap-1">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>DigiLocker</span>
              </Link>
            </nav>

            {/* Right Action Tools: AI Saathi, Jurisdiction & Language */}
            <div className="hidden lg:flex items-center gap-2">
              
              {/* AI Saathi Trigger Button */}
              <Link
                to="/ai-saathi"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 hover:from-blue-800 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-600/25 hover:scale-[1.02] transition-all border border-blue-400/20"
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
                <span>Ask AI Saathi</span>
              </Link>

              {/* Jurisdiction State Selector */}
              <div className="relative">
                <button
                  onClick={() => { setStateDropdownOpen(!stateDropdownOpen); setLangDropdownOpen(false); }}
                  className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs"
                  title="Filter jurisdiction"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span className="max-w-[85px] truncate">{userState}</span>
                </button>

                {stateDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 max-h-72 overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 text-xs">
                    <div className="px-3 py-1.5 font-bold text-slate-400 uppercase text-[10px] border-b border-slate-100 dark:border-slate-800">
                      Select Jurisdiction
                    </div>
                    {INDIAN_STATES.map((st) => (
                      <button
                        key={st}
                        onClick={() => { setUserState(st); setStateDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 ${
                          userState === st ? 'font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40' : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Multilingual Selector */}
              <div className="relative">
                <button
                  onClick={() => { setLangDropdownOpen(!langDropdownOpen); setStateDropdownOpen(false); }}
                  className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-2xs"
                >
                  <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span className="uppercase">{language}</span>
                </button>

                {langDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 text-xs">
                    <div className="px-3 py-1 font-bold text-slate-400 uppercase text-[10px] border-b border-slate-100 dark:border-slate-800">
                      Choose Language
                    </div>
                    {supportedLanguages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLanguage(l.code); setLangDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between ${
                          language === l.code ? 'font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40' : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{l.nativeName}</span>
                        <span className="text-[10px] text-slate-400 uppercase">{l.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Saved Link */}
              <Link
                to="/profile#saved"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                title="Saved Services"
              >
                <Bookmark className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </Link>

              {/* Auth / Profile */}
              {user ? (
                <div className="flex items-center gap-2 pl-1">
                  <Link
                    to="/profile"
                    className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900"
                    title={user.email}
                  >
                    <UserIcon className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs shadow-sm transition-all"
                >
                  Sign In
                </Link>
              )}

            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Direct Theme Toggle for Mobile */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200"
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
        <div className="lg:hidden glass-panel border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 p-4 space-y-4 shadow-xl">
          <nav className="flex flex-col gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
            <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
              All Verified Services
            </Link>
            <Link to="/categories" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
              {t('categories')}
            </Link>
            <Link to="/problem-solver" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-amber-700 dark:text-amber-400 font-bold hover:bg-amber-50 dark:hover:bg-amber-950/30 flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              Solve a Citizen Problem
            </Link>
            <Link to="/schemes" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
              {t('schemes')}
            </Link>
            <Link to="/apps" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
              Official Apps (UMANG, DigiLocker)
            </Link>
            <Link to="/documents" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              DigiLocker Documents
            </Link>
            <Link to="/ai-saathi" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-xl bg-blue-600 text-white font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-300" />
              AI Saathi Voice & Chat Guide
            </Link>
          </nav>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2 text-xs">
            <select
              value={userState}
              onChange={(e) => setUserState(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-semibold"
            >
              {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 font-semibold uppercase"
            >
              {supportedLanguages.map(l => (
                <option key={l.code} value={l.code}>{l.nativeName} ({l.code.toUpperCase()})</option>
              ))}
            </select>
          </div>

          <div className="pt-2">
            {user ? (
              <div className="flex items-center justify-between">
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="text-xs font-bold text-blue-600">
                  Profile ({user.email})
                </Link>
                <button onClick={() => signOut()} className="text-xs text-red-500 font-bold">
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs shadow-md"
              >
                Sign In / Citizen Registration
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
