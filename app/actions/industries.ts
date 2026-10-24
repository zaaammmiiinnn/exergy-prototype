"use server";

import { createServiceRoleClient } from "@/lib/supabase/service";
import { assertAdminAuthorized } from "@/app/actions/admin-auth";
import { getLiveIndustries, IndustryItem } from "@/lib/industries/industry";
import { revalidatePath } from "next/cache";

export interface CreateIndustryInput {
  name: string;
  slug?: string;
  summary: string;
  body_md: string;
  challenges?: string[];
  hero_image?: string;
  position?: number;
  is_published?: boolean;
}

export async function fetchAdminIndustriesAction(): Promise<{
  success: boolean;
  industries: IndustryItem[];
  error?: string;
}> {
  try {
    await assertAdminAuthorized(["founder", "admin", "employee"]);
    const industries = await getLiveIndustries();
    return { success: true, industries };
  } catch (err: any) {
    return { success: false, industries: [], error: err?.message || "Unauthorized" };
  }
}

export async function createIndustryAction(input: CreateIndustryInput): Promise<{
  success: boolean;
  industry?: IndustryItem;
  error?: string;
}> {
  try {
    await assertAdminAuthorized(["founder", "admin"]);

    if (!input.name?.trim() || !input.summary?.trim() || !input.body_md?.trim()) {
      return { success: false, error: "Industry name, summary, and detailed description are required." };
    }

    const rawSlug = input.slug?.trim() || input.name;
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
      .from("industries")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (existing) {
      return { success: false, error: `An industry with slug "${slug}" already exists.` };
    }

    // Determine position
    const { data: maxPosData } = await supabase
      .from("industries")
      .select("position")
      .order("position", { ascending: false })
      .limit(1);

    const nextPosition =
      typeof input.position === "number"
        ? input.position
        : (maxPosData?.[0]?.position ?? 6) + 1;

    const challenges =
      input.challenges && input.challenges.length > 0
        ? input.challenges
        : [
            "Massive thermal losses across non-recuperative operations",
            "Continuous utility consumption spikes during batch transitions",
            "High effluent volumes and water treatment energy penalties",
          ];

    const { data, error } = await supabase
      .from("industries")
      .insert({
        slug,
        name: input.name.trim(),
        summary: input.summary.trim(),
        body_md: input.body_md.trim(),
        challenges,
        hero_image: input.hero_image?.trim() || "https://images.hostinger.com/2025f758-1013-44c6-b723-1117c9aa2810.png",
        position: nextPosition,
        is_published: input.is_published !== false,
        locale: "en",
      })
      .select()
      .single();

    if (error) {
      console.error("[CREATE INDUSTRY DB ERROR]", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/industries");
    revalidatePath("/admin/industries");
    revalidatePath("/assessment");
    revalidatePath("/");

    return {
      success: true,
      industry: {
        id: data.id,
        slug: data.slug,
        name: data.name,
        summary: data.summary,
        body_md: data.body_md,
        challenges: data.challenges || challenges,
        hero_image: data.hero_image || "https://images.hostinger.com/2025f758-1013-44c6-b723-1117c9aa2810.png",
        position: data.position,
        is_published: data.is_published,
        locale: "en",
      },
    };
  } catch (err: any) {
    console.error("[CREATE INDUSTRY ACTION ERROR]", err);
    return { success: false, error: err?.message || "Failed to create industry." };
  }
}

export async function updateIndustryAction(
  slug: string,
  input: Partial<CreateIndustryInput>
): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    await assertAdminAuthorized(["founder", "admin"]);

    const supabase = createServiceRoleClient();
    const updatePayload: Record<string, any> = {};

    if (input.name) updatePayload.name = input.name.trim();
    if (input.summary) updatePayload.summary = input.summary.trim();
    if (input.body_md) updatePayload.body_md = input.body_md.trim();
    if (input.challenges) updatePayload.challenges = input.challenges;
    if (input.hero_image !== undefined) updatePayload.hero_image = input.hero_image;
    if (typeof input.position === "number") updatePayload.position = input.position;
    if (input.is_published !== undefined) updatePayload.is_published = input.is_published;

    const { error } = await supabase
      .from("industries")
      .update(updatePayload)
      .eq("slug", slug);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/industries");
    revalidatePath("/admin/industries");
    revalidatePath("/assessment");
    revalidatePath("/");

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to update industry." };
  }
}

export async function deleteIndustryAction(slug: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    await assertAdminAuthorized(["founder", "admin"]);

    const supabase = createServiceRoleClient();
    const { error } = await supabase.from("industries").delete().eq("slug", slug);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/industries");
    revalidatePath("/admin/industries");
    revalidatePath("/assessment");
    revalidatePath("/");

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to delete industry." };
  }
}
