-- ====================================================================
-- GOV SAATHI - OFFICIAL DATABASE SCHEMA & SEED DATA
-- Version: 1.0.0
-- Compatible with Supabase PostgreSQL (Postgres 15+)
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS & DOMAINS
DO $$ BEGIN
    CREATE TYPE jurisdiction_level_type AS ENUM ('CENTRAL', 'STATE', 'DISTRICT', 'MUNICIPAL', 'PANCHAYAT');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE verification_status_type AS ENUM ('VERIFIED', 'NEEDS_REVIEW', 'OUTDATED', 'DISABLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE application_mode_type AS ENUM ('ONLINE', 'OFFLINE', 'HYBRID', 'MOBILE_APP');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE (Linked with Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    full_name TEXT,
    phone TEXT,
    state TEXT DEFAULT 'All India',
    district TEXT,
    preferred_language TEXT DEFAULT 'en',
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. ADMIN USERS TABLE
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id)
);

-- 5. LANGUAGES TABLE
CREATE TABLE IF NOT EXISTS public.languages (
    code TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    native_name TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true
);

-- 6. SYSTEM SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.system_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 7. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. SUBCATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.subcategories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(category_id, slug)
);

-- 9. GOVERNMENT DEPARTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.government_departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    code TEXT UNIQUE,
    ministry TEXT,
    jurisdiction_level jurisdiction_level_type DEFAULT 'CENTRAL',
    state TEXT,
    official_website TEXT,
    helpline TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. GOVERNMENT SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.government_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    simple_description TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    department TEXT,
    jurisdiction_level jurisdiction_level_type DEFAULT 'CENTRAL',
    state TEXT DEFAULT 'All India',
    district TEXT,
    eligibility TEXT,
    fee TEXT DEFAULT 'Free / Nominal',
    processing_information TEXT,
    application_mode application_mode_type DEFAULT 'ONLINE',
    official_website TEXT NOT NULL,
    official_app TEXT,
    official_helpline TEXT,
    official_email TEXT,
    official_source TEXT,
    source_type TEXT DEFAULT 'GOVERNMENT_PORTAL',
    last_verified_at TIMESTAMPTZ DEFAULT now(),
    verification_status verification_status_type DEFAULT 'VERIFIED',
    status TEXT DEFAULT 'ACTIVE',
    keywords TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 11. SERVICE STEPS TABLE
CREATE TABLE IF NOT EXISTS public.service_steps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES public.government_services(id) ON DELETE CASCADE,
    step_number INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    action_url TEXT,
    estimated_time TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 12. SERVICE DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS public.service_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES public.government_services(id) ON DELETE CASCADE,
    document_name TEXT NOT NULL,
    is_mandatory BOOLEAN DEFAULT true,
    description TEXT,
    digital_source TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 13. SERVICE REQUIREMENTS TABLE
CREATE TABLE IF NOT EXISTS public.service_requirements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES public.government_services(id) ON DELETE CASCADE,
    requirement TEXT NOT NULL,
    is_strict BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 14. GOVERNMENT SCHEMES TABLE
CREATE TABLE IF NOT EXISTS public.government_schemes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    purpose TEXT NOT NULL,
    target_group TEXT,
    eligibility TEXT,
    benefits TEXT,
    documents TEXT,
    application_process TEXT,
    official_source TEXT NOT NULL,
    verification_status verification_status_type DEFAULT 'VERIFIED',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 15. GOVERNMENT APPS TABLE
CREATE TABLE IF NOT EXISTS public.government_apps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    purpose TEXT NOT NULL,
    department TEXT,
    platform TEXT DEFAULT 'Android & iOS',
    official_source TEXT NOT NULL,
    website TEXT,
    description TEXT,
    verification_status verification_status_type DEFAULT 'VERIFIED',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 16. DIGITAL DOCUMENT SERVICES (DigiLocker, etc.)
CREATE TABLE IF NOT EXISTS public.digital_document_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    provider TEXT NOT NULL,
    supported_documents TEXT[] DEFAULT '{}',
    how_to_fetch TEXT,
    official_portal TEXT NOT NULL,
    verification_status verification_status_type DEFAULT 'VERIFIED',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 17. OFFICIAL SOURCES TABLE
CREATE TABLE IF NOT EXISTS public.official_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE,
    domain_type TEXT DEFAULT 'gov.in / nic.in',
    last_crawled_at TIMESTAMPTZ DEFAULT now(),
    is_trusted BOOLEAN DEFAULT true
);

-- 18. SERVICE UPDATES & ALERTS TABLE
CREATE TABLE IF NOT EXISTS public.service_updates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES public.government_services(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    update_text TEXT NOT NULL,
    effective_date DATE,
    source_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 19. STATE SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.state_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    state_name TEXT NOT NULL,
    service_name TEXT NOT NULL,
    portal_url TEXT NOT NULL,
    helpline TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 20. LOCAL SERVICES (Municipal / Panchayat)
CREATE TABLE IF NOT EXISTS public.local_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    state_name TEXT NOT NULL,
    district_name TEXT NOT NULL,
    municipality_name TEXT,
    service_type TEXT NOT NULL,
    portal_url TEXT,
    complaint_app TEXT,
    helpline TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 21. FAQ ENTRIES TABLE
CREATE TABLE IF NOT EXISTS public.faq_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES public.government_services(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 22. SERVICE TRANSLATIONS TABLE
CREATE TABLE IF NOT EXISTS public.service_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES public.government_services(id) ON DELETE CASCADE,
    language_code TEXT REFERENCES public.languages(code) ON DELETE CASCADE,
    name TEXT NOT NULL,
    simple_description TEXT,
    eligibility TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(service_id, language_code)
);

-- 23. USER SAVED SERVICES
CREATE TABLE IF NOT EXISTS public.saved_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    service_id UUID REFERENCES public.government_services(id) ON DELETE CASCADE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, service_id)
);

-- 24. RECENTLY VIEWED SERVICES
CREATE TABLE IF NOT EXISTS public.recently_viewed_services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    service_id UUID REFERENCES public.government_services(id) ON DELETE CASCADE,
    viewed_at TIMESTAMPTZ DEFAULT now()
);

