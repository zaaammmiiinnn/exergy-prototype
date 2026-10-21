"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CheckSquare, ArrowLeft, Database, ShieldCheck } from "lucide-react";
import { AssignedTasksSection } from "@/components/admin/assigned-tasks-section";

export default function AdminTasksPage() {
  const [currentSession, setCurrentSession] = useState<{ role: string; email: string } | null>(null);

  useEffect(() => {
    try {
      const match = document.cookie.match(/exergy_admin_session=([^;]+)/);
      if (match) {
        setCurrentSession(JSON.parse(decodeURIComponent(match[1])));
        return;
      }
      const stored = localStorage.getItem("exergy_admin_session");
      if (stored) {
        setCurrentSession(JSON.parse(stored));
      }
    } catch {}
  }, []);

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <Link href="/admin" className="hover:text-slate-900 transition-colors">
              Console
            </Link>
            <span>/</span>
            <span className="text-[#0c758d] font-bold">Assigned Tasks</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Assigned Engineering Tasks
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Schedule thermodynamic audits, site visit assignments, and continuous processing tasks across 100 engineering staff with live Supabase PostgreSQL sync.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard Overview</span>
          </Link>
        </div>
      </div>

      {/* Main Assigned Tasks Management Section */}
      <AssignedTasksSection
        currentUserRole={currentSession?.role || "employee"}
        currentUserEmail={currentSession?.email || "employee@exergy.com"}
      />
    </div>
  );
}
