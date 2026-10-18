"use client";

import React from "react";
import Link from "next/link";
import { Factory, Flame, Zap, Droplets, Utensils, Package } from "lucide-react";

const TRUST_SECTORS = [
  {
    code: "01",
    name: "OIL & GAS",
    sub: "Refineries & Upstream",
    icon: Flame,
    href: "/industries",
  },
  {
    code: "02",
    name: "POWER",
    sub: "Cogen & Turbines",
    icon: Zap,
    href: "/industries",
  },
  {
    code: "03",
    name: "MANUFACTURING",
    sub: "Steel, Cement & Chemicals",
    icon: Factory,
    href: "/industries",
  },
  {
    code: "04",
    name: "PAPER & PULP",
    sub: "High-Pressure Steam & Drying",
    icon: Package,
    href: "/industries",
  },
  {
    code: "05",
    name: "FOOD & BEVERAGE",
    sub: "Pasteurization & Cooling",
    icon: Utensils,
    href: "/industries",
  },
  {
    code: "06",
    name: "WATER UTILITIES",
    sub: "Desalination & Effluent",
    icon: Droplets,
    href: "/industries",
  },
];

export function TrustStrip() {
  return (
    <section className="relative w-full bg-[#071120] border-b border-white/[0.08] py-10 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Technical Mono Label */}
        <div className="text-center mb-8">
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#94A3B8] font-medium flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8]" />
            TRUSTED ACROSS REGIONAL INDUSTRY
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8]" />
          </span>
        </div>

        {/* 6 Columns Separated by Vertical Hairlines */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border border-white/[0.08] bg-[#0A1628]/60">
          {TRUST_SECTORS.map((sector, idx) => {
            const Icon = sector.icon;
            const isLast = idx === TRUST_SECTORS.length - 1;
            return (
              <Link
                key={sector.name}
                href={sector.href}
                className={`group p-4 sm:p-5 flex flex-col justify-between border-b lg:border-b-0 border-white/[0.08] ${
                  !isLast ? "lg:border-r border-white/[0.08]" : ""
                } transition-all duration-200 hover:bg-[#0F1E33]`}
              >
                {/* Sector Index & Mini Icon */}
                <div className="flex items-center justify-between mb-3 text-[#94A3B8]/60 group-hover:text-[#00B4D8] transition-colors">
                  <span className="font-mono text-[10px] font-semibold">{sector.code}</span>
                  <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Sector Title */}
                <div>
                  <div className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.06em] text-[#94A3B8] group-hover:text-[#F1F5F9] transition-colors">
                    {sector.name}
                  </div>
                  <div className="font-mono text-[10px] text-[#94A3B8]/50 group-hover:text-[#94A3B8] transition-colors mt-0.5 line-clamp-1">
                    {sector.sub}
                  </div>
                </div>

                {/* Subtle bottom indicator */}
                <div className="mt-3 h-[1px] w-full bg-transparent group-hover:bg-[#00B4D8]/50 transition-colors" />
              </Link>
            );
          })}
        </div>

        {/* Sub-strip footnote / verified metrics */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-[#94A3B8]/60">
          <span>AUDIT COMPLIANCE: ISO 50001 & ASHRAE LEVEL III</span>
          <span className="hidden sm:inline">DUBAI ENERGY METRICS · UAE NET ZERO 2050 ALIGNED</span>
          <span>PERFORMANCE: 100% CONTRACTUALLY GUARANTEED</span>
        </div>

      </div>
    </section>
  );
}
