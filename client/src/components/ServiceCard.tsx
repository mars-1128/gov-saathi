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

interface ServiceCardProps {
  service: GovernmentService;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
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
    <div className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-5 shadow-sm hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500/60 transition-all duration-300 flex flex-col justify-between">
      
      <div>
        {/* Top Meta Badges & Save */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getJurisdictionBadge(service.jurisdiction_level)}`}>
              {service.jurisdiction_level}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Verified .gov.in
            </span>
          </div>
          <SaveButton serviceId={service.slug} />
        </div>

        {/* Title */}
        <Link to={`/services/${service.slug}`} className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2">
            {service.name}
          </h3>
        </Link>

        {/* Department */}
        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <Building className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
          <span className="truncate">{service.department}</span>
        </div>

        {/* Simple Citizen Description */}
        <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
          {service.simple_description || service.description}
        </p>

        {/* Details Pills */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <Banknote className="w-3.5 h-3.5 text-emerald-600" />
            <span>{service.fee || 'Free of Cost'}</span>
          </div>

          {service.official_helpline && (
            <div className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-mono font-medium">{service.official_helpline}</span>
            </div>
          )}

          {service.official_app && (
            <div className="flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-purple-600" />
              <span className="truncate max-w-[120px]">{service.official_app}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <Link
          to={`/services/${service.slug}`}
          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          View Steps & Requirements
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <a
          href={service.official_website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white dark:bg-blue-600 dark:hover:bg-blue-700 text-xs font-semibold shadow-sm transition-all"
        >
          <span>Open Portal</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

    </div>
  );
};
