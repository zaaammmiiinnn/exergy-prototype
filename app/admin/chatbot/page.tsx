"use client";

import React from "react";
import { Bot, Plus, CheckCircle2 } from "lucide-react";

export default function AdminChatbotPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-heading font-extrabold text-2xl text-[#12232b] tracking-tight">
              Chatbot Knowledge & Rules
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-teal-50 text-[#0c758d] border border-teal-200/70 text-xs font-mono font-bold">
              Deterministic Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Zero LLM hallucination — keyword matching, Q&A bank, and human handoff rules
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0c758d] text-white text-xs font-semibold hover:bg-[#09586a] transition-all shadow-xs cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Add Q&A Entry</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="font-heading font-bold text-base text-[#12232b]">
          Core Deterministic Matchers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-slate-700 font-bold">
              <span>Services Matching</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-slate-500 font-sans text-xs">
              Matches keywords: cooling, heating, steam, drying, water, pinch, waste heat.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-slate-700 font-bold">
              <span>Human Escalation</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-slate-500 font-sans text-xs">
              Dispatches alerts to neuralwaves.official@gmail.com and support@neuralwaves.in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
