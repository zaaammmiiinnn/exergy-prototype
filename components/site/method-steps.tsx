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
            className="relative bg-slate-900/60 border border-slate-800 rounded-xl p-6 hover:border-teal-500/40 transition-colors group"
          >
            {/* Step badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-bold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded border border-teal-500/20">
                0{step.step}
              </span>
              <div className="p-2 rounded-lg bg-slate-800/80 text-slate-300 group-hover:text-teal-300 group-hover:bg-slate-800 transition-colors">
                <IconComponent className="w-5 h-5" />
              </div>
            </div>

            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
              {step.title}
            </h4>

            <p className="text-sm text-slate-400 leading-relaxed">
              {step.description}
            </p>
          </MotionDiv>
        );
      })}
    </div>
  );
}
