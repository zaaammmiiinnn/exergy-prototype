-- =============================================================================
-- Migration: Temporary Password & Password Reset for Admin Users
-- =============================================================================

-- 1. Add temp_password and must_change_password columns
alter table if exists public.admin_users
  add column if not exists temp_password text,
  add column if not exists must_change_password boolean not null default false;

-- 2. Ensure RLS policies remain in place
alter table if exists public.admin_users enable row level security;

-- 3. Document usage:
-- To give an employee or admin a temporary password:
-- UPDATE public.admin_users 
-- SET 
--   temp_password = '12345678',
--   must_change_password = true,
--   password_hash = NULL
-- WHERE email = 'employee@exergy.com';
