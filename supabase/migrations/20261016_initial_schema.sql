-- =============================================================================
-- EXERGY SOLUTIONS INITIAL DATABASE SCHEMA & RLS POLICIES
-- Target: Supabase Postgres
-- =============================================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

-- -----------------------------------------------------------------------------
-- 1. Roles & Admin Infrastructure
-- -----------------------------------------------------------------------------

create type admin_role as enum ('founder', 'admin', 'ops', 'viewer');

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  role admin_role not null default 'viewer',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Helper function: get role of current authenticated user
create or replace function public.admin_role_of() returns admin_role
language sql stable security definer set search_path = public as $$
  select role from public.admins where user_id = auth.uid() and is_active = true limit 1;
$$;

-- Helper function: check if user has one of the allowed roles
create or replace function public.is_staff(roles admin_role[]) returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(public.admin_role_of() = any(roles), false);
$$;

-- Trigger to prevent deleting or demoting the last active founder
create or replace function public.prevent_last_founder_removal() returns trigger
language plpgsql as $$
declare
  founder_count int;
begin
  if (TG_OP = 'DELETE' and OLD.role = 'founder') or
     (TG_OP = 'UPDATE' and OLD.role = 'founder' and (NEW.role != 'founder' or NEW.is_active = false)) then
    select count(*) into founder_count
    from public.admins
    where role = 'founder' and is_active = true and user_id != OLD.user_id;

    if founder_count = 0 then
      raise exception 'Operation rejected: Cannot remove or demote the last active founder.';
    end if;
  end if;
  return coalesce(NEW, OLD);
end;
$$;

create trigger tr_protect_last_founder
before update or delete on public.admins
for each row execute function public.prevent_last_founder_removal();

-- -----------------------------------------------------------------------------
-- 2. Lead Management Tables
-- -----------------------------------------------------------------------------

create type lead_source as enum ('assessment', 'contact', 'chatbot', 'handoff');
create type lead_status as enum ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost');
create type lead_priority as enum ('hot', 'warm', 'cold');

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  short_id text unique not null, -- Format: EX-YYYY-NNNN
  source lead_source not null default 'assessment',
  status lead_status not null default 'new',
  full_name text not null,
  email text not null check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone text,
  company text not null,
  job_title text,
  country text default 'United Arab Emirates',
  sector text not null,
  service_interest text[] default '{}',
  facility_type text,
  main_challenge text,
  timeline text,
  message text,
  score int not null default 0,
  priority lead_priority not null default 'warm',
  assigned_to uuid references public.admins(user_id) on delete set null,
  lost_reason text,
  utm jsonb default '{}'::jsonb,
  referrer text,
  page_url text,
  ip_hash text,
  consent_at timestamptz not null default now(),
  email_status jsonb default '{"admin_notified": false, "visitor_replied": false}'::jsonb,
  chat_session_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_leads_status_created on public.leads (status, created_at desc);
create index idx_leads_assigned on public.leads (assigned_to);
create index idx_leads_email on public.leads (lower(email));
create index idx_leads_priority on public.leads (priority);
create index idx_leads_source on public.leads (source);
create index idx_leads_services on public.leads using gin (service_interest);

create table if not exists public.lead_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  author uuid not null references public.admins(user_id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create index idx_lead_notes_lead on public.lead_notes (lead_id, created_at);

create table if not exists public.lead_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  type text not null, -- e.g., 'status_change', 'score_update', 'email_dispatched'
  from_value text,
  to_value text,
  actor text default 'system',
  created_at timestamptz not null default now()
);

create index idx_lead_events_lead on public.lead_events (lead_id, created_at desc);

-- -----------------------------------------------------------------------------
-- 3. Chatbot Tables
-- -----------------------------------------------------------------------------

create type chat_session_status as enum ('bot', 'needs_human', 'human_active', 'closed');
create type chat_session_mode as enum ('menu', 'capture_name', 'capture_email', 'qa');
create type chat_sender as enum ('visitor', 'bot', 'admin');
create type chat_menu_kind as enum ('menu', 'answer', 'action');

