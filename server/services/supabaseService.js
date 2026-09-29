// GOV SAATHI - SUPABASE DATABASE CONNECTOR
// Provides seamless database queries with resilient fallback to verified seed data.

import { createClient } from '@supabase/supabase-js';
import {
  VERIFIED_CATEGORIES,
  VERIFIED_SERVICES,
  VERIFIED_SCHEMES,
  VERIFIED_APPS,
  VERIFIED_DIGITAL_DOCUMENTS
} from '../data/verifiedServices.js';

let supabaseClient = null;

export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    console.warn('[Supabase] Missing credentials in environment.');
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = createClient(url, key, {
      auth: { persistSession: false }
    });
  }
  return supabaseClient;
}

// Fetch all categories
export async function fetchCategories() {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn('[Supabase] Fetch categories fallback:', e.message);
    }
  }
  return VERIFIED_CATEGORIES;
}

// Mapping table connecting Supabase UUIDs, cat-X IDs, slugs, and display names
export const CATEGORY_IDENTIFIERS = [
  { id: 'cat-1', uuid: '64b3f892-0e48-4dca-ba1f-47b5f523307c', slug: 'complaints-grievances', name: 'Complaints & Grievances' },
  { id: 'cat-2', uuid: 'e6776aa3-65d5-40bd-acb3-5f4ccc1add3b', slug: 'cybercrime', name: 'Cybercrime' },
  { id: 'cat-3', uuid: 'f2d47687-899c-4df3-9f80-605b0af2b6a9', slug: 'consumer-issues', name: 'Consumer Issues' },
  { id: 'cat-4', uuid: 'e37247ba-c5f9-4f83-956c-80bd3a02c7ab', slug: 'documents-certificates', name: 'Documents & Certificates' },
  { id: 'cat-5', uuid: 'c5f57728-44a2-4227-88a9-fb62d3d4b9b9', slug: 'identity-services', name: 'Identity Services' },
  { id: 'cat-6', uuid: '88a12a6a-b391-48df-a09a-dab437b43ad3', slug: 'passport-travel', name: 'Passport & Travel' },
  { id: 'cat-7', uuid: '310935d8-5860-45b4-b221-c8c9819f53aa', slug: 'transport', name: 'Transport' },
  { id: 'cat-8', uuid: '8e13b45e-a10d-40d8-8f72-e54b44b4e845', slug: 'government-schemes', name: 'Government Schemes' },
  { id: 'cat-9', uuid: 'bfdf22e2-692d-4222-8375-b6fced718287', slug: 'government-apps', name: 'Government Apps' },
  { id: 'cat-10', uuid: 'a82ccb99-e10e-416b-881a-8eb1ebbaf4f7', slug: 'health-services', name: 'Health Services' },
  { id: 'cat-11', uuid: '164c923f-8aaf-4803-8a87-cd5f67d4264e', slug: 'education', name: 'Education' },
  { id: 'cat-12', uuid: '85a8bd58-4b46-4cf9-99c6-c2574b68b41f', slug: 'scholarships', name: 'Scholarships' },
  { id: 'cat-13', uuid: '4a149983-fcf3-4ac1-8975-5374e281ab99', slug: 'jobs-employment', name: 'Jobs & Employment' },
  { id: 'cat-14', uuid: '65ffd1df-0c2b-4d58-8c50-5aaadb46a88f', slug: 'utility-services', name: 'Utility Services' },
  { id: 'cat-15', uuid: '00cbfe58-4d07-4cc1-a493-32c3182face9', slug: 'property-revenue', name: 'Property & Revenue' },
  { id: 'cat-16', uuid: '97766b65-508c-4ee7-b4cb-fea0de012b95', slug: 'business-startup', name: 'Business & Startup' },
  { id: 'cat-17', uuid: '814c61dc-2b75-4d97-bcca-8f0ce001c0cc', slug: 'elections-voter-services', name: 'Elections & Voter Services' },
  { id: 'cat-18', uuid: '4638d258-4b24-4003-9f4c-3dff5eced796', slug: 'other-services', name: 'Other Government Services' }
];

export function resolveCategory(identifier) {
  if (!identifier) return null;
  const clean = identifier.toString().trim().toLowerCase();
  return CATEGORY_IDENTIFIERS.find(c =>
    c.id.toLowerCase() === clean ||
    c.uuid.toLowerCase() === clean ||
    c.slug.toLowerCase() === clean ||
    c.name.toLowerCase() === clean ||
    c.name.toLowerCase().includes(clean)
  ) || null;
}

