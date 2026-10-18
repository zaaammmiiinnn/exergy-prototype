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

export async function updateLeadStatusAction(id: string, newStatus: string) {
  try {
    const supabase = createServiceRoleClient();
    const { error } = await supabase
      .from("leads")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .or(`short_id.eq.${id},id.eq.${id}`);

    if (error) {
      console.warn("[UPDATE LEAD STATUS ERROR]", error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    console.warn("[UPDATE LEAD STATUS CLIENT ERROR]", err);
    return { success: false, error: "Network or runtime error" };
  }
}
