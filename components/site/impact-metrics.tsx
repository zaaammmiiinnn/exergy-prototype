"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { CountUp } from "@/components/site/count-up";
import { Flame, Zap, Factory, Package, Utensils, Droplets, CheckCircle2 } from "lucide-react";

interface IndustryBar {
  name: string;
  code: string;
  pct: number;
}

const BAR_CHART_DATA: IndustryBar[] = [
  { name: "Oil & Gas", code: "OG", pct: 32 },
  { name: "Power", code: "PW", pct: 28 },
  { name: "Manufacturing", code: "MF", pct: 38 },
  { name: "Paper & Pulp", code: "PP", pct: 42 },
  { name: "Food & Bev", code: "FB", pct: 35 },
  { name: "Water Utilities", code: "WU", pct: 40 },
];

export function ImpactMetrics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();

  // Circular progress calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;

  return (
    <section
      id="impact"
      ref={containerRef}
      className="relative w-full bg-[#0A1628] border-b border-white/[0.08] py-24 sm:py-32"
    >
      {/* Blueprint Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #F1F5F9 1px, transparent 1px), linear-gradient(to bottom, #F1F5F9 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Engineering Corner Annotations */}
      <div className="absolute top-4 left-4 text-white/20 font-mono text-[9px] pointer-events-none hidden sm:block">
        + DATA.ENGINE: M&V LOGS // REGION-GCC
      </div>
      <div className="absolute top-4 right-4 text-white/20 font-mono text-[9px] pointer-events-none hidden sm:block">
        + TELEMETRY: 24/7 STEADY-STATE
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#00B4D8]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#94A3B8] font-medium">
              03 / IMPACT
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#F1F5F9] leading-[1.05] mb-4">
            Measured. Verified.{" "}
            <span className="text-[#00B4D8]">Guaranteed.</span>
          </h2>

          <p className="text-base text-[#94A3B8] max-w-2xl leading-relaxed">
            Industrial efficiency proven through rigorous second-law accounting. Every kilojoule, kilowatt-hour, and cubic meter is tracked against audited operational baselines.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* =========================================================================
              CARD 1 (LARGE, Spans 2 cols on lg): Energy Saved Bar Chart
             ========================================================================= */}
          <div className="lg:col-span-2 p-6 sm:p-8 bg-[#0F1E33] border border-white/[0.08] rounded-[2px] flex flex-col justify-between relative">
            <div>
              {/* Header inside Card */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/[0.08] pb-4 mb-6">
                <div>
                  <span className="font-mono text-[10px] text-[#00B4D8] uppercase tracking-wider block mb-1">
                    PERFORMANCE BENCHMARK // GCC SECTOR AUDITS
                  </span>
                  <div className="font-heading text-2xl sm:text-3xl font-bold text-[#F1F5F9] tracking-tight">
                    <span className="font-mono text-[#00B4D8]">
                      <CountUp to={30} duration={1.2} />–<CountUp to={45} duration={1.2} suffix="%" />
                    </span>{" "}
                    typical energy saved
                  </div>
                </div>
                <div className="font-mono text-xs text-[#94A3B8] text-left sm:text-right">
                  M&V STANDARD: IPMVP PROTOCOL
                </div>
              </div>

              {/* Pure SVG Animated Bar Chart */}
              <div className="w-full pt-2 pb-4">
                <div className="grid grid-cols-6 gap-2 sm:gap-4 items-end h-48 border-b border-white/20 pb-2 relative">
                  
                  {/* Subtle horizontal grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                    <div className="border-b border-dashed border-white/40 w-full" />
                    <div className="border-b border-dashed border-white/40 w-full" />
                    <div className="border-b border-dashed border-white/40 w-full" />
                    <div className="border-b border-dashed border-white/40 w-full" />
                  </div>

                  {BAR_CHART_DATA.map((bar, idx) => {
                    const heightPct = (bar.pct / 50) * 100;
                    return (
                      <div key={bar.code} className="flex flex-col items-center h-full justify-end relative z-10 group">
                        {/* Tooltip on hover / value on top */}
                        <span className="font-mono text-[10px] sm:text-xs text-[#00B4D8] font-bold mb-1.5 opacity-90 group-hover:scale-110 transition-transform">
                          <CountUp to={bar.pct} suffix="%" duration={1.2} />
                        </span>

                        {/* Animated Bar */}
                        <div className="w-full max-w-[42px] bg-[#0A1628] border border-[#00B4D8]/40 h-full flex items-end">
                          <motion.div
                            initial={shouldReduceMotion ? { height: `${heightPct}%` } : { height: 0 }}
                            whileInView={{ height: `${heightPct}%` }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{
                              duration: 0.8,
                              delay: idx * 0.08,
                              ease: [0.25, 0.1, 0.25, 1.0],
                            }}
                            className="w-full bg-gradient-to-t from-[#0077B6] to-[#00B4D8] transition-colors group-hover:brightness-110"
                          />
                        </div>

                        {/* Label bottom */}
                        <div className="mt-3 text-center">
                          <span className="font-mono text-[10px] text-[#94A3B8] font-semibold block uppercase">
                            {bar.code}
                          </span>
                          <span className="font-mono text-[9px] text-[#94A3B8]/60 hidden sm:block truncate max-w-[65px]">
                            {bar.name}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom info strip */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
              <span>SAMPLE: 48 REGIONAL INDUSTRIAL FACILITIES</span>
              <span>VERIFIED AVERAGE: 37.4% REDUCTION</span>
            </div>
          </div>

          {/* =========================================================================
              CARD 2: Circular 100% Turnkey Guarantee
             ========================================================================= */}
          <div className="p-6 sm:p-8 bg-[#0F1E33] border border-white/[0.08] rounded-[2px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-6">
                <span className="font-mono text-[10px] text-[#00B4D8] uppercase tracking-wider">
                  CONTRACTUAL BOND
                </span>
                <span className="font-mono text-[10px] text-[#94A3B8]">METRIC // 02</span>
              </div>

              {/* Animated Progress Ring */}
              <div className="flex flex-col items-center justify-center my-4">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                    {/* Background Ring */}
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="8"
                      fill="none"
                    />
                    {/* Animated Foreground Ring */}
                    <motion.circle
                      cx="80"
                      cy="80"
                      r={radius}
                      stroke="#00B4D8"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      initial={shouldReduceMotion ? { strokeDashoffset: 0 } : { strokeDashoffset: circumference }}
                      whileInView={{ strokeDashoffset: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1.0] }}
                    />
                  </svg>

                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-mono text-3xl font-bold text-[#F1F5F9]">
                      <CountUp to={100} duration={1.4} suffix="%" />
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#00B4D8] font-semibold">
                      GUARANTEED
                    </span>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <h3 className="font-heading text-lg font-bold text-[#F1F5F9]">
                    Turnkey & Guaranteed
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1 max-w-xs leading-relaxed">
                    Full EPC execution with savings contractually underwritten against your audited baseline.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-center gap-2 text-[10px] font-mono text-[#00B4D8]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>ZERO CAPEX PENALTY GUARANTEE</span>
            </div>
          </div>

          {/* =========================================================================
              CARD 3: 12-Month Payback Line Chart
             ========================================================================= */}
          <div className="p-6 sm:p-8 bg-[#0F1E33] border border-white/[0.08] rounded-[2px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-5">
                <span className="font-mono text-[10px] text-[#00B4D8] uppercase tracking-wider">
                  FINANCIAL AMORTIZATION
                </span>
                <span className="font-mono text-[10px] text-[#94A3B8]">METRIC // 03</span>
              </div>

              <div>
                <div className="font-heading text-2xl font-bold text-[#F1F5F9] mb-1">
                  <span className="font-mono text-[#00B4D8]">
                    <CountUp to={12} duration={1.2} suffix="-month" />
                  </span>{" "}
                  average payback
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
                  Cumulative net energy savings amortize total equipment & engineering investment within year one.
                </p>
              </div>

              {/* Pure SVG Animated ROI Line Chart */}
              <div className="w-full bg-[#071120] border border-white/[0.08] p-3 mb-2 font-mono text-[9px]">
                <div className="flex justify-between text-[#94A3B8]/60 mb-2">
                  <span>CUMULATIVE NET CASHFLOW</span>
                  <span className="text-[#00B4D8]">BREAKEVEN: M.12</span>
                </div>
                <svg viewBox="0 0 300 110" className="w-full h-auto overflow-visible">
                  {/* Zero axis */}
                  <line x1="20" y1="75" x2="290" y2="75" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
                  <text x="15" y="77" fill="#94A3B8" fontSize="7" textAnchor="end">0</text>
                  
                  {/* Negative capex dip & recovery curve */}
                  <motion.path
                    d="M 20 75 Q 70 100 130 85 T 220 35 T 290 15"
                    fill="none"
                    stroke="#00B4D8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1.0] }}
                  />

                  {/* Shaded area underneath positive return */}
                  <path
                    d="M 170 75 Q 220 35 290 15 L 290 75 Z"
                    fill="url(#roi-glow)"
                    opacity="0.25"
                  />
                  <defs>
                    <linearGradient id="roi-glow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00B4D8" />
                      <stop offset="100%" stopColor="#00B4D8" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Breakeven Marker dot */}
                  <circle cx="170" cy="75" r="3.5" fill="#00B4D8" />
                  <text x="170" y="92" fill="#F1F5F9" fontSize="7" textAnchor="middle">PAYBACK</text>
                </svg>
                <div className="flex justify-between text-[8px] text-[#94A3B8]/50 mt-1">
                  <span>M0 (CAPEX)</span>
                  <span>M6</span>
                  <span>M12</span>
                  <span>M24 (+180% ROI)</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.06] text-[10px] font-mono text-[#94A3B8]">
              IRR ESTIMATE: 44–72% ANNUALIZED
            </div>
          </div>

          {/* =========================================================================
              CARD 4 (Large on Tablet / 2-Col on lg or spans 2 cols): 6 Industries
             ========================================================================= */}
          <div className="lg:col-span-2 p-6 sm:p-8 bg-[#0F1E33] border border-white/[0.08] rounded-[2px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-6">
                <span className="font-mono text-[10px] text-[#00B4D8] uppercase tracking-wider">
                  INDUSTRIAL PORTFOLIO
                </span>
                <span className="font-mono text-[10px] text-[#94A3B8]">METRIC // 04</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
                <div>
                  <div className="font-heading text-3xl sm:text-4xl font-bold text-[#F1F5F9]">
                    <span className="font-mono text-[#00B4D8]">
                      <CountUp to={6} duration={1.0} />
                    </span>{" "}
                    Industries Served
                  </div>
                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 max-w-xl leading-relaxed">
                    Heavy thermal, steam, cooling, and water-intensive industrial assets across the UAE and broader GCC region.
                  </p>
                </div>
              </div>

              {/* 6 Icons & Labels Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { name: "Oil & Gas", icon: Flame, spec: "Upstream & Refineries" },
                  { name: "Power", icon: Zap, spec: "Cogen & Turbines" },
                  { name: "Manufacturing", icon: Factory, spec: "Steel & Cement" },
                  { name: "Paper & Pulp", icon: Package, spec: "Drying & Steam" },
                  { name: "Food & Bev", icon: Utensils, spec: "Chilled Utilities" },
                  { name: "Water Utilities", icon: Droplets, spec: "RO & Desalination" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.name}
                      className="p-3 bg-[#0A1628] border border-white/[0.08] rounded-[2px] flex flex-col justify-between hover:border-[#00B4D8]/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[9px] text-[#94A3B8]">0{i + 1}</span>
                        <Icon className="w-4 h-4 text-[#00B4D8]" />
                      </div>
                      <div>
                        <div className="font-mono text-xs font-bold text-[#F1F5F9] truncate">
                          {item.name}
                        </div>
                        <div className="font-mono text-[9px] text-[#94A3B8]/60 truncate mt-0.5">
                          {item.spec}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
              <span>APPLICATIONS: HEATING · COOLING · DRYING · WATER QUALITY · PINCH</span>
              <span>COVERAGE: UAE / SAUDI / OMAN</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
