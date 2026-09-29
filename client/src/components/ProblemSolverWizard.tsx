import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  Scale,
  Zap,
  Truck,
  ArrowRight,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Phone,
  RefreshCw,
  Building2,
  Check
} from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { useLanguage } from '../context/LanguageContext';
import { sendAIChatMessage } from '../lib/api';
import { AISaathiResponse } from '../types';

interface ProblemCategory {
  id: string;
  title: string;
  icon: any;
  defaultPrompt: string;
  expectedJurisdiction: string;
  badgeStyle: string;
  subDescription: string;
}

const CATEGORY_I18N: Record<string, Record<string, { title: string; subDescription: string; expectedJurisdiction: string }>> = {
  pothole: {
    en: { title: 'Pothole & Broken Public Roads', subDescription: 'Road repairs, municipal street maintenance, and local civic issues', expectedJurisdiction: 'Municipal / Local Body' },
    hi: { title: 'सड़क के गड्ढे और टूटी सड़कें', subDescription: 'सड़क मरम्मत, नगर निगम रखरखाव और स्थानीय नागरिक समस्याएं', expectedJurisdiction: 'नगरपालिका / स्थानीय निकाय' },
    te: { title: 'రోడ్డు గుంతలు & దెబ్బతిన్న రోడ్లు', subDescription: 'రోడ్డు మరమ్మతులు, పురపాలక నిర్వహణ మరియు స్థానిక సమస్యలు', expectedJurisdiction: 'పురపాలక / స్థానిక సంస్థ' },
    kn: { title: 'ರಸ್ತೆ ಗುಂಡಿಗಳು ಮತ್ತು ಹಾಳಾದ ರಸ್ತೆಗಳು', subDescription: 'ರಸ್ತೆ ದುರಸ್ತಿ, ಪುರಸಭೆ ನಿರ್ವಹಣೆ ಮತ್ತು ಸ್ಥಳೀಯ ನಾಗರಿಕ ಸಮಸ್ಯೆಗಳು', expectedJurisdiction: 'ಪುರಸಭೆ / ಸ್ಥಳೀಯ ಸಂಸ್ಥೆ' },
    ta: { title: 'சாலை குழிகள் & உடைந்த சாலைகள்', subDescription: 'சாலை பழுதுபார்ப்பு, நகராட்சி பராமரிப்பு மற்றும் உள்ளூர் குடிமக்கள் பிரச்சனைகள்', expectedJurisdiction: 'நகராட்சி / உள்ளூர் அமைப்பு' }
  },
  cybercrime: {
    en: { title: 'Online Financial Fraud / UPI Scam', subDescription: 'National Cyber Crime Reporting Portal & golden hour bank account freeze', expectedJurisdiction: 'Central (Helpline 1930)' },
    hi: { title: 'ऑनलाइन वित्तीय धोखाधड़ी / यूपीआई घोटाला', subDescription: 'राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल और तत्काल बैंक खाता फ्रीज', expectedJurisdiction: 'केंद्रीय (हेल्पलाइन 1930)' },
    te: { title: 'ఆన్‌లైన్ ఆర్థిక మోసం / యుపిఐ స్కామ్', subDescription: 'జాతీయ సైబర్ క్రైమ్ రిపోర్టింగ్ పోర్టల్ మరియు తక్షణ బ్యాంక్ ఖాతా ఫ్రీజ్', expectedJurisdiction: 'కేంద్రం (హెల్ప్‌లైన్ 1930)' },
    kn: { title: 'ಆನ್‌ಲೈನ್ ಹಣಕಾಸು ವಂಚನೆ / ಯುಪಿಐ ಹಗರಣ', subDescription: 'ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಅಪರಾಧ ವರದಿ ಪೋರ್ಟಲ್ ಮತ್ತು ತಕ್ಷಣ ಬ್ಯಾಂಕ್ ಖಾತೆ ಫ್ರೀಜ್', expectedJurisdiction: 'ಕೇಂದ್ರ (ಸಹಾಯವಾಣಿ 1930)' },
    ta: { title: 'ஆன்லைன் நிதி மோசடி / யுபிஐ மோசடி', subDescription: 'தேசிய இணைய குற்ற அறிக்கை போர்டல் மற்றும் உடனடி வங்கி கணக்கு முடக்கம்', expectedJurisdiction: 'மத்திய அரசு (உதவி எண் 1930)' }
  },
  consumer: {
    en: { title: 'Consumer Product & Refund Disputes', subDescription: 'National Consumer Helpline, unfair e-commerce trade, and refund claims', expectedJurisdiction: 'Central (NCH 1915)' },
    hi: { title: 'उपभोक्ता उत्पाद और रिफंड विवाद', subDescription: 'राष्ट्रीय उपभोक्ता हेल्पलाइन, ई-कॉमर्स धोखाधड़ी और रिफंड दावे', expectedJurisdiction: 'केंद्रीय (एनसीएच 1915)' },
    te: { title: 'వినియోగదారు ఉత్పత్తి & రీఫండ్ వివాదాలు', subDescription: 'జాతీయ వినియోగదారు హెల్ప్‌లైన్, ఇ-కామర్స్ సమస్యలు మరియు రీఫండ్ క్లెయిమ్‌లు', expectedJurisdiction: 'కేంద్రం (ఎన్‌సిహెచ్ 1915)' },
    kn: { title: 'ಗ್ರಾಹಕ ಉತ್ಪನ್ನ ಮತ್ತು ಮರುಪಾವತಿ ವಿವಾದಗಳು', subDescription: 'ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಹಕ ಸಹಾಯವಾಣಿ, ಇ-ಕಾಮರ್ಸ್ ವಹಿವಾಟು ಮತ್ತು ಮರುಪಾವತಿ ಹಕ್ಕುಗಳು', expectedJurisdiction: 'ಕೇಂದ್ರ (ಎನ್‌ಸಿಎಚ್ 1915)' },
    ta: { title: 'நுகர்வோர் தயாரிப்பு & பணத்தைத் திரும்பப் பெறுதல்', subDescription: 'தேசிய நுகர்வோர் உதவி எண், இ-காமர்ஸ் வர்த்தகம் மற்றும் பணத்தைத் திரும்பப் பெறுதல்', expectedJurisdiction: 'மத்திய அரசு (என்சிஎச் 1915)' }
  },
  garbage: {
    en: { title: 'Garbage Dumps & Drainage Blockage', subDescription: 'MoHUA Swachhata App, local sanitation officers, and waste clearance', expectedJurisdiction: 'Municipal Sanitation' },
    hi: { title: 'कचरा डंप और जल निकासी अवरोध', subDescription: 'स्वच्छता ऐप, स्थानीय सफाई कर्मचारी और कचरा निकासी', expectedJurisdiction: 'नगरपालिका स्वच्छता' },
    te: { title: 'చెత్త కుప్పలు & డ్రైనేజీ అడ్డంకులు', subDescription: 'స్వచ్ఛత యాప్, స్థానిక పారిశుద్ధ్య అధికారులు మరియు వ్యర్థాల తొలగింపు', expectedJurisdiction: 'పురపాలక పారిశుద్ధ్యం' },
    kn: { title: 'ಕಸದ ರಾಶಿಗಳು ಮತ್ತು ಚರಂಡಿ ಕಟ್ಟಿಕೊಳ್ಳುವಿಕೆ', subDescription: 'ಸ್ವಚ್ಛತಾ ಆ್ಯಪ್, ಸ್ಥಳೀಯ ನೈರ್ಮಲ್ಯ ಅಧಿಕಾರಿಗಳು ಮತ್ತು ತ್ಯಾಜ್ಯ ವಿಲೇವಾರಿ', expectedJurisdiction: 'ಪುರಸಭೆ ನೈರ್ಮಲ್ಯ' },
    ta: { title: 'குப்பை மேடுகள் & வடிகால் அடைப்பு', subDescription: 'ஸ்வச்சதா செயலி, உள்ளூர் துப்புரவு அதிகாரிகள் மற்றும் கழிவு அகற்றுதல்', expectedJurisdiction: 'நகராட்சி துப்புரவு' }
  },
  electricity: {
    en: { title: 'Electricity Billing & Power Outage', subDescription: 'State electricity board grievance escalation and meter testing', expectedJurisdiction: 'State Discom' },
    hi: { title: 'बिजली बिलिंग और बिजली कटौती', subDescription: 'राज्य बिजली बोर्ड शिकायत निवारण और मीटर परीक्षण', expectedJurisdiction: 'राज्य डिस्कॉम' },
    te: { title: 'విద్యుత్ బిల్లింగ్ & విద్యుత్ కోతలు', subDescription: 'రాష్ట్ర విద్యుత్ బోర్డు ఫిర్యాదుల పరిష్కారం మరియు మీటర్ పరీక్ష', expectedJurisdiction: 'రాష్ట్ర డిస్కమ్' },
    kn: { title: 'ವಿದ್ಯುತ್ ಬಿಲ್ಲಿಂಗ್ ಮತ್ತು ವಿದ್ಯುತ್ ಕಡಿತ', subDescription: 'ರಾಜ್ಯ ವಿದ್ಯುತ್ ಮಂಡಳಿ ಕುಂದುಕೊರತೆ ಪರಿಹಾರ ಮತ್ತು ಮೀಟರ್ ಪರೀಕ್ಷೆ', expectedJurisdiction: 'ರಾಜ್ಯ ಡಿಸ್ಕಾಮ್' },
    ta: { title: 'மின் கட்டணம் & மின் தடை', subDescription: 'மாநில மின்சார வாரிய குறைதீர்ப்பு மற்றும் மீட்டர் சோதனை', expectedJurisdiction: 'மாநில டிஸ்காம்' }
  },
  gov_delay: {
    en: { title: 'Delayed Government Certificate / Pension', subDescription: 'Administrative escalation via DARPG Central Public Grievance portal', expectedJurisdiction: 'CPGRAMS / State Portal' },
    hi: { title: 'विलंबित सरकारी प्रमाणपत्र / पेंशन', subDescription: 'सीपीजीआरएएमएस केंद्रीय लोक शिकायत पोर्टल के माध्यम से प्रशासनिक निवारण', expectedJurisdiction: 'सीपीजीआरएएमएस / राज्य पोर्टल' },
    te: { title: 'ఆలస్యమైన ప్రభుత్వ సర్టిఫికెట్ / పెన్షన్', subDescription: 'సిపిగ్రామ్స్ కేంద్ర ప్రజా ఫిర్యాదుల పోర్టల్ ద్వారా పరిపాలనా పరిష్కారం', expectedJurisdiction: 'సిపిగ్రామ్స్ / రాష్ట్ర పోర్టల్' },
    kn: { title: 'ವಿಳಂಬವಾದ ಸರ್ಕಾರಿ ಪ್ರಮಾಣಪತ್ರ / ಪಿಂಚಣಿ', subDescription: 'ಸಿಪಿಗ್ರಾಂಸ್ ಕೇಂದ್ರ ಸಾರ್ವಜನಿಕ ಕುಂದುಕೊರತೆ ಪೋರ್ಟಲ್ ಮೂಲಕ ಪರಿಹಾರ', expectedJurisdiction: 'ಸಿಪಿಗ್ರಾಂಸ್ / ರಾಜ್ಯ ಪೋರ್ಟಲ್' },
    ta: { title: 'தாமதமான அரசு சான்றிதழ் / ஓய்வூதியம்', subDescription: 'சிபிஜிஆர்ஏஎம்எஸ் போர்டல் மூலம் நிர்வாக குறைதீர்ப்பு', expectedJurisdiction: 'சிபிஜிஆர்ஏஎம்எஸ் / மாநில தளம்' }
  }
};

