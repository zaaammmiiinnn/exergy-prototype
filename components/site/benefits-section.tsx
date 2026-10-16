import React from "react";
import { siteSettingsSeed } from "@/content/seed/settings";
import { MotionDiv } from "./motion";
import { DollarSign, TrendingUp, Award, Leaf } from "lucide-react";

const BENEFIT_ICONS = [DollarSign, TrendingUp, Award, Leaf];

export function BenefitsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {siteSettingsSeed.benefits.map((b, i) => {
        const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];

        return (
          <MotionDiv
            key={b.title}
            delay={i * 0.1}
            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-teal-500/40 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-5">
              <Icon className="w-6 h-6" />
            </div>

            <h4 className="text-xl font-bold text-white mb-2.5">
              {b.title}
            </h4>

            <p className="text-sm text-slate-400 leading-relaxed">
              {b.description}
            </p>
          </MotionDiv>
        );
      })}
    </div>
  );
}
