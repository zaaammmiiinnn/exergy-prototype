"use client";

import React, { useState } from "react";
import { ServiceVideoPlayer } from "@/components/site/service-video-player";
import { servicesSeed } from "@/content/seed/services";
import { Snowflake, Flame, Droplets, Sparkles, ShieldCheck } from "lucide-react";

export function AboutVideoSection() {
  const featuredServices = [
    {
      key: "cooling",
      label: "Cooling & Chillers",
      icon: Snowflake,
      service: servicesSeed.find((s) => s.slug === "cooling") || servicesSeed[0],
    },
    {
      key: "heating",
      label: "Steam & Heating",
      icon: Flame,
      service: servicesSeed.find((s) => s.slug === "heating") || servicesSeed[1],
    },
    {
      key: "water",
      label: "Water & Desalination",
      icon: Droplets,
      service: servicesSeed.find((s) => s.slug === "water") || servicesSeed[3],
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const activeItem = featuredServices[activeTab];

  return (
    <div className="space-y-6">
      {/* Video Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {featuredServices.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = activeTab === idx;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(idx)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#0c758d] text-white shadow-md shadow-[#0c758d]/25 border border-transparent"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-[#0c758d]"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Embedded Video Player */}
      <ServiceVideoPlayer
        title={activeItem.service.video_title}
        subtitle={activeItem.service.summary}
        videoUrl={activeItem.service.video_url}
        posterUrl={activeItem.service.video_poster}
        duration={activeItem.service.video_duration}
        chapters={activeItem.service.video_chapters}
        serviceTitle={activeItem.service.title}
      />

      {/* Physics Takeaway */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-[#0c758d] flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase text-[#0c758d] font-bold tracking-wider block">
              Second-Law Engineering Takeaway
            </span>
            <p className="text-xs text-slate-700 mt-0.5 font-sans leading-relaxed">
              {activeItem.service.thermodynamic_principle}
            </p>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Guaranteed Performance</span>
        </div>
      </div>
    </div>
  );
}
