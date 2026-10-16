import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, Gauge } from "lucide-react";
import { MotionDiv } from "./motion";

export function CTABand() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-slate-900 to-navy-950 border-t border-slate-800 py-20 text-white">
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
        <MotionDiv delay={0.05}>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 font-mono text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            Performance Guaranteed Implementation
          </span>
        </MotionDiv>

        <MotionDiv delay={0.15}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Ready to see what your plant is really losing?
          </h2>
        </MotionDiv>

        <MotionDiv delay={0.25}>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Book a no-obligation exergy assessment. We’ll quantify the opportunity and back our implementation with a performance guarantee.
          </p>
        </MotionDiv>

        <MotionDiv delay={0.35}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/assessment"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <Gauge className="w-5 h-5 text-teal-100" />
              <span>Book an assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-medium transition-colors"
            >
              Contact our engineering team
            </Link>
          </div>
        </MotionDiv>

        <MotionDiv delay={0.45}>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>We reply within one business day. No spam, ever.</span>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