-- 25. SEARCH LOGS (Anonymous citizen intent analysis)
CREATE TABLE IF NOT EXISTS public.search_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query TEXT NOT NULL,
    state TEXT,
    matched_service_id UUID REFERENCES public.government_services(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 26. CHAT SESSIONS & MESSAGES (AI Saathi)
CREATE TABLE IF NOT EXISTS public.chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT DEFAULT 'Guidance Session',
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    structured_data JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 27. VERIFICATION RECORDS (Audit trail for data integrity)
CREATE TABLE IF NOT EXISTS public.verification_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID REFERENCES public.government_services(id) ON DELETE CASCADE,
    verifier_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    verified_url TEXT NOT NULL,
    notes TEXT,
    previous_status verification_status_type,
    new_status verification_status_type,
    verified_at TIMESTAMPTZ DEFAULT now()
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

-- Enable RLS across all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.government_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.government_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.government_schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.government_apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_document_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.official_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.state_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.local_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recently_viewed_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- 1. Profiles: users can read & update their own profile; admins can read all
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- 2. Public Read Policies for Government Services, Categories, Schemes, Apps, Documents
CREATE POLICY "Allow public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Allow public read subcategories" ON public.subcategories FOR SELECT USING (true);
CREATE POLICY "Allow public read government_services" ON public.government_services FOR SELECT USING (status = 'ACTIVE');
CREATE POLICY "Allow public read service_steps" ON public.service_steps FOR SELECT USING (true);
CREATE POLICY "Allow public read service_documents" ON public.service_documents FOR SELECT USING (true);
CREATE POLICY "Allow public read service_requirements" ON public.service_requirements FOR SELECT USING (true);
CREATE POLICY "Allow public read departments" ON public.government_departments FOR SELECT USING (true);
CREATE POLICY "Allow public read schemes" ON public.government_schemes FOR SELECT USING (true);
CREATE POLICY "Allow public read apps" ON public.government_apps FOR SELECT USING (true);
CREATE POLICY "Allow public read digital documents" ON public.digital_document_services FOR SELECT USING (true);
CREATE POLICY "Allow public read official sources" ON public.official_sources FOR SELECT USING (true);
CREATE POLICY "Allow public read service updates" ON public.service_updates FOR SELECT USING (true);
CREATE POLICY "Allow public read state services" ON public.state_services FOR SELECT USING (true);
CREATE POLICY "Allow public read local services" ON public.local_services FOR SELECT USING (true);
CREATE POLICY "Allow public read faqs" ON public.faq_entries FOR SELECT USING (true);
CREATE POLICY "Allow public read translations" ON public.service_translations FOR SELECT USING (true);
CREATE POLICY "Allow public read languages" ON public.languages FOR SELECT USING (true);
CREATE POLICY "Allow public read system settings" ON public.system_settings FOR SELECT USING (true);

-- 3. Saved Services: Users can manage only their own
DROP POLICY IF EXISTS "Users can manage own saved services" ON public.saved_services;
CREATE POLICY "Users can manage own saved services" ON public.saved_services
    FOR ALL USING (auth.uid() = user_id);

-- 4. Recently Viewed: Users can manage only their own
DROP POLICY IF EXISTS "Users can manage own viewed services" ON public.recently_viewed_services;
CREATE POLICY "Users can manage own viewed services" ON public.recently_viewed_services
    FOR ALL USING (auth.uid() = user_id);

-- 5. Chat Sessions & Messages: Users can manage only their own
DROP POLICY IF EXISTS "Users can manage own chat sessions" ON public.chat_sessions;
CREATE POLICY "Users can manage own chat sessions" ON public.chat_sessions
    FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can manage own chat messages" ON public.chat_messages;
CREATE POLICY "Users can manage own chat messages" ON public.chat_messages
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.chat_sessions
            WHERE chat_sessions.id = chat_messages.session_id
            AND chat_sessions.user_id = auth.uid()
        )
    );

-- 6. Admin modification policies (Admins have full access via admin_users check or service_role)
CREATE POLICY "Admins can manage services" ON public.government_services
    FOR ALL USING (
        auth.uid() IN (SELECT user_id FROM public.admin_users)
        OR auth.jwt() ->> 'role' = 'service_role'
    );

CREATE POLICY "Admins can manage categories" ON public.categories
    FOR ALL USING (
        auth.uid() IN (SELECT user_id FROM public.admin_users)
        OR auth.jwt() ->> 'role' = 'service_role'
    );

CREATE POLICY "Admins can manage verification records" ON public.verification_records
    FOR ALL USING (
        auth.uid() IN (SELECT user_id FROM public.admin_users)
        OR auth.jwt() ->> 'role' = 'service_role'
    );

-- ====================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER
-- ====================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, preferred_language)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'preferred_language', 'en')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ====================================================================
-- SEED INITIAL LANGUAGES
-- ====================================================================
INSERT INTO public.languages (code, name, native_name) VALUES
('en', 'English', 'English'),
('hi', 'Hindi', 'हिन्दी'),
('te', 'Telugu', 'తెలుగు')
ON CONFLICT (code) DO NOTHING;

-- ====================================================================
-- SEED INITIAL CATEGORIES (18 Categories per prompt)
-- ====================================================================
INSERT INTO public.categories (name, slug, description, icon, display_order) VALUES
('Complaints & Grievances', 'complaints-grievances', 'Government portal complaints, municipal issues, civic problems and public grievances', 'AlertCircle', 1),
('Cybercrime', 'cybercrime', 'Online financial scams, digital fraud, social media abuse, identity theft reporting', 'ShieldAlert', 2),
('Consumer Issues', 'consumer-issues', 'Product defects, service delays, unfair trade practices, warranty disputes', 'Scale', 3),
('Documents & Certificates', 'documents-certificates', 'Aadhaar, PAN, birth/death/caste/income certificates, and digital downloads', 'FileText', 4),
('Identity Services', 'identity-services', 'Aadhaar updates, Voter ID registration, PAN cards, and citizen identity verification', 'UserCheck', 5),
('Passport & Travel', 'passport-travel', 'Passport issuance, renewal, Tatkaal services, and police clearance certificates', 'Plane', 6),
('Transport', 'transport', 'Driving licence, learner licence, vehicle registration, road tax, and challans', 'Car', 7),
('Government Schemes', 'government-schemes', 'Central and state welfare schemes for farmers, youth, women, and seniors', 'Gift', 8),
('Government Apps', 'government-apps', 'Official verified mobile applications like UMANG, DigiLocker, and mAdhaar', 'Smartphone', 9),
('Health Services', 'health-services', 'Ayushman Bharat ABHA card, PM-JAY health insurance, and hospital appointments', 'HeartPulse', 10),
('Education', 'education', 'University admissions, academic verification, board marksheets, and student portals', 'GraduationCap', 11),
('Scholarships', 'scholarships', 'National Scholarship Portal, pre-matric, post-matric, and merit-cum-means grants', 'Award', 12),
('Jobs & Employment', 'jobs-employment', 'National Career Service, employment exchanges, and public recruitment notices', 'Briefcase', 13),
('Utility Services', 'utility-services', 'Electricity connections, piped water complaints, cooking gas subsidies (LPG)', 'Zap', 14),
('Property & Revenue', 'property-revenue', 'Land records, property registrations, Bhulekh, Encumbrance Certificates', 'Building2', 15),
('Business & Startup', 'business-startup', 'MSME Udyam registration, GST filing, Startup India, and company incorporation', 'BriefcaseBusiness', 16),
('Elections & Voter Services', 'elections-voter-services', 'Voter card application, electoral roll search, polling booth locator', 'Vote', 17),
('Other Government Services', 'other-services', 'Postal services, RTI online requests, pensions, and miscellaneous public services', 'HelpCircle', 18)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;

