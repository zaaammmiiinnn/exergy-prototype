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
      <div className="absolute top-4 left-4 text-[#0A1628]/30 font-mono text-[9px] pointer-events-none hidden sm:block">
        + PROTOCOL: THERMO-PINCH-V4
      </div>
      <div className="absolute top-4 right-4 text-[#0A1628]/30 font-mono text-[9px] pointer-events-none hidden sm:block">
        + M&V: IPMVP-EVO-CERTIFIED
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#00B4D8]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#0077B6] font-semibold">
              02 / METHODOLOGY
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#0A1628] leading-[1.05] mb-5">
            Efficiency, engineered from the{" "}
            <span className="text-[#0077B6]">laws of physics.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#0A1628]/70 leading-relaxed font-sans">
            Most audits count kilowatt-hours. We measure exergy — the useful work energy can actually do. That distinction lets us find savings conventional methods overlook, then integrate heating, cooling, drying, and water systems into one optimized whole.
          </p>
        </div>

        {/* =========================================================================
            DESKTOP HORIZONTAL TIMELINE (lg screens)
           ========================================================================= */}
        <div className="hidden lg:block relative pb-4">
          
          {/* Animated Connecting SVG Line */}
          <div className="absolute top-7 left-0 right-0 h-6 pointer-events-none px-12">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
              {/* Background hairline track */}
              <line
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="#0A1628"
                strokeOpacity="0.12"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Animated drawing line */}
              <motion.line
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="#00B4D8"
                strokeWidth="2"
                initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1.0] }}
              />
            </svg>
          </div>

          {/* 5 Nodes Row */}
          <div className="grid grid-cols-5 gap-6 relative z-10">
            {METHODOLOGY_STEPS.map((step, index) => {
              const isSelected = activeStep === index;
              return (
                <div
                  key={step.number}
                  onMouseEnter={() => setActiveStep(index)}
                  className="flex flex-col cursor-pointer group"
                >
                  {/* Node Circle */}
                  <div className="mb-6 flex items-center justify-start">
                    <motion.div
                      initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.4, delay: index * 0.12 }}
                      className={`w-14 h-14 rounded-[2px] border flex flex-col items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? "bg-[#0A1628] border-[#00B4D8] shadow-[0_0_15px_rgba(0,180,216,0.3)] scale-105"
                          : "bg-white border-[#0A1628]/20 group-hover:border-[#00B4D8]"
                      }`}
                    >
                      <span
                        className={`font-mono text-[10px] font-bold ${
                          isSelected ? "text-[#00B4D8]" : "text-[#0A1628]/60"
                        }`}
                      >
                        {step.number}
                      </span>
                      <span
                        className={`font-mono text-[9px] uppercase tracking-wider ${
                          isSelected ? "text-white" : "text-[#0A1628]/80 font-medium"
                        }`}
                      >
                        {step.phase}
                      </span>
                    </motion.div>
                  </div>

                  {/* Node Content Card */}
                  <div
                    className={`p-5 rounded-[2px] border transition-all duration-300 h-full flex flex-col justify-between ${
                      isSelected
                        ? "bg-white border-[#00B4D8] shadow-sm"
                        : "bg-white/80 border-[#0A1628]/10 group-hover:border-[#0A1628]/30"
                    }`}
                  >
                    <div>
                      <div className="font-mono text-[9px] text-[#0077B6] font-semibold uppercase tracking-wider mb-2">
                        {step.badge}
                      </div>
                      <h3 className="font-heading text-base font-bold text-[#0A1628] tracking-tight mb-2.5">
                        {step.title}
                      </h3>
                      <p className="text-xs text-[#0A1628]/70 leading-relaxed font-sans">
                        {step.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#0A1628]/06 flex items-center justify-between text-[10px] font-mono text-[#0A1628]/50">
                      <span>PHASE // {step.number}</span>
                      <span className={isSelected ? "text-[#00B4D8] font-bold" : ""}>
                        {isSelected ? "ACTIVE" : "EXPAND"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            MOBILE & TABLET VERTICAL TIMELINE (< lg screens)
           ========================================================================= */}
        <div className="lg:hidden relative pl-6 border-l-2 border-[#00B4D8]/40 space-y-8">
          {METHODOLOGY_STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative"
            >
              {/* Bullet on the left line */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-[2px] bg-[#0A1628] border border-[#00B4D8] flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#00B4D8]" />
              </div>

              {/* Step Card */}
              <div className="bg-white border border-[#0A1628]/10 p-5 rounded-[2px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-[#0077B6]">
                    {step.number} — {step.phase.toUpperCase()}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#0A1628]/50 bg-[#0A1628]/05 px-2 py-0.5">
                    {step.badge}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#0A1628] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#0A1628]/70 leading-relaxed font-sans">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
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
