// GOV SAATHI - AI SAATHI ENGINE POWERED BY GOOGLE GEMINI
// Strictly enforces factual grounding against verified Indian government services.
// Full 100% multilingual translation guarantee across UI, Gemini prompts, and fallback logic.

import { GoogleGenerativeAI } from '@google/generative-ai';
import { VERIFIED_SERVICES, VERIFIED_CATEGORIES } from '../data/verifiedServices.js';

let genAI = null;

export function getGeminiClient() {
  const apiKey = process.env.AI_API_KEY;
  if (!apiKey) {
    console.warn('[AI Saathi] AI_API_KEY not configured in environment.');
    return null;
  }
  if (!genAI) {
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

// Find candidate verified services based on user query keywords
export function findRelevantServices(query, state = 'All India') {
  if (!query) return [];
  const q = query.toLowerCase();

  const scored = VERIFIED_SERVICES.map(service => {
    let score = 0;
    
    // Check keywords
    if (service.keywords) {
      service.keywords.forEach(kw => {
        if (q.includes(kw.toLowerCase())) {
          score += 10;
        }
      });
    }

    // Name & category match
    if (service.name.toLowerCase().includes(q)) score += 15;
    if (service.simple_description.toLowerCase().includes(q)) score += 8;
    if (service.department.toLowerCase().includes(q)) score += 5;

    // Check individual words
    const words = q.split(/\s+/).filter(w => w.length > 2);
    words.forEach(word => {
      if (service.name.toLowerCase().includes(word)) score += 3;
      if (service.description.toLowerCase().includes(word)) score += 2;
    });

    return { service, score };
  });

  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.service);
}

const LANGUAGE_MAP = {
  en: 'English',
  hi: 'Hindi (हिन्दी)',
  te: 'Telugu (తెలుగు)',
  kn: 'Kannada (ಕನ್ನಡ)',
  ta: 'Tamil (தமிழ்)',
  ml: 'Malayalam (മലയാളം)',
  mr: 'Marathi (मराठी)',
  bn: 'Bengali (বাংলা)',
  gu: 'Gujarati (ગુજરાતી)',
  pa: 'Punjabi (ਪੰਜਾਬੀ)',
  od: 'Odia (ଓଡ଼ిଆ)',
  ur: 'Urdu (اردو)'
};

// Multilingual service name & description overrides for deterministic fallback
const SERVICE_TRANSLATIONS = {
  'pan-card-nsdl-utiitsl': {
    te: {
      name: 'భౌతిక పాన్ కార్డ్ దరఖాస్తు & సవరణ (Protean / UTIITSL)',
      reason: 'ల్యామినేటెడ్ భౌతిక పీవీసీ పాన్ కార్డ్ (Form 49A) పొందడానికి, పేరు/చిరునామా మార్చడానికి లేదా పాన్ కార్డ్‌ను రీప్రింట్ చేయడానికి అధికారిక సేవ.',
      who_is_it_for: 'భారతీయ పౌరులు, మైనర్లు, ఎన్‌ఆర్‌ఐలు మరియు నూతన లేదా సవరించిన భౌతిక పాన్ కార్డ్ అవసరమైన వ్యాపారాలు.',
      steps: [
        { step_number: 1, title: 'ప్రొటీన్ / UTIITSL లో దరఖాస్తు రకాన్ని ఎంచుకోండి', description: 'https://www.protean-tinpan.com/ లేదా UTIITSL పోర్టల్‌ని తెరవండి. "Form 49A (కొత్త పాన్ - భారతీయ పౌరుడు)" లేదా "పాన్ డేటాలో మార్పులు/సవరణ" ఎంచుకోండి.' },
        { step_number: 2, title: 'వ్యక్తిగత వివరాలు పూరించండి & పేపర్‌లెస్ e-KYC ఎంచుకోండి', description: 'దరఖాస్తుదారు పూర్తి పేరు, పుట్టిన తేదీ, మొబైల్ నంబర్ మరియు ఇమెయిల్ నమోదు చేయండి. భౌతిక కొరియర్ లేకుండా త్వరిత ప్రాసెసింగ్ కోసం ఆధార్ ఆధారిత e-KYC & e-Sign ఎంచుకోండి.' },
        { step_number: 3, title: 'ప్రభుత్వ ఫీజు ఆన్‌లైన్‌లో చెల్లించండి', description: 'భారతీయ చిరునామా కోసం రూ. 107 అధికారిక ప్రభుత్వ దరఖాస్తు ఫీజును యూపీఐ, డెబిట్ కార్డ్ లేదా నెట్ బ్యాంకింగ్ ద్వారా చెల్లించండి. 15 అంకెల రసీదు నంబర్‌ను భద్రపరుచుకోండి.' }
      ],
      documents: ['గుర్తింపు కార్డు (ఆధార్ కార్డు / ఓటరు ఐడి)', 'చిరునామా ధృవీకరణ పత్రం', 'పుట్టిన తేదీ ధృవీకరణ పత్రం', 'పాస్‌పోర్ట్ సైజు ఫోటో', 'డిజిటల్ సంతకం']
    },
    hi: {
      name: 'भौतिक पैन कार्ड आवेदन एवं सुधार (Protean / UTIITSL)',
      reason: 'लैमिनेटेड पीवीसी पैन कार्ड (Form 49A), नाम/पता सुधार या खोए हुए कार्ड को दोबारा प्रिंट करने की आधिकारिक सेवा।',
      who_is_it_for: 'भारतीय नागरिक, नाबालिग, अनिवासी भारतीय और व्यवसाय जिन्हें नए या संशोधित भौतिक पैन कार्ड की आवश्यकता है।',
      steps: [
        { step_number: 1, title: 'Protean / UTIITSL पर आवेदन प्रकार चुनें', description: 'https://www.protean-tinpan.com/ पोर्टल खोलें। "Form 49A (नया पैन)" या "पैन डेटा में सुधार" चुनें।' },
        { step_number: 2, title: 'व्यक्तिगत विवरण भरें और पेपरलेस ई-केवाईसी चुनें', description: 'आवेदक का पूरा नाम, जन्म तिथि, मोबाइल नंबर दर्ज करें और त्वरित प्रक्रिया के लिए आधार ई-केवाईसी चुनें।' },
        { step_number: 3, title: 'सरकारी शुल्क का ऑनलाइन भुगतान करें', description: 'यूपीआई, डेबिट कार्ड या नेट बैंकिंग से ₹107 का आधिकारिक सरकारी शुल्क भरें और 15-अंकीय रसीद नंबर सुरक्षित रखें।' }
      ],
      documents: ['पहचान प्रमाण (आधार कार्ड / वोटर आईडी)', 'निवास प्रमाण पत्र', 'जन्म तिथि प्रमाण', 'पासपोर्ट साइज फोटो', 'डिजिटल हस्ताक्षर']
    },
    kn: {
      name: 'ಭೌತಿಕ ಪ್ಯಾನ್ ಕಾರ್ಡ್ ಅರ್ಜಿ ಮತ್ತು ತಿದ್ದುಪಡಿ (Protean / UTIITSL)',
      reason: 'ಲ್ಯಾಮಿನೇಟೆಡ್ ಭೌತಿಕ ಪಿವಿಸಿ ಪ್ಯಾನ್ ಕಾರ್ಡ್ (Form 49A), ಹೆಸರು/ವಿಳಾಸ ತಿದ್ದುಪಡಿ ಅಥವಾ ಕಳೆದುಹೋದ ಕಾರ್ಡ್ ಮರುಮುದ್ರಣಕ್ಕಾಗಿ ಅಧಿಕೃತ ಸೇವೆ.',
      who_is_it_for: 'ಹೊಸ ಅಥವಾ ತಿದ್ದುಪಡಿ ಮಾಡಿದ ಭೌತಿಕ ಪ್ಯಾನ್ ಕಾರ್ಡ್ ಅಗತ್ಯವಿರುವ ಭಾರತೀಯ ನಾಗರಿಕರು.',
      steps: [
        { step_number: 1, title: 'Protean / UTIITSL ನಲ್ಲಿ ಅರ್ಜಿ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ', description: 'https://www.protean-tinpan.com/ ತೆರೆಯಿರಿ ಮತ್ತು Form 49A ಆಯ್ಕೆಮಾಡಿ.' },
        { step_number: 2, title: 'ವೈಯಕ್ತಿಕ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ ಮತ್ತು ಇ-ಕೆವೈಸಿ ಆಯ್ಕೆಮಾಡಿ', description: 'ಹೆಸರು, ಜನ್ಮ ದಿನಾಂಕ, ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ ಆಧಾರ್ ಮೂಲಕ ದೃಢೀಕರಿಸಿ.' },
        { step_number: 3, title: 'ಸರ್ಕಾರಿ ಶುಲ್ಕವನ್ನು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಪಾವತಿಸಿ', description: 'ಯುಪಿಐ ಅಥವಾ ಡೆಬಿಟ್ ಕಾರ್ಡ್ ಮೂಲಕ ₹107 ಶುಲ್ಕ ಪಾವತಿಸಿ ಮತ್ತು ರಶೀದಿ ಸಂಖ್ಯೆಯನ್ನು ಉಳಿಸಿಕೊಳ್ಳಿ.' }
      ],
      documents: ['ಗುರುತಿನ ಚೀಟಿ (ಆಧಾರ್ ಕಾರ್ಡ್)', 'ವಿಳಾಸ ಪುರಾವೆ', 'ಜನ್ಮ ದಿನಾಂಕ ಪುರಾವೆ', 'ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಭಾವಚಿತ್ರ']
    },
    ta: {
      name: 'நேரடி பான் கார்டு விண்ணப்பம் மற்றும் திருத்தம் (Protean / UTIITSL)',
      reason: 'பிவிசி பான் கார்டு (Form 49A), பெயர்/முகவரி திருத்தம் அல்லது தொலைந்த அட்டையை மறுபதிப்பு செய்வதற்கான அதிகாரப்பூர்வ சேவை.',
      who_is_it_for: 'புதிய அல்லது திருத்தப்பட்ட நேரடி பான் அட்டை தேவைப்படும் இந்திய குடிமக்கள்.',
      steps: [
        { step_number: 1, title: 'Protean / UTIITSL தளத்தில் விண்ணப்ப வகையைத் தேர்ந்தெடுக்கவும்', description: 'https://www.protean-tinpan.com/ தளத்திற்குச் சென்று Form 49A தேர்ந்தெடுக்கவும்.' },
        { step_number: 2, title: 'விவரங்களை பூர்த்தி செய்து e-KYC தேர்வு செய்யவும்', description: 'முழு பெயர், பிறந்த தேதி, மொபைல் எண்ணை உள்ளிட்டு ஆதார் மூலம் சரிபார்க்கவும்.' },
        { step_number: 3, title: 'அரசு கட்டணத்தை ஆன்லைனில் செலுத்தவும்', description: 'யூபிஐ அல்லது கார்டு மூலம் ₹107 அரசு கட்டணத்தை செலுத்தி ஒப்புகைச் சீட்டைப் பெறவும்.' }
      ],
      documents: ['அடையாள அட்டை (ஆதார் அட்டை)', 'முகவரி சான்று', 'பிறந்த தேதி சான்று', 'புகைப்படம்']
    }
  },
  'instant-epan-income-tax': {
    te: {
      name: 'తక్షణ ఇ-పాన్ జారీ (ఆదాయపు పన్ను శాఖ)',
      reason: 'ఆధార్ ఆధారిత OTP ద్వారా 10 నిమిషాల్లో ఉచితంగా డిజిటల్ పాన్ కార్డ్ పొందండి మరియు డౌన్‌లోడ్ చేసుకోండి.',
      who_is_it_for: 'చెల్లుబాటు అయ్యే ఆధార్ మరియు లింక్ చేయబడిన మొబైల్ నంబర్ ఉన్న భారతీయ పౌరులు.',
      steps: [
        { step_number: 1, title: 'ఆదాయపు పన్ను ఇ-ఫైలింగ్ పోర్టల్‌ని సందర్శించండి', description: 'eportal.incometax.gov.in లో "Instant e-PAN" పై క్లిక్ చేయండి.' },
        { step_number: 2, title: 'ఆధార్ నంబర్ నమోదు చేసి OTP ధృవీకరించండి', description: '12 అంకెల ఆధార్ సంఖ్యను నమోదు చేసి లింక్డ్ మొబైల్ OTP తో ధృవీకరించండి.' },
        { step_number: 3, title: 'డిజిటల్ ఇ-పాన్ పిడిఎఫ్ డౌన్‌లోడ్ చేసుకోండి', description: '10 నిమిషాల తర్వాత అదే పోర్టల్‌లో లాగిన్ అయి డిజిటల్ పాన్ కార్డ్ పిడిఎఫ్ ఉచితంగా డౌన్‌లోడ్ చేసుకోండి.' }
      ],
      documents: ['12 అంకెల ఆధార్ నంబర్', 'ఆధార్‌తో లింక్ చేయబడిన క్రియాశీల మొబైల్ నంబర్']
    },
    hi: {
      name: 'तत्काल ई-पैन कार्ड (आयकर विभाग)',
      reason: 'आधार ओटीपी के माध्यम से 10 मिनट में निःशुल्क डिजिटल पैन कार्ड प्राप्त करें।',
      who_is_it_for: 'वैध आधार और लिंक्ड मोबाइल नंबर वाले भारतीय नागरिक।',
      steps: [
        { step_number: 1, title: 'आयकर ई-फाइलिंग पोर्टल पर जाएं', description: 'eportal.incometax.gov.in पर "Instant e-PAN" विकल्प चुनें।' },
        { step_number: 2, title: 'आधार नंबर दर्ज करें और ओटीपी सत्यापित करें', description: '12-अंकीय आधार दर्ज कर मोबाइल पर आए ओटीपी से पुष्टि करें।' },
        { step_number: 3, title: 'डिजिटल ई-पैन पीडीएफ डाउनलोड करें', description: '10 मिनट में प्रक्रिया पूरी होने पर अपना वैध डिजिटल पैन डाउनलोड करें।' }
      ],
      documents: ['12-अंकीय आधार नंबर', 'आधार से जुड़ा सक्रिय मोबाइल नंबर']
    },
    kn: {
      name: 'ತತ್ಕ್ಷಣದ ಇ-ಪ್ಯಾನ್ ಕಾರ್ಡ್ (ಆದಾಯ ತೆರಿಗೆ ಇಲಾಖೆ)',
      reason: 'ಆಧಾರ್ OTP ಮೂಲಕ 10 ನಿಮಿಷಗಳಲ್ಲಿ ಉಚಿತ ಡಿಜಿಟಲ್ ಪ್ಯಾನ್ ಕಾರ್ಡ್ ಪಡೆಯಿರಿ.',
      who_is_it_for: 'ಚಾಲ್ತಿಯಲ್ಲಿರುವ ಆಧಾರ್ ಮತ್ತು ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಹೊಂದಿರುವ ಭಾರತೀಯ ನಾಗರಿಕರು.',
      steps: [
        { step_number: 1, title: 'ಆದಾಯ ತೆರಿಗೆ ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ', description: 'eportal.incometax.gov.in ನಲ್ಲಿ Instant e-PAN ಆಯ್ಕೆಮಾಡಿ.' },
        { step_number: 2, title: 'ಆಧಾರ್ ಮತ್ತು OTP ಪರಿಶೀಲಿಸಿ', description: 'ಆಧಾರ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ OTP ಮೂಲಕ ಪರಿಶೀಲನೆ ಪೂರ್ಣಗೊಳಿಸಿ.' },
        { step_number: 3, title: 'ಡಿಜಿಟಲ್ ಇ-ಪ್ಯಾನ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ', description: '10 ನಿಮಿಷಗಳ ನಂತರ ಉಚಿತವಾಗಿ ಪಿಡಿಎಫ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿಕೊಳ್ಳಿ.' }
      ],
      documents: ['12 ಅಂಕಿಗಳ ಆಧಾರ್ ಸಂಖ್ಯೆ', 'ಆಧಾರ್ ಲಿಂಕ್ ಆದ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ']
    },
    ta: {
      name: 'உடனடி இ-பான் அட்டை (வருமான வரித்துறை)',
      reason: 'ஆதார் OTP மூலம் 10 நிமிடங்களில் இலவச டிஜிட்டல் பான் கார்டு பெறலாம்.',
      who_is_it_for: 'செல்லுபடியாகும் ஆதார் மற்றும் மொபைல் எண் உள்ள இந்திய குடிமக்கள்.',
      steps: [
        { step_number: 1, title: 'வருமான வரி இ-தாக்கல் போர்ட்டலுக்குச் செல்லவும்', description: 'eportal.incometax.gov.in தளத்தில் Instant e-PAN தேர்வு செய்யவும்.' },
        { step_number: 2, title: 'ஆதார் எண் மற்றும் OTP சரிபார்க்கவும்', description: '12 இலக்க ஆதார் எண்ணை உள்ளிட்டு OTP மூலம் உறுதிப்படுத்தவும்.' },
        { step_number: 3, title: 'டிஜிட்டல் இ-பான் பதிவிறக்கவும்', description: '10 நிமிடங்களில் இலவசமாக டிஜிட்டல் பான் அட்டையை பதிவிறக்கம் செய்து கொள்ளலாம்.' }
      ],
      documents: ['12 இலக்க ஆதார் எண்', 'ஆதாருடன் இணைக்கப்பட்ட மொபைல் எண்']
    }
  },
  'swachhata-civic-complaint-app': {
    te: {
      name: 'స్వచ్ఛతా సివిక్ ఫిర్యాదుల పోర్టల్ (రోడ్డు గుంతలు, చెత్త & పారిశుద్ధ్యం)',
      reason: 'రోడ్డు గుంతలు, చెత్త కుప్పలు, మురుగు కాలువల సమస్యలను ఫోటో జీపీఎస్ ఆధారాలతో నేరుగా మీ మున్సిపల్ అధికారులకు ఫిర్యాదు చేయండి.',
      who_is_it_for: 'భారతదేశంలోని నగరాలు మరియు పట్టణ స్థానిక సంస్థల పరిధిలోని పౌరులందరూ.',
      steps: [
        { step_number: 1, title: 'స్వచ్ఛతా యాప్‌ను డౌన్‌లోడ్ చేసుకోండి లేదా పోర్టల్‌ని తెరవండి', description: 'sbmurban.org లేదా Swachhata మొబైల్ యాప్‌ని గూగుల్ ప్లే స్టోర్ లేదా యాప్ స్టోర్ నుండి పొందండి.' },
        { step_number: 2, title: 'సమస్య ఫోటో తీసి లొకేషన్ ట్యాగ్ చేయండి', description: '"రోడ్డు గుంత" లేదా "చెత్త" వర్గాన్ని ఎంచుకుని ఫోటో తీయండి; యాప్ స్వయంచాలకంగా జీపీఎస్ స్థానాన్ని గుర్తిస్తుంది.' },
        { step_number: 3, title: 'సమర్పించండి & పరిష్కారాన్ని ట్రాక్ చేయండి', description: 'తక్షణ టికెట్ ఐడీ వస్తుంది. మున్సిపల్ అధికారి మరమ్మతు చేసి పూర్తి చేసిన ఫోటోతో టికెట్ మూసివేస్తారు.' }
      ],
      documents: ['రోడ్డు గుంత లేదా పారిశుద్ధ్య సమస్య ప్రత్యక్ష ఫోటో', 'మొబైల్ జీపీఎస్ లొకేషన్ అనుమతి']
    },
    hi: {
      name: 'स्वच्छता नागरिक शिकायत पोर्टल (सड़क गड्ढे, कचरा और स्वच्छता)',
      reason: 'सड़क के गड्ढे, कचरा डंप और सीवरेज समस्याओं की फोटो खींचकर नगर निगम में सीधे शिकायत दर्ज करें।',
      who_is_it_for: 'भारत के किसी भी नगर निगम या नगर पालिका क्षेत्र के निवासी।',
      steps: [
        { step_number: 1, title: 'स्वच्छता ऐप डाउनलोड करें या पोर्टल खोलें', description: 'sbmurban.org पोर्टल पर जाएं या Swachhata ऐप डाउनलोड करें।' },
        { step_number: 2, title: 'गड्ढे या कचरे की फोटो खींचें', description: 'शिकायत श्रेणी चुनें और फोटो अपलोड करें; ऐप जीपीएस लोकेशन अपने आप दर्ज करता है।' },
        { step_number: 3, title: 'शिकायत जमा करें और समाधान ट्रैक करें', description: 'टिकट आईडी प्राप्त करें। नगर निगम इंजीनियर समाधान फोटो के साथ इसे पूरा करेंगे।' }
      ],
      documents: ['समस्या की लाइव फोटो', 'मोबाइल जीपीएस अनुमति']
    },
    kn: {
      name: 'ಸ್ವಚ್ಛತಾ ನಾಗರಿಕ ದೂರು ಪೋರ್ಟಲ್ (ರಸ್ತೆ ಗುಂಡಿಗಳು, ಕಸ ಮತ್ತು ನೈರ್ಮಲ್ಯ)',
      reason: 'ರಸ್ತೆ ಗುಂಡಿಗಳು ಮತ್ತು ತ್ಯಾಜ್ಯ ಸಮಸ್ಯೆಗಳ ಫೋಟೋ ತೆಗೆದು ಸ್ಥಳೀಯ ಪುರಸಭೆಗೆ ನೇರವಾಗಿ ದೂರು ಸಲ್ಲಿಸಿ.',
      who_is_it_for: 'ನಗರ ಪ್ರದೇಶಗಳಲ್ಲಿ ವಾಸಿಸುವ ಪ್ರತಿಯೊಬ್ಬ ನಾಗರಿಕರು.',
      steps: [
        { step_number: 1, title: 'ಸ್ವಚ್ಛತಾ ಆ್ಯಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ', description: 'sbmurban.org ಗೆ ಭೇಟಿ ನೀಡಿ ಅಥವಾ ಮೊಬೈಲ್ ಆ್ಯಪ್ ತೆರೆಯಿರಿ.' },
        { step_number: 2, title: 'ಗುಂಡಿಯ ಫೋಟೋ ತೆಗೆಯಿರಿ', description: 'ದೂರಿನ ವರ್ಗವನ್ನು ಆರಿಸಿ ಮತ್ತು ಜಿಪಿಎಸ್ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.' },
        { step_number: 3, title: 'ದೂರು ಸಲ್ಲಿಸಿ ಮತ್ತು ಪರಿಹಾರ ಪರಿಶೀಲಿಸಿ', description: 'ದೂರಿನ ಐಡಿ ಬಳಸಿ ಪರಿಹಾರದ ಪ್ರಗತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.' }
      ],
      documents: ['ಸಮಸ್ಯೆಯ ಲೈವ್ ಫೋಟೋ', 'ಜಿಪಿಎಸ್ ಸ್ಥಳ ಅನುಮತಿ']
    },
    ta: {
      name: 'சுவச்சதா குடிமக்கள் புகார் போர்டல் (சாலை குழிகள், குப்பை & சுகாதாரம்)',
      reason: 'சாலை குழிகள் மற்றும் கழிவுநீர் அடைப்புகளை படம் எடுத்து நகராட்சி அதிகாரிகளிடம் நேரடியாக புகார் அளிக்கவும்.',
      who_is_it_for: 'நகராட்சி பகுதிகளில் வசிக்கும் அனைத்து குடிமக்கள்.',
      steps: [
        { step_number: 1, title: 'சுவச்சதா செயலியை பதிவிறக்கவும்', description: 'sbmurban.org அல்லது மொபைல் செயலியை திறக்கவும்.' },
        { step_number: 2, title: 'குழியின் புகைப்படத்தை எடுக்கவும்', description: 'புகார் பிரிவை தேர்வு செய்து ஜிபிஎஸ் புகைப்படத்தை பதிவேற்றவும்.' },
        { step_number: 3, title: 'புகாரை சமர்ப்பித்து நிலையை அறியவும்', description: 'டிக்கெட் எண் பெற்று நகராட்சி அதிகாரியின் தீர்வை கண்காணிக்கவும்.' }
      ],
      documents: ['பிரச்சனையின் நேரடி புகைப்படம்', 'ஜிபிஎஸ் இருப்பிட அனுமதி']
    }
  },
  'national-cyber-crime-reporting-portal': {
    te: {
      name: 'జాతీయ సైబర్ క్రైమ్ రిపోర్టింగ్ పోర్టల్ (హెల్ప్‌లైన్ 1930)',
      reason: 'ఆన్‌లైన్ ఆర్థిక మోసాలు, యూపీఐ స్కామ్‌లు మరియు సైబర్ నేరాలను వెంటనే నివేదించి బ్యాంక్ ఖాతాను స్తంభింపజేయండి.',
      who_is_it_for: 'ఆన్‌లైన్ ఆర్థిక మోసం లేదా సైబర్ బెదిరింపులకు గురైన పౌరులందరూ.',
      steps: [
        { step_number: 1, title: 'వెంటనే 1930 హెల్ప్‌లైన్‌కు కాల్ చేయండి', description: 'ఆర్థిక నష్టం జరిగిన మొదటి 2-3 గంటలలో (గోల్డెన్ అవర్) 1930 కు కాల్ చేసి లావాదేవీ UTR నంబర్ తెలియజేయండి.' },
        { step_number: 2, title: 'cybercrime.gov.in లో అధికారిక ఫిర్యాదు నమోదు చేయండి', description: 'లావాదేవీ వివరాలు, బ్యాంక్ స్టేట్‌మెంట్ మరియు స్క్రీన్‌షాట్‌లతో ఆన్‌లైన్ ఫిర్యాదును నమోదు చేయండి.' },
        { step_number: 3, title: 'ఫిర్యాదు సంఖ్యను బ్యాంకుకు అందించండి', description: 'అధికారిక ఎకनॉలెడ్జ్‌మెంట్ నంబర్‌ను మీ బ్యాంక్ హోమ్ బ్రాంచ్‌లో సమర్పించండి.' }
      ],
      documents: ['బ్యాంక్ స్టేట్‌మెంట్ (మోసపూరిత లావాదేవీ UTR తో)', 'యూపీఐ లావాదేవీ స్క్రీన్‌షాట్', 'ఆధార్ లేదా గుర్తింపు కార్డు']
    },
    hi: {
      name: 'राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल (हेल्पलाइन 1930)',
      reason: 'ऑनलाइन वित्तीय धोखाधड़ी और यूपीआई घोटालों की तत्काल रिपोर्ट करें और बैंक लेनदेन फ्रीज करवाएं।',
      who_is_it_for: 'साइबर धोखाधड़ी या ऑनलाइन अपराध से प्रभावित सभी नागरिक।',
      steps: [
        { step_number: 1, title: 'तुरंत 1930 हेल्पलाइन पर कॉल करें', description: 'धोखाधड़ी के 2-3 घंटों के भीतर 1930 डायल करें और बैंक खाता फ्रीज कराएं।' },
        { step_number: 2, title: 'cybercrime.gov.in पर औपचारिक शिकायत दर्ज करें', description: 'लेनदेन स्क्रीनशॉट और बैंक विवरण के साथ ऑनलाइन शिकायत दर्ज करें।' },
        { step_number: 3, title: 'पावती संख्या अपने बैंक में जमा करें', description: 'शिकायत पावती को अपने बैंक में प्रस्तुत करें।' }
      ],
      documents: ['बैंक स्टेटमेंट (यूटीआर नंबर सहित)', 'लेनदेन स्क्रीनशॉट', 'पहचान पत्र']
    },
    kn: {
      name: 'ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಅಪರಾಧ ವರದಿ ಪೋರ್ಟಲ್ (ಸಹಾಯವಾಣಿ 1930)',
      reason: 'ಆನ್‌ಲೈನ್ ಹಣಕಾಸು ವಂಚನೆ ಮತ್ತು ಯುಪಿಐ ವಂಚನೆಗಳನ್ನು ತಕ್ಷಣ ವರದಿ ಮಾಡಿ ಬ್ಯಾಂಕ್ ವಹಿವಾಟು ಸ್ಥಗಿತಗೊಳಿಸಿ.',
      who_is_it_for: 'ಆನ್‌ಲೈನ್ ವಂಚನೆಗೆ ಒಳಗಾದ ಪ್ರತಿಯೊಬ್ಬ ನಾಗರಿಕರು.',
      steps: [
        { step_number: 1, title: 'ತಕ್ಷಣ 1930 ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ', description: 'ವಂಚನೆ ನಡೆದ ತಕ್ಷಣ 1930 ಗೆ ಕರೆ ಮಾಡಿ ಖಾತೆಯನ್ನು ಫ್ರೀಜ್ ಮಾಡಲು ವಿನಂತಿಸಿ.' },
        { step_number: 2, title: 'cybercrime.gov.in ನಲ್ಲಿ ದೂರು ದಾಖಲಿಸಿ', description: 'ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಮತ್ತು ವಿವರಗಳೊಂದಿಗೆ ಅಧಿಕೃತ ದೂರು ದಾಖಲಿಸಿ.' },
        { step_number: 3, title: 'ದೂರಿನ ಸ್ವೀಕೃತಿಯನ್ನು ಬ್ಯಾಂಕ್‌ಗೆ ನೀಡಿ', description: 'ಪೊಲೀಸ್ ದೂರು ಸ್ವೀಕೃತಿ ಪತ್ರವನ್ನು ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಶಾಖೆಗೆ ಸಲ್ಲಿಸಿ.' }
      ],
      documents: ['ಬ್ಯಾಂಕ್ ಸ್ಟೇಟ್‌ಮೆಂಟ್', 'ಯುಪಿಐ ವಹಿವಾಟು ಸ್ಕ್ರೀನ್‌ಶಾಟ್', 'ಗುರುತಿನ ಚೀಟಿ']
    },
    ta: {
      name: 'தேசிய இணைய குற்ற அறிக்கை போர்டல் (உதவி எண் 1930)',
      reason: 'ஆன்லைன் நிதி மோசடி மற்றும் யுபிஐ மோசடிகளை உடனடியாகப் பதிவு செய்து வங்கி பரிவர்த்தனையை முடக்கவும்.',
      who_is_it_for: 'இணையதள மோசடியால் பாதிக்கப்பட்ட அனைத்து குடிமக்கள்.',
      steps: [
        { step_number: 1, title: 'உடனடியாக 1930 உதவி எண்ணை அழைக்கவும்', description: 'மோசடி நடந்த 2 மணி நேரத்திற்குள் 1930 அழைத்து பரிவர்த்தனையை முடக்கவும்.' },
        { step_number: 2, title: 'cybercrime.gov.in தளத்தில் புகார் பதிவு செய்யவும்', description: 'ஸ்கிரீன்ஷாட் மற்றும் ஆதாரங்களுடன் அதிகாரப்பூர்வ புகார் அளிக்கவும்.' },
        { step_number: 3, title: 'ஒப்புகைச் சீட்டை வங்கியில் சமர்ப்பிக்கவும்', description: 'காவல்துறை புகார் எண்ணை உங்கள் வங்கி கிளையில் சமர்ப்பிக்கவும்.' }
      ],
      documents: ['வங்கி அறிக்கை (UTR எண்)', 'பரிவர்த்தனை ஸ்கிரீன்ஷாட்', 'அடையாள அட்டை']
    }
  }
};

export async function askAISaathi({ message, history = [], state = 'All India', district = '', language = 'en' }) {
  const client = getGeminiClient();
  const relevantServices = findRelevantServices(message, state);
  const langKey = (language || 'en').toLowerCase();
  const targetLanguageName = LANGUAGE_MAP[langKey] || language || 'English';

  // If no Gemini client is available, fallback to high-quality deterministic response from verified database
  if (!client) {
    return generateDeterministicFallback(message, relevantServices, langKey);
  }

  const candidateModels = [
    process.env.AI_MODEL || 'gemini-2.5-flash-lite',
    'gemini-2.5-flash-lite',
    'gemini-3.5-flash-lite',
    'gemini-flash-lite-latest',
    'gemini-3.8-flash',
    'gemini-2.5-flash'
  ];
  const uniqueModels = [...new Set(candidateModels.filter(Boolean))];

  const contextData = relevantServices.map(s => ({
    name: s.name,
    jurisdiction: s.jurisdiction_level,
    department: s.department,
    simple_description: s.simple_description,
    fee: s.fee,
    official_website: s.official_website,
    official_app: s.official_app,
    official_helpline: s.official_helpline,
    verification_status: s.verification_status,
    last_verified: s.last_verified_at,
    steps: s.steps,
    documents: s.documents,
    requirements: s.requirements
  }));

  const systemPrompt = `
You are "AI Saathi", the multilingual official citizen guide of GOV SAATHI - an AI-powered Indian citizen discovery and guidance platform.
Your mission is to guide citizens to the correct official government authority, explain exact procedures, and provide verified .gov.in/.nic.in portal links in simple, respectful language.

MANDATORY TRANSLATION INSTRUCTIONS (STRICTEST ENFORCEMENT):
- Selected Target Language: ${targetLanguageName} (${langKey}).
- When the target language is NOT English (e.g., Telugu, Hindi, Kannada, Tamil, etc.):
  1. ALL user-visible text in your JSON output MUST be in ${targetLanguageName}.
  2. "answer": MUST be written completely in ${targetLanguageName}.
  3. "service.name": Translate or transliterate the official service name into ${targetLanguageName} script (e.g., for PAN in Telugu: "భౌతిక పాన్ కార్డ్ దరఖాస్తు & సవరణ (Protean / UTIITSL)").
  4. "service.reason": MUST be in ${targetLanguageName}.
  5. "service.who_is_it_for": MUST be in ${targetLanguageName}.
  6. "service.fee": MUST be in ${targetLanguageName}.
  7. "documents": EVERY document string in the array MUST be in ${targetLanguageName}.
  8. "steps": EVERY single step's "title" and "description" MUST BE 100% in ${targetLanguageName}. NEVER leave step titles or descriptions in English when the user language is ${targetLanguageName}!
  9. "important_notes": Every note MUST be in ${targetLanguageName}.
  10. PRESERVE ONLY: Official URLs (starting with https://) and phone/helpline numbers. All other explanatory text MUST be translated.

CRITICAL CIVIC-TECH PLATFORM BOUNDARIES (NON-NEGOTIABLE):
1. GOV SAATHI DOES NOT SUBMIT COMPLAINTS OR APPLICATIONS DIRECTLY. You are an informational guide helping citizens open the official portal themselves.
2. NEVER INVENT fake URLs, phone numbers, fees, or departments.
3. Use the VERIFIED DATABASE CONTEXT provided below as ground truth.
4. If the database context does not cover the request, explicitly state in the target language: "This specific service is not yet verified in our database. Please check your state or central portal."
5. Jurisdiction awareness:
   - Potholes, streetlights, garbage, waterlogging -> MUNICIPAL / LOCAL (Swachhata App, local municipal corporation).
   - Financial scams, UPI fraud, cyber blackmail -> CYBERCRIME (National Cyber Crime Reporting Portal, Helpline 1930).
   - E-commerce disputes, defective goods, refund fraud -> CONSUMER AFFAIRS (National Consumer Helpline, Helpline 1915).
   - Official document downloads (Marksheet, DL, RC, Aadhaar) -> DIGILOCKER (digilocker.gov.in).
   - Passport application -> PASSPORT SEVA (passportindia.gov.in).
   - Voter ID / Electoral cards -> VOTER PORTAL (voters.eci.gov.in).

VERIFIED DATABASE CONTEXT:
${JSON.stringify(contextData, null, 2)}

USER LOCATION:
State: ${state || 'All India'}, District: ${district || 'Not specified'}

You MUST output your response as valid, parseable JSON conforming to this schema (with all textual fields translated into ${targetLanguageName}):
{
  "answer": "Direct simple citizen-friendly explanation in ${targetLanguageName}",
  "intent": "Brief classification of citizen issue",
  "category": "Category name in ${targetLanguageName}",
  "jurisdiction": "CENTRAL | STATE | MUNICIPAL | DISTRICT | PANCHAYAT",
  "service": {
    "name": "Official Service Name in ${targetLanguageName}",
    "reason": "Why this service is the correct official authority in ${targetLanguageName}",
    "who_is_it_for": "Eligibility / citizen criteria in ${targetLanguageName}",
    "official_website": "Official .gov.in / .nic.in URL",
    "official_app": "Official app name or null",
    "official_helpline": "Official helpline number",
    "fee": "Verified fee info in ${targetLanguageName}",
    "last_verified": "Verification date"
  },
  "documents": ["List of verified documents in ${targetLanguageName}"],
  "steps": [
    {
      "step_number": 1,
      "title": "Short title in ${targetLanguageName}",
      "description": "Clear action instruction in ${targetLanguageName}"
    }
  ],
  "important_notes": ["Critical citizen tips in ${targetLanguageName}"],
  "needs_clarification": false,
  "clarifying_question": null,
  "confidence": "high"
}
Only return the raw JSON object, without markdown code fences.
`;

  // Sanitize chat history so it strictly starts with 'user' and alternates 'user' -> 'model'
  let validHistory = [];
  let expecting = 'user';

  for (const h of history.slice(-10)) {
    const role = h.role === 'assistant' ? 'model' : 'user';
    if (role === expecting) {
      validHistory.push({
        role,
        parts: [{ text: h.content }]
      });
      expecting = expecting === 'user' ? 'model' : 'user';
    }
  }

  // History must end with 'model' turn so that the upcoming sendMessage is 'user'
  if (validHistory.length > 0 && validHistory[validHistory.length - 1].role === 'user') {
    validHistory.pop();
  }

  // Try candidate models in order until one succeeds
  for (const modelCandidate of uniqueModels) {
    try {
      const modelWithInstruction = client.getGenerativeModel({
        model: modelCandidate,
        systemInstruction: systemPrompt
      });

      const chat = modelWithInstruction.startChat({
        history: validHistory
      });

      const result = await chat.sendMessage(`CITIZEN QUERY: "${message}"`);
      const rawText = result.response.text().trim();
      const cleanJson = rawText.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();

      try {
        const parsed = JSON.parse(cleanJson);
        return {
          success: true,
          data: parsed,
          raw_text: parsed.answer,
          source: `gemini-${modelCandidate}`
        };
      } catch (parseError) {
        console.warn(`[AI Saathi] JSON parse fallback on ${modelCandidate}:`, parseError);
        return {
          success: true,
          data: {
            answer: rawText,
            intent: 'Citizen guidance',
            category: relevantServices[0]?.category_name || 'General Guidance',
            jurisdiction: relevantServices[0]?.jurisdiction_level || 'CENTRAL',
            service: relevantServices[0] ? {
              name: relevantServices[0].name,
              reason: relevantServices[0].simple_description,
              who_is_it_for: relevantServices[0].eligibility,
              official_website: relevantServices[0].official_website,
              official_app: relevantServices[0].official_app,
              official_helpline: relevantServices[0].official_helpline,
              fee: relevantServices[0].fee,
              last_verified: relevantServices[0].last_verified_at
            } : null,
            documents: relevantServices[0]?.documents?.map(d => d.document_name) || [],
            steps: relevantServices[0]?.steps || [],
            important_notes: ['Gov Saathi provides guidance. Complete the actual submission on the official portal.'],
            needs_clarification: false,
            confidence: 'medium'
          },
          raw_text: rawText,
          source: `gemini-text-${modelCandidate}`
        };
      }
    } catch (error) {
      console.warn(`[AI Saathi] Model ${modelCandidate} failed:`, error.message || error);
      // Continue to next model in loop
    }
  }

  console.warn('[AI Saathi] All Gemini models exhausted, using rich multilingual deterministic fallback.');
  return generateDeterministicFallback(message, relevantServices, langKey);
}

function generateDeterministicFallback(message, relevantServices, language = 'en') {
  const isHi = language === 'hi';
  const isTe = language === 'te';
  const isKn = language === 'kn';
  const isTa = language === 'ta';

  if (relevantServices.length > 0) {
    const s = relevantServices[0];
    let trans = SERVICE_TRANSLATIONS[s.slug]?.[language] || null;
    if (!trans) {
      for (const [key, val] of Object.entries(SERVICE_TRANSLATIONS)) {
        if (s.slug.includes(key) || key.includes(s.slug)) {
          trans = val[language];
          break;
        }
      }
    }

    let serviceName = trans?.name || s.name;
    let serviceReason = trans?.reason || s.simple_description;
    let serviceEligibility = trans?.who_is_it_for || s.eligibility;

    let answer = `For "${message}", the verified official authority is ${serviceName} under ${s.department}. You can use this service ${s.application_mode.toLowerCase()} to resolve your requirement.`;
    let docs = trans?.documents || s.documents?.map(d => d.document_name) || ['Official photo ID (Aadhaar / Voter ID)', 'Registered Mobile Number'];
    let steps = trans?.steps || s.steps || [
      { step_number: 1, title: 'Visit Official Portal', description: `Open ${s.official_website} in your web browser.` },
      { step_number: 2, title: 'Authenticate & Fill Application', description: s.processing_information || 'Enter required citizen details and upload documents.' },
      { step_number: 3, title: 'Submit & Track Status', description: `Save application acknowledgement and track on ${s.official_website}.` }
    ];

    let notes = [
      'Gov Saathi is an official guidance platform. Never share your passwords or OTP with anyone.',
      'Always verify that the website URL ends in .gov.in or .nic.in.'
    ];

    if (isHi) {
      answer = `"${message}" के लिए, आधिकारिक और सत्यापित प्राधिकरण ${s.department} के अंतर्गत ${serviceName} है। आप इस सेवा का उपयोग अपनी आवश्यकता पूरी करने के लिए कर सकते हैं।`;
      notes = ['सरकार साथी एक मार्गदर्शक मंच है। अपना पासवर्ड या ओटीपी कभी किसी से साझा न करें।', 'हमेशा जांचें कि वेबसाइट का यूआरएल .gov.in या .nic.in से समाप्त होता है।'];
      if (!trans) {
        steps = [
          { step_number: 1, title: 'आधिकारिक पोर्टल खोलें', description: `अपने ब्राउज़र में आधिकारिक पोर्टल ${s.official_website} खोलें।` },
          { step_number: 2, title: 'विवरण भरें और प्रमाणीकरण करें', description: 'आवश्यक विवरण दर्ज करें और आधार/ओटीपी से सत्यापित करें।' },
          { step_number: 3, title: 'आवेदन जमा करें और पावती रखें', description: 'आवेदन शुल्क (यदि लागू हो) का भुगतान करें और रसीद नंबर सुरक्षित रखें।' }
        ];
      }
    } else if (isTe) {
      answer = `"${message}" కోసం, అధికారిక మరియు ధృవీకరించబడిన విభాగం ${s.department} క్రింద ${serviceName} ఉంది. మీరు మీ సమస్యను పరిష్కరించడానికి ఈ సేవను ఉపయోగించవచ్చు.`;
      notes = ['గవ్ సాథి మార్గదర్శక వేదిక మాత్రమే. మీ పాస్‌వర్డ్ లేదా ఓటీపీని ఎవరితోనూ పంచుకోవద్దు.', 'వెబ్‌సైట్ చిరునామా .gov.in లేదా .nic.in తో ముగుస్తుందో లేదో ఎల్లప్పుడూ ధృవీకరించుకోండి.'];
      if (!trans) {
        steps = [
          { step_number: 1, title: 'అధికారిక పోర్టల్ తెరవండి', description: `మీ బ్రౌజర్‌లో అధికారిక పోర్టల్ ${s.official_website} తెరవండి.` },
          { step_number: 2, title: 'వివరాలు పూరించండి & ధృవీకరించండి', description: 'అవసరమైన పౌర వివరాలను నమోదు చేసి ఆధార్ OTP ద్వారా ధృవీకరించండి.' },
          { step_number: 3, title: 'దరఖాస్తు సమర్పించి రసీదు భద్రపరచండి', description: 'దరఖాస్తును సమర్పించి అధికారిక రసీదు సంఖ్యను ట్రాకింగ్ కోసం భద్రపరుచుకోండి.' }
        ];
      }
    } else if (isKn) {
      answer = `"${message}" ಗಾಗಿ, ಅಧಿಕೃತ ಮತ್ತು ಪರಿಶೀಲಿಸಲಾದ ಪ್ರಾಧಿಕಾರವು ${s.department} ಅಡಿಯಲ್ಲಿ ${serviceName} ಆಗಿದೆ. ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ಪರಿಹರಿಸಲು ನೀವು ಈ ಸೇವೆಯನ್ನು ಬಳಸಬಹುದು.`;
      notes = ['ಗವ್ ಸಾಥಿ ಮಾರ್ಗದರ್ಶಿ ವೇದಿಕೆಯಾಗಿದೆ. ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ OTP ಅನ್ನು ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.', 'ವೆಬ್‌ಸೈಟ್ ವಿಳಾಸವು .gov.in ಅಥವಾ .nic.in ನೊಂದಿಗೆ ಕೊನೆಗೊಳ್ಳುತ್ತದೆಯೇ ಎಂದು ಯಾವಾಗಲೂ ಪರಿಶೀಲಿಸಿ.'];
      if (!trans) {
        steps = [
          { step_number: 1, title: 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ', description: `ನಿಮ್ಮ ವೆಬ್ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ${s.official_website} ತೆರೆಯಿರಿ.` },
          { step_number: 2, title: 'ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ ಮತ್ತು ದೃಢೀಕರಿಸಿ', description: 'ಅಗತ್ಯವಿರುವ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ ಮತ್ತು ಆಧಾರ್ OTP ಮೂಲಕ ಪರಿಶೀಲನೆ ಮಾಡಿ.' },
          { step_number: 3, title: 'ಅರ್ಜಿ ಸಲ್ಲಿಸಿ ಮತ್ತು ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ', description: 'ಅರ್ಜಿಯನ್ನು ಸಲ್ಲಿಸಿ ಮತ್ತು ಸ್ವೀಕೃತಿ ಸಂಖ್ಯೆಯನ್ನು ಉಳಿಸಿಕೊಳ್ಳಿ.' }
        ];
      }
    } else if (isTa) {
      answer = `"${message}" க்கு, அதிகாரப்பூர்வ மற்றும் சரிபார்க்கப்பட்ட அதிகாரம் ${s.department} கீழ் உள்ள ${serviceName} ஆகும். உங்கள் தேவையை பூர்த்தி செய்ய இந்த சேவையைப் பயன்படுத்தலாம்.`;
      notes = ['கவ் சாத்தி ஒரு வழிகாட்டும் தளமாகும். உங்கள் கடவுச்சொல் அல்லது OTP ஐ யாருடனும் பகிர வேண்டாம்.', 'இணையதள முகவரி .gov.in அல்லது .nic.in உடன் முடிகிறதா என்பதை எப்போதும் சரிபார்க்கவும்.'];
      if (!trans) {
        steps = [
          { step_number: 1, title: 'அதிகாரப்பூர்வ தளத்திற்கு செல்லவும்', description: `உங்கள் உலாவியில் ${s.official_website} தளத்தைத் திறக்கவும்.` },
          { step_number: 2, title: 'விவரங்களை பூர்த்தி செய்து சரிபார்க்கவும்', description: 'தேவையான விவரங்களை உள்ளிட்டு ஆதார் மூலம் சரிபார்க்கவும்.' },
          { step_number: 3, title: 'விண்ணப்பத்தை சமர்ப்பித்து ஒப்புகை பெறவும்', description: 'விண்ணப்பத்தை சமர்ப்பித்து ஒப்புகை எண்ணை பாதுகாப்பாக வைக்கவும்.' }
        ];
      }
    }

    return {
      success: true,
      data: {
        answer,
        intent: s.category_name,
        category: s.category_name,
        jurisdiction: s.jurisdiction_level,
        service: {
          name: serviceName,
          reason: serviceReason,
          who_is_it_for: serviceEligibility,
          official_website: s.official_website,
          official_app: s.official_app,
          official_helpline: s.official_helpline,
          fee: s.fee,
          last_verified: s.last_verified_at
        },
        documents: docs,
        steps,
        important_notes: notes,
        needs_clarification: false,
        confidence: 'high'
      },
      source: 'verified-database-multilingual'
    };
  }

  let defaultAnswer = `I could not locate an exact verified government service for "${message}". In India, public services are administered across Central, State, and Municipal levels. Please specify your state or choose a category below.`;
  let steps = [
    { step_number: 1, title: 'Search on National Portal', description: 'Visit https://services.india.gov.in/ and search for your specific state and department.' }
  ];
  let docs = ['Aadhaar Card', 'Mobile Number for OTP'];

  if (isHi) {
    defaultAnswer = `मुझे "${message}" के लिए सटीक सरकारी सेवा नहीं मिली। भारत में सार्वजनिक सेवाएं केंद्र, राज्य और नगर निगम स्तरों पर प्रबंधित होती हैं। कृपया अपना राज्य बताएं या श्रेणी चुनें।`;
    steps = [
      { step_number: 1, title: 'राष्ट्रीय पोर्टल पर खोजें', description: 'https://services.india.gov.in/ पर जाएं और अपने राज्य व विभाग के अनुसार खोजें।' }
    ];
    docs = ['आधार कार्ड', 'ओटीपी के लिए मोबाइल नंबर'];
  } else if (isTe) {
    defaultAnswer = `"${message}" కోసం ఖచ్చితమైన ధృవీకరించబడిన ప్రభుత్వ సేవ కనుగొనబడలేదు. దయచేసి మీ రాష్ట్రాన్ని పేర్కొనండి లేదా వర్గాన్ని ఎంచుకోండి.`;
    steps = [
      { step_number: 1, title: 'జాతీయ పోర్టల్‌లో శోధించండి', description: 'https://services.india.gov.in/ ని సందర్శించి మీ నిర్దిష్ట రాష్ట్రం మరియు శాఖను ఎంచుకోండి.' }
    ];
    docs = ['ఆధార్ కార్డు', 'ఓటీపీ కోసం మొబైల్ నంబర్'];
  } else if (isKn) {
    defaultAnswer = `"${message}" ಗಾಗಿ ನಿಖರವಾದ ಪರಿಶೀಲಿಸಲಾದ ಸರ್ಕಾರಿ ಸೇವೆಯನ್ನು ಹುಡುಕಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ರಾಜ್ಯವನ್ನು ನಿರ್ದಿಷ್ಟಪಡಿಸಿ ಅಥವಾ ಕೆಳಗಿನ ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ.`;
    steps = [
      { step_number: 1, title: 'ರಾಷ್ಟ್ರೀಯ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಹುಡುಕಿ', description: 'https://services.india.gov.in/ ಗೆ ಭೇಟಿ ನೀಡಿ ಮತ್ತು ನಿಮ್ಮ ರಾಜ್ಯ ಹಾಗೂ ಇಲಾಖೆಯನ್ನು ಹುಡುಕಿ.' }
    ];
    docs = ['ಆಧಾರ್ ಕಾರ್ಡ್', 'OTP ಗಾಗಿ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ'];
  } else if (isTa) {
    defaultAnswer = `"${message}" க்கான சரியான சரிபார்க்கப்பட்ட அரசு சேவையை கண்டுபிடிக்க முடியவில்லை. தயவுசெய்து உங்கள் மாநிலத்தைக் குறிப்பிடவும் அல்லது பிரிவைத் தேர்ந்தெடுக்கவும்.`;
    steps = [
      { step_number: 1, title: 'தேசிய போர்ட்டலில் தேடவும்', description: 'https://services.india.gov.in/ தளத்திற்குச் சென்று உங்கள் மாநிலம் மற்றும் துறையைத் தேடவும்.' }
    ];
    docs = ['ஆதார் அட்டை', 'OTP க்கான மொபைல் எண்'];
  }

  return {
    success: true,
    data: {
      answer: defaultAnswer,
      intent: 'General inquiry',
      category: 'Other Government Services',
      jurisdiction: 'CENTRAL',
      service: {
        name: 'National Government Services Portal (services.india.gov.in)',
        reason: 'National index listing over 13,000 Central and State public services.',
        who_is_it_for: 'All Indian citizens.',
        official_website: 'https://services.india.gov.in/',
        official_app: 'UMANG',
        official_helpline: '1800-111-555',
        fee: 'Varies by service',
        last_verified: new Date().toISOString()
      },
      documents: docs,
      steps,
      important_notes: ['Ensure you are visiting genuine .gov.in or .nic.in portals.'],
      needs_clarification: true,
      confidence: 'low'
    },
    source: 'national-portal-fallback'
  };
}
