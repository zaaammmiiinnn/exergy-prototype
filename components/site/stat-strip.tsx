import React from "react";
import { siteSettingsSeed } from "@/content/seed/settings";
import { ShieldCheck, TrendingDown, Gauge } from "lucide-react";
import { MotionDiv } from "./motion";

export function StatStrip() {
  return (
    <section className="bg-slate-900 border-y border-slate-800 py-10 text-white">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800">
          {/* Stat 1 */}
          <MotionDiv delay={0.1} className="flex items-center gap-4 pt-4 md:pt-0 md:px-6 first:pl-0">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
                {siteSettingsSeed.stats.stat_well_designed}
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Reduction from well-designed systems
              </p>
            </div>
          </MotionDiv>

          {/* Stat 2 */}
          <MotionDiv delay={0.2} className="flex items-center gap-4 pt-6 md:pt-0 md:px-6">
            <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 shrink-0">
              <Gauge className="w-6 h-6" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-mono font-bold text-teal-400 tracking-tight">
                {siteSettingsSeed.stats.stat_typical_cut}
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Typical resource utilisation cut
              </p>
            </div>
          </MotionDiv>

          {/* Guarantee */}
          <MotionDiv delay={0.3} className="flex items-center gap-4 pt-6 md:pt-0 md:px-6">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
                Contractual Guarantee
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 capitalize leading-snug">
                {siteSettingsSeed.stats.guarantee_text}
              </p>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
