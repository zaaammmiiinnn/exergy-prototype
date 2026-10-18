"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SchematicProps {
  className?: string;
}

/**
 * EXACT EXERGY SOLUTIONS LOGO COLOR PALETTE
 * Extracted directly from public/logo.png:
 * - Primary Brand Color:   #2C7FB8 (Electric Cerulean Blue)
 * - Secondary Brand Color: #0E4A4F (Deep Marine Teal)
 * - Accent Brand Color:    #F0A431 (Thermodynamic Golden Amber)
 */
export const LOGO_COLORS = {
  primary: "#2C7FB8",
  secondary: "#0E4A4F",
  accent: "#F0A431",
  muted: "#94A3B8",
  dark: "#0A1628",
  light: "#F1F5F9",
};

const drawTransition = (delay = 0) => ({
  duration: 1.2,
  delay,
  ease: [0.16, 1, 0.3, 1],
});

// ═════════════════════════════════════════════════════════════════════════
// 1. COOLING SCHEMATIC: Chilled-water loop (Chiller, Tower, AHU, Pump, ΔT)
// ═════════════════════════════════════════════════════════════════════════
export function CoolingSchematic({ className = "" }: SchematicProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`w-full bg-[#071120] border border-white/[0.08] p-3 sm:p-4 rounded-[2px] relative font-mono ${className}`}>
      {/* Corner crosshairs (Primary Logo Color) */}
      <span className="absolute top-1.5 left-1.5 text-[8px] text-[#2C7FB8] select-none font-bold">+</span>
      <span className="absolute top-1.5 right-1.5 text-[8px] text-[#2C7FB8] select-none font-bold">+</span>
      <span className="absolute bottom-1.5 left-1.5 text-[8px] text-[#2C7FB8] select-none font-bold">+</span>
      <span className="absolute bottom-1.5 right-1.5 text-[8px] text-[#2C7FB8] select-none font-bold">+</span>

      {/* Header Bar */}
      <div className="flex items-center justify-between text-[9px] text-[#94A3B8] border-b border-white/[0.06] pb-1.5 mb-2">
        <span className="text-[#2C7FB8] font-semibold tracking-wider">SCHEMATIC: CHILLED-WATER LOOP & VPF</span>
        <span>FIG 02.A // REV 2.1</span>
      </div>

      <svg viewBox="0 0 340 190" fill="none" className="w-full h-auto text-slate-300">
        <style>{`
          @media (max-width: 767px) {
            .sublabel { display: none !important; }
          }
        `}</style>
        {/* Background gridlines */}
        <g stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="2 3">
          <line x1="10" y1="50" x2="330" y2="50" />
          <line x1="10" y1="120" x2="330" y2="120" />
          <line x1="80" y1="10" x2="80" y2="170" />
          <line x1="200" y1="10" x2="200" y2="170" />
        </g>

        {/* 1. CHILLER BLOCK (Primary Logo Color #2C7FB8 with Deep Teal solid border) */}
        <rect x="20" y="55" width="75" height="65" fill="#0A1628" stroke="#0E4A4F" strokeWidth="2" />
        <line x1="20" y1="73" x2="95" y2="73" stroke="#0E4A4F" strokeWidth="1" />
        <text x="57" y="68" fill="#2C7FB8" textAnchor="middle" fontSize="7.5" fontWeight="bold">CHILLER</text>
        <text x="57" y="90" fill="#F1F5F9" textAnchor="middle" fontSize="9" fontWeight="bold">COP 6.42</text>
        <text x="57" y="108" fill="#94A3B8" textAnchor="middle" fontSize="7" className="sublabel">VPF STAGING</text>

        {/* Chilled Water Supply Line (Primary Logo Color #2C7FB8) */}
        <motion.path
          d="M 95 75 L 210 75"
          stroke="#2C7FB8"
          strokeWidth="1.5"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition(0.1)}
        />
        <polygon points="208,72 215,75 208,78" fill="#2C7FB8" />
        <text x="150" y="68" fill="#2C7FB8" fontSize="6.5" textAnchor="middle" fontWeight="bold" className="sublabel">CHW 6.5°C</text>

        {/* 2. AHU / PROCESS LOAD BLOCK */}
        <rect x="215" y="55" width="80" height="65" fill="#0A1628" stroke="#0E4A4F" strokeWidth="2" />
        <line x1="215" y1="73" x2="295" y2="73" stroke="#0E4A4F" strokeWidth="1" />
        <text x="255" y="68" fill="#94A3B8" textAnchor="middle" fontSize="7.5">AHU / LOAD</text>
        <text x="255" y="90" fill="#F1F5F9" textAnchor="middle" fontSize="9" fontWeight="bold">ΔT: +8.2°C</text>
        <text x="255" y="108" fill="#2C7FB8" textAnchor="middle" fontSize="7" className="sublabel">1,850 kW_th</text>

        {/* Chilled Water Return Line */}
        <motion.path
          d="M 255 120 L 255 150 L 165 150 L 135 150 L 57 150 L 57 120"
          stroke="#2C7FB8"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition(0.3)}
        />
        <polygon points="54,124 57,118 60,124" fill="#2C7FB8" />
        <text x="195" y="145" fill="#94A3B8" fontSize="6.5" textAnchor="middle" className="sublabel">RETURN 14.7°C</text>

        {/* Variable Primary Pump symbol in return loop */}
        <g transform="translate(150, 150)">
          <circle cx="0" cy="0" r="10" fill="#0A1628" stroke="#2C7FB8" strokeWidth="1.5" />
          <polygon points="-4,-5 6,0 -4,5" fill="#2C7FB8" />
          <text x="0" y="-14" fill="#2C7FB8" fontSize="6.5" textAnchor="middle" className="sublabel">VPF PUMP</text>
        </g>

        {/* 3. COOLING TOWER HEAT DUMP / REJECT LOOP (Accent Logo Color #F0A431) */}
        <motion.path
          d="M 57 55 L 57 25 L 255 25 L 255 45"
          stroke="#F0A431"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition(0.5)}
        />
        <g transform="translate(155, 25)">
          <rect x="-42" y="-11" width="84" height="20" fill="#0A1628" stroke="#F0A431" strokeWidth="1" />
          <text x="0" y="2" fill="#F0A431" fontSize="6.5" textAnchor="middle" fontWeight="bold">TOWER CONDENSER</text>
          <text x="0" y="16" fill="#94A3B8" fontSize="6" textAnchor="middle" className="sublabel">APPROACH: 2.8°C</text>
        </g>
      </svg>

      <div className="flex justify-between items-center text-[8px] text-[#94A3B8] border-t border-white/[0.06] pt-1.5 mt-1">
        <span className="text-[#2C7FB8] font-bold">EXERGY SAVED: 28.4%</span>
        <span>LOW DELTA-T MITIGATED</span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════════
