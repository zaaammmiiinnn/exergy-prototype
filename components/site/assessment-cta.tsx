"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MotionDiv } from "./motion";
import { 
  ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, 
  Clock, AlertCircle, Building, Mail, Phone, RefreshCw, Send 
} from "lucide-react";

const SECTOR_OPTIONS = [
  "Paper & Pulp",
  "Chemical & Petrochemical",
  "Food & Beverage Processing",
  "Commercial Buildings & Campuses",
  "Hospitality & Resorts",
  "Healthcare & Hospitals",
  "District Cooling & Power",
  "Other Industrial Manufacturing",
];

const SERVICE_OPTIONS = [
  { id: "cooling", label: "Cooling Optimization" },
  { id: "heating", label: "Heating & Steam" },
  { id: "drying", label: "Drying Processes" },
  { id: "water", label: "Water Quality & Treatment" },
  { id: "waste-heat", label: "Waste-Heat Recovery" },
  { id: "process", label: "Process Integration & Pinch" },
];

export function AssessmentCTA() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{ leadId?: string } | null>(null);

  // Form state matching assessmentSchema
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    sector: "Paper & Pulp",
    country: "United Arab Emirates",
    facilityType: "",
    services: ["cooling"] as string[],
    timeline: "this_quarter",
    email: "",
    phone: "",
    mainChallenge: "",
    consent: true,
  });

  const toggleService = (id: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(id);
      if (exists) {
        if (prev.services.length === 1) return prev; // keep at least 1
        return { ...prev, services: prev.services.filter((s) => s !== id) };
      } else {
        return { ...prev, services: [...prev.services, id] };
      }
    });
  };

  const handleNext = () => {
    setError(null);
    if (step === 1) {
      if (!formData.name.trim() || formData.name.length < 2) {
        setError("Please enter your full name (minimum 2 characters).");
        return;
      }
      if (!formData.company.trim() || formData.company.length < 2) {
        setError("Please enter your company or plant name.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (formData.services.length === 0) {
        setError("Please select at least one engineering service.");
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.email.trim() || !formData.email.includes("@")) {
      setError("Please enter a valid work email address.");
      return;
    }
    if (!formData.consent) {
      setError("Please check the consent box to proceed.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit facility audit request.");
      }

      setSubmittedData({ leadId: data.leadId || "EXG-DIR" });
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setStep(1);
    setFormData({
      name: "",
      company: "",
      sector: "Paper & Pulp",
      country: "United Arab Emirates",
      facilityType: "",
      services: ["cooling"],
      timeline: "this_quarter",
      email: "",
      phone: "",
      mainChallenge: "",
      consent: true,
    });
  };

  return (
    <section id="assessment-cta" className="py-28 md:py-36 bg-[hsl(190,30%,98%)] border-t border-slate-200/80 text-[#12232b] relative overflow-hidden">
      <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (50% / 6 cols): Value Proposition & Trust */}
          <div className="lg:col-span-6 space-y-8">
            <MotionDiv delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0c758d]" />
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-[#0c758d] font-semibold">
                  06 / ASSESSMENT & TECHNICAL AUDIT
                </span>
              </div>
            </MotionDiv>

            <MotionDiv delay={0.15}>
              <h2 className="text-3xl sm:text-5xl font-heading font-semibold text-[#12232b] tracking-[-0.03em] leading-[1.08]">
                Start with a facility audit.
              </h2>
            </MotionDiv>

            <MotionDiv delay={0.25}>
              <p className="text-slate-600 text-base md:text-lg leading-relaxed font-sans max-w-xl">
                Every client partnership starts with rigorous mass and energy balance accounting. We establish your plant's theoretical minimum utility consumption before any capital expenditure is committed.
              </p>
            </MotionDiv>

            {/* Trust Bullets */}
            <div className="space-y-3.5 pt-4 border-t border-slate-200/80 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 text-[#0c758d] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Zero Obligation · Fixed-Scope Baseline Thermodynamic Review</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 text-[#0c758d] flex items-center justify-center shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span>48-Hour Response SLA with Senior Thermodynamic Consultant</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 text-[#0c758d] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>Strict Commercial Confidentiality & Non-Disclosure Protocol</span>
              </div>
            </div>

            {/* Direct Escalation Contacts */}
            <div className="p-5 bg-white border border-slate-200/80 rounded-2xl space-y-2 text-xs font-mono text-slate-500 shadow-xs">
              <div className="text-[#12232b] font-semibold uppercase tracking-wider text-[11px]">
                DIRECT ENGINEERING DESK
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs">
                <a href="mailto:sarfraz@exergy-solutions.com" className="text-[#0c758d] hover:underline font-medium">
                  sarfraz@exergy-solutions.com
                </a>
                <span className="hidden sm:inline text-slate-300">|</span>
                <a href="mailto:info@support.exergy-solutions.com" className="text-[#0c758d] hover:underline font-medium">
                  info@support.exergy-solutions.com
                </a>
              </div>
            </div>
          </div>

          {/* Right Column (50% / 6 cols): Multi-Step Form */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#061821] via-[#09222c] to-[#0c303d] border border-teal-900/40 rounded-3xl p-8 md:p-10 shadow-2xl relative text-white">
            
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0c758d] via-[#30a66a] to-transparent rounded-t-3xl" />

            {submittedData ? (
              /* Success State */
              <div className="py-10 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[#30a66a] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#30a66a]">
                    AUDIT DOSSIER QUEUED
                  </span>
                  <h3 className="text-2xl font-heading font-semibold text-white">
                    Facility Assessment Received
                  </h3>
                  <p className="text-sm text-slate-300 font-sans max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your audit specifications have been routed to our senior engineers. We will review your preliminary facility data and respond within 48 hours.
                  </p>
                </div>

                <div className="p-4 bg-[#061821]/90 border border-teal-900/60 rounded-xl font-mono text-xs text-slate-300 max-w-sm mx-auto">
                  <div>COMPANY: {formData.company}</div>
                  <div>SECTOR: {formData.sector}</div>
                  <div className="text-[#30a66a] font-bold mt-1">STATUS: PENDING ENGINEERING TRIAGE</div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="font-mono text-xs uppercase tracking-wider px-6 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-teal-800/60 rounded-full transition-all"
                  >
                    Submit Another Facility Profile
                  </button>
                </div>
              </div>
            ) : (
              /* 3-Step Wizard Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Step Progress Bar */}
                <div className="space-y-2 pb-4 border-b border-teal-900/40">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-[#30a66a] uppercase tracking-wider font-semibold">
                      STEP {String(step).padStart(2, "0")} / 03: {
                        step === 1 ? "FACILITY BASICS" :
                        step === 2 ? "SCOPE & TECHNOLOGY" : "DIRECT CONTACT"
                      }
                    </span>
                    <span className="text-slate-400">{Math.round((step / 3) * 100)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#061821] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#30a66a] transition-all duration-300 rounded-full"
                      style={{ width: `${(step / 3) * 100}%` }}
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2 rounded-xl">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{error}</span>
                  </div>
                )}

                {/* STEP 1: Facility Basics */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="block font-mono text-xs uppercase tracking-wider text-slate-300">
                        Full Name <span className="text-[#30a66a]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tariq Al-Mansoor"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#061821]/80 border border-teal-900/60 focus:border-[#30a66a] text-sm text-white placeholder-slate-500 rounded-xl focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-mono text-xs uppercase tracking-wider text-slate-300">
                        Company / Facility Name <span className="text-[#30a66a]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Gulf Kraft Paper Mills"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#061821]/80 border border-teal-900/60 focus:border-[#30a66a] text-sm text-white placeholder-slate-500 rounded-xl focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block font-mono text-xs uppercase tracking-wider text-slate-300">
                          Sector / Industry
                        </label>
                        <select
                          value={formData.sector}
                          onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#061821] border border-teal-900/60 focus:border-[#30a66a] text-xs text-white rounded-xl focus:outline-none transition-colors"
                        >
                          {SECTOR_OPTIONS.map((sec) => (
                            <option key={sec} value={sec} className="bg-[#061821] text-white">
                              {sec}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block font-mono text-xs uppercase tracking-wider text-slate-300">
                          Country / Emirate
                        </label>
                        <input
                          type="text"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#061821]/80 border border-teal-900/60 focus:border-[#30a66a] text-sm text-white rounded-xl focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Project Scope & Technology */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block font-mono text-xs uppercase tracking-wider text-slate-300">
                        Primary Technology Areas of Interest <span className="text-[#30a66a]">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {SERVICE_OPTIONS.map((svc) => {
                          const isSelected = formData.services.includes(svc.id);
                          return (
                            <button
                              type="button"
                              key={svc.id}
                              onClick={() => toggleService(svc.id)}
                              className={`p-3 text-left font-mono text-xs rounded-xl border transition-all flex items-center justify-between ${
                                isSelected
                                  ? "bg-[#30a66a]/15 border-[#30a66a] text-white"
                                  : "bg-[#061821]/70 border-teal-900/60 text-slate-300 hover:border-teal-700"
                              }`}
                            >
                              <span>{svc.label}</span>
                              <span className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                                isSelected ? "border-[#30a66a] bg-[#30a66a] text-white font-bold" : "border-slate-600"
                              }`}>
                                {isSelected ? "✓" : ""}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1.5">
                        <label className="block font-mono text-xs uppercase tracking-wider text-slate-300">
                          Facility Capacity / Scale
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 5,000 TR or 20 T/h steam"
                          value={formData.facilityType}
                          onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#061821]/80 border border-teal-900/60 focus:border-[#30a66a] text-xs text-white placeholder-slate-500 rounded-xl focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block font-mono text-xs uppercase tracking-wider text-slate-300">
                          Target Implementation Timeline
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#061821] border border-teal-900/60 focus:border-[#30a66a] text-xs text-white rounded-xl focus:outline-none transition-colors"
                        >
                          <option value="immediate">Immediate (&lt; 30 Days)</option>
                          <option value="this_quarter">Current Quarter</option>
                          <option value="next_year">Next Fiscal Year</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Contact Details & Consent */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block font-mono text-xs uppercase tracking-wider text-slate-300">
                          Work Email <span className="text-[#30a66a]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#061821]/80 border border-teal-900/60 focus:border-[#30a66a] text-sm text-white placeholder-slate-500 rounded-xl focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block font-mono text-xs uppercase tracking-wider text-slate-300">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+971 50 123 4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#061821]/80 border border-teal-900/60 focus:border-[#30a66a] text-sm text-white placeholder-slate-500 rounded-xl focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-mono text-xs uppercase tracking-wider text-slate-300">
                        Main Efficiency Challenge / Known Bottlenecks
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. High cooling tower blowdown losses, low delta-T syndrome across district cooling interfaces..."
                        value={formData.mainChallenge}
                        onChange={(e) => setFormData({ ...formData, mainChallenge: e.target.value })}
                        className="w-full px-4 py-2.5 bg-[#061821]/80 border border-teal-900/60 focus:border-[#30a66a] text-xs text-white placeholder-slate-500 rounded-xl focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        type="checkbox"
                        id="consent-check"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-1 rounded-sm accent-[#30a66a]"
                      />
                      <label htmlFor="consent-check" className="font-mono text-[11px] text-slate-400 leading-tight cursor-pointer">
                        I confirm that the provided operational specifications may be used for confidential thermodynamic modeling.
                      </label>
                    </div>
                  </div>
                )}

                {/* Wizard Navigation Footer */}
                <div className="pt-4 border-t border-teal-900/40 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => { setError(null); setStep(step - 1); }}
                      className="inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-wider text-slate-300 hover:text-white px-5 py-2.5 border border-teal-900 rounded-full transition-colors hover:bg-white/5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  ) : <div />}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider bg-[#30a66a] hover:bg-[#28925c] text-white px-6 py-2.5 rounded-full transition-all shadow-md"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider bg-[#30a66a] hover:bg-[#28925c] text-white px-7 py-3 rounded-full transition-all shadow-md disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Dispatching Assessment...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Audit Request</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  )}
                </div>

              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
