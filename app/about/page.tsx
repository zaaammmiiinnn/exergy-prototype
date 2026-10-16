import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MotionDiv } from "@/components/site/motion";
import { CTABand } from "@/components/site/cta-band";
import { StatStrip } from "@/components/site/stat-strip";
import { ArrowRight, CheckCircle2, Globe, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "About Us | Exergy Solutions Dubai",
  description: "To save the earth for future generations we have been pushing reduce, reuse and recycle. We are all about Reduce — engineering efficiency into every system.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-navy-950 text-white pt-16 pb-20 border-b border-slate-800 relative">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <MotionDiv delay={0.05}>
              <span className="text-teal-400 font-mono text-xs uppercase tracking-wider font-semibold">
                About Exergy Solutions
              </span>
            </MotionDiv>
            <MotionDiv delay={0.15}>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Saving the earth, one efficient process at a time
              </h1>
            </MotionDiv>
            <MotionDiv delay={0.25}>
              <p className="text-lg text-slate-300 leading-relaxed">
                To save the earth for future generations we have been pushing reduce, reuse and recycle. We are all about Reduce — we work towards making processes more efficient.
              </p>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatStrip />

      {/* Story & Philosophy */}
      <section className="py-20 bg-slate-950 text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <MotionDiv delay={0.1}>
                <span className="text-teal-400 font-mono text-xs uppercase tracking-wider font-semibold">
                  Our Core Purpose
                </span>
                <h2 className="text-3xl font-extrabold text-white mt-2 mb-4 tracking-tight">
                  Reduce, reuse, recycle — our work starts with Reduce
                </h2>
                <p className="text-slate-300 text-base leading-relaxed mb-4">
                  Reduce, reuse, recycle — our work starts with Reduce, engineering efficiency into every system we touch. From well-designed systems we attempt to reduce 5–10%, and in general we have experience of reducing resource utilisation by 25–30%.
                </p>
                <p className="text-slate-400 text-base leading-relaxed">
                  We apply second-law thermodynamics to identify where work potential is truly destroyed — eliminating parasitic losses across cooling towers, steam generation, mechanical dewatering, and wastewater treatment.
                </p>
              </MotionDiv>

              <MotionDiv delay={0.2}>
                <div className="pt-4 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white text-sm">Contractual Performance Guarantees</h4>
                      <p className="text-xs text-slate-400">All turnkey interventions are measured, verified, and guaranteed against baseline.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-white text-sm">Dubai & Regional Headquarters</h4>
                      <p className="text-xs text-slate-400">Based in Dubai, UAE, serving heavy industrial and commercial utility operations.</p>
                    </div>
                  </div>
                </div>
              </MotionDiv>
            </div>

            <MotionDiv delay={0.3}>
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl aspect-video lg:aspect-square">
                <Image
                  src="https://images.hostinger.com/f5fa9afd-9b48-4bce-8326-a997fad4bd0c.png"
                  alt="Nature-inspired fluid and heat exchange patterns"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
