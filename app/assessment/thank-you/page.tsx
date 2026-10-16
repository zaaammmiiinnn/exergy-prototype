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
    <div className="flex flex-col items-center justify-center py-20 px-4 bg-slate-50 text-slate-900 min-h-[75vh]">
      <div className="max-w-xl w-full bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-teal-400 to-teal-500" />

        <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-700 mx-auto flex items-center justify-center mb-6 border border-teal-300">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-xs font-mono uppercase tracking-widest text-teal-700 font-semibold block mb-2">
          Assessment Registered
        </span>

        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Thank you, {name}
        </h1>

        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          Your industrial assessment request has been recorded. Our thermodynamic team is preparing a preliminary scope review.
        </p>

        {/* Reference Code Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8 flex flex-col items-center justify-center">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-1">
            Tracking Reference ID
          </span>
          <span className="text-xl font-mono font-bold text-teal-700 tracking-wider">
            {ref}
          </span>
        </div>

        {/* What Happens Next */}
        <div className="text-left bg-slate-50 border border-slate-200 rounded-xl p-5 mb-8 space-y-3 text-xs text-slate-700">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-600" />
            <span>What happens next:</span>
          </h4>
          <ul className="space-y-2 list-disc list-inside text-slate-600">
            <li>Our engineering lead will review your facility profile and thermodynamic load requirements.</li>
            <li>We will contact you within one business day via email or phone to align on baseline data.</li>
            <li>An introductory technical brief will be prepared outlining potential 25–30% resource reduction opportunities.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-semibold py-3 px-6 rounded-xl transition-colors shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-xs font-semibold py-3 px-6 rounded-xl transition-all shadow-md"
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
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">Loading confirmation...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
