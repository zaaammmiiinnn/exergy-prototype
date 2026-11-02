"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * BRAND PALETTE:
 * Primary Cerulean Blue: #2C7FB8
 * Deep Marine Teal:      #0E4A4F
 * Emerald Green:         #10B981 / #30a66a
 * Golden Amber Accent:   #F0A431
 */
export const BRAND = {
  primary: "#2C7FB8",
  secondary: "#0E4A4F",
  accent: "#F0A431",
  emerald: "#10B981",
  muted: "#94A3B8",
  dark: "#0A1628",
};

const drawVariant = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.12, duration: 1.2, ease: [0.16, 1, 0.3, 1] },
      opacity: { delay: i * 0.12, duration: 0.2 },
    },
  }),
};

// ═════════════════════════════════════════════════════════════════════════════
// 01. MEASURE: Energy & Water Mass Flow Balance
// ═════════════════════════════════════════════════════════════════════════════
export function MeasureSchematic({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative w-[210px] h-[160px] bg-slate-900/90 border border-slate-700/60 p-3 rounded-xl shadow-md select-none overflow-hidden ${className}`}>
      <div className="flex justify-between items-center text-[8px] text-slate-300 border-b border-slate-700/60 pb-1 mb-1.5 font-medium">
        <span className="text-cyan-400 font-semibold tracking-wide">01. Baseline Flow Balance</span>
        <span className="text-emerald-400">100% Calibrated</span>
      </div>

      <svg viewBox="0 0 190 125" fill="none" className="w-full h-full">
        {/* Input trunk (Fuel / Water in) */}
        <motion.path
          d="M 10 65 L 55 65"
          stroke={BRAND.primary}
          strokeWidth="10"
          strokeLinecap="butt"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        />
        <text x="12" y="52" fill="#E2E8F0" fontSize="7" fontWeight="bold">INPUT 100%</text>

        {/* Junction block */}
        <rect x="55" y="48" width="22" height="34" rx="4" fill="#0A1E33" stroke="#2C7FB8" strokeWidth="1.5" />
        <text x="66" y="68" fill="#67E8F9" fontSize="6.5" textAnchor="middle" fontWeight="bold">BAL</text>

        {/* Useful Work Path */}
        <motion.path
          d="M 77 60 L 175 60"
          stroke="#10B981"
          strokeWidth="6"
          strokeLinecap="butt"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        />
        <polygon points="173,56 182,60 173,64" fill="#10B981" />
        <text x="125" y="52" fill="#A7F3D0" fontSize="7" fontWeight="bold">USEFUL 70%</text>

        {/* Flue / reject stream */}
        <motion.path
          d="M 70 48 Q 70 24 135 24 L 170 24"
          stroke={BRAND.accent}
          strokeWidth="3.5"
          fill="none"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
        />
        <polygon points="168,21 176,24 168,27" fill={BRAND.accent} />
        <text x="110" y="18" fill="#FDE68A" fontSize="6" fontWeight="bold">RECOVERABLE 15%</text>

        {/* Destructed Exergy */}
        <motion.path
          d="M 70 82 Q 70 106 135 106 L 170 106"
          stroke="#EF4444"
          strokeWidth="3.5"
          fill="none"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={4}
        />
        <polygon points="168,103 176,106 168,109" fill="#EF4444" />
        <text x="100" y="118" fill="#FCA5A5" fontSize="6" fontWeight="bold">AVOIDABLE LOSS 15%</text>
      </svg>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 02. MODEL: Second-Law Pinch & Digital-Twin Simulation
// ═════════════════════════════════════════════════════════════════════════════
export function ModelSchematic({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative w-[210px] h-[160px] bg-slate-900/90 border border-slate-700/60 p-3 rounded-xl shadow-md select-none overflow-hidden ${className}`}>
      <div className="flex justify-between items-center text-[8px] text-slate-300 border-b border-slate-700/60 pb-1 mb-1.5 font-medium">
        <span className="text-cyan-400 font-semibold tracking-wide">02. Pinch & Exergy Curves</span>
        <span className="text-emerald-400">ΔTmin Optimized</span>
      </div>

      <svg viewBox="0 0 190 125" fill="none" className="w-full h-full">
        {/* Hot Composite Curve (Red/Amber) */}
        <motion.path
          d="M 20 25 L 80 45 L 140 75 L 175 95"
          stroke={BRAND.accent}
          strokeWidth="2"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        />
        <text x="25" y="20" fill="#FDE68A" fontSize="6.5" fontWeight="bold">HOT SOURCE</text>

        {/* Cold Composite Curve (Cerulean Blue) */}
        <motion.path
          d="M 15 50 L 60 70 L 115 95 L 170 110"
          stroke={BRAND.primary}
          strokeWidth="2"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        />
        <text x="130" y="120" fill="#93C5FD" fontSize="6.5" fontWeight="bold">COLD DEMAND</text>

        {/* Pinch Point Callout */}
        <circle cx="80" cy="45" r="3" fill="#10B981" />
        <circle cx="60" cy="70" r="3" fill="#10B981" />
        <line x1="80" y1="45" x2="60" y2="70" stroke="#10B981" strokeWidth="1.5" strokeDasharray="2 2" />
        <rect x="75" y="52" width="55" height="15" rx="3" fill="#082226" stroke="#10B981" strokeWidth="1" />
        <text x="102" y="63" fill="#A7F3D0" fontSize="6" fontWeight="bold" textAnchor="middle">MAX RECOVERY</text>
      </svg>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 03. DESIGN: Process Integration & Flow Network
// ═════════════════════════════════════════════════════════════════════════════
export function ProcessIntegrationSchematic({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative w-[210px] h-[160px] bg-slate-900/90 border border-slate-700/60 p-3 rounded-xl shadow-md select-none overflow-hidden ${className}`}>
      <div className="flex justify-between items-center text-[8px] text-slate-300 border-b border-slate-700/60 pb-1 mb-1.5 font-medium">
        <span className="text-cyan-400 font-semibold tracking-wide">03. Integrated Flow Network</span>
        <span className="text-emerald-400">Zero Cross-Pinch</span>
      </div>

      <svg viewBox="0 0 190 125" fill="none" className="w-full h-full">
        {/* Stream 1 */}
        <motion.path
          d="M 15 30 L 175 30"
          stroke={BRAND.accent}
          strokeWidth="1.5"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        />
        <text x="16" y="24" fill="#FDE68A" fontSize="6.5" fontWeight="bold">HOT STREAM PREHEAT</text>

        {/* Stream 2 with Split Branch */}
        <motion.path
          d="M 15 65 L 50 65 L 70 52 L 130 52 L 150 65 L 175 65"
          stroke={BRAND.primary}
          strokeWidth="1.5"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        />
        <text x="16" y="78" fill="#93C5FD" fontSize="6.5" fontWeight="bold">OPTIMIZED CASCADE</text>

        {/* Stream 3 Return */}
        <motion.path
          d="M 15 105 L 175 105"
          stroke={BRAND.emerald}
          strokeWidth="1.5"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
        />
        <text x="16" y="118" fill="#A7F3D0" fontSize="6.5">CLOSED-LOOP CONDENSATE</text>

        {/* Exchangers */}
        <rect x="75" y="22" width="16" height="16" rx="3" fill="#0A2238" stroke="#2C7FB8" strokeWidth="1.2" />
        <text x="83" y="33" fill="#93C5FD" fontSize="6.5" textAnchor="middle" fontWeight="bold">HX1</text>

        <rect x="95" y="44" width="16" height="16" rx="3" fill="#082A22" stroke="#10B981" strokeWidth="1.2" />
        <text x="103" y="55" fill="#A7F3D0" fontSize="6.5" textAnchor="middle" fontWeight="bold">HX2</text>
      </svg>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 04. IMPLEMENT: Turnkey Engineered Skids
// ═════════════════════════════════════════════════════════════════════════
export function ImplementSchematic({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative w-[210px] h-[160px] bg-slate-900/90 border border-slate-700/60 p-3 rounded-xl shadow-md select-none overflow-hidden ${className}`}>
      <div className="flex justify-between items-center text-[8px] text-slate-300 border-b border-slate-700/60 pb-1 mb-1.5 font-medium">
        <span className="text-cyan-400 font-semibold tracking-wide">04. Turnkey Skid Installation</span>
        <span className="text-emerald-400">Precision Fit</span>
      </div>

      <svg viewBox="0 0 190 125" fill="none" className="w-full h-full">
        {/* Isometric Plant Floor Grid */}
        <g stroke="rgba(255,255,255,0.06)" strokeWidth="0.8">
          <line x1="20" y1="80" x2="95" y2="120" />
          <line x1="95" y1="120" x2="170" y2="80" />
          <line x1="170" y1="80" x2="95" y2="40" />
          <line x1="95" y1="40" x2="20" y2="80" />
        </g>

        {/* Existing Equipment */}
        <polygon points="35,75 65,90 65,70 35,55" fill="rgba(14, 74, 79, 0.4)" stroke="#0E4A4F" strokeWidth="1.2" />
        <polygon points="65,90 85,80 85,60 65,70" fill="rgba(14, 74, 79, 0.25)" stroke="#0E4A4F" strokeWidth="1.2" />
        <text x="45" y="70" fill="#94A3B8" fontSize="5.5">PLANT HEADER</text>

        {/* New Turnkey Skid (Cerulean Blue Prism) */}
        <motion.polygon
          points="105,75 145,95 145,65 105,45"
          fill="rgba(44, 127, 184, 0.25)"
          stroke={BRAND.primary}
          strokeWidth="1.5"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        />
        <motion.polygon
          points="145,95 170,82 170,52 145,65"
          fill="rgba(44, 127, 184, 0.4)"
          stroke={BRAND.primary}
          strokeWidth="1.5"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        />

        {/* Leader Callout */}
        <rect x="95" y="18" width="85" height="14" rx="4" fill="#082A22" stroke="#10B981" strokeWidth="1" />
        <text x="137" y="27" fill="#A7F3D0" fontSize="6.5" textAnchor="middle" fontWeight="bold">MODULAR RECOVERY SKID</text>
      </svg>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 05. VERIFY: Certified M&V Performance Trend
// ═════════════════════════════════════════════════════════════════════════
export function VerifySchematic({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative w-[210px] h-[160px] bg-slate-900/90 border border-slate-700/60 p-3 rounded-xl shadow-md select-none overflow-hidden ${className}`}>
      <div className="flex justify-between items-center text-[8px] text-slate-300 border-b border-slate-700/60 pb-1 mb-1.5 font-medium">
        <span className="text-cyan-400 font-semibold tracking-wide">05. Certified M&V Trend</span>
        <span className="text-emerald-400 font-bold">-28.4% Cut</span>
      </div>

      <svg viewBox="0 0 190 125" fill="none" className="w-full h-full">
        {/* Axes */}
        <line x1="25" y1="15" x2="25" y2="105" stroke="#475569" strokeWidth="1.2" />
        <line x1="25" y1="105" x2="180" y2="105" stroke="#475569" strokeWidth="1.2" />
        <text x="22" y="20" fill="#94A3B8" fontSize="5.5" textAnchor="end">kW</text>
        <text x="178" y="115" fill="#94A3B8" fontSize="5.5" textAnchor="end">MONTHS</text>

        {/* Shaded Saved Area */}
        <motion.path
          d="M 85 45 L 115 48 L 145 44 L 175 46 L 175 80 L 145 78 L 115 82 L 85 50 Z"
          fill="rgba(16, 185, 129, 0.2)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        />

        {/* Baseline (Dashed Amber) */}
        <motion.path
          d="M 25 42 L 55 40 L 85 45 L 115 48 L 145 44 L 175 46"
          stroke={BRAND.accent}
          strokeWidth="1.5"
          strokeDasharray="4 2"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        />
        <text x="32" y="36" fill="#FDE68A" fontSize="6" fontWeight="bold">BASELINE DEMAND</text>

        {/* Actual (Solid Green) */}
        <motion.path
          d="M 25 42 L 55 40 L 85 50 L 115 82 L 145 78 L 175 80"
          stroke="#10B981"
          strokeWidth="2"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        />
        <circle cx="115" cy="82" r="2.5" fill="#10B981" />
        <circle cx="145" cy="78" r="2.5" fill="#10B981" />
        <circle cx="175" cy="80" r="2.5" fill="#10B981" />

        <text x="118" y="94" fill="#6EE7B7" fontSize="6.5" fontWeight="bold">ACTUAL CONSUMPTION</text>

        {/* Savings Callout Pill */}
        <rect x="110" y="58" width="60" height="15" rx="3" fill="#062822" stroke="#10B981" strokeWidth="1" />
        <text x="140" y="68" fill="#A7F3D0" fontSize="6.5" textAnchor="middle" fontWeight="bold">28.4% SAVED</text>
      </svg>
    </div>
  );
}

export const DesignSchematic = ProcessIntegrationSchematic;

