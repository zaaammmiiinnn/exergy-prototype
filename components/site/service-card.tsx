import React from "react";
import Link from "next/link";
import { ServiceSeed } from "@/content/seed/services";
import { ArrowRight, Check, Snowflake, Flame, Wind, Droplets, Recycle, Network } from "lucide-react";
import { MotionDiv } from "./motion";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Snowflake,
  Flame,
  Wind,
  Droplets,
  Recycle,
  Network,
};

export function ServiceCard({
  service,
  index = 0,
}: {
  service: ServiceSeed;
  index?: number;
}) {
  const IconComponent = ICON_MAP[service.icon] || Network;

  return (
    <MotionDiv
      delay={index * 0.08}
      className="flex flex-col bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-7 hover:border-teal-500/50 hover:bg-slate-900 transition-all group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600/20 to-teal-500/20 border border-teal-500/30 text-teal-400 group-hover:scale-105 transition-transform">
          <IconComponent className="w-6 h-6" />
        </div>
        <span className="text-xs font-mono text-slate-500">
          0{index + 1}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-teal-300 transition-colors">
        {service.title}
      </h3>

      <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-grow">
        {service.summary}
      </p>

      {/* Highlights */}
      <ul className="space-y-2 mb-6 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
        {service.highlights.slice(0, 3).map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between pt-2">
        <Link
          href={`/services/${service.slug}`}
          className="text-xs font-semibold text-teal-400 hover:text-teal-300 inline-flex items-center gap-1.5 transition-colors"
        >
          <span>Explore Service</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href={`/assessment?service=${service.slug}`}
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          Assess Plant
        </Link>
      </div>
    </MotionDiv>
  );
}
