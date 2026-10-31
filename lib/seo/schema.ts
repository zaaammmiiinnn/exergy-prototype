export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://exergy-solutions.com";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: "Exergy Solutions",
    legalName: "Exergy Solutions FZE",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.png`,
    description:
      "Specialist engineering consultancy applying Second-Law thermodynamics and exergy analysis to reduce capex and opex across energy- and water-intensive industrial assets. Guaranteed turnkey implementation.",
    email: "info@support.exergy-solutions.com",
    telephone: "+971501234567",
    address: {
      "@type": "PostalAddress",
      streetAddress: "334/6D Al Wasl Street DM199 Al Satwa",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      postalCode: "00000",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.2152,
      longitude: 55.2638,
    },
    areaServed: [
      {
        "@type": "Country",
        name: "United Arab Emirates",
      },
      {
        "@type": "Country",
        name: "Saudi Arabia",
      },
      {
        "@type": "AdministrativeArea",
        name: "Gulf Cooperation Council",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/135328489/",
      "https://twitter.com/exergysolutions",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+971501234567",
        contactType: "customer service",
        areaServed: ["AE", "SA", "QA", "OM", "KW", "BH"],
        availableLanguage: ["en", "ar"],
      },
      {
        "@type": "ContactPoint",
        email: "sarfraz@exergy-solutions.com",
        contactType: "technical engineering inquiry",
        availableLanguage: ["en"],
      },
    ],
    priceRange: "$$$$",
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Exergy Solutions",
    url: SITE_URL,
    description:
      "Turn wasted energy and water into profit through industrial thermodynamics and turnkey implementation.",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en-US",
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function getServiceSchema(service: {
  title: string;
  summary: string;
  slug: string;
  sec_kpi?: string;
  roi_payback?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${service.slug}#service`,
    name: service.title,
    description: service.summary,
    url: `${SITE_URL}/services/${service.slug}`,
    serviceType: "Industrial Thermodynamic Engineering & Energy Efficiency",
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "United Arab Emirates & GCC",
    },
    category: "Industrial Energy & Water Optimization",
    termsOfService: `${SITE_URL}/terms`,
  };
}

export function getWebPageSchema({
  title,
  description,
  url,
  type = "WebPage",
}: {
  title: string;
  description: string;
  url: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
}) {
  const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${fullUrl}#webpage`,
    url: fullUrl,
    name: title,
    description,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en-US",
  };
}
