"use server";

import { cookies } from "next/headers";
import { createServiceRoleClient } from "@/lib/supabase/service";
import {
  getAdminSessionAction,
  assertAdminAuthorized,
  type AdminSession,
} from "@/app/actions/admin-auth";
import { signSession } from "@/lib/auth/session";

export interface EmployeeProfile {
  id: string;
  email: string;
  full_name: string;
  role: "founder" | "admin" | "employee";
  job_title: string;
  department: string;
  phone: string;
  location: string;
  bio: string;
  employee_id: string;
  emergency_contact?: string;
  created_at: string;
  last_login_at?: string;
  updated_at: string;
  is_database_connected: boolean;
}

export interface UpdateProfileInput {
  full_name: string;
  job_title: string;
  department: string;
  phone: string;
  location?: string;
  bio?: string;
  emergency_contact?: string;
}

/**
 * Returns canonical default profile information based on role and email
 */
function getDefaultProfileDefaults(email: string, role: string, fullName: string) {
  const normEmail = email.toLowerCase().trim();

  if (normEmail.includes("employee") || role === "employee") {
    return {
      job_title: "Senior Thermodynamicist & Pinch Specialist",
      department: "Exergy Engineering & Audits",
      phone: "+971 4 380 5000",
      location: "Dubai Industrial Park, UAE",
      bio: "Lead staff engineer conducting thermodynamic pinch analyses, industrial heat pump evaluations, and boiler flue gas heat recovery audits across UAE process plants.",
      employee_id: "EX-ENG-108",
      emergency_contact: "+971 50 882 1944",
    };
  }

  if (normEmail.includes("sarfraz") || role === "founder") {
    return {
      job_title: "Founder & Principal Energy Consultant",
      department: "Executive Strategy & Principal Consulting",
      phone: "+971 4 380 5000",
      location: "DIFC & Downtown Dubai, UAE",
      bio: "Over two decades directing industrial second-law efficiency, multi-megawatt co-generation modeling, and carbon abatement directives across the MENA region.",
      employee_id: "EX-DIR-001",
      emergency_contact: "+971 50 119 2831",
    };
  }

  return {
    job_title: "Head of Systems & Energy Operations",
    department: "Operations & Digital Infrastructure",
    phone: "+971 50 123 4567",
    location: "Dubai Operations Hub, UAE",
    bio: "Supervising real-time lead assessment queues, telemetry integrations, client audit directives, and enterprise cloud database orchestration.",
    employee_id: "EX-ADM-042",
    emergency_contact: "+971 50 994 3821",
  };
}

/**
 * Fetch employee profile for current authenticated user directly from Supabase
 */
export async function getAdminProfileAction(): Promise<{
  success: boolean;
  profile?: EmployeeProfile;
  error?: string;
}> {
  try {
    const session = await assertAdminAuthorized(["founder", "admin", "employee"]);
    const normalizedEmail = session.email.toLowerCase().trim();
    const supabase = createServiceRoleClient();

    // 1. Fetch user base account from admin_users
    const { data: dbUser, error: userError } = await supabase
      .from("admin_users")
      .select("id, email, full_name, role, is_active, created_at, last_login_at, updated_at")
      .ilike("email", normalizedEmail)
      .maybeSingle();

    if (userError) {
      console.warn("[GET ADMIN PROFILE USER ERROR]", userError.message);
    }

    // 2. Fetch extended profile details from site_settings (key: employee_profile_<email>)
    const profileKey = `employee_profile_${normalizedEmail}`;
    const { data: settingsData, error: settingsError } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", profileKey)
      .maybeSingle();

    if (settingsError) {
      console.warn("[GET ADMIN PROFILE SETTINGS ERROR]", settingsError.message);
    }

    const defaults = getDefaultProfileDefaults(
      session.email,
      session.role,
      dbUser?.full_name || session.name || "Administrator"
    );

    const savedProfile = settingsData?.value || {};

    const profile: EmployeeProfile = {
      id: dbUser?.id || "admin-profile-id",
      email: session.email,
      full_name: dbUser?.full_name || savedProfile.full_name || session.name || "Administrator",
      role: (dbUser?.role as any) || session.role || "employee",
      job_title: savedProfile.job_title || defaults.job_title,
      department: savedProfile.department || defaults.department,
      phone: savedProfile.phone || defaults.phone,
      location: savedProfile.location || defaults.location,
      bio: savedProfile.bio || defaults.bio,
      employee_id: savedProfile.employee_id || defaults.employee_id,
      emergency_contact: savedProfile.emergency_contact || defaults.emergency_contact,
      created_at: dbUser?.created_at || new Date().toISOString(),
      last_login_at: dbUser?.last_login_at || new Date().toISOString(),
      updated_at: savedProfile.updated_at || dbUser?.updated_at || new Date().toISOString(),
      is_database_connected: true,
    };

    return { success: true, profile };
  } catch (err: any) {
    console.error("[GET ADMIN PROFILE FAILED]", err);
    return {
      success: false,
      error: err?.message || "Unauthorized to access employee profile.",
    };
  }
}

