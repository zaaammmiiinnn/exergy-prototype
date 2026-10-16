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
            className="bg-white border border-slate-200/90 rounded-2xl p-6 hover:border-teal-500 hover:shadow-md transition-all shadow-xs"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mb-5">
              <Icon className="w-6 h-6" />
            </div>

            <h4 className="text-xl font-bold text-slate-900 mb-2.5">
              {b.title}
            </h4>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {b.description}
            </p>
          </MotionDiv>
        );
      })}
    </div>
  );
}
