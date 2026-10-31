import React from "react";
import type { Metadata } from "next";
import { AssessmentClient } from "./assessment-client";
import { constructMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { getWebPageSchema, getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = constructMetadata({
  title: "Industrial Facility Assessment | Exergy Solutions Dubai",
  description:
    "Request an on-site or remote thermodynamic engineering assessment. Second-Law energy and water diagnostics with guaranteed turnkey ROI across GCC facilities.",
  path: "/assessment",
});

export default function AssessmentPage() {
  const pageSchema = getWebPageSchema({
    title: "Industrial Facility Assessment | Exergy Solutions Dubai",
    description:
      "Request an on-site or remote thermodynamic engineering assessment. Second-Law energy and water diagnostics with guaranteed turnkey ROI across GCC facilities.",
    url: "/assessment",
    type: "WebPage",
  });

  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Facility Assessment", url: "/assessment" },
  ]);

  return (
    <>
      <JsonLd data={[pageSchema, breadcrumbs]} />
      <AssessmentClient />
    </>
  );
}
