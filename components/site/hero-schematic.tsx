"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Droplets, Zap, RefreshCw } from "lucide-react";

/**
 * EXACT EXERGY & WATER OPTIMIZATION SCHEMATIC (ORIGINAL OVAL DESIGN)
 * Restored to original design with high-contrast text positioned clearly below the circles.
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
      color: "#2C7FB8",
      desc: "Untreated raw water, seawater, or municipal effluent alongside primary utility power.",
      metric: "Baseline Demand",
    },
    {
      id: 1,
      title: "2. Exergy & Water Core",
      badge: "Smart Optimization",
      color: "#10B981",
      desc: "Second-law thermodynamic optimization paired with isobaric membrane desalination and filtration.",
      metric: "Max Work Potential",
    },
    {
      id: 2,
      title: "3. Ultra-Pure Output",
      badge: "High-Value Yield",
      color: "#06B6D4",
      desc: "High-purity industrial & potable water plus maximized useful thermal and electrical work.",
      metric: "98% Purity & Efficiency",
    },
    {
      id: 3,
      title: "4. Circular Resource Loop",
      badge: "Zero Waste Recovery",
      color: "#F0A431",
      desc: "Effluent valorisation, mineral extraction, and reject heat cascading back into the cycle.",
      metric: "Zero Liquid Discharge",
    },
  ];

  return (
    <div className="relative w-full max-w-[500px] mx-auto bg-gradient-to-b from-[#091522]/95 via-[#0A1A2F]/95 to-[#07111E]/95 border border-white/15 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-md overflow-hidden text-white">
      {/* Soft Ambient Glows */}
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-[#2C7FB8]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-[#10B981]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-white/90">
            Exergy &amp; Water Optimization Loop
          </span>
        </div>
        <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
          Live Interactive Flow
        </span>
      </div>

      {/* Interactive Diagram SVG */}
      <div className="relative w-full aspect-[4/3] rounded-xl bg-slate-950/60 border border-white/10 p-2 sm:p-3 overflow-hidden flex flex-col justify-between">
        <svg
          viewBox="0 0 420 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full select-none"
        >
          <defs>
            <linearGradient id="waterFlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2C7FB8" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="circularLoop" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#F0A431" />
              <stop offset="100%" stopColor="#2C7FB8" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="badgeShadow" x="-15%" y="-15%" width="130%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.85" />
            </filter>
          </defs>

          {/* Background Connecting Fluid Tracks */}
          <path
            d="M 70 128 C 70 70, 150 44, 210 44 C 270 44, 350 70, 350 128 C 350 186, 270 216, 210 216 C 150 216, 70 186, 70 128 Z"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Animated Main Fluid / Exergy Flow Path */}
          <motion.path
            d="M 70 128 C 70 70, 150 44, 210 44 C 270 44, 350 70, 350 128 C 350 186, 270 216, 210 216 C 150 216, 70 186, 70 128 Z"
            stroke="url(#waterFlow)"
            strokeWidth="3.5"
            fill="none"
            strokeDasharray="12 8"
            initial={{ strokeDashoffset: 0 }}
            animate={shouldReduceMotion ? {} : { strokeDashoffset: -200 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          {/* Secondary Closed-Loop Recovery Arc */}
          <path
            d="M 330 148 C 310 200, 230 210, 180 198"
            stroke="url(#circularLoop)"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            fill="none"
          />

          {/* ═════════ 1. INPUT NODE (Left) ═════════ */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveStage(0)}
          >
            <circle
              cx="70"
              cy="124"
              r="30"
              fill="#0A1C30"
              stroke={activeStage === 0 ? "#2C7FB8" : "rgba(44,127,184,0.7)"}
              strokeWidth={activeStage === 0 ? "3.5" : "2"}
              filter={activeStage === 0 ? "url(#glow)" : undefined}
            />
            {/* Water Drop Icon Metaphor */}
            <path
              d="M 70 110 C 64 119, 60 124, 60 129 A 10 10 0 0 0 80 129 C 80 124, 76 119, 70 110 Z"
              fill="#2C7FB8"
            />
            <circle cx="73" cy="125" r="2" fill="#BAE6FD" />

            {/* High-Contrast Badge Shield & ALL-CAPS Text (100% Bold & Visible) */}
            <rect
              x="6"
              y="164"
              width="128"
              height="44"
              rx="9"
              fill={activeStage === 0 ? "#08223B" : "#041424"}
              stroke={activeStage === 0 ? "#38BDF8" : "rgba(56,189,248,0.8)"}
              strokeWidth={activeStage === 0 ? "2.5" : "1.8"}
              filter="url(#badgeShadow)"
            />
            <text x="70" y="180" fill="#FFFFFF" fontSize="12.5" fontWeight="900" textAnchor="middle" letterSpacing="0.8">
              RAW FEED
            </text>
            <text x="70" y="197" fill="#38BDF8" fontSize="11" fontWeight="900" textAnchor="middle" letterSpacing="0.7">
              WATER &amp; ENERGY
            </text>
          </g>

          {/* ═════════ 2. CORE INTELLIGENCE (Center Globe) ═════════ */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveStage(1)}
          >
            <circle
              cx="210"
              cy="124"
              r="38"
              fill="#082226"
              stroke={activeStage === 1 ? "#10B981" : "rgba(16,185,129,0.7)"}
              strokeWidth={activeStage === 1 ? "4" : "2.2"}
              filter={activeStage === 1 ? "url(#glow)" : undefined}
            />
            {/* Core Globe Graphic & Star Icon */}
            <circle cx="210" cy="124" r="24" fill="#0E332E" stroke="#10B981" strokeWidth="1.2" strokeDasharray="3 3" />
            <path
              d="M 210 112 L 215 120 L 224 122 L 217 129 L 219 138 L 210 133 L 201 138 L 203 129 L 196 122 L 205 120 Z"
              fill="#10B981"
              opacity="0.95"
            />

            {/* High-Contrast Badge Shield & ALL-CAPS Text (100% Bold & Visible) */}
            <rect
              x="138"
              y="170"
              width="144"
              height="44"
              rx="9"
              fill={activeStage === 1 ? "#062A22" : "#031C16"}
              stroke={activeStage === 1 ? "#34D399" : "rgba(52,211,153,0.8)"}
              strokeWidth={activeStage === 1 ? "2.5" : "1.8"}
              filter="url(#badgeShadow)"
            />
            <text x="210" y="186" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle" letterSpacing="0.8">
              EXERGY CORE
            </text>
            <text x="210" y="203" fill="#34D399" fontSize="11" fontWeight="900" textAnchor="middle" letterSpacing="0.7">
              OPTIMIZED PROCESS
            </text>
          </g>

          {/* ═════════ 3. OUTPUT NODE (Right) ═════════ */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveStage(2)}
          >
            <circle
              cx="350"
              cy="124"
              r="30"
              fill="#08202E"
              stroke={activeStage === 2 ? "#06B6D4" : "rgba(6,182,212,0.7)"}
              strokeWidth={activeStage === 2 ? "3.5" : "2"}
              filter={activeStage === 2 ? "url(#glow)" : undefined}
            />
            {/* Sparkle / Purity check icon inside */}
            <circle cx="350" cy="124" r="12" fill="#06B6D4" />
            <path d="M 345 124 L 348 127 L 355 120" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

            {/* High-Contrast Badge Shield & ALL-CAPS Text (100% Bold & Visible) */}
            <rect
              x="286"
              y="164"
              width="128"
              height="44"
              rx="9"
              fill={activeStage === 2 ? "#07293B" : "#031826"}
              stroke={activeStage === 2 ? "#22D3EE" : "rgba(34,211,238,0.8)"}
              strokeWidth={activeStage === 2 ? "2.5" : "1.8"}
              filter="url(#badgeShadow)"
            />
            <text x="350" y="180" fill="#FFFFFF" fontSize="12.5" fontWeight="900" textAnchor="middle" letterSpacing="0.8">
              PURE OUTPUT
            </text>
            <text x="350" y="197" fill="#22D3EE" fontSize="11" fontWeight="900" textAnchor="middle" letterSpacing="0.7">
              POTABLE &amp; WORK
            </text>
          </g>

          {/* ═════════ 4. CIRCULAR RECOVERY BADGE (Bottom Center) ═════════ */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveStage(3)}
          >
            <rect
              x="115"
              y="222"
              width="190"
              height="36"
              rx="18"
              fill={activeStage === 3 ? "#281A08" : "#140F06"}
              stroke={activeStage === 3 ? "#F59E0B" : "rgba(240,164,49,0.85)"}
              strokeWidth={activeStage === 3 ? "2.5" : "1.8"}
              filter="url(#badgeShadow)"
            />
            <circle cx="138" cy="240" r="9" fill="#F0A431" />
            <path
              d="M 135 240 A 3.5 3.5 0 1 1 141 240"
              stroke="#000000"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            <text x="214" y="244" fill="#FDE68A" fontSize="11" fontWeight="900" textAnchor="middle" letterSpacing="0.8">
              CIRCULAR RECOVERY
            </text>
          </g>

          {/* Floating Live Metric Badges */}
          <g className="select-none pointer-events-none">
            {/* Top Metric */}
            <rect x="145" y="10" width="130" height="24" rx="12" fill="rgba(16,185,129,0.22)" stroke="rgba(16,185,129,0.5)" />
            <text x="210" y="25" fill="#D1FAE5" fontSize="9.5" fontWeight="bold" textAnchor="middle">
              ⚡ 25–30% Resource Cut
            </text>
          </g>
        </svg>

        {/* Dynamic Stage Explanation Card (Non-Truncating & Full High Contrast) */}
        <div className="bg-slate-900/90 border border-white/15 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 backdrop-blur-md mt-2">
          <div className="flex items-start sm:items-center gap-3 min-w-0">
            <span
              className="w-3 h-3 rounded-full shrink-0 mt-0.5 sm:mt-0 shadow-sm"
              style={{ backgroundColor: stages[activeStage].color }}
            />
            <div>
              <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <span>{stages[activeStage].title}</span>
                <span className="text-[10px] font-medium text-white/70">({stages[activeStage].badge})</span>
              </div>
              <p className="text-xs text-white/90 font-normal leading-snug mt-0.5">
                {stages[activeStage].desc}
              </p>
            </div>
          </div>
          <span
            className="text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 self-start sm:self-center shadow-xs whitespace-nowrap"
            style={{
              backgroundColor: `${stages[activeStage].color}25`,
              color: stages[activeStage].color,
              border: `1px solid ${stages[activeStage].color}60`,
            }}
          >
            {stages[activeStage].metric}
          </span>
        </div>
      </div>

      {/* 3 Interactive KPI Stat Pills Below Diagram */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        <button
          onClick={() => setActiveStage(2)}
          className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
            activeStage === 2
              ? "bg-[#06B6D4]/15 border-[#06B6D4]/40"
              : "bg-white/5 border-white/10 hover:bg-white/10"
          }`}
        >
          <div className="text-[10px] text-cyan-300 font-medium flex items-center gap-1">
            <Droplets className="w-3 h-3" /> Water Recovery
          </div>
          <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">
            Up to 98%
          </div>
        </button>

        <button
          onClick={() => setActiveStage(1)}
          className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
            activeStage === 1
              ? "bg-[#10B981]/15 border-[#10B981]/40"
              : "bg-white/5 border-white/10 hover:bg-white/10"
          }`}
        >
          <div className="text-[10px] text-emerald-300 font-medium flex items-center gap-1">
            <Zap className="w-3 h-3" /> Exergy Savings
          </div>
          <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">
            25–30%
          </div>
        </button>

        <button
          onClick={() => setActiveStage(3)}
          className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
            activeStage === 3
              ? "bg-[#F0A431]/15 border-[#F0A431]/40"
              : "bg-white/5 border-white/10 hover:bg-white/10"
          }`}
        >
          <div className="text-[10px] text-amber-300 font-medium flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> Circular ZLD
          </div>
          <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">
            Zero Liquid
          </div>
        </button>
      </div>
    </div>
  );
}
