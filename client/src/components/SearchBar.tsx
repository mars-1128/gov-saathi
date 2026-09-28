import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, ArrowRight, Mic, MicOff } from 'lucide-react';
import { useLanguage, LanguageCode } from '../context/LanguageContext';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  initialValue?: string;
  large?: boolean;
}

const CITIZEN_SAMPLE_PROMPTS_BY_LANG: Record<LanguageCode, string[]> = {
  en: [
    'How can I complain about a pothole?',
    'Someone scammed me online through UPI',
    'I need a passport',
    'Where can I download my documents?',
    'How do I complain about garbage?'
  ],
  hi: [
    'सड़क पर गड्ढे की शिकायत कैसे करें?',
    'यूपीआई से ऑनलाइन फ्रॉड हो गया',
    'नया पासपोर्ट कैसे बनवाएं?',
    'डिजीलॉकर से दस्तावेज़ कैसे डाउनलोड करें?',
    'कचरे की शिकायत कहां करें?'
  ],
  te: [
    'రోడ్డుపై గుంత గురించి ఫిర్యాదు ఎలా చేయాలి?',
    'యూపీఐ ఆన్‌లైన్ మోసం జరిగింది',
    'కొత్త పాస్‌పోర్ట్ ఎలా దరఖాస్తు చేయాలి?',
    'డిజిలాకర్ నుండి పత్రాలు ఎలా డౌన్‌లోడ్ చేయాలి?',
    'చెత్త సమస్యపై ఫిర్యాదు ఎలా చేయాలి?'
  ],
  kn: [
    'ರಸ್ತೆಯಲ್ಲಿ ಗುಂಡಿ ಬಿದ್ದಿರುವ ಬಗ್ಗೆ ದೂರು ನೀಡುವುದು ಹೇಗೆ?',
    'ಯುಪಿಐ ಆನ್‌ಲೈನ್ ವಂಚನೆ ನಡೆದಿದೆ',
    'ಹೊಸ ಪಾಸ್‌ಪೋರ್ಟ್‌ಗೆ ಹೇಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು?',
    'ಡಿಜಿಲಾಕರ್‌ನಿಂದ ದಾಖಲೆಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡುವುದು ಹೇಗೆ?',
    'ಕಸದ ಸಮಸ್ಯೆಯ ಬಗ್ಗೆ ದೂರು ನೀಡುವುದು ಹೇಗೆ?'
  ],
  ta: [
    'சாலையில் குழி உள்ளதை புகார் செய்வது எப்படி?',
    'யுபிஐ மூலம் இணையதள பண மோசடி நடந்தது',
    'புதிய பாஸ்போர்ட்டுக்கு எவ்வாறு விண்ணப்பிப்பது?',
    'டிஜிலாக்கரிலிருந்து ஆவணங்களை பதிவிறக்கம் செய்வது எப்படி?',
    'குப்பை பிரச்சனை பற்றி புகார் செய்வது எப்படி?'
  ]
};

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '', large = false }) => {
  const [query, setQuery] = useState(initialValue);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const recognitionRef = useRef<any>(null);

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
      alert('Voice search is not supported in this browser. Please use Chrome, Edge, or Safari.');
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

  const samplePrompts = CITIZEN_SAMPLE_PROMPTS_BY_LANG[language] || CITIZEN_SAMPLE_PROMPTS_BY_LANG.en;

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
            placeholder={
              isListening
                ? 'Listening... speak your problem or question now'
                : t('search_placeholder')
            }
            className={`w-full bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
              large ? 'text-base sm:text-lg font-medium' : 'text-sm'
            }`}
          />

          {/* Voice Input Trigger */}
          <button
            type="button"
            onClick={toggleVoice}
            title={isListening ? 'Stop listening' : 'Voice Search (Speak in any language)'}
            className={`p-2 rounded-xl transition-all mr-1.5 ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-500/30'
                : 'text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {isListening ? (
              <MicOff className="w-5 h-5 animate-bounce" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>

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
          {samplePrompts.map((prompt) => (
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