// 2. HEATING & STEAM SCHEMATIC: Boiler, Exchanger, Condensate Return, Economizer
// ════════════════════════════════════════════════════════════════════════════════════
export function HeatingSchematic({ className = "" }: SchematicProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`w-full bg-[#071120] border border-white/[0.08] p-3 sm:p-4 rounded-[2px] relative font-mono ${className}`}>
      {/* Corner crosshairs */}
      <span className="absolute top-1.5 left-1.5 text-[8px] text-[#2C7FB8] select-none font-bold">+</span>
      <span className="absolute top-1.5 right-1.5 text-[8px] text-[#2C7FB8] select-none font-bold">+</span>
      <span className="absolute bottom-1.5 left-1.5 text-[8px] text-[#2C7FB8] select-none font-bold">+</span>
      <span className="absolute bottom-1.5 right-1.5 text-[8px] text-[#2C7FB8] select-none font-bold">+</span>

      <div className="flex items-center justify-between text-[9px] text-[#94A3B8] border-b border-white/[0.06] pb-1.5 mb-2">
        <span className="text-[#2C7FB8] font-semibold tracking-wider">SCHEMATIC: STEAM & CONDENSATE RECOVERY</span>
        <span>FIG 02.B // REV 2.1</span>
      </div>

      <svg viewBox="0 0 340 190" fill="none" className="w-full h-auto text-slate-300">
        <style>{`
          @media (max-width: 767px) {
            .sublabel { display: none !important; }
          }
        `}</style>
        <g stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="2 3">
          <line x1="10" y1="50" x2="330" y2="50" />
          <line x1="10" y1="120" x2="330" y2="120" />
        </g>

        {/* 1. STEAM BOILER (Accent Logo Color #F0A431) */}
        <rect x="20" y="55" width="75" height="65" fill="#0A1628" stroke="#F0A431" strokeWidth="1.5" />
        <line x1="20" y1="73" x2="95" y2="73" stroke="rgba(240,164,49,0.25)" strokeWidth="1" />
        <text x="57" y="68" fill="#F0A431" textAnchor="middle" fontSize="7.5" fontWeight="bold">BOILER</text>
        <text x="57" y="90" fill="#F1F5F9" textAnchor="middle" fontSize="9" fontWeight="bold">8.5 BAR</text>
        <text x="57" y="108" fill="#94A3B8" textAnchor="middle" fontSize="7" className="sublabel">175°C SAT</text>

        {/* High-Pressure Steam Line (Accent Logo Color #F0A431) */}
        <motion.path
          d="M 95 75 L 210 75"
          stroke="#F0A431"
          strokeWidth="1.5"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition(0.1)}
        />
        <polygon points="208,72 215,75 208,78" fill="#F0A431" />
        <text x="150" y="68" fill="#F0A431" fontSize="6.5" textAnchor="middle" fontWeight="bold" className="sublabel">STEAM 4.2 T/H</text>

        {/* 2. PROCESS HEAT EXCHANGER / USER */}
        <rect x="215" y="55" width="80" height="65" fill="#0A1628" stroke="#0E4A4F" strokeWidth="2" />
        <line x1="215" y1="73" x2="295" y2="73" stroke="#0E4A4F" strokeWidth="1" />
        <text x="255" y="68" fill="#94A3B8" textAnchor="middle" fontSize="7.5">PROCESS USER</text>
        <text x="255" y="90" fill="#F1F5F9" textAnchor="middle" fontSize="9" fontWeight="bold">HEX COIL</text>
        <text x="255" y="108" fill="#2C7FB8" textAnchor="middle" fontSize="7" className="sublabel">η_th: 92.6%</text>

        {/* Condensate Recovery Loop (Primary Logo Color #2C7FB8) */}
        <motion.path
          d="M 255 120 L 255 150 L 175 150 L 140 150 L 57 150 L 57 120"
          stroke="#2C7FB8"
          strokeWidth="1.5"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition(0.3)}
        />
        <polygon points="54,124 57,118 60,124" fill="#2C7FB8" />
        <text x="195" y="145" fill="#2C7FB8" fontSize="6.5" textAnchor="middle" fontWeight="bold" className="sublabel">CONDENSATE &gt;88%</text>

        {/* Steam Trap icon in return line */}
        <g transform="translate(150, 150)" className="sublabel">
          <rect x="-8" y="-8" width="16" height="16" fill="#0A1628" stroke="#0E4A4F" strokeWidth="1.5" />
          <path d="M -8 -8 L 8 8" stroke="#2C7FB8" strokeWidth="1" />
          <text x="0" y="-12" fill="#2C7FB8" fontSize="6" textAnchor="middle">TRAP AUDIT</text>
        </g>

        {/* Economizer heat recovery from flue gas (Primary Logo Color #2C7FB8) */}
        <motion.path
          d="M 57 55 L 57 25 L 200 25"
          stroke="#2C7FB8"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition(0.5)}
        />
        <g transform="translate(140, 25)">
          <rect x="-35" y="-10" width="70" height="20" fill="#0A1628" stroke="#0E4A4F" strokeWidth="1.5" />
          <text x="0" y="2" fill="#2C7FB8" fontSize="6.5" textAnchor="middle" fontWeight="bold">FLUE ECONOMIZER</text>
          <text x="0" y="15" fill="#94A3B8" fontSize="6" textAnchor="middle" className="sublabel">PREHEAT 82°C</text>
        </g>
      </svg>

      <div className="flex justify-between items-center text-[8px] text-[#94A3B8] border-t border-white/[0.06] pt-1.5 mt-1">
        <span className="text-[#F0A431] font-bold">FUEL SAVING: 22.8%</span>
        <span>BLOWDOWN FLASH RECLAIMED</span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════════
