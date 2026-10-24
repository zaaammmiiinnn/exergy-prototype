import { createServiceRoleClient } from "@/lib/supabase/service";
import { industriesSeed, IndustrySeed } from "@/content/seed/industries";

export type IndustryItem = IndustrySeed;

/**
 * Fetch all active industries from Supabase merged with baseline seeds.
 * If Supabase is unreachable or empty, gracefully falls back to seed data.
 */
export async function getLiveIndustries(): Promise<IndustryItem[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const isConfigured = Boolean(
    supabaseUrl &&
    serviceKey &&
    !supabaseUrl.includes("dummy") &&
    supabaseUrl.startsWith("https://")
  );

  if (!isConfigured) {
    return industriesSeed;
  }

  try {
    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("industries")
      .select("*")
      .order("position", { ascending: true });

    if (error || !data || data.length === 0) {
      return industriesSeed;
    }

    const seedMap = new Map(industriesSeed.map((ind) => [ind.slug, ind]));
    const merged: IndustryItem[] = [];

    for (const row of data) {
      const seed = seedMap.get(row.slug);
      let parsedChallenges: string[] = [];

      if (Array.isArray(row.challenges)) {
        parsedChallenges = row.challenges;
      } else if (typeof row.challenges === "string") {
        try {
          parsedChallenges = JSON.parse(row.challenges);
        } catch {
          parsedChallenges = row.challenges ? [row.challenges] : [];
        }
      }

      if (parsedChallenges.length === 0 && seed?.challenges) {
        parsedChallenges = seed.challenges;
      }

      merged.push({
        id: row.id || seed?.id || `ind-${row.slug}`,
        slug: row.slug,
        name: row.name || seed?.name || row.slug,
        summary: row.summary || seed?.summary || "",
        body_md: row.body_md || seed?.body_md || row.summary || "",
        challenges:
          parsedChallenges.length > 0
            ? parsedChallenges
            : [
                "High-temperature thermal degradation and heat loss",
                "Non-condensing steam vents and pressure drops",
                "Extreme peak utility demand across batches",
              ],
        hero_image:
          row.hero_image ||
          seed?.hero_image ||
          "https://images.hostinger.com/2025f758-1013-44c6-b723-1117c9aa2810.png",
        position: typeof row.position === "number" ? row.position : seed?.position || 99,
        is_published: row.is_published !== false,
        locale: row.locale || "en",
      });

      seedMap.delete(row.slug);
    }

    // Append any remaining seed industries
    for (const remainingSeed of seedMap.values()) {
      merged.push(remainingSeed);
    }

    merged.sort((a, b) => a.position - b.position);
    return merged;
  } catch (err) {
    console.warn("[INDUSTRIES DB FETCH ERROR]", err);
    return industriesSeed;
  }
}

/**
 * Fetch a single industry by its URL slug.
 */
export async function getLiveIndustryBySlug(slug: string): Promise<IndustryItem | null> {
  const all = await getLiveIndustries();
  return all.find((ind) => ind.slug === slug) || null;
}
