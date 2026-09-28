import React, { useEffect, useState } from 'react';
import { Smartphone, ExternalLink, ShieldCheck, Download, RefreshCw } from 'lucide-react';
import { getApps } from '../lib/api';
import { GovernmentApp } from '../types';

export const AppsPage: React.FC = () => {
  const [apps, setApps] = useState<GovernmentApp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApps()
      .then(setApps)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
          <Smartphone className="w-4 h-4" />
          <span>Mobile Governance</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
          Official Government Mobile Apps
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Verified, genuine mobile applications developed by Central and State ministries. Carry legally valid documents, book gas cylinders, check PF passbooks, and lodge municipal civic grievances.
        </p>
      </div>

      {loading ? (
        <div className="p-16 text-center">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-500">Loading verified apps...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <div
              key={app.name}
              className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-sm flex flex-col justify-between hover:border-purple-400/60 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-900 flex items-center justify-center text-purple-700 dark:text-purple-300">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Verified Genuine
                  </span>
                </div>

                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  {app.name}
                </h3>
                <div className="text-xs font-medium text-slate-500 mt-0.5">
                  {app.department}
                </div>

                <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {app.purpose}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 space-y-1">
                  <div><strong>Platform:</strong> {app.platform}</div>
                  <div><strong>Publisher:</strong> Ministry of Electronics & IT / NIC</div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <a
                  href={app.official_source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md transition-colors"
                >
                  <span>Open Official App Site</span>
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
