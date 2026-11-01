import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://exergy-solutions.com";

  const privateDisallows = [
    "/admin",
    "/admin/*",
    "/api/*",
    "/portal",
    "/portal/*",
    "/account",
    "/account/*",
    "/track",
    "/track/*",
    "/assessment/thank-you",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: privateDisallows,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: privateDisallows,
      },
      // AI & LLM Search Engine Agents (AEO & GEO Optimization)
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Google-Extended",
          "Applebot-Extended",
          "cohere-ai",
        ],
        allow: "/",
        disallow: privateDisallows,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
