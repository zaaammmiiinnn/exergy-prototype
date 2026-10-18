"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Activity } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-blueprint-dark text-[#F1F5F9] pt-16 pb-24 md:pt-24 md:pb-36 border-b border-white/[0.08]">
      {/* Corner Blueprint Crosshairs */}
      <div className="absolute top-6 left-6 font-mono text-[10px] text-white/20 select-none tracking-widest hidden sm:block">
        + COORD: 25.2048° N, 55.2708° E
      </div>
      <div className="absolute top-6 right-6 font-mono text-[10px] text-white/20 select-none tracking-widest hidden sm:block">
        + SYS.REF: DUBAI-ENG-2026
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 60 / 40 Split Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN (60% -> 7 Cols on desktop) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Technical Mono Spec Label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2.5 px-3 py-1 border border-white/[0.12] bg-[#0F1E33] rounded-[2px]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#00B4D8] font-semibold">
                SECOND-LAW ENGINEERING · DUBAI, UAE
              </span>
              <span className="text-white/20 font-mono text-xs">|</span>
              <span className="font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider hidden sm:inline">
                REV 4.2
              </span>
            </motion.div>

            {/* Huge H1 Headline (72-96px on desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="font-heading text-5xl sm:text-7xl lg:text-[80px] xl:text-[88px] font-semibold tracking-[-0.03em] text-[#F1F5F9] leading-[1.0] max-w-3xl">
                Turn wasted energy into profit.
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-base sm:text-lg text-[#94A3B8] font-normal leading-relaxed max-w-xl">
                Thermodynamics and exergy analysis for energy- and water-intensive operations. Delivered as guaranteed, turnkey implementation.
              </p>
            </motion.div>

            {/* CTAs: Engineering Cyan Button + Ghost Button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center gap-3 bg-[#00B4D8] hover:bg-[#00B4D8]/90 text-[#0A1628] font-mono text-xs uppercase tracking-[0.1em] font-bold px-7 py-4 rounded-[2px] shadow-[0_0_24px_rgba(0,180,216,0.35)] transition-all hover:shadow-[0_0_32px_rgba(0,180,216,0.5)] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]"
              >
                <span>Book an assessment</span>
                <ArrowRight className="w-4 h-4 text-[#0A1628]" />
              </Link>

              <Link
                href="/approach"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-[2px] bg-transparent hover:bg-white/[0.04] text-[#F1F5F9] font-mono text-xs uppercase tracking-[0.1em] border border-white/[0.16] hover:border-[#00B4D8]/60 transition-colors focus:outline-none focus:ring-1 focus:ring-white/40"
              >
                <span>See how it works</span>
                <ChevronRight className="w-4 h-4 text-[#00B4D8]" />
              </Link>
            </motion.div>

            {/* Inline Metrics with Hairline Dividers */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-0 max-w-xl"
            >
              {/* Metric 1 */}
              <div className="pr-4 sm:pr-6 border-r border-white/[0.08]">
                <div className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                  30–45%
                </div>
                <div className="font-mono text-[10px] sm:text-[11px] text-[#94A3B8] uppercase tracking-[0.08em] mt-1">
                  Typical energy saved
                </div>
              </div>

              {/* Metric 2 */}
              <div className="px-4 sm:px-6 border-r border-white/[0.08]">
                <div className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#00B4D8]">
                  100%
                </div>
                <div className="font-mono text-[10px] sm:text-[11px] text-[#94A3B8] uppercase tracking-[0.08em] mt-1">
                  Turnkey & guaranteed
                </div>
              </div>

              {/* Metric 3 */}
              <div className="pl-4 sm:pl-6">
                <div className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                  6
                </div>
                <div className="font-mono text-[10px] sm:text-[11px] text-[#94A3B8] uppercase tracking-[0.08em] mt-1">
                  Industries served
                </div>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN (40% -> 5 Cols on desktop): Industrial Photo + Technical SVG Drawing */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-white/[0.12] bg-[#0F1E33] rounded-[2px] p-2 sm:p-3 overflow-hidden shadow-2xl">
              
              {/* Corner crosshairs on image container */}
              <div className="absolute top-2 left-2 z-20 font-mono text-[10px] text-[#00B4D8] select-none">+</div>
              <div className="absolute top-2 right-2 z-20 font-mono text-[10px] text-[#00B4D8] select-none">+</div>
              <div className="absolute bottom-2 left-2 z-20 font-mono text-[10px] text-[#00B4D8] select-none">+</div>
              <div className="absolute bottom-2 right-2 z-20 font-mono text-[10px] text-[#00B4D8] select-none">+</div>

              {/* Industrial Photo with Dark Gradient Overlay */}
              <div className="relative h-72 sm:h-96 md:h-[420px] w-full overflow-hidden rounded-[2px]">
                <Image
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop"
                  alt="Industrial power and thermal plant at dusk"
                  fill
                  priority
                  className="object-cover opacity-35 mix-blend-luminosity scale-105"
                  sizes="(max-width: 1024px) 100vw, 550px"
                />
                
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/70 to-[#0A1628]/40" />

                {/* Technical Title Header Bar inside card */}
                <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between border-b border-white/[0.10] pb-2 font-mono text-[10px] text-[#94A3B8]">
                  <span className="flex items-center gap-1.5 text-[#00B4D8] uppercase tracking-wider font-semibold">
                    <Activity className="w-3 h-3 text-[#00B4D8]" />
                    THERMODYNAMIC MASS & EXERGY FLOW
                  </span>
                  <span>FIG 01.A</span>
                </div>

                {/* Animated Technical SVG Overlay (Draws on page load) */}
                <div className="absolute inset-0 pt-10 px-4 pb-4 flex items-center justify-center">
                  <svg
                    viewBox="0 0 420 320"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full max-h-[300px]"
                  >
                    {/* Background faint guide grid */}
                    <line x1="20" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4" />
                    <line x1="20" y1="160" x2="400" y2="160" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4" />
                    <line x1="20" y1="240" x2="400" y2="240" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4" />
                    
                    <line x1="100" y1="20" x2="100" y2="300" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4" />
                    <line x1="210" y1="20" x2="210" y2="300" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4" />
                    <line x1="320" y1="20" x2="320" y2="300" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4" />

                    {/* NODE 1: INPUT STREAM */}
                    <g>
                      <rect x="25" y="130" width="80" height="60" rx="2" fill="#0A1628" stroke="#00B4D8" strokeWidth="1.2" />
                      <text x="65" y="152" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="0.08em">EX_IN</text>
                      <text x="65" y="172" fill="#F1F5F9" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">100%</text>
                      <text x="65" y="206" fill="#00B4D8" fontSize="8" fontFamily="monospace" textAnchor="middle">PRIMARY FUEL</text>
                    </g>

                    {/* MAIN FLOW CONNECTOR: Input -> Core */}
                    <motion.path
                      d="M 105 160 L 165 160"
                      stroke="#00B4D8"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                    <polygon points="163,157 170,160 163,163" fill="#00B4D8" />

                    {/* NODE 2: CORE INDUSTRIAL PROCESS */}
                    <g>
                      <rect x="170" y="105" width="90" height="110" rx="2" fill="#0A1628" stroke="#F1F5F9" strokeWidth="1.2" />
                      <text x="215" y="128" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="middle">CORE UTILITY</text>
                      <text x="215" y="152" fill="#F1F5F9" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">PLANT LOAD</text>
                      <line x1="180" y1="165" x2="250" y2="165" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                      <text x="215" y="182" fill="#94A3B8" fontSize="8" fontFamily="monospace" textAnchor="middle">η_II = 74.8%</text>
                      <text x="215" y="198" fill="#00B4D8" fontSize="8" fontFamily="monospace" textAnchor="middle">ΔT = 8.4°C</text>
                    </g>

                    {/* UPPER LOSS BRANCH: Core -> Waste / Destruction */}
                    <motion.path
                      d="M 215 105 L 215 50 L 315 50"
                      stroke="#F59E0B"
                      strokeWidth="1.2"
                      strokeDasharray="4 3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
                    />
                    <polygon points="313,47 320,50 313,53" fill="#F59E0B" />

                    {/* NODE 3: CONVENTIONAL WASTE STREAM */}
                    <g>
                      <rect x="320" y="30" width="85" height="42" rx="2" fill="#0A1628" stroke="#F59E0B" strokeWidth="1" />
                      <text x="362" y="47" fill="#F59E0B" fontSize="8" fontFamily="monospace" textAnchor="middle">ENTROPY DESTR.</text>
                      <text x="362" y="62" fill="#F1F5F9" fontSize="10" fontFamily="monospace" textAnchor="middle">T₀·S_gen [LOSS]</text>
                    </g>

                    {/* LOWER BRANCH: Core -> Recovery Loop */}
                    <motion.path
                      d="M 260 160 L 315 160"
                      stroke="#00B4D8"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.4, delay: 0.6, ease: "easeInOut" }}
                    />
                    <polygon points="313,157 320,160 313,163" fill="#00B4D8" />

                    {/* NODE 4: RECOVERED USEFUL WORK / PROFIT */}
                    <g>
                      <rect x="320" y="130" width="88" height="60" rx="2" fill="#0A1628" stroke="#00B4D8" strokeWidth="1.4" />
                      <text x="364" y="152" fill="#00B4D8" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold">RECOVERED</text>
                      <text x="364" y="172" fill="#00B4D8" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">+35%</text>
                      <text x="364" y="206" fill="#F1F5F9" fontSize="8" fontFamily="monospace" textAnchor="middle">USEFUL EXERGY</text>
                    </g>

                    {/* RETURN LOOP: Recovered -> Core Plant feedback */}
                    <motion.path
                      d="M 364 190 L 364 260 L 215 260 L 215 215"
                      stroke="#00B4D8"
                      strokeWidth="1.2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.8, delay: 0.8, ease: "easeInOut" }}
                    />
                    <polygon points="212,217 215,210 218,217" fill="#00B4D8" />
                    <text x="290" y="275" fill="#00B4D8" fontSize="8" fontFamily="monospace" textAnchor="middle">CLOSED THERMAL RECYCLE</text>
                  </svg>
                </div>

                {/* Bottom Technical Spec Bar */}
                <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between border-t border-white/[0.10] pt-2 font-mono text-[9px] text-[#94A3B8]">
                  <span>PINCH: 14.2 kW/K</span>
                  <span className="text-[#00B4D8]">STEADY-STATE SIMULATION</span>
                  <span>ΔS = 0.00 kJ/kg·K</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
