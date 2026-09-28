import React, { useState } from 'react';
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
  Search,
  HelpCircle,
  FileText
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage, LanguageCode } from '../context/LanguageContext';
import { useLocation, INDIAN_STATES } from '../context/LocationContext';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { state: userState, setState: setUserState } = useLocation();
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-amber-500 p-0.5 shadow-md shadow-blue-500/10">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-700 dark:text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                  GOV SAATHI
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  Citizen Guide
                </span>
              </div>
              <p className="text-[10px] text-slate-700 dark:text-slate-300 font-medium tracking-wide">
                भारत सरकार सेवा साथी
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
            <Link to="/services" className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors">
              Services
            </Link>
            <Link to="/categories" className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors">
              {t('categories')}
            </Link>
            <Link to="/problem-solver" className="px-3 py-2 rounded-lg text-amber-700 dark:text-amber-400 font-semibold hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors flex items-center gap-1">
              <HelpCircle className="w-4 h-4" />
              Solve a Problem
            </Link>
            <Link to="/schemes" className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors">
              {t('schemes')}
            </Link>
            <Link to="/apps" className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors">
              {t('apps')}
            </Link>
            <Link to="/documents" className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors flex items-center gap-1">
              <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              DigiLocker
            </Link>
          </nav>

          {/* Right Action Tools */}
          <div className="hidden lg:flex items-center gap-2">
            
            {/* AI Saathi Trigger Button */}
            <Link
              to="/ai-saathi"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
              <span>AI Saathi</span>
            </Link>

            {/* Jurisdiction State Selector */}
            <div className="relative">
              <button
                onClick={() => { setStateDropdownOpen(!stateDropdownOpen); setLangDropdownOpen(false); setThemeDropdownOpen(false); }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className="max-w-[85px] truncate">{userState}</span>
              </button>

              {stateDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 max-h-72 overflow-y-auto rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-1 z-50 text-xs">
                  <div className="px-3 py-1.5 font-semibold text-slate-400 uppercase text-[10px] border-b border-slate-100 dark:border-slate-800">
                    Select Jurisdiction
                  </div>
                  {INDIAN_STATES.map((st) => (
                    <button
                      key={st}
                      onClick={() => { setUserState(st); setStateDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 ${
                        userState === st ? 'font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => { setLangDropdownOpen(!langDropdownOpen); setStateDropdownOpen(false); setThemeDropdownOpen(false); }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span className="uppercase">{language}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-1 z-50 text-xs">
                  <button
                    onClick={() => { setLanguage('en'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 ${language === 'en' ? 'font-bold text-blue-600' : ''}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => { setLanguage('hi'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 ${language === 'hi' ? 'font-bold text-blue-600' : ''}`}
                  >
                    हिन्दी (Hindi)
                  </button>
                  <button
                    onClick={() => { setLanguage('te'); setLangDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 ${language === 'te' ? 'font-bold text-blue-600' : ''}`}
                  >
                    తెలుగు (Telugu)
                  </button>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <div className="relative">
              <button
                onClick={() => { setThemeDropdownOpen(!themeDropdownOpen); setLangDropdownOpen(false); setStateDropdownOpen(false); }}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Moon className="w-3.5 h-3.5 text-blue-400" /> : theme === 'light' ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Laptop className="w-3.5 h-3.5" />}
              </button>

              {themeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-28 rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-1 z-50 text-xs">
                  <button onClick={() => { setTheme('light'); setThemeDropdownOpen(false); }} className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Sun className="w-3.5 h-3.5 text-amber-500" /> Light
                  </button>
                  <button onClick={() => { setTheme('dark'); setThemeDropdownOpen(false); }} className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Moon className="w-3.5 h-3.5 text-blue-400" /> Dark
                  </button>
                  <button onClick={() => { setTheme('system'); setThemeDropdownOpen(false); }} className="w-full text-left px-3 py-1.5 flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                    <Laptop className="w-3.5 h-3.5" /> System
                  </button>
                </div>
              )}
            </div>

            {/* Saved Link */}
            <Link
              to="/profile#saved"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
              title="Saved Services"
            >
              <Bookmark className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </Link>

            {/* Auth / Profile */}
            {user ? (
              <div className="flex items-center gap-2 pl-1">
                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-100"
                >
                  <UserIcon className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span className="max-w-[70px] truncate">{user.email?.split('@')[0]}</span>
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="text-xs px-2 py-1 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-bold border border-red-200 dark:border-red-900"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="p-1.5 text-slate-500 hover:text-red-600"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                Sign In
              </Link>
            )}

          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/ai-saathi"
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>AI</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col gap-1 text-sm font-medium">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              Home
            </Link>
            <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              Services
            </Link>
            <Link to="/categories" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              {t('categories')}
            </Link>
            <Link to="/problem-solver" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-amber-600 dark:text-amber-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
              Solve a Problem
            </Link>
            <Link to="/schemes" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              {t('schemes')}
            </Link>
            <Link to="/apps" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              {t('apps')}
            </Link>
            <Link to="/documents" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              DigiLocker & Documents
            </Link>
            <Link to="/ai-saathi" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800">
              AI Saathi Citizen Assistant
            </Link>
          </nav>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2 text-xs">
            <select
              value={userState}
              onChange={(e) => setUserState(e.target.value)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800"
            >
              {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 uppercase"
            >
              <option value="en">EN</option>
              <option value="hi">हिन्दी</option>
              <option value="te">తెలుగు</option>
            </select>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800"
            >
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>

          <div className="pt-2">
            {user ? (
              <div className="flex items-center justify-between">
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="text-xs font-semibold text-blue-600">
                  Profile ({user.email})
                </Link>
                <button onClick={() => signOut()} className="text-xs text-red-500 font-medium">
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full py-2 bg-blue-600 text-white font-semibold rounded-lg text-xs"
              >
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
