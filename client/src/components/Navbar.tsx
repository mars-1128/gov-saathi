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
  Moon
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
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* 1. LEFT LOGO & BRAND */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Blue squircle shield icon */}
            <div className="w-11 h-11 rounded-2xl bg-[#2563EB] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6 fill-white/20 stroke-[2.2]" />
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
              <p className="text-[9px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase mt-0.5">
                CITIZEN DOCUMENT & SERVICE NAVIGATOR
              </p>
            </div>
          </Link>

          {/* 2. CENTER NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2 text-[13px] font-semibold text-slate-600 dark:text-slate-300">
            <Link
              to="/"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-colors ${
                isActive('/')
                  ? 'text-[#2563EB] dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40'
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <Home className="w-4 h-4 text-slate-400 group-hover:text-[#2563EB]" />
              <span>Home</span>
            </Link>

            <Link
              to="/documents"
              className={`px-3.5 py-2 rounded-xl transition-colors ${
                isActive('/documents')
                  ? 'text-[#2563EB] dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40'
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              Documents Hub
            </Link>

            <Link
              to="/problem-solver"
              className={`px-3.5 py-2 rounded-xl transition-colors ${
                isActive('/problem-solver')
                  ? 'text-[#2563EB] dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40'
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              How It Works
            </Link>

            <Link
              to="/ai-saathi"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-colors ${
                isActive('/ai-saathi')
                  ? 'text-[#2563EB] dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40'
                  : 'hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI Assistant</span>
            </Link>
          </nav>

          {/* 3. RIGHT CONTROLS: LANGUAGE DROPDOWN, LOGIN & SIGN UP */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Language Selector Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 hover:bg-slate-100 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentLangObj.name} ({currentLangObj.nativeName})</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200/80 dark:border-slate-800 py-1.5 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                    Select Guidance Language
                  </div>
                  {supportedLanguages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                        language === l.code ? 'font-bold text-[#2563EB] bg-blue-50/60 dark:bg-blue-950/40' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="font-medium">{l.name}</span>
                      <span className="text-[11px] text-slate-400 font-normal">{l.nativeName}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Authentication Buttons */}
            {user ? (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-xs font-semibold text-slate-800 dark:text-slate-200"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {user.email?.[0].toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate">{user.email?.split('@')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 text-xs">
                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-300"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/profile#saved"
                      onClick={() => setUserDropdownOpen(false)}
                      className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-300"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                      <span>Saved Services</span>
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800"
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
                  className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-sm shadow-blue-500/20 hover:shadow-md hover:shadow-blue-500/30 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

          </div>

          {/* 4. MOBILE HAMBURGER BUTTON */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/ai-saathi"
              className="p-2 rounded-xl bg-blue-50 text-blue-600 text-xs font-bold flex items-center gap-1"
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

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 space-y-3 shadow-xl">
          <nav className="flex flex-col gap-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-50 flex items-center gap-2"
            >
              <Home className="w-4 h-4 text-slate-400" />
              <span>Home</span>
            </Link>
            <Link
              to="/documents"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-50"
            >
              Documents Hub
            </Link>
            <Link
              to="/problem-solver"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-50"
            >
              How It Works
            </Link>
            <Link
              to="/ai-saathi"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl bg-blue-50 text-blue-700 font-bold flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>AI Assistant</span>
            </Link>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)} className="text-slate-600 font-semibold">
                Login
              </Link>
              <Link to="/auth?mode=signup" onClick={() => setMobileMenuOpen(false)} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold">
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
