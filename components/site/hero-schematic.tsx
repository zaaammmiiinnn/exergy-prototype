"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Droplets, Zap, RefreshCw } from "lucide-react";

/**
 * EXERGY & WATER OPTIMIZATION SCHEMATIC (ORIGINAL GLOBE & CLEAN HIGH-CONTRAST DESIGN)
 * Restored original glowing globe aesthetic without clunky box frames.
 * Labels positioned cleanly below circles in bold uppercase for maximum legibility.
 * Generous breathing room for the stage explanation card.
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
    <div className="relative w-full max-w-[580px] mx-auto bg-gradient-to-b from-[#091522]/95 via-[#0A1A2F]/95 to-[#07111E]/95 border border-white/15 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-md overflow-hidden text-white">
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
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-xl bg-slate-950/70 border border-white/10 p-2 sm:p-3 overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 460 250"
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

          {/* Background Connecting Fluid Tracks */}
          <path
            d="M 70 100 C 70 45, 150 28, 230 28 C 310 28, 390 45, 390 100 C 390 155, 310 195, 230 195 C 150 195, 70 155, 70 100 Z"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Animated Main Fluid / Exergy Flow Path */}
          <motion.path
            d="M 70 100 C 70 45, 150 28, 230 28 C 310 28, 390 45, 390 100 C 390 155, 310 195, 230 195 C 150 195, 70 155, 70 100 Z"
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
            d="M 370 120 C 350 175, 270 195, 230 195 C 190 195, 110 175, 90 120"
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
              cy="100"
              r="34"
              fill="#0A1C30"
              stroke={activeStage === 0 ? "#38BDF8" : "rgba(44,127,184,0.6)"}
              strokeWidth={activeStage === 0 ? "3.5" : "2"}
              filter={activeStage === 0 ? "url(#glow)" : undefined}
            />
            {/* Water Drop Icon Metaphor */}
            <path
              d="M 70 85 C 63 95, 59 101, 59 107 A 11 11 0 0 0 81 107 C 81 101, 77 95, 70 85 Z"
              fill="#2C7FB8"
            />
            <circle cx="73.5" cy="103" r="2.2" fill="#BAE6FD" />

            {/* Labels Cleanly Below Circle (No Box Frame, High Contrast All-Caps) */}
            <text
              x="70"
              y="152"
              fill="#FFFFFF"
              fontSize="12"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="0.8"
              filter="url(#textShadow)"
            >
              RAW FEED
            </text>
            <text
              x="70"
              y="167"
              fill="#38BDF8"
              fontSize="10"
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
              cy="100"
              r="44"
              fill="url(#coreGlowGradient)"
              stroke={activeStage === 1 ? "#10B981" : "rgba(16,185,129,0.6)"}
              strokeWidth={activeStage === 1 ? "4" : "2.2"}
              filter={activeStage === 1 ? "url(#glow)" : undefined}
            />
            {/* 3D Globe Latitude & Longitude / Meridian Arcs */}
            <ellipse
              cx="230"
              cy="100"
              rx="22"
              ry="41"
              fill="none"
              stroke="#10B981"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              opacity="0.6"
            />
            <ellipse
              cx="230"
              cy="100"
              rx="41"
              ry="16"
              fill="none"
              stroke="#10B981"
              strokeWidth="1.2"
              strokeDasharray="2 3"
              opacity="0.45"
            />
            {/* Center Core Hub & Star Symbol */}
            <circle cx="230" cy="100" r="15" fill="#0E332E" stroke="#10B981" strokeWidth="1.5" />
            <path
              d="M 230 92 L 232.5 97.5 L 238.5 98.5 L 234 102.5 L 235.5 108.5 L 230 105.5 L 224.5 108.5 L 226 102.5 L 221.5 98.5 L 227.5 97.5 Z"
              fill="#10B981"
            />

            {/* Labels Cleanly Below Center Globe (No Box Frame, High Contrast All-Caps) */}
            <text
              x="230"
              y="164"
              fill="#FFFFFF"
              fontSize="13.5"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="0.9"
              filter="url(#textShadow)"
            >
              EXERGY CORE
            </text>
            <text
              x="230"
              y="180"
              fill="#34D399"
              fontSize="10.5"
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
              cx="390"
              cy="100"
              r="34"
              fill="#08202E"
              stroke={activeStage === 2 ? "#22D3EE" : "rgba(6,182,212,0.6)"}
              strokeWidth={activeStage === 2 ? "3.5" : "2"}
              filter={activeStage === 2 ? "url(#glow)" : undefined}
            />
            {/* Pure Output Checkmark / Sparkle Icon */}
            <circle cx="390" cy="100" r="13" fill="#06B6D4" />
            <path
              d="M 384 100 L 388 104 L 396 95"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Labels Cleanly Below Circle (No Box Frame, High Contrast All-Caps) */}
            <text
              x="390"
              y="152"
              fill="#FFFFFF"
              fontSize="12"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="0.8"
              filter="url(#textShadow)"
            >
              PURE OUTPUT
            </text>
            <text
              x="390"
              y="167"
              fill="#22D3EE"
              fontSize="10"
              fontWeight="800"
              textAnchor="middle"
              letterSpacing="0.6"
              filter="url(#textShadow)"
            >
              POTABLE &amp; WORK
            </text>
          </g>

          {/* ═════════ 4. CIRCULAR RECOVERY PILL (Bottom Center) ═════════ */}
          <g
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setActiveStage(3)}
          >
            <rect
              x="135"
              y="204"
              width="190"
              height="34"
              rx="17"
              fill={activeStage === 3 ? "#281A08" : "#140F06"}
              stroke={activeStage === 3 ? "#F59E0B" : "rgba(245,158,11,0.75)"}
              strokeWidth={activeStage === 3 ? "2.5" : "1.8"}
              filter="url(#textShadow)"
            />
            <circle cx="158" cy="221" r="8.5" fill="#F59E0B" />
            <path
              d="M 155 221 A 3.5 3.5 0 1 1 161 221"
              stroke="#000000"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
            <text
              x="234"
              y="225"
              fill="#FDE68A"
              fontSize="11"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="0.8"
            >
              CIRCULAR RECOVERY
            </text>
          </g>

          {/* Top Live Metric Badge */}
          <g className="select-none pointer-events-none">
            <rect
              x="165"
              y="8"
              width="130"
              height="24"
              rx="12"
              fill="rgba(16,185,129,0.22)"
              stroke="rgba(16,185,129,0.5)"
            />
            <text x="230" y="23" fill="#D1FAE5" fontSize="9.5" fontWeight="bold" textAnchor="middle">
              ⚡ 25–30% Resource Cut
            </text>
          </g>
        </svg>
      </div>

      {/* Dynamic Stage Explanation Card (Single-Line Title & Ample Breathing Room) */}
      <div className="mt-4 bg-slate-900/85 border border-white/15 rounded-xl p-4 sm:p-5 backdrop-blur-md shadow-lg transition-all duration-300">
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 pb-2.5 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
              style={{ backgroundColor: stages[activeStage].color }}
            />
            <div className="text-sm sm:text-base font-bold text-white flex items-center gap-2 whitespace-nowrap">
              <span>{stages[activeStage].title}</span>
              <span className="text-[11px] sm:text-xs font-medium text-white/60">
                ({stages[activeStage].badge})
              </span>
            </div>
          </div>
          <span
            className="text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full shrink-0 shadow-xs whitespace-nowrap"
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
