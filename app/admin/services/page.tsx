"use client";

import React from "react";
import { Settings2, ArrowRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
  { slug: "cooling", title: "Cooling Optimization", subtitle: "Chilled water & refrigeration networks" },
  { slug: "heating", title: "Heating & Steam", subtitle: "Boiler, steam and condensate networks" },
  { slug: "drying", title: "Drying & Evaporation", subtitle: "Industrial dryers and multi-effect evaporators" },
  { slug: "water", title: "Water & Effluent Reduction", subtitle: "Cooling tower blowdown & effluent reuse" },
  { slug: "waste-heat", title: "Waste Heat Recovery", subtitle: "Flue-gas economizers & heat pumps" },
  { slug: "process", title: "Process Integration (Pinch)", subtitle: "Composite curves & minimum exergy loss" },
];

export default function AdminServicesPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="border-b border-slate-200/80 pb-5">
        <h1 className="font-heading font-extrabold text-2xl text-[#12232b] tracking-tight">
          Services Management
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-1">
          Active engineering thermodynamics services seeded in Supabase
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICES.map((s) => (
          <div
            key={s.slug}
            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#0c758d]">
                /services/{s.slug}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                Active
              </span>
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-[#12232b]">
                {s.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {s.subtitle}
              </p>
            </div>
            <Link
              href={`/services/${s.slug}`}
              target="_blank"
              className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-[#0c758d] font-semibold hover:underline"
            >
              <span>View Public Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
