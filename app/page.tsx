import React from "react";
import Link from "next/link";
import { Hero } from "@/components/site/hero";
import { StatStrip } from "@/components/site/stat-strip";
import { ExergyDiagram } from "@/components/site/exergy-diagram";
import { ServiceCard } from "@/components/site/service-card";
import { MethodSteps } from "@/components/site/method-steps";
import { IndustriesGrid } from "@/components/site/industries-grid";
import { BenefitsSection } from "@/components/site/benefits-section";
import { CTABand } from "@/components/site/cta-band";
import { servicesSeed } from "@/content/seed/services";
import { MotionDiv } from "@/components/site/motion";
import { ArrowRight, Sparkles, Layers, Factory } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Stat Strip */}
      <StatStrip />

      {/* 3. Why Exergy / Thermodynamic Distinction Section */}
      <section className="py-20 bg-navy-950 text-white relative">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <MotionDiv delay={0.05}>
              <span className="text-teal-400 font-mono text-xs uppercase tracking-wider font-semibold">
                Methodology & Physics
              </span>
            </MotionDiv>
            <MotionDiv delay={0.15}>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4 tracking-tight">
                Efficiency, engineered from the laws of physics
              </h2>
            </MotionDiv>
            <MotionDiv delay={0.25}>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                Most audits count kilowatt-hours. We measure exergy — the useful work energy can actually do. That distinction lets us find savings conventional methods overlook, then integrate heating, cooling, drying, and water systems into one optimized whole.
              </p>
            </MotionDiv>
          </div>

          <ExergyDiagram />
        </div>
      </section>

      {/* 4. Consulting Solutions across every energy and water flow */}
      <section className="py-20 bg-slate-950 border-t border-slate-800 text-white relative">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <MotionDiv delay={0.05}>
                <span className="text-teal-400 font-mono text-xs uppercase tracking-wider font-semibold">
                  Engineering Scope
                </span>
              </MotionDiv>
              <MotionDiv delay={0.15}>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-3 tracking-tight">
                  Consulting solutions across every energy and water flow
                </h2>
              </MotionDiv>
              <MotionDiv delay={0.25}>
                <p className="text-slate-400 text-base leading-relaxed">
                  From a single utility to a fully integrated plant — we optimize both the capital you spend and the energy and water you consume.
                </p>
              </MotionDiv>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
            >
              <span>View all services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesSeed.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Four-Step Approach */}
      <section className="py-20 bg-navy-950 border-t border-slate-800 text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <MotionDiv delay={0.05}>
              <span className="text-teal-400 font-mono text-xs uppercase tracking-wider font-semibold">
                Guaranteed Turnkey Process
              </span>
            </MotionDiv>
            <MotionDiv delay={0.15}>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-3 tracking-tight">
                How We Deliver Verified Results
              </h2>
            </MotionDiv>
            <MotionDiv delay={0.25}>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                From second-law diagnostic mapping to contractual implementation, every phase is backed by physics and verified data.
              </p>
            </MotionDiv>
          </div>

          <MethodSteps />
        </div>
      </section>

      {/* 6. Industries Served */}
      <section className="py-20 bg-slate-950 border-t border-slate-800 text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <MotionDiv delay={0.05}>
                <span className="text-teal-400 font-mono text-xs uppercase tracking-wider font-semibold">
                  Sector Specialization
                </span>
              </MotionDiv>
              <MotionDiv delay={0.15}>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-3 tracking-tight">
                  Deep expertise where energy and water are mission-critical
                </h2>
              </MotionDiv>
              <MotionDiv delay={0.25}>
                <p className="text-slate-400 text-base leading-relaxed">
                  Energy- and water-intensive, made efficient. Wherever heat, cold, moisture or water quality drives your costs, exergy analysis reveals a leaner path.
                </p>
              </MotionDiv>
            </div>

            <Link
              href="/industries"
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
            >
              <span>Explore industries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <IndustriesGrid />
        </div>
      </section>

      {/* 7. Benefits Section */}
      <section className="py-20 bg-navy-950 border-t border-slate-800 text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <MotionDiv delay={0.05}>
              <span className="text-teal-400 font-mono text-xs uppercase tracking-wider font-semibold">
                Proven Impact
              </span>
            </MotionDiv>
            <MotionDiv delay={0.15}>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-3 tracking-tight">
                Profitability, growth and excellence
              </h2>
            </MotionDiv>
            <MotionDiv delay={0.25}>
              <p className="text-slate-400 text-base leading-relaxed">
                Our turnkey solutions convert thermodynamic insight into results you can bank on.
              </p>
            </MotionDiv>
          </div>

          <BenefitsSection />
        </div>
      </section>

      {/* 8. CTA Band */}
      <CTABand />
    </div>
  );
}
