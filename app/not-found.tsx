import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Compass, Home, Layers, Mail, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Exergy Solutions",
  description:
    "The requested page could not be found. Explore our thermodynamic engineering services, methodology, or contact our engineering desk.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-slate-50 px-4 py-16 sm:px-6 sm:py-24">
      <div className="max-w-2xl w-full text-center space-y-8 bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-teal-700 shadow-sm">
          <Compass className="w-8 h-8 animate-pulse text-[#0c758d]" />
        </div>

        <div className="space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-teal-700 font-semibold">
            Error 404 // Resource Missing
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            The page or engineering documentation you requested has been moved, renamed, or is unavailable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto text-left pt-2">
          <Link
            href="/"
            className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-teal-500/50 hover:bg-teal-50/50 transition-all group"
          >
            <Home className="w-5 h-5 text-teal-700 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-sm font-semibold text-slate-900">Homepage</div>
              <div className="text-xs text-slate-500">Return to overview</div>
            </div>
          </Link>

          <Link
            href="/services"
            className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-teal-500/50 hover:bg-teal-50/50 transition-all group"
          >
            <Layers className="w-5 h-5 text-teal-700 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-sm font-semibold text-slate-900">Services Catalog</div>
              <div className="text-xs text-slate-500">Explore engineering scope</div>
            </div>
          </Link>

          <Link
            href="/assessment"
            className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-teal-500/50 hover:bg-teal-50/50 transition-all group"
          >
            <Compass className="w-5 h-5 text-teal-700 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-sm font-semibold text-slate-900">Facility Audit</div>
              <div className="text-xs text-slate-500">Request exergy evaluation</div>
            </div>
          </Link>

          <Link
            href="/contact"
            className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 hover:border-teal-500/50 hover:bg-teal-50/50 transition-all group"
          >
            <Mail className="w-5 h-5 text-teal-700 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-sm font-semibold text-slate-900">Contact Desk</div>
              <div className="text-xs text-slate-500">Direct technical inquiries</div>
            </div>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0c758d] hover:bg-[#0a6277] text-white text-xs font-mono font-medium transition-all shadow-md shadow-teal-900/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Exergy Solutions</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
