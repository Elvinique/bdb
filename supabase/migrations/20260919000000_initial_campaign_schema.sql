-- =============================================================================
-- Engr. Buradum Baribefe Daniel Campaign Platform - Supabase PostgreSQL Schema
-- Constituency: Khana/Gokana Federal Constituency, Rivers State (NNPP)
-- Document Reference: PRD Section 25, 26, 27
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES & ROLE-BASED ACCESS CONTROL (RBAC)
CREATE TABLE IF NOT EXISTS public.roles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.roles (id, name, description) VALUES
('SUPER_ADMIN', 'Super Administrator', 'Full technical and operational access'),
('CAMPAIGN_ADMIN', 'Campaign Administrator', 'General campaign operational oversight'),
('CONTENT_MANAGER', 'Content Manager', 'Editorial, news, media, and candidate manifesto publishing'),
('FINANCE_ADMIN', 'Finance Administrator', 'Fundraising records, bank reconciliation, and accounting exports'),
('COMPLIANCE_OFFICER', 'Compliance Officer', 'INEC electoral rules, spending caps, and audit tracking'),
('VOLUNTEER_MANAGER', 'Volunteer Manager', 'Grassroots mobilization and ward volunteer coordination'),
('EVENTS_MANAGER', 'Events Manager', 'Town halls, ward assemblies, and RSVP ticketing'),
('COMMUNICATIONS_MANAGER', 'Communications Manager', 'Supporter newsletters and press liaison'),
('VIEWER', 'Read-Only Viewer', 'Auditor and read-only campaign observer')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    phone TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    role_id TEXT REFERENCES public.roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (profile_id, role_id)
);

-- 2. GEOGRAPHIC STRUCTURE (KHANA / GOKANA 36 WARDS)
CREATE TABLE IF NOT EXISTS public.geographic_areas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lga_name TEXT NOT NULL, -- 'Khana' or 'Gokana'
    ward_number INT NOT NULL,
    ward_name TEXT NOT NULL,
    headquarters TEXT,
    polling_units_count INT DEFAULT 0,
    registered_voters_est INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (lga_name, ward_number)
);

-- Seed Wards for Khana (19 Wards) and Gokana (17 Wards)
INSERT INTO public.geographic_areas (lga_name, ward_number, ward_name, headquarters) VALUES
('Khana', 1, 'Bori I', 'Bori Central'),
('Khana', 2, 'Bori II', 'Bori South'),
('Khana', 3, 'Kaani I', 'Kaani Town'),
('Khana', 4, 'Kaani II', 'Kaani Babbe'),
('Khana', 5, 'Babbe I', 'Zaakpon'),
('Khana', 6, 'Babbe II', 'Kono'),
('Khana', 7, 'Ken-Khana I', 'Bane'),
('Khana', 8, 'Ken-Khana II', 'Beeri'),
('Khana', 9, 'Yeghe I', 'Yeghe Central'),
('Khana', 10, 'Yeghe II', 'Yeghe North'),
('Khana', 11, 'Nyo-Khana I', 'Taabaa'),
('Khana', 12, 'Nyo-Khana II', 'Nyokuru'),
('Khana', 13, 'Nyo-Khana III', 'Luebe'),
('Khana', 14, 'Nyo-Khana IV', 'Kaa Coastal'),
('Khana', 15, 'Nyo-Khana V', 'Sogho'),
('Khana', 16, 'Nyo-Khana VI', 'Bara'),
('Khana', 17, 'Nyo-Khana VII', 'Wiyakara'),
('Khana', 18, 'Nyo-Khana VIII', 'Boue'),
('Khana', 19, 'Nyo-Khana IX', 'Gwara'),
('Gokana', 1, 'Kpor', 'Council Secretariat'),
('Gokana', 2, 'Bodo I', 'Bodo Central'),
('Gokana', 3, 'Bodo II', 'Bodo Waterside'),
('Gokana', 4, 'Bodo III', 'Bodo West'),
('Gokana', 5, 'Bomu I', 'Bomu Central'),
('Gokana', 6, 'Bomu II', 'Bomu South'),
('Gokana', 7, 'K-Dere I', 'Dere Town'),
('Gokana', 8, 'K-Dere II', 'Dere East'),
('Gokana', 9, 'B-Dere', 'B-Dere'),
('Gokana', 10, 'Mogho I', 'Mogho Central'),
('Gokana', 11, 'Mogho II', 'Mogho North'),
('Gokana', 12, 'Nwe-Biara', 'Nwe-Biara'),
('Gokana', 13, 'Giokoo', 'Giokoo Sacred Grove'),
('Gokana', 14, 'Barako', 'Barako Town'),
('Gokana', 15, 'Bera', 'Bera'),
('Gokana', 16, 'Deeyor', 'Deeyor'),
('Gokana', 17, 'Lewe', 'Lewe')
ON CONFLICT (lga_name, ward_number) DO NOTHING;

-- 3. CANDIDATE PROFILE & CAMPAIGN SETTINGS
CREATE TABLE IF NOT EXISTS public.candidate_profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_name TEXT NOT NULL,
    office_sought TEXT NOT NULL,
    constituency_name TEXT NOT NULL,
    state_name TEXT NOT NULL,
    party_name TEXT NOT NULL,
    party_abbreviation TEXT NOT NULL,
    campaign_slogan TEXT NOT NULL,
    sub_slogan TEXT,
    election_year TEXT NOT NULL,
    campaign_email TEXT,
    campaign_phone TEXT,
    headquarters_address TEXT,
    official_poster_url TEXT,
    party_logo_url TEXT,
    candidate_photo_url TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CAMPAIGN PRIORITIES & MANIFESTO
