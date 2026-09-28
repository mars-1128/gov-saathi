// GOV SAATHI - API CLIENT HELPER
import {
  Category,
  GovernmentService,
  GovernmentScheme,
  GovernmentApp,
  DigitalDocument,
  AISaathiResponse
} from '../types';

const API_BASE = '/api';

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/categories`);
  const data = await res.json();
  return data.data || [];
}

export async function getServices(params?: { category?: string; jurisdiction?: string; state?: string; search?: string }): Promise<GovernmentService[]> {
  const query = new URLSearchParams();
  if (params?.category) query.append('category', params.category);
  if (params?.jurisdiction) query.append('jurisdiction', params.jurisdiction);
  if (params?.state && params.state !== 'All India') query.append('state', params.state);
  if (params?.search) query.append('search', params.search);

  const res = await fetch(`${API_BASE}/services?${query.toString()}`);
  const data = await res.json();
  return data.data || [];
}

export async function getServiceDetail(slug: string): Promise<GovernmentService | null> {
  const res = await fetch(`${API_BASE}/services/${slug}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.data || null;
}

export async function searchServices(query: string, state?: string): Promise<GovernmentService[]> {
  const res = await fetch(`${API_BASE}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, state: state || 'All India' }),
  });
  const data = await res.json();
  return data.data || [];
}

export async function sendAIChatMessage(params: {
  message: string;
  history?: { role: string; content: string }[];
  state?: string;
  district?: string;
  language?: string;
}): Promise<{ success: boolean; data: AISaathiResponse; raw_text?: string; error?: string }> {
  const res = await fetch(`${API_BASE}/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  return res.json();
}

export async function getSchemes(): Promise<GovernmentScheme[]> {
  const res = await fetch(`${API_BASE}/schemes`);
  const data = await res.json();
  return data.data || [];
}

export async function getApps(): Promise<GovernmentApp[]> {
  const res = await fetch(`${API_BASE}/apps`);
  const data = await res.json();
  return data.data || [];
}

export async function getDigitalDocuments(): Promise<DigitalDocument[]> {
  const res = await fetch(`${API_BASE}/documents`);
  const data = await res.json();
  return data.data || [];
}

export async function getSavedServices(userId?: string): Promise<any[]> {
  const res = await fetch(`${API_BASE}/saved-services`, {
    headers: userId ? { 'x-user-id': userId } : {},
  });
  const data = await res.json();
  return data.data || [];
}

export async function saveService(serviceId: string, userId?: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/saved-services`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(userId ? { 'x-user-id': userId } : {}),
    },
    body: JSON.stringify({ serviceId }),
  });
  return res.ok;
}

export async function removeSavedService(serviceId: string, userId?: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/saved-services/${serviceId}`, {
    method: 'DELETE',
    headers: userId ? { 'x-user-id': userId } : {},
  });
  return res.ok;
}