// 3. WATER QUALITY SCHEMATIC: Intake, Filtration, RO, Process, Closed Reuse
// ════════════════════════════════════════════════════════════════════════════════════
export function WaterSchematic({ className = "" }: SchematicProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`w-full bg-[#071120] border border-white/[0.08] p-3 sm:p-4 rounded-[2px] relative font-mono ${className}`}>
      {/* Corner crosshairs */}
      <span className="absolute top-1.5 left-1.5 text-[8px] text-[#2C7FB8] select-none font-bold">+</span>
      <span className="absolute top-1.5 right-1.5 text-[8px] text-[#2C7FB8] select-none font-bold">+</span>
      <span className="absolute bottom-1.5 left-1.5 text-[8px] text-[#2C7FB8] select-none font-bold">+</span>
      <span className="absolute bottom-1.5 right-1.5 text-[8px] text-[#2C7FB8] select-none font-bold">+</span>

      <div className="flex items-center justify-between text-[9px] text-[#94A3B8] border-b border-white/[0.06] pb-1.5 mb-2">
        <span className="text-[#2C7FB8] font-semibold tracking-wider">SCHEMATIC: HIGH-RECOVERY RO & ZLD LOOP</span>
        <span>FIG 02.C // REV 2.1</span>
      </div>

      <svg viewBox="0 0 340 190" fill="none" className="w-full h-auto text-slate-300">
        <style>{`
          @media (max-width: 767px) {
            .sublabel { display: none !important; }
          }
        `}</style>
        <g stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="2 3">
          <line x1="10" y1="50" x2="330" y2="50" />
          <line x1="10" y1="120" x2="330" y2="120" />
        </g>

        {/* 1. RAW WATER INTAKE */}
        <g transform="translate(15, 60)">
          <rect x="0" y="0" width="60" height="55" fill="#0A1628" stroke="#0E4A4F" strokeWidth="2" />
          <text x="30" y="16" fill="#94A3B8" textAnchor="middle" fontSize="7">INTAKE</text>
          <text x="30" y="34" fill="#F1F5F9" textAnchor="middle" fontSize="9" fontWeight="bold">RAW FEED</text>
          <text x="30" y="48" fill="#94A3B8" textAnchor="middle" fontSize="6.5" className="sublabel">TDS 2,400 ppm</text>
        </g>

        {/* Feed Line to RO */}
        <motion.path
          d="M 75 87 L 115 87"
          stroke="#94A3B8"
          strokeWidth="1.5"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition(0.1)}
        />
        <polygon points="113,84 120,87 113,90" fill="#94A3B8" />

        {/* 2. REVERSE OSMOSIS MEMBRANE BLOCK (Primary Logo Color #2C7FB8) */}
        <g transform="translate(120, 50)">
          <rect x="0" y="0" width="85" height="75" fill="#0A1628" stroke="#2C7FB8" strokeWidth="1.5" />
          <line x1="0" y1="18" x2="85" y2="18" stroke="rgba(44,127,184,0.25)" strokeWidth="1" />
          <text x="42" y="14" fill="#2C7FB8" textAnchor="middle" fontSize="7.5" fontWeight="bold">RO SYSTEM</text>
          <text x="42" y="38" fill="#F1F5F9" textAnchor="middle" fontSize="11" fontWeight="bold">88.5%</text>
          <text x="42" y="52" fill="#2C7FB8" textAnchor="middle" fontSize="7">RECOVERY RATE</text>
          <text x="42" y="66" fill="#94A3B8" textAnchor="middle" fontSize="6.5" className="sublabel">HIGH-FLUX MEMBRANE</text>
        </g>

        {/* Permeate Line to Process (Primary Logo Color #2C7FB8) */}
        <motion.path
          d="M 205 87 L 245 87"
          stroke="#2C7FB8"
          strokeWidth="1.5"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition(0.3)}
        />
        <polygon points="243,84 250,87 243,90" fill="#2C7FB8" />
        <text x="225" y="80" fill="#2C7FB8" fontSize="6" textAnchor="middle" fontWeight="bold" className="sublabel">PERMEATE</text>

        {/* 3. PROCESS TOWER REUSE */}
        <g transform="translate(250, 60)">
          <rect x="0" y="0" width="75" height="55" fill="#0A1628" stroke="#0E4A4F" strokeWidth="2" />
          <text x="37" y="16" fill="#94A3B8" textAnchor="middle" fontSize="7">USE LOOP</text>
          <text x="37" y="34" fill="#F1F5F9" textAnchor="middle" fontSize="9" fontWeight="bold">PLANT USE</text>
          <text x="37" y="48" fill="#2C7FB8" textAnchor="middle" fontSize="6.5" className="sublabel">CoC: 7.2 CYCLES</text>
        </g>

        {/* Reject Recovery & ZLD Loop (Accent Logo Color #F0A431) */}
        <motion.path
          d="M 162 125 L 162 155 L 285 155 L 285 115"
          stroke="#F0A431"
          strokeWidth="1.5"
          strokeDasharray="4 2"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition(0.5)}
        />
        <polygon points="282,119 285,113 288,119" fill="#F0A431" />
        <text x="225" y="150" fill="#F0A431" fontSize="6.5" textAnchor="middle" fontWeight="bold" className="sublabel">ZLD RECYCLE: ZERO EFFLUENT</text>
      </svg>

      <div className="flex justify-between items-center text-[8px] text-[#94A3B8] border-t border-white/[0.06] pt-1.5 mt-1">
        <span className="text-[#2C7FB8] font-bold">FRESHWATER CUT: 45%</span>
        <span>SCALING & FOULING ELIMINATED</span>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════════
