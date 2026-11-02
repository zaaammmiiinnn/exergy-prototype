"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Droplets, Zap, RefreshCw, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

/**
 * EXERGY & WATER OPTIMIZATION SCHEMATIC (USER-FRIENDLY & HIGH-CONTRAST)
 * Brand Palette:
 * - Electric Cerulean Blue: #2C7FB8
 * - Deep Marine Teal:       #0E4A4F
 * - Emerald Green:          #10B981 / #30a66a
 * - Golden Amber Accent:    #F0A431
 */
export function HeroSchematic() {
  const shouldReduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState<number>(1); // 0: Input, 1: Core, 2: Output, 3: Circular Loop

  const stages = [
    {
      id: 0,
      title: "1. Raw Resource Inflow",
      badge: "Feed Streams",
      color: "#38BDF8",
      desc: "Untreated raw water, seawater, or industrial effluent alongside primary utility power.",
      metric: "Baseline Demand",
    },
    {
      id: 1,
      title: "2. Exergy & Water Core",
      badge: "Smart Optimization",
      color: "#34D399",
      desc: "Second-law thermodynamic optimization paired with isobaric membrane desalination and filtration.",
      metric: "Max Work Potential",
    },
    {
      id: 2,
      title: "3. Ultra-Pure Output",
      badge: "High-Value Yield",
      color: "#22D3EE",
      desc: "High-purity industrial & potable water plus maximized useful thermal and electrical work.",
      metric: "98% Purity & Efficiency",
    },
    {
      id: 3,
      title: "4. Circular Resource Loop",
      badge: "Zero Waste Recovery",
      color: "#FBBF24",
      desc: "Effluent valorisation, mineral extraction, and reject heat cascading back into the cycle.",
      metric: "Zero Liquid Discharge",
    },
  ];

  return (
    <div className="relative w-full max-w-[520px] mx-auto bg-gradient-to-b from-[#0B192C] via-[#0E2238] to-[#081422] border border-white/20 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-md overflow-hidden text-white">
      {/* Soft Ambient Background Glows */}
      <div className="absolute -top-16 -left-16 w-52 h-52 bg-[#2C7FB8]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-[#10B981]/25 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse shadow-sm shadow-emerald-400/50" />
          <span className="text-sm font-bold tracking-wide text-white">
            Exergy &amp; Water Optimization Loop
          </span>
        </div>
        <span className="text-xs font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 rounded-full">
          Live Interactive Flow
        </span>
      </div>

      {/* Interactive Diagram SVG */}
      <div className="relative w-full aspect-[4/3] rounded-xl bg-slate-950/80 border border-white/15 p-2 sm:p-3 overflow-hidden flex flex-col justify-between">
        <svg
          viewBox="0 0 440 270"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full select-none"
        >
          <defs>
            <linearGradient id="forwardStream" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="50%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
            <linearGradient id="returnLoop" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
            <filter id="coreGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Top Metric Header Pill */}
          <g className="select-none pointer-events-none">
            <rect x="155" y="8" width="130" height="24" rx="12" fill="rgba(16,185,129,0.2)" stroke="rgba(52,211,153,0.5)" strokeWidth="1.2" />
            <text x="220" y="24" fill="#6EE7B7" fontSize="10.5" fontWeight="bold" textAnchor="middle">
              ⚡ 25–30% Resource Cut
            </text>
          </g>

          {/* ═══════════ CONNECTING FLOW PATHS ═══════════ */}
          {/* Forward Process Flow Path (Through centers: 75 -> 220 -> 365 at y=95) */}
          <path
            d="M 75 95 Q 220 50 365 95"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <motion.path
            d="M 75 95 Q 220 50 365 95"
            stroke="url(#forwardStream)"
            strokeWidth="4"
            strokeDasharray="10 6"
            fill="none"
            initial={{ strokeDashoffset: 0 }}
            animate={shouldReduceMotion ? {} : { strokeDashoffset: -160 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          {/* Circular Return Stream (Sweeps from Right Node -> Down through y=215 -> Back to Left Node) */}
          <path
            d="M 365 110 C 365 210, 290 225, 220 225 C 150 225, 75 210, 75 110"
            stroke="rgba(245,158,11,0.2)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <motion.path
            d="M 365 110 C 365 210, 290 225, 220 225 C 150 225, 75 210, 75 110"
            stroke="url(#returnLoop)"
            strokeWidth="3"
            strokeDasharray="8 6"
            fill="none"
            initial={{ strokeDashoffset: 0 }}
            animate={shouldReduceMotion ? {} : { strokeDashoffset: 140 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />

          {/* ═════════ 1. LEFT NODE: RAW FEED ═════════ */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveStage(0)}
          >
            {/* Outer Glow Ring */}
            <circle
              cx="75"
              cy="95"
              r="30"
              fill="#0B233A"
              stroke={activeStage === 0 ? "#38BDF8" : "rgba(56,189,248,0.5)"}
              strokeWidth={activeStage === 0 ? "3" : "2"}
              filter={activeStage === 0 ? "url(#nodeGlow)" : undefined}
            />
            {/* Water Droplet Graphic inside the circle */}
            <path
              d="M 75 80 C 70 88, 66 93, 66 98 A 9 9 0 0 0 84 98 C 84 93, 80 88, 75 80 Z"
              fill="#38BDF8"
            />
            <circle cx="78" cy="94" r="2.5" fill="#BAE6FD" />

            {/* TEXT CLEARLY BELOW CIRCLE (High Contrast & Visible) */}
            <text x="75" y="142" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="0.4">
              RAW FEED
            </text>
            <text x="75" y="157" fill="#93C5FD" fontSize="10" fontWeight="600" textAnchor="middle">
              Water &amp; Energy
            </text>
          </g>

          {/* ═════════ 2. CENTER NODE: EXERGY CORE GLOBE ═════════ */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveStage(1)}
          >
            {/* Outer Pulsing Aura */}
            <circle
              cx="220"
              cy="95"
              r="40"
              fill="#062F28"
              stroke={activeStage === 1 ? "#34D399" : "rgba(52,211,153,0.6)"}
              strokeWidth={activeStage === 1 ? "3.5" : "2"}
              filter={activeStage === 1 ? "url(#coreGlow)" : undefined}
            />
            {/* Inner Globe Mesh & Star Icon (Uncluttered) */}
            <circle cx="220" cy="95" r="26" fill="#0C4A3E" stroke="#34D399" strokeWidth="1.2" strokeDasharray="3 3" />
            <path
              d="M 220 82 L 225 91 L 235 93 L 227 100 L 229 110 L 220 105 L 211 110 L 213 100 L 205 93 L 215 91 Z"
              fill="#34D399"
            />

            {/* TEXT CLEARLY BELOW GLOBE (High Contrast & Visible) */}
            <text x="220" y="152" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle" letterSpacing="0.4">
              EXERGY CORE
            </text>
            <text x="220" y="168" fill="#6EE7B7" fontSize="10.5" fontWeight="600" textAnchor="middle">
              Smart Optimization
            </text>
          </g>

          {/* ═════════ 3. RIGHT NODE: PURE OUTPUT ═════════ */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveStage(2)}
          >
            {/* Outer Glow Ring */}
            <circle
              cx="365"
              cy="95"
              r="30"
              fill="#082A3A"
              stroke={activeStage === 2 ? "#22D3EE" : "rgba(34,211,238,0.5)"}
              strokeWidth={activeStage === 2 ? "3" : "2"}
              filter={activeStage === 2 ? "url(#nodeGlow)" : undefined}
            />
            {/* Clean Checkmark Badge Graphic inside circle */}
            <circle cx="365" cy="95" r="14" fill="#0E7490" />
            <path
              d="M 359 95 L 363 99 L 371 91"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* TEXT CLEARLY BELOW CIRCLE (High Contrast & Visible) */}
            <text x="365" y="142" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="0.4">
              PURE OUTPUT
            </text>
            <text x="365" y="157" fill="#67E8F9" fontSize="10" fontWeight="600" textAnchor="middle">
              Potable &amp; Work
            </text>
          </g>

          {/* ═════════ 4. BOTTOM CIRCULAR RECOVERY PILL ═════════ */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveStage(3)}
          >
            <rect
              x="125"
              y="204"
              width="190"
              height="34"
              rx="17"
              fill="#1F1A0B"
              stroke={activeStage === 3 ? "#F59E0B" : "rgba(245,158,11,0.6)"}
              strokeWidth={activeStage === 3 ? "2.5" : "1.5"}
            />
            <circle cx="145" cy="221" r="9" fill="#D97706" />
            <path
              d="M 142 221 A 4 4 0 1 1 148 221"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            <text x="230" y="219" fill="#FEF3C7" fontSize="11" fontWeight="bold" textAnchor="middle">
              CIRCULAR RECOVERY
            </text>
            <text x="230" y="231" fill="#FBBF24" fontSize="8.5" fontWeight="600" textAnchor="middle">
              Zero Liquid Discharge (ZLD)
            </text>
          </g>
        </svg>

        {/* Dynamic Stage Explanation Card (High Contrast) */}
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
              style={{ backgroundColor: stages[activeStage].color }}
            />
            <div className="truncate">
              <div className="text-sm font-bold text-white truncate">
                {stages[activeStage].title}
              </div>
              <div className="text-xs text-slate-300 font-medium truncate mt-0.5">
                {stages[activeStage].desc}
              </div>
            </div>
          </div>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
            style={{
              backgroundColor: `${stages[activeStage].color}25`,
              color: stages[activeStage].color,
              border: `1px solid ${stages[activeStage].color}50`,
            }}
          >
            {stages[activeStage].metric}
          </span>
        </div>
      </div>

      {/* 3 Interactive KPI Stat Pills Below Diagram */}
      <div className="grid grid-cols-3 gap-2.5 mt-4">
        <button
          onClick={() => setActiveStage(2)}
          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
            activeStage === 2
              ? "bg-[#22D3EE]/20 border-[#22D3EE]/60 shadow-md"
              : "bg-white/5 border-white/10 hover:bg-white/10"
          }`}
        >
          <div className="text-xs text-cyan-300 font-semibold flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5" /> Water Recovery
          </div>
          <div className="text-sm sm:text-base font-extrabold text-white mt-1">
            Up to 98%
          </div>
        </button>

        <button
          onClick={() => setActiveStage(1)}
          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
            activeStage === 1
              ? "bg-[#34D399]/20 border-[#34D399]/60 shadow-md"
              : "bg-white/5 border-white/10 hover:bg-white/10"
          }`}
        >
          <div className="text-xs text-emerald-300 font-semibold flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Exergy Savings
          </div>
          <div className="text-sm sm:text-base font-extrabold text-white mt-1">
            25–30%
          </div>
        </button>

        <button
          onClick={() => setActiveStage(3)}
          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
            activeStage === 3
              ? "bg-[#F59E0B]/20 border-[#F59E0B]/60 shadow-md"
              : "bg-white/5 border-white/10 hover:bg-white/10"
          }`}
        >
          <div className="text-xs text-amber-300 font-semibold flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" /> Circular ZLD
          </div>
          <div className="text-sm sm:text-base font-extrabold text-white mt-1">
            Zero Liquid
          </div>
        </button>
      </div>
    </div>
  );
}
