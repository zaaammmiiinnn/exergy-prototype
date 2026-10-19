-- -----------------------------------------------------------------------------
-- Admin Users Table for Database Authentication
-- -----------------------------------------------------------------------------

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text,
  full_name text not null default 'Administrator',
  role text not null default 'admin',
  is_active boolean not null default true,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Row Level Security
alter table public.admin_users enable row level security;

drop policy if exists "service_role_admin_users" on public.admin_users;
create policy "service_role_admin_users" on public.admin_users
  for all using (true) with check (true);

-- Seed initial admin accounts
insert into public.admin_users (email, full_name, role, is_active)
values
  ('neuralwaves.official@gmail.com', 'Admin User', 'admin', true),
  ('admin@exergy.solutions', 'System Admin', 'admin', true),
  ('support@neuralwaves.in', 'Operations Admin', 'admin', true)
on conflict (email) do update set
  full_name = excluded.full_name,
  role = 'admin',
  is_active = true;