// Fetch services with optional category, jurisdiction, state filter
export async function fetchServices({ category, jurisdiction, state, search } = {}) {
  const supabase = getSupabase();
  let dbServices = [];

  const targetCategory = resolveCategory(category);
  const targetCategoryIds = targetCategory ? [targetCategory.uuid, targetCategory.id, targetCategory.slug] : (category ? [category] : []);

  if (supabase) {
    try {
      let query = supabase.from('government_services').select('*').eq('status', 'ACTIVE');
      if (targetCategoryIds.length === 1) {
        query = query.eq('category_id', targetCategoryIds[0]);
      } else if (targetCategoryIds.length > 1) {
        query = query.in('category_id', targetCategoryIds);
      }
      if (jurisdiction) query = query.eq('jurisdiction_level', jurisdiction);
      if (state && state !== 'All India') query = query.or(`state.eq.All India,state.eq.${state}`);
      // Note: We don't restrict Supabase search query with multi-word strings here
      // to ensure phonetic and keyword expansion in memory can match rich services reliably
      const { data, error } = await query;
      if (!error && data) {
        dbServices = data;
      }
    } catch (e) {
      console.warn('[Supabase] Fetch services fallback:', e.message);
    }
  }

  // Combine with verified catalog so new services and rich details are always present
  let combined = [...dbServices];

  // Helper to check if a category filter matches
  const matchesCategory = (s, catFilter) => {
    if (!catFilter) return true;
    const target = resolveCategory(catFilter);
    const serviceCat = resolveCategory(s.category_id) || resolveCategory(s.category_name);

    if (target && serviceCat) {
      return target.id === serviceCat.id;
    }

    if (target) {
      if (s.category_id === target.id || s.category_id === target.uuid || s.category_id === target.slug) return true;
      if (s.category_name && s.category_name.toLowerCase().includes(target.name.toLowerCase())) return true;
    }

    if (s.category_id && s.category_id.toLowerCase() === catFilter.toLowerCase()) return true;
    if (s.category_name && s.category_name.toLowerCase().includes(catFilter.toLowerCase())) return true;
    return false;
  };

  for (const s of VERIFIED_SERVICES) {
    const existingIndex = combined.findIndex(item => item.slug === s.slug);
    if (existingIndex >= 0) {
      // Merge rich metadata into existing service if missing
      combined[existingIndex] = {
        ...s,
        ...combined[existingIndex],
        official_website: (
          combined[existingIndex].official_website?.includes('swachhbharaturban.gov.in') ||
          combined[existingIndex].official_website?.includes('onlineservices.nsdl.com') ||
          combined[existingIndex].official_website?.includes('/iec/fposervices')
        ) ? s.official_website : (combined[existingIndex].official_website || s.official_website),
        official_source: s.official_source || combined[existingIndex].official_source,
        official_app_url: s.official_app_url || combined[existingIndex].official_app_url,
        sub_services: s.sub_services || combined[existingIndex].sub_services || [],
        steps: combined[existingIndex].steps?.length ? combined[existingIndex].steps : s.steps,
        documents: combined[existingIndex].documents?.length ? combined[existingIndex].documents : s.documents,
        requirements: combined[existingIndex].requirements?.length ? combined[existingIndex].requirements : s.requirements,
        tips: s.tips || combined[existingIndex].tips
      };
    } else {
      // If service is in verified list but not yet in DB, include it if filters match
      if (matchesCategory(s, category)) {
        if (!jurisdiction || s.jurisdiction_level === jurisdiction) {
          if (!state || state === 'All India' || s.state === 'All India' || s.state.toLowerCase() === state.toLowerCase()) {
            combined.push(s);
          }
        }
      }
    }
  }

  // Filter combined if DB wasn't queried or filter applied locally
  if (category) {
    combined = combined.filter(s => matchesCategory(s, category));
  }
  if (jurisdiction) {
    combined = combined.filter(s => s.jurisdiction_level === jurisdiction);
  }
  if (state && state !== 'All India') {
    combined = combined.filter(s => s.state === 'All India' || s.state.toLowerCase() === state.toLowerCase());
  }
  if (search) {
    const rawQ = search.toLowerCase().trim();
    const stopWords = new Set(['in', 'to', 'for', 'the', 'a', 'an', 'of', 'and', 'is', 'my', 'online', 'card', 'how']);
    const tokens = rawQ.split(/[\s,+/_-]+/).filter(w => w.length > 1 && !stopWords.has(w));

    // Synonym & category expansions
    const expansions = new Set([rawQ]);
    if (tokens.length > 0) {
      tokens.forEach(t => expansions.add(t));
    }

    if (rawQ.includes('aadhar') || rawQ.includes('adhar') || rawQ.includes('aadhaar')) {
      expansions.add('aadhaar');
      expansions.add('aadhar');
      expansions.add('uidai');
      expansions.add('myaadhaar');
    }
    if (rawQ.includes('document') || rawQ.includes('documents') || rawQ.includes('certificate') || rawQ.includes('certificates') || rawQ.includes('identity')) {
      expansions.add('digilocker');
      expansions.add('aadhaar');
      expansions.add('pan');
      expansions.add('licence');
      expansions.add('marksheets');
      expansions.add('identity');
    }
    if (rawQ.includes('swatch') || rawQ.includes('swatchhbharath') || rawQ.includes('swachh') || rawQ.includes('swachata') || rawQ.includes('swachhta')) {
      expansions.add('swachhata');
      expansions.add('swachh bharat');
      expansions.add('sanitation');
      expansions.add('pothole');
    }
    if (rawQ.includes('utility') || rawQ.includes('bill') || rawQ.includes('electricity') || rawQ.includes('water') || rawQ.includes('gas') || rawQ.includes('cylinder') || rawQ.includes('lpg')) {
      expansions.add('utility');
      expansions.add('electricity');
      expansions.add('water');
      expansions.add('lpg');
      expansions.add('bill');
      expansions.add('bbps');
    }
    if (rawQ.includes('pan') || rawQ.includes('epan') || rawQ.includes('tin')) {
      expansions.add('pan');
      expansions.add('epan');
      expansions.add('incometax');
    }
    if (rawQ.includes('driving') || rawQ.includes('licence') || rawQ.includes('license') || rawQ.includes('rc') || rawQ.includes('parivahan')) {
      expansions.add('parivahan');
      expansions.add('sarathi');
      expansions.add('driving licence');
    }

    const expansionArr = Array.from(expansions);

    // Score and rank results
    const scoredServices = combined.map(s => {
      let score = 0;
      const name = (s.name || '').toLowerCase();
      const simpleDesc = (s.simple_description || '').toLowerCase();
      const desc = (s.description || '').toLowerCase();
      const keywords = (s.keywords || []).map(k => k.toLowerCase());
      const department = (s.department || '').toLowerCase();

      // Exact raw query match (highest weight)
      if (name.includes(rawQ)) score += 50;
      if (keywords.some(k => k.includes(rawQ))) score += 40;
      if (simpleDesc.includes(rawQ)) score += 30;
      if (desc.includes(rawQ)) score += 20;

      // Token and expansion matches
      for (const term of expansionArr) {
        if (!term) continue;
        if (name.includes(term)) score += 15;
        if (keywords.some(k => k.includes(term))) score += 12;
        if (simpleDesc.includes(term)) score += 8;
        if (department.includes(term)) score += 6;
        if (desc.includes(term)) score += 4;
      }

      return { service: s, score };
    });

    combined = scoredServices
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.service);
  }

  return combined;
}

