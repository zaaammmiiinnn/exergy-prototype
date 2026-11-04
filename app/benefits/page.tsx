import React from "react";
import Link from "next/link";
import { BenefitsSection } from "@/components/site/benefits-section";
import { CTABand } from "@/components/site/cta-band";
import { MotionDiv } from "@/components/site/motion";
import { ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, BarChart3, Lock, Zap } from "lucide-react";

import { constructMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { getWebPageSchema, getBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata = constructMetadata({
  title: "Benefits & Contractual Guarantee | Exergy Solutions Dubai",
  description:
    "Explore the tangible ROI of thermodynamic optimization: 25-30% OPEX cuts, reduced CAPEX through right-sizing, freed capacity, and contractually guaranteed savings against baseline.",
  path: "/benefits",
});

export default function BenefitsPage() {
  const pageSchema = getWebPageSchema({
    title: "Benefits & Performance Guarantee | Exergy Solutions Dubai",
    description:
      "Explore the tangible ROI of thermodynamic optimization: 25-30% OPEX cuts, reduced CAPEX through right-sizing, freed capacity, and contractually guaranteed savings.",
    url: "/benefits",
    type: "WebPage",
  });

  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Benefits & Guarantee", url: "/benefits" },
  ]);

  return (
    <div className="flex flex-col bg-white text-slate-900">
      <JsonLd data={[pageSchema, breadcrumbs]} />

      {/* ═══════════════════════════════════════════════════════════════
          1. HERO SECTION: Clean Light Engineering Executive Aesthetic
      ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 text-slate-900 pt-16 pb-20 border-b border-slate-200 relative overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <MotionDiv delay={0.05}>
              <span className="text-[#0c758d] font-mono text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0c758d]" />
                Quantifiable Commercial Value · Dubai, UAE
              </span>
            </MotionDiv>

            <MotionDiv delay={0.15}>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Profitability, growth <br />
                <span className="text-[#0c758d]">and excellence.</span>
              </h1>
            </MotionDiv>

            <MotionDiv delay={0.25}>
              <p className="text-lg text-slate-600 leading-relaxed font-sans max-w-2xl">
                Our turnkey solutions convert thermodynamic insight into results you can bank on. We bridge the gap between Second-Law physics and hard bottom-line EBITDA.
              </p>
            </MotionDiv>

            <MotionDiv delay={0.35}>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/assessment"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0c758d] hover:bg-[#095f73] text-white font-semibold text-xs rounded-full shadow-sm hover:shadow transition-all"
                >
                  <span>Request facility assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#guarantee"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-full shadow-2xs transition-all"
                >
                  <span>View guarantee protocol</span>
                  <ChevronRight className="w-4 h-4 text-[#0c758d]" />
                </a>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. CORE METRICS STRIP (StatStrip equivalent)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="border-b border-slate-200 bg-white py-10 sm:py-12">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="border-l-3 border-[#0c758d] pl-5">
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                5–10%
              </div>
              <div className="font-mono text-xs text-slate-500 uppercase tracking-wider mt-1.5 font-medium">
                Reduction in already well-designed plants
              </div>
            </div>

            <div className="border-l-3 border-[#0c758d] pl-5">
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0c758d] tracking-tight">
                25–30%
              </div>
              <div className="font-mono text-xs text-slate-500 uppercase tracking-wider mt-1.5 font-medium">
                Typical resource utilisation cut
              </div>
            </div>

            <div className="border-l-3 border-[#0c758d] pl-5">
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                100%
              </div>
              <div className="font-mono text-xs text-slate-500 uppercase tracking-wider mt-1.5 font-medium">
                Turnkey implementation guaranteed
              </div>
            </div>

            <div className="border-l-3 border-[#0c758d] pl-5">
              <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0c758d] tracking-tight">
                9–14 mo
              </div>
              <div className="font-mono text-xs text-slate-500 uppercase tracking-wider mt-1.5 font-medium">
                Average capital payback period
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. THE FOUR VALUE PILLARS & SCHEMATIC SYSTEM
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12 pb-6 border-b border-slate-200">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#0c758d] uppercase tracking-wider font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0c758d]" />
                <span>The Four Value Pillars</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                Engineered for enterprise return
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-sans">
                Click through each discipline below to inspect the mathematical and thermodynamic mechanism driving measurable value across your facilities.
              </p>
            </div>

            <div className="font-mono text-xs text-slate-500 flex items-center gap-3">
              <span>METROLOGY: IPMVP / ASHRAE</span>
              <span className="text-slate-300">|</span>
              <span className="text-[#0c758d] font-semibold">FIG 03 SERIES</span>
            </div>
          </div>

          {/* Interactive Illustrated 4-Pillar Explorer */}
          <BenefitsSection />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. GUARANTEE DEEP DIVE: CONTRACTUAL PERFORMANCE PROTOCOL
      ═══════════════════════════════════════════════════════════════ */}
      <section id="guarantee" className="py-20 sm:py-28 bg-white border-b border-slate-200 relative">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-14 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[#0c758d] uppercase tracking-wider font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#0c758d]" />
              <span>THE EXERGY PERFORMANCE GUARANTEE</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Measured, verified and guaranteed against baseline.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-sans">
              We do not sell theoretical advisory decks or unverified simulation reports. Every turnkey implementation is backed by a legally binding performance contract.
            </p>
          </div>

          {/* 3-Step Verification Protocol Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="border border-slate-200/90 bg-slate-50/70 rounded-2xl p-6 sm:p-8 relative shadow-2xs hover:shadow-sm transition-shadow">
              <span className="font-heading text-4xl font-extrabold text-slate-300 block mb-3">01</span>
              <div className="flex items-center gap-2 text-[#0c758d] font-mono text-xs uppercase tracking-wider mb-2 font-semibold">
                <BarChart3 className="w-4 h-4" />
                <span>EMPIRICAL BASELINE</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">
                ASHRAE Level III Data Logging
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                Before cutting a single pipe or adjusting a controller, our engineers log 30–90 days of empirical plant operation: enthalpy flows, electric load, production output, and seasonal weather regression.
              </p>
            </div>

            {/* Step 2 */}
            <div className="border border-slate-200/90 bg-slate-50/70 rounded-2xl p-6 sm:p-8 relative shadow-2xs hover:shadow-sm transition-shadow">
              <span className="font-heading text-4xl font-extrabold text-slate-300 block mb-3">02</span>
              <div className="flex items-center gap-2 text-[#0c758d] font-mono text-xs uppercase tracking-wider mb-2 font-semibold">
                <Zap className="w-4 h-4" />
                <span>TURNKEY EPC RETROFIT</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">
                Full Physical Execution
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                We handle 100% of the procurement, fabrication, valve replacement, heat exchanger integration, and PLC programming without interrupting production schedules.
              </p>
            </div>

            {/* Step 3 */}
            <div className="border border-slate-200/90 bg-slate-50/70 rounded-2xl p-6 sm:p-8 relative shadow-2xs hover:shadow-sm transition-shadow">
              <span className="font-heading text-4xl font-extrabold text-slate-300 block mb-3">03</span>
              <div className="flex items-center gap-2 text-[#0c758d] font-mono text-xs uppercase tracking-wider mb-2 font-semibold">
                <Lock className="w-4 h-4" />
                <span>IPMVP OPTION C AUDIT</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">
                Contractual Financial Lock
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">
                Post-commissioning utility bills are mathematically normalized using independent third-party IPMVP Option C standards. If savings fall below target, Exergy pays the deficit.
              </p>
            </div>
          </div>

          {/* Guarantee Highlight Banner */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl border border-teal-200 bg-teal-50/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xs">
            <div className="space-y-1">
              <div className="font-mono text-xs text-[#0c758d] font-bold uppercase tracking-wider">
                COMMERCIAL RISK EQUATION
              </div>
              <div className="text-base text-slate-800 font-semibold font-sans">
                100% of engineering and implementation risk is absorbed under our performance contract.
              </div>
            </div>
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0c758d] hover:bg-[#095f73] text-white font-semibold text-xs rounded-full shrink-0 shadow-sm transition-all"
            >
              <span>Audit your facility</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          5. SECTOR PAYBACK & CAPITAL EFFICIENCY MATRIX
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12 space-y-3">
            <div className="font-mono text-xs text-[#0c758d] uppercase tracking-wider font-semibold">
              FIELD EVIDENCE & BENCHMARKS
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Typical Financial Returns by Industrial Sector
            </h2>
            <p className="text-base text-slate-600 font-sans">
              Empirical data from completed second-law retrofits across the GCC and international operating facilities.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 bg-white rounded-2xl shadow-xs">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-100/80 border-b border-slate-200 text-slate-600">
                <tr>
                  <th className="p-4 sm:px-6 uppercase tracking-wider font-semibold">SECTOR</th>
                  <th className="p-4 uppercase tracking-wider font-semibold">TARGET UTILITY</th>
                  <th className="p-4 uppercase tracking-wider font-semibold">AVERAGE RESOURCE CUT</th>
                  <th className="p-4 uppercase tracking-wider font-semibold">PAYBACK PERIOD</th>
                  <th className="p-4 sm:px-6 uppercase tracking-wider font-semibold">SECOND-LAW EFFICIENCY GAIN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 sm:px-6 text-slate-900 font-bold font-sans">Paper & Pulp</td>
                  <td className="p-4 text-slate-600 font-sans">Steam & Mechanical Dewatering</td>
                  <td className="p-4 text-[#0c758d] font-bold">35–42% Steam Cut</td>
                  <td className="p-4 text-slate-800 font-semibold">9.2 Months</td>
                  <td className="p-4 sm:px-6 text-teal-700 font-bold">+28.4% η_II</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 sm:px-6 text-slate-900 font-bold font-sans">Petroleum & Refining</td>
                  <td className="p-4 text-slate-600 font-sans">Fired Heaters & Crude Preheat</td>
                  <td className="p-4 text-[#0c758d] font-bold">22–28% Fuel Burn</td>
                  <td className="p-4 text-slate-800 font-semibold">11.4 Months</td>
                  <td className="p-4 sm:px-6 text-teal-700 font-bold">+31.2% η_II</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 sm:px-6 text-slate-900 font-bold font-sans">District Cooling & HVAC</td>
                  <td className="p-4 text-slate-600 font-sans">Chilled Water Delta-T Expansion</td>
                  <td className="p-4 text-[#0c758d] font-bold">24–30% Peak kW/TR</td>
                  <td className="p-4 text-slate-800 font-semibold">12.8 Months</td>
                  <td className="p-4 sm:px-6 text-teal-700 font-bold">+26.0% η_II</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 sm:px-6 text-slate-900 font-bold font-sans">Chemical & Processing</td>
                  <td className="p-4 text-slate-600 font-sans">Multi-Stream Pinch Integration</td>
                  <td className="p-4 text-[#0c758d] font-bold">30–38% Utility Load</td>
                  <td className="p-4 text-slate-800 font-semibold">10.5 Months</td>
                  <td className="p-4 sm:px-6 text-teal-700 font-bold">+34.8% η_II</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 sm:px-6 text-slate-900 font-bold font-sans">Water & Desalination</td>
                  <td className="p-4 text-slate-600 font-sans">SWRO Energy Recovery & ZLD</td>
                  <td className="p-4 text-[#0c758d] font-bold">40–45% Fresh Water Cut</td>
                  <td className="p-4 text-slate-800 font-semibold">14.1 Months</td>
                  <td className="p-4 sm:px-6 text-teal-700 font-bold">+29.5% η_II</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          6. BOTTOM CALL TO ACTION
      ═══════════════════════════════════════════════════════════════ */}
      <CTABand />
    </div>
  );
}
