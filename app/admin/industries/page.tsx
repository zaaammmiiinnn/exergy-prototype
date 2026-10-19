"use client";

import React from "react";
import { Factory, ArrowRight } from "lucide-react";
import Link from "next/link";

const INDUSTRIES = [
  { slug: "food-beverage", name: "Food & Beverage", stat: "15–35% steam reduction" },
  { slug: "chemicals", name: "Chemicals & Petrochemicals", stat: "20–40% furnace duty recovery" },
  { slug: "paper-pulp", name: "Paper & Packaging", stat: "18–30% dryer hood exhaust capture" },
  { slug: "pharmaceuticals", name: "Pharmaceuticals", stat: "99.9% clean steam exergy balance" },
  { slug: "metals-mining", name: "Metals & Heavy Manufacturing", stat: "High-grade recuperator heat recovery" },
  { slug: "data-centers", name: "Data Centers & District Cooling", stat: "Delta-T syndrome mitigation" },
];

export default function AdminIndustriesPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="border-b border-slate-200/80 pb-5">
        <h1 className="font-heading font-extrabold text-2xl text-[#12232b] tracking-tight">
          Target Industries
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-1">
          Industrial sectors configured for assessment scoring and case study matching
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {INDUSTRIES.map((ind) => (
          <div
            key={ind.slug}
            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#0c758d] flex items-center justify-center">
                <Factory className="w-4 h-4" />
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal-100 text-teal-800">
                Seeded
              </span>
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-[#12232b]">
                {ind.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-mono">
                {ind.stat}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