// Fetch single service by slug or ID
export async function fetchServiceBySlug(slug) {
  let service = null;
  const supabase = getSupabase();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('government_services')
        .select(`
          *,
          steps:service_steps(*),
          documents:service_documents(*),
          requirements:service_requirements(*)
        `)
        .eq('slug', slug)
        .single();

      if (!error && data) {
        service = data;
      }
    } catch (e) {
      console.warn('[Supabase] Fetch service by slug fallback:', e.message);
    }
  }

  // Find rich catalog fallback to merge steps, documents, tips, and ensure valid links
  const fallback = VERIFIED_SERVICES.find(s => s.slug === slug || s.id === slug) || null;

  if (service) {
    if (fallback) {
      // Fix broken or outdated URLs if stored in DB
      if (service.official_website && (
        service.official_website.includes('swachhbharaturban.gov.in') ||
        service.official_website.includes('onlineservices.nsdl.com') ||
        service.official_website.includes('/iec/fposervices')
      )) {
        service.official_website = fallback.official_website;
      }

      if (fallback.official_app_url) {
        service.official_app_url = fallback.official_app_url;
      }
      if (fallback.official_source) {
        service.official_source = fallback.official_source;
      }

      // Populate missing steps, documents, requirements, tips and enrich step action URLs
      if (!service.steps || service.steps.length === 0) {
        service.steps = fallback.steps || [];
      } else if (fallback.steps && fallback.steps.length > 0) {
        service.steps = service.steps.map((st, idx) => {
          const fallbackStep = fallback.steps[idx];
          const bestActionUrl = (!st.action_url || st.action_url.includes('swachhbharaturban.gov.in') || st.action_url.includes('onlineservices.nsdl.com') || st.action_url.includes('/iec/fposervices'))
            ? (fallbackStep?.action_url || st.action_url)
            : st.action_url;
          return {
            ...st,
            action_url: bestActionUrl
          };
        });
      }
      if (!service.documents || service.documents.length === 0) {
        service.documents = fallback.documents || [];
      }
      if (!service.requirements || service.requirements.length === 0) {
        service.requirements = fallback.requirements || [];
      }
      if (!service.tips && fallback.tips) {
        service.tips = fallback.tips;
      }
      if (!service.simple_description && fallback.simple_description) {
        service.simple_description = fallback.simple_description;
      }
      if (!service.official_helpline && fallback.official_helpline) {
        service.official_helpline = fallback.official_helpline;
      }
      if (!service.sub_services && fallback.sub_services) {
        service.sub_services = fallback.sub_services;
      }
    }
    return service;
  }

  return fallback;
}