const PROBLEM_CATEGORIES: ProblemCategory[] = [
  {
    id: 'pothole',
    title: 'Pothole & Broken Public Roads',
    icon: Truck,
    defaultPrompt: 'There is a severe pothole and broken road near my house creating traffic accidents. How do I get it fixed by the local municipal corporation?',
    expectedJurisdiction: 'Municipal / Local Body',
    badgeStyle: 'bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800',
    subDescription: 'Road repairs, municipal street maintenance, and local civic issues'
  },
  {
    id: 'cybercrime',
    title: 'Online Financial Fraud / UPI Scam',
    icon: ShieldAlert,
    defaultPrompt: 'I was scammed online and money was deducted from my bank account via UPI. How do I immediately report and freeze the transaction?',
    expectedJurisdiction: 'Central (Helpline 1930)',
    badgeStyle: 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-800',
    subDescription: 'National Cyber Crime Reporting Portal & golden hour bank account freeze'
  },
  {
    id: 'consumer',
    title: 'Consumer Product & Refund Disputes',
    icon: Scale,
    defaultPrompt: 'An e-commerce seller delivered a defective item and is refusing a refund or replacement. How do I file a consumer complaint?',
    expectedJurisdiction: 'Central (NCH 1915)',
    badgeStyle: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800',
    subDescription: 'National Consumer Helpline, unfair e-commerce trade, and refund claims'
  },
  {
    id: 'garbage',
    title: 'Garbage Dumps & Drainage Blockage',
    icon: AlertTriangle,
    defaultPrompt: 'There is an open garbage dump and overflowing sewage drain on our street. How do I lodge a municipal sanitary grievance?',
    expectedJurisdiction: 'Municipal Sanitation',
    badgeStyle: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800',
    subDescription: 'MoHUA Swachhata App, local sanitation officers, and waste clearance'
  },
  {
    id: 'electricity',
    title: 'Electricity Billing & Power Outage',
    icon: Zap,
    defaultPrompt: 'My electricity bill was erroneously inflated or power supply has frequent unannounced blackouts. How do I escalate to the state discom?',
    expectedJurisdiction: 'State Discom',
    badgeStyle: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
    subDescription: 'State electricity board grievance escalation and meter testing'
  },
  {
    id: 'gov_delay',
    title: 'Delayed Government Certificate / Pension',
    icon: Building2,
    defaultPrompt: 'My application for a government certificate/pension has been pending for over 60 days without response from the officer. How do I file on CPGRAMS?',
    expectedJurisdiction: 'CPGRAMS / State Portal',
    badgeStyle: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    subDescription: 'Administrative escalation via DARPG Central Public Grievance portal'
  }
];