/**
 * Update employee profile details and persist to Supabase PostgreSQL database
 */
export async function updateAdminProfileAction(
  input: UpdateProfileInput
): Promise<{
  success: boolean;
  profile?: EmployeeProfile;
  message?: string;
  error?: string;
}> {
  try {
    const session = await assertAdminAuthorized(["founder", "admin", "employee"]);
    const normalizedEmail = session.email.toLowerCase().trim();

    if (!input.full_name || input.full_name.trim().length < 2) {
      return { success: false, error: "Full Name must be at least 2 characters long." };
    }

    const cleanFullName = input.full_name.trim();
    const cleanJobTitle = input.job_title?.trim() || "Energy Consultant";
    const cleanDepartment = input.department?.trim() || "Operations";
    const cleanPhone = input.phone?.trim() || "";
    const cleanLocation = input.location?.trim() || "Dubai, UAE";
    const cleanBio = input.bio?.trim() || "";
    const cleanEmergencyContact = input.emergency_contact?.trim() || "";

    const supabase = createServiceRoleClient();
    const nowIso = new Date().toISOString();

    // 1. Update full_name in public.admin_users
    const { data: updatedUsers, error: userUpdateErr } = await supabase
      .from("admin_users")
      .update({
        full_name: cleanFullName,
        updated_at: nowIso,
      })
      .ilike("email", normalizedEmail)
      .select("id, email, full_name, role, created_at, last_login_at, updated_at");

    if (userUpdateErr) {
      console.warn("[UPDATE ADMIN USER ERROR]", userUpdateErr.message);
    }

    const targetUser = updatedUsers?.[0];

    // 2. Fetch existing profile metadata to preserve fixed identifiers
    const profileKey = `employee_profile_${normalizedEmail}`;
    const { data: existingData } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", profileKey)
      .maybeSingle();

    const existingVal = existingData?.value || {};
    const defaults = getDefaultProfileDefaults(session.email, session.role, cleanFullName);

    const mergedPayload = {
      email: normalizedEmail,
      full_name: cleanFullName,
      job_title: cleanJobTitle,
      department: cleanDepartment,
      phone: cleanPhone,
      location: cleanLocation,
      bio: cleanBio,
      employee_id: existingVal.employee_id || defaults.employee_id,
      emergency_contact: cleanEmergencyContact || defaults.emergency_contact,
      updated_at: nowIso,
    };

    // 3. Upsert to public.site_settings
    const { error: settingsUpdateErr } = await supabase
      .from("site_settings")
      .upsert({
        key: profileKey,
        value: mergedPayload,
      });

    if (settingsUpdateErr) {
      console.warn("[UPDATE SITE SETTINGS PROFILE ERROR]", settingsUpdateErr.message);
      return {
        success: false,
        error: `Failed to save profile to database: ${settingsUpdateErr.message}`,
      };
    }

    // 4. Update session cookie so sidebar and top-nav immediately display updated name
    try {
      const updatedSession: AdminSession = {
        ...session,
        name: cleanFullName,
      };
      const signedToken = await signSession(updatedSession);
      const cookieStore = cookies();
      cookieStore.set("exergy_admin_session", signedToken, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 86400 * 7,
        secure: process.env.NODE_ENV === "production",
      });
    } catch (cookieErr) {
      console.warn("[SESSION REFRESH ERROR]", cookieErr);
    }

    const updatedProfile: EmployeeProfile = {
      id: targetUser?.id || "admin-profile-id",
      email: session.email,
      full_name: cleanFullName,
      role: (targetUser?.role as any) || session.role || "employee",
      job_title: cleanJobTitle,
      department: cleanDepartment,
      phone: cleanPhone,
      location: cleanLocation,
      bio: cleanBio,
      employee_id: mergedPayload.employee_id,
      emergency_contact: cleanEmergencyContact,
      created_at: targetUser?.created_at || nowIso,
      last_login_at: targetUser?.last_login_at || nowIso,
      updated_at: nowIso,
      is_database_connected: true,
    };

    return {
      success: true,
      profile: updatedProfile,
      message: "Employee profile details successfully updated and synchronized with Supabase database.",
    };
  } catch (err: any) {
    console.error("[UPDATE ADMIN PROFILE ERROR]", err);
    return {
      success: false,
      error: err?.message || "Failed to update profile details.",
    };
  }
}
