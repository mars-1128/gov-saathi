import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, PhoneCall, AlertTriangle, ExternalLink, Heart, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400">
      
      {/* Official Boundaries & Non-Government Disclaimer Banner */}
      <div className="bg-amber-500/10 dark:bg-amber-500/5 border-b border-amber-500/20 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed text-amber-900 dark:text-amber-300">
            <span className="font-bold">Official Citizen Notice & Platform Boundary:</span> Gov Saathi is an independent, AI-powered citizen guidance and discovery platform. 
            <span className="font-semibold"> Gov Saathi is NOT a government department and does NOT submit complaints directly on behalf of citizens.</span> We guide you to the official, verified government portals (.gov.in / .nic.in) where you can securely complete your applications and track complaints.
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Purpose */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow">
                <Shield className="w-4 h-4 fill-white/20 stroke-[2.2]" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight">
                  MyGovSaathi
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  AI
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Empowering Indian citizens with transparent, verified, and AI-grounded guidance for every official government service across Central, State, and Municipal jurisdictions.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              All Official Links Verified via .gov.in
            </div>
          </div>

          {/* Quick Guidance Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3">
              Essential Services
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
              Explore Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/problem-solver" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium text-amber-600 dark:text-amber-400">
                  Solve a Problem Wizard
                </Link>
              </li>
              <li>
                <Link to="/ai-saathi" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  AI Saathi Citizen Assistant
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  All 18 Government Categories
                </Link>
              </li>
              <li>
                <Link to="/schemes" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Welfare Schemes (PM-JAY, PM-Kisan)
                </Link>
              </li>
              <li>
                <Link to="/apps" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Official Mobile Apps (UMANG)
                </Link>
              </li>
              <li>
                <Link to="/documents" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Digital Document Verification
                </Link>
              </li>
            </ul>
          </div>

          {/* National Official Helplines */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200 mb-3 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              National Emergency Helplines
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
            © {new Date().getFullYear()} Gov Saathi. Designed for Indian Citizens.
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
