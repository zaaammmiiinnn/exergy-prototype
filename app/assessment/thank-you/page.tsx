"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, FileText, ArrowLeft } from "lucide-react";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") || "EX-2026-1042";
  const name = searchParams.get("name") || "Engineering Lead";

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 bg-navy-950 text-white min-h-[75vh]">
      <div className="max-w-xl w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-teal-400 to-teal-500" />

        <div className="w-16 h-16 rounded-2xl bg-teal-500/20 text-teal-400 mx-auto flex items-center justify-center mb-6 border border-teal-500/30">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-semibold block mb-2">
          Assessment Registered
        </span>

        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
          Thank you, {name}
        </h1>

        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          Your industrial assessment request has been recorded. Our thermodynamic team is preparing a preliminary scope review.
        </p>

        {/* Reference Code Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-8 flex flex-col items-center justify-center">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
            Tracking Reference ID
          </span>
          <span className="text-xl font-mono font-bold text-teal-300 tracking-wider">
            {ref}
          </span>
        </div>

        {/* What Happens Next */}
        <div className="text-left bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 mb-8 space-y-3 text-xs text-slate-300">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-400" />
            <span>What happens next:</span>
          </h4>
          <ul className="space-y-2 list-disc list-inside text-slate-400">
            <li>Our engineering lead will review your facility profile and thermodynamic load requirements.</li>
            <li>We will contact you within one business day via email or phone to align on baseline data.</li>
            <li>An introductory technical brief will be prepared outlining potential 25–30% resource reduction opportunities.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-xs font-semibold py-3 px-6 rounded-xl transition-all"
          >
            <span>Explore Engineering Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy-950 flex items-center justify-center text-slate-400">Loading confirmation...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
