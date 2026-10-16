import React from "react";
import { MotionDiv } from "@/components/site/motion";
import { MethodSteps } from "@/components/site/method-steps";
import { ExergyDiagram } from "@/components/site/exergy-diagram";
import { CTABand } from "@/components/site/cta-band";
import { StatStrip } from "@/components/site/stat-strip";
import { Check, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Our Approach | Exergy Analysis & Turnkey Delivery",
  description: "Most audits count kilowatt-hours. We measure exergy — the useful work energy can actually do. That distinction lets us find savings conventional methods overlook.",
};

export default function ApproachPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-navy-950 text-white pt-16 pb-20 border-b border-slate-800 relative">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <MotionDiv delay={0.05}>
              <span className="text-teal-400 font-mono text-xs uppercase tracking-wider font-semibold">
                Thermodynamic Methodology
              </span>
            </MotionDiv>
            <MotionDiv delay={0.15}>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Efficiency, engineered from the laws of physics
              </h1>
            </MotionDiv>
            <MotionDiv delay={0.25}>
              <p className="text-lg text-slate-300 leading-relaxed">
                Most audits count kilowatt-hours. We measure exergy — the useful work energy can actually do. That distinction lets us find savings conventional methods overlook, then integrate heating, cooling, drying, and water systems into one optimized whole.
              </p>
            </MotionDiv>
          </div>
        </div>
      </section>

      <StatStrip />

      {/* Physics & Exergy Diagram Section */}
      <section className="py-20 bg-slate-950 text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12 max-w-3xl">
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">
              Why Second-Law Exergy Analysis Finds More Than Normal Audits
            </h2>
            <p className="text-slate-400 leading-relaxed">
              First-law energy balances state that energy cannot be created or destroyed. But the second law of thermodynamics proves that useful work capacity (exergy) is continuously destroyed by temperature drops, pressure friction, and mixing. Exergy analysis locates and quantifies these exact losses.
            </p>
          </div>

          <ExergyDiagram />
        </div>
      </section>

      {/* 4 Steps */}
      <section className="py-20 bg-navy-950 border-t border-slate-800 text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-14 max-w-2xl">
            <span className="text-teal-400 font-mono text-xs uppercase tracking-wider font-semibold">
              The Engineering Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-3 tracking-tight">
              Four steps from diagnosis to guaranteed savings
            </h2>
          </div>

          <MethodSteps />
        </div>
      </section>

      <CTABand />
    </div>
  );
}