-- ====================================================================
-- SEED VERIFIED OFFICIAL GOVERNMENT SERVICES
-- ====================================================================

-- 1. CPGRAMS (Public Grievance)
INSERT INTO public.government_services (
    name, slug, description, simple_description, category_id, department, jurisdiction_level, state,
    eligibility, fee, processing_information, application_mode,
    official_website, official_app, official_helpline, official_email,
    official_source, source_type, last_verified_at, verification_status, keywords
) VALUES (
    'CPGRAMS - Centralized Public Grievance Redress and Monitoring System',
    'cpgrams-public-grievance',
    'CPGRAMS is an online platform available to the citizens 24x7 to lodge their grievances to the public authorities on any subject related to service delivery by Central and State government departments.',
    'Use CPGRAMS when you have an unresolved complaint against any Central or State Government department, delays in government work, or unfair treatment by public officials.',
    (SELECT id FROM public.categories WHERE slug = 'complaints-grievances'),
    'Department of Administrative Reforms and Public Grievances (DARPG)',
    'CENTRAL', 'All India',
    'Any Indian citizen can register a grievance against government authorities.',
    'Free of cost',
    'Standard resolution timeline is up to 30 days. Grievances receive an official tracking ID.',
    'ONLINE',
    'https://pgportal.gov.in/',
    'UMANG App / CPGRAMS Portal',
    '1800-11-4000',
    'cpgrams-darpg@nic.in',
    'https://pgportal.gov.in/',
    'GOVERNMENT_PORTAL',
    now(),
    'VERIFIED',
    ARRAY['complaint', 'grievance', 'delay', 'officer', 'corruption', 'government delay', 'pothole escalation', 'darpg']
) ON CONFLICT (slug) DO NOTHING;

-- 2. National Cyber Crime Reporting Portal & 1930 Helpline
INSERT INTO public.government_services (
    name, slug, description, simple_description, category_id, department, jurisdiction_level, state,
    eligibility, fee, processing_information, application_mode,
    official_website, official_app, official_helpline, official_email,
    official_source, source_type, last_verified_at, verification_status, keywords
) VALUES (
    'National Cyber Crime Reporting Portal & Helpline 1930',
    'national-cyber-crime-reporting-portal',
    'Citizen-centric initiative by Ministry of Home Affairs to enable citizens to report cyber crimes online, with special focus on online financial fraud, cyber extortion, and crimes against women/children.',
    'If you have been scammed online, lost money to UPI/credit card fraud, or face digital harassment, report immediately on this portal or call 1930 within the golden hour to freeze fraudulent transactions.',
    (SELECT id FROM public.categories WHERE slug = 'cybercrime'),
    'Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs',
    'CENTRAL', 'All India',
    'Any victim or witness of financial cyber fraud, online harassment, identity theft, or digital crime in India.',
    'Free of cost',
    'Immediate transaction freeze alert sent to banks if reported quickly; FIR registration facilitated via state police.',
    'ONLINE',
    'https://cybercrime.gov.in/',
    'Official Citizen Portal',
    '1930',
    'complaint-cybercrime@gov.in',
    'https://cybercrime.gov.in/',
    'GOVERNMENT_PORTAL',
    now(),
    'VERIFIED',
    ARRAY['cyber', 'scam', 'fraud', 'bank fraud', 'upi scam', 'online scam', 'phishing', 'hacked', '1930', 'extortion']
) ON CONFLICT (slug) DO NOTHING;

-- 3. National Consumer Helpline (NCH - 1915)
INSERT INTO public.government_services (
    name, slug, description, simple_description, category_id, department, jurisdiction_level, state,
    eligibility, fee, processing_information, application_mode,
    official_website, official_app, official_helpline, official_email,
    official_source, source_type, last_verified_at, verification_status, keywords
) VALUES (
    'National Consumer Helpline (NCH / INGRAM)',
    'national-consumer-helpline-1915',
    'An initiative by Department of Consumer Affairs to guide consumers, handle grievances against private companies, e-commerce, warranty refusal, defective products, and telecom or aviation services.',
    'Use this service when a company refuses a refund, delivers defective goods, bills you incorrectly, or engages in unfair trade practices.',
    (SELECT id FROM public.categories WHERE slug = 'consumer-issues'),
    'Department of Consumer Affairs, Ministry of Consumer Affairs, Food & Public Distribution',
    'CENTRAL', 'All India',
    'Any consumer who has purchased goods or hired services for personal use.',
    'Free of cost',
    'Grievance docket is sent directly to registered companies with typical mediation in 15 to 45 days.',
    'HYBRID',
    'https://consumerhelpline.gov.in/',
    'NCH Mobile App / WhatsApp: 8800001915',
    '1915 / 1800-11-4000',
    'nch-ca@nic.in',
    'https://consumerhelpline.gov.in/',
    'GOVERNMENT_PORTAL',
    now(),
    'VERIFIED',
    ARRAY['consumer', 'refund', 'scammed by seller', 'defective', 'amazon complaint', 'flipkart complaint', 'airline refund', '1915']
) ON CONFLICT (slug) DO NOTHING;

