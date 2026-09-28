import React, { createContext, useContext, useState } from 'react';

export type LanguageCode = 'en' | 'hi' | 'te' | 'kn' | 'ta';

export interface LanguageMeta {
  code: LanguageCode;
  label: string;
  nativeName: string;
  speechLocale: string;
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', label: 'English', nativeName: 'English', speechLocale: 'en-IN' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी', speechLocale: 'hi-IN' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు', speechLocale: 'te-IN' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ', speechLocale: 'kn-IN' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்', speechLocale: 'ta-IN' },
];

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    te: string;
    kn: string;
    ta: string;
  };
}

const UI_DICTIONARY: Translations = {
  app_name: {
    en: 'Gov Saathi',
    hi: 'सरकार साथी',
    te: 'గవ్ సాథి',
    kn: 'ಗವ್ ಸಾಥಿ',
    ta: 'கவ் சாத்தி'
  },
  tagline: {
    en: 'Your Guide to Government Services',
    hi: 'सरकारी सेवाओं के लिए आपका मार्गदर्शक',
    te: 'ప్రభుత్వ సేవలకు మీ మార్గదర్శి',
    kn: 'ಸರ್ಕಾರಿ ಸೇವೆಗಳಿಗೆ ನಿಮ್ಮ ಮಾರ್ಗದರ್ಶಿ',
    ta: 'அரசு சேவைகளுக்கான உங்கள் வழிகாட்டி'
  },
  search_placeholder: {
    en: 'What do you need help with? (e.g. pothole, passport, scam, marksheets)',
    hi: 'आपको किस चीज़ में मदद चाहिए? (उदा. सड़क का गड्ढा, पासपोर्ट, ऑनलाइन धोखाधड़ी)',
    te: 'మీకు దేనితో సహాయం కావాలి? (ఉదా. రోడ్డు గుంత, పాస్‌పోర్ట్, ఆన్‌లైన్ మోసం)',
    kn: 'ನಿಮಗೆ ಯಾವುದರಲ್ಲಿ ಸಹಾಯ ಬೇಕು? (ಉದಾ. ರಸ್ತೆ ಗುಂಡಿ, ಪಾಸ್‌ಪೋರ್ಟ್, ಸೈಬರ್ ವಂಚನೆ)',
    ta: 'உங்களுக்கு எதில் உதவி தேவை? (எ.கா. சாலை குழி, பாஸ்போர்ட், இணைய மோசடி)'
  },
  how_can_help: {
    en: 'How can Gov Saathi help you today?',
    hi: 'आज सरकार साथी आपकी कैसे सहायता कर सकता है?',
    te: 'ఈరోజు గవ్ సాథి మీకు ఎలా సహాయం చేయగలదు?',
    kn: 'ಇಂದು ಗವ್ ಸಾಥಿ ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
    ta: 'இன்று கவ் சாத்தி உங்களுக்கு எவ்வாறு உதவ முடியும்?'
  },
  official_portal: {
    en: 'Official Portal',
    hi: 'आधिकारिक पोर्टल',
    te: 'అధికారిక పోర్టల్',
    kn: 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್',
    ta: 'அதிகாரப்பூர்வ தளம்'
  },
  verified_service: {
    en: 'Verified Government Service',
    hi: 'सत्यापित सरकारी सेवा',
    te: 'ధృవీకరించబడిన ప్రభుత్వ సేవ',
    kn: 'ಪರಿಶೀಲಿಸಲಾದ ಸರ್ಕಾರಿ ಸೇವೆ',
    ta: 'சரிபார்க்கப்பட்ட அரசு சேவை'
  },
  solve_problem: {
    en: 'Solve a Citizen Problem',
    hi: 'समस्या का समाधान खोजें',
    te: 'పౌర సమస్యను పరిష్కరించండి',
    kn: 'ಸಮಸ್ಯೆ ಪರಿಹರಿಸಿ',
    ta: 'பிரச்சனைக்கு தீர்வு காணுங்கள்'
  },
  categories: {
    en: 'All Categories',
    hi: 'सभी श्रेणियां',
    te: 'అన్ని వర్గాలు',
    kn: 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
    ta: 'அனைத்து பிரிவுகள்'
  },
  schemes: {
    en: 'Government Schemes',
    hi: 'सरकारी योजनाएं',
    te: 'ప్రభుత్వ పథకాలు',
    kn: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
    ta: 'அரசு திட்டங்கள்'
  },
  apps: {
    en: 'Official Apps',
    hi: 'आधिकारिक ऐप्स',
    te: 'అధికారిక యాప్‌లు',
    kn: 'ಅಧಿಕೃತ ಆ್ಯಪ್‌ಗಳು',
    ta: 'அதிகாரப்பூர்வ செயலிகள்'
  },
  documents: {
    en: 'DigiLocker & Docs',
    hi: 'डिजीलॉकर और दस्तावेज़',
    te: 'డిజిలాకర్ & పత్రాలు',
    kn: 'ಡಿಜಿಲಾಕರ್ & ದಾಖಲೆಗಳು',
    ta: 'டிஜிலாக்கர் & ஆவணங்கள்'
  },
  ai_saathi: {
    en: 'AI Saathi',
    hi: 'एआई साथी',
    te: 'ఏఐ సాథి',
    kn: 'ಎಐ ಸಾಥಿ',
    ta: 'ஏஐ சாத்தி'
  },
  saved: {
    en: 'Saved Services',
    hi: 'सहेजी गई सेवाएं',
    te: 'సేవ్ చేసిన సేవలు',
    kn: 'ಉಳಿಸಿದ ಸೇವೆಗಳು',
    ta: 'சேமித்த சேவைகள்'
  },
  login: {
    en: 'Login / Register',
    hi: 'लॉग इन / पंजीकरण',
    te: 'లాగిన్ / రిజిస్టర్',
    kn: 'ಲಾಗಿನ್ / ನೋಂದಣಿ',
    ta: 'உள்நுழை / பதிவு செய்'
  },
  logout: {
    en: 'Logout',
    hi: 'लॉग आउट',
    te: 'లాగ్ అవుట్',
    kn: 'ಲಾಗ್ ಔಟ್',
    ta: 'வெளியேறு'
  },
  profile: {
    en: 'Profile',
    hi: 'प्रोफ़ाइल',
    te: 'ప్రొఫైల్',
    kn: 'ಪ್ರೊಫೈಲ್',
    ta: 'சுயவிவரம்'
  },
  helpline: {
    en: 'Official Helpline',
    hi: 'हेल्पलाइन नंबर',
    te: 'హెల్ప్‌లైన్ నంబర్',
    kn: 'ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆ',
    ta: 'உதவி எண்'
  },
  open_official: {
    en: 'Open Official Government Portal',
    hi: 'आधिकारिक सरकारी पोर्टल खोलें',
    te: 'అధికారిక ప్రభుత్వ పోర్టల్ తెరవండి',
    kn: 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ',
    ta: 'அதிகாரப்பூர்வ தளத்தை திறக்கவும்'
  }
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  supportedLanguages: LanguageMeta[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    return (localStorage.getItem('gov_saathi_lang') as LanguageCode) || 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    localStorage.setItem('gov_saathi_lang', lang);
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    if (UI_DICTIONARY[key]) {
      return UI_DICTIONARY[key][language] || UI_DICTIONARY[key].en;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, supportedLanguages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
