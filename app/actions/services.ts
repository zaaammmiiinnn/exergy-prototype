"use server";

import { createServiceRoleClient } from "@/lib/supabase/service";
import { assertAdminAuthorized } from "@/app/actions/admin-auth";
import { getLiveServices, ServiceItem } from "@/lib/services/service";
import { revalidatePath } from "next/cache";

export interface CreateServiceInput {
  title: string;
  slug?: string;
  summary: string;
  body_md: string;
  highlights?: string[];
  icon?: string;
  hero_image?: string;
  position?: number;
  is_published?: boolean;
  thermodynamic_principle?: string;
  sec_kpi?: string;
  equipment_scope?: string[];
  roi_payback?: string;
}

export async function fetchAdminServicesAction(): Promise<{
  success: boolean;
  services: ServiceItem[];
  error?: string;
}> {
  try {
    await assertAdminAuthorized(["founder", "admin", "employee"]);
    const services = await getLiveServices();
    return { success: true, services };
  } catch (err: any) {
    return { success: false, services: [], error: err?.message || "Unauthorized" };
  }
}

export async function createServiceAction(input: CreateServiceInput): Promise<{
  success: boolean;
  service?: ServiceItem;
  error?: string;
}> {
  try {
    await assertAdminAuthorized(["founder", "admin"]);

    if (!input.title?.trim() || !input.summary?.trim() || !input.body_md?.trim()) {
      return { success: false, error: "Title, summary, and detailed description are required." };
    }

    const rawSlug = input.slug?.trim() || input.title;
    const slug = rawSlug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (!slug) {
      return { success: false, error: "Invalid slug generated." };
    }

    const supabase = createServiceRoleClient();

    // Check if slug exists in DB
    const { data: existing } = await supabase
      .from("services")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (existing) {
      return { success: false, error: `A service with slug "${slug}" already exists.` };
    }

    // Determine position
    const { data: maxPosData } = await supabase
      .from("services")
      .select("position")
      .order("position", { ascending: false })
      .limit(1);

    const nextPosition =
      typeof input.position === "number"
        ? input.position
        : (maxPosData?.[0]?.position ?? 6) + 1;

    const highlights =
      input.highlights && input.highlights.length > 0
        ? input.highlights
        : [
            "Turnkey thermodynamic engineering implementation",
            "Continuous second-law monitoring & baseline verification",
            "Contractual capex & opex reduction guarantee",
          ];

    // Assemble rich body_md if thermodynamic principle, SEC KPI or ROI are provided separately
    let richBodyMd = input.body_md.trim();
    if (input.thermodynamic_principle?.trim()) {
      richBodyMd += `\n\n### Second-Law Thermodynamic Analysis\n${input.thermodynamic_principle.trim()}`;
    }
    if (input.sec_kpi?.trim()) {
      richBodyMd += `\n\n### Performance KPI Benchmark\n${input.sec_kpi.trim()}`;
    }
    if (input.roi_payback?.trim()) {
      richBodyMd += `\n\n### Contractual Payback Guarantee\n${input.roi_payback.trim()}`;
    }

    const { data, error } = await supabase
      .from("services")
      .insert({
        slug,
        title: input.title.trim(),
        summary: input.summary.trim(),
        body_md: richBodyMd,
        highlights,
        hero_image: input.hero_image?.trim() || null,
        icon: input.icon?.trim() || "Network",
        position: nextPosition,
        is_published: input.is_published !== false,
        locale: "en",
      })
      .select()
      .single();

    if (error) {
      console.error("[CREATE SERVICE DB ERROR]", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/services");
    revalidatePath(`/services/${slug}`);
    revalidatePath("/admin/services");
    revalidatePath("/");

    return {
      success: true,
      service: {
        id: data.id,
        slug: data.slug,
        title: data.title,
        summary: data.summary,
        body_md: data.body_md,
        highlights: data.highlights || highlights,
        hero_image: data.hero_image || "https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png",
        icon: data.icon || "Network",
        position: data.position,
        is_published: data.is_published,
        locale: "en",
        seo_title: `${data.title} | Exergy Solutions`,
        seo_description: data.summary,
        video_url: "/videos/cooling.mp4",
        video_poster: data.hero_image || "https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png",
        video_title: data.title,
        video_duration: "3:00",
        video_chapters: [],
        thermodynamic_principle:
          input.thermodynamic_principle ||
          "Thermodynamic exergy optimization minimizing second-law irreversibility.",
        sec_kpi: input.sec_kpi || "Contractual specific energy consumption reduction verified against baseline.",
        equipment_scope: input.equipment_scope || [
          "Thermodynamic mass-energy monitoring sensors",
          "Advanced variable-speed hydraulic & pneumatic controllers",
          "High-efficiency cascading heat exchangers",
        ],
        roi_payback: input.roi_payback || "Typically 12–18 months simple payback.",
      },
    };
  } catch (err: any) {
    console.error("[CREATE SERVICE ACTION ERROR]", err);
    return { success: false, error: err?.message || "Failed to create service." };
  }
}

export async function updateServiceAction(
  slug: string,
  input: Partial<CreateServiceInput>
): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    await assertAdminAuthorized(["founder", "admin"]);

    const supabase = createServiceRoleClient();
    const updatePayload: Record<string, any> = {};

    if (input.title) updatePayload.title = input.title.trim();
    if (input.summary) updatePayload.summary = input.summary.trim();
    if (input.body_md) updatePayload.body_md = input.body_md.trim();
    if (input.highlights) updatePayload.highlights = input.highlights;
    if (input.icon) updatePayload.icon = input.icon;
    if (input.hero_image !== undefined) updatePayload.hero_image = input.hero_image;
    if (typeof input.position === "number") updatePayload.position = input.position;
    if (input.is_published !== undefined) updatePayload.is_published = input.is_published;

    const { error } = await supabase
      .from("services")
      .update(updatePayload)
      .eq("slug", slug);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/services");
    revalidatePath(`/services/${slug}`);
    revalidatePath("/admin/services");
    revalidatePath("/");

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to update service." };
  }
}

export async function deleteServiceAction(slug: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    await assertAdminAuthorized(["founder", "admin"]);

    const supabase = createServiceRoleClient();
    const { error } = await supabase.from("services").delete().eq("slug", slug);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/services");
    revalidatePath("/admin/services");
    revalidatePath("/");

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to delete service." };
  }
}
