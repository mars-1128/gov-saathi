import React, { useEffect, useState } from 'react';
import { Gift, ExternalLink, ShieldCheck, CheckCircle2, FileText, ArrowRight, RefreshCw } from 'lucide-react';
import { getSchemes } from '../lib/api';
import { GovernmentScheme } from '../types';

export const SchemesPage: React.FC = () => {
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSchemes()
      .then(setSchemes)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          <Gift className="w-4 h-4" />
          <span>Direct Benefit Transfers & Welfare</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1B365D] dark:text-white mt-1">
          Verified Government Welfare Schemes
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Central and State government welfare schemes with audited eligibility rules, benefits, and direct application links.
        </p>
      </div>

      {loading ? (
        <div className="p-16 text-center">
          <RefreshCw className="w-8 h-8 text-[#1B365D] animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-500">Loading government schemes...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {schemes.map((scheme) => (
            <div
              key={scheme.id}
              className="gov-service-card p-6 sm:p-8 space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  {scheme.target_group}
                </span>

                <span className="gov-verified-badge inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Official Verified Scheme
                </span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1B365D] dark:text-white">
                  {scheme.name}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#333333] dark:text-slate-300 leading-relaxed font-normal">
                  {scheme.purpose}
                </p>
              </div>

              {/* Grid with Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                <div className="p-4 rounded-xl bg-[#F8F9FA] dark:bg-slate-800/40 border border-[#E2E8F0] dark:border-slate-800/60 space-y-1">
                  <span className="font-bold text-[#1B365D] dark:text-white">Verified Benefits:</span>
                  <p className="text-[#333333] dark:text-slate-400 leading-relaxed font-normal">
                    {scheme.benefits}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F9FA] dark:bg-slate-800/40 border border-[#E2E8F0] dark:border-slate-800/60 space-y-1">
                  <span className="font-bold text-[#1B365D] dark:text-white">Eligibility Criteria:</span>
                  <p className="text-[#333333] dark:text-slate-400 leading-relaxed font-normal">
                    {scheme.eligibility}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F9FA] dark:bg-slate-800/40 border border-[#E2E8F0] dark:border-slate-800/60 space-y-1">
                  <span className="font-bold text-[#1B365D] dark:text-white">Documents Required:</span>
                  <p className="text-[#333333] dark:text-slate-400 leading-relaxed font-normal">
                    {scheme.documents}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F9FA] dark:bg-slate-800/40 border border-[#E2E8F0] dark:border-slate-800/60 space-y-1">
                  <span className="font-bold text-[#1B365D] dark:text-white">Application Procedure:</span>
                  <p className="text-[#333333] dark:text-slate-400 leading-relaxed font-normal">
                    {scheme.application_process}
                  </p>
                </div>

              </div>

              {/* CTA Link */}
              <div className="pt-2 flex justify-end">
                <a
                  href={scheme.official_source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1B365D] hover:bg-[#0A2540] text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <span>Apply on Official Scheme Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