-- 4. DigiLocker - National Digital Locker Service
INSERT INTO public.government_services (
    name, slug, description, simple_description, category_id, department, jurisdiction_level, state,
    eligibility, fee, processing_information, application_mode,
    official_website, official_app, official_helpline, official_email,
    official_source, source_type, last_verified_at, verification_status, keywords
) VALUES (
    'DigiLocker - Official Digital Document Wallet',
    'digilocker-digital-documents',
    'Flagship initiative of Ministry of Electronics & IT under Digital India corporation providing citizens with a secure cloud-based platform for issuance and verification of authentic digital documents legally valid under Rule 9A of IT Rules 2016.',
    'Use DigiLocker to instantly access and download legally valid digital copies of your Driving Licence, Vehicle RC, Aadhaar, Class 10/12 Marksheets, PAN Card, and insurance policies on your phone.',
    (SELECT id FROM public.categories WHERE slug = 'documents-certificates'),
    'Ministry of Electronics and Information Technology (MeitY)',
    'CENTRAL', 'All India',
    'Any individual with an Aadhaar number linked with an active mobile number.',
    'Free of cost',
    'Instant digital document issuance via API integration with government bodies and boards.',
    'ONLINE',
    'https://www.digilocker.gov.in/',
    'DigiLocker App (Android / iOS)',
    '011-24301851',
    'support@digitallocker.gov.in',
    'https://www.digilocker.gov.in/',
    'GOVERNMENT_PORTAL',
    now(),
    'VERIFIED',
    ARRAY['digilocker', 'marksheet', 'download documents', 'driving licence download', 'rc download', 'pan download', 'certificates']
) ON CONFLICT (slug) DO NOTHING;

-- 5. Passport Seva Online Portal
INSERT INTO public.government_services (
    name, slug, description, simple_description, category_id, department, jurisdiction_level, state,
    eligibility, fee, processing_information, application_mode,
    official_website, official_app, official_helpline, official_email,
    official_source, source_type, last_verified_at, verification_status, keywords
) VALUES (
    'Passport Seva Online - Indian Passport Application & Renewal',
    'passport-seva-online',
    'Official portal of the Consular, Passport & Visa (CPV) Division, Ministry of External Affairs for fresh passport application, reissue, Tatkaal services, and Police Clearance Certificates.',
    'Use Passport Seva when you need a new Indian Passport, need to renew an expired passport, change address or name, or request Tatkaal emergency travel documents.',
    (SELECT id FROM public.categories WHERE slug = 'passport-travel'),
    'Ministry of External Affairs (MEA)',
    'CENTRAL', 'All India',
    'Indian citizens residing in India or abroad.',
    'Normal (36 pages): Rs. 1,500 | 60 pages: Rs. 2,000; Tatkaal: Rs. 3,500 (36 pages) / Rs. 4,000 (60 pages); Police Clearance (PCC): Rs. 500',
    'Online appointment booking at Passport Seva Kendra (PSK / POPSK) followed by biometric verification and police verification.',
    'HYBRID',
    'https://www.passportindia.gov.in/',
    'mPassport Seva App',
    '1800-258-1800',
    'support-passport@gov.in',
    'https://www.passportindia.gov.in/',
    'GOVERNMENT_PORTAL',
    now(),
    'VERIFIED',
    ARRAY['passport', 'passport renewal', 'tatkaal', 'psk', 'travel document', 'mea', 'police clearance']
) ON CONFLICT (slug) DO NOTHING;

-- 6. UIDAI / myAadhaar - Aadhaar Services
INSERT INTO public.government_services (
    name, slug, description, simple_description, category_id, department, jurisdiction_level, state,
    eligibility, fee, processing_information, application_mode,
    official_website, official_app, official_helpline, official_email,
    official_source, source_type, last_verified_at, verification_status, keywords
) VALUES (
    'myAadhaar Portal (UIDAI) - Aadhaar Card Download & Updates',
    'uidai-myaadhaar-services',
    'Official portal of Unique Identification Authority of India (UIDAI) for Aadhaar card download (e-Aadhaar), address updates, PVC card order, biometric lock/unlock, and linking status.',
    'Use myAadhaar to download your official e-Aadhaar PDF, update your home address online, order a durable plastic PVC Aadhaar card, or lock your biometrics for fraud prevention.',
    (SELECT id FROM public.categories WHERE slug = 'identity-services'),
    'Unique Identification Authority of India (UIDAI), MeitY',
    'CENTRAL', 'All India',
    'Any resident Indian who has enrolled for Aadhaar.',
    'Demographic Update (Address/Name): Rs. 75; Biometric Update: Rs. 125; PVC Card: Rs. 50; e-Aadhaar Download: Free (Rs. 0)',
    'Instant download with OTP; online address updates verified within 3-15 working days.',
    'ONLINE',
    'https://myaadhaar.uidai.gov.in/',
    'mAadhaar Mobile App',
    '1947',
    'help@uidai.gov.in',
    'https://uidai.gov.in/',
    'GOVERNMENT_PORTAL',
    now(),
    'VERIFIED',
    ARRAY['aadhaar', 'myaadhaar', 'uidai', 'address change', 'pvc card', 'biometric lock', 'eaadhaar']
) ON CONFLICT (slug) DO NOTHING;

-- 6b. Instant e-PAN via Aadhaar (Income Tax Department)
INSERT INTO public.government_services (
    name, slug, description, simple_description, category_id, department, jurisdiction_level, state,
    eligibility, fee, processing_information, application_mode,
    official_website, official_app, official_helpline, official_email,
    official_source, source_type, last_verified_at, verification_status, keywords
) VALUES (
    'Instant e-PAN via Aadhaar (Income Tax Department)',
    'instant-epan-income-tax',
    'Paperless, instant allotment of Permanent Account Number (PAN) directly by the Income Tax Department under the e-Filing 2.0 portal using Aadhaar e-KYC. Contains a digitally signed QR code and holds identical legal validity to a physical plastic PAN card under Section 139A of the Income Tax Act.',
    'Get an official, legally valid digital PAN card in PDF format within 10 minutes completely free using your Aadhaar e-KYC.',
    (SELECT id FROM public.categories WHERE slug = 'identity-services'),
    'Directorate of Income Tax (Systems), Ministry of Finance',
    'CENTRAL', 'All India',
    'Indian resident citizens with valid Aadhaar linked to mobile, who have never been allotted a PAN and are 18+ years.',
    '100% Free of Cost (Rs. 0)',
    'Instant generation in 5-10 minutes with Aadhaar OTP.',
    'ONLINE',
    'https://www.incometax.gov.in/iec/fposervices/#/pre-login/instant-e-pan',
    'e-Filing Portal / UMANG',
    '1800-180-1961',
    'pan-helpdesk@incometax.gov.in',
    'https://www.incometax.gov.in/',
    'GOVERNMENT_PORTAL',
    now(),
    'VERIFIED',
    ARRAY['pan card', 'instant pan', 'epan', 'income tax pan', 'free pan card', 'aadhaar pan', 'apply pan online', 'pan download']
) ON CONFLICT (slug) DO NOTHING;

