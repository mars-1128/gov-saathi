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
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLangObj = supportedLanguages.find(l => l.code === language) || supportedLanguages[0];

  const isActive = (path: string) => routerLocation.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-2xs">
      
      {/* 1. TOP NATIONAL UTILITY STRIP */}
      <div className="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/90 dark:bg-slate-950/80 text-[11px] py-1 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: National Portal Indicator */}
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
            <div className="flex items-center gap-1 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-200/80 dark:border-slate-800">
              <MapPin className="w-3 h-3 text-[#2563EB]" />
              <label htmlFor="user-state-select" className="sr-only">Select State</label>
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
                className="flex items-center gap-1 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-200/80 dark:border-slate-800 text-[11px] font-semibold hover:bg-slate-50 text-slate-700 dark:text-slate-200"
                title="Select Language"
              >
                <Globe className="w-3 h-3 text-indigo-600" />
                <span>{currentLangObj.nativeName}</span>
                <ChevronDown className={`w-2.5 h-2.5 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-1 z-50 animate-in fade-in duration-100">
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
              className="p-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
            </button>

          </div>

        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand & Logo */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-[#2563EB] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 fill-white/20 stroke-[2.2]" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  MyGovSaathi
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/80 text-[#2563EB] dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60">
                  AI
                </span>
              </div>
              <p className="text-[8px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase mt-0.5">
                CITIZEN DOCUMENT & SERVICE NAVIGATOR
              </p>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 text-[13px] font-semibold text-slate-600 dark:text-slate-300">
            
            {/* Home */}
            <Link
              to="/"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl transition-colors ${
                isActive('/')
                  ? 'text-[#2563EB] dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40 font-bold'
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>

            {/* Services with Dropdown (All Services & Categories) */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setServicesMenuOpen(!servicesMenuOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl transition-colors ${
                  isActive('/services') || isActive('/categories') || servicesMenuOpen
                    ? 'text-[#2563EB] dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40 font-bold'
                    : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {servicesMenuOpen && (
                <div className="absolute left-0 mt-1 w-56 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200/80 dark:border-slate-800 py-1.5 z-50 animate-in fade-in duration-100">
                  <Link
                    to="/services"
                    onClick={() => setServicesMenuOpen(false)}
                    className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-start gap-2.5 text-xs text-slate-800 dark:text-slate-200"
                  >
                    <Layers className="w-4 h-4 text-[#2563EB] mt-0.5" />
                    <div>
                      <div className="font-bold">All Verified Services</div>
                      <div className="text-[10px] text-slate-500">Aadhaar, Passport, Ration, PAN</div>
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
                      <div className="text-[10px] text-slate-500">Identity, Health, Transport, Police</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Schemes */}
            <Link
              to="/schemes"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl transition-colors ${
                isActive('/schemes')
                  ? 'text-[#2563EB] dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40 font-bold'
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <Gift className="w-3.5 h-3.5 text-amber-500" />
              <span>Schemes</span>
            </Link>

            {/* Official Apps */}
            <Link
              to="/apps"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl transition-colors ${
                isActive('/apps')
                  ? 'text-[#2563EB] dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40 font-bold'
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-purple-500" />
              <span>Official Apps</span>
            </Link>

            {/* Documents Hub */}
            <Link
              to="/documents"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl transition-colors ${
                isActive('/documents')
                  ? 'text-[#2563EB] dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40 font-bold'
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              <span>Documents Hub</span>
            </Link>

            {/* Solve a Problem */}
            <Link
              to="/problem-solver"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl transition-colors ${
                isActive('/problem-solver')
                  ? 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 font-bold border border-amber-200/80 dark:border-amber-800/60'
                  : 'text-amber-800 dark:text-amber-400 hover:bg-amber-50/60 dark:hover:bg-amber-950/30'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Solve a Problem</span>
            </Link>

            {/* AI Saathi Assistant */}
            <Link
              to="/ai-saathi"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all ${
                isActive('/ai-saathi')
                  ? 'bg-[#2563EB] text-white font-bold shadow-xs'
                  : 'bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-300 hover:bg-blue-100 font-bold border border-blue-200/60 dark:border-blue-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>AI Assistant</span>
            </Link>

          </nav>

          {/* Right Action: Auth / Profile Controls */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-xs font-semibold text-slate-800 dark:text-slate-200"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {user.email?.[0].toUpperCase()}
                  </div>
                  <span className="max-w-[110px] truncate">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 text-xs">
                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span>Citizen Profile</span>
                    </Link>
                    <Link
                      to="/profile#saved"
                      onClick={() => setUserDropdownOpen(false)}
                      className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                      <span>Saved Services</span>
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/auth"
                  className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/auth?mode=signup"
                  className="px-3.5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm shadow-blue-500/20 hover:shadow-md transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger & AI Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <Link
              to="/ai-saathi"
              className="p-2 rounded-xl bg-blue-50 text-[#2563EB] text-xs font-bold flex items-center gap-1"
              title="AI Assistant"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto">
          
          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5"
            >
              <Home className="w-4 h-4 text-slate-400" />
              <span>Home</span>
            </Link>

            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5"
            >
              <Layers className="w-4 h-4 text-[#2563EB]" />
              <span>All Verified Services</span>
            </Link>

            <Link
              to="/schemes"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5"
            >
              <Gift className="w-4 h-4 text-amber-500" />
              <span>Government Schemes (Welfare & DBT)</span>
            </Link>

            <Link
              to="/apps"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5"
            >
              <Smartphone className="w-4 h-4 text-purple-500" />
              <span>Official Mobile Apps (UMANG, DigiLocker, mAadhaar)</span>
            </Link>

            <Link
              to="/documents"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5"
            >
              <FileText className="w-4 h-4 text-blue-500" />
              <span>Documents Hub (DigiLocker Records)</span>
            </Link>

            <Link
              to="/problem-solver"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-bold flex items-center gap-2.5 border border-amber-200/60"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Solve a Citizen Problem</span>
            </Link>

            <Link
              to="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5"
            >
              <Award className="w-4 h-4 text-emerald-600" />
              <span>18 Government Categories</span>
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
            
            {/* Mobile State Picker */}
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

            {/* Mobile Language Picker */}
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

            {/* Mobile Auth Actions */}
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
