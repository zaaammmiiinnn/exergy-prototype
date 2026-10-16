import React from "react";
import { siteSettingsSeed } from "@/content/seed/settings";
import { MotionDiv } from "./motion";
import { Search, Network, Leaf, Award } from "lucide-react";

const STEP_ICONS = [Search, Network, Leaf, Award];

export function MethodSteps() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {siteSettingsSeed.method_steps.map((step, idx) => {
        const IconComponent = STEP_ICONS[idx % STEP_ICONS.length];

        return (
          <MotionDiv
            key={step.step}
            delay={idx * 0.1}
            className="relative bg-white border border-slate-200/90 rounded-2xl p-6 hover:border-teal-500 hover:shadow-md transition-all shadow-xs group"
          >
            {/* Step badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                0{step.step}
              </span>
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 group-hover:text-teal-700 group-hover:bg-teal-50 transition-colors">
                <IconComponent className="w-5 h-5" />
              </div>
            </div>

            <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
              {step.title}
            </h4>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {step.description}
            </p>
          </MotionDiv>
        );
      })}
    </div>
  );
}
