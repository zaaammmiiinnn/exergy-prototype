import React from "react";
import type { Metadata } from "next";
import { Hero } from "@/components/site/hero";
import { TrustStrip } from "@/components/site/trust-strip";
import { ServicesAccordion } from "@/components/site/services-accordion";
import { MethodologyTimeline } from "@/components/site/methodology-timeline";
import { ImpactMetrics } from "@/components/site/impact-metrics";
import { IndustriesSection } from "@/components/site/industries-section";
import { CaseStudyTeaser } from "@/components/site/case-study-teaser";
import { AssessmentCTA } from "@/components/site/assessment-cta";
import { constructMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { getWebPageSchema } from "@/lib/seo/schema";

export const metadata: Metadata = constructMetadata({
  title: "Exergy Solutions | Industrial Thermodynamic Optimization & Energy Efficiency Dubai",
  description:
    "Cut capex and opex across energy- and water-intensive industrial operations. Second-Law thermodynamic modeling, pinch analysis, and guaranteed turnkey implementation across Dubai and the GCC.",
  path: "/",
});

export default function HomePage() {
  const pageSchema = getWebPageSchema({
    title: "Exergy Solutions | Industrial Thermodynamic Optimization & Energy Efficiency",
    description:
      "Cut capex and opex across energy- and water-intensive industrial operations. Second-Law thermodynamic modeling, pinch analysis, and guaranteed turnkey implementation.",
    url: "/",
    type: "WebPage",
  });

  return (
    <div className="flex flex-col bg-[hsl(190,30%,98%)] min-h-screen text-[#12232b]">
      <JsonLd data={pageSchema} />

      {/* 1. Hero (Step 2) */}
      <Hero />

      {/* 2. Trust Strip (Step 3) */}
      <TrustStrip />

      {/* 3. Services Section: Sticky Left + Technical Accordion (Step 4) */}
      <ServicesAccordion />

      {/* 4. Methodology Timeline: Light Background + Animated SVG (Step 5) */}
      <MethodologyTimeline />

      {/* 5. Impact Metrics: Data Visualization Bento Grid (Step 6) */}
      <ImpactMetrics />

      {/* 6. Industries Section: 3x2 Grid (Step 7) */}
      <IndustriesSection />

      {/* 7. Case Study Teaser: Paper Mill 42% Steam Reduction (Step 8) */}
      <CaseStudyTeaser />

      {/* 8. Assessment CTA: Multi-Step Facility Audit Form (Step 9) */}
      <AssessmentCTA />
    </div>
  );
}
