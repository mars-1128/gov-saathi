import React from 'react';
import { Sparkles, ShieldCheck, MapPin } from 'lucide-react';
import { AIChatInterface } from '../components/AIChatInterface';
import { useLocation } from '../context/LocationContext';
import { useLanguage } from '../context/LanguageContext';

export const AISaathiPage: React.FC = () => {
  const { state: userState } = useLocation();
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4 h-[calc(100vh-5rem)] flex flex-col">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-md flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/50 border border-blue-400/30 flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h1 className="text-lg font-bold flex items-center gap-2">
              {t('ai_saathi_header')}
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Grounded
              </span>
            </h1>
            <p className="text-xs text-blue-200">
              {t('ai_saathi_sub')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-white/10 text-blue-200 border border-white/10 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('jurisdiction_notice')}: <strong>{userState}</strong></span>
          </span>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-white dark:bg-slate-900">
        <AIChatInterface />
      </div>

    </div>
  );
};