// Fetch government schemes
export async function fetchSchemes() {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('government_schemes').select('*');
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('[Supabase] Fetch schemes fallback:', e.message);
    }
  }
  return VERIFIED_SCHEMES;
}

// Fetch government apps
export async function fetchApps() {
  const supabase = getSupabase();
  let dbApps = [];
  if (supabase) {
    try {
      const { data, error } = await supabase.from('government_apps').select('*');
      if (!error && data && data.length > 0) {
        dbApps = data;
      }
    } catch (e) {
      console.warn('[Supabase] Fetch apps fallback:', e.message);
    }
  }

  // Merge with verified apps catalog to guarantee verified Play Store URLs & portals
  return VERIFIED_APPS.map(va => {
    const dbApp = dbApps.find(a => a.name.toLowerCase() === va.name.toLowerCase());
    return {
      ...va,
      ...(dbApp || {}),
      // Always enforce verified working download links
      official_source: va.official_source,
      play_store_url: va.play_store_url || va.official_source,
      website: va.website || dbApp?.website || va.official_source
    };
  });
}

export async function fetchDigitalDocuments() {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase.from('digital_document_services').select('*');
      if (!error && data && data.length > 0 && data.some(d => d.document || d.fee)) {
        return data;
      }
    } catch (e) {
      console.warn('[Supabase] Fetch digital documents fallback:', e.message);
    }
  }
  return VERIFIED_DIGITAL_DOCUMENTS;
}

// Saved Services Management (In-memory mock store fallback for guest / testing)
const inMemorySavedServices = new Map();

export async function fetchSavedServices(userId) {
  const supabase = getSupabase();
  if (supabase && userId) {
    try {
      const { data, error } = await supabase
        .from('saved_services')
        .select('*, service:government_services(*)')
        .eq('user_id', userId);

      if (!error && data) return data;
    } catch (e) {
      console.warn('[Supabase] Saved services fetch fallback:', e.message);
    }
  }

  const userSaved = inMemorySavedServices.get(userId || 'guest') || [];
  return userSaved.map(slug => {
    const s = VERIFIED_SERVICES.find(srv => srv.slug === slug || srv.id === slug);
    return { id: `saved-${slug}`, service_id: slug, service: s, created_at: new Date().toISOString() };
  });
}

