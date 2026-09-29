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

// Fetch services with optional category, jurisdiction, state filter
export async function fetchServices({ category, jurisdiction, state, search } = {}) {
  const supabase = getSupabase();
  let dbServices = [];

  if (supabase) {
    try {
      let query = supabase.from('government_services').select('*').eq('status', 'ACTIVE');
      if (category) query = query.eq('category_id', category);
      if (jurisdiction) query = query.eq('jurisdiction_level', jurisdiction);
      if (state && state !== 'All India') query = query.or(`state.eq.All India,state.eq.${state}`);
      if (search) query = query.ilike('name', `%${search}%`);

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
  const matchesCategory = (s, catId) => {
    if (!catId) return true;
    if (s.category_id === catId) return true;
    // Map cat-5 to Supabase Identity Services UUID
    if ((catId === 'cat-5' || catId === 'c5f57728-44a2-4227-88a9-fb62d3d4b9b9') && (s.category_id === 'cat-5' || s.category_id === 'c5f57728-44a2-4227-88a9-fb62d3d4b9b9' || s.category_name === 'Identity Services')) return true;
    if (s.category_name && s.category_name.toLowerCase().includes(catId.toLowerCase())) return true;
    return false;
  };

  for (const s of VERIFIED_SERVICES) {
    const existingIndex = combined.findIndex(item => item.slug === s.slug);
    if (existingIndex >= 0) {
      // Merge rich metadata into existing service if missing
      combined[existingIndex] = {
        ...s,
        ...combined[existingIndex],
        official_website: combined[existingIndex].official_website?.includes('swachhbharaturban.gov.in') ? s.official_website : (combined[existingIndex].official_website || s.official_website),
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
            if (!search || s.name.toLowerCase().includes(search.toLowerCase()) || (s.keywords && s.keywords.some(k => k.toLowerCase().includes(search.toLowerCase())))) {
              combined.push(s);
            }
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
    const q = search.toLowerCase();
    combined = combined.filter(s =>
      s.name.toLowerCase().includes(q) ||
      (s.simple_description && s.simple_description.toLowerCase().includes(q)) ||
      (s.keywords && s.keywords.some(k => k.toLowerCase().includes(q)))
    );
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
      // Fix broken Swachhata URL if stored in DB
      if (service.official_website && service.official_website.includes('swachhbharaturban.gov.in')) {
        service.official_website = fallback.official_website;
        service.official_source = fallback.official_source;
      }
      // Populate missing steps, documents, requirements, tips
      if (!service.steps || service.steps.length === 0) {
        service.steps = fallback.steps || [];
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
  if (supabase) {
    try {
      const { data, error } = await supabase.from('government_apps').select('*');
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('[Supabase] Fetch apps fallback:', e.message);
    }
  }
  return VERIFIED_APPS;
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
