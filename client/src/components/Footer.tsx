import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, PhoneCall, AlertTriangle, ExternalLink, Heart, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { AshokaChakra } from './AshokaChakra';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400">
      
      {/* Official Boundaries & Non-Government Disclaimer Banner */}
      <div className="bg-amber-500/10 dark:bg-amber-500/5 border-b border-amber-500/20 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed text-amber-900 dark:text-amber-300">
            <span className="font-bold">{t('footer_notice_title')} </span>
            {t('footer_notice_text')}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Purpose */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-950 via-indigo-900 to-blue-900 p-0.5 shadow-sm border border-blue-400/30 flex items-center justify-center flex-shrink-0">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[9px] flex items-center justify-center overflow-hidden">
                  <AshokaChakra spinning={true} className="w-5 h-5 text-[#000080] dark:text-blue-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight">
                    GOV SAATHI
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                    Citizen Guide
                  </span>
                </div>
                <p className="text-[9px] text-slate-500 font-medium">नागरिक सेवा साथी • Citizen Guide</p>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('footer_brand_desc')}
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {t('footer_all_links_verified')}
            </div>
          </div>

          {/* Quick Guidance Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              {t('footer_essential_services')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services/swachhata-civic-complaint-app" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Pothole & Garbage Complaints (Swachhata)
                </Link>
              </li>
              <li>
                <Link to="/services/national-cyber-crime-reporting-portal" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Cyber Financial Fraud (1930 Portal)
                </Link>
              </li>
              <li>
                <Link to="/services/digilocker-digital-documents" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  DigiLocker Marksheets & Licences
                </Link>
              </li>
              <li>
                <Link to="/services/cpgrams-public-grievance" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  CPGRAMS Public Grievances
                </Link>
              </li>
              <li>
                <Link to="/services/passport-seva-online" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Passport Seva Online
                </Link>
              </li>
              <li>
                <Link to="/services/uidai-myaadhaar-services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  myAadhaar PVC & Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Citizen Discovery */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              {t('footer_explore_platform')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/problem-solver" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-amber-600 dark:text-amber-400">
                  {t('solve_problem_tab')}
                </Link>
              </li>
              <li>
                <Link to="/ai-saathi" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('ai_guide_tab')}
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('categories_tab')}
                </Link>
              </li>
              <li>
                <Link to="/schemes" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('schemes_tab')}
                </Link>
              </li>
              <li>
                <Link to="/apps" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('apps_tab')}
                </Link>
              </li>
              <li>
                <Link to="/documents" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {t('docs_tab')}
                </Link>
              </li>
            </ul>
          </div>

          {/* National Official Helplines */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              {t('footer_emergency_helplines')}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60">
                <div className="font-semibold text-slate-800 dark:text-slate-200 flex justify-between">
                  <span>Cyber Financial Fraud</span>
                  <a href="tel:1930" className="text-blue-600 dark:text-blue-400 font-mono font-bold">1930</a>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Golden hour immediate bank freeze</div>
              </div>

              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60">
                <div className="font-semibold text-slate-800 dark:text-slate-200 flex justify-between">
                  <span>Consumer Helpline</span>
                  <a href="tel:1915" className="text-blue-600 dark:text-blue-400 font-mono font-bold">1915</a>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Product defects, refunds, unfair billing</div>
              </div>

              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60">
                <div className="font-semibold text-slate-800 dark:text-slate-200 flex justify-between">
                  <span>Aadhaar Helpline</span>
                  <a href="tel:1947" className="text-blue-600 dark:text-blue-400 font-mono font-bold">1947</a>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">UIDAI enrollment & updates</div>
              </div>

              <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60">
                <div className="font-semibold text-slate-800 dark:text-slate-200 flex justify-between">
                  <span>Voter Helpline (ECI)</span>
                  <a href="tel:1950" className="text-blue-600 dark:text-blue-400 font-mono font-bold">1950</a>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Elections and Voter ID cards</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-700 dark:text-slate-300 gap-4">
          <div>
            © {new Date().getFullYear()} {t('footer_copyright')}
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
              Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Hackathon Demo
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
