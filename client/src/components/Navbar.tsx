import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation as useRouterLocation } from 'react-router-dom';
import {
  Shield,
  Sparkles,
  Globe,
  ChevronDown,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Home,
  FileText,
  HelpCircle,
  Bookmark,
  Sun,
  Moon,
  Award,
  Smartphone,
  Gift,
  MapPin,
  Layers
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage, SUPPORTED_LANGUAGES, LanguageCode } from '../context/LanguageContext';
import { useLocation, INDIAN_STATES } from '../context/LocationContext';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { theme, setTheme, isDark } = useTheme();
  const { language, setLanguage, supportedLanguages } = useLanguage();
  const { state: userState, setState: setUserState } = useLocation();
  const { user, signOut } = useAuth();
  const routerLocation = useRouterLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangObj = supportedLanguages.find(l => l.code === language) || supportedLanguages[0];

  const isActive = (path: string) => routerLocation.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm transition-colors">
      
      {/* ========================================================
          1. TOP NATIONAL UTILITY STRIP
          ======================================================== */}
      <div className="border-b border-slate-200/70 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-[11px] py-1.5 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Official Initiative Identification */}
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 font-medium">
            <span className="flex items-center gap-1">
              <span className="inline-block w-2.5 h-1.5 bg-[#FF9933] rounded-xs"></span>
              <span className="inline-block w-2.5 h-1.5 bg-white border border-slate-300 rounded-xs"></span>
              <span className="inline-block w-2.5 h-1.5 bg-[#138808] rounded-xs"></span>
            </span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 hidden sm:inline">
              GOVERNMENT OF INDIA INITIATIVE
            </span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-slate-500 dark:text-slate-400">
              Verified Citizen Discovery & AI Navigator
            </span>
          </div>

          {/* Right: State Selector, Language Selector, and Theme Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 text-slate-700 dark:text-slate-300">
            
            {/* Jurisdiction State Selector */}
            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 shadow-2xs">
              <MapPin className="w-3 h-3 text-[#2563EB]" />
              <label htmlFor="user-state-select" className="sr-only">Select Jurisdiction State</label>
              <select
                id="user-state-select"
                value={userState}
                onChange={(e) => setUserState(e.target.value)}
                className="bg-transparent text-[11px] font-semibold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer pr-1"
                title="Select Jurisdiction State"
              >
                {INDIAN_STATES.map((s) => (
                  <option key={s} value={s} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] font-semibold hover:bg-slate-50 text-slate-700 dark:text-slate-200 shadow-2xs"
                title="Select Language"
              >
                <Globe className="w-3 h-3 text-indigo-600" />
                <span>{currentLangObj.nativeName}</span>
                <ChevronDown className={`w-2.5 h-2.5 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-44 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-1 z-50 animate-in fade-in duration-100">
                  <div className="px-3 py-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                    Select Language
                  </div>
                  {supportedLanguages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                        language === l.code ? 'font-bold text-[#2563EB] bg-blue-50/50 dark:bg-blue-950/40' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{l.nativeName}</span>
                      <span className="text-[10px] text-slate-400">({l.name})</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors shadow-2xs"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
            </button>

          </div>

        </div>
      </div>

      {/* ========================================================
          2. MAIN BRANDING & ACCOUNT BAR
          ======================================================== */}
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/70 dark:border-slate-800 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
          
          {/* Authentic Original Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Original gradient squircle with Shield */}
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-amber-500 p-0.5 shadow-md shadow-blue-500/10 group-hover:scale-105 transition-transform flex-shrink-0">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-700 dark:text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            {/* Original typography & badges */}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                  GOV SAATHI
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                  Citizen Guide
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium tracking-wide mt-0.5">
                भारत सरकार सेवा साथी • CITIZEN SERVICE NAVIGATOR
              </p>
            </div>
          </Link>

          {/* Right Action Tools: Ask AI Saathi & Citizen Account */}
          <div className="flex items-center gap-3">
            
            {/* Ask AI Saathi Highlighted Button */}
            <Link
              to="/ai-saathi"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 hover:shadow-lg transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Ask AI Saathi</span>
              <span className="sm:hidden">AI</span>
            </Link>

            {/* Citizen Auth Controls */}
            {user ? (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-xs font-semibold text-slate-800 dark:text-slate-200"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                    {user.email?.[0].toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate hidden md:inline">
                    {user.user_metadata?.full_name || user.email?.split('@')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 text-xs animate-in fade-in duration-100">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="font-bold text-slate-900 dark:text-white truncate">
                        {user.user_metadata?.full_name || 'Citizen User'}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 text-slate-700 dark:text-slate-300 font-medium"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      <span>Citizen Profile</span>
                    </Link>

                    <Link
                      to="/profile#saved"
                      onClick={() => setUserDropdownOpen(false)}
                      className="px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 text-slate-700 dark:text-slate-300 font-medium"
                    >
                      <Bookmark className="w-4 h-4 text-amber-500" />
                      <span>Saved Bookmarks</span>
                    </Link>

                    <button
                      onClick={() => {
                        signOut();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 hover:bg-rose-50 text-rose-600 flex items-center gap-2.5 border-t border-slate-100 dark:border-slate-800 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  to="/auth"
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2.5 py-1.5 transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/auth?mode=signup"
                  className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 lg:hidden ml-1"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* ========================================================
          3. DEDICATED HORIZONTAL MENU BAR (DESKTOP)
          ======================================================== */}
      <div className="hidden lg:block bg-[#1B365D] dark:bg-[#0A1628] text-white border-b border-[#142947] dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between text-xs font-semibold tracking-wide">
            
            <div className="flex items-center space-x-1 py-1">
              
              {/* Home */}
              <Link
                to="/"
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg transition-all whitespace-nowrap ${
                  isActive('/')
                    ? 'bg-white/20 text-white font-bold shadow-xs'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>

              {/* All Services */}
              <Link
                to="/services"
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg transition-all whitespace-nowrap ${
                  isActive('/services')
                    ? 'bg-white/20 text-white font-bold shadow-xs'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-blue-300" />
                <span>All Services</span>
              </Link>

              {/* 18 Categories */}
              <Link
                to="/categories"
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg transition-all whitespace-nowrap ${
                  isActive('/categories')
                    ? 'bg-white/20 text-white font-bold shadow-xs'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-emerald-300" />
                <span>18 Categories</span>
              </Link>

              {/* Welfare Schemes */}
              <Link
                to="/schemes"
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg transition-all whitespace-nowrap ${
                  isActive('/schemes')
                    ? 'bg-white/20 text-white font-bold shadow-xs'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <Gift className="w-3.5 h-3.5 text-amber-300" />
                <span>Welfare Schemes</span>
              </Link>

              {/* Official Apps */}
              <Link
                to="/apps"
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg transition-all whitespace-nowrap ${
                  isActive('/apps')
                    ? 'bg-white/20 text-white font-bold shadow-xs'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-purple-300" />
                <span>Official Apps</span>
              </Link>

              {/* Documents Hub */}
              <Link
                to="/documents"
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg transition-all whitespace-nowrap ${
                  isActive('/documents')
                    ? 'bg-white/20 text-white font-bold shadow-xs'
                    : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-cyan-300" />
                <span>Documents Hub</span>
              </Link>
            </div>

            {/* Right Side of Menu Bar: Problem Solver & AI Assistant */}
            <div className="flex items-center space-x-2 py-1">
              
              {/* Solve a Problem (Highlighted with Gold Badge) */}
              <Link
                to="/problem-solver"
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
                  isActive('/problem-solver')
                    ? 'bg-amber-400 text-slate-900 font-bold shadow-xs'
                    : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-400/30 font-bold'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
                <span>Solve a Problem</span>
              </Link>

              {/* AI Saathi Menu Link */}
              <Link
                to="/ai-saathi"
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all whitespace-nowrap ${
                  isActive('/ai-saathi')
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'text-blue-200 hover:text-white hover:bg-white/10'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Guide</span>
              </Link>

            </div>

          </nav>
        </div>
      </div>

      {/* ========================================================
          4. MOBILE DRAWER MENU
          ======================================================== */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto">
          
          <nav className="flex flex-col gap-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5"
            >
              <Home className="w-4 h-4 text-slate-400" />
              <span>Home</span>
            </Link>

            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5"
            >
              <Layers className="w-4 h-4 text-[#2563EB]" />
              <span>All Verified Services</span>
            </Link>

            <Link
              to="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5"
            >
              <Award className="w-4 h-4 text-emerald-600" />
              <span>18 Government Categories</span>
            </Link>

            <Link
              to="/schemes"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5"
            >
              <Gift className="w-4 h-4 text-amber-500" />
              <span>Welfare Schemes (PM-JAY, PM-Kisan)</span>
            </Link>

            <Link
              to="/apps"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5"
            >
              <Smartphone className="w-4 h-4 text-purple-500" />
              <span>Official Mobile Apps (UMANG, DigiLocker)</span>
            </Link>

            <Link
              to="/documents"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5"
            >
              <FileText className="w-4 h-4 text-cyan-600" />
              <span>Documents Hub (DigiLocker Records)</span>
            </Link>

            <Link
              to="/problem-solver"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold flex items-center gap-2.5 border border-amber-200/60"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Solve a Citizen Problem</span>
            </Link>

            <Link
              to="/ai-saathi"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold flex items-center gap-2.5 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>AI Saathi Voice & Multilingual Guide</span>
            </Link>
          </nav>

          {/* Mobile Preferences & Auth */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
            
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-500">Jurisdiction State:</span>
              <select
                value={userState}
                onChange={(e) => setUserState(e.target.value)}
                className="p-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
              >
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-500">Language:</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="p-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
              >
                {supportedLanguages.map(l => (
                  <option key={l.code} value={l.code}>{l.nativeName} ({l.name})</option>
                ))}
              </select>
            </div>

            {user ? (
              <div className="pt-2 flex items-center justify-between text-xs">
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-bold text-[#2563EB]"
                >
                  Profile ({user.email?.split('@')[0]})
                </Link>
                <button
                  onClick={() => { signOut(); setMobileMenuOpen(false); }}
                  className="font-bold text-rose-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-2 flex items-center gap-3">
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 rounded-xl text-center border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200"
                >
                  Login
                </Link>
                <Link
                  to="/auth?mode=signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-2 rounded-xl text-center bg-[#2563EB] text-white text-xs font-semibold shadow-xs"
                >
                  Sign Up
                </Link>
              </div>
            )}

          </div>

        </div>
      )}

    </header>
  );
};