export async function addSavedService(userId, serviceId) {
  const supabase = getSupabase();
  if (supabase && userId) {
    try {
      const { data, error } = await supabase
        .from('saved_services')
        .insert({ user_id: userId, service_id: serviceId })
        .select();

      if (!error) return { success: true, data };
    } catch (e) {
      console.warn('[Supabase] Add saved service fallback:', e.message);
    }
  }

  const list = inMemorySavedServices.get(userId || 'guest') || [];
  if (!list.includes(serviceId)) {
    list.push(serviceId);
    inMemorySavedServices.set(userId || 'guest', list);
  }
  return { success: true, message: 'Saved successfully' };
}

export async function removeSavedService(userId, serviceId) {
  const supabase = getSupabase();
  if (supabase && userId) {
    try {
      const { error } = await supabase
        .from('saved_services')
        .delete()
        .eq('user_id', userId)
        .eq('service_id', serviceId);

      if (!error) return { success: true };
    } catch (e) {
      console.warn('[Supabase] Delete saved service fallback:', e.message);
    }
  }

  const list = inMemorySavedServices.get(userId || 'guest') || [];
  const updated = list.filter(id => id !== serviceId);
  inMemorySavedServices.set(userId || 'guest', updated);
  return { success: true, message: 'Removed from saved' };
}

// Popular suggested search queries for fallback and quick guidance
export const POPULAR_SEARCH_SUGGESTIONS = [
  'Aadhaar Mobile Number Update',
  'Download e-Aadhaar PDF',
  'Apply New PAN Card',
  'PAN Card Correction',
  'Driving Licence Renewal',
  'Ration Card ONORC Portability',
  'Birth Certificate Online',
  'Recover Lost Documents',
  '10th Class Marksheet DigiLocker',
  '12th Class Marksheet DigiLocker',
  'Graduation Degree & Transcripts',
  'Swachhata Civic Complaint'
];

// Top verified popular services for quick access
export function getPopularServices() {
  const popularSlugs = [
    'uidai-myaadhaar-services',
    'pan-card-nsdl-utiitsl',
    'parivahan-sarathi-driving-licence',
    'ration-card-onorc-nfsa',
    'birth-certificate-registration-crs',
    'lost-documents-recovery-duplicate'
  ];
  return popularSlugs
    .map(slug => VERIFIED_SERVICES.find(s => s.slug === slug))
    .filter(Boolean);
}

