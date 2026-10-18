"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DollarSign, TrendingUp, Award, Leaf, Check } from "lucide-react";

// ═════════════════════════════════════════════════════════════════════════
// 1. PROFITABILITY SCHEMATIC: Capex/Opex Total Cost Curve & Rightsizing
// ═════════════════════════════════════════════════════════════════════════
function ProfitabilitySchematic() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full bg-[#071120] border border-white/[0.08] p-3 sm:p-4 rounded-[2px] relative font-mono text-[10px]">
      <div className="flex items-center justify-between text-[#94A3B8] border-b border-white/[0.06] pb-1.5 mb-2">
        <span className="text-[#00B4D8] font-semibold tracking-wider">FIG 03.A // CAPEX VS OPEX OPTIMIZATION</span>
        <span>REV 2.0</span>
      </div>
      <svg viewBox="0 0 320 160" fill="none" className="w-full h-auto text-slate-300">
        {/* Coordinate axes */}
        <line x1="30" y1="15" x2="30" y2="135" stroke="#94A3B8" strokeWidth="1.2" />
        <line x1="30" y1="135" x2="305" y2="135" stroke="#94A3B8" strokeWidth="1.2" />
        <text x="25" y="20" fill="#94A3B8" fontSize="6.5" textAnchor="end">COST [AED]</text>
        <text x="300" y="145" fill="#94A3B8" fontSize="6.5" textAnchor="end">EFFICIENCY [%]</text>

        {/* Capex curve (increases with efficiency) */}
        <motion.path
          d="M 40 120 C 100 115, 200 80, 290 30"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2 }}
        />
        <text x="285" y="24" fill="#F59E0B" fontSize="6.5" textAnchor="end" fontWeight="bold">EQUIPMENT CAPEX</text>

        {/* Opex curve (decreases with efficiency) */}
        <motion.path
          d="M 40 30 C 100 80, 200 115, 290 120"
          stroke="#94A3B8"
          strokeWidth="1.5"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />
        <text x="45" y="26" fill="#94A3B8" fontSize="6.5" fontWeight="bold">LIFETIME OPEX</text>

        {/* Total Cost Curve (U-shaped) */}
        <motion.path
          d="M 45 75 Q 165 135 285 75"
          stroke="#00B4D8"
          strokeWidth="2"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.4 }}
        />

        {/* Optimal Right-Sized Point */}
        <line x1="165" y1="15" x2="165" y2="135" stroke="#00B4D8" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="165" cy="105" r="4" fill="#00B4D8" />
        <g transform="translate(165, 12)">
          <rect x="-48" y="-7" width="96" height="15" fill="#0A1628" stroke="#00B4D8" strokeWidth="1" />
          <text x="0" y="3" fill="#00B4D8" fontSize="6.5" textAnchor="middle" fontWeight="bold">
            RIGHT-SIZED TCO_MIN
          </text>
        </g>
        <text x="165" y="125" fill="#00B4D8" fontSize="6" textAnchor="middle">η_opt: 84.2%</text>
      </svg>
      <div className="flex justify-between items-center text-[8px] text-[#94A3B8] border-t border-white/[0.06] pt-1.5 mt-1">
        <span className="text-[#00B4D8] font-bold">OPEX CUT: 25–30%</span>
        <span>AVOIDS OVER-SIZED EQUIPMENT CAPEX</span>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════
