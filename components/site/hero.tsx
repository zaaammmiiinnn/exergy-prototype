"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ChevronRight, Gauge, Sparkles } from "lucide-react";
import { MotionDiv } from "./motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Dynamic Background flow lines & subtle grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Subhead, CTAs */}
          <div className="lg:col-span-7 space-y-8">
            <MotionDiv delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-teal-500/30 text-teal-300 text-xs font-mono uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Thermodynamic & Exergy Engineering</span>
              </div>
            </MotionDiv>

            <MotionDiv delay={0.15}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Turn wasted energy <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-teal-400">
                  and water into profit
                </span>
              </h1>
            </MotionDiv>

            <MotionDiv delay={0.25}>
              <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl">
                We apply thermodynamics and exergy analysis to slash the capex and opex of energy- and water-intensive operations — delivered as guaranteed, turnkey implementation.
              </p>
            </MotionDiv>

            {/* CTAs */}
            <MotionDiv delay={0.35}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/assessment"
                  className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-navy-950"
                >
                  <Gauge className="w-5 h-5 text-teal-100" />
                  <span>Book an assessment</span>
                  <ArrowRight className="w-4 h-4 text-white/80" />
                </Link>
                <Link
                  href="/approach"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 text-slate-200 hover:text-white font-medium border border-slate-700/80 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
                >
                  <span>See how it works</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>
            </MotionDiv>

            {/* Trust bullet tags */}
            <MotionDiv delay={0.45}>
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Second-law thermodynamic physics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Contractual performance guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Turnkey plant implementation</span>
                </div>
              </div>
            </MotionDiv>
          </div>

          {/* Right Column: Visual Diagram / Hero graphic */}
          <div className="lg:col-span-5 relative">
            <MotionDiv delay={0.3}>
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-slate-700/60 bg-gradient-to-b from-slate-900/90 to-navy-950 shadow-2xl p-3">
                <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-xl overflow-hidden bg-slate-950">
                  <Image
                    src="https://images.hostinger.com/7953796b-93b0-49f3-8314-6db64a5896f2.png"
                    alt="Symbolic composition of thermal, water, electric, and renewable energy converging around a glowing entropy vortex"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Metric Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-navy-950/85 backdrop-blur-md border border-teal-500/40 rounded-lg p-3 text-xs text-slate-300 flex items-center justify-between">
                    <div>
                      <span className="text-teal-400 font-mono font-bold block text-sm">25% – 30%</span>
                      <span className="text-[11px] text-slate-400">Typical Resource Utilisation Cut</span>
                    </div>
                    <span className="px-2 py-1 rounded bg-teal-500/20 text-teal-300 font-mono text-[10px] uppercase font-semibold">
                      Guaranteed
                    </span>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
}
