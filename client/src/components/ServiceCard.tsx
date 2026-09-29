import React from 'react';
import { Link } from 'react-router-dom';
import {
  ExternalLink,
  ShieldCheck,
  Building,
  Phone,
  Banknote,
  Smartphone,
  ArrowRight
} from 'lucide-react';
import { GovernmentService } from '../types';
import { SaveButton } from './SaveButton';
import { useLanguage } from '../context/LanguageContext';

interface ServiceCardProps {
  service: GovernmentService;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { t } = useLanguage();

  const getJurisdictionLabel = (jurisdiction?: string) => {
    if (!jurisdiction) return t('jurisdiction_central');
    const jur = jurisdiction.toUpperCase();
    if (jur.includes('CENTRAL')) return t('jurisdiction_central');
    if (jur.includes('STATE')) return t('jurisdiction_state');
    if (jur.includes('MUNICIPAL') || jur.includes('LOCAL')) return t('jurisdiction_municipal');
    if (jur.includes('DISTRICT')) return t('jurisdiction_district');
    if (jur.includes('PANCHAYAT')) return t('jurisdiction_panchayat');
    return jurisdiction;
  };

  const getJurisdictionBadge = (level: string) => {
    switch (level) {
      case 'MUNICIPAL':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'STATE':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'DISTRICT':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-800';
      case 'CENTRAL':
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800';
    }
  };

  return (
    <div className="gov-service-card group relative p-5 flex flex-col justify-between">
      
      <div>
        {/* Top Meta Badges & Save */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getJurisdictionBadge(service.jurisdiction_level)}`}>
              {getJurisdictionLabel(service.jurisdiction_level)}
            </span>
            <span className="gov-verified-badge inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {t('verified_gov')}
            </span>
          </div>
          <SaveButton serviceId={service.slug} />
        </div>

        {/* Title */}
        <Link to={`/services/${service.slug}`} className="block group-hover:text-[#1B365D] transition-colors">
          <h3 className="font-bold text-base text-[#1B365D] dark:text-white line-clamp-2">
            {service.name}
          </h3>
        </Link>

        {/* Department */}
        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <Building className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
          <span className="truncate">{service.department}</span>
        </div>

        {/* Simple Citizen Description */}
        <p className="mt-3 text-xs text-[#333333] dark:text-slate-300 line-clamp-3 leading-relaxed">
          {service.simple_description || service.description}
        </p>

        {/* Details Pills */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <Banknote className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-medium text-slate-700 dark:text-slate-300">{service.fee || t('free_of_cost')}</span>
          </div>

          {service.official_helpline && (
            <div className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#1B365D] dark:text-blue-400" />
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{service.official_helpline}</span>
            </div>
          )}

          {service.official_app && (
            <div className="flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-purple-600" />
              <span className="truncate max-w-[120px] font-medium text-slate-700 dark:text-slate-300">{service.official_app}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <Link
          to={`/services/${service.slug}`}
          className="text-xs font-semibold text-[#1B365D] dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          {t('view_steps_requirements')}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <a
          href={service.official_website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1B365D] hover:bg-[#0A2540] text-white dark:bg-blue-600 dark:hover:bg-blue-700 text-xs font-semibold shadow-sm transition-all"
        >
          <span>{t('open_portal')}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

    </div>
  );
};
