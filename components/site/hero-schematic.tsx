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
          </defs>

          {/* Background Connecting Fluid Tracks */}
          <path
            d="M 70 135 C 70 75, 150 48, 210 48 C 270 48, 350 75, 350 135 C 350 195, 270 225, 210 225 C 150 225, 70 195, 70 135 Z"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* Animated Main Fluid / Exergy Flow Path */}
          <motion.path
            d="M 70 135 C 70 75, 150 48, 210 48 C 270 48, 350 75, 350 135 C 350 195, 270 225, 210 225 C 150 225, 70 195, 70 135 Z"
            stroke="url(#waterFlow)"
            strokeWidth="4"
            fill="none"
            strokeDasharray="12 8"
            initial={{ strokeDashoffset: 0 }}
            animate={shouldReduceMotion ? {} : { strokeDashoffset: -200 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          {/* Secondary Closed-Loop Recovery Arc */}
          <path
            d="M 330 155 C 310 210, 230 218, 180 205"
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
              cy="135"
              r="32"
              fill="#0A1C30"
              stroke={activeStage === 0 ? "#2C7FB8" : "rgba(44,127,184,0.5)"}
              strokeWidth={activeStage === 0 ? "3" : "1.8"}
              filter={activeStage === 0 ? "url(#glow)" : undefined}
            />
            {/* Water Drop Icon Metaphor */}
            <path
              d="M 70 120 C 64 129, 60 134, 60 140 A 10 10 0 0 0 80 140 C 80 134, 76 129, 70 120 Z"
              fill="#2C7FB8"
            />
            <circle cx="73" cy="136" r="2" fill="#BAE6FD" />

            {/* TEXT CLEARLY BELOW CIRCLE (High Visibility & Legibility) */}
            <text x="70" y="184" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.3">
              RAW FEED
            </text>
            <text x="70" y="197" fill="#93C5FD" fontSize="8.5" fontWeight="600" textAnchor="middle">
              Water &amp; Energy
            </text>
          </g>

          {/* ═════════ 2. CORE INTELLIGENCE (Center Globe) ═════════ */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveStage(1)}
          >
            <circle
              cx="210"
              cy="135"
              r="40"
              fill="#082226"
              stroke={activeStage === 1 ? "#10B981" : "rgba(16,185,129,0.5)"}
              strokeWidth={activeStage === 1 ? "3.5" : "2"}
              filter={activeStage === 1 ? "url(#glow)" : undefined}
            />
            {/* Core Globe Graphic & Star Icon */}
            <circle cx="210" cy="135" r="26" fill="#0E332E" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" />
            <path
              d="M 210 122 L 215 131 L 225 133 L 217 140 L 219 150 L 210 145 L 201 150 L 203 140 L 195 133 L 205 131 Z"
              fill="#10B981"
              opacity="0.95"
            />

            {/* TEXT CLEARLY BELOW GLOBE (Not On Top of the Globe Graphics) */}
            <text x="210" y="188" fill="#FFFFFF" fontSize="11.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.4">
              EXERGY CORE
            </text>
            <text x="210" y="202" fill="#6EE7B7" fontSize="9" fontWeight="600" textAnchor="middle">
              Optimized Process
            </text>
          </g>

          {/* ═════════ 3. OUTPUT NODE (Right) ═════════ */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveStage(2)}
          >
            <circle
              cx="350"
              cy="135"
              r="32"
              fill="#08202E"
              stroke={activeStage === 2 ? "#06B6D4" : "rgba(6,182,212,0.5)"}
              strokeWidth={activeStage === 2 ? "3" : "1.8"}
              filter={activeStage === 2 ? "url(#glow)" : undefined}
            />
            {/* Sparkle / Purity check icon inside */}
            <circle cx="350" cy="135" r="12" fill="#06B6D4" />
            <path d="M 345 135 L 348 138 L 355 131" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

            {/* TEXT CLEARLY BELOW CIRCLE (High Visibility & Legibility) */}
            <text x="350" y="184" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle" letterSpacing="0.3">
              PURE OUTPUT
            </text>
            <text x="350" y="197" fill="#67E8F9" fontSize="8.5" fontWeight="600" textAnchor="middle">
              Potable &amp; Work
            </text>
          </g>

          {/* ═════════ 4. CIRCULAR RECOVERY BADGE (Bottom Center) ═════════ */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveStage(3)}
          >
            <rect
              x="135"
              y="224"
              width="150"
              height="28"
              rx="14"
              fill="#181711"
              stroke={activeStage === 3 ? "#F0A431" : "rgba(240,164,49,0.6)"}
              strokeWidth={activeStage === 3 ? "2" : "1.2"}
            />
            <circle cx="152" cy="238" r="7" fill="#F0A431" />
            <path
              d="M 149 238 A 3 3 0 1 1 155 238"
              stroke="#000000"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <text x="215" y="242" fill="#FDE68A" fontSize="9" fontWeight="bold" textAnchor="middle">
              CIRCULAR RECOVERY
            </text>
          </g>

          {/* Floating Live Metric Badges */}
          <g className="select-none pointer-events-none">
            {/* Top Metric */}
            <rect x="150" y="12" width="120" height="22" rx="11" fill="rgba(16,185,129,0.18)" stroke="rgba(16,185,129,0.4)" />
            <text x="210" y="26" fill="#A7F3D0" fontSize="8.5" fontWeight="bold" textAnchor="middle">
              ⚡ 25–30% Resource Cut
            </text>
          </g>
        </svg>

        {/* Dynamic Stage Explanation Card */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-2.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: stages[activeStage].color }}
            />
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">
                {stages[activeStage].title}
              </div>
              <div className="text-[11px] text-white/80 truncate">
                {stages[activeStage].desc}
              </div>
            </div>
          </div>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
            style={{
              backgroundColor: `${stages[activeStage].color}22`,
              color: stages[activeStage].color,
              border: `1px solid ${stages[activeStage].color}44`,
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
