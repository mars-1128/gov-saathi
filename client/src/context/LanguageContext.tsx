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
  helpline_label: {
    en: 'Helpline',
    hi: 'हेल्पलाइन',
    te: 'హెల్ప్‌లైన్',
    kn: 'ಸಹಾಯವಾಣಿ',
    ta: 'உதவி எண்'
  },
  open_official: {
    en: 'Open Official Government Portal',
    hi: 'आधिकारिक सरकारी पोर्टल खोलें',
    te: 'అధికారిక ప్రభుత్వ పోర్టల్ తెరవండి',
    kn: 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ',
    ta: 'அதிகாரப்பூர்வ தளத்தை திறக்கவும்'
  },
  // AI Guidance & Chat Card labels
  documents_you_need: {
    en: 'Documents You May Need',
    hi: 'आवश्यक दस्तावेज़',
    te: 'మీకు అవసరమైన పత్రాలు',
    kn: 'ನಿಮಗೆ ಬೇಕಾಗಬಹುದಾದ ದಾಖಲೆಗಳು',
    ta: 'உங்களுக்குத் தேவைப்படக்கூடிய ஆவணங்கள்'
  },
  step_by_step: {
    en: 'Step-by-Step Instructions',
    hi: 'चरण-दर-चरण निर्देश',
    te: 'దశలవారీ మార్గదర్శకం',
    kn: 'ಹಂತ-ಹಂತದ ಸೂಚನೆಗಳು',
    ta: 'படிப்படியான வழிகாட்டுதல்கள்'
  },
  verified_gov: {
    en: 'Verified .gov.in',
    hi: 'सत्यापित .gov.in',
    te: 'ధృవీకరించబడిన .gov.in',
    kn: 'ಪರಿಶೀಲಿಸಲಾದ .gov.in',
    ta: 'சரிபார்க்கப்பட்ட .gov.in'
  },
  open_official_portal: {
    en: 'Open Official Verified Portal',
    hi: 'आधिकारिक सत्यापित पोर्टल खोलें',
    te: 'అధికారిక ధృవీకరించబడిన పోర్టల్ తెరవండి',
    kn: 'ಅಧಿಕೃತ ಪರಿಶೀಲಿಸಿದ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ',
    ta: 'அதிகாரப்பூர்வ சரிபார்க்கப்பட்ட போர்ட்டலைத் திறக்கவும்'
  },
  safety_disclaimer: {
    en: 'Gov Saathi does not take your password or submit forms. Complete on the official government site.',
    hi: 'सरकार साथी आपका पासवर्ड नहीं लेता और न ही सीधे फॉर्म जमा करता है। आधिकारिक सरकारी साइट पर ही प्रक्रिया पूरी करें।',
    te: 'గవ్ సాథి మీ పాస్‌వర్డ్‌ను తీసుకోదు లేదా ఫారమ్‌లను సమర్పించదు. అధికారిక ప్రభుత్వ సైట్లోనే ప్రక్రియను పూర్తి చేయండి.',
    kn: 'ಗವ್ ಸಾಥಿ ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ತೆಗೆದುಕೊಳ್ಳುವುದಿಲ್ಲ ಅಥವಾ ಫಾರ್ಮ್ ಸಲ್ಲಿಸುವುದಿಲ್ಲ. ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಸೈಟ್‌ನಲ್ಲಿ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ.',
    ta: 'கவ் சாத்தி உங்கள் கடவுச்சொல்லை எடுக்காது அல்லது படிவங்களை சமர்ப்பிக்காது. அதிகாரப்பூர்வ அரசு தளத்தில் முடிக்கவும்.'
  },
  jurisdiction_district: {
    en: 'District Administration',
    hi: 'जिला प्रशासन',
    te: 'జిల్లా యంత్రాంగం',
    kn: 'ಜಿಲ್ಲಾಡಳಿತ',
    ta: 'மாவட்ட நிர்வாகம்'
  },
  jurisdiction_panchayat: {
    en: 'Gram Panchayat',
    hi: 'ग्राम पंचायत',
    te: 'గ్రామ పంచాయతీ',
    kn: 'ಗ್ರಾಮ ಪಂಚಾಯತ್',
    ta: 'கிராம பஞ்சாயத்து'
  },
  active_jurisdiction: {
    en: 'Active Jurisdiction',
    hi: 'सक्रिय क्षेत्राधिकार',
    te: 'ప్రస్తుత అధికార పరిధి',
    kn: 'ಸಕ್ರಿಯ ನ್ಯಾಯವ್ಯಾಪ್ತಿ',
    ta: 'செயலில் உள்ள அதிகார வரம்பு'
  },
  clear_chat: {
    en: 'Clear Chat',
    hi: 'बातचीत साफ़ करें',
    te: 'చాట్ క్లియర్ చేయండి',
    kn: 'ಚಾಟ್ ತೆರವುಗೊಳಿಸಿ',
    ta: 'அரட்டையை அழிக்கவும்'
  },
  type_message_placeholder: {
    en: 'Ask AI Saathi in any language (or click mic)...',
    hi: 'किसी भी भाषा में एआई साथी से पूछें (या माइक दबाएं)...',
    te: 'ఏదైనా భాషలో ఏఐ సాథిని అడగండి (లేదా మైక్ నొక్కండి)...',
    kn: 'ಯಾವುದೇ ಭಾಷೆಯಲ್ಲಿ ಎಐ ಸಾಥಿಯನ್ನು ಕೇಳಿ (ಅಥವಾ ಮೈಕ್ ಒತ್ತಿ)...',
    ta: 'எந்த மொழியிலும் ஏஐ சாத்தியிடம் கேளுங்கள் (அல்லது மைக் அழுத்தவும்)...'
  },
  suggested_questions: {
    en: 'Suggested Citizen Inquiries',
    hi: 'सुझाए गए नागरिक प्रश्न',
    te: 'సూచించిన పౌర ప్రశ్నలు',
    kn: 'ಸೂಚಿಸಲಾದ ನಾಗರಿಕ ವಿಚಾರಣೆಗಳು',
    ta: 'பரிந்துரைக்கப்பட்ட குடிமக்கள் விசாரணைகள்'
  },
  listening_voice: {
    en: 'Listening... speak now in any language',
    hi: 'सुन रहे हैं... अब किसी भी भाषा में बोलें',
    te: 'వింటున్నాము... ఇప్పుడు ఏదైనా భాషలో మాట్లాడండి',
    kn: 'ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇವೆ... ಈಗ ಮಾತನಾಡಿ',
    ta: 'கேட்கிறது... இப்போது பேசவும்'
  },
  // Navbar keys
  home: {
    en: 'Home',
    hi: 'होम',
    te: 'హోమ్',
    kn: 'ಮುಖಪುಟ',
    ta: 'முகப்பு'
  },
  all_services: {
    en: 'All Services',
    hi: 'सभी सेवाएं',
    te: 'అన్ని సేవలు',
    kn: 'ಎಲ್ಲಾ ಸೇವೆಗಳು',
    ta: 'அனைத்து சேவைகள்'
  },
  categories_tab: {
    en: '18 Categories',
    hi: '18 श्रेणियां',
    te: '18 వర్గాలు',
    kn: '18 ವರ್ಗಗಳು',
    ta: '18 பிரிவுகள்'
  },
  schemes_tab: {
    en: 'Welfare Schemes',
    hi: 'कल्याणकारी योजनाएं',
    te: 'సంక్షేమ పథకాలు',
    kn: 'ಕಲ್ಯಾಣ ಯೋಜನೆಗಳು',
    ta: 'நலத்திட்டங்கள்'
  },
  apps_tab: {
    en: 'Official Apps',
    hi: 'आधिकारिक ऐप्स',
    te: 'అధికారిక యాప్‌లు',
    kn: 'ಅಧಿಕೃತ ಆ್ಯಪ್‌ಗಳು',
    ta: 'அதிகாரப்பூர்வ செயலிகள்'
  },
  docs_tab: {
    en: 'Documents Hub',
    hi: 'दस्तावेज़ केंद्र',
    te: 'పత్రాల కేంద్రం',
    kn: 'ದಾಖಲೆಗಳ ಕೇಂದ್ರ',
    ta: 'ஆவணங்கள் மையம்'
  },
  solve_problem_tab: {
    en: 'Solve a Problem',
    hi: 'समस्या समाधान',
    te: 'సమస్యను పరిష్కరించండి',
    kn: 'ಸಮಸ್ಯೆ ಪರಿಹರಿಸಿ',
    ta: 'பிரச்சனைக்கு தீர்வு'
  },
  ai_guide_tab: {
    en: 'Ask AI Saathi',
    hi: 'एआई साथी से पूछें',
    te: 'ఏఐ సాథిని అడగండి',
    kn: 'ಎಐ ಸಾಥಿ ಕೇಳಿ',
    ta: 'ஏஐ சாத்தியிடம் கேளுங்கள்'
  },
  login_btn: {
    en: 'Login',
    hi: 'लॉग इन',
    te: 'లాగిన్',
    kn: 'ಲಾಗಿನ್',
    ta: 'உள்நுழை'
  },
  signup_btn: {
    en: 'Sign Up',
    hi: 'साइन अप',
    te: 'సైన్ అప్',
    kn: 'ಸೈನ್ ಅಪ್',
    ta: 'பதிவு செய்'
  },
  sign_out: {
    en: 'Sign Out',
    hi: 'साइन आउट',
    te: 'సైన్ అవుట్',
    kn: 'ಸೈನ್ ಔಟ್',
    ta: 'வெளியேறு'
  },
  citizen_profile: {
    en: 'Citizen Profile',
    hi: 'नागरिक प्रोफ़ाइल',
    te: 'పౌర ప్రొఫైల్',
    kn: 'ನಾಗರಿಕ ಪ್ರೊಫೈಲ್',
    ta: 'குடிமக்கள் சுயவிவரம்'
  },
  saved_bookmarks: {
    en: 'Saved Bookmarks',
    hi: 'सहेजे गए बुकमार्क',
    te: 'సేవ్ చేసిన బుక్‌మార్క్‌లు',
    kn: 'ಉಳಿಸಿದ ಬುಕ್‌ಮಾರ್ಕ್‌ಗಳು',
    ta: 'சேமிக்கப்பட்ட புக்மார்க்குகள்'
  },
  national_initiative: {
    en: 'CITIZEN PUBLIC SERVICE DIRECTORY',
    hi: 'नागरिक जन सेवा निर्देशिका',
    te: 'పౌర ప్రజా సేవా డైరెక్టరీ',
    kn: 'ನಾಗರಿಕ ಸಾರ್ವಜನಿಕ ಸೇವಾ ಡೈರೆಕ್ಟರಿ',
    ta: 'குடிமக்கள் பொது சேவை வழிகாட்டி'
  },
  initiative_subtitle: {
    en: 'Verified Directory of Official Government Portals & Services (.gov.in)',
    hi: 'सत्यापित आधिकारिक सरकारी पोर्टलों और योजनाओं का मंच (.gov.in)',
    te: 'ధృవీకరించబడిన అధికారిక ప్రభుత్వ పోర్టల్స్ & సేవల వేదిక (.gov.in)',
    kn: 'ಪರಿಶೀಲಿಸಿದ ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ಗಳು ಮತ್ತು ಸೇವೆಗಳು (.gov.in)',
    ta: 'சரிபார்க்கப்பட்ட அதிகாரப்பூர்வ அரசு போர்ட்டல்கள் மற்றும் சேவைகள் (.gov.in)'
  },
  citizen_guide_badge: {
    en: 'Citizen Guide',
    hi: 'नागरिक साथी',
    te: 'పౌర సాథి',
    kn: 'ನಾಗರಿಕ ಸಾಥಿ',
    ta: 'குடிமக்கள் சாத்தி'
  },
  brand_subtitle_tag: {
    en: 'Citizen Service Navigator',
    hi: 'नागरिक जन सेवा साथी',
    te: 'పౌర సేవా మార్గదర్శి',
    kn: 'ನಾಗರಿಕ ಸೇವಾ ನ್ಯಾವಿಗೇಟರ್',
    ta: 'குடிமக்கள் சேவை வழிகாட்டி'
  },
  brand_subtitle_guide: {
    en: 'Independent Civic Guide',
    hi: 'स्वतंत्र नागरिक मार्गदर्शिका',
    te: 'స్వతంత్ర పౌర మార్గదర్శి',
    kn: 'ಸ್ವತಂತ್ರ ನಾಗರಿಕ ಮಾರ್ಗದರ್ಶಿ',
    ta: 'சுயாதீன குடிமக்கள் வழிகாட்டி'
  },
  hero_platform_badge: {
    en: 'Independent Citizen Discovery Platform',
    hi: 'स्वतंत्र नागरिक सेवा मार्गदर्शिका',
    te: 'స్వతంత్ర పౌర సేవా మార్గదర్శక వేదిక',
    kn: 'ಸ್ವತಂತ್ರ ನಾಗರಿಕ ಸೇವಾ ಮಾರ್ಗದರ್ಶಿ ವೇದಿಕೆ',
    ta: 'சுதந்திர குடிமக்கள் சேவை வழிகாட்டுதல் தளம்'
  },
  official_links_grounded: {
    en: '100% Official .gov.in Links',
    hi: '100% आधिकारिक .gov.in लिंक',
    te: '100% అధికారిక .gov.in లింకులు',
    kn: '100% ಅಧಿಕೃತ .gov.in ಲಿಂಕ್‌ಗಳು',
    ta: '100% அதிகாரப்பூர்வ .gov.in தள இணைப்புகள்'
  },
  // Home Page keys
  hero_title_prefix: {
    en: 'Official Citizen Guide to',
    hi: 'सरकारी सेवाओं के लिए',
    te: 'ప్రభుత్వ సేవల కోసం',
    kn: 'ಸರ್ಕಾರಿ ಸೇವೆಗಳಿಗೆ',
    ta: 'அரசு சேவைகளுக்கான'
  },
  hero_title_highlight: {
    en: 'Government Services',
    hi: 'आधिकारिक नागरिक मार्गदर्शिका',
    te: 'అధికారిక పౌర మార్గదర్శి',
    kn: 'ಅಧಿಕೃತ ನಾಗರಿಕ ಮಾರ್ಗದರ್ಶಿ',
    ta: 'அதிகாரப்பூர்வ குடிமக்கள் வழிகாட்டி'
  },
  hero_description: {
    en: 'Speak or type your requirement in English, हिन्दी, తెలుగు, ಕನ್ನಡ, தமிழ், or any regional language. Gov Saathi identifies the exact government authority, details mandatory documents, and directs you to genuine portals.',
    hi: 'अंग्रेजी, हिन्दी, తెలుగు, ಕನ್ನಡ, தமிழ் या किसी भी क्षेत्रीय भाषा में अपनी आवश्यकता बोलें या लिखें। सरकार साथी सही विभाग की पहचान करता है, आवश्यक दस्तावेज़ बताता है और आधिकारिक पोर्टल पर निर्देशित करता है।',
    te: 'మీ అవసరాన్ని ఇంగ్లీష్, हिन्दी, తెలుగు, ಕನ್ನಡ, தமிழ் లేదా ఏదైనా ప్రాంతీయ భాషలో మాట్లాడండి లేదా టైప్ చేయండి. గవ్ సాథి సరైన ప్రభుత్వ విభాగాన్ని గుర్తిస్తుంది, అవసరమైన పత్రాలను వివరిస్తుంది మరియు అధికారిక పోర్టల్‌కు మార్గనిర్దేశం చేస్తుంది.',
    kn: 'ನಿಮ್ಮ ಅಗತ್ಯವನ್ನು ಇಂಗ್ಲಿಷ್, हिन्दी, తెలుగు, ಕನ್ನಡ, தமிழ் ಅಥವಾ ಯಾವುದೇ ಪ್ರಾದೇಶಿಕ ಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ. ಗವ್ సాಥಿ ಸರಿಯಾದ ಸರ್ಕಾರಿ ಪ್ರಾಧಿಕಾರವನ್ನು ಗುರುತಿಸುತ್ತದೆ, ಅಗತ್ಯ ದಾಖಲೆಗಳನ್ನು ವಿವರಿಸುತ್ತದೆ ಮತ್ತು ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗಳಿಗೆ ನಿರ್ದೇಶಿಸುತ್ತದೆ.',
    ta: 'உங்கள் தேவையை ஆங்கிலம், हिन्दी, తెలుగు, ಕನ್ನಡ, தமிழ் அல்லது எந்தவொரு மொழியிலும் பேசுங்கள் அல்லது எழுதுங்கள். கவ் சாத்தி சரியான அரசு துறையை அடையாளம் கண்டு, தேவையான ஆவணங்களை விளக்கி அதிகாரப்பூர்வ தளங்களுக்கு வழிகாட்டுகிறது.'
  },
  emergency_helplines: {
    en: 'National Emergency & Citizen Helplines',
    hi: 'राष्ट्रीय आपातकालीन और नागरिक हेल्पलाइन',
    te: 'జాతీయ అత్యవసర & పౌర హెల్ప్‌లైన్లు',
    kn: 'ರಾಷ್ಟ್ರೀಯ ತುರ್ತು ಮತ್ತು ನಾಗರಿಕ ಸಹಾಯವಾಣಿಗಳು',
    ta: 'தேசிய அவசர மற்றும் குடிமக்கள் உதவி எண்கள்'
  },
  emergency_helplines_sub: {
    en: 'Toll-free 24x7 direct government assistance',
    hi: 'टोल-फ्री 24x7 प्रत्यक्ष सरकारी सहायता',
    te: 'టోల్-ఫ్రీ 24x7 ప్రత్యక్ష ప్రభుత్వ సహాయం',
    kn: 'ಟೋಲ್-ಫ್ರೀ 24x7 ನೇರ ಸರ್ಕಾರಿ ನೆರவு',
    ta: 'கட்டணமில்லா 24x7 நேரடி அரசு உதவி'
  },
  more_problem_scenarios: {
    en: 'More Problem Scenarios',
    hi: 'अन्य समस्या परिदृश्य',
    te: 'మరిన్ని సమస్యలు & పరిష్కారాలు',
    kn: 'ಇನ್ನಷ್ಟು సమస్య ಸನ್ನಿವೇಶಗಳು',
    ta: 'மேலும் பிரச்சனை தீர்வுகள்'
  },
  featured_services: {
    en: 'Featured Verified Services',
    hi: 'प्रमुख सत्यापित सेवाएं',
    te: 'ప్రముఖ ధృవీకరించబడిన సేవలు',
    kn: 'ಪ್ರಮುಖ ಪರಿಶೀಲಿಸಲಾದ ಸೇವೆಗಳು',
    ta: 'சிறப்பு சரிபார்க்கப்பட்ட சேவைகள்'
  },
  popular_schemes: {
    en: 'Popular Welfare Schemes',
    hi: 'लोकप्रिय कल्याणकारी योजनाएं',
    te: 'ప్రజాదరణ పొందిన సంక్షేమ పథకాలు',
    kn: 'ಜನಪ್ರಿಯ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳು',
    ta: 'பிரபலமான நலத்திட்டங்கள்'
  },
  verified_apps: {
    en: 'Verified Government Apps',
    hi: 'सत्यापित सरकारी ऐप्स',
    te: 'ధృవీకరించబడిన ప్రభుత్వ యాప్‌లు',
    kn: 'ಪರಿಶೀಲಿಸಲಾದ ಸರ್ಕಾರಿ ಆ್ಯಪ್‌ಗಳು',
    ta: 'சரிபார்க்கப்பட்ட அரசு செயலிகள்'
  },
  view_all: {
    en: 'View All',
    hi: 'सभी देखें',
    te: 'అన్నీ చూడండి',
    kn: 'ಎಲ್ಲವನ್ನೂ ನೋಡಿ',
    ta: 'அனைத்தையும் காண்க'
  },
  // Service Detail Page keys
  preparation_checklist: {
    en: 'Pre-Application Preparation Checklist',
    hi: 'आवेदन पूर्व तैयारी चेकलिस्ट',
    te: 'దరఖాస్తు ముందస్తు తయారీ జాబితా',
    kn: 'ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಪೂರ್ವ ಸಿದ್ಧತಾ ಪರಿಶೀಲನಾ ಪಟ್ಟಿ',
    ta: 'விண்ணப்பிப்பதற்கு முந்தைய சரிபார்ப்பு பட்டியல்'
  },
  mandatory_documents: {
    en: 'Mandatory Documents',
    hi: 'अनिवार्य दस्तावेज़',
    te: 'తప్పనిసరి పత్రాలు',
    kn: 'ಕಡ್ಡಾಯ ದಾಖಲೆಗಳು',
    ta: 'கட்டாய ஆவணங்கள்'
  },
  optional_documents: {
    en: 'Optional / If Applicable',
    hi: 'वैकल्पिक / यदि लागू हो',
    te: 'ఐచ్ఛికం / వర్తిస్తే',
    kn: 'ಐಚ್ಛಿಕ / ಅನ್ವಯಿಸಿದರೆ',
    ta: 'விருப்பத்தேர்வு / பொருந்தினால்'
  },
  application_roadmap: {
    en: 'Step-by-Step Official Application Roadmap',
    hi: 'चरण-दर-चरण आधिकारिक आवेदन प्रक्रिया',
    te: 'దశలవారీ అధికారిక దరఖాస్తు రోడ్‌మ్యాప్',
    kn: 'ಹಂತ-ಹಂತದ ಅಧಿಕೃತ ಅರ್ಜಿ ಮಾರ್ಗಸೂಚಿ',
    ta: 'படிப்படியான அதிகாரப்பூர்வ விண்ணப்ப வழிமுறை'
  },
  official_fee: {
    en: 'Official Government Fee',
    hi: 'आधिकारिक सरकारी शुल्क',
    te: 'అధికారిక ప్రభుత్వ రుసుము',
    kn: 'ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಶುಲ್ಕ',
    ta: 'அதிகாரப்பூர்வ அரசு கட்டணம்'
  },
  estimated_timeline: {
    en: 'Estimated Processing Timeline',
    hi: 'अनुमानित प्रक्रिया समय',
    te: 'అంచనా వేసిన ప్రాసెసింగ్ సమయం',
    kn: 'ಅಂದಾಜು ಪ್ರಕ್ರಿಯೆ ಸಮಯ',
    ta: 'மதிப்பிடப்பட்ட செயலாக்க கால அவகாசம்'
  },
  anti_fraud_notice: {
    en: 'Official Verification & Anti-Fraud Notice',
    hi: 'आधिकारिक सत्यापन और धोखाधड़ी विरोधी सूचना',
    te: 'అధికారిక ధృవీకరణ & మోసాల నివారణ హెచ్చరిక',
    kn: 'ಅಧಿಕೃತ ಪರಿಶೀಲನೆ ಮತ್ತು ವಂಚನೆ ವಿರೋಧಿ ಸೂಚನೆ',
    ta: 'அதிகாரப்பூர்வ சரிபார்ப்பு மற்றும் மோசடி எதிர்ப்பு அறிவிப்பு'
  },
  back_to_services: {
    en: 'Back to Services',
    hi: 'सेवाओं पर वापस जाएं',
    te: 'సేవల జాబితాకు తిరిగి వెళ్లండి',
    kn: 'ಸೇವೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ',
    ta: 'சேவைகளுக்குத் திரும்பு'
  },
  share_service: {
    en: 'Share Service',
    hi: 'सेवा साझा करें',
    te: 'సేవను భాగస్వామ్యం చేయండి',
    kn: 'ಸೇವೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ',
    ta: 'சேவையைப் பகிரவும்'
  },
  save_service: {
    en: 'Save Service',
    hi: 'सेवा सहेजें',
    te: 'సేవను సేవ్ చేయండి',
    kn: 'ಸೇವೆಯನ್ನು ಉಳಿಸಿ',
    ta: 'சேவையைச் சேமி'
  },
  saved_service: {
    en: 'Saved',
    hi: 'सहेजा गया',
    te: 'సేవ్ చేయబడింది',
    kn: 'ಉಳಿಸಲಾಗಿದೆ',
    ta: 'சேமிக்கப்பட்டது'
  },
  try_searching: {
    en: 'Try searching:',
    hi: 'खोजने का प्रयास करें:',
    te: 'శోధించడానికి ప్రయత్నించండి:',
    kn: 'ಹುಡುಕಲು ಪ್ರಯತ್ನಿಸಿ:',
    ta: 'தேட முயற்சிக்கவும்:'
  },
  ask_ai_saathi: {
    en: 'Ask AI Saathi',
    hi: 'एआई साथी से पूछें',
    te: 'ఏఐ సాథిని అడగండి',
    kn: 'ಎಐ ಸಾಥಿಯನ್ನು ಕೇಳಿ',
    ta: 'ஏஐ சாத்தியிடம் கேளுங்கள்'
  },
  active_region: {
    en: 'Active Region:',
    hi: 'सक्रिय क्षेत्र:',
    te: 'క్రియాశీల ప్రాంతం:',
    kn: 'ಸಕ್ರಿಯ ಪ್ರದೇಶ:',
    ta: 'செயலில் உள்ள பகுதி:'
  },
  listening_hint: {
    en: 'Listening... speak your request now',
    hi: 'सुन रहा है... अब अपना प्रश्न बोलें',
    te: 'వింటోంది... మీ ప్రశ్నను మాట్లాడండి',
    kn: 'ಆಲಿಸುತ್ತಿದೆ... ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಮಾತನಾಡಿ',
    ta: 'கேட்கிறது... இப்போது உங்கள் கேள்வியைப் பேசுங்கள்'
  },
  verified_fee: {
    en: 'Verified Fee',
    hi: 'सत्यापित शुल्क',
    te: 'ధృవీకరించబడిన రుసుము',
    kn: 'ಪರಿಶೀಲಿಸಿದ ಶುಲ್ಕ',
    ta: 'சரிபார்க்கப்பட்ட கட்டணம்'
  },
  official_helpline: {
    en: 'Official Helpline',
    hi: 'आधिकारिक हेल्पलाइन',
    te: 'అధికారిక హెల్ప్‌లైన్',
    kn: 'ಅಧಿಕೃತ ಸಹಾಯವಾಣಿ',
    ta: 'அதிகாரப்பூர்வ உதவி எண்'
  },
  application_mode: {
    en: 'Application Mode',
    hi: 'आवेदन का तरीका',
    te: 'దరఖాస్తు విధానం',
    kn: 'ಅರ್ಜಿ ವಿಧಾನ',
    ta: 'விண்ணப்பிக்கும் முறை'
  },
  processing_time: {
    en: 'Processing Time',
    hi: 'प्रक्रिया समय',
    te: 'ప్రాసెసింగ్ సమయం',
    kn: 'ಪ್ರಕ್ರಿಯೆ ಸಮಯ',
    ta: 'செயலாக்க நேரம்'
  },
  free_of_cost: {
    en: '100% Free of Cost',
    hi: 'पूरी तरह नि:शुल्क',
    te: 'పూర్తిగా ఉచితం (రూ. 0)',
    kn: 'ಸಂಪೂರ್ಣ ಉಚಿತ (ರೂ. 0)',
    ta: 'முற்றிலும் இலவசம் (ரூ. 0)'
  },
  official_touchpoints: {
    en: 'Official Government Access Touchpoints',
    hi: 'आधिकारिक सरकारी संपर्क बिंदु',
    te: 'అధికారిక ప్రభుత్వ సేవలను పొందే మార్గాలు',
    kn: 'ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಸಂಪರ್ಕ ಕೇಂದ್ರಗಳು',
    ta: 'அதிகாரப்பூர்வ அரசு அணுகல் வழிகள்'
  },
  open_official_portal_with_host: {
    en: 'Open Official Government Portal',
    hi: 'आधिकारिक सरकारी पोर्टल खोलें',
    te: 'అధికారిక ప్రభుత్వ పోర్టల్‌ను తెరవండి',
    kn: 'ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ',
    ta: 'அதிகாரப்பூர்வ அரசு தளத்தைத் திறக்கவும்'
  },
  call_helpline: {
    en: 'Call',
    hi: 'कॉल करें',
    te: 'కాల్ చేయండి',
    kn: 'ಕರೆ ಮಾಡಿ',
    ta: 'அழைக்கவும்'
  },
  link_copied: {
    en: 'Link Copied!',
    hi: 'लिंक कॉपी हो गया!',
    te: 'లింక్ కాపీ చేయబడింది!',
    kn: 'ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ!',
    ta: 'இணைப்பு நகலெடுக்கப்பட்டது!'
  },
  email_copied: {
    en: 'Email Copied!',
    hi: 'ईमेल कॉपी हो गया!',
    te: 'ఇమెయిల్ కాపీ చేయబడింది!',
    kn: 'ಇಮೇಲ್ ನಕಲಿಸಲಾಗಿದೆ!',
    ta: 'மின்னஞ்சல் நகலெடுக்கப்பட்டது!'
  },
  who_is_eligible: {
    en: 'Who Is Eligible & Guidelines',
    hi: 'पात्रता और दिशानिर्देश',
    te: 'ఎవరు అర్హులు & మార్గదర్శకాలు',
    kn: 'ಅರ್ಹತೆ ಮತ್ತು ಮಾರ್ಗಸೂಚಿಗಳು',
    ta: 'யார் தகுதியானவர் மற்றும் வழிகாட்டுதல்கள்'
  },
  citizen_eligibility: {
    en: 'Citizen Eligibility',
    hi: 'नागरिक पात्रता',
    te: 'పౌరుల అర్హత',
    kn: 'ನಾಗರಿಕ ಅರ್ಹತೆ',
    ta: 'குடிமக்கள் தகுதி'
  },
  important_conditions: {
    en: 'Important Conditions',
    hi: 'महत्वपूर्ण शर्तें',
    te: 'ముఖ్యమైన నిబంధనలు',
    kn: 'ಪ್ರಮುಖ ನಿಯಮಗಳು',
    ta: 'முக்கிய நிபந்தனைகள்'
  },
  jurisdiction_notice: {
    en: 'Jurisdiction Notice',
    hi: 'अधिकार क्षेत्र सूचना',
    te: 'పరిధి సమాచారం',
    kn: 'ಅಧಿಕಾರ ವ್ಯಾಪ್ತಿ ಮಾಹಿತಿ',
    ta: 'அதிகார வரம்பு அறிவிப்பு'
  },
  what_happens_next: {
    en: 'What Happens After You Apply?',
    hi: 'आवेदन के बाद क्या होता है?',
    te: 'దరఖాస్తు చేసిన తర్వాత ఏమి జరుగుతుంది?',
    kn: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿದ ನಂತರ ಏನಾಗುತ್ತದೆ?',
    ta: 'விண்ணப்பித்த பிறகு என்ன நடக்கும்?'
  },
  timeline_sub: {
    en: 'Clear tracking and time-bound government milestones from submission to resolution.',
    hi: 'जमा करने से लेकर समाधान तक स्पष्ट ट्रैकिंग और समयबद्ध सरकारी मील के पत्थर।',
    te: 'సమర్పణ నుండి పరిష్కారం వరకు స్పష్టమైన ట్రాకింగ్ మరియు సమయపాలన దశలు.',
    kn: 'ಸಲ್ಲಿಕೆಯಿಂದ ಪರಿಹಾರದವರೆಗೆ ಸ್ಪಷ್ಟ ಟ್ರ್ಯಾಕಿಂಗ್ ಮತ್ತು ಸಮಯಬದ್ಧ ಸರ್ಕಾರಿ ಹಂತಗಳು.',
    ta: 'சமர்ப்பித்தல் முதல் தீர்வு வரை தெளிவான கண்காணிப்பு மற்றும் காலக்கெடு நிலைகள்.'
  },
  tips_to_avoid_rejection: {
    en: 'Gov Saathi Tips: Avoid Common Citizen Mistakes',
    hi: 'सरकार साथी सुझाव: सामान्य गलतियों से बचें',
    te: 'గవ్ సాథి చిట్కాలు: సాధారణ పొరపాట్లను నివారించండి',
    kn: 'ಗವ್ ಸಾಥಿ ಸಲಹೆಗಳು: ಸಾಮಾನ್ಯ ತಪ್ಪುಗಳನ್ನು ತಪ್ಪಿಸಿ',
    ta: 'கவ் சாத்தி குறிப்புகள்: பொதுவான தவறுகளைத் தவிர்க்கவும்'
  },
  problem_solver_title: {
    en: 'Interactive Problem Solving Engine',
    hi: 'इंटरैक्टिव समस्या निवारण इंजन',
    te: 'సమస్య పరిష్కార వేదిక',
    kn: 'ಸಮಸ್ಯೆ ಪರಿಹಾರ ವೇದಿಕೆ',
    ta: 'பிரச்சனை தீர்வு தளம்'
  },
  problem_solver_subtitle: {
    en: 'Select Your Citizen Grievance or Issue',
    hi: 'अपनी नागरिक समस्या या शिकायत चुनें',
    te: 'మీ పౌర సమస్య లేదా ఫిర్యాదును ఎంచుకోండి',
    kn: 'ನಿಮ್ಮ ನಾಗರಿಕ ಸಮಸ್ಯೆ ಅಥವಾ ದೂರನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    ta: 'உங்கள் குடிமக்கள் குறை அல்லது பிரச்சனையைத் தேர்ந்தெடுக்கவும்'
  },
  problem_solver_desc: {
    en: 'Gov Saathi analyzes gazetted jurisdictional mandates (Central vs State vs Municipal Local Body) and prepares your step-by-step resolution roadmap with verified links.',
    hi: 'सरकार साथी अधिकृत अधिकार क्षेत्र के जनादेश का विश्लेषण करता है और सत्यापित लिंक के साथ आपका समाधान तैयार करता है।',
    te: 'గవ్ సాథి అధికారిక పరిధిని విశ్లేషించి, ధృవీకరించబడిన లింక్‌లతో మీ దశలవారీ పరిష్కార ప్రణాళికను సిద్ధం చేస్తుంది.',
    kn: 'ಗವ್ ಸಾಥಿ ಅಧಿಕೃತ ವ್ಯಾಪ್ತಿಯನ್ನು ವಿಶ್ಲೇಷಿಸಿ, ಪರಿಶೀಲಿಸಿದ ಲಿಂಕ್‌ಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಹಂತ-ಹಂತದ ಪರಿಹಾರ ಮಾರ್ಗಸೂಚಿಯನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತದೆ.',
    ta: 'கவ் சாத்தி அதிகார வரம்பை ஆய்வு செய்து, சரிபார்க்கப்பட்ட இணைப்புகளுடன் படிப்படியான தீர்வு வரைபடத்தை வழங்குகிறது.'
  },
  resolve_with_authority: {
    en: 'Resolve with Verified Authority',
    hi: 'सत्यापित प्राधिकरण से समाधान पाएं',
    te: 'అధికారిక వ్యవస్థతో పరిష్కరించండి',
    kn: 'ಪರಿಶೀಲಿಸಿದ ಪ್ರಾಧಿಕಾರದೊಂದಿಗೆ ಪರಿಹರಿಸಿ',
    ta: 'அங்கீகரிக்கப்பட்ட அதிகார அமைப்புடன் தீர்க்கவும்'
  },
  currently_viewing_solution: {
    en: 'Currently Viewing Solution',
    hi: 'समाधान देख रहे हैं',
    te: 'ప్రస్తుత పరిష్కారం చూస్తున్నారు',
    kn: 'ಪರಿಹಾರವನ್ನು ವೀಕ್ಷಿಸಲಾಗುತ್ತಿದೆ',
    ta: 'தற்போது தீர்வைப் பார்க்கிறீர்கள்'
  },
  consulting_db: {
    en: 'Consulting Verified Indian Government Database...',
    hi: 'सत्यापित सरकारी डेटाबेस की जाँच की जा रही है...',
    te: 'ధృవీకరించబడిన ప్రభుత్వ డేటాబేస్‌ను సంప్రదిస్తోంది...',
    kn: 'ಸರ್ಕಾರಿ ಡೇಟಾಬೇಸ್ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
    ta: 'அரசு தரவுத்தளம் சரிபார்க்கப்படுகிறது...'
  },
  admin_summary: {
    en: 'Official Administrative Summary',
    hi: 'आधिकारिक प्रशासनिक सारांश',
    te: 'అధికారిక పరిపాలనా సారాంశం',
    kn: 'ಅಧಿಕೃತ ಆಡಳಿತಾತ್ಮಕ ಸಾರಾಂಶ',
    ta: 'அதிகாரப்பூர்வ நிர்வாக சுருக்கம்'
  },
  step_procedure: {
    en: 'Step-by-Step Citizen Procedure',
    hi: 'चरण-दर-चरण नागरिक प्रक्रिया',
    te: 'దశలవారీ పౌర ప్రక్రియ',
    kn: 'ಹಂತ-ಹಂತದ ನಾಗರಿಕ ಪ್ರಕ್ರಿಯೆ',
    ta: 'படிப்படியான குடிமக்கள் செயல்முறை'
  },
  simple_words_when: {
    en: 'In Simple Words: When Should You Use This Service?',
    hi: 'सरल शब्दों में: आपको इस सेवा का उपयोग कब करना चाहिए?',
    te: 'సరళమైన మాటలలో: మీరు ఈ సేవను ఎప్పుడు ఉపయోగించాలి?',
    kn: 'ಸರಳ ಪದಗಳಲ್ಲಿ: ಈ ಸೇವೆಯನ್ನು ನೀವು ಯಾವಾಗ ಬಳಸಬೇಕು?',
    ta: 'எளிய வார்த்தைகளில்: இந்த சேவையை நீங்கள் எப்போது பயன்படுத்த வேண்டும்?'
  },
  all_services_title: {
    en: 'Directory of Verified Government Services',
    hi: 'सत्यापित सरकारी सेवाओं की निर्देशिका',
    te: 'ధృవీకరించబడిన ప్రభుత్వ సేవల జాబితా',
    kn: 'ಪರಿಶೀಲಿಸಲಾದ ಸರ್ಕಾರಿ ಸೇವೆಗಳ ಡೈರೆಕ್ಟರಿ',
    ta: 'சரிபார்க்கப்பட்ட அரசு சேவைகளின் பட்டியல்'
  },
  apps_page_title: {
    en: 'Official Government Mobile Apps',
    hi: 'आधिकारिक सरकारी मोबाइल ऐप्स',
    te: 'అధికారిక ప్రభుత్వ మొబైల్ యాప్‌లు',
    kn: 'ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಮೊಬೈಲ್ ಆ್ಯಪ್‌ಗಳು',
    ta: 'அதிகாரப்பூர்வ அரசு மொபைல் செயலிகள்'
  },
  schemes_page_title: {
    en: 'Verified Government Welfare Schemes',
    hi: 'सत्यापित सरकारी कल्याणकारी योजनाएं',
    te: 'ధృవీకరించబడిన ప్రభుత్వ సంక్షేమ పథకాలు',
    kn: 'ಪರಿಶೀಲಿಸಲಾದ ಸರ್ಕಾರಿ ಕಲ್ಯಾಣ ಯೋಜನೆಗಳು',
    ta: 'சரிபார்க்கப்பட்ட அரசு நலத்திட்டங்கள்'
  },
  categories_page_title: {
    en: 'Government Service Categories',
    hi: 'सरकारी सेवा श्रेणियां',
    te: 'ప్రభుత్వ సేవా వర్గాలు',
    kn: 'ಸರ್ಕಾರಿ ಸೇವಾ ವರ್ಗಗಳು',
    ta: 'அரசு சேவை பிரிவுகள்'
  },
  docs_page_title: {
    en: 'DigiLocker & Official Document Services',
    hi: 'डिजीलॉकर और आधिकारिक दस्तावेज़ सेवाएं',
    te: 'డిజిలాకర్ & అధికారిక పత్రాల సేవలు',
    kn: 'ಡಿಜಿಲಾಕರ್ ಮತ್ತು ಅಧಿಕೃತ ದಾಖಲೆಗಳ ಸೇವೆಗಳು',
    ta: 'டிஜிலாக்கர் மற்றும் அதிகாரப்பூர்வ ஆவண சேவைகள்'
  },
  open_digilocker: {
    en: 'Open DigiLocker Web Portal',
    hi: 'डिजीलॉकर वेब पोर्टल खोलें',
    te: 'డిజిలాకర్ వెబ్ పోర్టల్ తెరవండి',
    kn: 'ಡಿಜಿಲಾಕರ್ ವೆಬ್ ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ',
    ta: 'டிஜிலாக்கர் இணையதளத்தைத் திறக்கவும்'
  },
  get_official_app: {
    en: 'Get Official App',
    hi: 'आधिकारिक ऐप प्राप्त करें',
    te: 'అధికారిక యాప్ పొందండి',
    kn: 'ಅಧಿಕೃತ ಆ್ಯಪ್ ಪಡೆಯಿರಿ',
    ta: 'அதிகாரப்பூர்வ செயலியைப் பெறுங்கள்'
  },
  all_services_subtitle: {
    en: 'Search and filter verified Central, State, and Municipal government portals across India.',
    hi: 'पूरे भारत में सत्यापित केंद्र, राज्य और नगरपालिका सरकारी पोर्टलों को खोजें और फ़िल्टर करें।',
    te: 'భారతదేశం అంతటా ధృవీకరించబడిన కేంద్ర, రాష్ట్ర మరియు పురపాలక ప్రభుత్వ పోర్టల్స్ వెతకండి మరియు ఫిల్టర్ చేయండి.',
    kn: 'ಭಾರತದಾದ್ಯಂತ ಪರಿಶೀಲಿಸಲಾದ ಕೇಂದ್ರ, ರಾಜ್ಯ ಮತ್ತು ಪುರಸಭೆ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ಫಿಲ್ಟರ್ ಮಾಡಿ.',
    ta: 'இந்தியா முழுவதும் சரிபார்க்கப்பட்ட மத்திய, மாநில மற்றும் நகராட்சி அரசு தளங்களைத் தேடி வடிகட்டுங்கள்.'
  },
  filter_jurisdiction: {
    en: 'Jurisdiction:',
    hi: 'अधिकार क्षेत्र:',
    te: 'పరిధి:',
    kn: 'ಅಧಿಕಾರ ವ್ಯಾಪ್ತಿ:',
    ta: 'அதிகார வரம்பு:'
  },
  all_levels: {
    en: 'All Levels',
    hi: 'सभी स्तर',
    te: 'అన్ని స్థాయిలు',
    kn: 'ಎಲ್ಲಾ ಹಂತಗಳು',
    ta: 'அனைத்து நிலைகளும்'
  },
  central_government: {
    en: 'Central Government',
    hi: 'केंद्र सरकार',
    te: 'కేంద్ర ప్రభుత్వం',
    kn: 'ಕೇಂದ್ರ ಸರ್ಕಾರ',
    ta: 'மத்திய அரசு'
  },
  state_government: {
    en: 'State Government',
    hi: 'राज्य सरकार',
    te: 'రాష్ట్ర ప్రభుత్వం',
    kn: 'ರಾಜ್ಯ ಸರ್ಕಾರ',
    ta: 'மாநில அரசு'
  },
  municipal_local_body: {
    en: 'Municipal / Local Body',
    hi: 'नगर पालिका / स्थानीय निकाय',
    te: 'మున్సిపల్ / స్థానిక సంస్థ',
    kn: 'ಪುರಸಭೆ / ಸ್ಥಳೀಯ ಸಂಸ್ಥೆ',
    ta: 'நகராட்சி / உள்ளாட்சி அமைப்பு'
  },
  district_administration: {
    en: 'District Administration',
    hi: 'जिला प्रशासन',
    te: 'జిల్లా యంత్రాంగం',
    kn: 'ಜಿಲ್ಲಾಡಳಿತ',
    ta: 'மாவட்ட நிர்வாகம்'
  },
  filter_category: {
    en: 'Category:',
    hi: 'श्रेणी:',
    te: 'వర్గం:',
    kn: 'ವರ್ಗ:',
    ta: 'பிரிவு:'
  },
  all_categories: {
    en: 'All Categories',
    hi: 'सभी श्रेणियां',
    te: 'అన్ని వర్గాలు',
    kn: 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
    ta: 'அனைத்து பிரிவுகளும்'
  },
  filter_state: {
    en: 'State:',
    hi: 'राज्य:',
    te: 'రాష్ట్రం:',
    kn: 'ರಾಜ್ಯ:',
    ta: 'மாநிலம்:'
  },
  clear_filters: {
    en: 'Clear Filters',
    hi: 'फ़िल्टर साफ़ करें',
    te: 'ఫిల్టర్‌లను తొలగించండి',
    kn: 'ಫಿಲ್ಟರ್‌ಗಳನ್ನು ತೆರವುಗೊಳಿಸಿ',
    ta: 'வடிகட்டிகளை அழிக்கவும்'
  },
  loading_services: {
    en: 'Loading verified services...',
    hi: 'सत्यापित सेवाएं लोड हो रही हैं...',
    te: 'ధృవీకరించబడిన సేవలు లోడ్ అవుతున్నాయి...',
    kn: 'ಪರಿಶೀಲಿಸಿದ ಸೇವೆಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...',
    ta: 'சரிபார்க்கப்பட்ட சேவைகள் ஏற்றப்படுகின்றன...'
  },
  no_services_found: {
    en: 'No verified services found matching criteria',
    hi: 'मापदंड से मेल खाती कोई सत्यापित सेवा नहीं मिली',
    te: 'ఎంచుకున్న వివరాలకు సరిపోయే సేవలు కనుగొనబడలేదు',
    kn: 'ಆಯ್ಕೆಮಾಡಿದ ವಿವರಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುವ ಯಾವುದೇ ಸೇವೆ ಕಂಡುಬಂದಿಲ್ಲ',
    ta: 'தேர்ந்தெடுக்கப்பட்ட விவரங்களுக்கு பொருந்தும் அரசு சேவை கிடைக்கவில்லை'
  },
  no_services_sub: {
    en: 'Try adjusting your search query, selecting "All Levels", or resetting your state filter.',
    hi: 'अपनी खोज बदलें, "सभी स्तर" चुनें, या अपना राज्य फ़िल्टर रीसेट करें।',
    te: 'మీ శోధనను మార్చండి, "అన్ని స్థాయిలు" ఎంచుకోండి లేదా మీ రాష్ట్ర ఫిల్టర్‌ను రీసెట్ చేయండి.',
    kn: 'ನಿಮ್ಮ ಹುಡುಕಾಟವನ್ನು ಬದಲಾಯಿಸಿ, "ಎಲ್ಲಾ ಹಂತಗಳು" ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ನಿಮ್ಮ ರಾಜ್ಯ ಫಿಲ್ಟರ್ ಮರುಹೊಂದಿಸಿ.',
    ta: 'உங்கள் தேடலை மாற்றவும், "அனைத்து நிலைகள்" தேர்ந்தெடுக்கவும் அல்லது மாநில வடிகட்டியை மீட்டமைக்கவும்.'
  },
  reset_filters: {
    en: 'Reset Filters',
    hi: 'फ़िल्टर रीसेट करें',
    te: 'ఫిల్టర్‌లను రీసెట్ చేయండి',
    kn: 'ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಮರುಹೊಂದಿಸಿ',
    ta: 'வடிகட்டிகளை மீட்டமைக்கவும்'
  },
  showing_verified_count: {
    en: 'verified government services',
    hi: 'सत्यापित सरकारी सेवाएं',
    te: 'ధృవీకరించబడిన ప్రభుత్వ సేవలు',
    kn: 'ಪರಿಶೀಲಿಸಲಾದ ಸರ್ಕಾರಿ ಸೇವೆಗಳು',
    ta: 'சரிபார்க்கப்பட்ட அரசு சேவைகள்'
  },
  view_steps_requirements: {
    en: 'View Steps & Requirements',
    hi: 'चरण और आवश्यकताएं देखें',
    te: 'దశలు & పత్రాలు చూడండి',
    kn: 'ಹಂತಗಳು ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    ta: 'படிகள் மற்றும் தேவைகளைக் காண்க'
  },
  open_portal: {
    en: 'Open Portal',
    hi: 'पोर्टल खोलें',
    te: 'పోర్టల్ తెరవండి',
    kn: 'ಪೋರ್ಟಲ್ ತೆರೆಯಿರಿ',
    ta: 'போர்ட்டலைத் திறக்கவும்'
  },
  ai_saathi_header: {
    en: 'AI Saathi — Citizen Assistant',
    hi: 'एआई साथी — नागरिक सहायक',
    te: 'ఏఐ సాథి — పౌర సహాయకుడు',
    kn: 'ಎಐ ಸಾಥಿ — ನಾಗರಿಕ ಸಹಾಯಕ',
    ta: 'ஏஐ சாத்தி — குடிமக்கள் உதவியாளர்'
  },
  ai_saathi_sub: {
    en: 'Powered by Google Gemini & Verified Indian Government Portals',
    hi: 'गूगल जेमिनी और सत्यापित भारतीय सरकारी पोर्टलों द्वारा संचालित',
    te: 'గూగుల్ జెమిని & ధృవీకరించబడిన భారత ప్రభుత్వ పోర్టల్స్ ద్వారా ఆధారితం',
    kn: 'ಗೂಗಲ್ ಜೆಮಿನಿ ಮತ್ತು ಅಧಿಕೃತ ಭಾರತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ಗಳಿಂದ ಚಾಲಿತವಾಗಿದೆ',
    ta: 'கூகிள் ஜெமினி & சரிபார்க்கப்பட்ட இந்திய அரசு தளங்கள் மூலம் இயக்கப்படுகிறது'
  },
  responds_in_any_language: {
    en: '(Responds in any language)',
    hi: '(किसी भी भाषा में उत्तर देता है)',
    te: '(ఏ భాషలోనైనా సమాధానమిస్తుంది)',
    kn: '(ಯಾವುದೇ ಭಾಷೆಯಲ್ಲಿ ಉತ್ತರಿಸುತ್ತದೆ)',
    ta: '(எந்த மொழியிலும் பதிலளிக்கும்)'
  },
  stop: {
    en: 'Stop',
    hi: 'रोकें',
    te: 'ఆపండి',
    kn: 'ನಿಲ್ಲಿಸಿ',
    ta: 'நிறுத்து'
  },
  footer_notice_title: {
    en: 'Official Citizen Notice & Platform Boundary:',
    hi: 'आधिकारिक नागरिक सूचना एवं मंच दायरा:',
    te: 'అధికారిక పౌర సమాచారం & వేదిక పరిధి:',
    kn: 'ಅಧಿಕೃತ ನಾಗರಿಕ ಸೂಚನೆ ಮತ್ತು ವೇದಿಕೆಯ ವ್ಯಾಪ್ತಿ:',
    ta: 'அதிகாரப்பூர்வ குடிமக்கள் அறிவிப்பு மற்றும் தள வரம்பு:'
  },
  footer_notice_text: {
    en: 'Gov Saathi is an independent, AI-powered citizen guidance and discovery platform. Gov Saathi is NOT a government department and does NOT submit complaints directly on behalf of citizens. We guide you to the official, verified government portals (.gov.in / .nic.in) where you can securely complete your applications and track complaints.',
    hi: 'सरकार साथी एक स्वतंत्र, एआई-संचालित नागरिक मार्गदर्शन मंच है। सरकार साथी कोई सरकारी विभाग नहीं है और नागरिकों की ओर से सीधे शिकायतें दर्ज नहीं करता है। हम आपको आधिकारिक, सत्यापित सरकारी पोर्टलों (.gov.in / .nic.in) पर निर्देशित करते हैं जहां आप सुरक्षित रूप से अपने आवेदन जमा कर सकते हैं।',
    te: 'గవ్ సాథి అనేది స్వతంత్ర, ఏఐ-ఆధారిత పౌర మార్గదర్శక వేదిక. గవ్ సాథి ప్రభుత్వ విభాగం కాదు మరియు పౌరుల తరపున నేరుగా ఫిర్యాదులను సమర్పించదు. మీరు మీ దరఖాస్తులను పూర్తి చేయడానికి అధికారిక, ధృవీకరించబడిన ప్రభుత్వ పోర్టల్స్ (.gov.in / .nic.in) కు మేము మీకు మార్గదర్శకత్వం చేస్తాము.',
    kn: 'ಗವ್ ಸಾಥಿ ಸ್ವತಂತ್ರ, ಎಐ-ಚಾಲಿತ ನಾಗರಿಕ ಮಾರ್ಗದರ್ಶನ ವೇದಿಕೆಯಾಗಿದೆ. ಗವ್ ಸಾಥಿ ಸರ್ಕಾರಿ ಇಲಾಖೆಯಲ್ಲ ಮತ್ತು ನಾಗರಿಕರ ಪರವಾಗಿ ನೇರವಾಗಿ ದೂರುಗಳನ್ನು ಸಲ್ಲಿಸುವುದಿಲ್ಲ. ನಿಮ್ಮ ಅರ್ಜಿಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಲು ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಪೋರ್ಟಲ್‌ಗಳಿಗೆ (.gov.in / .nic.in) ನಾವು ನಿಮಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತೇವೆ.',
    ta: 'கவ் சாத்தி ஒரு சுதந்திரமான, ஏஐ-இயங்கும் குடிமக்கள் வழிகாட்டுதல் தளமாகும். கவ் சாத்தி அரசுத் துறை அல்ல மற்றும் குடிமக்கள் சார்பாக நேரடியாக புகார்களை சமர்ப்பிக்காது. உங்கள் விண்ணப்பங்களை பாதுகாப்பாக பூர்த்தி செய்ய அதிகாரப்பூர்வ அரசு தளங்களுக்கு (.gov.in / .nic.in) நாங்கள் வழிகாட்டுகிறோம்.'
  },
  footer_brand_desc: {
    en: 'Empowering Indian citizens with transparent, verified, and AI-grounded guidance for every official government service across Central, State, and Municipal jurisdictions.',
    hi: 'केंद्र, राज्य और नगरपालिका अधिकार क्षेत्रों में प्रत्येक आधिकारिक सरकारी सेवा के लिए पारदर्शी, सत्यापित और एआई-आधारित मार्गदर्शन प्रदान करना।',
    te: 'కేంద్ర, రాష్ట్ర మరియు పురపాలక పరిధిలోని ప్రతి అధికారిక ప్రభుత్వ సేవ కోసం పారదర్శక, ధృవీకరించబడిన మరియు ఏఐ-ఆధారిత మార్గదర్శకత్వాన్ని అందించడం.',
    kn: 'ಕೇಂದ್ರ, ರಾಜ್ಯ ಮತ್ತು ಪುರಸಭೆಯ ವ್ಯಾಪ್ತಿಯ ಪ್ರತಿಯೊಂದು ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಸೇವೆಗೆ ಪಾರದರ್ಶಕ, ಪರಿಶೀಲಿಸಿದ ಮಾರ್ಗದರ್ಶನ ನೀಡುವುದು.',
    ta: 'மத்திய, மாநில மற்றும் நகராட்சி அதிகார வரம்புகளில் உள்ள ஒவ்வொரு அரசு சேவைக்கும் வெளிப்படையான, சரிபார்க்கப்பட்ட வழிகாட்டுதலை வழங்குதல்.'
  },
  footer_all_links_verified: {
    en: 'All Official Links Verified via .gov.in',
    hi: 'सभी आधिकारिक लिंक .gov.in द्वारा सत्यापित',
    te: 'అన్ని అధికారిక లింకులు .gov.in ద్వారా ధృవీకరించబడ్డాయి',
    kn: 'ಎಲ್ಲಾ ಅಧಿಕೃತ ಲಿಂಕ್‌ಗಳು .gov.in ಮೂಲಕ ಪರಿಶೀಲಿಸಲಾಗಿದೆ',
    ta: 'அனைத்து அரசு இணைப்புகளும் .gov.in மூலம் சரிபார்க்கப்பட்டது'
  },
  footer_essential_services: {
    en: 'Essential Services',
    hi: 'आवश्यक सेवाएं',
    te: 'ముఖ్యమైన సేవలు',
    kn: 'ಅಗತ್ಯ ಸೇವೆಗಳು',
    ta: 'அத்தியாவசிய சேவைகள்'
  },
  footer_explore_platform: {
    en: 'Explore Platform',
    hi: 'मंच देखें',
    te: 'వేదికను అన్వేషించండి',
    kn: 'ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಅನ್ವೇಷಿಸಿ',
    ta: 'தளத்தை ஆராயுங்கள்'
  },
  footer_emergency_helplines: {
    en: 'National Emergency Helplines',
    hi: 'राष्ट्रीय आपातकालीन हेल्पलाइन',
    te: 'జాతీయ అత్యవసర హెల్ప్‌లైన్లు',
    kn: 'ರಾಷ್ಟ್ರೀಯ ತುರ್ತು ಸಹಾಯವಾಣಿಗಳು',
    ta: 'தேசிய அவசர உதவி எண்கள்'
  },
  footer_copyright: {
    en: 'Gov Saathi. Designed for Indian Citizens.',
    hi: 'सरकार साथी। भारतीय नागरिकों के लिए निर्मित।',
    te: 'గవ్ సాథి. భారతీయ పౌరుల కోసం రూపొందించబడింది.',
    kn: 'ಗವ್ ಸಾಥಿ. ಭಾರತೀಯ ನಾಗರಿಕರಿಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.',
    ta: 'கவ் சாத்தி. இந்திய குடிமக்களுக்காக வடிவமைக்கப்பட்டது.'
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