// 4. PROCESS INTEGRATION SCHEMATIC: Pinch Composite Curves & Exergy Destruction Area
// ════════════════════════════════════════════════════════════════════════════════════
export function ProcessIntegrationSchematic({ className = "" }: SchematicProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`w-full bg-[#071120] border border-white/[0.08] p-3 sm:p-4 rounded-[2px] relative font-mono ${className}`}>
      {/* Corner crosshairs */}
      <span className="absolute top-1.5 left-1.5 text-[8px] text-[#2C7FB8] select-none font-bold">+</span>
      <span className="absolute top-1.5 right-1.5 text-[8px] text-[#2C7FB8] select-none font-bold">+</span>
      <span className="absolute bottom-1.5 left-1.5 text-[8px] text-[#2C7FB8] select-none font-bold">+</span>
      <span className="absolute bottom-1.5 right-1.5 text-[8px] text-[#2C7FB8] select-none font-bold">+</span>

      <div className="flex items-center justify-between text-[9px] text-[#94A3B8] border-b border-white/[0.06] pb-1.5 mb-2">
        <span className="text-[#2C7FB8] font-semibold tracking-wider">SCHEMATIC: PINCH ANALYSIS COMPOSITE CURVES</span>
        <span>FIG 02.D // REV 2.1</span>
      </div>

      <svg viewBox="0 0 340 190" fill="none" className="w-full h-auto text-slate-300">
        <style>{`
          @media (max-width: 767px) {
            .sublabel { display: none !important; }
          }
        `}</style>
        {/* T-H Axis coordinates */}
        <line x1="35" y1="20" x2="35" y2="160" stroke="#94A3B8" strokeWidth="1.5" />
        <line x1="35" y1="160" x2="320" y2="160" stroke="#94A3B8" strokeWidth="1.5" />
        <text x="30" y="25" fill="#94A3B8" fontSize="7" textAnchor="end">T [°C]</text>
        <text x="315" y="172" fill="#94A3B8" fontSize="7" textAnchor="end">ENTHALPY H [kW]</text>

        {/* Shaded Area between curves (Exergy Destruction) */}
        <motion.path
          d="M 60 40 L 175 95 L 300 135 L 270 145 L 175 105 L 45 60 Z"
          fill="rgba(44,127,184,0.12)"
          stroke="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        />

        {/* Hot Composite Curve (Accent Logo Color #F0A431) */}
        <motion.path
          d="M 60 40 L 175 95 L 300 135"
          stroke="#F0A431"
          strokeWidth="1.8"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition(0.1)}
        />
        <text x="75" y="35" fill="#F0A431" fontSize="7" fontWeight="bold">HOT COMPOSITE</text>

        {/* Cold Composite Curve (Primary Logo Color #2C7FB8) */}
        <motion.path
          d="M 45 60 L 175 105 L 270 145"
          stroke="#2C7FB8"
          strokeWidth="1.8"
          initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={drawTransition(0.2)}
        />
        <text x="275" y="150" fill="#2C7FB8" fontSize="7" fontWeight="bold">COLD COMPOSITE</text>

        {/* Vertical Pinch Point Line */}
        <line x1="175" y1="25" x2="175" y2="155" stroke="#F0A431" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="175" cy="95" r="3" fill="#F0A431" />
        <circle cx="175" cy="105" r="3" fill="#2C7FB8" />
        <g transform="translate(175, 18)">
          <rect x="-35" y="-8" width="70" height="16" fill="#0A1628" stroke="#0E4A4F" strokeWidth="1.5" />
          <text x="0" y="3" fill="#F0A431" fontSize="6.5" textAnchor="middle" fontWeight="bold">PINCH ΔT_min 10K</text>
        </g>

        {/* Minimum Utility Targets Callouts */}
        {/* Hot Utility QH,min (Left - Accent #F0A431) */}
        <line x1="35" y1="40" x2="60" y2="40" stroke="#F0A431" strokeWidth="1.5" />
        <text x="50" y="55" fill="#F0A431" fontSize="6.5" textAnchor="middle" className="sublabel">Q_H,min</text>

        {/* Cold Utility QC,min (Right - Primary #2C7FB8) */}
        <line x1="270" y1="145" x2="300" y2="135" stroke="#2C7FB8" strokeWidth="1.5" />
        <text x="285" y="130" fill="#2C7FB8" fontSize="6.5" textAnchor="middle" className="sublabel">Q_C,min</text>

        {/* Label in the exergy destruction shaded region */}
        <text x="120" y="80" fill="#2C7FB8" fontSize="6.5" textAnchor="middle" letterSpacing="0.06em" className="sublabel">
          INTERNAL RECOVERY
        </text>
      </svg>

      <div className="flex justify-between items-center text-[8px] text-[#94A3B8] border-t border-white/[0.06] pt-1.5 mt-1">
        <span className="text-[#2C7FB8] font-bold">CROSS-PINCH LOSS: 0.0 kW</span>
        <span>HEN SYNTHESIS OPTIMIZED</span>
      </div>
    </div>
  );
}
