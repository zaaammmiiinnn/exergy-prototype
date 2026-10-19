-- =============================================================================
-- Migration: Admin Role-Based Access Control (RBAC)
-- Values: 'founder', 'admin', 'employee'. Default: 'employee'
-- =============================================================================

-- 1. Ensure role column exists and defaults to 'employee'
alter table if exists public.admin_users 
  add column if not exists role text not null default 'employee';

-- 2. Add check constraint on role column
alter table if exists public.admin_users 
  drop constraint if exists admin_users_role_check;

alter table if exists public.admin_users 
  add constraint admin_users_role_check 
  check (role in ('founder', 'admin', 'employee'));

-- 3. Create view/alias 'admins' if referenced by external tools
create or replace view public.admins as 
  select * from public.admin_users;

-- 4. Seed / update standard RBAC accounts
insert into public.admin_users (email, full_name, role, is_active)
values
  ('neuralwaves.official@gmail.com', 'NeuralWaves Founder', 'founder', true),
  ('admin@exergy.solutions', 'System Admin', 'admin', true),
  ('employee@exergy.com', 'Staff Engineer', 'employee', true)
on conflict (email) do update set
  role = excluded.role,
  full_name = excluded.full_name,
  is_active = true;
