"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * EXACT EXERGY SOLUTIONS LOGO COLOR PALETTE
 * Extracted directly from public/logo.png:
 * - Primary Brand Color:   #2C7FB8 (Electric Cerulean Blue Ribbon)
 * - Secondary Brand Color: #0E4A4F (Deep Marine Teal Ribbon)
 * - Accent Brand Color:    #F0A431 (Thermodynamic Golden Amber Ribbon)
 */
export const LOGO_COLORS = {
  primary: "#2C7FB8",
  secondary: "#0E4A4F",
  accent: "#F0A431",
  muted: "#94A3B8",
  dark: "#0A1628",
  light: "#F1F5F9",
};

export function HeroSchematic() {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants for stroke draw-in
  const drawTransition = {
    duration: shouldReduceMotion ? 0 : 2,
    ease: [0.16, 1, 0.3, 1], // clean easeOut
  };

  return (
    <div className="relative w-full max-w-[480px] aspect-square mx-auto bg-[#071120] border border-white/[0.12] rounded-[2px] p-4 sm:p-6 overflow-hidden shadow-2xl flex flex-col justify-between">
      
      {/* Blueprint Corner Crosshairs (Primary Logo Color) */}
      <div className="absolute top-2 left-2 font-mono text-[9px] text-[#2C7FB8] select-none font-bold">+</div>
      <div className="absolute top-2 right-2 font-mono text-[9px] text-[#2C7FB8] select-none font-bold">+</div>
      <div className="absolute bottom-2 left-2 font-mono text-[9px] text-[#2C7FB8] select-none font-bold">+</div>
      <div className="absolute bottom-2 right-2 font-mono text-[9px] text-[#2C7FB8] select-none font-bold">+</div>

      {/* Blueprint Grid Coordinates & Header Bar */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 font-mono text-[9px] text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2C7FB8] animate-pulse" />
          <span className="text-[#2C7FB8] font-semibold tracking-wider uppercase">
            THERMODYNAMIC EXERGY SCHEMATIC
          </span>
        </div>
        <span className="tracking-widest text-[#94A3B8]">COORD: 25.2°N / 55.3°E</span>
      </div>

      {/* Main Vector Diagram */}
      <div className="relative flex-1 flex items-center justify-center py-2">
        <svg
          viewBox="0 0 440 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Mobile Readability: hide tertiary/sublabel text on screens < 768px */}
          <style>{`
            @media (max-width: 767px) {
              .sublabel { display: none !important; }
            }
          `}</style>

          {/* Blueprint Orthogonal Grid Lines */}
          <g stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="2 4">
            <line x1="20" y1="90" x2="420" y2="90" />
            <line x1="20" y1="190" x2="420" y2="190" />
            <line x1="20" y1="290" x2="420" y2="290" />
            <line x1="90" y1="20" x2="90" y2="360" />
            <line x1="220" y1="20" x2="220" y2="360" />
            <line x1="350" y1="20" x2="350" y2="360" />
          </g>

          {/* ═══════════ NODE 1: FUEL / ENERGY INPUT (Primary Logo Color) ═══════════ */}
          <g id="node-fuel-in">
            {/* Outer Box with Deep Teal solid border */}
            <rect
              x="20"
              y="155"
              width="80"
              height="70"
              fill="#0A1628"
              stroke="#0E4A4F"
              strokeWidth="2"
            />
            {/* Header tab */}
            <line x1="20" y1="175" x2="100" y2="175" stroke="#0E4A4F" strokeWidth="1" />
            <text x="60" y="169" fill="#2C7FB8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              FUEL IN
            </text>
            <text x="60" y="196" fill="#F1F5F9" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              100%
            </text>
            <text x="60" y="213" fill="#94A3B8" fontSize="7" fontFamily="monospace" textAnchor="middle" className="sublabel">
              EX_PRIMARY
            </text>
          </g>

          {/* Input Flow Line: Fuel In -> Core Process (Primary Logo Color) */}
          <motion.path
            d="M 100 190 L 165 190"
            stroke="#2C7FB8"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={drawTransition}
          />
          <polygon points="163,186 170,190 163,194" fill="#2C7FB8" />
          <text x="132" y="182" fill="#94A3B8" fontSize="7" fontFamily="monospace" textAnchor="middle" className="sublabel">
            H_IN
          </text>

          {/* ═══════════ NODE 2: CORE CONVERSION PROCESS ═══════════ */}
          <g id="node-process">
            {/* Process Box with solid Deep Teal border */}
            <rect
              x="170"
              y="130"
              width="100"
              height="120"
              fill="#0A1628"
              stroke="#0E4A4F"
              strokeWidth="2"
            />
            <line x1="170" y1="154" x2="270" y2="154" stroke="#0E4A4F" strokeWidth="1" />
            <text x="220" y="147" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="middle">
              CONVERSION
            </text>
            <text x="220" y="174" fill="#F1F5F9" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              PROCESS
            </text>
            <text x="220" y="192" fill="#2C7FB8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              η_II: 72.4%
            </text>
            <line x1="180" y1="202" x2="260" y2="202" stroke="rgba(255,255,255,0.08)" strokeWidth="1" className="sublabel" />
            <text x="220" y="218" fill="#94A3B8" fontSize="7" fontFamily="monospace" textAnchor="middle" className="sublabel">
              T_proc = 185°C
            </text>
            <text x="220" y="232" fill="#94A3B8" fontSize="7" fontFamily="monospace" textAnchor="middle" className="sublabel">
              P = 12.5 BAR
            </text>
          </g>

          {/* ═══════════ ZONE 3: EXERGY DESTRUCTION (Accent Logo Color #F0A431) ═══════════ */}
          {/* Path from Process to Exergy Destruction */}
          <motion.path
            d="M 220 130 L 220 70 L 320 70"
            stroke="#F0A431"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ ...drawTransition, delay: 0.3 }}
          />
          <polygon points="318,66 325,70 318,74" fill="#F0A431" />

          {/* Exergy Destruction Box */}
          <g id="node-exergy-destruction">
            <rect
              x="325"
              y="40"
              width="95"
              height="60"
              fill="#0A1628"
              stroke="#F0A431"
              strokeWidth="1.5"
            />
            <line x1="325" y1="60" x2="420" y2="60" stroke="rgba(240,164,49,0.25)" strokeWidth="1" />
            <text x="372" y="54" fill="#F0A431" fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              EXERGY DESTRUCTION
            </text>
            <text x="372" y="76" fill="#F1F5F9" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              T₀·S_gen
            </text>
            <text x="372" y="90" fill="#F0A431" fontSize="7" fontFamily="monospace" textAnchor="middle">
              -38% IRREVERSIBILITY
            </text>
          </g>

          {/* Accent Pulsing Radar Node on Exergy Destruction Junction */}
          <g transform="translate(220, 70)">
            <circle cx="0" cy="0" r="3" fill="#F0A431" />
            {!shouldReduceMotion && (
              <>
                <motion.circle
                  cx="0"
                  cy="0"
                  r="7"
                  stroke="#F0A431"
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ opacity: 0.8, scale: 0.5 }}
                  animate={{ opacity: 0, scale: 2 }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
                />
                <motion.circle
                  cx="0"
                  cy="0"
                  r="12"
                  stroke="#F0A431"
                  strokeWidth="1"
                  fill="none"
                  initial={{ opacity: 0.6, scale: 0.7 }}
                  animate={{ opacity: 0, scale: 2.2 }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: 0.6, ease: "easeOut" }}
                />
              </>
            )}
            <text x="12" y="-6" fill="#F0A431" fontSize="7" fontFamily="monospace" fontWeight="bold">
              TARGET LOSS
            </text>
          </g>

          {/* ═══════════ NODE 4: USEFUL WORK & RECOVERY (Accent Logo Color #F0A431) ═══════════ */}
          <motion.path
            d="M 270 190 L 325 190"
            stroke="#F0A431"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ ...drawTransition, delay: 0.5 }}
          />
          <polygon points="323,186 330,190 323,194" fill="#F0A431" />

          <g id="node-recovered-work">
            <rect
              x="330"
              y="160"
              width="90"
              height="62"
              fill="#0A1628"
              stroke="#F0A431"
              strokeWidth="1.5"
            />
            <line x1="330" y1="180" x2="420" y2="180" stroke="rgba(240,164,49,0.25)" strokeWidth="1" />
            <text x="375" y="174" fill="#F0A431" fontSize="7.5" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              RECOVERED WORK
            </text>
            <text x="375" y="198" fill="#F0A431" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              +35%
            </text>
            <text x="375" y="212" fill="#F1F5F9" fontSize="7" fontFamily="monospace" textAnchor="middle" className="sublabel">
              USEFUL EXERGY
            </text>
          </g>

          {/* ═══════════ RECOVERY RECYCLE LOOP (Primary Logo Color #2C7FB8) ═══════════ */}
          <motion.path
            d="M 375 222 L 375 310 L 220 310 L 220 250"
            stroke="#2C7FB8"
            strokeWidth="1.5"
            strokeDasharray="5 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ ...drawTransition, delay: 0.8 }}
          />
          <polygon points="216,252 220,245 224,252" fill="#2C7FB8" />

          {/* Loop Label Box */}
          <g transform="translate(297, 310)" className="sublabel">
            <rect x="-65" y="-10" width="130" height="20" fill="#071120" stroke="#0E4A4F" strokeWidth="1.5" />
            <text x="0" y="3" fill="#2C7FB8" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              THERMAL RECYCLE LOOP
            </text>
          </g>

          {/* Heat Exchanger symbol in the recycle loop */}
          <g transform="translate(145, 310)" className="sublabel">
            <circle cx="0" cy="0" r="14" fill="#0A1628" stroke="#0E4A4F" strokeWidth="2" />
            <path d="M -9 0 L 9 0" stroke="#2C7FB8" strokeWidth="1" />
            <path d="M 0 -9 L 0 9" stroke="#2C7FB8" strokeWidth="1" />
            <text x="0" y="22" fill="#94A3B8" fontSize="6.5" fontFamily="monospace" textAnchor="middle">
              HEX-01
            </text>
          </g>
        </svg>
      </div>

      {/* Blueprint Footer / Figure Label */}
      <div className="border-t border-white/[0.08] pt-2 flex items-center justify-between font-mono text-[9px] text-[#94A3B8]">
        <div className="flex items-center gap-3">
          <span>SCALE: N.T.S.</span>
          <span className="text-white/20">|</span>
          <span className="text-[#2C7FB8]">SECOND-LAW MASS/ENERGY BALANCE</span>
        </div>
        <div className="font-bold text-[#F1F5F9]">
          FIG 01 // REV 2.4
        </div>
      </div>

    </div>
  );
}
