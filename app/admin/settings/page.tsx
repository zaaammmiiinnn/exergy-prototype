"use client";

import React from "react";
import { Settings, ShieldCheck, Mail, Database } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="border-b border-slate-200/80 pb-5">
        <h1 className="font-heading font-extrabold text-2xl text-[#12232b] tracking-tight">
          System Settings & Integrations
        </h1>
        <p className="text-xs text-slate-500 font-mono mt-1">
          Notification recipients, security thresholds, and database connection details
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email Alerts Configuration */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0c758d] flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-sm text-[#12232b]">
                Lead Notification Recipients
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Dispatched via Resend API
              </p>
            </div>
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <span>neuralwaves.official@gmail.com</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                Founder
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
              <span>support@neuralwaves.in</span>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                Support
              </span>
            </div>
          </div>
        </div>

        {/* Supabase Connection */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0c758d] flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-sm text-[#12232b]">
                Supabase PostgreSQL
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Project Reference: twwdvliikafbtvzsotks
              </p>
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs font-mono space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Status:</span>
              <span className="text-emerald-700 font-bold">Connected (Active)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Region:</span>
              <span className="text-slate-800">eu-central-1 (Frankfurt)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">RLS:</span>
              <span className="text-slate-800">Enabled on all tables</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
