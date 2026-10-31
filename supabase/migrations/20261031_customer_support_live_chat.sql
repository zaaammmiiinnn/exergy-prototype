-- =============================================================================
-- CUSTOMER SUPPORT CHATBOT & ADMIN LIVE CHAT SYSTEM MIGRATION
-- Target: Supabase Postgres
-- =============================================================================

-- 1. Visitors Entity (Device & Visitor Identification)
create table if not exists public.visitors (
  id uuid primary key default gen_random_uuid(),
  visitor_uuid text unique not null,
  user_id uuid references auth.users(id) on delete set null,
  name text,
  email text,
  phone text,
  device_type text default 'desktop',
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_visitors_uuid on public.visitors (visitor_uuid);
create index if not exists idx_visitors_email on public.visitors (lower(email));
create index if not exists idx_visitors_last_seen on public.visitors (last_seen_at desc);

-- 2. Extend Chat Sessions / Conversations
alter table public.chat_sessions 
  add column if not exists visitor_id uuid references public.visitors(id) on delete set null,
  add column if not exists conversation_title text default 'Customer Support Session',
  add column if not exists company_name text,
  add column if not exists unread_by_visitor boolean not null default false,
  add column if not exists unread_by_admin boolean not null default true,
  add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_chat_sessions_visitor on public.chat_sessions (visitor_id);
create index if not exists idx_chat_sessions_unread_admin on public.chat_sessions (unread_by_admin) where unread_by_admin = true;

-- 3. Extend Chat Messages
alter table public.chat_messages
  add column if not exists message_type text not null default 'text',
  add column if not exists sender_id text,
  add column if not exists read_at timestamptz;

create index if not exists idx_chat_messages_created on public.chat_messages (session_id, created_at asc);

-- 4. Extend Chat QA Bank / Knowledge
alter table public.chat_qa_bank
  add column if not exists destination_url text,
  add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_chat_qa_dest_url on public.chat_qa_bank (destination_url);

-- 5. Extend Leads with Visitor ID & Support Fields
alter table public.leads
  add column if not exists visitor_id uuid references public.visitors(id) on delete set null,
  add column if not exists inquiry_category text,
  add column if not exists customer_requirements text,
  add column if not exists lead_status text default 'new';

create index if not exists idx_leads_visitor on public.leads (visitor_id);

-- 6. Friendly Views for Unified Schema Entity Names
create or replace view public.conversations as
  select 
    id,
    visitor_id,
    conversation_title,
    status,
    assigned_to as assigned_admin_id,
    last_message_at,
    unread_by_visitor,
    unread_by_admin,
    created_at,
    updated_at
  from public.chat_sessions;

create or replace view public.messages as
  select
    id,
    session_id as conversation_id,
    sender as sender_type,
    sender_id,
    body as message_content,
    message_type,
    meta as metadata,
    read_at,
    created_at
  from public.chat_messages;

create or replace view public.customer_leads as
  select
    id,
    visitor_id,
    full_name as name,
    email,
    phone,
    inquiry_category,
    coalesce(customer_requirements, main_challenge, message) as customer_requirements,
    status as lead_status,
    created_at,
    updated_at
  from public.leads;

create or replace view public.chatbot_knowledge as
  select
    id,
    category,
    question,
    keywords,
    synonyms,
    answer,
    destination_url,
    is_active,
    priority,
    source_page,
    created_at,
    updated_at
  from public.chat_qa_bank;

-- 7. Row Level Security for Visitors and Chat
alter table public.visitors enable row level security;

-- Visitors: Staff can read and manage all visitors
create policy visitors_staff_read on public.visitors for select
  using (public.is_staff(array['founder', 'admin', 'ops', 'viewer']::admin_role[]));

create policy visitors_staff_manage on public.visitors for all
  using (public.is_staff(array['founder', 'admin', 'ops']::admin_role[]));

-- Backend operations (chat endpoints, service role) bypass RLS with service_role key.
