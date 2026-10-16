import React from "react";
import Link from "next/link";
import { industriesSeed } from "@/content/seed/industries";
import { MotionDiv } from "./motion";
import { ArrowUpRight, Factory, Building2, Hotel, Hospital, Flame, FileText } from "lucide-react";

const INDUSTRY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  paper: FileText,
  processing: Factory,
  petroleum: Flame,
  buildings: Building2,
  hospitality: Hotel,
  healthcare: Hospital,
};

export function IndustriesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {industriesSeed.map((ind, i) => {
        const Icon = INDUSTRY_ICONS[ind.slug] || Factory;

        return (
          <MotionDiv
            key={ind.slug}
            delay={i * 0.08}
            className="flex flex-col bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/40 hover:bg-slate-900 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-slate-800 text-teal-400 group-hover:bg-blue-600/20 group-hover:text-blue-300 transition-colors">
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                Sector 0{i + 1}
              </span>
            </div>

            <h4 className="text-lg font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
              {ind.name}
            </h4>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-grow">
              {ind.summary}
            </p>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <Link
                href={`/industries#${ind.slug}`}
                className="text-xs font-medium text-slate-300 group-hover:text-teal-400 inline-flex items-center gap-1 transition-colors"
              >
                <span>View Engineering Scope</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400" />
              </Link>
              <Link
                href={`/assessment?sector=${ind.slug}`}
                className="text-[11px] text-teal-400/90 hover:text-teal-300 font-semibold"
              >
                Book
              </Link>
            </div>
          </MotionDiv>
        );
      })}
    </div>
  );
}
