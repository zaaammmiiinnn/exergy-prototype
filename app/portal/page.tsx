"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Building2,
  CheckCircle2,
  Clock,
  LogOut,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  FileText,
  Layers,
  Send,
  RefreshCw,
  PlusCircle,
  AlertCircle,
  Compass,
  MapPin,
  ChevronRight,
  User,
} from "lucide-react";
import {
  getCustomerDashboardAction,
  customerLogoutAction,
  sendCustomerMessageAction,
  type CustomerDashboardData,
  type CustomerRequestItem,
} from "@/app/actions/customer-auth";

export default function CustomerPortalPage() {
  const router = useRouter();
  const [data, setData] = useState<CustomerDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeRequestTab, setActiveRequestTab] = useState<string>("");
  const [messageText, setMessageText] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [messageFeedback, setMessageFeedback] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getCustomerDashboardAction();
      if (res.success && res.data) {
        setData(res.data);
        if (res.data.requests.length > 0) {
          setActiveRequestTab(res.data.requests[0].shortId);
        }
      } else {
        router.push("/portal/login?redirect=/portal");
      }
    } catch {
      router.push("/portal/login?redirect=/portal");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  const handleLogout = async () => {
    await customerLogoutAction();
    router.push("/portal/login");
    router.refresh();
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !activeRequest) return;

    setIsSendingMessage(true);
    setMessageFeedback(null);

    try {
      const res = await sendCustomerMessageAction(activeRequest.shortId, messageText);
      if (res.success) {
        setMessageFeedback("Your message has been sent to the Exergy Solutions engineering desk.");
        setMessageText("");
      } else {
        setMessageFeedback(res.error || "Failed to deliver message.");
      }
    } catch {
      setMessageFeedback("Error sending message. Please contact us directly.");
    } finally {
      setIsSendingMessage(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <RefreshCw className="w-8 h-8 text-[#0c758d] animate-spin" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider">
            Loading Customer Portal...
          </span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { customer, companyReachStatus, assignedTeam, requests } = data;
  const activeRequest = requests.find((r) => r.shortId === activeRequestTab) || requests[0];

  const getStatusBadge = (status: CustomerRequestItem["status"]) => {
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
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Top Banner & Account Header */}
      <section className="bg-gradient-to-r from-slate-900 via-[#0c232e] to-[#061821] text-white pt-10 pb-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0c758d]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-white/10 text-cyan-300 border border-white/15">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>Client Account Dashboard</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Welcome, {customer.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-sans">
                {customer.company} • Account: <code className="font-mono text-cyan-300">{customer.email}</code>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/assessment"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0c758d] hover:bg-[#095f73] text-white font-semibold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>New Assessment</span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-red-500/20 text-slate-300 hover:text-red-200 border border-white/15 hover:border-red-400/50 font-semibold text-xs transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Body */}
      <main className="container max-w-7xl mx-auto px-4 sm:px-6 -mt-10 relative z-20 space-y-8">
        {/* 1. "Did we reach the company?" Intake & Receipt Verification Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-[#0c758d]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Status (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified: Reached Exergy Solutions</span>
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Ack Ref: {companyReachStatus.intakeReference}
                </span>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Your Request Was Successfully Received
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed font-sans">
                  Your industrial facility profile is logged at the{" "}
                  <strong className="text-slate-900 font-semibold">{companyReachStatus.deskName}</strong>.
                  Our team is actively reviewing your thermodynamic parameters against regional utility benchmarks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
                    Engineering Intake Desk
                  </span>
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0c758d] shrink-0" />
                    <span>{companyReachStatus.officeLocation}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold">
                    Response SLA
                  </span>
                  <div className="font-semibold text-emerald-800 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{companyReachStatus.responseSla}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Assigned Engineer Card (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-teal-50 to-sky-50 border border-teal-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#0c758d] text-white flex items-center justify-center font-bold text-base font-heading shadow-sm">
                  EA
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-teal-800 font-bold block">
                    Assigned Technical Lead
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {assignedTeam.leadEngineer}
                  </h4>
                  <p className="text-xs text-slate-500 font-sans">{assignedTeam.role}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <a
                  href={`mailto:${assignedTeam.email}`}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-white/80 hover:bg-white text-slate-700 transition-colors border border-teal-200/60 font-mono text-[11px]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#0c758d]" />
                  <span>{assignedTeam.email}</span>
                </a>

                <a
                  href={`tel:${assignedTeam.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-white/80 hover:bg-white text-slate-700 transition-colors border border-teal-200/60 font-mono text-[11px]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0c758d]" />
                  <span>{assignedTeam.phone} (Dubai Direct)</span>
                </a>

                <a
                  href={`https://wa.me/${assignedTeam.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%2C%20I%20am%20inquiring%20about%20my%20request%20${activeRequest?.shortId || "EX-2026-6253"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors font-semibold text-xs shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Assigned Engineer</span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-white/80" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Requests & Live Tracking Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#0c758d] font-bold block">
                Operational File Tracking
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Your Assessment Requests ({requests.length})
              </h2>
            </div>

            {/* Request Tabs if multiple */}
            {requests.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {requests.map((r) => (
                  <button
                    key={r.shortId}
                    type="button"
                    onClick={() => setActiveRequestTab(r.shortId)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                      activeRequest?.shortId === r.shortId
                        ? "bg-[#0c758d] text-white font-bold shadow-xs"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    {r.shortId}
                  </button>
                ))}
              </div>
            )}
          </div>

          {activeRequest && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
              {/* Request Header Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono text-xl sm:text-2xl font-extrabold text-[#0c758d]">
                      {activeRequest.shortId}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${getStatusBadge(
                        activeRequest.status
                      )}`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                      <span>{activeRequest.status}</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">
                    Registered: {activeRequest.createdAt} • Last Updated: {activeRequest.updatedAt}
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 text-xs font-mono font-semibold border border-teal-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span>Verified Client Session</span>
                  </span>
                </div>
              </div>

              {/* 5-Stage Visual Stepper */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-500">
                  <span>Thermodynamic Pipeline Progress</span>
                  <span className="font-bold text-[#0c758d]">
                    Stage {activeRequest.stageIndex + 1} of 5: {activeRequest.stageTitle}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {[
                    { label: "01. Intake", sub: "Verified" },
                    { label: "02. Contact", sub: "Baseline Review" },
                    { label: "03. Modeling", sub: "Exergy & Pinch" },
                    { label: "04. Proposal", sub: "Guaranteed Scope" },
                    { label: "05. Turnkey", sub: "Implementation" },
                  ].map((step, idx) => {
                    const isCompleted = idx < activeRequest.stageIndex;
                    const isCurrent = idx === activeRequest.stageIndex;
                    return (
                      <div
                        key={step.label}
                        className={`p-3 rounded-2xl border transition-all ${
                          isCurrent
                            ? "bg-[#0c758d]/5 border-[#0c758d] shadow-2xs"
                            : isCompleted
                            ? "bg-emerald-50/70 border-emerald-200 text-slate-700"
                            : "bg-slate-50/60 border-slate-200 opacity-60"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {isCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <span
                              className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold font-mono ${
                                isCurrent
                                  ? "bg-[#0c758d] text-white"
                                  : "bg-slate-200 text-slate-600"
                              }`}
                            >
                              {idx + 1}
                            </span>
                          )}
                          <span
                            className={`text-xs font-bold font-heading ${
                              isCurrent
                                ? "text-[#0c758d]"
                                : isCompleted
                                ? "text-slate-900"
                                : "text-slate-500"
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-sans pl-5">{step.sub}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed font-sans">
                  <strong>Current Status:</strong> {activeRequest.stageDescription}
                </div>
              </div>

              {/* Facility & Scope Bento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#0c758d]" />
                    <span>Facility &amp; System Scope</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Facility Type</span>
                      <span className="font-semibold text-slate-800">
                        {activeRequest.facilityType || "Continuous Processing Facility"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Sector</span>
                      <span className="font-semibold text-slate-800 capitalize">
                        {activeRequest.sector}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Target Timeline</span>
                      <span className="font-semibold text-slate-800">
                        {activeRequest.timeline || "Immediate"}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-mono uppercase text-slate-400 block mb-1.5 font-semibold">
                      Targeted Thermodynamic Streams
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeRequest.services.map((srv) => (
                        <span
                          key={srv}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-teal-50 text-[#0c758d] font-semibold text-[11px] border border-teal-200"
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>{srv}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Message / Update Box */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Send className="w-4 h-4 text-[#0c758d]" />
                      <span>Send Update to Engineering Team</span>
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">
                      Syncs with Admin Portal
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    Have recent chiller logs, steam generation data, or plant schematics? Send a direct note to your assigned engineers.
                  </p>

                  <form onSubmit={handleSendMessage} className="space-y-3">
                    <textarea
                      rows={3}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Write your note, plant update, or question here..."
                      className="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c758d]"
                    />

                    {messageFeedback && (
                      <div className="p-2.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{messageFeedback}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSendingMessage || !messageText.trim()}
                      className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#0c758d] hover:bg-[#095f73] text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isSendingMessage ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Sending to Dubai Team...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message to Engineers</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
