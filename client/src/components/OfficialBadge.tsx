import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { VerificationStatus } from '../types';

interface OfficialBadgeProps {
  status?: VerificationStatus;
  lastVerified?: string;
  sourceUrl?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const OfficialBadge: React.FC<OfficialBadgeProps> = ({
  status = 'VERIFIED',
  lastVerified,
  sourceUrl,
  size = 'md'
}) => {
  const isVerified = status === 'VERIFIED';

  const formattedDate = lastVerified
    ? new Date(lastVerified).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : 'Recently';

  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
        isVerified
          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
          : 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
      }`}>
        {isVerified ? <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> : <AlertTriangle className="w-3 h-3 text-amber-600" />}
        {isVerified ? 'Official Verified' : 'Needs Review'}
      </span>
    );
  }

  return (
    <div className={`rounded-xl p-3 border ${
      isVerified
        ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200'
        : 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200'
    }`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className={`w-5 h-5 ${isVerified ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`} />
          <div>
            <div className="font-semibold text-sm flex items-center gap-1.5">
              {isVerified ? 'Official Government Service' : 'Verification In Progress'}
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-mono">
                .gov.in / .nic.in
              </span>
            </div>
            <div className="text-xs opacity-75 mt-0.5">
              Verified by Gov Saathi Audit on {formattedDate}
            </div>
          </div>
        </div>
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs flex items-center gap-1 font-medium hover:underline text-emerald-700 dark:text-emerald-300"
          >
            Source <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
};
