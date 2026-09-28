import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'hi' | 'te';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    te: string;
  };
}

const UI_DICTIONARY: Translations = {
  app_name: { en: 'Gov Saathi', hi: 'सरकार साथी', te: 'గవ్ సాథి' },
  tagline: { en: 'Your Guide to Government Services', hi: 'सरकारी सेवाओं के लिए आपका मार्गदर्शक', te: 'ప్రభుత్వ సేవలకు మీ మార్గదర్శి' },
  search_placeholder: { en: 'What do you need help with? (e.g. pothole, passport, scam, marksheets)', hi: 'आपको किस चीज़ में मदद चाहिए? (उदा. सड़क का गड्ढा, पासपोर्ट, ऑनलाइन धोखाधड़ी)', te: 'మీకు దేనితో సహాయం కావాలి? (ఉదా. రోడ్డు గుంత, పాస్‌పోర్ట్, ఆన్‌లైన్ మోసం)' },
  how_can_help: { en: 'How can Gov Saathi help you today?', hi: 'आज सरकार साथी आपकी कैसे सहायता कर सकता है?', te: 'ఈరోజు గవ్ సాథి మీకు ఎలా సహాయం చేయగలదు?' },
  official_portal: { en: 'Official Portal', hi: 'आधिकारिक पोर्टल', te: 'అధికారిక పోర్టల్' },
  verified_service: { en: 'Verified Government Service', hi: 'सत्यापित सरकारी सेवा', te: 'ధృవీకరించబడిన ప్రభుత్వ సేవ' },
  solve_problem: { en: 'Solve a Citizen Problem', hi: 'समस्या का समाधान खोजें', te: 'పౌర సమస్యను పరిష్కరించండి' },
  categories: { en: 'All Categories', hi: 'सभी श्रेणियां', te: 'అన్ని వర్గాలు' },
  schemes: { en: 'Government Schemes', hi: 'सरकारी योजनाएं', te: 'ప్రభుత్వ పథకాలు' },
  apps: { en: 'Official Apps', hi: 'आधिकारिक ऐप्स', te: 'అధికారిక యాప్‌లు' },
  documents: { en: 'DigiLocker & Docs', hi: 'डिजीलॉकर और दस्तावेज़', te: 'డిజిలాకర్ & పత్రాలు' },
  ai_saathi: { en: 'AI Saathi', hi: 'एआई साथी', te: 'ఏఐ సాథి' },
  saved: { en: 'Saved Services', hi: 'सहेजी गई सेवाएं', te: 'సేవ్ చేసిన సేవలు' },
  login: { en: 'Login / Register', hi: 'लॉग इन / पंजीकरण', te: 'లాగిన్ / రిజిస్టర్' },
  logout: { en: 'Logout', hi: 'लॉग आउट', te: 'లాగ్ అవుట్' },
  profile: { en: 'Profile', hi: 'प्रोफ़ाइल', te: 'ప్రొఫైల్' },
  helpline: { en: 'Official Helpline', hi: 'हेल्पलाइन नंबर', te: 'హెల్ప్‌లైన్ నంబర్' },
  open_official: { en: 'Open Official Government Portal', hi: 'आधिकारिक सरकारी पोर्टल खोलें', te: 'అధికారిక ప్రభుత్వ పోర్టల్ తెరవండి' }
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
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
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
