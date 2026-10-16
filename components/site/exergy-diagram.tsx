"use client";

import React, { useState } from "react";
import { MotionDiv } from "./motion";
import { ArrowRight, Flame, Snowflake, Droplets, Zap, ShieldAlert, CheckCircle2 } from "lucide-react";

export function ExergyDiagram() {
  const [activeTab, setActiveTab] = useState<"comparison" | "flow">("comparison");

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5 mb-6">
        <div>
          <span className="text-teal-700 font-mono text-xs uppercase tracking-wider font-bold">
            Thermodynamic Principle
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Energy Quantity vs. Exergy Quality
          </h3>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-medium">
          <button
            onClick={() => setActiveTab("comparison")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "comparison"
                ? "bg-white text-slate-900 font-bold shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Energy vs Exergy
          </button>
          <button
            onClick={() => setActiveTab("flow")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === "flow"
                ? "bg-white text-slate-900 font-bold shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Destruction Flow
          </button>
        </div>
      </div>

      {activeTab === "comparison" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* First Law: Energy Audit */}
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/70">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-slate-500 font-bold">
                Conventional 1st-Law Audit
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium font-mono">
                Quantity Only
              </span>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 leading-relaxed">
                Counts raw kilowatt-hours and Joules. Treats 100 kWh of high-grade electricity the same as 100 kWh of lukewarm exhaust air.
              </p>
              <div className="h-6 w-full bg-slate-200 rounded-md overflow-hidden flex">
                <div className="w-full bg-blue-600 text-[11px] text-white flex items-center justify-center font-mono font-medium">
                  Total Energy (100% Conserved)
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-700 pt-1 font-medium">
                <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Blinded to entropy destruction and low-grade waste</span>
              </div>
            </div>
          </div>

          {/* Second Law: Exergy Analysis */}
          <div className="border border-teal-300 rounded-xl p-5 bg-teal-50/50 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-teal-800 font-bold">
                Exergy Analysis (Second Law)
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-bold font-mono">
                Work Potential
              </span>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-slate-600 leading-relaxed">
                Measures actual available useful work. Pinpoints where temperature, pressure, and chemical potential are destroyed.
              </p>
              <div className="h-6 w-full bg-slate-200 rounded-md overflow-hidden flex">
                <div className="w-[68%] bg-teal-600 text-[11px] text-white flex items-center justify-center font-mono font-bold">
                  Useful Work (Exergy)
                </div>
                <div className="w-[32%] bg-red-500 text-[11px] text-white flex items-center justify-center font-mono font-medium">
                  Anergy (Loss)
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-teal-800 pt-1 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-teal-600" />
                <span>Unlocks 25–30% cuts that conventional audits miss</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            Mapping how industrial processes cascade from high-grade chemical and electrical exergy down to ambient environment reject:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="bg-slate-50 border border-blue-200 p-4 rounded-xl">
              <Zap className="w-5 h-5 text-blue-600 mx-auto mb-2" />
              <span className="font-bold text-slate-900 block">1. Primary Fuel / Power</span>
              <span className="text-slate-500 text-[11px]">Maximum Exergy (100%)</span>
            </div>
            <div className="bg-slate-50 border border-teal-200 p-4 rounded-xl">
              <Flame className="w-5 h-5 text-teal-600 mx-auto mb-2" />
              <span className="font-bold text-slate-900 block">2. High-Grade Thermal</span>
              <span className="text-slate-500 text-[11px]">Steam & High Lift</span>
            </div>
            <div className="bg-slate-50 border border-amber-200 p-4 rounded-xl">
              <Snowflake className="w-5 h-5 text-amber-600 mx-auto mb-2" />
              <span className="font-bold text-slate-900 block">3. Low-Grade Cascading</span>
              <span className="text-slate-500 text-[11px]">Heat Pumps & Waste Heat</span>
            </div>
            <div className="bg-slate-50 border border-slate-300 p-4 rounded-xl">
              <Droplets className="w-5 h-5 text-slate-600 mx-auto mb-2" />
              <span className="font-bold text-slate-900 block">4. Ambient Equilibrium</span>
              <span className="text-slate-500 text-[11px]">Zero Work Potential</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
