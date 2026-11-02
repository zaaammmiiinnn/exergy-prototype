"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Droplets, Zap, RefreshCw } from "lucide-react";

/**
 * EXERGY & WATER OPTIMIZATION SCHEMATIC
 * - True CIRCULAR chain animation (perfect circle track, not an oval)
 * - Continuous falling water drop dripping animation in the RAW FEED node
 * - Clean high-contrast typography below nodes with protective backdrops to eliminate all line overlap
 * - Generous breathing room in stage explanation card with no text overlap
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
      color: "#10B981",
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
      color: "#F59E0B",
      desc: "Effluent valorisation, mineral extraction, and reject heat cascading back into the cycle.",
      metric: "Zero Liquid Discharge",
    },
  ];

  return (
    <div className="relative w-full max-w-[580px] mx-auto lg:mr-0 lg:ml-auto bg-gradient-to-b from-[#091522]/95 via-[#0A1A2F]/95 to-[#07111E]/95 border border-white/15 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-md overflow-hidden text-white">
      {/* Soft Ambient Background Glows */}
      <div className="absolute -top-16 -left-16 w-52 h-52 bg-[#2C7FB8]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-[#10B981]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-white/95">
            Exergy &amp; Water Optimization Loop
          </span>
        </div>
        <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
          Live Interactive Flow
        </span>
      </div>

      {/* Interactive Diagram SVG Canvas */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.8] rounded-xl bg-slate-950/70 border border-white/10 p-2 sm:p-3 overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 460 280"
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
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#2C7FB8" />
            </linearGradient>
            <radialGradient id="coreGlowGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0B3830" />
              <stop offset="70%" stopColor="#06221D" />
              <stop offset="100%" stopColor="#021411" />
            </radialGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="textShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#000000" floodOpacity="0.95" />
            </filter>
          </defs>

          {/* ═════════ TRUE CIRCULAR FLOW CHAIN (PERFECT CIRCLE, NOT OVAL) ═════════ */}
          {/* Static background circular fluid track */}
          <circle
            cx="230"
            cy="115"
            r="110"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="16"
            fill="none"
          />

          {/* Animated circular dashed fluid chain */}
          <motion.circle
            cx="230"
            cy="115"
            r="110"
            stroke="url(#waterFlow)"
            strokeWidth="3.5"
            fill="none"
            strokeDasharray="14 10"
            initial={{ strokeDashoffset: 0 }}
            animate={shouldReduceMotion ? {} : { strokeDashoffset: -691.15 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />

          {/* Secondary Closed-Loop Recovery Arc (along bottom circle curve) */}
          <path
            d="M 340 115 A 110 110 0 0 1 120 115"
            stroke="url(#circularLoop)"
            strokeWidth="2.5"
            strokeDasharray="5 5"
            fill="none"
          />

          {/* ═════════ 1. INPUT NODE (Left) ═════════ */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveStage(0)}
          >
            {/* Outer Node Circle */}
            <circle
              cx="105"
              cy="115"
              r="28"
              fill="#0A1C30"
              stroke={activeStage === 0 ? "#38BDF8" : "rgba(44,127,184,0.6)"}
              strokeWidth={activeStage === 0 ? "3.5" : "2"}
              filter={activeStage === 0 ? "url(#glow)" : undefined}
            />

            {/* Static Water Droplet Icon in Raw Feed */}
            <path
              d="M 105 101 C 100 108, 96 113, 96 119 A 9 9 0 0 0 114 119 C 114 113, 110 108, 105 101 Z"
              fill="#38BDF8"
            />
            <circle cx="108" cy="117" r="2.2" fill="#FFFFFF" opacity="0.9" />
            <ellipse cx="105" cy="129" rx="14" ry="4" fill="#0369A1" opacity="0.4" />

            {/* Protective Backdrop to guarantee zero line overlap */}
            <rect
              x="45"
              y="148"
              width="120"
              height="32"
              rx="6"
              fill="#07111E"
              opacity="0.9"
            />

            {/* Labels Cleanly Below Circle */}
            <text
              x="105"
              y="161"
              fill="#FFFFFF"
              fontSize="11.5"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="0.8"
              filter="url(#textShadow)"
            >
              RAW FEED
            </text>
            <text
              x="105"
              y="174"
              fill="#38BDF8"
              fontSize="9.5"
              fontWeight="800"
              textAnchor="middle"
              letterSpacing="0.6"
              filter="url(#textShadow)"
            >
              WATER &amp; ENERGY
            </text>
          </g>

          {/* ═════════ 2. CORE INTELLIGENCE (Center Glowing Globe) ═════════ */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveStage(1)}
          >
            {/* Outer Globe Sphere */}
            <circle
              cx="230"
              cy="105"
              r="36"
              fill="url(#coreGlowGradient)"
              stroke={activeStage === 1 ? "#10B981" : "rgba(16,185,129,0.6)"}
              strokeWidth={activeStage === 1 ? "4" : "2.2"}
              filter={activeStage === 1 ? "url(#glow)" : undefined}
            />
            {/* 3D Globe Latitude & Longitude / Meridian Arcs */}
            <ellipse
              cx="230"
              cy="105"
              rx="18"
              ry="34"
              fill="none"
              stroke="#10B981"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              opacity="0.6"
            />
            <ellipse
              cx="230"
              cy="105"
              rx="34"
              ry="14"
              fill="none"
              stroke="#10B981"
              strokeWidth="1.2"
              strokeDasharray="2 3"
              opacity="0.45"
            />
            {/* Center Core Hub & Star Symbol */}
            <circle cx="230" cy="105" r="13" fill="#0E332E" stroke="#10B981" strokeWidth="1.5" />
            <path
              d="M 230 98 L 232 102.5 L 237 103.5 L 233.5 107 L 234.5 112 L 230 109.5 L 225.5 112 L 226.5 107 L 223 103.5 L 228 102.5 Z"
              fill="#10B981"
            />

            {/* Protective Backdrop to guarantee zero line overlap */}
            <rect
              x="145"
              y="146"
              width="170"
              height="35"
              rx="6"
              fill="#07111E"
              opacity="0.9"
            />

            {/* Labels Cleanly Below Center Globe with Generous Clearance */}
            <text
              x="230"
              y="160"
              fill="#FFFFFF"
              fontSize="12.5"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="0.9"
              filter="url(#textShadow)"
            >
              EXERGY CORE
            </text>
            <text
              x="230"
              y="174"
              fill="#34D399"
              fontSize="10"
              fontWeight="800"
              textAnchor="middle"
              letterSpacing="0.6"
              filter="url(#textShadow)"
            >
              OPTIMIZED PROCESS
            </text>
          </g>

          {/* ═════════ 3. OUTPUT NODE (Right) ═════════ */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveStage(2)}
          >
            <circle
              cx="355"
              cy="115"
              r="28"
              fill="#08202E"
              stroke={activeStage === 2 ? "#22D3EE" : "rgba(6,182,212,0.6)"}
              strokeWidth={activeStage === 2 ? "3.5" : "2"}
              filter={activeStage === 2 ? "url(#glow)" : undefined}
            />
            {/* Pure Output Checkmark / Sparkle Icon */}
            <circle cx="355" cy="115" r="11" fill="#06B6D4" />
            <path
              d="M 350 115 L 353 118 L 360 111"
              stroke="#FFFFFF"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Protective Backdrop to guarantee zero line overlap */}
            <rect
              x="295"
              y="148"
              width="120"
              height="32"
              rx="6"
              fill="#07111E"
              opacity="0.9"
            />

            {/* Labels Cleanly Below Circle */}
            <text
              x="355"
              y="161"
              fill="#FFFFFF"
              fontSize="11.5"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="0.8"
              filter="url(#textShadow)"
            >
              PURE OUTPUT
            </text>
            <text
              x="355"
              y="174"
              fill="#22D3EE"
              fontSize="9.5"
              fontWeight="800"
              textAnchor="middle"
              letterSpacing="0.6"
              filter="url(#textShadow)"
            >
              POTABLE &amp; WORK
            </text>
          </g>

          {/* ═════════ 4. CIRCULAR RECOVERY PILL (Bottom Along the Circle) ═════════ */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveStage(3)}
          >
            <rect
              x="145"
              y="212"
              width="170"
              height="34"
              rx="17"
              fill={activeStage === 3 ? "#281A08" : "#140F06"}
              stroke={activeStage === 3 ? "#F59E0B" : "rgba(245,158,11,0.75)"}
              strokeWidth={activeStage === 3 ? "2.5" : "1.8"}
              filter="url(#textShadow)"
            />
            <circle cx="168" cy="229" r="8.5" fill="#F59E0B" />
            <path
              d="M 165 229 A 3.5 3.5 0 1 1 171 229"
              stroke="#000000"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            <text
              x="240"
              y="233"
              fill="#FDE68A"
              fontSize="10.5"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="0.8"
            >
              CIRCULAR RECOVERY
            </text>
          </g>

          {/* Top Live Metric Badge (North on the Circle) */}
          <g className="select-none pointer-events-none">
            <rect
              x="165"
              y="4"
              width="130"
              height="24"
              rx="12"
              fill="rgba(16,185,129,0.22)"
              stroke="rgba(16,185,129,0.5)"
            />
            <text x="230" y="19" fill="#D1FAE5" fontSize="9.5" fontWeight="bold" textAnchor="middle">
              ⚡ 25–30% Resource Cut
            </text>
          </g>
        </svg>
      </div>

      {/* Dynamic Stage Explanation Card (No Overlap, Responsive Flow) */}
      <div className="mt-4 bg-slate-900/85 border border-white/15 rounded-xl p-4 sm:p-5 backdrop-blur-md shadow-lg transition-all duration-300">
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
              style={{ backgroundColor: stages[activeStage].color }}
            />
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-sm sm:text-base font-bold text-white whitespace-nowrap">
                {stages[activeStage].title}
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-white/60 whitespace-nowrap">
                ({stages[activeStage].badge})
              </span>
            </div>
          </div>

          <span
            className="text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full shrink-0 shadow-xs whitespace-nowrap ml-auto"
            style={{
              backgroundColor: `${stages[activeStage].color}25`,
              color: stages[activeStage].color,
              border: `1px solid ${stages[activeStage].color}60`,
            }}
          >
            {stages[activeStage].metric}
          </span>
        </div>

        {/* Description Below with Relaxed Typography */}
        <p className="text-xs sm:text-[13px] text-white/85 font-normal leading-relaxed pt-2.5">
          {stages[activeStage].desc}
        </p>
      </div>

      {/* 3 Interactive KPI Stat Pills Below Diagram */}
      <div className="grid grid-cols-3 gap-2.5 mt-4">
        <button
          onClick={() => setActiveStage(2)}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
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
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            activeStage === 1
              ? "bg-[#10B981]/20 border-[#10B981]/60 shadow-md"
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
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
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