export const ProblemSolverWizard: React.FC = () => {
  const { state: userState } = useLocation();
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<ProblemCategory | null>(null);
  const [customDetails, setCustomDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AISaathiResponse | null>(null);

  const getLocalizedCategory = (cat: ProblemCategory) => {
    const i18n = CATEGORY_I18N[cat.id]?.[language] || CATEGORY_I18N[cat.id]?.en;
    if (i18n) {
      return {
        ...cat,
        title: i18n.title,
        subDescription: i18n.subDescription,
        expectedJurisdiction: i18n.expectedJurisdiction
      };
    }
    return cat;
  };

  const handleSelectProblem = async (cat: ProblemCategory) => {
    setSelectedCategory(cat);
    setResult(null);
    setCustomDetails('');
    setLoading(true);

    try {
      const res = await sendAIChatMessage({
        message: cat.defaultPrompt,
        state: userState,
        language: language
      });
      if (res && res.data) {
        setResult(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDetails.trim()) return;

    setLoading(true);
    try {
      const prompt = selectedCategory
        ? `${selectedCategory.title}: ${customDetails}`
        : customDetails;

      const res = await sendAIChatMessage({
        message: prompt,
        state: userState,
        language: language
      });
      if (res && res.data) {
        setResult(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 shadow-xs overflow-hidden">
      
      {/* 1. SECTION HEADER (CLEAN & FORMAL) */}
      <div className="p-6 sm:p-8 bg-[#F8FAFC] dark:bg-slate-900 border-b border-[#E2E8F0] dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B365D] dark:text-blue-400 mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t('problem_solver_title')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1B365D] dark:text-white tracking-tight">
              {t('problem_solver_subtitle')}
            </h2>
            <p className="text-xs sm:text-sm text-[#4A5568] dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
              {t('problem_solver_desc')}
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300">
            <span>{t('active_region')}</span>
            <strong className="text-[#1B365D] dark:text-white">{userState}</strong>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        
        {/* 2. STRUCTURED WHITE SERVICE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {PROBLEM_CATEGORIES.map((rawCat) => {
            const cat = getLocalizedCategory(rawCat);
            const Icon = cat.icon;
            const isSelected = selectedCategory?.id === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelectProblem(rawCat)}
                className={`text-left p-5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#F8FAFC] dark:bg-slate-800/80 border-[#1B365D] dark:border-blue-500 shadow-sm ring-1 ring-[#1B365D]'
                    : 'bg-white dark:bg-slate-900 border-[#E2E8F0] dark:border-slate-800 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className={`p-2.5 rounded-lg border ${
                      isSelected
                        ? 'bg-[#1B365D] text-white border-[#1B365D]'
                        : 'bg-[#F8FAFC] dark:bg-slate-800 text-[#1B365D] dark:text-blue-400 border-slate-200 dark:border-slate-700'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${cat.badgeStyle}`}>
                      {cat.expectedJurisdiction}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-[#1B365D] dark:text-white leading-snug">
                    {cat.title}
                  </h3>

                  <p className="text-xs text-[#4A5568] dark:text-slate-400 mt-1.5 leading-relaxed">
                    {cat.subDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-[#1B365D] dark:text-blue-400">
                  <span>{isSelected ? t('currently_viewing_solution') : t('resolve_with_authority')}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1' : ''}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* 3. LOADING STATE */}
        {loading && (
          <div className="p-10 text-center rounded-xl bg-[#F8FAFC] dark:bg-slate-800/50 border border-[#E2E8F0] dark:border-slate-800 my-4">
            <RefreshCw className="w-7 h-7 text-[#1B365D] dark:text-blue-400 animate-spin mx-auto mb-2" />
            <h4 className="font-bold text-sm text-[#1B365D] dark:text-white">
              {t('consulting_db')}
            </h4>
            <p className="text-xs text-[#4A5568] dark:text-slate-400 mt-1">
              Validating proper departmental jurisdiction for {userState}.
            </p>
          </div>
        )}

        {/* 4. STRUCTURED GUIDANCE RESULT */}
        {result && !loading && (
          <div className="rounded-xl border border-[#CBD5E1] dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-7 space-y-6 shadow-sm animate-in fade-in duration-200">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E2E8F0] dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#1B365D] text-white">
                  {result.jurisdiction} {t('jurisdiction_header')}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#1B365D] dark:text-white mt-2">
                  {result.service?.name || result.category}
                </h3>
              </div>

              {result.service?.official_helpline && (
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-xs font-bold text-blue-900 dark:text-blue-200">
                  <Phone className="w-4 h-4 text-blue-700 dark:text-blue-300" />
                  <span>{t('helpline_label')}: {result.service.official_helpline}</span>
                </div>
              )}
            </div>

            {/* Answer explanation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                {t('admin_summary')}
              </h4>
              <p className="text-sm text-[#333333] dark:text-slate-200 leading-relaxed font-normal">
                {result.answer}
              </p>
            </div>

            {/* Step-by-Step Instructions */}
            {result.steps && result.steps.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  {t('step_procedure')}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {result.steps.map((st) => (
                    <div key={st.step_number} className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700">
                      <div className="w-6 h-6 rounded-full bg-[#1B365D] text-white font-bold text-xs flex items-center justify-center mb-2">
                        {st.step_number}
                      </div>
                      <div className="font-bold text-xs text-[#1B365D] dark:text-white">
                        {st.title}
                      </div>
                      <div className="text-xs text-[#4A5568] dark:text-slate-300 mt-1 leading-relaxed">
                        {st.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements & Documents */}
            {result.documents && result.documents.length > 0 && (
              <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700">
                <h5 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  {t('mandatory_documents')}
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {result.documents.map((doc, i) => (
                    <li key={i} className="flex items-center gap-2 text-[#333333] dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Open Official Portal CTA */}
            {result.service?.official_website && (
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={result.service.official_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-[#1B365D] hover:bg-[#0A2540] text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <span>{t('open_official_portal')} ({result.service.name})</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <span className="text-[11px] text-[#4A5568] dark:text-slate-400">
                  {t('safety_disclaimer')}
                </span>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
