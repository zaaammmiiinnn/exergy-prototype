"use client";

import React from "react";
import Link from "next/link";
import { MotionDiv } from "./motion";
import { industriesSeed } from "@/content/seed/industries";
import { ArrowUpRight } from "lucide-react";
import { INDUSTRY_TECH_ICONS, OilGasIcon } from "./industry-icons";

export function IndustriesSection() {
  const [hoveredCard, setHoveredCard] = React.useState<string | null>(null);

  return (
    <section className="py-28 md:py-36 bg-[hsl(190,30%,98%)] border-t border-slate-200/80 text-[#12232b] relative">
      <div className="container max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 pb-8 border-b border-slate-200/80">
          <div className="max-w-2xl">
            <MotionDiv delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0c758d]" />
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#0c758d] font-semibold">
                  04 / INDUSTRIES & SECTORS
                </span>
              </div>
            </MotionDiv>
            <MotionDiv delay={0.15}>
              <h2 className="text-3xl sm:text-5xl font-heading font-semibold text-[#12232b] tracking-[-0.03em] leading-[1.08]">
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-teal-200 bg-white text-[#0c758d] font-medium text-xs uppercase tracking-wider hover:bg-teal-50 hover:border-teal-300 transition-all shadow-xs group"
            >
              <span>Explore sector benchmarks</span>
              <ArrowUpRight className="w-4 h-4 text-[#0c758d] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </MotionDiv>
        </div>

        {/* 3x2 Grid of Industry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industriesSeed.map((ind, index) => {
            const TechIcon = INDUSTRY_TECH_ICONS[ind.slug] || OilGasIcon;
            const indexNumber = String(index + 1).padStart(2, "0");
            const isCardHovered = hoveredCard === ind.slug;

            return (
              <MotionDiv key={ind.slug} delay={0.08 * index}>
                <Link
                  href={`/industries#${ind.slug}`}
                  onMouseEnter={() => setHoveredCard(ind.slug)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group block p-8 bg-white border border-slate-200/80 rounded-2xl hover:border-[#0c758d]/50 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden shadow-xs hover:shadow-md flex flex-col justify-between min-h-[300px]"
                >
                  {/* Subtle top indicator bar on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#0c758d] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />

                  {/* Header Row: Large Mono Number & 40px Technical Line Icon */}
                  <div>
                    <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                      <span className="font-mono text-3xl font-bold text-slate-300 group-hover:text-[#0c758d] transition-colors">
                        {indexNumber}
                      </span>
                      {/* Technical Icon with container */}
                      <div className="w-12 h-12 rounded-xl border border-teal-100 bg-teal-50/70 flex items-center justify-center p-1 group-hover:border-[#0c758d]/40 group-hover:bg-teal-50 transition-colors">
                        <TechIcon isHovered={isCardHovered} />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="mt-6 space-y-2.5">
                      <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[#12232b] group-hover:text-[#0c758d] transition-colors tracking-tight">
                        {ind.name}
                      </h3>
                      <p className="text-sm text-slate-600 font-sans leading-relaxed line-clamp-2">
                        {ind.summary}
                      </p>
                    </div>
                  </div>

                  {/* Footer Row: Challenges Snippet & Arrow */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between font-mono text-xs">
                    <span className="text-slate-400 uppercase tracking-wider text-[10px]">
                      {ind.challenges?.[0] || "Thermodynamic Optimization"}
                    </span>
                    <span className="text-[#0c758d] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-semibold">
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
