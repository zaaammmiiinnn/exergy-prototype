"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Check } from "lucide-react";

interface ServiceItem {
  id: string;
  code: string;
  title: string;
  shortDesc: string;
  bullets: string[];
  paramKey: string;
  badge: string;
  diagram: React.ReactNode;
  icon: (props: { className?: string }) => React.JSX.Element;
}

// 1.5px stroke line-art icons (32px, no fill)
function SnowflakeIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
      <path d="m9 4 3 3 3-3M9 20l3-3 3 3M4 9l3 3-3 3M20 9l-3 3 3 3" />
    </svg>
  );
}

function FlameIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function WaterIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      <path d="M6 16.5c1.5 1 3.5 1 5 0 1.5-1 3.5-1 5 0" />
    </svg>
  );
}

function NetworkIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="6" height="6" rx="0" />
      <rect x="16" y="3" width="6" height="6" rx="0" />
      <rect x="9" y="15" width="6" height="6" rx="0" />
      <path d="M5 9v3a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9M12 13v2" />
    </svg>
  );
}

import {
  CoolingSchematic,
  HeatingSchematic,
  WaterSchematic,
  ProcessIntegrationSchematic,
} from "./service-schematics";

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "cooling",
    code: "01",
    title: "Cooling Optimization",
    shortDesc:
      "Chilled water, refrigeration and HVAC networks re-engineered for minimum exergy loss and lower peak demand.",
    bullets: [
      "Chilled water plants, cooling towers & industrial refrigeration delta-T expansion",
      "Sub-ambient temperature lift reduction & compressor power minimization",
      "District cooling plant network balancing with guaranteed peak kW/TR cuts",
    ],
    paramKey: "cooling",
    badge: "TARGET: CHILLED WATER & INDUSTRIAL REFRIGERATION",
    diagram: <CoolingSchematic />,
    icon: SnowflakeIcon,
  },
  {
    id: "heating",
    code: "02",
    title: "Heating & Steam",
    shortDesc:
      "Boiler, steam and hot-water systems integrated with heat recovery to reclaim energy otherwise sent to atmosphere.",
    bullets: [
      "High-pressure steam distribution, thermodynamic traps & condensate reclamation",
      "Flue gas condensing economizers capturing latent and sensible enthalpy",
      "Boiler blowdown heat exchange cascading thermal energy into makeup streams",
    ],
    paramKey: "heating",
    badge: "TARGET: STEAM BOILERS & THERMAL DISTRIBUTION",
    diagram: <HeatingSchematic />,
    icon: FlameIcon,
  },
  {
    id: "water",
    code: "03",
    title: "Water Quality & Conservation",
    shortDesc:
      "Surface water bodies, effluent treatment and desalination improved through low-energy, regenerative treatment trains.",
    bullets: [
      "Reverse osmosis (RO) desalination optimization with isobaric energy recovery (PX)",
      "Industrial effluent treatment (ETP) retrofits & zero-liquid-discharge (ZLD) integration",
      "Closed-loop process water recycling reducing freshwater extraction by up to 60%",
    ],
    paramKey: "water",
    badge: "TARGET: RO DESALINATION & INDUSTRIAL EFFLUENT",
    diagram: <WaterSchematic />,
    icon: WaterIcon,
  },
  {
    id: "process",
    code: "04",
    title: "Process Integration",
    shortDesc:
      "Pinch analysis and whole-facility thermodynamic mass-and-energy balancing to eliminate cross-pinch heat transfer.",
    bullets: [
      "Second-law pinch analysis & grand composite curves across entire industrial complexes",
      "Thermal cascading between disparate units so one stream's waste fuels another",
      "Guaranteed overall plant heat rate, fuel consumption, and opex reduction",
    ],
    paramKey: "process",
    badge: "TARGET: WHOLE-FACILITY PINCH INTEGRATION",
    diagram: <ProcessIntegrationSchematic />,
    icon: NetworkIcon,
  },
];

