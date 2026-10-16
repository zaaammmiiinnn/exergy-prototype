import React from "react";
import Image from "next/image";
import Link from "next/link";
import { industriesSeed } from "@/content/seed/industries";
import { MotionDiv } from "@/components/site/motion";
import { CTABand } from "@/components/site/cta-band";
import { ArrowRight, CheckCircle2, Factory, ShieldCheck, Gauge } from "lucide-react";

export const metadata = {
  title: "Industries Served | Exergy Solutions Dubai",
  description: "Deep expertise where energy and water are mission-critical: Paper, Processing, Petroleum, Buildings, Hospitality, and Healthcare.",
};

export default function IndustriesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-navy-950 text-white pt-16 pb-20 border-b border-slate-800 relative">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <MotionDiv delay={0.05}>
              <span className="text-teal-400 font-mono text-xs uppercase tracking-wider font-semibold">
                Industrial & Commercial Sectors
              </span>
            </MotionDiv>
            <MotionDiv delay={0.15}>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Deep expertise where energy and water are mission-critical
              </h1>
            </MotionDiv>
            <MotionDiv delay={0.25}>
              <p className="text-lg text-slate-300 leading-relaxed">
                Energy- and water-intensive, made efficient. We understand the specific thermodynamic constraints and operating uptime requirements of your industrial operations.
              </p>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Industry Detail Sections */}
      <section className="py-20 bg-slate-950 text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
          {industriesSeed.map((ind, i) => (
            <div
              key={ind.slug}
              id={ind.slug}
              className="scroll-mt-24 p-8 sm:p-10 rounded-2xl bg-slate-900/60 border border-slate-800 transition-colors hover:border-slate-700"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-teal-400 font-semibold uppercase bg-teal-500/10 px-2.5 py-1 rounded">
                      Sector 0{i + 1}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {ind.name}
                    </h2>
                  </div>

                  <p className="text-base text-teal-300 font-medium">
                    {ind.summary}
                  </p>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {ind.body_md}
                  </p>

                  <div className="pt-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                      Primary Thermodynamic Challenges Solved:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                      {ind.challenges.map((c, idx) => (
                        <div key={idx} className="flex items-start gap-2 bg-slate-800/50 p-2.5 rounded-lg border border-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4">
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
                    <Image
                      src={ind.hero_image}
                      alt={ind.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 350px"
                    />
                  </div>

                  <Link
                    href={`/assessment?sector=${ind.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-md transition-all hover:scale-[1.01]"
                  >
                    <Gauge className="w-4 h-4" />
                    <span>Request {ind.name} Assessment</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABand />
    </div>
  );
}