CREATE TABLE IF NOT EXISTS public.campaign_priorities (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    detailed_description TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    challenge TEXT NOT NULL,
    approach TEXT NOT NULL,
    impact TEXT NOT NULL,
    key_initiatives JSONB DEFAULT '[]'::jsonb,
    legislative_focus TEXT,
    display_order INT DEFAULT 0,
    status TEXT DEFAULT 'PUBLISHED', -- DRAFT, REVIEW, APPROVED, PUBLISHED, ARCHIVED
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. COMMUNITY FEEDBACK (CITIZEN VOICE)
CREATE TABLE IF NOT EXISTS public.community_feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_code TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    lga TEXT NOT NULL,
    ward TEXT NOT NULL,
    community TEXT NOT NULL,
    topic TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'NEW', -- NEW, REVIEWING, ASSIGNED, RESPONDED, CLOSED, ARCHIVED
    assigned_to UUID REFERENCES public.profiles(id),
    internal_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. VOLUNTEERS & ROSTER MANAGEMENT
CREATE TABLE IF NOT EXISTS public.volunteers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    volunteer_code TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    lga TEXT NOT NULL,
    ward TEXT NOT NULL,
    community TEXT NOT NULL,
    areas JSONB DEFAULT '[]'::jsonb,
    availability TEXT DEFAULT 'Weekends',
    skills TEXT,
    consent_volunteer BOOLEAN DEFAULT TRUE,
    consent_updates BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'ACTIVE', -- NEW, CONTACTED, VERIFIED, ACTIVE, INACTIVE, ARCHIVED
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. EVENTS & ATTENDEE REGISTRATIONS
CREATE TABLE IF NOT EXISTS public.events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    event_type TEXT NOT NULL,
    description TEXT NOT NULL,
    event_date TEXT NOT NULL,
    event_time TEXT NOT NULL,
    location TEXT NOT NULL,
    lga TEXT NOT NULL,
    capacity INT DEFAULT 100,
    registered_count INT DEFAULT 0,
    is_upcoming BOOLEAN DEFAULT TRUE,
    status TEXT DEFAULT 'PUBLISHED', -- DRAFT, PUBLISHED, CANCELLED, COMPLETED
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pass_code TEXT UNIQUE NOT NULL,
    event_id TEXT REFERENCES public.events(id) ON DELETE CASCADE,
    attendee_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    seats INT DEFAULT 1,
    checked_in BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. CAMPAIGN DISPATCHES / NEWS
CREATE TABLE IF NOT EXISTS public.articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    publication_date TEXT NOT NULL,
    read_time TEXT,
    excerpt TEXT NOT NULL,
    content JSONB NOT NULL, -- array of paragraph strings
    image_url TEXT,
    author TEXT NOT NULL,
    status TEXT DEFAULT 'PUBLISHED',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. COMPLIANT FUNDRAISING & DONATION LEDGER
CREATE TABLE IF NOT EXISTS public.campaign_finance_config (
    id TEXT PRIMARY KEY DEFAULT 'MAIN',
    office TEXT NOT NULL DEFAULT 'HOUSE_OF_REPRESENTATIVES',
    expenditure_limit_ngn NUMERIC DEFAULT 100000000,
    individual_contribution_limit_ngn NUMERIC DEFAULT 50000000,
    effective_from DATE DEFAULT '2026-01-01',
    legal_authority TEXT DEFAULT 'Electoral Act 2022 § 88(4)',
    reviewed_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_by TEXT DEFAULT 'NNPP Rivers State Legal Secretariat',
    enabled BOOLEAN DEFAULT FALSE
);

INSERT INTO public.campaign_finance_config (id, office, expenditure_limit_ngn, individual_contribution_limit_ngn, enabled)
VALUES ('MAIN', 'HOUSE_OF_REPRESENTATIVES', 100000000, 50000000, FALSE)
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference TEXT UNIQUE NOT NULL,
    donor_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    amount NUMERIC NOT NULL,
    frequency TEXT DEFAULT 'one-time',
    lga TEXT,
    state TEXT DEFAULT 'Rivers State',
    payment_method TEXT NOT NULL,
    payment_provider TEXT DEFAULT 'paystack_sandbox',
    status TEXT DEFAULT 'VERIFIED', -- INITIATED, PENDING, VERIFIED, REVIEW_REQUIRED, FAILED, REFUNDED
    compliance_checked BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. SYSTEM AUDIT LOGS (PRD Section 39)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor TEXT NOT NULL,
    role TEXT NOT NULL,
    action TEXT NOT NULL,
    resource TEXT NOT NULL,
    resource_id TEXT,
    details TEXT,
    status TEXT DEFAULT 'SUCCESS',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================
ALTER TABLE public.community_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_priorities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Anonymous public visitors can insert into feedback and volunteer tables
CREATE POLICY "Public can submit community feedback"
ON public.community_feedback FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Public can register as volunteer"
ON public.volunteers FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Public can reserve event RSVP"
ON public.event_registrations FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Public can read published priorities, events, and news
CREATE POLICY "Public can view published priorities"
ON public.campaign_priorities FOR SELECT
TO anon, authenticated
USING (status = 'PUBLISHED');

CREATE POLICY "Public can view published events"
ON public.events FOR SELECT
TO anon, authenticated
USING (status = 'PUBLISHED');

CREATE POLICY "Public can view published articles"
ON public.articles FOR SELECT
TO anon, authenticated
USING (status = 'PUBLISHED');
