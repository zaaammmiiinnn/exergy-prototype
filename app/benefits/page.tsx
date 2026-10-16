import React from "react";
import { siteSettingsSeed } from "@/content/seed/settings";
import { BenefitsSection } from "@/components/site/benefits-section";
import { StatStrip } from "@/components/site/stat-strip";
import { CTABand } from "@/components/site/cta-band";
import { MotionDiv } from "@/components/site/motion";
import { ShieldCheck, Award, TrendingUp, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Benefits & Guarantee | Exergy Solutions Dubai",
  description: "Profitability, growth and excellence. Our turnkey solutions convert thermodynamic insight into contractual results you can bank on.",
};

export default function BenefitsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-slate-50 text-slate-900 pt-16 pb-20 border-b border-slate-200 relative">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <MotionDiv delay={0.05}>
              <span className="text-teal-700 font-mono text-xs uppercase tracking-wider font-semibold">
                Quantifiable Value
              </span>
            </MotionDiv>
            <MotionDiv delay={0.15}>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Profitability, growth and excellence
              </h1>
            </MotionDiv>
            <MotionDiv delay={0.25}>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our turnkey solutions convert thermodynamic insight into results you can bank on. We bridge the gap between engineering theory and hard bottom-line EBITDA.
              </p>
            </MotionDiv>
          </div>
        </div>
      </section>

      <StatStrip />

      {/* Pillars Section */}
      <section className="py-20 bg-white text-slate-900">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-14 max-w-2xl">
            <span className="text-teal-700 font-mono text-xs uppercase tracking-wider font-semibold">
              The Four Value Pillars
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2 mb-3 tracking-tight">
              Why Heavy Industries Partner with Exergy
            </h2>
          </div>

          <BenefitsSection />

          {/* Guarantee Deep Dive */}
          <div className="mt-16 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-teal-50/50 via-slate-50 to-blue-50/40 border border-teal-200 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2 text-teal-700 font-mono text-xs uppercase font-bold">
                  <ShieldCheck className="w-5 h-5 text-teal-600" />
                  <span>The Turnkey Performance Guarantee</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Contractual, measured, and verified against baseline
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We don’t just deliver audit reports. We implement the complete physical engineering solution — and tie our compensation directly to contractually verified energy and water reductions.
                </p>
              </div>

              <div className="shrink-0 bg-white border border-teal-200 rounded-xl p-4 text-center shadow-xs">
                <span className="text-3xl font-mono font-bold text-teal-700 block">
                  {siteSettingsSeed.stats.stat_typical_cut}
                </span>
                <span className="text-xs text-slate-500">Resource cut</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  );
}
