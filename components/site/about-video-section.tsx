"use client";

import React, { useState } from "react";
import { IllustrativeExplainerVideo } from "@/components/site/illustrative-explainer-video";
import { Sparkles, ShieldCheck, Film, Compass } from "lucide-react";

export function AboutVideoSection() {
  const [activeMode, setActiveMode] = useState<"interactive" | "recorded">("interactive");

  return (
    <div className="space-y-6">
      {/* Video Mode Selector */}
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveMode("interactive")}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
            activeMode === "interactive"
              ? "bg-[#0c758d] text-white shadow-md shadow-[#0c758d]/25 border border-transparent font-bold"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Interactive Illustrative Presentation</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode("recorded")}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
            activeMode === "recorded"
              ? "bg-[#0c758d] text-white shadow-md shadow-[#0c758d]/25 border border-transparent font-bold"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
          }`}
        >
          <Film className="w-3.5 h-3.5" />
          <span>Continuous Video Stream</span>
        </button>
      </div>

      {/* Video Experience */}
      {activeMode === "interactive" ? (
        <IllustrativeExplainerVideo />
      ) : (
        <div className="bg-[#06101E] border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
          <div className="px-5 py-3 bg-[#0A1628] border-b border-white/[0.08] flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                Illustrative Explainer Video • Exergy Solutions
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded bg-white/5 border border-white/10">
              1080p WebM
            </span>
          </div>
          <div className="relative aspect-video w-full bg-black">
            <video
              src="/videos/illustrative-explainer.webm"
              controls
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Physics & Value Takeaway */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-5xl mx-auto">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-[#0c758d] flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase text-[#0c758d] font-bold tracking-wider block">
              Second-Law Engineering Takeaway
            </span>
            <p className="text-xs text-slate-700 mt-0.5 font-sans leading-relaxed">
              Most audits count kilowatt-hours. We measure exergy — the useful work energy can actually do. That distinction lets us find 25–30% savings conventional methods overlook, then integrate heating, cooling, drying, and water into one optimized whole.
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
