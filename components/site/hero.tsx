"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ChevronRight, Gauge, Sparkles } from "lucide-react";
import { MotionDiv } from "./motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-slate-100/40 text-slate-900 pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200/80">
      {/* Dynamic Background flow lines & subtle light grid */}
      <div className="absolute inset-0 bg-grid-light opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Subhead, CTAs */}
          <div className="lg:col-span-7 space-y-8">
            <MotionDiv delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-mono uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Thermodynamic & Exergy Engineering</span>
              </div>
            </MotionDiv>

            <MotionDiv delay={0.15}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Turn wasted energy <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-teal-700 to-teal-600">
                  and water into profit
                </span>
              </h1>
            </MotionDiv>

            <MotionDiv delay={0.25}>
              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
                We apply thermodynamics and exergy analysis to slash the capex and opex of energy- and water-intensive operations — delivered as guaranteed, turnkey implementation.
              </p>
            </MotionDiv>

            {/* CTAs */}
            <MotionDiv delay={0.35}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/assessment"
                  className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-700 to-teal-600 hover:from-blue-800 hover:to-teal-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-teal-700/15 transition-all hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <Gauge className="w-5 h-5 text-white/90" />
                  <span>Book an assessment</span>
                  <ArrowRight className="w-4 h-4 text-white/80" />
                </Link>
                <Link
                  href="/approach"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-medium border border-slate-300 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400"
                >
                  <span>See how it works</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              </div>
            </MotionDiv>

            {/* Trust bullet tags */}
            <MotionDiv delay={0.45}>
              <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Second-law thermodynamic physics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Contractual performance guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Turnkey plant implementation</span>
                </div>
              </div>
            </MotionDiv>
          </div>

          {/* Right Column: Visual Graphic */}
          <div className="lg:col-span-5 relative">
            <MotionDiv delay={0.3}>
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl p-3">
                <div className="relative aspect-[4/3] sm:aspect-square w-full rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src="https://images.hostinger.com/7953796b-93b0-49f3-8314-6db64a5896f2.png"
                    alt="Symbolic composition of thermal, water, electric, and renewable energy converging around a glowing entropy vortex"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Metric Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 shadow-lg flex items-center justify-between">
                    <div>
                      <span className="text-teal-700 font-mono font-bold block text-sm">25% – 30%</span>
                      <span className="text-[11px] text-slate-600 font-medium">Typical Resource Utilisation Cut</span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-teal-50 text-teal-700 border border-teal-200 font-mono text-[10px] uppercase font-bold">
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
