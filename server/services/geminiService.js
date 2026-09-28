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

export async function askAISaathi({ message, history = [], state = 'All India', district = '', language = 'en' }) {
  const client = getGeminiClient();
  const relevantServices = findRelevantServices(message, state);

  // If no Gemini client is available, fallback to high-quality deterministic response from verified database
  if (!client) {
    return generateDeterministicFallback(message, relevantServices, language);
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
You are "AI Saathi", the official AI guide of GOV SAATHI - a citizen discovery and guidance platform for Indian government services.
Your role is to explain official Indian government services, verify the right department, and give step-by-step instructions.

CRITICAL RULES (NON-NEGOTIABLE):
1. GOV SAATHI DOES NOT SUBMIT COMPLAINTS OR APPLICATIONS. You are an informational guide helping citizens open the official portal themselves.
2. NEVER INVENT fake URLs, phone numbers, fees, or departments.
3. Use the VERIFIED DATABASE CONTEXT provided below as ground truth.
4. If the database context does not cover the request, explicitly state: "This specific service is not yet verified in our database. Please check your state or central portal."
5. Jurisdiction awareness:
   - For potholes, garbage, streetlights, drainage -> It is MUNICIPAL / LOCAL (Swachhata App, local municipal corporation).
   - For financial scams, UPI fraud -> It is CYBERCRIME (National Cyber Crime Reporting Portal, Helpline 1930).
   - For e-commerce, defective products, refund disputes -> It is CONSUMER AFFAIRS (NCH, Helpline 1915).
   - For official document downloads (Marksheet, DL, RC, Aadhaar) -> DIGILOCKER (digilocker.gov.in).
6. Target Language: Respond in ${language === 'hi' ? 'Hindi (हिन्दी)' : language === 'te' ? 'Telugu (తెలుగు)' : 'English'}.

VERIFIED DATABASE CONTEXT:
${JSON.stringify(contextData, null, 2)}

USER LOCATION:
State: ${state || 'All India'}, District: ${district || 'Not specified'}

You MUST output your response as valid, parseable JSON conforming to this schema:
{
  "answer": "Direct simple citizen-friendly explanation",
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
  "documents": ["List of verified documents"],
  "steps": [
    {
      "step_number": 1,
      "title": "Short title",
      "description": "Clear action instruction"
    }
  ],
  "important_notes": ["Critical citizen tips"],
  "needs_clarification": false,
  "clarifying_question": null,
  "confidence": "high"
}
Only return the raw JSON object, without markdown code fences if possible.
`;

  try {
    const chat = model.startChat({
      history: history.slice(-6).map(h => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }]
      }))
    });

    const result = await chat.sendMessage([
      { text: systemPrompt },
      { text: `CITIZEN QUERY: "${message}"` }
    ]);

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
    return generateDeterministicFallback(message, relevantServices, language);
  }
}

function generateDeterministicFallback(message, relevantServices, language) {
  if (relevantServices.length > 0) {
    const s = relevantServices[0];
    return {
      success: true,
      data: {
        answer: `For "${message}", the verified official authority is ${s.name} under ${s.department}. You can use this service ${s.application_mode.toLowerCase()} to resolve your requirement.`,
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
        documents: s.documents?.map(d => d.document_name) || ['Official photo ID (Aadhaar / Voter ID)'],
        steps: s.steps || [
          { step_number: 1, title: 'Visit Official Portal', description: `Open ${s.official_website} in your web browser.` },
          { step_number: 2, title: 'Follow Official Steps', description: s.processing_information }
        ],
        important_notes: [
          'Gov Saathi is an official guidance platform. Never share your passwords or OTP with anyone.',
          'Always verify that the website URL ends in .gov.in or .nic.in.'
        ],
        needs_clarification: false,
        confidence: 'high'
      },
      source: 'verified-database'
    };
  }

  return {
    success: true,
    data: {
      answer: `I could not locate an exact verified government service for "${message}". In India, public services are administered across Central, State, and Municipal levels. Please specify your state or choose a category below.`,
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