-- 6c. Physical PAN Card Application & Correction (Protean / UTIITSL)
INSERT INTO public.government_services (
    name, slug, description, simple_description, category_id, department, jurisdiction_level, state,
    eligibility, fee, processing_information, application_mode,
    official_website, official_app, official_helpline, official_email,
    official_source, source_type, last_verified_at, verification_status, keywords
) VALUES (
    'Physical PAN Card Application & Correction (Protean / UTIITSL)',
    'pan-card-nsdl-utiitsl',
    'Official portal for issuance of physical plastic PAN cards managed by authorized government processing agencies Protean eGov Technologies (formerly NSDL) and UTI Infrastructure Technology And Services Ltd (UTIITSL). Offers paperless Aadhaar e-KYC or physical document submission for new PAN, reprints of lost cards, and corrections.',
    'Apply for a laminated physical PVC PAN card (Form 49A), change name/address/photo, reprint lost cards, or link PAN with Aadhaar.',
    (SELECT id FROM public.categories WHERE slug = 'identity-services'),
    'Central Board of Direct Taxes (CBDT), Ministry of Finance',
    'CENTRAL', 'All India',
    'All Indian citizens, minors, NRIs, and entities requiring physical PAN card.',
    'Physical PAN Card (in India): Rs. 107; Foreign Dispatch: Rs. 1,017; Physical Reprint: Rs. 50; e-PAN Download: Rs. 8.26 (Free within 30 days)',
    'Printed and dispatched via India Post Speed Post within 10-15 working days.',
    'ONLINE',
    'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html',
    'Official Protean / UTIITSL Portals',
    '020-27218080',
    'tininfo@proteantech.in',
    'https://incometaxindia.gov.in/',
    'GOVERNMENT_PORTAL',
    now(),
    'VERIFIED',
    ARRAY['pan card', 'physical pan card', 'nsdl pan', 'utiitsl pan', 'pan correction', 'reprint pan card', 'form 49a', 'link pan aadhaar']
) ON CONFLICT (slug) DO NOTHING;

-- 6d. ABHA Card (Ayushman Bharat Health Account)
INSERT INTO public.government_services (
    name, slug, description, simple_description, category_id, department, jurisdiction_level, state,
    eligibility, fee, processing_information, application_mode,
    official_website, official_app, official_helpline, official_email,
    official_source, source_type, last_verified_at, verification_status, keywords
) VALUES (
    'ABHA Card (Ayushman Bharat Health Account) - 14-Digit Health ID',
    'ayushman-bharat-abha-health-id',
    'Core digital health identity under Ayushman Bharat Digital Mission (ABDM). Provides a unified 14-digit identification number and ABHA address to securely access and share medical records across hospitals and labs.',
    'Create your official 14-digit ABHA Health ID card instantly to store and share hospital prescriptions, lab reports, and medical history digitally.',
    (SELECT id FROM public.categories WHERE slug = 'identity-services'),
    'National Health Authority (NHA), Ministry of Health & Family Welfare',
    'CENTRAL', 'All India',
    'All Indian citizens of any age.',
    '100% Free of Cost (Rs. 0)',
    'Instant digital card generation in under 2 minutes.',
    'ONLINE',
    'https://abha.abdm.gov.in/',
    'ABHA App (Android & iOS) / Aarogya Setu',
    '14477 / 1800-11-4477',
    'abdm@nha.gov.in',
    'https://abdm.gov.in/',
    'GOVERNMENT_PORTAL',
    now(),
    'VERIFIED',
    ARRAY['abha card', 'health id', 'ayushman bharat id', 'digital health record', 'abha download', 'abha registration', 'health identity']
) ON CONFLICT (slug) DO NOTHING;

-- 6e. Ration Card & One Nation One Ration Card (NFSA)
INSERT INTO public.government_services (
    name, slug, description, simple_description, category_id, department, jurisdiction_level, state,
    eligibility, fee, processing_information, application_mode,
    official_website, official_app, official_helpline, official_email,
    official_source, source_type, last_verified_at, verification_status, keywords
) VALUES (
    'Ration Card Services & One Nation One Ration Card (NFSA / RCMS)',
    'ration-card-onorc-nfsa',
    'National Food Security Act portal and state RCMS portals. Under One Nation One Ration Card (ONORC), migratory workers and families can lift subsidized grains from any Fair Price Shop across India using biometric Aadhaar authentication.',
    'Apply for family Ration Card, add family members, check NFSA food grain quota, and avail ration portability anywhere in India.',
    (SELECT id FROM public.categories WHERE slug = 'identity-services'),
    'Department of Food & Public Distribution, Ministry of Consumer Affairs',
    'STATE', 'All India',
    'Eligible Antyodaya Anna Yojana (AAY) and Priority Household (PHH) families based on state criteria.',
    'Free of Cost (Central NFSA PMGKAY) or nominal state fee (Rs. 5 - Rs. 50 depending on state)',
    'Online application followed by verification by local Food Inspector / Tahsildar within 15 to 30 days.',
    'HYBRID',
    'https://nfsa.gov.in/',
    'Mera Ration App (Android)',
    '1967',
    'dir-food@nic.in',
    'https://nfsa.gov.in/',
    'GOVERNMENT_PORTAL',
    now(),
    'VERIFIED',
    ARRAY['ration card', 'onorc', 'mera ration', 'food security', 'nfsa', 'rashan card', 'fair price shop', 'family identity']
) ON CONFLICT (slug) DO NOTHING;

