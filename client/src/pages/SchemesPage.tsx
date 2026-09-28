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
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <Gift className="w-4 h-4" />
          <span>Direct Benefit Transfers & Welfare</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
          Verified Government Welfare Schemes
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Central and State government welfare schemes with audited eligibility rules, benefits, and direct application links.
        </p>
      </div>

      {loading ? (
        <div className="p-16 text-center">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-500">Loading government schemes...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {schemes.map((scheme) => (
            <div
              key={scheme.id}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-sm space-y-6 hover:border-amber-400/50 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  {scheme.target_group}
                </span>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5" /> Official Verified Scheme
                </span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {scheme.name}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {scheme.purpose}
                </p>
              </div>

              {/* Grid with Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white">Verified Benefits:</span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {scheme.benefits}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white">Eligibility Criteria:</span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {scheme.eligibility}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white">Documents Required:</span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {scheme.documents}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white">Application Procedure:</span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-colors"
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
