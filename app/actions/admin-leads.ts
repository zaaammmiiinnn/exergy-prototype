"use server";

import { createServiceRoleClient } from "@/lib/supabase/service";

export interface AdminLeadItem {
  id: string;
  name: string;
  email: string;
  company: string;
  sector: string;
  score: number;
  priority: "hot" | "warm" | "cold";
  status: "new" | "contacted" | "qualified" | "proposal" | "won";
  createdAt: string;
  rawCreatedAt?: string;
  phone?: string;
  services?: string[];
  timeline?: string;
  notes?: string;
}

export async function fetchAdminLeads(): Promise<{ success: boolean; leads: AdminLeadItem[] }> {
  try {
    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return { success: false, leads: [] };
    }

    const mapped: AdminLeadItem[] = data.map((item) => {
      const d = new Date(item.created_at);
      const formattedDate = !isNaN(d.getTime())
        ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
        : "Recent";

      return {
        id: item.short_id || item.id,
        name: item.full_name || "Unknown Contact",
        email: item.email || "No email",
        company: item.company || "Not specified",
        sector: item.sector || "General",
        score: typeof item.score === "number" ? item.score : 70,
        priority: (item.priority as "hot" | "warm" | "cold") || "warm",
        status: (item.status as AdminLeadItem["status"]) || "new",
        createdAt: formattedDate,
        rawCreatedAt: item.created_at || undefined,
        phone: item.phone || undefined,
        services: Array.isArray(item.service_interest) ? item.service_interest : undefined,
        timeline: item.timeline || undefined,
        notes: item.main_challenge || item.message || undefined,
      };
    });

    return { success: true, leads: mapped };
  } catch (err) {
    console.warn("[ADMIN LEADS FETCH ERROR]", err);
    return { success: false, leads: [] };
  }
}

export async function deleteLeadAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createServiceRoleClient();
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    const deleteQuery = isUUID
      ? supabase.from("leads").delete().eq("id", id)
      : supabase.from("leads").delete().eq("short_id", id);

    const { error } = await deleteQuery;

    if (error) {
      console.warn("[DELETE LEAD ERROR]", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.warn("[DELETE LEAD CLIENT ERROR]", err);
    return { success: false, error: "Network or runtime error" };
  }
}

export async function updateLeadStatusAction(
  id: string,
  newStatus: string,
  fallbackLeadData?: {
    name?: string;
    email?: string;
    company?: string;
    sector?: string;
    score?: number;
    priority?: string;
    phone?: string;
    services?: string[];
    timeline?: string;
    notes?: string;
  }
) {
  try {
    const supabase = createServiceRoleClient();
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    // 1. Try updating existing record in Supabase
    const updateQuery = isUUID
      ? supabase
          .from("leads")
          .update({ status: newStatus, updated_at: new Date().toISOString() })
          .eq("id", id)
          .select()
      : supabase
          .from("leads")
          .update({ status: newStatus, updated_at: new Date().toISOString() })
          .eq("short_id", id)
          .select();

    const { data: updatedRows, error } = await updateQuery;

    if (error) {
      console.warn("[UPDATE LEAD STATUS ERROR]", error);
      return { success: false, error: error.message };
    }

    // 2. If record was not in Supabase yet (e.g. mock lead from initial list), insert it!
    if (!updatedRows || updatedRows.length === 0) {
      const now = new Date().toISOString();
      const { data: inserted, error: insertError } = await supabase
        .from("leads")
        .insert({
          short_id: id,
          source: "assessment",
          status: newStatus,
          full_name: fallbackLeadData?.name || "Assessment Lead",
          email: fallbackLeadData?.email || "neuralwaves.official@gmail.com",
          phone: fallbackLeadData?.phone || null,
          company: fallbackLeadData?.company || "Exergy Industrial Client",
          sector: fallbackLeadData?.sector || "processing",
          service_interest: fallbackLeadData?.services || ["Cooling Optimization"],
          main_challenge: fallbackLeadData?.notes || null,
          timeline: fallbackLeadData?.timeline || "immediate",
          score: fallbackLeadData?.score ?? 85,
          priority: fallbackLeadData?.priority || "hot",
          consent_at: now,
          updated_at: now,
        })
        .select();

      if (insertError) {
        console.warn("[LEAD UPSERT ERROR]", insertError);
        return { success: false, error: insertError.message };
      }
      return { success: true, lead: inserted?.[0] };
    }

    return { success: true, lead: updatedRows?.[0] };
  } catch (err) {
    console.warn("[UPDATE LEAD STATUS CLIENT ERROR]", err);
    return { success: false, error: "Network or runtime error" };
  }
}