// =========================================================================
// UNIVERSAL GOVERNMENT SERVICE SEARCH ENGINE
// Dedicated informational search decoupled from conversational AI chatbot
// =========================================================================
export async function searchGovernmentServices(query, state = 'All India') {
  if (!query || typeof query !== 'string' || query.trim() === '') {
    return {
      success: true,
      query: '',
      normalized_query: '',
      top_service: null,
      matched_sub_service: null,
      matched_services: [],
      total_matches: 0,
      suggested_queries: POPULAR_SEARCH_SUGGESTIONS,
      popular_services: getPopularServices()
    };
  }

  const rawQ = query.trim();
  const lowerQ = rawQ.toLowerCase();
  // Strip punctuation and normalize whitespace
  const cleanQ = lowerQ.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  const stopWords = new Set([
    'how', 'can', 'i', 'to', 'in', 'the', 'my', 'a', 'an', 'of', 'and', 'is',
    'for', 'do', 'what', 'where', 'please', 'tell', 'me', 'want', 'need', 'card',
    'online', 'apply', 'get', 'help', 'details', 'info', 'information', 'process'
  ]);
  const tokens = cleanQ.split(' ').filter(w => w.length > 1 && !stopWords.has(w));

  // 1. Fetch available services (DB merged with verified catalog)
  const allServices = await fetchServices({ state });

  // 2. Natural Language Intent & Entity Detection
  let targetSlug = null;
  let targetSubId = null;

  // --- Rule 1: Aadhaar ---
  if (
    cleanQ.includes('aadhaar') ||
    cleanQ.includes('aadhar') ||
    cleanQ.includes('adhar') ||
    cleanQ.includes('uidai') ||
    cleanQ.includes('myaadhaar')
  ) {
    targetSlug = 'uidai-myaadhaar-services';
    if (cleanQ.includes('mobile') || cleanQ.includes('phone') || cleanQ.includes('number')) {
      targetSubId = 'sub-aadhaar-mobile';
    } else if (cleanQ.includes('address') || cleanQ.includes('pincode') || cleanQ.includes('location')) {
      targetSubId = 'sub-aadhaar-address';
    } else if (cleanQ.includes('name') || cleanQ.includes('dob') || cleanQ.includes('birth') || cleanQ.includes('gender')) {
      targetSubId = 'sub-aadhaar-name-dob';
    } else if (cleanQ.includes('download') || cleanQ.includes('pdf') || cleanQ.includes('copy') || cleanQ.includes('print')) {
      targetSubId = 'sub-aadhaar-download';
    } else if (cleanQ.includes('pvc') || cleanQ.includes('plastic') || cleanQ.includes('order')) {
      targetSubId = 'sub-aadhaar-pvc';
    } else if (cleanQ.includes('status') || cleanQ.includes('track') || cleanQ.includes('urn')) {
      targetSubId = 'sub-aadhaar-status';
    }
  }
  // --- Rule 2: Marksheets, Degrees & Academic Certificates ---
  else if (
    cleanQ.includes('10th') ||
    cleanQ.includes('matric') ||
    cleanQ.includes('ssc') ||
    cleanQ.includes('class 10') ||
    cleanQ.includes('tenth')
  ) {
    targetSlug = 'board-marksheets-degree-certificates';
    targetSubId = 'sub-marksheet-10th';
  } else if (
    cleanQ.includes('12th') ||
    cleanQ.includes('inter') ||
    cleanQ.includes('intermediate') ||
    cleanQ.includes('hsc') ||
    cleanQ.includes('class 12') ||
    cleanQ.includes('twelfth')
  ) {
    targetSlug = 'board-marksheets-degree-certificates';
    targetSubId = 'sub-marksheet-12th';
  } else if (
    cleanQ.includes('graduation') ||
    cleanQ.includes('degree') ||
    cleanQ.includes('college') ||
    cleanQ.includes('university') ||
    cleanQ.includes('transcript') ||
    cleanQ.includes('bachelor') ||
    cleanQ.includes('master')
  ) {
    targetSlug = 'board-marksheets-degree-certificates';
    targetSubId = 'sub-marksheet-degree';
  } else if (
    cleanQ.includes('marksheet') ||
    cleanQ.includes('mark sheet') ||
    cleanQ.includes('marksheets')
  ) {
    targetSlug = 'board-marksheets-degree-certificates';
  }
  // --- Rule 3: Lost / Misplaced Documents Recovery ---
  else if (
    cleanQ.includes('lost') ||
    cleanQ.includes('misplaced') ||
    cleanQ.includes('missing') ||
    cleanQ.includes('lost article') ||
    cleanQ.includes('duplicate document') ||
    cleanQ.includes('gum ho gaya') ||
    cleanQ.includes('kho gaya') ||
    cleanQ.includes('ncr') ||
    cleanQ.includes('ldr')
  ) {
    targetSlug = 'lost-documents-recovery-duplicate';
    if (cleanQ.includes('police') || cleanQ.includes('report') || cleanQ.includes('fir')) {
      targetSubId = 'sub-lost-police-report';
    } else if (cleanQ.includes('aadhaar') || cleanQ.includes('aadhar')) {
      targetSubId = 'sub-lost-aadhaar';
    } else if (cleanQ.includes('pan')) {
      targetSubId = 'sub-lost-pan';
    } else if (cleanQ.includes('dl') || cleanQ.includes('licence') || cleanQ.includes('license')) {
      targetSubId = 'sub-lost-dl';
    } else if (cleanQ.includes('marksheet')) {
      targetSubId = 'sub-lost-marksheet';
    }
  }
  // --- Rule 4: PAN Card ---
  else if (
    cleanQ.includes('pan') ||
    cleanQ.includes('epan') ||
    cleanQ.includes('utiitsl') ||
    cleanQ.includes('nsdl')
  ) {
    if (
      cleanQ.includes('instant') ||
      cleanQ.includes('tatkal') ||
      cleanQ.includes('free pan') ||
      cleanQ.includes('10 min') ||
      cleanQ.includes('paperless pan')
    ) {
      targetSlug = 'instant-epan-income-tax';
      targetSubId = cleanQ.includes('download') || cleanQ.includes('status') ? 'sub-epan-download' : 'sub-epan-new';
    } else if (
      cleanQ.includes('correct') ||
      cleanQ.includes('correction') ||
      cleanQ.includes('change') ||
      cleanQ.includes('update') ||
      cleanQ.includes('modify') ||
      cleanQ.includes('edit')
    ) {
      targetSlug = 'pan-card-nsdl-utiitsl';
      targetSubId = 'sub-pan-correction';
    } else if (
      cleanQ.includes('reprint') ||
      cleanQ.includes('duplicate') ||
      cleanQ.includes('lost')
    ) {
      targetSlug = 'pan-card-nsdl-utiitsl';
      targetSubId = 'sub-pan-reprint';
    } else if (cleanQ.includes('status') || cleanQ.includes('track') || cleanQ.includes('acknowledgement')) {
      targetSlug = 'pan-card-nsdl-utiitsl';
      targetSubId = 'sub-pan-status';
    } else {
      targetSlug = 'pan-card-nsdl-utiitsl';
    }
  }
  // --- Rule 5: Ration Card ---
  else if (
    cleanQ.includes('ration') ||
    cleanQ.includes('rashan') ||
    cleanQ.includes('onorc') ||
    cleanQ.includes('nfsa') ||
    cleanQ.includes('pds') ||
    cleanQ.includes('ration card')
  ) {
    targetSlug = 'ration-card-onorc-nfsa';
    if (cleanQ.includes('member') || cleanQ.includes('family') || cleanQ.includes('add name') || cleanQ.includes('delete')) {
      targetSubId = 'sub-ration-add-member';
    } else if (cleanQ.includes('portability') || cleanQ.includes('other state') || cleanQ.includes('migrant')) {
      targetSubId = 'sub-ration-portability';
    } else if (cleanQ.includes('status') || cleanQ.includes('download') || cleanQ.includes('slip') || cleanQ.includes('track')) {
      targetSubId = 'sub-ration-status';
    } else if (cleanQ.includes('apply') || cleanQ.includes('new') || cleanQ.includes('fresh')) {
      targetSubId = 'sub-ration-new';
    }
  }
  // --- Rule 6: Birth Certificate ---
  else if (
    cleanQ.includes('birth') ||
    cleanQ.includes('janam') ||
    cleanQ.includes('janm') ||
    cleanQ.includes('crs')
  ) {
    targetSlug = 'birth-certificate-registration-crs';
    if (cleanQ.includes('delay') || cleanQ.includes('late') || cleanQ.includes('1 year') || cleanQ.includes('21 day')) {
      targetSubId = 'sub-birth-delayed';
    } else if (cleanQ.includes('download') || cleanQ.includes('qr') || cleanQ.includes('pdf')) {
      targetSubId = 'sub-birth-download';
    } else if (cleanQ.includes('name add') || cleanQ.includes('child name') || cleanQ.includes('name')) {
      targetSubId = 'sub-birth-name';
    } else if (cleanQ.includes('apply') || cleanQ.includes('register') || cleanQ.includes('new')) {
      targetSubId = 'sub-birth-new';
    }
  }
  // --- Rule 7: Driving Licence ---
  else if (
    cleanQ.includes('driving') ||
    cleanQ.includes('licence') ||
    cleanQ.includes('license') ||
    cleanQ.includes('parivahan') ||
    cleanQ.includes('sarathi') ||
    cleanQ.includes('learner') ||
    cleanQ.includes('dl')
  ) {
    targetSlug = 'parivahan-sarathi-driving-licence';
    if (cleanQ.includes('learner') || cleanQ.includes('learning') || cleanQ.includes('ll')) {
      targetSubId = 'sub-dl-learner';
    } else if (cleanQ.includes('renew') || cleanQ.includes('renewal') || cleanQ.includes('expired')) {
      targetSubId = 'sub-dl-renewal';
    } else if (cleanQ.includes('duplicate') || cleanQ.includes('lost') || cleanQ.includes('damaged')) {
      targetSubId = 'sub-dl-duplicate';
    } else if (cleanQ.includes('address') || cleanQ.includes('change')) {
      targetSubId = 'sub-dl-address';
    } else if (cleanQ.includes('permanent') || cleanQ.includes('new') || cleanQ.includes('test')) {
      targetSubId = 'sub-dl-permanent';
    }
  }
  // --- Rule 8: Passport ---
  else if (cleanQ.includes('passport') || cleanQ.includes('tatkaal') || cleanQ.includes('tatkal')) {
    targetSlug = 'passport-seva-online';
  }
  // --- Rule 9: Swachhata Civic Complaint ---
  else if (
    cleanQ.includes('pothole') ||
    cleanQ.includes('swachh') ||
    cleanQ.includes('garbage') ||
    cleanQ.includes('sanitation') ||
    cleanQ.includes('swatch') ||
    cleanQ.includes('broken road')
  ) {
    targetSlug = 'swachhata-civic-complaint-app';
  }
  // --- Rule 10: Cybercrime ---
  else if (cleanQ.includes('cyber') || cleanQ.includes('1930') || cleanQ.includes('scam') || cleanQ.includes('fraud') || cleanQ.includes('hacked')) {
    targetSlug = 'national-cyber-crime-reporting-portal';
  }

  // 3. Multi-field semantic scoring
  const scored = allServices.map(service => {
    let score = 0;
    const name = (service.name || '').toLowerCase();
    const desc = (service.description || '').toLowerCase();
    const simpleDesc = (service.simple_description || '').toLowerCase();
    const keywords = (service.keywords || []).map(k => k.toLowerCase());
    const department = (service.department || '').toLowerCase();
    const subServices = service.sub_services || [];

    // Deterministic Rule Boost
    if (targetSlug && service.slug === targetSlug) {
      score += 250;
    }

    // Exact query matches
    if (name.includes(cleanQ)) score += 60;
    if (keywords.some(k => k.includes(cleanQ) || cleanQ.includes(k))) score += 40;
    if (simpleDesc.includes(cleanQ)) score += 30;
    if (desc.includes(cleanQ)) score += 20;

    // Token-based matches
    for (const t of tokens) {
      if (name.includes(t)) score += 15;
      if (keywords.some(k => k.includes(t))) score += 12;
      if (simpleDesc.includes(t)) score += 8;
      if (department.includes(t)) score += 6;
      if (desc.includes(t)) score += 4;

      // Check sub_services matches
      for (const sub of subServices) {
        const subTitle = (sub.title || '').toLowerCase();
        const subDesc = (sub.description || '').toLowerCase();
        if (subTitle.includes(t)) score += 10;
        if (subDesc.includes(t)) score += 5;
      }
    }

    return { service, score };
  });

  const matchingServices = scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.service);

  const topService = matchingServices[0] || null;

  // 4. Pinpoint matched sub-service if applicable
  let matchedSubService = null;
  if (topService && topService.sub_services && topService.sub_services.length > 0) {
    if (targetSubId) {
      matchedSubService = topService.sub_services.find(sub => sub.id === targetSubId) || null;
    }

    // Only infer sub-service if query contained explicit action or sub-intent words
    const actionWords = [
      'update', 'change', 'correct', 'correction', 'download', 'pdf', 'reprint',
      'duplicate', 'lost', 'renew', 'renewal', 'address', 'mobile', 'phone', 'dob',
      'name', 'status', 'track', 'member', 'portability', 'delayed', 'late',
      '10th', '12th', 'graduation', 'degree', 'pvc', 'learner', 'permanent'
    ];
    const hasActionIntent = tokens.some(t => actionWords.includes(t));

    if (!matchedSubService && hasActionIntent) {
      let bestSub = null;
      let bestSubScore = 0;
      for (const sub of topService.sub_services) {
        let subScore = 0;
        const subTitle = (sub.title || '').toLowerCase();
        const subDesc = (sub.description || '').toLowerCase();
        for (const t of tokens) {
          if (actionWords.includes(t)) {
            if (subTitle.includes(t)) subScore += 25;
            if (subDesc.includes(t)) subScore += 10;
          }
        }
        if (subScore > bestSubScore) {
          bestSubScore = subScore;
          bestSub = sub;
        }
      }
      if (bestSubScore >= 20) {
        matchedSubService = bestSub;
      }
    }
  }

  // Generate dynamic suggested queries based on current query tokens
  const relevantSuggestions = POPULAR_SEARCH_SUGGESTIONS.filter(
    sug => !sug.toLowerCase().includes(cleanQ)
  ).slice(0, 6);

  return {
    success: true,
    query: rawQ,
    normalized_query: cleanQ,
    top_service: topService,
    matched_sub_service: matchedSubService,
    matched_services: matchingServices,
    total_matches: matchingServices.length,
    suggested_queries: relevantSuggestions.length > 0 ? relevantSuggestions : POPULAR_SEARCH_SUGGESTIONS.slice(0, 6),
    popular_services: getPopularServices()
  };
}
