import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, MicOff, ShieldCheck, ArrowRight, Building, X } from 'lucide-react';
import { useLanguage, LanguageCode } from '../context/LanguageContext';
import { getServices } from '../lib/api';
import { GovernmentService } from '../types';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  initialValue?: string;
  large?: boolean;
}

const CITIZEN_SAMPLE_CHIPS: Record<LanguageCode, string[]> = {
  en: [
    'Aadhaar Card Download',
    'Instant PAN Card',
    'DigiLocker Marksheets',
    'Driving Licence',
    'Electricity & Water Bills',
    'Swachhata / Potholes'
  ],
  hi: [
    'आधार कार्ड डाउनलोड',
    'तत्काल पैन कार्ड',
    'डिजीलॉकर मार्कशीट',
    'ड्राइविंग लाइसेंस',
    'बिजली और पानी बिल',
    'सड़क के गड्ढे और स्वच्छता'
  ],
  te: [
    'ఆధార్ కార్డ్ డౌన్‌లోడ్',
    'తక్షణ పాన్ కార్డ్',
    'డిజిలాకర్ మార్కుల జాబితా',
    'డ్రైవింగ్ లైసెన్స్',
    'విద్యుత్ & నీటి బిల్లులు',
    'రోడ్డు గుంతలు & పారిశుధ్యం'
  ],
  kn: [
    'ಆಧಾರ್ ಕಾರ್ಡ್ ಡೌನ್‌ಲೋಡ್',
    'ತ್ವರಿತ ಪ್ಯಾನ್ ಕಾರ್ಡ್',
    'ಡಿಜಿಲಾಕರ್ ಅಂಕಪಟ್ಟಿ',
    'ಚಾಲನಾ ಪರವಾನಗಿ',
    'ವಿದ್ಯುತ್ & ನೀರು ಬಿಲ್',
    'ರಸ್ತೆ ಗುಂಡಿಗಳು & ಸ್ವಚ್ಛತೆ'
  ],
  ta: [
    'ஆதார் அட்டை பதிவிறக்கம்',
    'உடனடி பான் கார்டு',
    'டிஜிலாக்கர் மதிப்பெண் சான்றிதழ்',
    'ஓட்டுநர் உரிமம்',
    'மின்சாரம் & குடிநீர் கட்டணம்',
    'சாலை குழிகள் & தூய்மை'
  ]
};

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '', large = false }) => {
  const [query, setQuery] = useState(initialValue);
  const [isListening, setIsListening] = useState(false);
  const [results, setResults] = useState<GovernmentService[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const recognitionRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync initialValue
  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  // Handle clicking outside to dismiss live dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Live search debounce
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const services = await getServices({ search: trimmed });
        setResults(services.slice(0, 5));
        setIsOpen(true);
      } catch (err) {
        console.error('Live search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  const toggleVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice search is not supported in this browser. Please use Google Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {
        // ignore
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      const localeMap: Record<LanguageCode, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        te: 'te-IN',
        kn: 'kn-IN',
        ta: 'ta-IN'
      };

      recognition.lang = localeMap[language] || 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setQuery(transcript);
        setIsOpen(true);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (e) {
      console.error('Speech recognition failed:', e);
      setIsListening(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (!query.trim()) return;

    if (onSearch) {
      onSearch(query.trim());
    } else {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleChipClick = (sample: string) => {
    setQuery(sample);
    setIsOpen(false);
    if (onSearch) {
      onSearch(sample);
    } else {
      navigate(`/search?q=${encodeURIComponent(sample)}`);
    }
  };

  const handleSelectService = (slug: string) => {
    setIsOpen(false);
    navigate(`/services/${slug}`);
  };

  const sampleChips = CITIZEN_SAMPLE_CHIPS[language] || CITIZEN_SAMPLE_CHIPS.en;

  return (
    <div ref={containerRef} className="w-full max-w-3xl mx-auto relative">
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className={`relative flex items-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg shadow-blue-900/5 transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 ${
          large ? 'p-2 sm:p-2.5 pl-4' : 'p-1.5 pl-3'
        }`}>
          
          {/* Search Icon */}
          <div className="text-slate-400 dark:text-slate-500 mr-3 flex-shrink-0">
            <Search className={large ? "w-5 h-5 text-slate-400" : "w-4 h-4 text-slate-400"} />
          </div>

          {/* Text Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.trim().length >= 2) setIsOpen(true);
            }}
            onFocus={() => {
              if (query.trim().length >= 2 && results.length > 0) setIsOpen(true);
            }}
            placeholder={
              isListening
                ? t('listening_hint')
                : t('search_placeholder')
            }
            className="w-full bg-transparent border-none outline-none text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm sm:text-[15px] font-normal"
          />

          {/* Clear Button */}
          {query.trim() && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
                setIsOpen(false);
              }}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg mr-1 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Voice Input Trigger (Multilingual speech) */}
          <button
            type="button"
            onClick={toggleVoice}
            title={isListening ? 'Stop listening' : 'Voice Search (Speak in any language)'}
            className={`p-2 rounded-xl transition-all mr-2 flex-shrink-0 ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-500/30'
                : 'text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {isListening ? (
              <MicOff className="w-4 h-4 animate-bounce" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>

          {/* Search Button */}
          <button
            type="submit"
            className="flex-shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold leading-tight shadow-sm hover:shadow transition-all text-center flex items-center justify-center gap-1.5 min-w-[80px]"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{t('search')}</span>
          </button>
        </div>
      </form>

      {/* Instant Live Results Dropdown Box */}
      {isOpen && query.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800 animate-in fade-in slide-in-from-top-2 duration-150">
          
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="uppercase tracking-wider text-[11px]">
              Matching Government Services ({results.length})
            </span>
            {isLoading && (
              <span className="text-[11px] text-blue-600 dark:text-blue-400 animate-pulse">
                Searching verified services...
              </span>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
            {results.length > 0 ? (
              results.map((service) => (
                <div
                  key={service.id || service.slug}
                  onClick={() => handleSelectService(service.slug)}
                  className="p-3.5 sm:p-4 hover:bg-blue-50/60 dark:hover:bg-slate-800/80 cursor-pointer transition-colors flex items-start justify-between gap-3 text-left group"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Verified Official
                      </span>
                      <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800">
                        {service.jurisdiction_level || 'CENTRAL'}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-[#1B365D] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                      {service.name}
                    </h4>

                    {service.department && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate flex items-center gap-1">
                        <Building className="w-3 h-3 flex-shrink-0 text-slate-400" />
                        <span>{service.department}</span>
                      </p>
                    )}

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1 font-normal">
                      {service.simple_description || service.description}
                    </p>
                  </div>

                  <div className="flex-shrink-0 flex items-center text-blue-600 dark:text-blue-400 text-xs font-semibold gap-1 group-hover:translate-x-0.5 transition-transform pt-1">
                    <span className="hidden sm:inline">Open Box</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              ))
            ) : !isLoading ? (
              <div className="p-6 text-center text-slate-500 dark:text-slate-400 space-y-1">
                <p className="text-xs font-medium">No direct matching service found for "{query}"</p>
                <p className="text-[11px] text-slate-400">Press Enter or click Search to search across all government portals.</p>
              </div>
            ) : null}
          </div>

          {/* Bottom Action: View all on Search Results Page */}
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 text-center">
            <button
              type="button"
              onClick={handleSearchSubmit}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1.5"
            >
              <span>View full official results for "{query}"</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

      {/* Suggested Citizen Chips Below Search */}
      {large && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-slate-400 dark:text-slate-400">
          <span className="font-normal text-slate-400">
            {t('try_searching')}
          </span>
          {sampleChips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleChipClick(chip)}
              className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:underline transition-colors text-xs font-normal"
            >
              "{chip}"
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
