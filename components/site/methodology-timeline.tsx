"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface StepItem {
  number: string;
  phase: string;
  title: string;
  description: string;
  badge: string;
}

const METHODOLOGY_STEPS: StepItem[] = [
  {
    number: "01",
    phase: "Measure",
    title: "Energy & Mass Balance Audit",
    description:
      "We map where energy and water quality are truly lost — not just consumed — using second-law exergy analysis to expose hidden inefficiency.",
    badge: "ISO 50002 / ASHRAE III",
  },
  {
    number: "02",
    phase: "Model",
    title: "Thermodynamic Simulation & Pinch",
    description:
      "Thermodynamic modeling and pinch analysis reveal the optimal network of heat, cooling, and water flows for your specific process.",
    badge: "SECOND-LAW SIMULATION",
  },
  {
    number: "03",
    phase: "Design",
    title: "Optimal Heat & Water Network",
    description:
      "Solutions mimic natural cycles — cascading, reuse, and regeneration — to cut waste while staying eco-friendly and low-impact.",
    badge: "BIOCIRCULAR REUSE",
  },
  {
    number: "04",
    phase: "Implement",
    title: "Turnkey Guaranteed Delivery",
    description:
      "We deliver turnkey execution with performance guarantees, so savings are contractual, measured, and verified.",
    badge: "EPC GUARANTEED BOND",
  },
  {
    number: "05",
    phase: "Verify",
    title: "Continuous M&V Reporting",
    description:
      "Continuous monitoring and verification conforming to IPMVP standards guarantees permanent operational savings against baseline.",
    badge: "IPMVP PROTOCOL",
  },
];

import {
  MeasureSchematic,
  ModelSchematic,
  DesignSchematic,
  ImplementSchematic,
  VerifySchematic,
} from "./methodology-schematics";

const METHODOLOGY_SCHEMATICS = [
  MeasureSchematic,
  ModelSchematic,
  DesignSchematic,
  ImplementSchematic,
  VerifySchematic,
];

export function MethodologyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section
      id="methodology"
      ref={containerRef}
      className="relative w-full bg-[hsl(190,30%,98%)] text-[#12232b] border-b border-slate-200/80 py-24 sm:py-32"
    >
      {/* Blueprint grid subtle pattern on light */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #0A1628 1px, transparent 1px), linear-gradient(to bottom, #0A1628 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Engineering Corner Coordinates */}
      <div className="absolute top-4 left-4 text-slate-400 font-mono text-[9px] pointer-events-none hidden sm:block font-semibold">
        + PROTOCOL: THERMO-PINCH-V4
      </div>
      <div className="absolute top-4 right-4 text-slate-400 font-mono text-[9px] pointer-events-none hidden sm:block font-semibold">
        + M&V: IPMVP-EVO-CERTIFIED
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0c758d]" />
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#0c758d] font-semibold">
              02 / METHODOLOGY & PROTOCOL
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#12232b] leading-[1.08] mb-5">
            Efficiency, engineered from the{" "}
            <span className="text-[#0c758d]">laws of physics.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans">
            Most audits count kilowatt-hours. We measure exergy — the useful work energy can actually do. That distinction lets us expose thermodynamic destruction conventional audits overlook, then synthesize heating, cooling, drying, and water streams into one closed-loop biocircular network.
          </p>
        </div>

        {/* 5-Step Stacked Interactive Cards with 200x160px Schematic on Right */}
        <div className="space-y-5">
          {METHODOLOGY_STEPS.map((step, index) => {
            const SchematicComponent = METHODOLOGY_SCHEMATICS[index];
            const isSelected = activeStep === index;

            return (
              <motion.div
                key={step.number}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setActiveStep(index)}
                className={`group relative p-6 sm:p-8 bg-white border rounded-2xl transition-all duration-300 shadow-xs hover:shadow-md ${
                  isSelected
                    ? "border-[#0c758d] ring-1 ring-[#0c758d]/20"
                    : "border-slate-200/80 hover:border-[#0c758d]/50"
                }`}
              >
                {/* Active indicator bar */}
                <div
                  className={`absolute top-0 left-0 bottom-0 w-[4px] rounded-l-2xl transition-colors duration-300 ${
                    isSelected ? "bg-[#0c758d]" : "bg-transparent group-hover:bg-[#0c758d]/30"
                  }`}
                />

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                  {/* Left Column: Number, Phase, Title, Description */}
                  <div className="flex-1 space-y-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-[#0c758d] bg-teal-50 px-3 py-1 rounded-full border border-teal-200/60">
                        {step.number} // {step.phase.toUpperCase()}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#30a66a] bg-emerald-50 px-3 py-1 rounded-full font-semibold border border-emerald-200/60">
                        {step.badge}
                      </span>
                    </div>

                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#12232b] tracking-tight group-hover:text-[#0c758d] transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-2xl">
                      {step.description}
                    </p>

                    <div className="pt-1 flex items-center gap-6 font-mono text-[11px] text-slate-400">
                      <span>STATUS: VERIFIED & COMPLIANT</span>
                      <span className="text-[#F0A431] font-semibold">2nd LAW PINCH SYNTHESIS</span>
                    </div>
                  </div>

                  {/* Right Column: 200x160px Mini-Illustration Colored with Logo Palette */}
                  <div className="w-full sm:w-auto flex justify-center lg:justify-end flex-shrink-0">
                    <div className="p-2 bg-gradient-to-br from-[#061821] to-[#0f323c] rounded-2xl border border-slate-800 shadow-md">
                      <SchematicComponent />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Engineering Footnote */}
        <div className="mt-14 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#30a66a]" />
            <span>EXERGY VERIFICATION STANDARD: 100% THERMODYNAMIC MASS BALANCE</span>
          </div>
          <span>MEMBER: ASSOCIATION OF ENERGY ENGINEERS (AEE)</span>
        </div>

      </div>
    </section>
  );
}
