import React from "react";
import Link from "next/link";
import { servicesSeed } from "@/content/seed/services";
import { ServiceCard } from "@/components/site/service-card";
import { MotionDiv } from "@/components/site/motion";
import { CTABand } from "@/components/site/cta-band";
import { ArrowRight, Layers } from "lucide-react";

export const metadata = {
  title: "Services | Exergy Solutions Dubai",
  description: "Consulting solutions across every energy and water flow. From a single utility to a fully integrated plant — we optimize capex and opex.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-navy-950 text-white pt-16 pb-20 border-b border-slate-800 relative">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <MotionDiv delay={0.05}>
              <span className="text-teal-400 font-mono text-xs uppercase tracking-wider font-semibold">
                Turnkey Engineering Services
              </span>
            </MotionDiv>
            <MotionDiv delay={0.15}>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Consulting solutions across every energy and water flow
              </h1>
            </MotionDiv>
            <MotionDiv delay={0.25}>
              <p className="text-lg text-slate-300 leading-relaxed">
                From a single utility to a fully integrated plant — we optimize both the capital you spend and the energy and water you consume.
              </p>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-950 text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesSeed.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