-- 6f. APAAR ID (One Nation One Student ID)
INSERT INTO public.government_services (
    name, slug, description, simple_description, category_id, department, jurisdiction_level, state,
    eligibility, fee, processing_information, application_mode,
    official_website, official_app, official_helpline, official_email,
    official_source, source_type, last_verified_at, verification_status, keywords
) VALUES (
    'APAAR ID - Automated Permanent Academic Account Registry (One Nation One Student ID)',
    'apaar-student-id-abc',
    'Unique 12-digit lifelong academic identification for students from Pre-Primary through Higher Education, linked with DigiLocker and the Academic Bank of Credits (ABC) to facilitate credit transfers and authentic degree verification.',
    'Generate your 12-digit unique lifelong student identity card to store all degrees, board marksheets, credits, and achievements digitally.',
    (SELECT id FROM public.categories WHERE slug = 'identity-services'),
    'Ministry of Education, Government of India',
    'CENTRAL', 'All India',
    'All students enrolled in recognized schools, colleges, and higher education universities across India.',
    '100% Free of Cost (Rs. 0)',
    'Instant digital generation through student self-consent on DigiLocker or school UDISE+ portal.',
    'ONLINE',
    'https://apaar.education.gov.in/',
    'DigiLocker App / UMANG',
    '011-20862365',
    'contact@abc.gov.in',
    'https://apaar.education.gov.in/',
    'GOVERNMENT_PORTAL',
    now(),
    'VERIFIED',
    ARRAY['apaar id', 'student id', 'abc id', 'academic bank of credits', 'one nation one student id', 'student card', 'digilocker student', 'education identity']
) ON CONFLICT (slug) DO NOTHING;

-- 7. Parivahan Sarathi - Driving Licence & Learner Licence
INSERT INTO public.government_services (
    name, slug, description, simple_description, category_id, department, jurisdiction_level, state,
    eligibility, fee, processing_information, application_mode,
    official_website, official_app, official_helpline, official_email,
    official_source, source_type, last_verified_at, verification_status, keywords
) VALUES (
    'Parivahan Sarathi - Driving Licence & Learner Licence Portal',
    'parivahan-sarathi-driving-licence',
    'National portal managed by Ministry of Road Transport and Highways (MoRTH) and NIC for Learner Licence test, permanent Driving Licence booking, renewal, duplicate licence, and international driving permits.',
    'Use Parivahan Sarathi when applying for a new motorcycle/car learner licence, booking your driving test slot at the RTO, or renewing your driving licence.',
    (SELECT id FROM public.categories WHERE slug = 'transport'),
    'Ministry of Road Transport and Highways (MoRTH)',
    'CENTRAL', 'All India',
    '18+ years for gear vehicle/car; 16+ years for gearless two-wheeler up to 50cc with parental consent.',
    'Learner Licence (LL): Rs. 200; Permanent DL: Rs. 700 (Test Rs. 300 + Issue Rs. 200 + Smart Card Rs. 200); DL Renewal: Rs. 200',
    'Online LL test in many states via Aadhaar authentication; driving test booked at local RTO.',
    'HYBRID',
    'https://sarathi.parivahan.gov.in/',
    'mParivahan App',
    '0120-4925572',
    'helpdesk-sarathi@gov.in',
    'https://parivahan.gov.in/',
    'GOVERNMENT_PORTAL',
    now(),
    'VERIFIED',
    ARRAY['driving licence', 'learner licence', 'rto', 'dl renewal', 'parivahan', 'sarathi', 'car licence', 'bike licence']
) ON CONFLICT (slug) DO NOTHING;

-- 8. Swachhata App & Municipal Civic Grievance (Potholes, Garbage, Streetlights)
INSERT INTO public.government_services (
    name, slug, description, simple_description, category_id, department, jurisdiction_level, state,
    eligibility, fee, processing_information, application_mode,
    official_website, official_app, official_helpline, official_email,
    official_source, source_type, last_verified_at, verification_status, keywords
) VALUES (
    'Swachhata Civic Complaint Portal (Potholes, Garbage, Streetlights)',
    'swachhata-civic-complaint-app',
    'Official civic grievance mobile application developed by Ministry of Housing and Urban Affairs (MoHUA) mapped to Urban Local Bodies (Municipal Corporations, Municipalities) across India.',
    'Use Swachhata App when there is a pothole, open garbage dump, broken streetlight, overflowing drain, or dead animal near your street. Take a photo and it automatically routes to your local municipality sanitary inspector.',
    (SELECT id FROM public.categories WHERE slug = 'complaints-grievances'),
    'Ministry of Housing and Urban Affairs (MoHUA)',
    'MUNICIPAL', 'All India',
    'Any resident in an Indian municipal corporation or municipal council area.',
    'Free of cost',
    'Civic workers are assigned within 12-48 hours and post before/after photo evidence upon resolving the complaint.',
    'MOBILE_APP',
    'https://sbmurban.org/',
    'Swachhata - MoHUA App (Android & iOS)',
    '1969',
    'support@sbmurban.org',
    'https://sbmurban.org/',
    'GOVERNMENT_PORTAL',
    now(),
    'VERIFIED',
    ARRAY['pothole', 'garbage', 'broken road', 'drainage', 'streetlight', 'dead animal', 'civic complaint', 'sanitation', 'municipality']
) ON CONFLICT (slug) DO NOTHING;

-- 9. Election Commission Voter Service Portal (voters.eci.gov.in)
INSERT INTO public.government_services (
    name, slug, description, simple_description, category_id, department, jurisdiction_level, state,
    eligibility, fee, processing_information, application_mode,
    official_website, official_app, official_helpline, official_email,
    official_source, source_type, last_verified_at, verification_status, keywords
) VALUES (
    'Voters Service Portal (ECI) - Voter ID Registration & Correction',
    'voters-service-portal-eci',
    'Official portal of Election Commission of India for Form 6 (New Voter Registration), Form 8 (Correction of entries / shifting of residence), Epic download, and tracking application status.',
    'Use this portal to register for your first Voter ID Card (EPIC), change your address after moving, correct your name or date of birth, or download digital e-EPIC.',
    (SELECT id FROM public.categories WHERE slug = 'elections-voter-services'),
    'Election Commission of India (ECI)',
    'CENTRAL', 'All India',
    'Indian citizens who have attained the age of 18 years on the qualifying date.',
    'Free of cost',
    'Online submission, field verification by Booth Level Officer (BLO), EPIC issued within 3-6 weeks.',
    'ONLINE',
    'https://voters.eci.gov.in/',
    'Voter Helpline App',
    '1950',
    'complaints@eci.gov.in',
    'https://voters.eci.gov.in/',
    'GOVERNMENT_PORTAL',
    now(),
    'VERIFIED',
    ARRAY['voter card', 'voter id', 'form 6', 'election card', 'e-epic', 'voting booth', '1950', 'eci']
) ON CONFLICT (slug) DO NOTHING;

