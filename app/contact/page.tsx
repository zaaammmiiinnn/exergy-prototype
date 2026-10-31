import React from "react";
import type { Metadata } from "next";
import { ContactClient } from "./contact-client";
import { constructMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { getWebPageSchema, getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = constructMetadata({
  title: "Contact Engineering Desk | Exergy Solutions Dubai",
  description:
    "Direct technical contact with our industrial thermodynamics engineering desk in Dubai, UAE. Inquire about facility audits, pinch analysis, and turnkey energy optimization.",
  path: "/contact",
});

export default function ContactPage() {
  const pageSchema = getWebPageSchema({
    title: "Contact Engineering Desk | Exergy Solutions Dubai",
    description:
      "Direct technical contact with our industrial thermodynamics engineering desk in Dubai, UAE. Inquire about facility audits, pinch analysis, and turnkey energy optimization.",
    url: "/contact",
    type: "ContactPage",
  });

  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact Desk", url: "/contact" },
  ]);

  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbs]} />
      <ContactClient />
    </>
  );
}
