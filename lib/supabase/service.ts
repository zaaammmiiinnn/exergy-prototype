import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client for privileged backend operations (leads insert, internal audit).
 * NEVER expose SUPABASE_SERVICE_ROLE_KEY to the client bundle.
 */
export function createServiceRoleClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy-exergy.supabase.co";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "dummy-service-key";

  return createClient(supabaseUrl, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