// 2. GROWTH SCHEMATIC: Unlocked Utility Headroom & Capacity Expansion
// ═════════════════════════════════════════════════════════════════════════
function GrowthSchematic() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full bg-[#071120] border border-white/[0.08] p-3 sm:p-4 rounded-[2px] relative font-mono text-[10px]">
      <div className="flex items-center justify-between text-[#94A3B8] border-b border-white/[0.06] pb-1.5 mb-2">
        <span className="text-[#00B4D8] font-semibold tracking-wider">FIG 03.B // UNLOCKED UTILITY HEADROOM</span>
        <span>REV 2.0</span>
      </div>
      <svg viewBox="0 0 320 160" fill="none" className="w-full h-auto text-slate-300">
        {/* Baseline Capacity Bar (100% Saturated) */}
        <text x="20" y="32" fill="#94A3B8" fontSize="7" fontWeight="bold">BASELINE PLANT UTILITY (BOTTLENECKED)</text>
        <rect x="20" y="38" width="280" height="24" fill="#0A1628" stroke="#94A3B8" strokeWidth="1.2" />
        <rect x="20" y="38" width="270" height="24" fill="rgba(245,158,11,0.2)" />
        <text x="155" y="53" fill="#F59E0B" fontSize="7.5" textAnchor="middle" fontWeight="bold">
          96% UTILITY UTILIZATION (ZERO GROWTH HEADROOM)
        </text>

        {/* Arrow transition */}
        <path d="M 160 67 L 160 83" stroke="#00B4D8" strokeWidth="1.5" />
        <polygon points="157,80 160,86 163,80" fill="#00B4D8" />
        <text x="170" y="77" fill="#00B4D8" fontSize="6.5">EXERGY RE-BALANCING</text>

        {/* Post-Optimization Capacity Bar */}
        <text x="20" y="98" fill="#F1F5F9" fontSize="7" fontWeight="bold">AFTER EXERGY SOLUTIONS RETROFIT</text>
        <rect x="20" y="104" width="280" height="24" fill="#0A1628" stroke="#00B4D8" strokeWidth="1.2" />
        {/* Active load */}
        <rect x="20" y="104" width="185" height="24" fill="rgba(0,180,216,0.15)" />
        <text x="110" y="119" fill="#00B4D8" fontSize="7.5" textAnchor="middle" fontWeight="bold">
          ACTIVE LOAD: 66%
        </text>

        {/* Unlocked Headroom */}
        <motion.rect
          x="205"
          y="104"
          width="95"
          height="24"
          fill="rgba(0,180,216,0.3)"
          stroke="#00B4D8"
          strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        />
        <text x="252" y="119" fill="#F1F5F9" fontSize="7" textAnchor="middle" fontWeight="bold">
          +34% HEADROOM
        </text>
      </svg>
      <div className="flex justify-between items-center text-[8px] text-[#94A3B8] border-t border-white/[0.06] pt-1.5 mt-1">
        <span className="text-[#00B4D8] font-bold">GROWTH WITHOUT EXTRA FUEL</span>
        <span>AVOIDS GRID UPGRADE CAPEX</span>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════
// 3. EXCELLENCE SCHEMATIC: Second-Law Benchmark & M&V Performance
// ═════════════════════════════════════════════════════════════════════════
function ExcellenceSchematic() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full bg-[#071120] border border-white/[0.08] p-3 sm:p-4 rounded-[2px] relative font-mono text-[10px]">
      <div className="flex items-center justify-between text-[#94A3B8] border-b border-white/[0.06] pb-1.5 mb-2">
        <span className="text-[#00B4D8] font-semibold tracking-wider">FIG 03.C // SECOND-LAW BENCHMARK VS MEDIAN</span>
        <span>REV 2.0</span>
      </div>
      <svg viewBox="0 0 320 160" fill="none" className="w-full h-auto text-slate-300">
        {/* Industry Median vs Exergy Solutions */}
        <g transform="translate(40, 20)">
          <rect x="0" y="0" width="105" height="105" fill="#0A1628" stroke="#94A3B8" strokeWidth="1.2" />
          <text x="52" y="20" fill="#94A3B8" fontSize="7" textAnchor="middle">INDUSTRY MEDIAN</text>
          <text x="52" y="55" fill="#F59E0B" fontSize="18" fontWeight="bold" textAnchor="middle">41.2%</text>
          <text x="52" y="75" fill="#94A3B8" fontSize="6.5" textAnchor="middle">SECOND-LAW η_II</text>
          <text x="52" y="92" fill="#F59E0B" fontSize="6" textAnchor="middle">HIGH ENTROPY LEAK</text>
        </g>

        {/* Arrow */}
        <path d="M 160 70 L 175 70" stroke="#00B4D8" strokeWidth="1.5" />
        <polygon points="172,67 178,70 172,73" fill="#00B4D8" />

        <g transform="translate(185, 20)">
          <rect x="0" y="0" width="105" height="105" fill="#0A1628" stroke="#00B4D8" strokeWidth="1.5" />
          <line x1="0" y1="26" x2="105" y2="26" stroke="rgba(0,180,216,0.2)" strokeWidth="1" />
          <text x="52" y="18" fill="#00B4D8" fontSize="7" fontWeight="bold" textAnchor="middle">EXERGY BENCHMARK</text>
          <motion.text
            x="52"
            y="55"
            fill="#F1F5F9"
            fontSize="18"
            fontWeight="bold"
            textAnchor="middle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            72.4%
          </motion.text>
          <text x="52" y="75" fill="#00B4D8" fontSize="6.5" textAnchor="middle">VERIFIED η_II</text>
          <text x="52" y="92" fill="#00B4D8" fontSize="6" textAnchor="middle">IPMVP OPTION C AUDITED</text>
        </g>
      </svg>
      <div className="flex justify-between items-center text-[8px] text-[#94A3B8] border-t border-white/[0.06] pt-1.5 mt-1">
        <span className="text-[#00B4D8] font-bold">ESG & RESILIENCE LEADERSHIP</span>
        <span>CONTRACTUALLY GUARANTEED M&V</span>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════
// 4. SUSTAINABILITY SCHEMATIC: Nature-Inspired Closed Regenerative Cycles
// ═════════════════════════════════════════════════════════════════════════
function SustainabilitySchematic() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full bg-[#071120] border border-white/[0.08] p-3 sm:p-4 rounded-[2px] relative font-mono text-[10px]">
      <div className="flex items-center justify-between text-[#94A3B8] border-b border-white/[0.06] pb-1.5 mb-2">
        <span className="text-[#00B4D8] font-semibold tracking-wider">FIG 03.D // REGENERATIVE CASCADING CYCLES</span>
        <span>REV 2.0</span>
      </div>
      <svg viewBox="0 0 320 160" fill="none" className="w-full h-auto text-slate-300">
        {/* Core Regenerative Closed Cycle */}
        <circle cx="160" cy="75" r="45" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />
        <motion.circle
          cx="160"
          cy="75"
          r="45"
          stroke="#00B4D8"
          strokeWidth="1.8"
          strokeDasharray="60 30"
          initial={{ rotate: 0 }}
          animate={{ rotate: shouldReduceMotion ? 0 : 360 }}
          transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
        />

        {/* Node 1: Primary Process */}
        <g transform="translate(160, 25)">
          <circle cx="0" cy="0" r="14" fill="#0A1628" stroke="#00B4D8" strokeWidth="1.5" />
          <text x="0" y="3" fill="#00B4D8" fontSize="6.5" textAnchor="middle" fontWeight="bold">PROCESS</text>
        </g>

        {/* Node 2: Heat Recovery Cascade */}
        <g transform="translate(210, 85)">
          <circle cx="0" cy="0" r="14" fill="#0A1628" stroke="#00B4D8" strokeWidth="1.5" />
          <text x="0" y="3" fill="#00B4D8" fontSize="6.5" textAnchor="middle" fontWeight="bold">CASCADE</text>
        </g>

        {/* Node 3: Water Reuse ZLD */}
        <g transform="translate(110, 85)">
          <circle cx="0" cy="0" r="14" fill="#0A1628" stroke="#00B4D8" strokeWidth="1.5" />
          <text x="0" y="3" fill="#00B4D8" fontSize="6.5" textAnchor="middle" fontWeight="bold">ZLD REUSE</text>
        </g>

        {/* Central Label */}
        <text x="160" y="73" fill="#F1F5F9" fontSize="8" fontWeight="bold" textAnchor="middle">ZERO WASTE</text>
        <text x="160" y="84" fill="#00B4D8" fontSize="6" textAnchor="middle">CIRCULAR LOOP</text>
      </svg>
      <div className="flex justify-between items-center text-[8px] text-[#94A3B8] border-t border-white/[0.06] pt-1.5 mt-1">
        <span className="text-[#00B4D8] font-bold">FRESHWATER EXTRACTION: -45%</span>
        <span>CARBON EMISSIONS: -32%</span>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT: Interactive 4-Pillar Explorer
// ═════════════════════════════════════════════════════════════════════════
export function BenefitsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const PILLARS = [
    {
      id: "profitability",
      code: "01",
      title: "Profitability",
      headline: "Lower Capex & Opex Through Thermodynamic Optimization",
      desc: "Lower capex through right-sized design and lower opex through sustained energy and water savings.",
      icon: DollarSign,
      metrics: [
        { label: "OPEX REDUCTION", value: "25–30%" },
        { label: "CAPEX RIGHTSIZING", value: "15–20%" },
        { label: "PAYBACK WINDOW", value: "9–14 MONTHS" },
      ],
      bullets: [
        "Eliminates unnecessary safety-margin oversizing in chillers, boilers, and pumps",
        "Directly converts recovered enthalpy and water into cash flow",
        "Reduces facility exposure to utility tariff spikes and peak-demand surcharges",
      ],
      schematic: <ProfitabilitySchematic />,
    },
    {
      id: "growth",
      code: "02",
      title: "Growth",
      headline: "Unlocking Utility Capacity Without Adding Capital Equipment",
      desc: "Freed-up utility capacity and headroom lets you expand output without expanding your energy bill.",
      icon: TrendingUp,
      metrics: [
        { label: "CAPACITY HEADROOM", value: "+28–35%" },
        { label: "OUTPUT EXPANSION", value: "UP TO 40%" },
        { label: "GRID EXTENSION CAPEX", value: "ZERO" },
      ],
      bullets: [
        "Debottlenecks chilled-water loops, steam networks, and effluent treatment limits",
        "Enables plant capacity expansions using existing electrical and fuel feeds",
        "Buffers production lines against peak ambient Gulf summer temperatures",
      ],
      schematic: <GrowthSchematic />,
    },
    {
      id: "excellence",
      code: "03",
      title: "Excellence",
      headline: "Best-in-Class Second-Law Benchmarks & Guaranteed M&V",
      desc: "Best-in-class efficiency benchmarks that strengthen your ESG position and operational resilience.",
      icon: Award,
      metrics: [
        { label: "BENCHMARK η_II", value: "72.4%" },
        { label: "M&V PROTOCOL", value: "IPMVP OPTION C" },
        { label: "GUARANTEE COMPLIANCE", value: "100% CONTRACTUAL" },
      ],
      bullets: [
        "Establishes ASHRAE Level III empirical baseline metering before modification",
        "Automated supervisory telemetry prevents operational efficiency drift",
        "Provides audit-ready data for corporate ESG disclosure and sustainability reporting",
      ],
      schematic: <ExcellenceSchematic />,
    },
    {
      id: "sustainability",
      code: "04",
      title: "Sustainability",
      headline: "Nature-Inspired Closed Cycles That Slash Environmental Impact",
      desc: "Nature-inspired, eco-friendly solutions that reduce emissions, water stress and environmental impact.",
      icon: Leaf,
      metrics: [
        { label: "FRESHWATER CUT", value: "UP TO 45%" },
        { label: "CO2 INTENSITY", value: "-32%" },
        { label: "DISCHARGE REGIME", value: "TOWARDS ZLD" },
      ],
      bullets: [
        "Cascades thermal energy between high-temperature reject and low-temperature needs",
        "Regenerative high-flux RO membranes maximize water recycling and mineral recovery",
        "Directly aligns with UAE Net Zero 2050 and Dubai Clean Energy Strategy milestones",
      ],
      schematic: <SustainabilitySchematic />,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Tab Navigation Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 border border-white/[0.08] bg-[#071120] p-1.5">
        {PILLARS.map((pillar, idx) => {
          const Icon = pillar.icon;
          const isActive = activeTab === idx;

          return (
            <button
              key={pillar.id}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-3 p-3 sm:p-4 text-left transition-all relative ${
                isActive
                  ? "bg-[#0A1628] border border-[#00B4D8]/40 shadow-sm"
                  : "bg-transparent border border-transparent hover:bg-white/[0.02]"
              }`}
            >
              {/* Active top line */}
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#00B4D8]" />
              )}

              <div
                className={`w-8 h-8 rounded-[2px] border flex items-center justify-center shrink-0 ${
                  isActive
                    ? "bg-[#00B4D8]/10 border-[#00B4D8] text-[#00B4D8]"
                    : "border-white/[0.1] text-[#94A3B8]"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div>
                <span className="font-mono text-[9px] text-[#94A3B8] block">
                  PILLAR {pillar.code}
                </span>
                <span className="font-heading text-sm font-semibold text-[#F1F5F9]">
                  {pillar.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Detailed Card */}
      {(() => {
        const current = PILLARS[activeTab];

        return (
          <div className="border border-white/[0.08] bg-[#0A1628] p-6 sm:p-10 relative">
            {/* Corner crosshairs */}
            <span className="absolute top-2 left-2 font-mono text-[9px] text-[#00B4D8] select-none">+</span>
            <span className="absolute top-2 right-2 font-mono text-[9px] text-[#00B4D8] select-none">+</span>
            <span className="absolute bottom-2 left-2 font-mono text-[9px] text-[#00B4D8] select-none">+</span>
            <span className="absolute bottom-2 right-2 font-mono text-[9px] text-[#00B4D8] select-none">+</span>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* LEFT COLUMN: Engineering Specs & Breakdown (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 border border-[#00B4D8]/30 bg-[#00B4D8]/10 font-mono text-[10px] text-[#00B4D8] uppercase tracking-wider">
                  <span>VALUE DISCIPLINE {current.code} // {current.title}</span>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-[#F1F5F9] tracking-tight leading-tight">
                  {current.headline}
                </h3>

                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                  {current.desc}
                </p>

                {/* 3 Metric Badges */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {current.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-3 border border-white/[0.08] bg-[#071120]">
                      <div className="font-mono text-base sm:text-lg font-bold text-[#00B4D8]">
                        {m.value}
                      </div>
                      <div className="font-mono text-[8px] sm:text-[9px] text-[#94A3B8] uppercase tracking-wider mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bullet Points */}
                <div className="space-y-2.5 pt-2">
                  {current.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-[2px] bg-[#00B4D8]/10 border border-[#00B4D8]/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#00B4D8]" />
                      </div>
                      <span className="font-mono text-xs sm:text-sm text-[#F1F5F9]/90 leading-relaxed">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN: Interactive Blueprint Schematic (5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="font-mono text-[10px] text-[#94A3B8] flex items-center justify-between pb-1 border-b border-white/[0.06]">
                  <span className="text-[#00B4D8] uppercase tracking-wider font-semibold">ENGINEERING PROOF</span>
                  <span>IPMVP VERIFIED</span>
                </div>

                {current.schematic}

                <div className="p-3 border border-white/[0.06] bg-[#071120]/60 font-mono text-[10px] text-[#94A3B8] space-y-1">
                  <div className="text-[#F1F5F9] font-medium">CONTRACTUAL ASSURANCE</div>
                  <div className="text-[9px] text-[#94A3B8] leading-normal">
                    Results are verified against baseline data via continuous sub-metering. Performance risk is contractually absorbed by Exergy Solutions.
                  </div>
                </div>
              </div>

            </div>
          </div>
        );
      })()}
    </div>
  );
}
