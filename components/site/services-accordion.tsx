"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Check,
  Compass,
  Filter,
  Sparkles,
  Waves,
  Recycle,
  Building2,
} from "lucide-react";

import {
  EngineeringDesignSchematic,
  WaterTreatmentSchematic,
  WaterQualitySchematic,
  DesalinationSchematic,
  WasteValorisationSchematic,
  MunicipalWastewaterSchematic,
} from "./service-schematics";

interface ServiceItem {
  id: string;
  code: string;
  title: string;
  shortDesc: string;
  bullets: string[];
  paramKey: string;
  badge: string;
  diagram: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: "engineering-design-consultancy",
    code: "01",
    title: "Engineering Design & Consultancy for Water, Wastewater & Desalination",
    shortDesc:
      "Front-End Engineering Design (FEED), thermodynamic process modeling, hydraulic transient analysis, and commissioning advisory for turnkey water infrastructure.",
    bullets: [
      "Front-End Engineering Design (FEED) & detailed 3D process flow integration",
      "Hydraulic network simulation, surge protection & exergy optimization",
      "Pre-construction optimization slashing capital expenditure by 12–18%",
    ],
    paramKey: "engineering-design-consultancy",
    badge: "FEED & HYDRAULIC MODELING",
    diagram: <EngineeringDesignSchematic />,
    icon: Compass,
  },
  {
    id: "water-treatment-systems-design-installation",
    code: "02",
    title: "Water Treatment Systems Design, Installation & Maintenance",
    shortDesc:
      "Turnkey skid design, precision site installation, and preventative maintenance for industrial process water, ultrafiltration, and high-purity treatment trains.",
    bullets: [
      "Modular stainless-steel 316L and duplex UF / NF treatment skids",
      "Precision mechanical, electrical, and SCADA automation installation",
      "Automated Clean-in-Place (CIP) routines reducing energy use by up to 30%",
    ],
    paramKey: "water-treatment-systems-design-installation",
    badge: "TURNKEY TREATMENT SKIDS",
    diagram: <WaterTreatmentSchematic />,
    icon: Filter,
  },
  {
    id: "water-quality-improvement-treatment",
    code: "03",
    title: "Water Quality Improvement & Treatment Services",
    shortDesc:
      "Specialized water quality remediation, chemical conditioning, disinfection, scaling & corrosion mitigation, and environmental compliance.",
    bullets: [
      "Advanced oxidation processes (AOP) & multi-barrier UV disinfection",
      "Boiler feedwater & cooling tower conditioning to prevent scale and corrosion",
      "100% compliance with Dubai Municipality and UAE federal effluent guidelines",
    ],
    paramKey: "water-quality-improvement-treatment",
    badge: "QUALITY POLISHING & COMPLIANCE",
    diagram: <WaterQualitySchematic />,
    icon: Sparkles,
  },
  {
    id: "seawater-brackish-water-desalination",
    code: "04",
    title: "Seawater & Brackish Water Desalination Systems",
    shortDesc:
      "High-recovery SWRO and BWRO desalination systems equipped with isobaric energy recovery devices for the lowest specific energy consumption in the GCC.",
    bullets: [
      "Isobaric pressure exchanger (PX) energy recovery recycling 60%+ pumping energy",
      "Gulf seawater pre-treatment with DAF and ultrafiltration membranes",
      "Specific energy consumption cut to < 2.8 kWh/m³ with guaranteed membrane life",
    ],
    paramKey: "seawater-brackish-water-desalination",
    badge: "SWRO & BWRO DESALINATION",
    diagram: <DesalinationSchematic />,
    icon: Waves,
  },
  {
    id: "waste-management-resource-recovery-valorisation",
    code: "05",
    title: "Waste Management, Resource Recovery & Waste Valorisation Services",
    shortDesc:
      "Circular industrial waste valorisation, biological sludge conversion, high-grade mineral recovery, and waste thermal energy cascading.",
    bullets: [
      "Effluent valorisation & Zero Liquid Discharge (ZLD) crystallization",
      "Anaerobic digestion generating renewable biogas energy from high-COD waste",
      "Nutrient and mineral reclamation converting operational waste into revenue",
    ],
    paramKey: "waste-management-resource-recovery-valorisation",
    badge: "CIRCULAR ECONOMY & ZLD",
    diagram: <WasteValorisationSchematic />,
    icon: Recycle,
  },
  {
    id: "municipal-wastewater-treatment-reuse",
    code: "06",
    title: "Municipal Wastewater Treatment, Reuse & Resource Recovery Systems",
    shortDesc:
      "Advanced municipal sewage treatment plants (STP), Membrane Bioreactors (MBR), and treated sewage effluent (TSE) polishing for district cooling and greening.",
    bullets: [
      "Membrane Bioreactor (MBR) and MBBR municipal sewage treatment systems",
      "Treated Sewage Effluent (TSE) ultrafiltration polishing for district cooling plants",
      "Aeration energy optimization reducing STP electrical consumption by up to 40%",
    ],
    paramKey: "municipal-wastewater-treatment-reuse",
    badge: "MUNICIPAL STP & TSE REUSE",
    diagram: <MunicipalWastewaterSchematic />,
    icon: Building2,
  },
];

