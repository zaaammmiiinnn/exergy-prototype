import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MotionDiv } from "@/components/site/motion";
import { CTABand } from "@/components/site/cta-band";
import { StatStrip } from "@/components/site/stat-strip";
import { AboutVideoSection } from "@/components/site/about-video-section";
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  ShieldCheck,
  Zap,
  TrendingUp,
  Award,
  Leaf,
  Layers,
  Compass,
  Building2,
  Cpu,
  BarChart3,
  Flame,
  Droplets,
  Network,
} from "lucide-react";

export const metadata = {
  title: "About Us | Exergy Solutions Dubai",
  description:
    "To save the earth for future generations we have been pushing reduce, reuse and recycle. We are all about Reduce — engineering thermodynamic efficiency into every energy and water system.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-white">
      {/* 1. Hero Section */}
      <section className="bg-slate-50 text-slate-900 pt-16 pb-20 border-b border-slate-200 relative overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl space-y-6">
            <MotionDiv delay={0.05}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-teal-100/70 text-teal-800 border border-teal-200/80">
                <Globe className="w-3.5 h-3.5 text-teal-700" />
                <span>About Exergy Solutions · Dubai UAE</span>
              </span>
            </MotionDiv>
            <MotionDiv delay={0.15}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#12232b] tracking-tight leading-[1.1]">
                Saving the earth, one efficient process at a time
              </h1>
            </MotionDiv>
            <MotionDiv delay={0.25}>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-sans">
                To save the earth for future generations we have been pushing reduce, reuse and recycle.
                We are all about <strong className="text-slate-900 font-semibold">Reduce</strong> — we work towards making industrial and utility processes fundamentally more efficient through the laws of thermodynamics.
              </p>
            </MotionDiv>
          </div>
        </div>

        {/* Subtle background ambient graphic */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* 2. Key Verified Statistics */}
      <StatStrip />

      {/* 3. Detailed Story & Philosophy */}
      <section className="py-20 lg:py-24 bg-white text-slate-900 border-b border-slate-100">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <MotionDiv delay={0.1}>
                <span className="text-[#0c758d] font-mono text-xs uppercase tracking-wider font-bold">
                  01 / Our Core Purpose
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12232b] mt-2 mb-4 tracking-tight leading-tight">
                  Reduce, reuse, recycle — our work starts with Reduce
                </h2>
                <p className="text-slate-600 text-base leading-relaxed mb-4">
                  Reduce, reuse, recycle — our work starts with Reduce, engineering efficiency into every system we touch. From well-designed systems we attempt to reduce 5–10%, and in general we have experience of reducing resource utilisation by 25–30%.
                </p>
                <p className="text-slate-600 text-base leading-relaxed">
                  Most conventional audits count kilowatt-hours using First-Law energy conservation. We measure <strong>exergy</strong> — the useful work energy can actually do. That thermodynamic distinction lets us find savings conventional methods overlook, then integrate heating, cooling, drying, and water systems into one optimized whole.
                </p>
              </MotionDiv>

              <MotionDiv delay={0.2}>
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80">
                    <div className="text-2xl font-heading font-extrabold text-[#0c758d]">
                      5–10%
                    </div>
                    <div className="text-xs font-semibold text-slate-900 mt-1">
                      Well-Designed Facilities
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                      Deep pinch tuning and hydraulic balancing on already modern systems.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/80">
                    <div className="text-2xl font-heading font-extrabold text-[#0c758d]">
                      25–30%
                    </div>
                    <div className="text-xs font-semibold text-slate-900 mt-1">
                      Typical Resource Cut
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                      Average energy and water reductions achieved through thermodynamic recovery.
                    </p>
                  </div>
                </div>
              </MotionDiv>
            </div>

            <MotionDiv delay={0.3}>
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 bg-slate-50 shadow-2xl aspect-video lg:aspect-[4/3] group">
                <Image
                  src="https://images.hostinger.com/f5fa9afd-9b48-4bce-8326-a997fad4bd0c.png"
                  alt="Nature-inspired fluid and heat exchange patterns"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061821]/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-teal-300 font-semibold">
                      Biomimetic Flow Design
                    </span>
                    <h3 className="text-sm font-bold">Nature-Inspired Fluid & Thermal Pathways</h3>
                    <p className="text-xs text-slate-200 font-sans">
                      Solutions mimic natural cycles — cascading, reuse, and regeneration — cutting waste while staying eco-friendly.
                    </p>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* 4. Engineering Video Walkthrough Section */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="text-[#0c758d] font-mono text-xs uppercase tracking-wider font-bold">
              02 / Technical Video Demonstrations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12232b] tracking-tight">
              Watch Exergy in Motion
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Industrial facilities discharge vast quantities of useful work potential. Watch how our Second-Law engineering interventions re-engineer chillers, steam networks, and water desalination systems.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <AboutVideoSection />
          </div>
        </div>
      </section>

      {/* 5. The Four Value Pillars */}
      <section className="py-20 lg:py-24 bg-white border-b border-slate-100">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[#0c758d] font-mono text-xs uppercase tracking-wider font-bold">
              03 / Strategic Value Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12232b] tracking-tight">
              Profitability, Growth, Excellence & Sustainability
            </h2>
            <p className="text-sm text-slate-600 font-sans">
              Our turnkey solutions convert thermodynamic insight into tangible commercial results you can bank on.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: Profitability */}
            <div className="p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-[#0c758d]/50 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#0c758d] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-2xs">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono uppercase text-[#0c758d] font-bold tracking-wider">
                Pillar 01
              </span>
              <h3 className="text-lg font-bold text-[#12232b] mt-1 mb-2">Profitability</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Lower capex through right-sized design and lower opex through sustained energy and water savings. Every recommendation directly impacts EBITDA.
              </p>
            </div>

            {/* Pillar 2: Growth */}
            <div className="p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-[#0c758d]/50 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-2xs">
                <BarChart3 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono uppercase text-blue-600 font-bold tracking-wider">
                Pillar 02
              </span>
              <h3 className="text-lg font-bold text-[#12232b] mt-1 mb-2">Growth</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Freed-up utility capacity and headroom lets you expand production output without expanding your electricity and fuel bills or building new plants.
              </p>
            </div>

            {/* Pillar 3: Excellence */}
            <div className="p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-[#0c758d]/50 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-2xs">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono uppercase text-emerald-600 font-bold tracking-wider">
                Pillar 03
              </span>
              <h3 className="text-lg font-bold text-[#12232b] mt-1 mb-2">Excellence</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Best-in-class efficiency benchmarks that strengthen your ESG position, operational resilience, and compliance with Dubai and international environmental mandates.
              </p>
            </div>

            {/* Pillar 4: Sustainability */}
            <div className="p-6 rounded-2xl border border-slate-200/90 bg-white hover:border-[#0c758d]/50 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-2xs">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono uppercase text-amber-600 font-bold tracking-wider">
                Pillar 04
              </span>
              <h3 className="text-lg font-bold text-[#12232b] mt-1 mb-2">Sustainability</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Nature-inspired, eco-friendly solutions that reduce carbon emissions, water stress, and environmental footprint without sacrificing factory throughput.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. The 4-Step Engineering Discipline */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-[#0c758d] font-mono text-xs uppercase tracking-wider font-bold">
              04 / Our Engineering Discipline
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12232b] tracking-tight">
              Efficiency Engineered from Physics
            </h2>
            <p className="text-sm text-slate-600 font-sans">
              How we diagnose, model, design, and guarantee multi-utility industrial transformations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
              <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-800 font-mono font-bold text-xs flex items-center justify-center">
                01
              </div>
              <h3 className="font-bold text-base text-slate-900">Diagnose with Exergy</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                We map where energy and water quality are truly lost — not just consumed — using second-law exergy analysis to expose hidden inefficiency.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
              <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-800 font-mono font-bold text-xs flex items-center justify-center">
                02
              </div>
              <h3 className="font-bold text-base text-slate-900">Model & Optimize</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Thermodynamic modeling and pinch analysis reveal the optimal network of heat, cooling, and water flows for your specific process.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
              <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-800 font-mono font-bold text-xs flex items-center justify-center">
                03
              </div>
              <h3 className="font-bold text-base text-slate-900">Design Nature-Inspired</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Solutions mimic natural cycles — cascading, reuse, and regeneration — to cut waste while staying eco-friendly and low-impact.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3 border-teal-300 bg-teal-50/30">
              <div className="w-9 h-9 rounded-full bg-teal-600 text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                04
              </div>
              <h3 className="font-bold text-base text-slate-900">Implement, Guaranteed</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                We deliver turnkey execution with performance guarantees, so savings are contractual, measured, and verified against baseline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Regional Heritage & UAE Headquarters */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xl aspect-video lg:aspect-4/3">
              <Image
                src="https://images.hostinger.com/2025f758-1013-44c6-b723-1117c9aa2810.png"
                alt="Engineers reviewing thermodynamic data in an industrial facility"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>

            <div className="space-y-6">
              <span className="text-[#0c758d] font-mono text-xs uppercase tracking-wider font-bold">
                05 / Regional Expertise
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12232b] tracking-tight leading-tight">
                Deep industrial expertise where energy and water are mission-critical
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Operating from our headquarters in Dubai, UAE (334/6D Al Wasl Street, Al Satwa), Exergy Solutions delivers consulting and turnkey engineering across energy- and water-intensive assets throughout the Middle East.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0c758d] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Contractual Savings Guarantee</h3>
                    <p className="text-xs text-slate-500">Every intervention is measured and verified (IPMVP / ISO 50001) with performance bonded directly into our contract.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0c758d] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">End-to-End Turnkey Execution</h3>
                    <p className="text-xs text-slate-500">From preliminary exergy audits to equipment procurement, installation, and commissioning.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0c758d] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">Integrated Energy & Water Synthesis</h3>
                    <p className="text-xs text-slate-500">We treat energy and water as one continuous thermodynamic system — because in nature, they always are.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  href="/assessment"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-[#0c758d] hover:bg-[#0a6074] shadow-md shadow-[#0c758d]/20 transition-all"
                >
                  <span>Request Engineering Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all"
                >
                  <span>Contact Dubai Office</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Bottom CTA */}
      <CTABand />
    </div>
  );
}
