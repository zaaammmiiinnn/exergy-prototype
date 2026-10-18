"use client";

import React from "react";
import Link from "next/link";
import { MotionDiv } from "./motion";
import { industriesSeed } from "@/content/seed/industries";
import { ArrowUpRight, Factory, Layers, Flame, Building2, Hotel, Hospital } from "lucide-react";

const INDUSTRY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  paper: Factory,
  processing: Layers,
  petroleum: Flame,
  buildings: Building2,
  hospitality: Hotel,
  healthcare: Hospital,
};

export function IndustriesSection() {
  return (
    <section className="py-28 md:py-36 bg-[#F8FAFC] border-t border-[rgba(10,22,40,0.10)] text-[#0A1628] relative">
      <div className="container max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-[rgba(10,22,40,0.10)]">
          <div className="max-w-2xl">
            <MotionDiv delay={0.05}>
              <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#0077B6] font-semibold mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-[1px] bg-[#00B4D8]" />
                <span>04 / INDUSTRIES</span>
              </div>
            </MotionDiv>
            <MotionDiv delay={0.15}>
              <h2 className="text-3xl sm:text-5xl font-heading font-semibold text-[#0A1628] tracking-[-0.03em] leading-[1.05]">
                Six sectors. Same physics.
              </h2>
            </MotionDiv>
            <MotionDiv delay={0.25}>
              <p className="text-slate-600 text-base md:text-lg mt-4 leading-relaxed font-sans max-w-xl">
                Thermodynamic irreversibility does not change across industry boundaries. Wherever heat, cold, steam or water drives your operating costs, exergy modeling exposes the path to minimum utility consumption.
              </p>
            </MotionDiv>
          </div>

          <MotionDiv delay={0.3}>
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-[#0A1628] hover:text-[#0077B6] font-semibold transition-colors px-4 py-2.5 border border-[rgba(10,22,40,0.15)] rounded-[2px] bg-white shadow-xs hover:border-[#00B4D8]"
            >
              <span>Explore sector benchmarks</span>
              <ArrowUpRight className="w-4 h-4 text-[#0077B6]" />
            </Link>
          </MotionDiv>
        </div>

        {/* 3x2 Grid of Industry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industriesSeed.map((ind, index) => {
            const Icon = INDUSTRY_ICONS[ind.slug] || Factory;
            const indexNumber = String(index + 1).padStart(2, "0");

            return (
              <MotionDiv key={ind.slug} delay={0.08 * index}>
                <Link
                  href={`/industries#${ind.slug}`}
                  className="group block p-8 bg-white border border-[rgba(10,22,40,0.10)] rounded-[2px] hover:border-[#00B4D8] transition-all duration-300 relative overflow-hidden shadow-xs hover:shadow-md flex flex-col justify-between min-h-[300px]"
                >
                  {/* Subtle top indicator bar on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#00B4D8] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />

                  {/* Header Row: Large Mono Number & Icon */}
                  <div>
                    <div className="flex items-center justify-between pb-6 border-b border-[rgba(10,22,40,0.06)]">
                      <span className="font-mono text-3xl font-bold text-slate-300 group-hover:text-[#0077B6] transition-colors">
                        {indexNumber}
                      </span>
                      <div className="w-10 h-10 rounded-[2px] border border-[rgba(10,22,40,0.10)] bg-slate-50 flex items-center justify-center text-slate-700 group-hover:text-[#00B4D8] group-hover:border-[#00B4D8]/30 group-hover:bg-[#00B4D8]/5 transition-colors">
                        <Icon className="w-5 h-5 stroke-[1.5]" />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="mt-6 space-y-2.5">
                      <h3 className="font-heading text-2xl font-semibold text-[#0A1628] group-hover:text-[#0077B6] transition-colors tracking-tight">
                        {ind.name}
                      </h3>
                      <p className="text-sm text-slate-600 font-sans leading-relaxed line-clamp-2">
                        {ind.summary}
                      </p>
                    </div>
                  </div>

                  {/* Footer Row: Challenges Snippet & Arrow */}
                  <div className="pt-6 mt-6 border-t border-[rgba(10,22,40,0.06)] flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-500 uppercase tracking-wider text-[10px]">
                      {ind.challenges?.[0] || "Thermodynamic Optimization"}
                    </span>
                    <span className="text-[#0077B6] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-semibold">
                      <span>SPECS</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </MotionDiv>
            );
          })}
        </div>

      </div>
    </section>
  );
}
