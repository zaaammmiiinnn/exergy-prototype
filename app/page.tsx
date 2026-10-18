import React from "react";
import { Hero } from "@/components/site/hero";
import { TrustStrip } from "@/components/site/trust-strip";
import { ServicesAccordion } from "@/components/site/services-accordion";
import { MethodologyTimeline } from "@/components/site/methodology-timeline";
import { ImpactMetrics } from "@/components/site/impact-metrics";
import { IndustriesSection } from "@/components/site/industries-section";
import { CaseStudyTeaser } from "@/components/site/case-study-teaser";
import { AssessmentCTA } from "@/components/site/assessment-cta";

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#0A1628]">
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
