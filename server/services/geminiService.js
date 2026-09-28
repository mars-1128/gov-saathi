// GOV SAATHI - AI SAATHI ENGINE POWERED BY GOOGLE GEMINI
// Strictly enforces factual grounding against verified Indian government services.

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
  od: 'Odia (ଓଡ଼ಿଆ)',
  ur: 'Urdu (اردو)'
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

  const modelName = process.env.AI_MODEL || 'gemini-2.5-flash';
  const model = client.getGenerativeModel({ model: modelName });

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

MULTILINGUAL CAPABILITIES & RULES (MANDATORY):
1. PRIMARY RESPONSE LANGUAGE:
   - By default, provide your complete response in: ${targetLanguageName} (${langKey}).
2. USER OVERRIDE & DYNAMIC SWITCHING:
   - If the user explicitly asks for ANY other language (for example: "explain in Kannada", "give information in Tamil", "tell me in Telugu", "हिंदी में बताओ", "ಕನ್ನಡದಲ್ಲಿ ನೀಡಿ", "தமிழில் சொல்லுங்கள்", "in French", "in Bengali", etc.), or writes their question in another language/script, IMMEDIATELY HONOR THAT REQUEST and respond fully in that requested language.
3. LANGUAGE ACCURACY & CITIZEN CLARITY:
   - Provide fluent, natural, grammatically correct translations for all instructions, documents, explanations, and advice.
   - For technical terms like Aadhaar, OTP, DigiLocker, FIR, UPI, or Pan Card, provide the native script or accepted transliteration so citizens easily understand.
   - PRESERVE OFFICIAL IDENTIFIERS: Keep verified official portal URLs (e.g., https://digilocker.gov.in, https://cybercrime.gov.in) and official helpline numbers (e.g., 1930, 1950, 1915, 14449) intact in standard Latin / numerals so citizens can click and dial directly.

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

You MUST output your response as valid, parseable JSON conforming to this schema (with all textual fields translated into the target language):
{
  "answer": "Direct simple citizen-friendly explanation in the target language",
  "intent": "Brief classification of citizen issue",
  "category": "Category name",
  "jurisdiction": "CENTRAL | STATE | MUNICIPAL | DISTRICT | PANCHAYAT",
  "service": {
    "name": "Official Service Name",
    "reason": "Why this service is the correct official authority",
    "who_is_it_for": "Eligibility / citizen criteria",
    "official_website": "Official .gov.in / .nic.in URL",
    "official_app": "Official app name or null",
    "official_helpline": "Official helpline number",
    "fee": "Verified fee info",
    "last_verified": "Verification date"
  },
  "documents": ["List of verified documents in target language"],
  "steps": [
    {
      "step_number": 1,
      "title": "Short title in target language",
      "description": "Clear action instruction in target language"
    }
  ],
  "important_notes": ["Critical citizen tips in target language"],
  "needs_clarification": false,
  "clarifying_question": null,
  "confidence": "high"
}
Only return the raw JSON object, without markdown code fences.
`;

  try {
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

    const modelWithInstruction = client.getGenerativeModel({
      model: modelName,
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
        source: 'gemini-grounded'
      };
    } catch (parseError) {
      console.warn('[AI Saathi] JSON parsing warning, returning structured fallback wrapper:', parseError);
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
        source: 'gemini-text'
      };
    }
  } catch (error) {
    console.error('[AI Saathi] Gemini API error:', error);
    return generateDeterministicFallback(message, relevantServices, langKey);
  }
}

function generateDeterministicFallback(message, relevantServices, language = 'en') {
  const isHi = language === 'hi';
  const isTe = language === 'te';
  const isKn = language === 'kn';
  const isTa = language === 'ta';

  if (relevantServices.length > 0) {
    const s = relevantServices[0];
    
    let answer = `For "${message}", the verified official authority is ${s.name} under ${s.department}. You can use this service ${s.application_mode.toLowerCase()} to resolve your requirement.`;
    let docs = s.documents?.map(d => d.document_name) || ['Official photo ID (Aadhaar / Voter ID)'];
    let notes = [
      'Gov Saathi is an official guidance platform. Never share your passwords or OTP with anyone.',
      'Always verify that the website URL ends in .gov.in or .nic.in.'
    ];

    if (isHi) {
      answer = `"${message}" के लिए, आधिकारिक और सत्यापित प्राधिकरण ${s.department} के अंतर्गत ${s.name} है। आप इस सेवा का उपयोग अपनी आवश्यकता पूरी करने के लिए कर सकते हैं।`;
      docs = ['पहचान प्रमाण (आधार कार्ड / वोटर आईडी)', 'सत्यापन के लिए मोबाइल नंबर'];
      notes = ['सरकार साथी एक मार्गदर्शक मंच है। अपना पासवर्ड या ओटीपी कभी किसी से साझा न करें।', 'हमेशा जांचें कि वेबसाइट का यूआरएल .gov.in या .nic.in से समाप्त होता है।'];
    } else if (isTe) {
      answer = `"${message}" కోసం, ధృవీకరించబడిన అధికారిక విభాగం ${s.department} క్రింద ${s.name} ఉంది. మీరు మీ సమస్యను పరిష్కరించడానికి ఈ సేవను ఉపయోగించవచ్చు.`;
      docs = ['గుర్తింపు కార్డు (ఆధార్ కార్డు / ఓటరు ఐడి)', 'మొబైల్ నంబర్'];
      notes = ['గవ్ సాథి మార్గదర్శక వేదిక మాత్రమే. మీ పాస్‌వర్డ్ లేదా ఓటీపీని ఎవరితోనూ పంచుకోవద్దు.', 'వెబ్‌సైట్ చిరునామా .gov.in లేదా .nic.in తో ముగుస్తుందో లేదో ఎల్లప్పుడూ ధృవీకరించుకోండి.'];
    } else if (isKn) {
      answer = `"${message}" ಗಾಗಿ, ಪರಿಶೀಲಿಸಲಾದ ಅಧಿಕೃತ ಪ್ರಾಧಿಕಾರವು ${s.department} ಅಡಿಯಲ್ಲಿ ${s.name} ಆಗಿದೆ. ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ಪರಿಹರಿಸಲು ನೀವು ಈ ಸೇವೆಯನ್ನು ಬಳಸಬಹುದು.`;
      docs = ['ಗುರುತಿನ ಚೀಟಿ (ಆಧಾರ್ ಕಾರ್ಡ್ / ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ)', 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ'];
      notes = ['ಗವ್ ಸಾಥಿ ಮಾರ್ಗದರ್ಶಿ ವೇದಿಕೆಯಾಗಿದೆ. ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ OTP ಅನ್ನು ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ.', 'ವೆಬ್‌ಸೈಟ್ ವಿಳಾಸವು .gov.in ಅಥವಾ .nic.in ನೊಂದಿಗೆ ಕೊನೆಗೊಳ್ಳುತ್ತದೆಯೇ ಎಂದು ಯಾವಾಗಲೂ ಪರಿಶೀಲಿಸಿ.'];
    } else if (isTa) {
      answer = `"${message}" க்கு, சரிபார்க்கப்பட்ட அதிகாரப்பூர்வ அதிகாரம் ${s.department} கீழ் உள்ள ${s.name} ஆகும். உங்கள் தேவையை பூர்த்தி செய்ய இந்த சேவையைப் பயன்படுத்தலாம்.`;
      docs = ['அடையாள அட்டை (ஆதார் அட்டை / வாக்காளர் அட்டை)', 'மொபைல் எண்'];
      notes = ['கவ் சாத்தி ஒரு வழிகாட்டும் தளமாகும். உங்கள் கடவுச்சொல் அல்லது OTP ஐ யாருடனும் பகிர வேண்டாம்.', 'இணையதள முகவரி .gov.in அல்லது .nic.in உடன் முடிகிறதா என்பதை எப்போதும் சரிபார்க்கவும்.'];
    }

    return {
      success: true,
      data: {
        answer,
        intent: s.category_name,
        category: s.category_name,
        jurisdiction: s.jurisdiction_level,
        service: {
          name: s.name,
          reason: s.simple_description,
          who_is_it_for: s.eligibility,
          official_website: s.official_website,
          official_app: s.official_app,
          official_helpline: s.official_helpline,
          fee: s.fee,
          last_verified: s.last_verified_at
        },
        documents: docs,
        steps: s.steps || [
          { step_number: 1, title: 'Visit Official Portal', description: `Open ${s.official_website} in your web browser.` },
          { step_number: 2, title: 'Follow Official Steps', description: s.processing_information }
        ],
        important_notes: notes,
        needs_clarification: false,
        confidence: 'high'
      },
      source: 'verified-database'
    };
  }

  let defaultAnswer = `I could not locate an exact verified government service for "${message}". In India, public services are administered across Central, State, and Municipal levels. Please specify your state or choose a category below.`;
  if (isHi) {
    defaultAnswer = `मुझे "${message}" के लिए सटीक सरकारी सेवा नहीं मिली। भारत में सार्वजनिक सेवाएं केंद्र, राज्य और नगर निगम स्तरों पर प्रबंधित होती हैं। कृपया अपना राज्य बताएं या श्रेणी चुनें।`;
  } else if (isTe) {
    defaultAnswer = `"${message}" కోసం ఖచ్చితమైన ధృవీకరించబడిన ప్రభుత్వ సేవ కనుగొనబడలేదు. దయచేసి మీ రాష్ట్రాన్ని పేర్కొనండి లేదా వర్గాన్ని ఎంచుకోండి.`;
  } else if (isKn) {
    defaultAnswer = `"${message}" ಗಾಗಿ ನಿಖರವಾದ ಪರಿಶೀಲಿಸಲಾದ ಸರ್ಕಾರಿ ಸೇವೆಯನ್ನು ಹುಡುಕಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ರಾಜ್ಯವನ್ನು ನಿರ್ದಿಷ್ಟಪಡಿಸಿ ಅಥವಾ ಕೆಳಗಿನ ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ.`;
  } else if (isTa) {
    defaultAnswer = `"${message}" க்கான சரியான சரிபார்க்கப்பட்ட அரசு சேவையை கண்டுபிடிக்க முடியவில்லை. தயவுசெய்து உங்கள் மாநிலத்தைக் குறிப்பிடவும் அல்லது பிரிவைத் தேர்ந்தெடுக்கவும்.`;
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
      documents: ['Aadhaar Card', 'Mobile Number for OTP'],
      steps: [
        { step_number: 1, title: 'Search on National Portal', description: 'Visit https://services.india.gov.in/ and search for your specific state and department.' }
      ],
      important_notes: ['Ensure you are visiting genuine .gov.in or .nic.in portals.'],
      needs_clarification: true,
      confidence: 'low'
    },
    source: 'national-portal-fallback'
  };
}
