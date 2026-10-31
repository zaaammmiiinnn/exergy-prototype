import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { constructMetadata, SITE_URL } from "../metadata";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getBreadcrumbSchema,
  getServiceSchema,
  getWebPageSchema,
} from "../schema";
import robots from "@/app/robots";

describe("Technical SEO Metadata & Schema Architecture", () => {
  it("1. constructMetadata produces valid canonical URLs and Open Graph tags", () => {
    const meta = constructMetadata({
      title: "Test Page",
      description: "A comprehensive test description for SEO testing.",
      path: "/services",
    });

    assert.equal(meta.title, "Test Page");
    assert.equal(meta.description, "A comprehensive test description for SEO testing.");
    assert.equal(meta.alternates?.canonical, `${SITE_URL}/services`);
    assert.equal(meta.openGraph?.url, `${SITE_URL}/services`);
    assert.equal(meta.openGraph?.type, "website");
    assert.ok(meta.openGraph?.images && meta.openGraph.images.length > 0);
    assert.equal(meta.twitter?.card, "summary_large_image");
    assert.equal((meta.robots as any)?.index, true);
    assert.equal((meta.robots as any)?.follow, true);
  });

  it("2. constructMetadata properly enforces noindex on private pages", () => {
    const privateMeta = constructMetadata({
      title: "Admin Login",
      description: "Restricted area.",
      path: "/admin/login",
      noIndex: true,
    });

    assert.equal((privateMeta.robots as any)?.index, false);
    assert.equal((privateMeta.robots as any)?.follow, false);
    assert.equal((privateMeta.robots as any)?.googleBot?.index, false);
  });

  it("3. Organization and LocalBusiness schemas comply with schema.org specifications", () => {
    const org = getOrganizationSchema();

    assert.equal(org["@context"], "https://schema.org");
    assert.ok(Array.isArray(org["@type"]) && org["@type"].includes("Organization"));
    assert.equal(org.name, "Exergy Solutions");
    assert.equal(org.url, SITE_URL);
    assert.equal(org.address.addressLocality, "Dubai");
    assert.equal(org.address.addressCountry, "AE");
    assert.ok(Array.isArray(org.sameAs) && org.sameAs.length >= 2);
    assert.ok(org.geo.latitude && org.geo.longitude);
  });

  it("4. WebSite schema defines root entity and publisher", () => {
    const site = getWebSiteSchema();

    assert.equal(site["@context"], "https://schema.org");
    assert.equal(site["@type"], "WebSite");
    assert.equal(site.url, SITE_URL);
    assert.equal(site.publisher["@id"], `${SITE_URL}/#organization`);
  });

  it("5. BreadcrumbList schema generates sequential item positions", () => {
    const breadcrumbs = getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Cooling", url: "/services/cooling" },
    ]);

    assert.equal(breadcrumbs["@type"], "BreadcrumbList");
    assert.equal(breadcrumbs.itemListElement.length, 3);
    assert.equal(breadcrumbs.itemListElement[0].position, 1);
    assert.equal(breadcrumbs.itemListElement[0].name, "Home");
    assert.equal(breadcrumbs.itemListElement[1].position, 2);
    assert.equal(breadcrumbs.itemListElement[2].item, `${SITE_URL}/services/cooling`);
  });

  it("6. Service schema attributes provider, URL and industrial taxonomy", () => {
    const service = getServiceSchema({
      title: "Cooling optimization",
      summary: "Chilled water and refrigeration optimization.",
      slug: "cooling",
    });

    assert.equal(service["@type"], "Service");
    assert.equal(service.name, "Cooling optimization");
    assert.equal(service.url, `${SITE_URL}/services/cooling`);
    assert.equal(service.provider["@id"], `${SITE_URL}/#organization`);
  });

  it("7. robots.txt configuration permits crawling public routes while disallowing private routes", () => {
    const rules = robots();

    assert.ok(rules.sitemap?.includes("sitemap.xml"));
    assert.ok(Array.isArray(rules.rules));

    const wildcard = rules.rules.find((r) => r.userAgent === "*");
    assert.ok(wildcard);
    assert.equal(wildcard?.allow, "/");
    assert.ok(Array.isArray(wildcard?.disallow));
    assert.ok(wildcard?.disallow?.includes("/admin"));
    assert.ok(wildcard?.disallow?.includes("/portal"));
    assert.ok(wildcard?.disallow?.includes("/assessment/thank-you"));
  });
});