-- 10. National Scholarship Portal (NSP)
INSERT INTO public.government_services (
    name, slug, description, simple_description, category_id, department, jurisdiction_level, state,
    eligibility, fee, processing_information, application_mode,
    official_website, official_app, official_helpline, official_email,
    official_source, source_type, last_verified_at, verification_status, keywords
) VALUES (
    'National Scholarship Portal (NSP)',
    'national-scholarship-portal',
    'Single unified electronic platform for student application and direct benefit transfer (DBT) of various scholarships offered by Central ministries and State governments for school and college students.',
    'Use NSP to discover and apply for Pre-Matric, Post-Matric, Merit-cum-Means, and higher education financial scholarships directly credited to your Aadhaar-linked bank account.',
    (SELECT id FROM public.categories WHERE slug = 'scholarships'),
    'Ministry of Electronics and Information Technology (MeitY)',
    'CENTRAL', 'All India',
    'Students enrolled in recognized schools/colleges meeting income and academic merit criteria of specific schemes.',
    'Free of cost',
    'Institute verification -> District verification -> Direct Benefit Transfer into bank account.',
    'ONLINE',
    'https://scholarships.gov.in/',
    'NSP Mobile App',
    '0120-6619540',
    'helpdesk@nsp.gov.in',
    'https://scholarships.gov.in/',
    'GOVERNMENT_PORTAL',
    now(),
    'VERIFIED',
    ARRAY['scholarship', 'student funding', 'nsp', 'post-matric', 'pre-matric', 'college fee help', 'education grant']
) ON CONFLICT (slug) DO NOTHING;

-- 11. MyScheme - Central Scheme Discovery Platform
INSERT INTO public.government_services (
    name, slug, description, simple_description, category_id, department, jurisdiction_level, state,
    eligibility, fee, processing_information, application_mode,
    official_website, official_app, official_helpline, official_email,
    official_source, source_type, last_verified_at, verification_status, keywords
) VALUES (
    'myScheme - Official Government Scheme Discovery Platform',
    'myscheme-government-portal',
    'National platform developed by NeGD and MeitY to help citizens discover government schemes tailored to their demographic eligibility including age, gender, caste, residence, and income.',
    'If you are looking for welfare assistance, farming subsidies, youth skill loans, or pension schemes, answer a few questions on myScheme to see all government benefits you are entitled to.',
    (SELECT id FROM public.categories WHERE slug = 'government-schemes'),
    'National e-Governance Division (NeGD), MeitY',
    'CENTRAL', 'All India',
    'All Indian citizens.',
    'Free of cost',
    'Personalized eligibility search and direct link to official scheme application portals.',
    'ONLINE',
    'https://www.myscheme.gov.in/',
    'UMANG App / myScheme',
    '1800-111-555',
    'support-myscheme@gov.in',
    'https://www.myscheme.gov.in/',
    'GOVERNMENT_PORTAL',
    now(),
    'VERIFIED',
    ARRAY['schemes', 'subsidies', 'government benefits', 'pm kisan', 'pension', 'myscheme', 'welfare']
) ON CONFLICT (slug) DO NOTHING;

-- 12. UMANG (Unified Mobile Application for New-age Governance)
INSERT INTO public.government_services (
    name, slug, description, simple_description, category_id, department, jurisdiction_level, state,
    eligibility, fee, processing_information, application_mode,
    official_website, official_app, official_helpline, official_email,
    official_source, source_type, last_verified_at, verification_status, keywords
) VALUES (
    'UMANG - Unified Mobile App for All Government Services',
    'umang-unified-mobile-app',
    'All-in-one single platform for accessing over 1,500 Central and State government services including EPFO passbook, ESIC, CBSE results, electricity bills, and gas cylinder booking.',
    'Download UMANG if you want a single verified government app on your phone to check your EPF balance, claim provident fund, pay utility bills, or access pension services.',
    (SELECT id FROM public.categories WHERE slug = 'government-apps'),
    'National e-Governance Division (NeGD), MeitY',
    'CENTRAL', 'All India',
    'All Indian citizens.',
    'Free of cost',
    'Single login via Mobile Number + MPIN or Aadhaar biometric.',
    'MOBILE_APP',
    'https://web.umang.gov.in/',
    'UMANG App (Android & iOS)',
    '1800-11-5246',
    'customercare@umang.gov.in',
    'https://web.umang.gov.in/',
    'GOVERNMENT_PORTAL',
    now(),
    'VERIFIED',
    ARRAY['umang', 'epfo', 'provident fund', 'gas booking', 'pension passbook', 'all in one app', 'utility bills']
) ON CONFLICT (slug) DO NOTHING;

-- ====================================================================
-- SEED SERVICE STEPS (for CPGRAMS, Cyber Crime, DigiLocker, Swachhata)
-- ====================================================================

-- Steps for Swachhata (Pothole demo)
INSERT INTO public.service_steps (service_id, step_number, title, description, action_url, estimated_time)
VALUES
(
    (SELECT id FROM public.government_services WHERE slug = 'swachhata-civic-complaint-app'),
    1, 'Download Official Swachhata App or Open Portal',
    'Download the official "Swachhata - MoHUA" app from Google Play Store or Apple App Store, or access through UMANG or https://sbmurban.org/.',
    'https://sbmurban.org/', '2 minutes'
),
(
    (SELECT id FROM public.government_services WHERE slug = 'swachhata-civic-complaint-app'),
    2, 'Capture Photo of the Pothole / Waste',
    'Open the app, select "Pothole on Road" or "Garbage Vulnerable Point", and take a clear photograph of the defect. The app uses GPS to pinpoint the location.',
    NULL, '1 minute'
),
(
    (SELECT id FROM public.government_services WHERE slug = 'swachhata-civic-complaint-app'),
    3, 'Submit & Track Resolution with Photo Proof',
    'Submit the complaint to receive a Ticket ID. The local municipality executive engineer / sanitary inspector is assigned to fix it and must upload a picture of the repaired road.',
    NULL, '12-48 hours'
) ON CONFLICT DO NOTHING;

