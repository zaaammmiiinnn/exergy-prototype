import { MetadataRoute } from "next";
import { getLiveServices } from "@/lib/services/service";
import { servicesSeed } from "@/content/seed/services";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://exergy-solutions.com";
  const now = new Date();

  // Core public indexable static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/industries`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/approach`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/applications`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/benefits`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/assessment`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic Service Detail Pages
  let services = servicesSeed;
  try {
    const live = await getLiveServices();
    if (Array.isArray(live) && live.length > 0) {
      services = live as any;
    }
  } catch {
    // Fall back to servicesSeed
  }

  const publishedServices = services.filter((s) => s.is_published !== false);
  const serviceRoutes: MetadataRoute.Sitemap = publishedServices.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: (service as any).updated_at ? new Date((service as any).updated_at) : now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
