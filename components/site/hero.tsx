"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { HeroSchematic } from "./hero-schematic";

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
        {/* 60 / 40 Split Desktop Layout (Stacks schematic above text on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN (60% -> 7 Cols on desktop, order-2 on mobile) */}
          <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
            
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

          {/* RIGHT COLUMN (40% -> 5 Cols on desktop): Technical Blueprint Schematic */}
          <div className="lg:col-span-5 relative order-1 lg:order-2 flex justify-center items-center w-full">
            <HeroSchematic />
          </div>

        </div>
      </div>
    </section>
  );
}