-- Steps for Cyber Crime (1930 demo)
INSERT INTO public.service_steps (service_id, step_number, title, description, action_url, estimated_time)
VALUES
(
    (SELECT id FROM public.government_services WHERE slug = 'national-cyber-crime-reporting-portal'),
    1, 'Call 1930 Helpline Immediately',
    'If you lost money in a financial fraud within the last 24 hours (golden hour), dial 1930 immediately to freeze funds before the scammer withdraws them.',
    'tel:1930', '5 minutes'
),
(
    (SELECT id FROM public.government_services WHERE slug = 'national-cyber-crime-reporting-portal'),
    2, 'File Complaint on Official Cybercrime Portal',
    'Go to https://cybercrime.gov.in and click "Report Cyber Crime" -> "Report Financial Fraud". Register your phone number and fill the incident details.',
    'https://cybercrime.gov.in/', '15 minutes'
),
(
    (SELECT id FROM public.government_services WHERE slug = 'national-cyber-crime-reporting-portal'),
    3, 'Upload Transaction Screenshots & Bank Statement',
    'Provide bank transaction IDs, beneficiary account/UPI ID, SMS proofs, or fraudulent caller screenshots to support investigation.',
    NULL, '10 minutes'
) ON CONFLICT DO NOTHING;

-- Steps for DigiLocker (Document download demo)
INSERT INTO public.service_steps (service_id, step_number, title, description, action_url, estimated_time)
VALUES
(
    (SELECT id FROM public.government_services WHERE slug = 'digilocker-digital-documents'),
    1, 'Sign in with Aadhaar',
    'Visit https://www.digilocker.gov.in or open the DigiLocker app. Sign in using your Aadhaar number or mobile number and enter the OTP.',
    'https://www.digilocker.gov.in/', '2 minutes'
),
(
    (SELECT id FROM public.government_services WHERE slug = 'digilocker-digital-documents'),
    2, 'Search Your Document Issuer',
    'Navigate to "Search Documents". Select your education board (e.g. CBSE, State Board), Transport Department (MoRTH), or Income Tax Department.',
    NULL, '2 minutes'
),
(
    (SELECT id FROM public.government_services WHERE slug = 'digilocker-digital-documents'),
    3, 'Pull & Download Authentic Digital Copy',
    'Enter your Roll Number / Registration Number. Your digitally signed document will appear in "Issued Documents" with a legally valid QR code.',
    NULL, '1 minute'
) ON CONFLICT DO NOTHING;

-- ====================================================================
-- SEED INITIAL GOVERNMENT APPS
-- ====================================================================
INSERT INTO public.government_apps (name, purpose, department, platform, official_source, website, description)
VALUES
('UMANG', 'Unified access to 1500+ Central and State government services (EPFO, Bill Pay, Pension)', 'NeGD / MeitY', 'Android & iOS', 'https://web.umang.gov.in/', 'https://web.umang.gov.in/', 'The official super app of Digital India.'),
('DigiLocker', 'Store, share, and verify official government documents electronically', 'MeitY', 'Android & iOS & Web', 'https://www.digilocker.gov.in/', 'https://www.digilocker.gov.in/', 'Legally recognized electronic document locker.'),
('mParivahan', 'Virtual Driving Licence and Vehicle RC display, challan payment, and RTO citizen services', 'MoRTH / NIC', 'Android & iOS', 'https://parivahan.gov.in/', 'https://parivahan.gov.in/', 'Official app for vehicle and driver documentation.'),
('mAadhaar', 'Carry your Aadhaar card on mobile, lock biometrics, generate VID, and update address', 'UIDAI', 'Android & iOS', 'https://uidai.gov.in/', 'https://uidai.gov.in/', 'Official Aadhaar application from UIDAI.'),
('Swachhata - MoHUA', 'Lodge civic complaints on potholes, garbage, streetlights with photo GPS to municipal corporations', 'MoHUA', 'Android & iOS', 'https://sbmurban.org/', 'https://sbmurban.org/', 'Citizen civic grievance reporting app.')
ON CONFLICT DO NOTHING;

-- ====================================================================
-- SEED INITIAL GOVERNMENT SCHEMES
-- ====================================================================
INSERT INTO public.government_schemes (name, slug, purpose, target_group, eligibility, benefits, documents, application_process, official_source)
VALUES
(
    'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    'ayushman-bharat-pm-jay',
    'Provides secondary and tertiary care hospitalization coverage up to Rs. 5 Lakhs per family per year to vulnerable families.',
    'Bottom 40% income families and vulnerable population based on SECC 2011 criteria.',
    'Households listed in Socio-Economic Caste Census (SECC) or state equivalent entitlement databases.',
    'Cashless and paperless access to healthcare services up to Rs. 5,00,000 per family per year across empaneled hospitals.',
    'Aadhaar card, Ration card, or PM-JAY family letter.',
    'Check eligibility at https://beneficiary.nha.gov.in/ or visit nearest Ayushman Arogya Mandir / CSC center.',
    'https://nha.gov.in/'
),
(
    'PM Kisan Samman Nidhi',
    'pm-kisan-samman-nidhi',
    'Income support of Rs. 6,000 per year in three equal installments to landholding farmer families.',
    'Small and marginal farmer families with cultivable land.',
    'Landholding farmer families possessing cultivable land recorded in state land records.',
    'Direct Benefit Transfer of Rs. 2,000 every 4 months into Aadhaar-linked bank accounts.',
    'Aadhaar card, land ownership documents (Khatoni), and bank account details.',
    'Self-register on https://pmkisan.gov.in/ under Farmers Corner or through nearest CSC.',
    'https://pmkisan.gov.in/'
) ON CONFLICT (slug) DO NOTHING;

-- ====================================================================
-- SEED DIGITAL DOCUMENT SERVICES
-- ====================================================================
INSERT INTO public.digital_document_services (name, provider, supported_documents, how_to_fetch, official_portal)
VALUES
(
    'DigiLocker Digital Wallet',
    'Ministry of Electronics and IT (MeitY)',
    ARRAY['Aadhaar Card', 'Driving Licence', 'Vehicle RC', 'Class 10 Marksheet', 'Class 12 Marksheet', 'PAN Card', 'COVID Vaccine Certificate', 'Caste Certificate', 'Domicile Certificate', 'LPG Subscription Voucher'],
    'Login with Aadhaar OTP, go to Search Documents, choose the government department or education board, enter your registration/roll number, and pull authentic digitally signed documents.',
    'https://www.digilocker.gov.in/'
) ON CONFLICT DO NOTHING;