create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  token_hash text unique not null,
  status chat_session_status not null default 'bot',
  current_node text not null default 'main',
  mode chat_session_mode not null default 'menu',
  captured jsonb default '{}'::jsonb,
  visitor_name text,
  visitor_email text,
  fallback_count int not null default 0,
  page_url text,
  ip_hash text,
  user_agent text,
  lead_id uuid references public.leads(id) on delete set null,
  assigned_to uuid references public.admins(user_id) on delete set null,
  last_message_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index idx_chat_sessions_status on public.chat_sessions (status, last_message_at desc);
create index idx_chat_sessions_token on public.chat_sessions (token_hash);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.chat_sessions(id) on delete cascade,
  sender chat_sender not null,
  body text not null,
  node_key text,
  meta jsonb default '{}'::jsonb,
  read_by_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create index idx_chat_messages_session on public.chat_messages (session_id, created_at asc);

create table if not exists public.chat_menu_items (
  id uuid primary key default gen_random_uuid(),
  node_key text not null,
  parent_key text,
  depth int not null check (depth between 0 and 2),
  position int not null default 0,
  label text not null,
  kind chat_menu_kind not null default 'menu',
  action text,
  action_target text,
  body text,
  keywords text[] default '{}',
  is_active boolean not null default true,
  locale text not null default 'en',
  updated_by uuid references public.admins(user_id) on delete set null,
  unique (node_key, locale)
);

create table if not exists public.chat_qa_bank (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  keywords text[] default '{}',
  synonyms text[] default '{}',
  category text not null default 'general',
  priority int not null default 0,
  is_active boolean not null default true,
  source_page text not null,
  locale text not null default 'en',
  hit_count int not null default 0
);

create index idx_chat_qa_keywords on public.chat_qa_bank using gin (keywords);
create index idx_chat_qa_trgm on public.chat_qa_bank using gin (question gin_trgm_ops);

-- -----------------------------------------------------------------------------
-- 4. Content Tables (ISR & Admin Editable)
-- -----------------------------------------------------------------------------

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null,
  body_md text not null,
  highlights jsonb default '[]'::jsonb,
  hero_image text,
  icon text,
  position int not null default 0,
  is_published boolean not null default true,
  locale text not null default 'en',
  seo_title text,
  seo_description text,
  video_url text,
  video_poster text,
  video_title text,
  video_duration text,
  video_chapters jsonb default '[]'::jsonb,
  thermodynamic_principle text,
  sec_kpi text,
  equipment_scope text[] default '{}',
  roi_payback text
);

