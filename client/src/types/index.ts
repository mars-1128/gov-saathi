export type JurisdictionLevel = 'CENTRAL' | 'STATE' | 'DISTRICT' | 'MUNICIPAL' | 'PANCHAYAT';
export type VerificationStatus = 'VERIFIED' | 'NEEDS_REVIEW' | 'OUTDATED' | 'DISABLED';
export type ApplicationMode = 'ONLINE' | 'OFFLINE' | 'HYBRID' | 'MOBILE_APP';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  display_order: number;
}

export interface ServiceStep {
  step_number: number;
  title: string;
  description: string;
  action_url?: string | null;
  estimated_time?: string;
}

export interface ServiceDocument {
  document_name: string;
  is_mandatory: boolean;
  description?: string;
}

export interface GovernmentService {
  id: string;
  name: string;
  slug: string;
  category_id: string;
  category_name?: string;
  department: string;
  jurisdiction_level: JurisdictionLevel;
  state: string;
  district?: string;
  simple_description: string;
  description: string;
  eligibility: string;
  fee: string;
  processing_information: string;
  application_mode: ApplicationMode;
  official_website: string;
  official_app?: string;
  official_helpline?: string;
  official_email?: string;
  official_source: string;
  source_type: string;
  verification_status: VerificationStatus;
  last_verified_at: string;
  keywords?: string[];
  steps?: ServiceStep[];
  documents?: ServiceDocument[];
  requirements?: string[];
}

export interface GovernmentScheme {
  id: string;
  name: string;
  slug: string;
  purpose: string;
  target_group: string;
  eligibility: string;
  benefits: string;
  documents: string;
  application_process: string;
  official_source: string;
  verification_status: VerificationStatus;
}

export interface GovernmentApp {
  name: string;
  purpose: string;
  department: string;
  platform: string;
  official_source: string;
  website: string;
  description: string;
}

export interface DigitalDocument {
  document: string;
  issuer: string;
  format: string;
  portal: string;
}

export interface AISaathiServiceRecommendation {
  name: string;
  reason: string;
  who_is_it_for?: string;
  official_website: string;
  official_app?: string;
  official_helpline?: string;
  fee?: string;
  last_verified?: string;
}

export interface AISaathiResponse {
  answer: string;
  intent: string;
  category: string;
  jurisdiction: JurisdictionLevel;
  service: AISaathiServiceRecommendation | null;
  documents: string[];
  steps: { step_number: number; title: string; description: string }[];
  important_notes: string[];
  needs_clarification?: boolean;
  clarifying_question?: string | null;
  confidence?: 'high' | 'medium' | 'low';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  structured_data?: AISaathiResponse;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  preferred_state?: string;
  preferred_language?: string;
  is_admin?: boolean;
}
