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
                  ? "bg-teal-700 text-white font-bold shadow-md shadow-teal-700/20"
                  : "bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-2xs"
              }`}
            >
              <span className={isActive ? "text-white" : "text-teal-700"}>
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
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono text-teal-700 uppercase font-bold tracking-wider">
              Thermodynamic Objective
            </span>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              {activeService.summary}
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              href={`/services/${activeService.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors border border-slate-200"
            >
              <span>Full Technical Specs</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
            </Link>
            <Link
              href={`/assessment?service=${activeService.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-teal-600 hover:from-blue-800 hover:to-teal-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              <span>Assess Stream</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
