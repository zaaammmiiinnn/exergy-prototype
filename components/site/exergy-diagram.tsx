"use client";

import React, { useState } from "react";
import { MotionDiv } from "./motion";
import { ArrowRight, Flame, Snowflake, Droplets, Zap, ShieldAlert, CheckCircle2 } from "lucide-react";

export function ExergyDiagram() {
  const [activeTab, setActiveTab] = useState<"comparison" | "flow">("comparison");

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <span className="text-teal-400 font-mono text-xs uppercase tracking-wider font-semibold">
            Thermodynamic Principle
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Energy Quantity vs. Exergy Quality
          </h3>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab("comparison")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === "comparison"
                ? "bg-teal-500 text-navy-950 font-bold shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Energy vs Exergy
          </button>
          <button
            onClick={() => setActiveTab("flow")}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === "flow"
                ? "bg-teal-500 text-navy-950 font-bold shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Destruction Flow
          </button>
        </div>
      </div>

      {activeTab === "comparison" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* First Law: Energy Audit */}
          <div className="border border-slate-800/80 rounded-xl p-5 bg-slate-900/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-slate-400 font-semibold">
                Conventional 1st-Law Audit
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                Quantity Only
              </span>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-slate-300">
                Counts raw kilowatt-hours and Joules. Treats 100 kWh of high-grade electricity the same as 100 kWh of lukewarm exhaust air.
              </p>
              <div className="h-6 w-full bg-slate-800 rounded-md overflow-hidden flex">
                <div className="w-full bg-blue-600/70 text-[11px] text-white flex items-center justify-center font-mono font-medium">
                  Total Energy (100% Conserved)
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-400/90 pt-1">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Blinded to entropy destruction and low-grade waste</span>
              </div>
            </div>
          </div>

          {/* Second Law: Exergy Analysis */}
          <div className="border border-teal-500/40 rounded-xl p-5 bg-teal-950/20 shadow-inner">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-teal-400 font-bold">
                Exergy Analysis (Second Law)
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-semibold">
                Work Potential
              </span>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-slate-300">
                Measures actual available useful work. Pinpoints where temperature, pressure, and chemical potential are destroyed.
              </p>
              <div className="h-6 w-full bg-slate-800 rounded-md overflow-hidden flex">
                <div className="w-[68%] bg-teal-500 text-[11px] text-navy-950 flex items-center justify-center font-mono font-bold">
                  Useful Work (Exergy)
                </div>
                <div className="w-[32%] bg-red-500/60 text-[11px] text-white flex items-center justify-center font-mono font-medium">
                  Anergy (Loss)
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-teal-300 pt-1">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-teal-400" />
                <span>Unlocks 25–30% cuts that conventional audits miss</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-slate-300">
            Mapping how industrial processes cascade from high-grade chemical and electrical exergy down to ambient environment reject:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="bg-slate-900 border border-blue-500/30 p-3 rounded-lg">
              <Zap className="w-5 h-5 text-blue-400 mx-auto mb-1.5" />
              <span className="font-semibold text-white block">1. Primary Fuel / Power</span>
              <span className="text-slate-400 text-[11px]">Maximum Exergy (100%)</span>
            </div>
            <div className="bg-slate-900 border border-teal-500/30 p-3 rounded-lg">
              <Flame className="w-5 h-5 text-teal-400 mx-auto mb-1.5" />
              <span className="font-semibold text-white block">2. High-Grade Thermal</span>
              <span className="text-slate-400 text-[11px]">Steam & High Lift</span>
            </div>
            <div className="bg-slate-900 border border-amber-500/30 p-3 rounded-lg">
              <Snowflake className="w-5 h-5 text-amber-400 mx-auto mb-1.5" />
              <span className="font-semibold text-white block">3. Low-Grade Cascading</span>
              <span className="text-slate-400 text-[11px]">Heat Pumps & Waste Heat</span>
            </div>
            <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg">
              <Droplets className="w-5 h-5 text-slate-400 mx-auto mb-1.5" />
              <span className="font-semibold text-white block">4. Ambient Equilibrium</span>
              <span className="text-slate-400 text-[11px]">Zero Work Potential</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
