"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  RefreshCw,
  Copy,
  Check,
  ShieldCheck,
  Phone,
  Mail,
  Building,
  Flame,
  Layers,
  Sparkles,
  ExternalLink,
  MessageCircle,
  AlertCircle,
  ChevronRight,
  Compass,
} from "lucide-react";
import { trackRequestAction, type TrackedRequestResult } from "@/app/actions/track-request";

function TrackRequestContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialRef = searchParams.get("ref") || "";

  const [query, setQuery] = useState(initialRef);
  const [result, setResult] = useState<TrackedRequestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setError("Please enter a Reference ID (e.g. EX-2026-6253) or your email.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const res = await trackRequestAction(searchQuery.trim());
      if (res.success && res.data) {
        setResult(res.data);
      } else {
        setError(res.error || "No matching assessment request found.");
        setResult(null);
      }
    } catch {
      setError("Failed to query request status. Please try again or contact support.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto-search on mount if ref parameter is present
  useEffect(() => {
    if (initialRef) {
      setQuery(initialRef);
      handleSearch(initialRef);
    }
  }, [initialRef, handleSearch]);

  const handleRefresh = async () => {
    if (!result) return;
    setIsRefreshing(true);
    await handleSearch(result.referenceId);
    setIsRefreshing(false);
  };

  const handleCopyRef = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const setExampleQuery = (exampleId: string) => {
    setQuery(exampleId);
    router.replace(`/track?ref=${exampleId}`);
    handleSearch(exampleId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "won":
        return "bg-emerald-500/10 text-emerald-700 border-emerald-300";
      case "proposal":
        return "bg-blue-500/10 text-blue-700 border-blue-300";
      case "qualified":
        return "bg-purple-500/10 text-purple-700 border-purple-300";
      case "contacted":
        return "bg-amber-500/10 text-amber-700 border-amber-300";
      case "new":
      default:
        return "bg-teal-500/10 text-teal-800 border-teal-300";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      {/* Top Header Banner */}
      <section className="bg-gradient-to-b from-slate-900 to-[#0c232e] text-white pt-14 pb-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0c758d]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#30a66a]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-white/10 text-cyan-300 border border-white/15">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Client Portal • Real-Time Tracking</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Track Your Request Status
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              Directly connected with the Exergy Solutions engineering portal. Enter your Tracking Reference ID or email to view real-time thermodynamic progress, assigned engineers, and next milestones.
            </p>
          </div>

          {/* Search Box */}
          <div className="mt-8 max-w-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(query);
              }}
              className="flex flex-col sm:flex-row gap-2.5 bg-white/10 p-2 rounded-2xl border border-white/20 backdrop-blur-md shadow-2xl"
            >
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter Reference ID (e.g. EX-2026-6253) or email..."
                  className="w-full pl-11 pr-4 py-3 bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0c758d] shadow-inner"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0c758d] hover:bg-[#095f73] text-white text-sm font-bold rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <span>Track Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Reference Pills */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-300">
              <span className="text-[11px] font-mono uppercase text-slate-400">Quick Try:</span>
              {["EX-2026-6253", "EX-2026-1055", "EX-2026-1054", "EX-2026-1042"].map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setExampleQuery(id)}
                  className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-cyan-200 border border-white/15 transition-colors cursor-pointer"
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Results / Tracking View */}
      <main className="container max-w-5xl mx-auto px-4 sm:px-6 py-12 -mt-8 relative z-20">
        {error && (
          <div className="mb-8 p-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 shadow-md animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-sm">Request Not Found</div>
              <p className="text-xs text-rose-700 leading-relaxed">{error}</p>
              <div className="pt-2 text-xs text-rose-600">
                Tip: If you recently submitted an assessment, check the reference ID shown on the confirmation screen or try typing your email address.
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Status Card Banner */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-teal-400 to-teal-500" />

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-2xl sm:text-3xl font-extrabold text-[#0c758d] tracking-tight">
                      {result.referenceId}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyRef}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy ID</span>
                        </>
                      )}
                    </button>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${getStatusColor(
                        result.status
                      )}`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                      <span>Status: {result.status}</span>
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {result.company} • {result.name}
                  </h2>
                  <p className="text-xs text-slate-500 font-mono">
                    Registered: {result.createdAt} • Last Updated: {result.updatedAt}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={isRefreshing}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-mono font-semibold transition-all cursor-pointer shadow-2xs"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-[#0c758d] ${isRefreshing ? "animate-spin" : ""}`} />
                    <span>{isRefreshing ? "Refreshing..." : "Live Refresh"}</span>
                  </button>
                </div>
              </div>

              {/* 5-Stage Visual Progress Stepper */}
              <div className="pt-8 space-y-6">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-500">
                  <span>Thermodynamic Pipeline Progress</span>
                  <span className="font-bold text-[#0c758d]">Stage {result.stageIndex + 1} of 5</span>
                </div>

                {/* Stepper Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {[
                    { label: "01. Intake", sub: "Registered" },
                    { label: "02. Contact", sub: "Baseline Review" },
                    { label: "03. Modeling", sub: "Exergy & Pinch" },
                    { label: "04. Proposal", sub: "Guaranteed Scope" },
                    { label: "05. Turnkey", sub: "Implementation" },
                  ].map((step, idx) => {
                    const isCompleted = idx < result.stageIndex;
                    const isCurrent = idx === result.stageIndex;
                    return (
                      <div
                        key={step.label}
                        className={`p-3.5 rounded-2xl border transition-all ${
                          isCurrent
                            ? "bg-[#0c758d]/5 border-[#0c758d] shadow-sm"
                            : isCompleted
                            ? "bg-emerald-50/70 border-emerald-200 text-slate-700"
                            : "bg-slate-50/60 border-slate-200 opacity-60"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : isCurrent ? (
                            <span className="w-4 h-4 rounded-full bg-[#0c758d] text-white text-[10px] flex items-center justify-center font-bold font-mono">
                              {idx + 1}
                            </span>
                          ) : (
                            <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 text-[10px] flex items-center justify-center font-mono">
                              {idx + 1}
                            </span>
                          )}
                          <span
                            className={`text-xs font-bold font-heading ${
                              isCurrent ? "text-[#0c758d]" : isCompleted ? "text-slate-900" : "text-slate-500"
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-sans pl-6">{step.sub}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Current Active Stage Description Callout */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-50 via-sky-50 to-emerald-50 border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase text-[#0c758d] font-bold tracking-wider block">
                      Active Milestone: {result.stageTitle}
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed max-w-2xl">
                      {result.stageDescription}
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-300 px-3.5 py-1.5 rounded-full">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Contractual Guarantee</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Grid: Request Summary & Assigned Engineer */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Scope & Technical Parameters (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#0c758d]" />
                      <span>Facility &amp; Thermodynamic Scope</span>
                    </h3>
                    <span className="text-xs font-mono text-slate-500 uppercase">{result.sector}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                      <span className="text-slate-500 block mb-1">Company / Site</span>
                      <span className="font-bold text-slate-900 text-sm">{result.company}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                      <span className="text-slate-500 block mb-1">Industrial Sector</span>
                      <span className="font-bold text-slate-900 capitalize text-sm">{result.sector}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 sm:col-span-2">
                      <span className="text-slate-500 block mb-1.5">Target Engineering Services</span>
                      <div className="flex flex-wrap gap-1.5">
                        {result.services.map((srv) => (
                          <span
                            key={srv}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-teal-100/70 text-[#0c758d] font-semibold text-[11px] border border-teal-200"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>{srv}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {result.facilityType && (
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 sm:col-span-2">
                        <span className="text-slate-500 block mb-1">Facility Classification</span>
                        <span className="font-medium text-slate-800">{result.facilityType}</span>
                      </div>
                    )}

                    {result.mainChallenge && (
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 sm:col-span-2">
                        <span className="text-slate-500 block mb-1">Process Objective &amp; Challenge</span>
                        <p className="text-slate-700 leading-relaxed font-sans">{result.mainChallenge}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline Events History */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#0c758d]" />
                    <span>Audit &amp; Implementation Timeline</span>
                  </h3>

                  <div className="space-y-4 pt-2">
                    {result.timelineEvents.map((evt, idx) => (
                      <div key={idx} className="flex items-start gap-3.5 text-xs">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            evt.completed
                              ? "bg-emerald-100 text-emerald-700 font-bold"
                              : evt.current
                              ? "bg-[#0c758d] text-white font-bold"
                              : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          {evt.completed ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <span className="text-[10px]">{idx + 1}</span>
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className={`font-bold ${evt.completed ? "text-slate-900" : "text-slate-600"}`}>
                              {evt.title}
                            </span>
                            <span className="font-mono text-[10px] text-slate-400">{evt.timestamp}</span>
                          </div>
                          <p className="text-slate-500 font-sans leading-normal">{evt.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Assigned Engineer & Support Actions (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Assigned Engineer Card */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-[#0c758d] flex items-center justify-center font-bold text-lg font-heading shadow-xs">
                      EA
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-teal-700 font-bold block">
                        Assigned Technical Lead
                      </span>
                      <h4 className="font-bold text-slate-900 text-base">
                        {result.assignedEngineer?.name || "Senior Thermodynamic Specialist"}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {result.assignedEngineer?.role || "Exergy Solutions Engineering Team"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs border-t border-slate-100 pt-4">
                    <a
                      href="mailto:contact@exergy-solutions.com"
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors border border-slate-200/80"
                    >
                      <Mail className="w-4 h-4 text-[#0c758d]" />
                      <span>contact@exergy-solutions.com</span>
                    </a>

                    <a
                      href="tel:+97143346800"
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors border border-slate-200/80"
                    >
                      <Phone className="w-4 h-4 text-[#0c758d]" />
                      <span>+971 4 334 6800 (Dubai HQ)</span>
                    </a>

                    <a
                      href={`https://wa.me/971501234567?text=Hello%2C%20I%20am%20tracking%20my%20request%20${result.referenceId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors border border-emerald-200 font-semibold"
                    >
                      <div className="flex items-center gap-2.5">
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                        <span>Chat with Engineer on WhatsApp</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                    </a>
                  </div>
                </div>

                {/* Direct Action Hub */}
                <div className="bg-gradient-to-br from-[#0c232e] to-[#061821] text-white border border-teal-900/60 rounded-3xl p-6 sm:p-7 shadow-lg space-y-4">
                  <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Contractual ROI Guarantee</span>
                  </div>
                  <h4 className="font-heading font-bold text-lg text-white">
                    Need to expedite or provide fresh baseline data?
                  </h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Our team can incorporate recent chiller plant logs, steam generation sheets, or utility bills directly into your exergy baseline.
                  </p>

                  <div className="pt-2 flex flex-col gap-2.5">
                    <Link
                      href="/contact"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0c758d] hover:bg-[#095f73] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      <span>Submit Additional Process Data</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href="/about#explainer-video"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium border border-white/10 transition-colors"
                    >
                      <span>Watch Illustrative Explainer Video</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State / How to Track Instructions when no query */}
        {!result && !error && (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-md text-center max-w-3xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 text-[#0c758d] flex items-center justify-center mx-auto shadow-2xs">
              <Search className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                How Request Tracking Works
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Every assessment booked through Exergy Solutions generates a unique tracking reference (format: <code className="font-mono font-bold text-[#0c758d]">EX-YYYY-NNNN</code>).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="font-mono text-xs font-bold text-[#0c758d]">STEP 01</span>
                <h4 className="font-bold text-slate-900 text-sm">Enter Reference ID</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Provided on your assessment submission confirmation screen or email notification.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="font-mono text-xs font-bold text-[#0c758d]">STEP 02</span>
                <h4 className="font-bold text-slate-900 text-sm">Real-Time Sync</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Direct connection with the admin portal reflects every engineer note and milestone status.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="font-mono text-xs font-bold text-[#0c758d]">STEP 03</span>
                <h4 className="font-bold text-slate-900 text-sm">Direct Contact</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  One-click communication with the assigned Dubai thermodynamic team on email or WhatsApp.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
              <span className="text-xs text-slate-500">Need to request an assessment first?</span>
              <Link
                href="/assessment"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0c758d] hover:text-[#095f73] underline underline-offset-4"
              >
                <span>Book Industrial Assessment</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">Loading tracking portal...</div>}>
      <TrackRequestContent />
    </Suspense>
  );
}
