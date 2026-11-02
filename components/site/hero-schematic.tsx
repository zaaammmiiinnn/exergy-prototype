"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Droplets, Zap, RefreshCw, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

/**
 * EXERGY & WATER OPTIMIZATION SCHEMATIC (USER-FRIENDLY & EXECUTIVE-READY)
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
            Exergy & Water Optimization Loop
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
            d="M 70 140 C 70 80, 150 50, 210 50 C 270 50, 350 80, 350 140 C 350 200, 270 230, 210 230 C 150 230, 70 200, 70 140 Z"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* Animated Main Fluid / Exergy Flow Path */}
          <motion.path
            d="M 70 140 C 70 80, 150 50, 210 50 C 270 50, 350 80, 350 140 C 350 200, 270 230, 210 230 C 150 230, 70 200, 70 140 Z"
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
            d="M 330 160 C 310 215, 230 220, 180 205"
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
              cy="140"
              r="34"
              fill="#0A1C30"
              stroke={activeStage === 0 ? "#2C7FB8" : "rgba(44,127,184,0.4)"}
              strokeWidth={activeStage === 0 ? "3" : "1.5"}
              filter={activeStage === 0 ? "url(#glow)" : undefined}
            />
            {/* Water Drop Icon Metaphor */}
            <path
              d="M 70 124 C 64 133, 60 138, 60 144 A 10 10 0 0 0 80 144 C 80 138, 76 133, 70 124 Z"
              fill="#2C7FB8"
            />
            <text x="70" y="164" fill="#E2E8F0" fontSize="9" fontWeight="bold" textAnchor="middle">
              RAW FEED
            </text>
            <text x="70" y="174" fill="#94A3B8" fontSize="7" textAnchor="middle">
              Water & Energy
            </text>
          </g>

          {/* ═════════ 2. CORE INTELLIGENCE (Center) ═════════ */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveStage(1)}
          >
            <circle
              cx="210"
              cy="140"
              r="44"
              fill="#082226"
              stroke={activeStage === 1 ? "#10B981" : "rgba(16,185,129,0.5)"}
              strokeWidth={activeStage === 1 ? "3.5" : "1.5"}
              filter={activeStage === 1 ? "url(#glow)" : undefined}
            />
            {/* Core icon graphic */}
            <circle cx="210" cy="140" r="28" fill="#0E332E" stroke="#10B981" strokeWidth="1" strokeDasharray="3 3" />
            <path
              d="M 210 125 L 216 135 L 227 137 L 219 145 L 221 156 L 210 150 L 199 156 L 201 145 L 193 137 L 204 135 Z"
              fill="#10B981"
              opacity="0.9"
            />
            <text x="210" y="178" fill="#F0FDF4" fontSize="9.5" fontWeight="bold" textAnchor="middle">
              EXERGY CORE
            </text>
            <text x="210" y="188" fill="#86EFAC" fontSize="7" textAnchor="middle">
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
              cy="140"
              r="34"
              fill="#08202E"
              stroke={activeStage === 2 ? "#06B6D4" : "rgba(6,182,212,0.4)"}
              strokeWidth={activeStage === 2 ? "3" : "1.5"}
              filter={activeStage === 2 ? "url(#glow)" : undefined}
            />
            {/* Sparkle / Purity check icon */}
            <circle cx="350" cy="136" r="10" fill="#06B6D4" />
            <path d="M 346 136 L 349 139 L 355 133" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <text x="350" y="164" fill="#E2E8F0" fontSize="9" fontWeight="bold" textAnchor="middle">
              PURE OUTPUT
            </text>
            <text x="350" y="174" fill="#67E8F9" fontSize="7" textAnchor="middle">
              Potable & Work
            </text>
          </g>

          {/* ═════════ 4. CIRCULAR RECOVERY BADGE (Bottom Center) ═════════ */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveStage(3)}
          >
            <rect
              x="145"
              cy="215"
              y="215"
              width="130"
              height="30"
              rx="15"
              fill="#181711"
              stroke={activeStage === 3 ? "#F0A431" : "rgba(240,164,49,0.5)"}
              strokeWidth={activeStage === 3 ? "2" : "1"}
            />
            <circle cx="162" cy="230" r="7" fill="#F0A431" />
            <path
              d="M 159 230 A 3 3 0 1 1 165 230"
              stroke="#000000"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <text x="214" y="233" fill="#FDE68A" fontSize="8" fontWeight="bold" textAnchor="middle">
              CIRCULAR RECOVERY
            </text>
          </g>

          {/* Floating Live Metric Badges */}
          <g className="select-none pointer-events-none">
            {/* Top Metric */}
            <rect x="150" y="12" width="120" height="22" rx="11" fill="rgba(16,185,129,0.15)" stroke="rgba(16,185,129,0.3)" />
            <text x="210" y="26" fill="#A7F3D0" fontSize="8" fontWeight="bold" textAnchor="middle">
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
              <div className="text-[11px] text-white/70 truncate">
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
          className={`p-2 rounded-xl border text-left transition-all ${
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
          className={`p-2 rounded-xl border text-left transition-all ${
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
          className={`p-2 rounded-xl border text-left transition-all ${
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
