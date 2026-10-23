"use client";

import React from "react";
import Link from "next/link";
import { MotionDiv } from "./motion";
import { ArrowUpRight, CheckCircle2, TrendingDown, Clock, ShieldAlert } from "lucide-react";

export function CaseStudyTeaser() {
  return (
    <section id="case-study" className="py-28 md:py-36 bg-[hsl(190,30%,98%)] border-t border-slate-200/80 text-[#12232b] relative overflow-hidden">
      <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-slate-200/80">
          <div className="max-w-2xl">
            <MotionDiv delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0c758d]" />
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#0c758d] font-semibold">
                  05 / CASE STUDY · VERIFIED RESULTS
                </span>
              </div>
            </MotionDiv>
            <MotionDiv delay={0.15}>
              <h2 className="text-3xl sm:text-5xl font-heading font-semibold text-[#12232b] tracking-[-0.03em] leading-[1.08]">
                A paper mill. 42% less steam.
              </h2>
            </MotionDiv>
            <MotionDiv delay={0.25}>
              <p className="text-slate-600 text-base md:text-lg mt-4 leading-relaxed font-sans max-w-xl">
                Industrial paper packaging facility in the Northern Emirates. Operational optimization, heat integration, and dryer hood exhaust recuperation delivered as a turnkey performance contract.
              </p>
            </MotionDiv>
          </div>

          <MotionDiv delay={0.3}>
            <Link
              href="/applications"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-teal-200 bg-white text-[#0c758d] font-medium text-xs uppercase tracking-wider hover:bg-teal-50 hover:border-teal-300 transition-all shadow-xs group"
            >
              <span>Read application dossier</span>
              <ArrowUpRight className="w-4 h-4 text-[#0c758d] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </MotionDiv>
        </div>

        {/* 3-Column Technical Showcase Box with rich petrol navy contrast */}
        <div className="bg-gradient-to-br from-[#061821] via-[#09222c] to-[#0c303d] border border-teal-900/40 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden text-white">
          
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0c758d] via-[#30a66a] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 divide-y lg:divide-y-0 lg:divide-x divide-teal-900/40">
            
            {/* Col 1: The Problem */}
            <div className="space-y-4 pt-6 lg:pt-0">
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#F0A431] flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#F0A431]" />
                <span>01. THE PROBLEM</span>
              </div>
              <h3 className="font-heading text-xl font-semibold text-white">
                Severe Exhaust Thermal Venting & Low Condensate Return
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Operating 3 rotary paper drying hoods venting 82°C moist exhaust air directly into the atmosphere, while boiler makeup water entered cold at 24°C with excessive raw fuel consumption.
              </p>
              <div className="font-mono text-xs text-slate-400 pt-2 flex items-center gap-2">
                <span className="text-[#F0A431]">BASELINE:</span>
                <span>4.8 T/HR steam duty at 7.5 bar</span>
              </div>
            </div>

            {/* Col 2: The Approach */}
            <div className="space-y-4 pt-8 lg:pt-0 lg:pl-12">
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#30a66a] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#30a66a]" />
                <span>02. THE APPROACH</span>
              </div>
              <h3 className="font-heading text-xl font-semibold text-white">
                Pinch Analysis & Yankee Hood Heat Exchanger Recuperation
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Exergy Solutions performed on-site ultrasonic mass/energy balance auditing and synthesized a cross-hood air preheater network using corrosion-resistant plate heat exchangers and high-pressure condensate return.
              </p>
              <div className="font-mono text-xs text-slate-400 pt-2 flex items-center gap-2">
                <span className="text-[#0c758d]">METHOD:</span>
                <span>Second-Law Pinch Modeling + EPC Oversight</span>
              </div>
            </div>

            {/* Col 3: The Result */}
            <div className="space-y-6 pt-8 lg:pt-0 lg:pl-12">
              <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#30a66a] flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-[#30a66a]" />
                <span>03. VERIFIED OUTCOME</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#061821]/90 border border-teal-800/40 rounded-2xl">
                  <div className="font-mono text-3xl font-bold text-[#0c758d]">
                    42%
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mt-1">
                    Steam Reduction
                  </div>
                </div>

                <div className="p-4 bg-[#061821]/90 border border-teal-800/40 rounded-2xl">
                  <div className="font-mono text-2xl font-bold text-[#30a66a]">
                    AED 1.8M
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mt-1">
                    Annual Fuel OPEX Cut
                  </div>
                </div>

                <div className="p-4 bg-[#061821]/90 border border-teal-800/40 rounded-2xl">
                  <div className="font-mono text-2xl font-bold text-white">
                    9.2 MO
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mt-1">
                    Turnkey Payback
                  </div>
                </div>

                <div className="p-4 bg-[#061821]/90 border border-teal-800/40 rounded-2xl">
                  <div className="font-mono text-2xl font-bold text-[#F0A431]">
                    100%
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mt-1">
                    Guaranteed Under IPMVP
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Reference Bar */}
          <div className="mt-10 pt-6 border-t border-teal-900/40 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-slate-400 gap-4">
            <div className="flex items-center gap-4">
              <span>FACILITY: PAPER PACKAGING MILL</span>
              <span className="text-teal-700">|</span>
              <span>VERIFIED VIA IPMVP OPTION B</span>
            </div>
            <Link
              href="/assessment?service=drying"
              className="text-[#30a66a] hover:text-white font-semibold flex items-center gap-1.5 transition-colors uppercase tracking-wider"
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
