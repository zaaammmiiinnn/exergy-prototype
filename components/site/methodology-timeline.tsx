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
      className="relative w-full bg-[#F8FAFC] text-[#0A1628] border-b border-[#0A1628]/10 py-24 sm:py-32"
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
      <div className="absolute top-4 left-4 text-[#0E4A4F] font-mono text-[9px] pointer-events-none hidden sm:block font-semibold">
        + PROTOCOL: THERMO-PINCH-V4
      </div>
      <div className="absolute top-4 right-4 text-[#0E4A4F] font-mono text-[9px] pointer-events-none hidden sm:block font-semibold">
        + M&V: IPMVP-EVO-CERTIFIED
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-[1px] bg-[#2C7FB8]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#2C7FB8] font-semibold">
              02 / METHODOLOGY & PROTOCOL
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#0A1628] leading-[1.05] mb-5">
            Efficiency, engineered from the{" "}
            <span className="text-[#2C7FB8]">laws of physics.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#0A1628]/70 leading-relaxed font-sans">
            Most audits count kilowatt-hours. We measure exergy — the useful work energy can actually do. That distinction lets us expose thermodynamic destruction conventional audits overlook, then synthesize heating, cooling, drying, and water streams into one closed-loop biocircular network.
          </p>
        </div>

        {/* 5-Step Stacked Interactive Cards with 200x160px Schematic on Right */}
        <div className="space-y-6">
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
                className={`group relative p-6 sm:p-8 bg-white border rounded-[2px] transition-all duration-300 shadow-xs hover:shadow-md ${
                  isSelected
                    ? "border-[#2C7FB8] ring-1 ring-[#2C7FB8]/20"
                    : "border-[#0A1628]/10 hover:border-[#2C7FB8]/50"
                }`}
              >
                {/* Active indicator bar */}
                <div
                  className={`absolute top-0 left-0 bottom-0 w-[3px] transition-colors duration-300 ${
                    isSelected ? "bg-[#2C7FB8]" : "bg-transparent group-hover:bg-[#2C7FB8]/30"
                  }`}
                />

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                  {/* Left Column: Number, Phase, Title, Description */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-[#2C7FB8] bg-[#2C7FB8]/10 px-2 py-0.5 rounded-[1px] border border-[#2C7FB8]/20">
                        {step.number} // {step.phase.toUpperCase()}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#0E4A4F] bg-[#0E4A4F]/08 px-2 py-0.5 rounded-[1px] font-semibold border border-[#0E4A4F]/20">
                        {step.badge}
                      </span>
                    </div>

                    <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#0A1628] tracking-tight group-hover:text-[#2C7FB8] transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#0A1628]/70 leading-relaxed font-sans max-w-2xl">
                      {step.description}
                    </p>

                    <div className="pt-2 flex items-center gap-6 font-mono text-[11px] text-[#0A1628]/50">
                      <span>STATUS: VERIFIED & COMPLIANT</span>
                      <span className="text-[#F0A431] font-semibold">2nd LAW PINCH SYNTHESIS</span>
                    </div>
                  </div>

                  {/* Right Column: 200x160px Mini-Illustration Colored with Logo Palette */}
                  <div className="w-full sm:w-auto flex justify-center lg:justify-end flex-shrink-0">
                    <div className="p-1.5 bg-[#0A1628] rounded-[3px] border border-[#0E4A4F] shadow-lg">
                      <SchematicComponent />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Engineering Footnote */}
        <div className="mt-14 pt-6 border-t border-[#0A1628]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#0A1628]/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>EXERGY VERIFICATION STANDARD: 100% THERMODYNAMIC MASS BALANCE</span>
          </div>
          <span>MEMBER: ASSOCIATION OF ENERGY ENGINEERS (AEE)</span>
        </div>

      </div>
    </section>
  );
}
