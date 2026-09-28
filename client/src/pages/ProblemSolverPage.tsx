import React from 'react';
import { HelpCircle } from 'lucide-react';
import { ProblemSolverWizard } from '../components/ProblemSolverWizard';

export const ProblemSolverPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          <HelpCircle className="w-4 h-4" />
          <span>Citizen Redressal Engine</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
          Solve a Citizen Problem
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
          From municipal potholes and overflowing drains to cyber scams and defective goods, Gov Saathi routes you to the exact official authority and step-by-step resolution process.
        </p>
      </div>

      <ProblemSolverWizard />
    </div>
  );
};
