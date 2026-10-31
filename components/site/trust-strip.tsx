"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Leaf, TrendingUp } from "lucide-react";

const MARQUEE_TAGS = [
  "HEAT RECOVERY",
  "WATER REUSE",
  "GUARANTEED SAVINGS",
  "NATURE-INSPIRED DESIGN",
  "TURNKEY DELIVERY",
  "EXERGY ANALYSIS",
  "PINCH TECHNOLOGY",
  "STEAM OPTIMIZATION",
  "COOLING TOWERS & VPF",
];

export function TrustStrip() {
  return (
    <div className="w-full flex flex-col">
      {/* 1. Animated Teal Ticker / Marquee Ribbon (Matching Target Site) */}
      <div className="w-full bg-[#0c758d] text-white py-3.5 overflow-hidden border-y border-[#095f73] select-none">
        <div className="flex w-max animate-marquee space-x-8">
          {[...MARQUEE_TAGS, ...MARQUEE_TAGS, ...MARQUEE_TAGS].map((tag, idx) => (
            <div key={idx} className="flex items-center gap-4 text-xs font-semibold tracking-wider uppercase">
              <span>{tag}</span>
              <span className="text-[#30a66a] text-sm">🍃</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Philosophy & About Section (Matching Target Site) */}
      <section className="py-20 sm:py-28 bg-[hsl(190,30%,98%)] text-[hsl(200,40%,12%)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Heading and Story */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0d7647]">
                ABOUT US
              </div>

              <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-[1.08]">
                Saving the earth, one efficient process at a time
              </h2>

              <p className="text-base text-slate-600 leading-relaxed font-sans">
                To save the earth for future generations we have been pushing <strong className="text-slate-900 font-semibold">reduce, reuse and recycle</strong>.
              </p>

              <p className="text-base text-slate-600 leading-relaxed font-sans">
                We are all about <strong className="text-slate-900 font-semibold">Reduce</strong> — we work towards making processes more efficient.
              </p>

              <p className="text-base text-slate-600 leading-relaxed font-sans">
                From well-designed systems we attempt to reduce <span className="text-[#30a66a] font-bold">5–10%</span>, and in general we have experience of reducing resource utilisation by <span className="text-[#30a66a] font-bold">25–30%</span>.
              </p>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0c758d] hover:text-[#095f73] transition-colors group"
                >
                  <span>Read more about our philosophy & credentials</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: 2 Stat Cards + Banner Card (Matching Target Site) */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Stat Card 1 */}
                <div className="bg-white border border-slate-200/80 p-8 rounded-2xl shadow-xs space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-[#30a66a]/10 text-[#30a66a] flex items-center justify-center">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-heading text-3xl font-bold text-slate-900">
                      5–10%
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Reduction from well-designed systems
                    </div>
                  </div>
                </div>

                {/* Stat Card 2 (Teal Highlight) */}
                <div className="bg-[#0c758d] text-white p-8 rounded-2xl shadow-sm space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-heading text-3xl font-bold text-white">
                      25–30%
                    </div>
                    <div className="text-xs text-white/80 mt-1">
                      Typical resource utilisation cut
                    </div>
                  </div>
                </div>
              </div>

              {/* Full Width Info Card */}
              <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#30a66a]/10 text-[#30a66a] shrink-0 flex items-center justify-center">
                  <Leaf className="w-5 h-5" />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  Reduce, reuse, recycle — our work starts with <strong className="text-slate-900 font-semibold">Reduce</strong>, engineering efficiency into every system we touch.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
