-- =============================================================================
-- Migration: Grant Schema & Table Privileges for Supabase PostgREST
-- Document Reference: PRD Section 25, 26 (Row Level Security & Role Access)
-- =============================================================================

-- 1. Grant schema usage to public API roles and service role
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- 2. Grant table-level access (RLS policies will govern row-level permissions)
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO service_role;

-- Public constituent permissions
GRANT SELECT, INSERT ON TABLE public.volunteers TO anon, authenticated;
GRANT SELECT, INSERT ON TABLE public.community_feedback TO anon, authenticated;
GRANT SELECT, INSERT ON TABLE public.event_registrations TO anon, authenticated;
GRANT SELECT, INSERT ON TABLE public.donations TO anon, authenticated;

-- Public readable reference tables
GRANT SELECT ON TABLE public.events TO anon, authenticated;
GRANT SELECT ON TABLE public.articles TO anon, authenticated;
GRANT SELECT ON TABLE public.campaign_priorities TO anon, authenticated;
GRANT SELECT ON TABLE public.campaign_finance_config TO anon, authenticated;
GRANT SELECT ON TABLE public.roles TO anon, authenticated;

-- Grant sequence usage for auto-generated IDs if any
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- 3. Ensure future tables created also inherit privileges
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON ROUTINES TO service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT ON TABLES TO anon, authenticated;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO anon, authenticated;
