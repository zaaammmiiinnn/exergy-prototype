"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Compass, Filter, Sparkles, Waves, Recycle, Building2, CheckCircle2, ArrowRight } from "lucide-react";

interface SchematicProps {
  className?: string;
}

/**
 * BRAND PALETTE:
 * Primary Cerulean Blue: #2C7FB8
 * Deep Marine Teal:      #0E4A4F
 * Emerald Green:         #10B981 / #30a66a
 * Golden Amber Accent:   #F0A431
 */

// ═════════════════════════════════════════════════════════════════════════
// 1. ENGINEERING DESIGN & CONSULTANCY SCHEMATIC
// ═════════════════════════════════════════════════════════════════════════
export function EngineeringDesignSchematic({ className = "" }: SchematicProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`w-full bg-slate-900/90 border border-slate-700/60 p-4 sm:p-5 rounded-xl shadow-lg relative overflow-hidden text-slate-100 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#2C7FB8]" />
          <span className="text-xs font-bold tracking-wide text-white">FEED & Digital-Twin Simulation</span>
        </div>
        <span className="text-[10px] font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-700/50 px-2 py-0.5 rounded-full">
          Pre-Construction Advisory
        </span>
      </div>

      <svg viewBox="0 0 340 160" fill="none" className="w-full h-auto select-none">
        {/* Connecting Flow Arrow */}
        <path d="M 90 80 L 140 80 M 200 80 L 250 80" stroke="#2C7FB8" strokeWidth="2" strokeDasharray="4 4" />

        {/* Step 1: Raw Audit */}
        <g transform="translate(15, 45)">
          <rect width="75" height="70" rx="8" fill="#0A1E33" stroke="#2C7FB8" strokeWidth="1.5" />
          <circle cx="37" cy="24" r="12" fill="#2C7FB8" opacity="0.2" />
          <text x="37" y="28" fill="#67E8F9" fontSize="10" fontWeight="bold" textAnchor="middle">01</text>
          <text x="37" y="48" fill="#F8FAFC" fontSize="8" fontWeight="bold" textAnchor="middle">Site Audit</text>
          <text x="37" y="58" fill="#94A3B8" fontSize="6.5" textAnchor="middle">Hydraulic Data</text>
        </g>

        {/* Step 2: 3D Exergy Model */}
        <g transform="translate(132, 38)">
          <rect width="80" height="84" rx="8" fill="#062822" stroke="#10B981" strokeWidth="2" />
          <circle cx="40" cy="24" r="12" fill="#10B981" opacity="0.25" />
          <text x="40" y="28" fill="#6EE7B7" fontSize="10" fontWeight="bold" textAnchor="middle">02</text>
          <text x="40" y="48" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">Digital Twin</text>
          <text x="40" y="58" fill="#A7F3D0" fontSize="6.5" textAnchor="middle">Exergy & CFD</text>
          <text x="40" y="70" fill="#34D399" fontSize="6.5" fontWeight="bold" textAnchor="middle">-35% Head Loss</text>
        </g>

        {/* Step 3: Turnkey Commissioning */}
        <g transform="translate(250, 45)">
          <rect width="75" height="70" rx="8" fill="#0A1E33" stroke="#2C7FB8" strokeWidth="1.5" />
          <circle cx="37" cy="24" r="12" fill="#2C7FB8" opacity="0.2" />
          <text x="37" y="28" fill="#67E8F9" fontSize="10" fontWeight="bold" textAnchor="middle">03</text>
          <text x="37" y="48" fill="#F8FAFC" fontSize="8" fontWeight="bold" textAnchor="middle">Commission</text>
          <text x="37" y="58" fill="#94A3B8" fontSize="6.5" textAnchor="middle">Guaranteed SEC</text>
        </g>
      </svg>

      <div className="flex items-center justify-between pt-2 border-t border-slate-700/50 text-[11px] text-slate-300">
        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Slashes Initial Capex by 12–18%</span>
        <span className="font-semibold text-emerald-400">ROI: &lt; 14 Months</span>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════
// 2. WATER TREATMENT SYSTEMS DESIGN, INSTALLATION & MAINTENANCE SCHEMATIC
// ═════════════════════════════════════════════════════════════════════════
export function WaterTreatmentSchematic({ className = "" }: SchematicProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`w-full bg-slate-900/90 border border-slate-700/60 p-4 sm:p-5 rounded-xl shadow-lg relative overflow-hidden text-slate-100 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#10B981]" />
          <span className="text-xs font-bold tracking-wide text-white">Modular Skid Filtration Train</span>
        </div>
        <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-700/50 px-2 py-0.5 rounded-full">
          Turnkey Execution
        </span>
      </div>

      <svg viewBox="0 0 340 160" fill="none" className="w-full h-auto select-none">
        {/* Animated Fluid Stream */}
        <path d="M 20 80 L 320 80" stroke="#0E4A4F" strokeWidth="8" strokeLinecap="round" />
        <motion.path
          d="M 20 80 L 320 80"
          stroke="#06B6D4"
          strokeWidth="3"
          strokeDasharray="6 6"
          animate={shouldReduceMotion ? {} : { strokeDashoffset: -60 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Stage 1: Coagulation & Media */}
        <g transform="translate(30, 45)">
          <rect width="65" height="70" rx="6" fill="#0E2838" stroke="#06B6D4" strokeWidth="1.5" />
          <text x="32" y="25" fill="#67E8F9" fontSize="8" fontWeight="bold" textAnchor="middle">STAGE 1</text>
          <text x="32" y="45" fill="#FFFFFF" fontSize="8.5" fontWeight="bold" textAnchor="middle">Media Filter</text>
          <text x="32" y="58" fill="#94A3B8" fontSize="6.5" textAnchor="middle">TSS Removal</text>
        </g>

        {/* Stage 2: Ultrafiltration (UF) Skid */}
        <g transform="translate(135, 40)">
          <rect width="70" height="80" rx="6" fill="#082A22" stroke="#10B981" strokeWidth="2" />
          <text x="35" y="25" fill="#A7F3D0" fontSize="8" fontWeight="bold" textAnchor="middle">STAGE 2</text>
          <text x="35" y="45" fill="#FFFFFF" fontSize="8.5" fontWeight="bold" textAnchor="middle">UF Membrane</text>
          <text x="35" y="58" fill="#86EFAC" fontSize="6.5" textAnchor="middle">0.02μm Pore</text>
          <text x="35" y="70" fill="#34D399" fontSize="6.5" fontWeight="bold" textAnchor="middle">99.9% Flux</text>
        </g>

        {/* Stage 3: Polishing & Clean Permeate */}
        <g transform="translate(245, 45)">
          <rect width="65" height="70" rx="6" fill="#0E2838" stroke="#06B6D4" strokeWidth="1.5" />
          <text x="32" y="25" fill="#67E8F9" fontSize="8" fontWeight="bold" textAnchor="middle">STAGE 3</text>
          <text x="32" y="45" fill="#FFFFFF" fontSize="8.5" fontWeight="bold" textAnchor="middle">Permeate</text>
          <text x="32" y="58" fill="#94A3B8" fontSize="6.5" textAnchor="middle">Zero Fouling</text>
        </g>
      </svg>

      <div className="flex items-center justify-between pt-2 border-t border-slate-700/50 text-[11px] text-slate-300">
        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Automated Clean-in-Place (CIP)</span>
        <span className="font-semibold text-cyan-300">Up to 30% Lower kWh/m³</span>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════
// 3. WATER QUALITY IMPROVEMENT & TREATMENT SERVICES SCHEMATIC
// ═════════════════════════════════════════════════════════════════════════
export function WaterQualitySchematic({ className = "" }: SchematicProps) {
  return (
    <div className={`w-full bg-slate-900/90 border border-slate-700/60 p-4 sm:p-5 rounded-xl shadow-lg relative overflow-hidden text-slate-100 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold tracking-wide text-white">Water Quality Conditioning & Polishing</span>
        </div>
        <span className="text-[10px] font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-700/50 px-2 py-0.5 rounded-full">
          Zero Scaling & Corrosion
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 py-2">
        {/* Before: Raw Untreated */}
        <div className="p-3 rounded-lg bg-red-950/20 border border-red-800/40">
          <div className="text-[10px] uppercase font-bold text-red-400 mb-1">Untreated Baseline</div>
          <div className="text-xs font-medium text-slate-300 space-y-1">
            <div className="flex justify-between"><span>TDS / Minerals:</span> <span className="font-mono text-red-300">High (&gt;2000 ppm)</span></div>
            <div className="flex justify-between"><span>Scaling Index:</span> <span className="font-mono text-red-300">Severe (+2.1 LSI)</span></div>
            <div className="flex justify-between"><span>Exchanger Loss:</span> <span className="font-mono text-red-300">-15% Heat Loss</span></div>
          </div>
        </div>

        {/* After: Exergy Treated */}
        <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-700/50">
          <div className="text-[10px] uppercase font-bold text-emerald-400 mb-1">Conditioned & Polished</div>
          <div className="text-xs font-medium text-slate-300 space-y-1">
            <div className="flex justify-between"><span>TDS / Minerals:</span> <span className="font-mono text-emerald-300">Optimized (&lt;50 ppm)</span></div>
            <div className="flex justify-between"><span>Scaling Index:</span> <span className="font-mono text-emerald-300">Balanced (0.0 LSI)</span></div>
            <div className="flex justify-between"><span>Heat Efficiency:</span> <span className="font-mono text-emerald-300">98%+ Restored</span></div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-700/50 text-[11px] text-slate-300">
        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Advanced UV & Chemical Polishing</span>
        <span className="font-semibold text-emerald-400">100% Dubai Municipality Standard</span>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════
// 4. SEAWATER & BRACKISH WATER DESALINATION SCHEMATIC
// ═════════════════════════════════════════════════════════════════════════
export function DesalinationSchematic({ className = "" }: SchematicProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`w-full bg-slate-900/90 border border-slate-700/60 p-4 sm:p-5 rounded-xl shadow-lg relative overflow-hidden text-slate-100 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Waves className="w-4 h-4 text-[#2C7FB8]" />
          <span className="text-xs font-bold tracking-wide text-white">SWRO & Isobaric Pressure Exchanger (PX)</span>
        </div>
        <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-700/50 px-2 py-0.5 rounded-full">
          60% Energy Recycled
        </span>
      </div>

      <svg viewBox="0 0 340 160" fill="none" className="w-full h-auto select-none">
        {/* Seawater Inflow */}
        <path d="M 20 55 L 110 55" stroke="#2C7FB8" strokeWidth="4" />
        <text x="50" y="45" fill="#93C5FD" fontSize="7.5" fontWeight="bold">Seawater 65 bar</text>

        {/* High Pressure Pump Block */}
        <g transform="translate(110, 35)">
          <rect width="60" height="40" rx="6" fill="#0A2238" stroke="#2C7FB8" strokeWidth="1.5" />
          <text x="30" y="20" fill="#93C5FD" fontSize="8" fontWeight="bold" textAnchor="middle">HP Pump</text>
          <text x="30" y="32" fill="#E2E8F0" fontSize="7" textAnchor="middle">IE4 Drive</text>
        </g>

        {/* RO Membrane Bank */}
        <g transform="translate(200, 30)">
          <rect width="115" height="50" rx="8" fill="#062822" stroke="#10B981" strokeWidth="2" />
          <text x="57" y="22" fill="#6EE7B7" fontSize="8.5" fontWeight="bold" textAnchor="middle">SWRO Membrane</text>
          <text x="57" y="34" fill="#F0FDF4" fontSize="7" textAnchor="middle">Permeate Fresh Water</text>
          <text x="57" y="44" fill="#34D399" fontSize="6.5" fontWeight="bold" textAnchor="middle">&lt; 2.8 kWh/m³</text>
        </g>

        {/* Reject Brine Loop to Isobaric Exchanger */}
        <path d="M 260 80 L 260 120 L 170 120" stroke="#F0A431" strokeWidth="2.5" strokeDasharray="4 3" />
        <g transform="translate(100, 102)">
          <rect width="70" height="36" rx="6" fill="#241B08" stroke="#F0A431" strokeWidth="1.5" />
          <text x="35" y="18" fill="#FDE68A" fontSize="7.5" fontWeight="bold" textAnchor="middle">Isobaric PX</text>
          <text x="35" y="28" fill="#F59E0B" fontSize="6.5" textAnchor="middle">98% Recovery</text>
        </g>

        {/* PX energy returns to HP loop */}
        <path d="M 100 120 L 50 120 L 50 55" stroke="#10B981" strokeWidth="2" strokeDasharray="4 3" />
      </svg>

      <div className="flex items-center justify-between pt-2 border-t border-slate-700/50 text-[11px] text-slate-300">
        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Isobaric Energy Recovery Integration</span>
        <span className="font-semibold text-emerald-400">Lowest GCC Specific Energy</span>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════
// 5. WASTE MANAGEMENT & RESOURCE VALORISATION SCHEMATIC
// ═════════════════════════════════════════════════════════════════════════
export function WasteValorisationSchematic({ className = "" }: SchematicProps) {
  return (
    <div className={`w-full bg-slate-900/90 border border-slate-700/60 p-4 sm:p-5 rounded-xl shadow-lg relative overflow-hidden text-slate-100 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Recycle className="w-4 h-4 text-[#F0A431]" />
          <span className="text-xs font-bold tracking-wide text-white">Closed-Loop Waste Valorisation & ZLD</span>
        </div>
        <span className="text-[10px] font-semibold text-amber-300 bg-amber-950/60 border border-amber-700/50 px-2 py-0.5 rounded-full">
          Zero Liquid Discharge
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5 py-2 text-center">
        <div className="bg-slate-800/80 border border-slate-700 p-2.5 rounded-lg">
          <div className="text-[10px] font-bold text-amber-400">EFFLUENT IN</div>
          <div className="text-xs font-bold text-white mt-1">High COD Waste</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Sludge & Concentrates</div>
        </div>

        <div className="bg-emerald-950/40 border border-emerald-700/60 p-2.5 rounded-lg">
          <div className="text-[10px] font-bold text-emerald-400">VALORISATION</div>
          <div className="text-xs font-bold text-white mt-1">Biogas & Minerals</div>
          <div className="text-[10px] text-emerald-300 mt-0.5">+350 kWh / ton COD</div>
        </div>

        <div className="bg-cyan-950/40 border border-cyan-700/60 p-2.5 rounded-lg">
          <div className="text-[10px] font-bold text-cyan-400">ZLD OUTPUT</div>
          <div className="text-xs font-bold text-white mt-1">98% Distillate</div>
          <div className="text-[10px] text-cyan-300 mt-0.5">Recycled Process Water</div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-700/50 text-[11px] text-slate-300">
        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Turns Operational Waste into Revenue</span>
        <span className="font-semibold text-amber-400">Payback: 16–26 Months</span>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════
// 6. MUNICIPAL WASTEWATER TREATMENT & REUSE SCHEMATIC
// ═════════════════════════════════════════════════════════════════════════
export function MunicipalWastewaterSchematic({ className = "" }: SchematicProps) {
  return (
    <div className={`w-full bg-slate-900/90 border border-slate-700/60 p-4 sm:p-5 rounded-xl shadow-lg relative overflow-hidden text-slate-100 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#10B981]" />
          <span className="text-xs font-bold tracking-wide text-white">Municipal STP & TSE Resource Recovery</span>
        </div>
        <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-700/50 px-2 py-0.5 rounded-full">
          Circular Urban Water
        </span>
      </div>

      <div className="space-y-2 py-1">
        <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs">
          <span className="font-medium text-slate-200">1. Raw Municipal Sewage</span>
          <span className="text-slate-400 text-[11px]">Primary Screening</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-xs">
          <span className="font-medium text-emerald-200">2. MBR & Biological Nutrient Removal (BNR)</span>
          <span className="text-emerald-400 text-[11px] font-semibold">-40% Aeration Energy</span>
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-xs">
          <span className="font-medium text-cyan-200">3. TSE Tertiary Polishing & Re-Use</span>
          <span className="text-cyan-400 text-[11px] font-semibold">District Cooling & Irrigation</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-700/50 text-[11px] text-slate-300">
        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Ultrafiltration Submerged Cassettes</span>
        <span className="font-semibold text-emerald-400">&lt; 0.22 kWh/m³ Aeration</span>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════
// BACKWARDS-COMPATIBLE ALIASES FOR LEGACY IMPORTS
// ═════════════════════════════════════════════════════════════════════════
export const CoolingSchematic = EngineeringDesignSchematic;
export const HeatingSchematic = WasteValorisationSchematic;
export const WaterSchematic = WaterTreatmentSchematic;
export const ProcessIntegrationSchematic = DesalinationSchematic;