export function ServicesAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const toggleRow = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="services" className="relative w-full bg-[hsl(190,30%,98%)] border-b border-slate-200/80 py-20 sm:py-28">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* LEFT COLUMN: Sticky on desktop (35%) */}
          <div className="lg:w-[35%] lg:sticky lg:top-28 self-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0c758d]" />
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#0c758d] font-semibold">
                OUR SERVICES
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#12232b] leading-[1.08] mb-6">
              Six disciplines.
              <br />
              <span className="text-[#0c758d]">One integrated system.</span>
            </h2>

            <p className="text-base text-slate-600 leading-relaxed mb-8 max-w-md font-sans">
              From engineering consultancy to turnkey water treatment, SWRO desalination, and waste valorisation — we optimize both capital expenditure and operational performance.
            </p>

            <div className="pt-2">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-teal-200 bg-white text-[#0c758d] font-medium text-xs uppercase tracking-wider hover:bg-teal-50 hover:border-teal-300 transition-all shadow-xs group"
              >
                <span>Explore all 6 services</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Quick engineering spec callout */}
            <div className="hidden lg:block mt-10 p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
              <div className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1 font-semibold">
                DELIVERY MODEL
              </div>
              <div className="font-heading text-sm text-[#12232b] font-bold">
                100% Turnkey EPC & Guaranteed M&V
              </div>
              <div className="text-xs text-slate-500 mt-1 font-sans">
                Energy and water recovery backed by performance guarantees and calibrated instrumentation.
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Accordion (65%) */}
          <div className="lg:w-[65%] flex flex-col gap-4">
            {SERVICES_DATA.map((item, index) => {
              const isOpen = openIndex === index;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className={`relative rounded-2xl border transition-all duration-300 overflow-hidden bg-white ${
                    isOpen 
                      ? "border-[#0c758d]/50 shadow-md ring-1 ring-[#0c758d]/10" 
                      : "border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  {/* Left accent indicator bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-[4px] transition-colors duration-200 ${
                      isOpen ? "bg-[#0c758d]" : "bg-transparent group-hover:bg-[#0c758d]/30"
                    }`}
                  />

                  {/* Header Row (Click to toggle) */}
                  <button
                    type="button"
                    onClick={() => toggleRow(index)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-6 sm:p-7 flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0c758d] group"
                  >
                    <div className="flex items-start gap-4 sm:gap-5">
                      {/* Icon container */}
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${
                        isOpen 
                          ? "bg-[#0c758d] border-[#0c758d] text-white" 
                          : "bg-teal-50/50 border-teal-100 text-[#0c758d] group-hover:bg-teal-50"
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>

                      <div>
                        {/* Target badge */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="font-mono text-[10px] font-bold text-slate-400">
                            {item.code}
                          </span>
                          <span className="font-mono text-[10px] font-semibold text-[#0c758d] uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded-md">
                            {item.badge}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-heading text-lg sm:text-xl font-bold text-[#12232b] group-hover:text-[#0c758d] transition-colors">
                          {item.title}
                        </h3>

                        {/* Short preview on mobile when closed */}
                        {!isOpen && (
                          <p className="text-sm text-slate-500 mt-1 line-clamp-2 sm:hidden font-sans">
                            {item.shortDesc}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Chevron toggle button */}
                    <div className={`w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-slate-50 border-slate-300" : "group-hover:border-slate-300"
                    }`}>
                      <ChevronDown className="w-4 h-4 text-slate-600" />
                    </div>
                  </button>

                  {/* Expanded Body Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.3,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-2 border-t border-slate-100 flex flex-col gap-6">
                          
                          {/* Short Description */}
                          <p className="text-base text-slate-700 leading-relaxed font-sans">
                            {item.shortDesc}
                          </p>

                          {/* Technical Highlights / Bullets */}
                          <div className="grid grid-cols-1 gap-2.5 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                            {item.bullets.map((bullet, bIdx) => (
                              <div key={bIdx} className="flex items-start gap-2.5">
                                <div className="w-5 h-5 rounded-full bg-teal-100/70 text-[#0c758d] flex items-center justify-center shrink-0 mt-0.5">
                                  <Check className="w-3 h-3 stroke-[2.5]" />
                                </div>
                                <span className="text-sm text-slate-700 font-sans font-medium">
                                  {bullet}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Interactive User-Friendly Schematic Diagram */}
                          <div className="w-full">
                            {item.diagram}
                          </div>

                          {/* Action Links */}
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
                            <Link
                              href={`/services/${item.id}`}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0c758d] hover:text-[#0a5c6e] uppercase tracking-wider font-sans group"
                            >
                              <span>Full engineering specifications</span>
                              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                            </Link>

                            <Link
                              href={`/assessment?service=${item.paramKey}`}
                              className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#12232b] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#0c758d] transition-colors shadow-xs"
                            >
                              Request facility assessment
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
