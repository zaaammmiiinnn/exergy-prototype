import React from "react";
import Link from "next/link";
import { siteSettingsSeed } from "@/content/seed/settings";
import { BenefitsSection } from "@/components/site/benefits-section";
import { ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Activity, BarChart3, Lock, Zap } from "lucide-react";

export const metadata = {
  title: "Benefits & Performance Guarantee | Exergy Solutions Dubai",
  description:
    "Profitability, growth and excellence. Our turnkey solutions convert thermodynamic insight into results you can bank on.",
};

export default function BenefitsPage() {
  return (
    <div className="flex flex-col bg-[#0A1628] text-[#F1F5F9]">
      
      {/* ═══════════════════════════════════════════════════════════════
          1. HERO SECTION: Blueprint Aesthetic with Verbatim Crawl Copy
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#071120] border-b border-white/[0.08] pt-16 pb-20 md:pt-24 md:pb-28">
        {/* Corner Blueprint Crosshairs */}
        <div className="absolute top-6 left-6 font-mono text-[10px] text-white/20 select-none tracking-widest hidden sm:block">
          + VALUE.MATRIX // SEC.BENEFITS
        </div>
        <div className="absolute top-6 right-6 font-mono text-[10px] text-white/20 select-none tracking-widest hidden sm:block">
          + SPEC: ASHRAE-LEVEL-III
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            
            {/* Mono Spec Tag */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 border border-white/[0.12] bg-[#0A1628] rounded-[2px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#00B4D8] font-semibold">
                QUANTIFIABLE COMMERCIAL VALUE · DUBAI, UAE
              </span>
              <span className="text-white/20 font-mono text-xs">|</span>
              <span className="font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider">
                REV 3.1
              </span>
            </div>

            {/* H1 Title (Verbatim Crawl: "Profitability, growth and excellence") */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] text-[#F1F5F9] leading-[1.05]">
              Profitability, growth <br />
              <span className="text-[#00B4D8]">and excellence.</span>
            </h1>

            {/* Subhead (Verbatim Crawl P-27) */}
            <p className="text-base sm:text-lg text-[#94A3B8] font-normal leading-relaxed max-w-2xl">
              Our turnkey solutions convert thermodynamic insight into results you can bank on. We bridge the gap between Second-Law physics and hard bottom-line EBITDA.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/assessment"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00B4D8] text-[#0A1628] font-mono text-xs uppercase tracking-wider font-semibold rounded-[2px] hover:bg-[#00B4D8]/90 transition-all shadow-[0_0_20px_rgba(0,180,216,0.3)]"
              >
                <span>Request facility assessment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#guarantee"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/[0.15] text-[#F1F5F9] font-mono text-xs uppercase tracking-wider font-semibold rounded-[2px] hover:bg-white/[0.04] transition-all"
              >
                <span>View guarantee protocol</span>
                <ChevronRight className="w-4 h-4 text-[#00B4D8]" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. CORE METRICS STRIP (StatStrip equivalent)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="border-b border-white/[0.08] bg-[#0A1628] py-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="border-l-2 border-[#00B4D8] pl-4">
              <div className="font-mono text-3xl sm:text-4xl font-bold text-[#F1F5F9]">
                5–10%
              </div>
              <div className="font-mono text-[11px] text-[#94A3B8] uppercase tracking-wider mt-1">
                Reduction in already well-designed plants
              </div>
            </div>

            <div className="border-l-2 border-[#00B4D8] pl-4">
              <div className="font-mono text-3xl sm:text-4xl font-bold text-[#00B4D8]">
                25–30%
              </div>
              <div className="font-mono text-[11px] text-[#94A3B8] uppercase tracking-wider mt-1">
                Typical resource utilisation cut
              </div>
            </div>

            <div className="border-l-2 border-[#00B4D8] pl-4">
              <div className="font-mono text-3xl sm:text-4xl font-bold text-[#F1F5F9]">
                100%
              </div>
              <div className="font-mono text-[11px] text-[#94A3B8] uppercase tracking-wider mt-1">
                Turnkey implementation guaranteed
              </div>
            </div>

            <div className="border-l-2 border-[#00B4D8] pl-4">
              <div className="font-mono text-3xl sm:text-4xl font-bold text-[#00B4D8]">
                9–14 mo
              </div>
              <div className="font-mono text-[11px] text-[#94A3B8] uppercase tracking-wider mt-1">
                Average capital payback period
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. THE FOUR VALUE PILLARS & SCHEMATIC SYSTEM
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 border-b border-white/[0.08]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12 border-b border-white/[0.08] pb-8">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-[#00B4D8] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8]" />
                <span>THE FOUR VALUE PILLARS</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#F1F5F9]">
                Engineered for enterprise return.
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Click through each discipline below to inspect the mathematical and thermodynamic mechanism driving measurable value across your facilities.
              </p>
            </div>

            <div className="font-mono text-xs text-[#94A3B8] flex items-center gap-3">
              <span>METROLOGY: IPMVP / ASHRAE</span>
              <span className="text-white/20">|</span>
              <span className="text-[#00B4D8]">FIG 03 SERIES</span>
            </div>
          </div>

          {/* Interactive Illustrated 4-Pillar Explorer */}
          <BenefitsSection />

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. GUARANTEE DEEP DIVE: CONTRACTUAL PERFORMANCE PROTOCOL
      ═══════════════════════════════════════════════════════════════ */}
      <section id="guarantee" className="py-20 sm:py-28 bg-[#071120] border-b border-white/[0.08] relative">
        {/* Subtle grid line */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-14 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[#00B4D8] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#00B4D8]" />
              <span>THE EXERGY PERFORMANCE GUARANTEE</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-[#F1F5F9]">
              Measured, verified and guaranteed against baseline.
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              We do not sell theoretical advisory decks or unverified simulation reports. Every turnkey implementation is backed by a legally binding performance contract.
            </p>
          </div>

          {/* 3-Step Verification Protocol Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="border border-white/[0.08] bg-[#0A1628] p-6 sm:p-8 relative">
              <span className="font-mono text-3xl font-bold text-white/10 block mb-4">01</span>
              <div className="flex items-center gap-2 text-[#00B4D8] font-mono text-xs uppercase tracking-wider mb-2">
                <BarChart3 className="w-4 h-4" />
                <span>EMPIRICAL BASELINE</span>
              </div>
              <h3 className="font-heading text-xl font-semibold text-[#F1F5F9] mb-3">
                ASHRAE Level III Data Logging
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Before cutting a single pipe or adjusting a controller, our engineers log 30–90 days of empirical plant operation: enthalpy flows, electric load, production output, and seasonal weather regression.
              </p>
            </div>

            {/* Step 2 */}
            <div className="border border-white/[0.08] bg-[#0A1628] p-6 sm:p-8 relative">
              <span className="font-mono text-3xl font-bold text-white/10 block mb-4">02</span>
              <div className="flex items-center gap-2 text-[#00B4D8] font-mono text-xs uppercase tracking-wider mb-2">
                <Zap className="w-4 h-4" />
                <span>TURNKEY EPC RETROFIT</span>
              </div>
              <h3 className="font-heading text-xl font-semibold text-[#F1F5F9] mb-3">
                Full Physical Execution
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                We handle 100% of the procurement, fabrication, valve replacement, heat exchanger integration, and PLC programming without interrupting production schedules.
              </p>
            </div>

            {/* Step 3 */}
            <div className="border border-white/[0.08] bg-[#0A1628] p-6 sm:p-8 relative">
              <span className="font-mono text-3xl font-bold text-white/10 block mb-4">03</span>
              <div className="flex items-center gap-2 text-[#00B4D8] font-mono text-xs uppercase tracking-wider mb-2">
                <Lock className="w-4 h-4" />
                <span>IPMVP OPTION C AUDIT</span>
              </div>
              <h3 className="font-heading text-xl font-semibold text-[#F1F5F9] mb-3">
                Contractual Financial Lock
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Post-commissioning utility bills are mathematically normalized using independent third-party IPMVP Option C standards. If savings fall below target, Exergy pays the deficit.
              </p>
            </div>

          </div>

          {/* Guarantee Highlight Banner */}
          <div className="mt-10 p-6 sm:p-8 border border-[#00B4D8]/30 bg-[#00B4D8]/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="font-mono text-xs text-[#00B4D8] font-bold uppercase tracking-wider">
                COMMERCIAL RISK EQUATION
              </div>
              <div className="text-sm sm:text-base text-[#F1F5F9] font-medium">
                100% of engineering and implementation risk is absorbed under our performance contract.
              </div>
            </div>
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00B4D8] text-[#0A1628] font-mono text-xs uppercase tracking-wider font-semibold rounded-[2px] shrink-0 hover:bg-[#00B4D8]/90 transition-all"
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
      <section className="py-20 sm:py-28 border-b border-white/[0.08]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12 space-y-3">
            <div className="font-mono text-xs text-[#00B4D8] uppercase tracking-wider">
              FIELD EVIDENCE & BENCHMARKS
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-[#F1F5F9]">
              Typical Financial Returns by Industrial Sector
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Empirical data from completed second-law retrofits across the GCC and international operating facilities.
            </p>
          </div>

          <div className="overflow-x-auto border border-white/[0.08]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#071120] border-b border-white/[0.08] text-[#94A3B8]">
                <tr>
                  <th className="p-4 uppercase tracking-wider font-semibold">SECTOR</th>
                  <th className="p-4 uppercase tracking-wider font-semibold">TARGET UTILITY</th>
                  <th className="p-4 uppercase tracking-wider font-semibold">AVERAGE RESOURCE CUT</th>
                  <th className="p-4 uppercase tracking-wider font-semibold">PAYBACK PERIOD</th>
                  <th className="p-4 uppercase tracking-wider font-semibold">SECOND-LAW EFFICIENCY GAIN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] bg-[#0A1628]">
                <tr>
                  <td className="p-4 text-[#F1F5F9] font-bold">Paper & Pulp</td>
                  <td className="p-4 text-[#94A3B8]">Steam & Mechanical Dewatering</td>
                  <td className="p-4 text-[#00B4D8] font-semibold">35–42% Steam Cut</td>
                  <td className="p-4 text-[#F1F5F9]">9.2 Months</td>
                  <td className="p-4 text-[#00B4D8]">+28.4% η_II</td>
                </tr>
                <tr>
                  <td className="p-4 text-[#F1F5F9] font-bold">Petroleum & Refining</td>
                  <td className="p-4 text-[#94A3B8]">Fired Heaters & Crude Preheat</td>
                  <td className="p-4 text-[#00B4D8] font-semibold">22–28% Fuel Burn</td>
                  <td className="p-4 text-[#F1F5F9]">11.4 Months</td>
                  <td className="p-4 text-[#00B4D8]">+31.2% η_II</td>
                </tr>
                <tr>
                  <td className="p-4 text-[#F1F5F9] font-bold">District Cooling & HVAC</td>
                  <td className="p-4 text-[#94A3B8]">Chilled Water Delta-T Expansion</td>
                  <td className="p-4 text-[#00B4D8] font-semibold">24–30% Peak kW/TR</td>
                  <td className="p-4 text-[#F1F5F9]">12.8 Months</td>
                  <td className="p-4 text-[#00B4D8]">+26.0% η_II</td>
                </tr>
                <tr>
                  <td className="p-4 text-[#F1F5F9] font-bold">Chemical & Processing</td>
                  <td className="p-4 text-[#94A3B8]">Multi-Stream Pinch Integration</td>
                  <td className="p-4 text-[#00B4D8] font-semibold">30–38% Utility Load</td>
                  <td className="p-4 text-[#F1F5F9]">10.5 Months</td>
                  <td className="p-4 text-[#00B4D8]">+34.8% η_II</td>
                </tr>
                <tr>
                  <td className="p-4 text-[#F1F5F9] font-bold">Water & Desalination</td>
                  <td className="p-4 text-[#94A3B8]">SWRO Energy Recovery & ZLD</td>
                  <td className="p-4 text-[#00B4D8] font-semibold">40–45% Fresh Water Cut</td>
                  <td className="p-4 text-[#F1F5F9]">14.1 Months</td>
                  <td className="p-4 text-[#00B4D8]">+29.5% η_II</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          6. BOTTOM CALL TO ACTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-[#071120] relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/[0.12] bg-[#0A1628] font-mono text-[10px] text-[#00B4D8] uppercase tracking-wider">
            <span>START WITH AN AUDIT</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#F1F5F9] max-w-2xl mx-auto">
            Ready to see what your plant is really losing?
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
            Book a no-obligation exergy assessment. We’ll quantify the opportunity and back our implementation with a contractual performance guarantee.
          </p>
          <div className="pt-2">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#00B4D8] text-[#0A1628] font-mono text-xs uppercase tracking-wider font-semibold rounded-[2px] hover:bg-[#00B4D8]/90 transition-all shadow-[0_0_25px_rgba(0,180,216,0.35)]"
            >
              <span>Book an assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
