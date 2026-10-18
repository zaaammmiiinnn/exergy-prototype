"use client";

import React from "react";
import Link from "next/link";
import { MotionDiv } from "./motion";
import { ArrowUpRight, CheckCircle2, TrendingDown, Clock, ShieldAlert } from "lucide-react";

export function CaseStudyTeaser() {
  return (
    <section className="py-28 md:py-36 bg-[#0A1628] border-t border-white/[0.08] text-[#F1F5F9] relative overflow-hidden">
      {/* Background Technical Grid lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-white/[0.08]">
          <div className="max-w-2xl">
            <MotionDiv delay={0.05}>
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#00B4D8] font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-[1px] bg-[#00B4D8]" />
                <span>05 / CASE STUDY · VERIFIED RESULTS</span>
              </div>
            </MotionDiv>
            <MotionDiv delay={0.15}>
              <h2 className="text-3xl sm:text-5xl font-heading font-semibold text-[#F1F5F9] tracking-[-0.03em] leading-[1.05]">
                A paper mill. 42% less steam.
              </h2>
            </MotionDiv>
            <MotionDiv delay={0.25}>
              <p className="text-[#94A3B8] text-base md:text-lg mt-4 leading-relaxed font-sans max-w-xl">
                Industrial paper packaging facility in the Northern Emirates. Operational optimization, heat integration, and dryer hood exhaust recuperation delivered as a turnkey performance contract.
              </p>
            </MotionDiv>
          </div>

          <MotionDiv delay={0.3}>
            <Link
              href="/applications"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-[#00B4D8] hover:text-white font-semibold transition-colors px-4 py-2.5 border border-[#00B4D8]/30 rounded-[2px] bg-[#0F1E33] hover:bg-[#00B4D8]/10"
            >
              <span>Read application dossier</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </MotionDiv>
        </div>

        {/* 3-Column Technical Showcase Box */}
        <div className="bg-[#0F1E33] border border-white/[0.08] rounded-[2px] p-8 md:p-12 relative overflow-hidden">
          
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00B4D8] via-[#0077B6] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
            
            {/* Col 1: The Problem */}
            <div className="space-y-4 pt-6 lg:pt-0">
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#F59E0B] flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#F59E0B]" />
                <span>01. THE PROBLEM</span>
              </div>
              <h3 className="font-heading text-xl font-semibold text-[#F1F5F9]">
                Severe Exhaust Thermal Venting & Low Condensate Return
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed font-sans">
                Operating 3 rotary paper drying hoods venting 82°C moist exhaust air directly into the atmosphere, while boiler makeup water entered cold at 24°C with excessive raw fuel consumption.
              </p>
              <div className="font-mono text-xs text-[#94A3B8] pt-2 flex items-center gap-2">
                <span className="text-[#F59E0B]">BASELINE:</span>
                <span>4.8 T/HR steam duty at 7.5 bar</span>
              </div>
            </div>

            {/* Col 2: The Approach */}
            <div className="space-y-4 pt-8 lg:pt-0 lg:pl-12">
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#00B4D8] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00B4D8]" />
                <span>02. THE APPROACH</span>
              </div>
              <h3 className="font-heading text-xl font-semibold text-[#F1F5F9]">
                Pinch Analysis & Yankee Hood Heat Exchanger Recuperation
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed font-sans">
                Exergy Solutions performed on-site ultrasonic mass/energy balance auditing and synthesized a cross-hood air preheater network using corrosion-resistant plate heat exchangers and high-pressure condensate return.
              </p>
              <div className="font-mono text-xs text-[#94A3B8] pt-2 flex items-center gap-2">
                <span className="text-[#00B4D8]">METHOD:</span>
                <span>Second-Law Pinch Modeling + EPC Oversight</span>
              </div>
            </div>

            {/* Col 3: The Result */}
            <div className="space-y-6 pt-8 lg:pt-0 lg:pl-12">
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-emerald-400 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-emerald-400" />
                <span>03. VERIFIED OUTCOME</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#0A1628] border border-white/[0.08] rounded-[2px]">
                  <div className="font-mono text-3xl font-bold text-[#00B4D8]">
                    42%
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] mt-1">
                    Steam Reduction
                  </div>
                </div>

                <div className="p-4 bg-[#0A1628] border border-white/[0.08] rounded-[2px]">
                  <div className="font-mono text-2xl font-bold text-emerald-400">
                    AED 1.8M
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] mt-1">
                    Annual Fuel OPEX Cut
                  </div>
                </div>

                <div className="p-4 bg-[#0A1628] border border-white/[0.08] rounded-[2px]">
                  <div className="font-mono text-2xl font-bold text-[#F1F5F9]">
                    9.2 MO
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] mt-1">
                    Turnkey Payback
                  </div>
                </div>

                <div className="p-4 bg-[#0A1628] border border-white/[0.08] rounded-[2px]">
                  <div className="font-mono text-2xl font-bold text-amber-400">
                    100%
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-[#94A3B8] mt-1">
                    Guaranteed Under IPMVP
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Reference Bar */}
          <div className="mt-10 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-[#94A3B8] gap-4">
            <div className="flex items-center gap-4">
              <span>FACILITY: PAPER PACKAGING MILL</span>
              <span className="text-white/20">|</span>
              <span>VERIFIED VIA IPMVP OPTION B</span>
            </div>
            <Link
              href="/assessment?service=drying"
              className="text-[#00B4D8] hover:text-white font-semibold flex items-center gap-1.5 transition-colors uppercase tracking-wider"
            >
              <span>Calculate your plant's potential</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
