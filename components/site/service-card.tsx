import React from "react";
import Link from "next/link";
import { ServiceSeed } from "@/content/seed/services";
import {
  ArrowRight,
  Check,
  Snowflake,
  Flame,
  Wind,
  Droplets,
  Recycle,
  Network,
  Zap,
  Gauge,
  Sun,
  Layers,
  Factory,
  Cpu,
  ShieldCheck,
  Box,
  Activity,
} from "lucide-react";
import { MotionDiv } from "./motion";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Snowflake,
  Flame,
  Wind,
  Droplets,
  Recycle,
  Network,
  Zap,
  Gauge,
  Sun,
  Layers,
  Factory,
  Cpu,
  ShieldCheck,
  Box,
  Activity,
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
      className="flex flex-col bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 hover:border-teal-500 hover:shadow-lg transition-all group shadow-xs"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 group-hover:scale-105 transition-transform shadow-2xs">
          <IconComponent className="w-6 h-6" />
        </div>
        <span className="text-xs font-mono font-semibold text-slate-400">
          0{index + 1}
        </span>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-teal-700 transition-colors">
        {service.title}
      </h3>

      <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-grow">
        {service.summary}
      </p>

      {/* Highlights */}
      <ul className="space-y-2 mb-6 pt-4 border-t border-slate-200 text-xs text-slate-700 font-medium">
        {service.highlights.slice(0, 3).map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between pt-2">
        <Link
          href={`/services/${service.slug}`}
          className="text-xs font-bold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1.5 transition-colors"
        >
          <span>Explore Service</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href={`/assessment?service=${service.slug}`}
          className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          Assess Plant
        </Link>
      </div>
    </MotionDiv>
  );
}