export function ServicesAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const toggleRow = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="services" className="relative w-full bg-[#0A1628] border-b border-white/[0.08] py-24 sm:py-32">
      {/* Corner annotation marks */}
      <div className="absolute top-4 left-4 text-white/20 font-mono text-[9px] pointer-events-none hidden sm:block">
        + DISCIPLINE.MATRIX // SEC.01
      </div>
      <div className="absolute top-4 right-4 text-white/20 font-mono text-[9px] pointer-events-none hidden sm:block">
        + SPEC: EN-12831-DUBAI
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: Sticky on desktop (35%) */}
          <div className="lg:w-[35%] lg:sticky lg:top-28 self-start">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 bg-[#00B4D8]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#94A3B8] font-medium">
                01 / SERVICES
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#F1F5F9] leading-[1.05] mb-6">
              Four disciplines.
              <br />
              <span className="text-[#00B4D8]">One system.</span>
            </h2>

            <p className="text-base text-[#94A3B8] leading-relaxed mb-8 max-w-md">
              From a single utility to a fully integrated plant — we optimize both the capital you spend and the energy and water you consume.
            </p>

            <div className="pt-2">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#00B4D8] hover:text-[#F1F5F9] transition-colors group"
              >
                <span>View all services</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Quick engineering spec callout */}
            <div className="hidden lg:block mt-12 p-4 border border-white/[0.08] bg-[#071120]/80">
              <div className="font-mono text-[10px] text-[#94A3B8]/60 uppercase tracking-widest mb-1">
                DELIVERY MODEL
              </div>
              <div className="font-mono text-xs text-[#F1F5F9] font-medium">
                100% Turnkey EPC & Guaranteed M&V
              </div>
              <div className="font-mono text-[11px] text-[#94A3B8] mt-1">
                Savings contractually bound against ASHRAE Level III audit baseline.
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Accordion (65%) */}
          <div className="lg:w-[65%] flex flex-col border border-white/[0.08] bg-[#0A1628]">
            {SERVICES_DATA.map((item, index) => {
              const isOpen = openIndex === index;
              const Icon = item.icon;
              const isLast = index === SERVICES_DATA.length - 1;

              return (
                <div
                  key={item.id}
                  className={`relative transition-all duration-200 ${
                    !isLast ? "border-b border-white/[0.08]" : ""
                  } ${isOpen ? "bg-[#0F1E33]/90" : "bg-[#0A1628] hover:bg-[#0F1E33]/40"}`}
                >
                  {/* Left accent hairline on active / hover */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-[2px] transition-colors duration-200 ${
                      isOpen ? "bg-[#00B4D8]" : "bg-transparent group-hover:bg-[#00B4D8]/40"
                    }`}
                  />

                  {/* Header Row (Click to toggle) */}
                  <button
                    type="button"
                    onClick={() => toggleRow(index)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-6 sm:p-8 flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#00B4D8]"
                  >
                    <div className="flex items-start gap-5 sm:gap-6">
                      {/* Mono index in muted color */}
                      <span className="font-mono text-sm sm:text-base text-[#94A3B8] font-bold mt-1">
                        {item.code}
                      </span>

                      {/* Line-art Icon (32px, 1.5px stroke, no fill) */}
                      <div className="text-[#94A3B8] group-hover:text-[#00B4D8] transition-colors mt-0.5 shrink-0">
                        <Icon className="w-8 h-8 text-[#00B4D8]" />
                      </div>

                      {/* Title & Short Description */}
                      <div className="pr-4">
                        <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[#F1F5F9] tracking-[-0.02em]">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#94A3B8] mt-1.5 leading-relaxed line-clamp-2 sm:line-clamp-none">
                          {item.shortDesc}
                        </p>
                      </div>
                    </div>

                    {/* Toggle Arrow */}
                    <div className="shrink-0 mt-1.5">
                      <ChevronDown
                        className={`w-5 h-5 text-[#94A3B8] transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-[#00B4D8]" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Expandable Content Panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-8 pt-2 sm:px-8 sm:pb-8 border-t border-white/[0.04]">
                          {/* Target Scope Badge */}
                          <div className="mb-4">
                            <span className="font-mono text-[10px] text-[#00B4D8] uppercase tracking-wider bg-[#00B4D8]/10 px-2 py-0.5 border border-[#00B4D8]/20">
                              {item.badge}
                            </span>
                          </div>

                          {/* 3 Technical Bullet Points */}
                          <div className="grid grid-cols-1 gap-2.5 mb-6">
                            {item.bullets.map((bullet, bIdx) => (
                              <div key={bIdx} className="flex items-start gap-2.5">
                                <div className="w-4 h-4 rounded-[2px] bg-[#00B4D8]/10 border border-[#00B4D8]/30 flex items-center justify-center shrink-0 mt-0.5">
                                  <Check className="w-3 h-3 text-[#00B4D8]" />
                                </div>
                                <span className="text-xs sm:text-sm text-[#F1F5F9]/90 font-mono leading-relaxed">
                                  {bullet}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Mini Technical Diagram */}
                          <div className="mb-6">
                            {item.diagram}
                          </div>

                          {/* CTA Button */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                            <Link
                              href={`/assessment?service=${item.paramKey}`}
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00B4D8] text-[#0A1628] font-mono text-xs uppercase tracking-wider font-semibold rounded-[2px] hover:bg-[#00B4D8]/90 transition-all shadow-[0_0_15px_rgba(0,180,216,0.2)]"
                            >
                              <span>Request assessment</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                            <Link
                              href={`/services/${item.paramKey}`}
                              className="font-mono text-xs text-[#94A3B8] hover:text-[#F1F5F9] transition-colors flex items-center gap-1"
                            >
                              <span>View technical documentation</span>
                              <span className="text-[#00B4D8]">→</span>
                            </Link>
                          </div>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
