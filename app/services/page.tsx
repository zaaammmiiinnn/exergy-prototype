import React from "react";
import Link from "next/link";
import { getLiveServices } from "@/lib/services/service";
import { ServiceCard } from "@/components/site/service-card";
import { MotionDiv } from "@/components/site/motion";
import { CTABand } from "@/components/site/cta-band";
import { ServicesVideoShowcase } from "@/components/site/services-video-showcase";
import { ArrowRight, Layers, Film, Sparkles } from "lucide-react";

import { constructMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { getWebPageSchema, getBreadcrumbSchema } from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Engineering Services | Industrial Energy & Water Optimization Dubai",
  description:
    "Comprehensive industrial energy and water optimization services: cooling, heating, industrial drying, waste heat recovery, pinch analysis, and wastewater reuse.",
  path: "/services",
});

export default async function ServicesPage() {
  const allServices = await getLiveServices();
  const services = allServices.filter((s) => s.is_published !== false);

  const pageSchema = getWebPageSchema({
    title: "Engineering Services | Industrial Energy & Water Optimization",
    description:
      "Comprehensive industrial energy and water optimization services: cooling, heating, drying, waste heat recovery, pinch analysis, and wastewater reuse.",
    url: "/services",
    type: "CollectionPage",
  });

  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ]);

  return (
    <div className="flex flex-col">
      <JsonLd data={[pageSchema, breadcrumbs]} />
      {/* Hero */}
      <section className="bg-slate-50 text-slate-900 pt-16 pb-20 border-b border-slate-200 relative">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <MotionDiv delay={0.05}>
              <span className="text-teal-700 font-mono text-xs uppercase tracking-wider font-semibold">
                Turnkey Engineering Services
              </span>
            </MotionDiv>
            <MotionDiv delay={0.15}>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Consulting solutions across every energy and water flow
              </h1>
            </MotionDiv>
            <MotionDiv delay={0.25}>
              <p className="text-lg text-slate-600 leading-relaxed">
                From a single utility to a fully integrated plant — we optimize both the capital you spend and the energy and water you consume through rigorous second-law thermodynamic analysis.
              </p>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Interactive Video Showcase Section */}
      <section className="py-20 bg-white text-slate-900 border-b border-slate-200">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-teal-700 font-mono text-xs uppercase font-semibold">
              <Film className="w-4 h-4" />
              <span>Interactive Service Video Demonstrations</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Thermodynamic Engineering in Action
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Select any of our core industrial streams to view simulated exergy recovery, equipment configurations, and verified performance benchmarks.
            </p>
          </div>

          <ServicesVideoShowcase />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-50 text-slate-900">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 max-w-2xl space-y-2">
            <span className="text-xs font-mono uppercase text-teal-700 tracking-wider font-semibold">
              Complete Service Portfolio
            </span>
            <h2 className="text-3xl font-bold text-slate-900">
              Our {services.length} Engineering Solutions
            </h2>
            <p className="text-sm text-slate-600">
              Each service is engineered with guaranteed performance metrics and turnkey implementation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id || service.slug} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