create table if not exists public.industries (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  summary text not null,
  body_md text not null,
  challenges jsonb default '[]'::jsonb,
  hero_image text,
  position int not null default 0,
  is_published boolean not null default true,
  locale text not null default 'en'
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  summary text not null,
  body_md text not null,
  service_ids uuid[] default '{}',
  industry_ids uuid[] default '{}',
  image text,
  position int not null default 0,
  is_published boolean not null default true,
  locale text not null default 'en'
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  person text not null,
  role text,
  company text,
  logo text,
  is_published boolean not null default false,
  position int not null default 0
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text default 'general',
  position int not null default 0,
  is_published boolean not null default true,
  locale text not null default 'en'
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_by uuid references public.admins(user_id) on delete set null,
  updated_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- 5. Row Level Security (RLS) Matrix
-- -----------------------------------------------------------------------------

alter table public.admins enable row level security;
alter table public.leads enable row level security;
alter table public.lead_notes enable row level security;
alter table public.lead_events enable row level security;
alter table public.chat_sessions enable row level security;
alter table public.chat_messages enable row level security;
alter table public.chat_menu_items enable row level security;
alter table public.chat_qa_bank enable row level security;
alter table public.services enable row level security;
alter table public.industries enable row level security;
alter table public.applications enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.site_settings enable row level security;

-- Admins table policies
create policy admins_self_read on public.admins for select
  using (user_id = auth.uid() or public.is_staff(array['founder', 'admin']::admin_role[]));

create policy admins_founder_manage on public.admins for all
  using (public.is_staff(array['founder']::admin_role[]));

-- Leads policies: anon gets NO insert or select. Server Actions use Service Role.
create policy leads_staff_read on public.leads for select
  using (public.is_staff(array['founder', 'admin', 'ops', 'viewer']::admin_role[]));

create policy leads_staff_update on public.leads for update
  using (public.is_staff(array['founder', 'admin', 'ops']::admin_role[]));

create policy leads_admin_delete on public.leads for delete
  using (public.is_staff(array['founder', 'admin']::admin_role[]));

-- Lead notes policies
create policy lead_notes_staff_read on public.lead_notes for select
  using (public.is_staff(array['founder', 'admin', 'ops', 'viewer']::admin_role[]));

create policy lead_notes_staff_insert on public.lead_notes for insert
  with check (public.is_staff(array['founder', 'admin', 'ops']::admin_role[]));

-- Lead events policies
create policy lead_events_staff_read on public.lead_events for select
  using (public.is_staff(array['founder', 'admin', 'ops', 'viewer']::admin_role[]));

-- Chat sessions policies
create policy chat_sessions_staff_read on public.chat_sessions for select
  using (public.is_staff(array['founder', 'admin', 'ops', 'viewer']::admin_role[]));

create policy chat_sessions_staff_update on public.chat_sessions for update
  using (public.is_staff(array['founder', 'admin', 'ops']::admin_role[]));

-- Chat messages policies
create policy chat_messages_staff_read on public.chat_messages for select
  using (public.is_staff(array['founder', 'admin', 'ops', 'viewer']::admin_role[]));

create policy chat_messages_staff_insert on public.chat_messages for insert
  with check (public.is_staff(array['founder', 'admin', 'ops']::admin_role[]));

-- Public readable content: services, industries, applications, faqs, testimonials
create policy services_public_read on public.services for select
  using (is_published = true or public.is_staff(array['founder', 'admin', 'ops', 'viewer']::admin_role[]));

create policy services_staff_manage on public.services for all
  using (public.is_staff(array['founder', 'admin']::admin_role[]));

create policy industries_public_read on public.industries for select
  using (is_published = true or public.is_staff(array['founder', 'admin', 'ops', 'viewer']::admin_role[]));

create policy industries_staff_manage on public.industries for all
  using (public.is_staff(array['founder', 'admin']::admin_role[]));

create policy applications_public_read on public.applications for select
  using (is_published = true or public.is_staff(array['founder', 'admin', 'ops', 'viewer']::admin_role[]));

create policy applications_staff_manage on public.applications for all
  using (public.is_staff(array['founder', 'admin']::admin_role[]));

create policy testimonials_public_read on public.testimonials for select
  using (is_published = true or public.is_staff(array['founder', 'admin', 'ops', 'viewer']::admin_role[]));

create policy testimonials_staff_manage on public.testimonials for all
  using (public.is_staff(array['founder', 'admin']::admin_role[]));

create policy faqs_public_read on public.faqs for select
  using (is_published = true or public.is_staff(array['founder', 'admin', 'ops', 'viewer']::admin_role[]));

create policy faqs_staff_manage on public.faqs for all
  using (public.is_staff(array['founder', 'admin']::admin_role[]));

-- Chat items: read by staff, managed by founder/admin
create policy chat_menu_staff_read on public.chat_menu_items for select
  using (public.is_staff(array['founder', 'admin', 'ops', 'viewer']::admin_role[]));

create policy chat_menu_staff_manage on public.chat_menu_items for all
  using (public.is_staff(array['founder', 'admin']::admin_role[]));

create policy chat_qa_staff_read on public.chat_qa_bank for select
  using (public.is_staff(array['founder', 'admin', 'ops', 'viewer']::admin_role[]));

create policy chat_qa_staff_manage on public.chat_qa_bank for all
  using (public.is_staff(array['founder', 'admin']::admin_role[]));

-- Site settings: founder can edit notify_emails, admins can edit others
create policy site_settings_staff_read on public.site_settings for select
  using (public.is_staff(array['founder', 'admin', 'ops', 'viewer']::admin_role[]));

create policy site_settings_founder_write on public.site_settings for all
  using (public.is_staff(array['founder']::admin_role[]));

create policy site_settings_admin_write on public.site_settings for update
  using (public.is_staff(array['founder', 'admin']::admin_role[]) and key != 'notify_emails');
