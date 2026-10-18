"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * EXACT EXERGY SOLUTIONS LOGO COLOR PALETTE
 * Extracted from public/logo.png:
 * - Primary:   #2C7FB8 (Electric Cerulean Blue)
 * - Secondary: #0E4A4F (Deep Marine Teal)
 * - Accent:    #F0A431 (Thermodynamic Golden Amber)
 */
export const BRAND = {
  primary: "#2C7FB8",
  secondary: "#0E4A4F",
  accent: "#F0A431",
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
// 01. MEASURE: Sankey Diagram with Losses Highlighted in Accent (#F0A431)
// ═════════════════════════════════════════════════════════════════════════
export function MeasureSchematic({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative w-[200px] h-[160px] bg-[#071120] border border-white/[0.08] p-2.5 rounded-[2px] font-mono select-none overflow-hidden ${className}`}>
      {/* Corner crosshairs */}
      <span className="absolute top-1 left-1 text-[7px] text-[#2C7FB8] font-bold">+</span>
      <span className="absolute top-1 right-1 text-[7px] text-[#2C7FB8] font-bold">+</span>
      <span className="absolute bottom-1 left-1 text-[7px] text-[#2C7FB8] font-bold">+</span>
      <span className="absolute bottom-1 right-1 text-[7px] text-[#2C7FB8] font-bold">+</span>

      <div className="flex justify-between items-center text-[7.5px] text-[#94A3B8] border-b border-white/[0.06] pb-1 mb-1">
        <span className="text-[#2C7FB8] font-semibold">FIG 03.1 // SANKEY</span>
        <span>AUDIT 100%</span>
      </div>

      <svg viewBox="0 0 190 125" fill="none" className="w-full h-full">
        <style>{`
          @media (max-width: 767px) {
            .sublabel { display: none !important; }
          }
        `}</style>

        {/* Input trunk (Fuel in) */}
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
        <text x="12" y="52" fill={BRAND.muted} fontSize="6.5" fontWeight="bold">INPUT 100%</text>

        {/* Junction block */}
        <rect x="55" y="48" width="22" height="34" fill="#0A1628" stroke={BRAND.secondary} strokeWidth="1.5" />
        <text x="66" y="68" fill={BRAND.primary} fontSize="6" textAnchor="middle" fontWeight="bold">BAL</text>

        {/* Useful Work Path (Continues Right in Primary #2C7FB8) */}
        <motion.path
          d="M 77 60 L 175 60"
          stroke={BRAND.primary}
          strokeWidth="6"
          strokeLinecap="butt"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        />
        <polygon points="173,56 182,60 173,64" fill={BRAND.primary} />
        <text x="125" y="52" fill={BRAND.primary} fontSize="6.5" fontWeight="bold">USEFUL 62%</text>

        {/* Waste & Exergy Destruction Losses (Branches out in Accent #F0A431) */}
        {/* Upper branch: Flue/thermal losses */}
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
        <text x="110" y="18" fill={BRAND.accent} fontSize="6" fontWeight="bold">FLUE LOSS 18%</text>

        {/* Lower branch: Irreversibility / exergy destruction */}
        <motion.path
          d="M 70 82 Q 70 106 135 106 L 170 106"
          stroke={BRAND.accent}
          strokeWidth="4"
          fill="none"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={4}
        />
        <polygon points="168,103 176,106 168,109" fill={BRAND.accent} />
        <text x="100" y="118" fill={BRAND.accent} fontSize="6" fontWeight="bold">DESTRUCTION 20%</text>
      </svg>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 02. MODEL: Pinch Grid Diagram (Hot & Cold Process Streams with Matches)
// ═════════════════════════════════════════════════════════════════════════
export function ModelSchematic({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative w-[200px] h-[160px] bg-[#071120] border border-white/[0.08] p-2.5 rounded-[2px] font-mono select-none overflow-hidden ${className}`}>
      <span className="absolute top-1 left-1 text-[7px] text-[#2C7FB8] font-bold">+</span>
      <span className="absolute top-1 right-1 text-[7px] text-[#2C7FB8] font-bold">+</span>
      <span className="absolute bottom-1 left-1 text-[7px] text-[#2C7FB8] font-bold">+</span>
      <span className="absolute bottom-1 right-1 text-[7px] text-[#2C7FB8] font-bold">+</span>

      <div className="flex justify-between items-center text-[7.5px] text-[#94A3B8] border-b border-white/[0.06] pb-1 mb-1">
        <span className="text-[#2C7FB8] font-semibold">FIG 03.2 // PINCH GRID</span>
        <span>ΔT_min: 10 K</span>
      </div>

      <svg viewBox="0 0 190 125" fill="none" className="w-full h-full">
        {/* Vertical Pinch Line */}
        <line x1="95" y1="12" x2="95" y2="118" stroke={BRAND.accent} strokeWidth="1.2" strokeDasharray="3 2" />
        <text x="98" y="20" fill={BRAND.accent} fontSize="5.5" fontWeight="bold">PINCH</text>

        {/* Hot Stream H1 (Running Left to Right in Accent #F0A431) */}
        <motion.path
          d="M 15 35 L 175 35"
          stroke={BRAND.accent}
          strokeWidth="1.5"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        />
        <polygon points="172,32 178,35 172,38" fill={BRAND.accent} />
        <text x="16" y="30" fill={BRAND.accent} fontSize="6" fontWeight="bold">H1 (180°→60°)</text>

        {/* Hot Stream H2 */}
        <motion.path
          d="M 15 62 L 175 62"
          stroke={BRAND.accent}
          strokeWidth="1.5"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        />
        <polygon points="172,59 178,62 172,65" fill={BRAND.accent} />
        <text x="16" y="57" fill={BRAND.accent} fontSize="6" fontWeight="bold">H2 (140°→45°)</text>

        {/* Cold Stream C1 (Running Right to Left in Primary #2C7FB8) */}
        <motion.path
          d="M 175 88 L 15 88"
          stroke={BRAND.primary}
          strokeWidth="1.5"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
        />
        <polygon points="18,85 12,88 18,91" fill={BRAND.primary} />
        <text x="16" y="100" fill={BRAND.primary} fontSize="6" fontWeight="bold">C1 (30°→120°)</text>

        {/* Cold Stream C2 */}
        <motion.path
          d="M 175 112 L 15 112"
          stroke={BRAND.primary}
          strokeWidth="1.5"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={4}
        />
        <polygon points="18,109 12,112 18,115" fill={BRAND.primary} />
        <text x="120" y="122" fill={BRAND.primary} fontSize="6" fontWeight="bold">C2 (50°→160°)</text>

        {/* Heat Match Exchanger 1 (Between H1 and C1 - Above Pinch) */}
        <line x1="55" y1="35" x2="55" y2="88" stroke="#F1F5F9" strokeWidth="1" />
        <circle cx="55" cy="35" r="4" fill="#0A1628" stroke={BRAND.accent} strokeWidth="1.5" />
        <circle cx="55" cy="88" r="4" fill="#0A1628" stroke={BRAND.primary} strokeWidth="1.5" />

        {/* Heat Match Exchanger 2 (Between H2 and C2 - Below Pinch) */}
        <line x1="140" y1="62" x2="140" y2="112" stroke="#F1F5F9" strokeWidth="1" />
        <circle cx="140" cy="62" r="4" fill="#0A1628" stroke={BRAND.accent} strokeWidth="1.5" />
        <circle cx="140" cy="112" r="4" fill="#0A1628" stroke={BRAND.primary} strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 03. DESIGN: Heat Exchanger Network (HEN) Synthesis Grid
// ═════════════════════════════════════════════════════════════════════════
export function DesignSchematic({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative w-[200px] h-[160px] bg-[#071120] border border-white/[0.08] p-2.5 rounded-[2px] font-mono select-none overflow-hidden ${className}`}>
      <span className="absolute top-1 left-1 text-[7px] text-[#2C7FB8] font-bold">+</span>
      <span className="absolute top-1 right-1 text-[7px] text-[#2C7FB8] font-bold">+</span>
      <span className="absolute bottom-1 left-1 text-[7px] text-[#2C7FB8] font-bold">+</span>
      <span className="absolute bottom-1 right-1 text-[7px] text-[#2C7FB8] font-bold">+</span>

      <div className="flex justify-between items-center text-[7.5px] text-[#94A3B8] border-b border-white/[0.06] pb-1 mb-1">
        <span className="text-[#2C7FB8] font-semibold">FIG 03.3 // HEN DESIGN</span>
        <span>RECOVERY: 84%</span>
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
        <text x="16" y="24" fill={BRAND.accent} fontSize="6" fontWeight="bold">FEED PREHEAT</text>

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
        <motion.path
          d="M 50 65 L 70 78 L 130 78 L 150 65"
          stroke={BRAND.primary}
          strokeWidth="1.5"
          strokeDasharray="3 2"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
        />
        <text x="16" y="76" fill={BRAND.primary} fontSize="6" fontWeight="bold">SPLIT EVAP</text>

        {/* Stream 3 (Return) */}
        <motion.path
          d="M 15 105 L 175 105"
          stroke={BRAND.muted}
          strokeWidth="1.5"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={4}
        />
        <text x="16" y="117" fill={BRAND.muted} fontSize="6">CONDENSATE RECIRC</text>

        {/* Heat Exchanger Unit 01 (Cross-stream coupling) */}
        <rect x="75" y="22" width="16" height="16" fill="#0A1628" stroke={BRAND.secondary} strokeWidth="1.5" />
        <text x="83" y="33" fill={BRAND.accent} fontSize="6.5" textAnchor="middle" fontWeight="bold">E1</text>

        {/* Heat Exchanger Unit 02 (Coupled with upper split) */}
        <rect x="95" y="44" width="16" height="16" fill="#0A1628" stroke={BRAND.primary} strokeWidth="1.5" />
        <text x="103" y="55" fill={BRAND.primary} fontSize="6.5" textAnchor="middle" fontWeight="bold">E2</text>

        {/* Vertical interconnecting tie line between E1 & E2 */}
        <line x1="83" y1="38" x2="103" y2="44" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="2 2" />

        {/* External Utility Cooler */}
        <circle cx="160" cy="30" r="6" fill="#0A1628" stroke={BRAND.primary} strokeWidth="1.5" />
        <text x="160" y="32" fill={BRAND.primary} fontSize="6" textAnchor="middle" fontWeight="bold">C</text>

        {/* External Utility Heater */}
        <circle cx="160" cy="65" r="6" fill="#0A1628" stroke={BRAND.accent} strokeWidth="1.5" />
        <text x="160" y="67" fill={BRAND.accent} fontSize="6" textAnchor="middle" fontWeight="bold">H</text>
      </svg>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 04. IMPLEMENT: Isometric Plant Layout with New Equipment in Primary (#2C7FB8)
// ═════════════════════════════════════════════════════════════════════════
export function ImplementSchematic({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative w-[200px] h-[160px] bg-[#071120] border border-white/[0.08] p-2.5 rounded-[2px] font-mono select-none overflow-hidden ${className}`}>
      <span className="absolute top-1 left-1 text-[7px] text-[#2C7FB8] font-bold">+</span>
      <span className="absolute top-1 right-1 text-[7px] text-[#2C7FB8] font-bold">+</span>
      <span className="absolute bottom-1 left-1 text-[7px] text-[#2C7FB8] font-bold">+</span>
      <span className="absolute bottom-1 right-1 text-[7px] text-[#2C7FB8] font-bold">+</span>

      <div className="flex justify-between items-center text-[7.5px] text-[#94A3B8] border-b border-white/[0.06] pb-1 mb-1">
        <span className="text-[#2C7FB8] font-semibold">FIG 03.4 // ISOMETRIC</span>
        <span>RETROFIT EPC</span>
      </div>

      <svg viewBox="0 0 190 125" fill="none" className="w-full h-full">
        {/* Isometric Plant Floor Grid (Muted / Deep Teal) */}
        <g stroke="rgba(255,255,255,0.05)" strokeWidth="0.8">
          <line x1="20" y1="80" x2="95" y2="120" />
          <line x1="95" y1="120" x2="170" y2="80" />
          <line x1="170" y1="80" x2="95" y2="40" />
          <line x1="95" y1="40" x2="20" y2="80" />
          <line x1="57" y1="60" x2="132" y2="100" />
          <line x1="57" y1="100" x2="132" y2="60" />
        </g>

        {/* Existing Plant Structure footprint (Subtle Deep Teal #0E4A4F) */}
        <polygon points="35,75 65,90 65,70 35,55" fill="rgba(14, 74, 79, 0.4)" stroke={BRAND.secondary} strokeWidth="1.2" />
        <polygon points="65,90 85,80 85,60 65,70" fill="rgba(14, 74, 79, 0.25)" stroke={BRAND.secondary} strokeWidth="1.2" />
        <polygon points="35,55 55,45 85,60 65,70" fill="rgba(14, 74, 79, 0.3)" stroke={BRAND.secondary} strokeWidth="1.2" />
        <text x="45" y="70" fill={BRAND.muted} fontSize="5">EXISTING</text>

        {/* NEW RETROFITTED EQUIPMENT (Prominent in Primary #2C7FB8) */}
        {/* New Exchanger Skid Isometric Prism */}
        <motion.polygon
          points="105,75 145,95 145,65 105,45"
          fill="rgba(44, 127, 184, 0.2)"
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
          fill="rgba(44, 127, 184, 0.35)"
          stroke={BRAND.primary}
          strokeWidth="1.5"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        />
        <motion.polygon
          points="105,45 130,32 170,52 145,65"
          fill="rgba(44, 127, 184, 0.5)"
          stroke={BRAND.primary}
          strokeWidth="1.5"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
        />

        {/* Piping Header Connecting Skids (Accent #F0A431) */}
        <motion.path
          d="M 65 65 L 90 52 L 105 60"
          stroke={BRAND.accent}
          strokeWidth="1.8"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={4}
        />
        <circle cx="90" cy="52" r="2.5" fill={BRAND.accent} />

        {/* Tag / Leader Callout */}
        <line x1="138" y1="50" x2="160" y2="28" stroke="#F1F5F9" strokeWidth="0.8" />
        <circle cx="138" cy="50" r="2" fill={BRAND.primary} />
        <rect x="125" y="16" width="60" height="12" fill="#0A1628" stroke={BRAND.primary} strokeWidth="1" />
        <text x="155" y="24" fill={BRAND.primary} fontSize="5.5" textAnchor="middle" fontWeight="bold">NEW RECOVERY SKID</text>
      </svg>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// 05. VERIFY: Continuous M&V Dashboard Trend Line (Baseline vs Actual)
// ═════════════════════════════════════════════════════════════════════════
export function VerifySchematic({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative w-[200px] h-[160px] bg-[#071120] border border-white/[0.08] p-2.5 rounded-[2px] font-mono select-none overflow-hidden ${className}`}>
      <span className="absolute top-1 left-1 text-[7px] text-[#2C7FB8] font-bold">+</span>
      <span className="absolute top-1 right-1 text-[7px] text-[#2C7FB8] font-bold">+</span>
      <span className="absolute bottom-1 left-1 text-[7px] text-[#2C7FB8] font-bold">+</span>
      <span className="absolute bottom-1 right-1 text-[7px] text-[#2C7FB8] font-bold">+</span>

      <div className="flex justify-between items-center text-[7.5px] text-[#94A3B8] border-b border-white/[0.06] pb-1 mb-1">
        <span className="text-[#2C7FB8] font-semibold">FIG 03.5 // IPMVP M&V</span>
        <span className="text-emerald-400 font-bold">-28.4% CERTIFIED</span>
      </div>

      <svg viewBox="0 0 190 125" fill="none" className="w-full h-full">
        {/* Coordinate Axes */}
        <line x1="25" y1="15" x2="25" y2="105" stroke={BRAND.muted} strokeWidth="1.2" />
        <line x1="25" y1="105" x2="180" y2="105" stroke={BRAND.muted} strokeWidth="1.2" />
        <text x="22" y="20" fill={BRAND.muted} fontSize="5.5" textAnchor="end">kW</text>
        <text x="178" y="115" fill={BRAND.muted} fontSize="5.5" textAnchor="end">TIME (MONTHS)</text>

        {/* Shaded Area between Baseline and Actual (Verified Savings) */}
        <motion.path
          d="M 85 45 L 115 48 L 145 44 L 175 46 L 175 80 L 145 78 L 115 82 L 85 50 Z"
          fill="rgba(44, 127, 184, 0.15)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        />

        {/* Implementation Milestone Line */}
        <line x1="85" y1="18" x2="85" y2="105" stroke={BRAND.accent} strokeWidth="1" strokeDasharray="2 2" />
        <text x="88" y="25" fill={BRAND.accent} fontSize="5.5" fontWeight="bold">COMMISSION</text>

        {/* Baseline Energy Trend Line (Higher - Accent #F0A431 dashed) */}
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
        <text x="32" y="36" fill={BRAND.accent} fontSize="5.5" fontWeight="bold">BASELINE (IPMVP)</text>

        {/* Actual Energy Trend Line (Drops significantly after retrofit - Primary #2C7FB8) */}
        <motion.path
          d="M 25 42 L 55 40 L 85 50 L 115 82 L 145 78 L 175 80"
          stroke={BRAND.primary}
          strokeWidth="2"
          variants={drawVariant}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        />
        <circle cx="115" cy="82" r="2.5" fill={BRAND.primary} />
        <circle cx="145" cy="78" r="2.5" fill={BRAND.primary} />
        <circle cx="175" cy="80" r="2.5" fill={BRAND.primary} />

        <text x="118" y="94" fill={BRAND.primary} fontSize="6" fontWeight="bold">ACTUAL VERIFIED</text>

        {/* Savings Callout Pill */}
        <rect x="110" y="58" width="56" height="14" fill="#0A1628" stroke={BRAND.secondary} strokeWidth="1" />
        <text x="138" y="68" fill={BRAND.accent} fontSize="6" textAnchor="middle" fontWeight="bold">SAVED 28.4%</text>
      </svg>
    </div>
  );
}
