import { createServiceRoleClient } from "@/lib/supabase/service";
import { servicesSeed, ServiceSeed } from "@/content/seed/services";

export type ServiceItem = ServiceSeed;

/**
 * Fetch all active services from Supabase merged with baseline seeds.
 * If Supabase is unreachable or empty, gracefully falls back to seed data.
 */
export async function getLiveServices(): Promise<ServiceItem[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const isConfigured = Boolean(
    supabaseUrl &&
    serviceKey &&
    !supabaseUrl.includes("dummy") &&
    supabaseUrl.startsWith("https://")
  );

  if (!isConfigured) {
    return servicesSeed;
  }

  try {
    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("position", { ascending: true });

    if (error || !data || data.length === 0) {
      return servicesSeed;
    }

    const seedMap = new Map(servicesSeed.map((s) => [s.slug, s]));
    const merged: ServiceItem[] = [];

    for (const row of data) {
      const seed = seedMap.get(row.slug);
      let parsedHighlights: string[] = [];

      if (Array.isArray(row.highlights)) {
        parsedHighlights = row.highlights;
      } else if (typeof row.highlights === "string") {
        try {
          parsedHighlights = JSON.parse(row.highlights);
        } catch {
          parsedHighlights = row.highlights ? [row.highlights] : [];
        }
      }

      if (parsedHighlights.length === 0 && seed?.highlights) {
        parsedHighlights = seed.highlights;
      }

      merged.push({
        id: row.id || seed?.id || `srv-${row.slug}`,
        slug: row.slug,
        title: row.title || seed?.title || row.slug,
        summary: row.summary || seed?.summary || "",
        body_md: row.body_md || seed?.body_md || row.summary || "",
        highlights: parsedHighlights,
        hero_image: row.hero_image || seed?.hero_image || "https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png",
        icon: row.icon || seed?.icon || "Network",
        position: typeof row.position === "number" ? row.position : seed?.position || 99,
        is_published: row.is_published !== false,
        locale: row.locale || "en",
        seo_title: seed?.seo_title || `${row.title} | Exergy Solutions`,
        seo_description: seed?.seo_description || row.summary || "",
        video_url: seed?.video_url || "/videos/cooling.mp4",
        video_poster: seed?.video_poster || row.hero_image || "https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png",
        video_title: seed?.video_title || row.title,
        video_duration: seed?.video_duration || "3:00",
        video_chapters: seed?.video_chapters || [],
        thermodynamic_principle:
          seed?.thermodynamic_principle ||
          "Thermodynamic exergy analysis optimizes useful work potential, reducing second-law irreversibility across high-temperature and hydraulic flow networks.",
        sec_kpi:
          seed?.sec_kpi ||
          "Contractual specific energy consumption reduction verified against calibrated baseline.",
        equipment_scope: seed?.equipment_scope || [
          "Thermodynamic mass-energy monitoring sensors",
          "Advanced variable-speed hydraulic & pneumatic controllers",
          "High-efficiency cascading heat exchangers",
        ],
        roi_payback:
          seed?.roi_payback ||
          "Typically 12–18 months simple payback backed by performance guarantees.",
      });

      seedMap.delete(row.slug);
    }

    // Append any remaining seed services
    for (const remainingSeed of seedMap.values()) {
      merged.push(remainingSeed);
    }

    merged.sort((a, b) => a.position - b.position);
    return merged;
  } catch (err) {
    console.warn("[SERVICES DB FETCH ERROR]", err);
    return servicesSeed;
  }
}

/**
 * Fetch a single service by its URL slug.
 */
export async function getLiveServiceBySlug(slug: string): Promise<ServiceItem | null> {
  const all = await getLiveServices();
  return all.find((s) => s.slug === slug) || null;
}
