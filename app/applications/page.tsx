import React from "react";
import Link from "next/link";
import { servicesSeed } from "@/content/seed/services";
import { industriesSeed } from "@/content/seed/industries";
import { MotionDiv } from "@/components/site/motion";
import { CTABand } from "@/components/site/cta-band";
import { ArrowRight, Layers, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Applications | Where Exergy Solutions Delivers Savings",
  description: "Energy- and water-intensive, made efficient. Wherever heat, cold, moisture or water quality drives your costs, exergy analysis reveals a leaner path.",
};

export default function ApplicationsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-navy-950 text-white pt-16 pb-20 border-b border-slate-800 relative">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <MotionDiv delay={0.05}>
              <span className="text-teal-400 font-mono text-xs uppercase tracking-wider font-semibold">
                Integrated Industrial Applications
              </span>
            </MotionDiv>
            <MotionDiv delay={0.15}>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Energy- and water-intensive, made efficient
              </h1>
            </MotionDiv>
            <MotionDiv delay={0.25}>
              <p className="text-lg text-slate-300 leading-relaxed">
                Wherever heat, cold, moisture or water quality drives your costs, exergy analysis reveals a leaner path. We treat energy and water as one integrated system — because in nature, they always are.
              </p>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Applications Matrix */}
      <section className="py-20 bg-slate-950 text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <span className="text-teal-400 font-mono text-xs uppercase font-semibold">
              Cross-Utility Optimization
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Where Thermodynamic Losses Occur & How We Intervene
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesSeed.map((service) => (
              <div
                key={service.slug}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">
                      {service.title}
                    </h3>
                    <span className="px-2.5 py-1 rounded bg-teal-500/10 text-teal-400 font-mono text-xs font-semibold">
                      Contractual Guarantee
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {service.summary}
                  </p>

                  <div className="space-y-2 mb-6 text-xs text-slate-400">
                    {service.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-xs font-semibold text-teal-400 hover:text-teal-300 inline-flex items-center gap-1.5"
                  >
                    <span>Deep dive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={`/assessment?service=${service.slug}`}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Request audit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
