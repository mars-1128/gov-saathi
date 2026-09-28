import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  initialValue?: string;
  large?: boolean;
}

const CITIZEN_SAMPLE_PROMPTS = [
  'How can I complain about a pothole?',
  'Someone scammed me online',
  'I need a passport',
  'Where can I download my documents?',
  'How do I complain about garbage?',
  'I need an income certificate'
];

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '', large = false }) => {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (onSearch) {
      onSearch(query.trim());
    } else {
      navigate(`/services?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleChipClick = (sample: string) => {
    setQuery(sample);
    if (onSearch) {
      onSearch(sample);
    } else {
      navigate(`/services?search=${encodeURIComponent(sample)}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className={`relative flex items-center rounded-2xl border transition-all duration-300 ${
          large
            ? 'p-2 sm:p-2.5 bg-white/95 dark:bg-slate-900/95 border-slate-300/80 dark:border-slate-700 shadow-xl shadow-blue-900/5 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-500/10'
            : 'p-1.5 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm focus-within:border-blue-500'
        }`}>
          
          <div className="pl-3 pr-2 text-blue-600 dark:text-blue-400">
            <Search className={large ? "w-6 h-6" : "w-5 h-5"} />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search_placeholder')}
            className={`w-full bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
              large ? 'text-base sm:text-lg font-medium' : 'text-sm'
            }`}
          />

          <button
            type="submit"
            className={`flex items-center gap-1.5 rounded-xl font-semibold transition-all ${
              large
                ? 'px-5 py-3 bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white shadow-md text-sm'
                : 'px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs'
            }`}
          >
            <span>Search</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Suggested Citizen Examples Chips */}
      {large && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Try asking:
          </span>
          {CITIZEN_SAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => handleChipClick(prompt)}
              className="px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-300 transition-all font-medium text-[11px] sm:text-xs shadow-sm hover:scale-[1.02]"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
