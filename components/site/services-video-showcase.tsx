"use client";

import React, { useState } from "react";
import Link from "next/link";
import { servicesSeed } from "@/content/seed/services";
import { ServiceVideoPlayer } from "@/components/site/service-video-player";
import {
  Snowflake,
  Flame,
  Wind,
  Droplets,
  Recycle,
  Network,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  cooling: <Snowflake className="w-4 h-4" />,
  heating: <Flame className="w-4 h-4" />,
  drying: <Wind className="w-4 h-4" />,
  water: <Droplets className="w-4 h-4" />,
  "waste-heat": <Recycle className="w-4 h-4" />,
  process: <Network className="w-4 h-4" />,
};

export function ServicesVideoShowcase() {
  const [selectedSlug, setSelectedSlug] = useState<string>("cooling");
  const activeService = servicesSeed.find((s) => s.slug === selectedSlug) || servicesSeed[0];

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {servicesSeed.map((s) => {
          const isActive = s.slug === selectedSlug;
          return (
            <button
              key={s.slug}
              onClick={() => setSelectedSlug(s.slug)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs whitespace-nowrap transition-all ${
                isActive
                  ? "bg-teal-500 text-slate-950 font-bold shadow-lg shadow-teal-500/20"
                  : "bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800"
              }`}
            >
              <span className={isActive ? "text-slate-950" : "text-teal-400"}>
                {ICON_MAP[s.slug] || <Sparkles className="w-4 h-4" />}
              </span>
              <span>{s.title}</span>
            </button>
          );
        })}
      </div>

      {/* Video Viewport */}
      <div className="space-y-6">
        <ServiceVideoPlayer
          title={activeService.video_title}
          subtitle={activeService.title}
          videoUrl={activeService.video_url}
          posterUrl={activeService.video_poster}
          duration={activeService.video_duration}
          chapters={activeService.video_chapters}
          serviceTitle={activeService.title}
        />

        {/* Quick summary below video */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-teal-400 uppercase font-semibold">
              Thermodynamic Objective
            </span>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              {activeService.summary}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              href={`/services/${activeService.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 hover:text-teal-300 text-xs font-bold transition-colors border border-slate-700"
            >
              <span>Full Technical Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={`/assessment?service=${activeService.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white text-xs font-bold transition-all shadow-md"
            >
              <span>Assess Stream</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
