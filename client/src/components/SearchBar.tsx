import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Mic, MicOff } from 'lucide-react';
import { useLanguage, LanguageCode } from '../context/LanguageContext';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  initialValue?: string;
  large?: boolean;
}

const CITIZEN_SAMPLE_CHIPS: Record<LanguageCode, string[]> = {
  en: [
    'update mobile number in aadhaar',
    'Aadhaar address change',
    'Fetch 12th marksheet DigiLocker',
    'Instant PAN card'
  ],
  hi: [
    'आधार में मोबाइल नंबर अपडेट करें',
    'आधार पता परिवर्तन',
    '12वीं की मार्कशीट डिजीलॉकर',
    'तत्काल पैन कार्ड'
  ],
  te: [
    'ఆధార్‌లో మొబైల్ నంబర్ మార్చండి',
    'ఆధార్ చిరునామా మార్పు',
    '12వ తరగతి మార్కుల జాబితా',
    'తక్షణ పాన్ కార్డ్'
  ],
  kn: [
    'ಆಧಾರ್‌ನಲ್ಲಿ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನವೀಕರಣ',
    'ಆಧಾರ್ ವಿಳಾಸ ಬದಲಾವಣೆ',
    '12ನೇ ತರಗತಿ ಅಂಕಪಟ್ಟಿ',
    'ತ್ವರಿತ ಪ್ಯಾನ್ ಕಾರ್ಡ್'
  ],
  ta: [
    'ஆதாரில் மொபைல் எண் மாற்ற',
    'ஆதார் முகவரி மாற்றம்',
    '12 ஆம் வகுப்பு மதிப்பெண் சான்றிதழ்',
    'உடனடி பான் கார்டு'
  ]
};

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialValue = '', large = false }) => {
  const [query, setQuery] = useState(initialValue);
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();
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
      navigate(`/ai-saathi?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleChipClick = (sample: string) => {
    setQuery(sample);
    if (onSearch) {
      onSearch(sample);
    } else {
      navigate(`/ai-saathi?q=${encodeURIComponent(sample)}`);
    }
  };

  const sampleChips = CITIZEN_SAMPLE_CHIPS[language] || CITIZEN_SAMPLE_CHIPS.en;

  return (
    <div className="w-full max-w-3xl mx-auto">
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
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isListening
                ? 'Listening... speak your request now'
                : "e.g. 'update mobile number in aadhaar', 'fetch 12th marksheet'"
            }
            className="w-full bg-transparent border-none outline-none text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm sm:text-[15px] font-normal"
          />

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

          {/* Ask AI Saathi Blue Button (matches screenshot 2-line layout) */}
          <button
            type="submit"
            className="flex-shrink-0 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold leading-tight shadow-sm hover:shadow transition-all text-center flex flex-col items-center justify-center min-w-[80px]"
          >
            <span>Ask AI</span>
            <span>Saathi</span>
          </button>
        </div>
      </form>

      {/* Suggested Citizen Chips Below Search (matches screenshot) */}
      {large && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-slate-400 dark:text-slate-400">
          <span className="font-normal text-slate-400">
            Try searching:
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
