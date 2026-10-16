"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { servicesSeed } from "@/content/seed/services";
import { industriesSeed } from "@/content/seed/industries";
import { submitAssessment } from "@/app/actions/submit-assessment";
import { MotionDiv } from "@/components/site/motion";
import { CheckCircle2, ChevronRight, ChevronLeft, Send } from "lucide-react";

interface AssessmentFormData {
  // Step 1
  name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  // Step 2
  sector: string;
  country: string;
  facilityType: string;
  // Step 3
  services: string[];
  mainChallenge: string;
  timeline: string;
  // Step 4
  consent: boolean;
}

const STORAGE_KEY = "exergy_assessment_draft_v1";

function AssessmentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<AssessmentFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    sector: searchParams.get("sector") || "paper",
    country: "United Arab Emirates",
    facilityType: "",
    services: searchParams.get("service") ? [searchParams.get("service")!] : ["cooling"],
    mainChallenge: "",
    timeline: "this_quarter",
    consent: false,
  });

  // Restore draft from sessionStorage safely
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({
          ...prev,
          ...parsed,
          // Respect URL query params if present
          sector: searchParams.get("sector") || parsed.sector || prev.sector,
          services: searchParams.get("service")
            ? [searchParams.get("service")!]
            : parsed.services?.length
            ? parsed.services
            : prev.services,
        }));
      }
    } catch {
      // sessionStorage blocked or unavailable
    }
  }, [searchParams]);

  // Persist draft to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch {
      // storage quota or blocked
    }
  }, [formData]);

  const toggleService = (slug: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(slug);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== slug)
          : [...prev.services, slug],
      };
    });
  };

  const handleNext = () => {
    // Basic per-step validation
    if (step === 1 && (!formData.name.trim() || !formData.email.trim() || !formData.company.trim())) {
      alert("Please provide your name, work email, and company name to continue.");
      return;
    }
    if (step === 2 && !formData.sector) {
      alert("Please select your industrial or commercial sector.");
      return;
    }
    if (step === 3 && formData.services.length === 0) {
      alert("Please select at least one optimization service.");
      return;
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert("Please accept the privacy consent to submit.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await submitAssessment({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        jobTitle: formData.jobTitle,
        sector: formData.sector,
        country: formData.country,
        facilityType: formData.facilityType,
        services: formData.services,
        mainChallenge: formData.mainChallenge,
        timeline: formData.timeline,
        consent: formData.consent,
      });

      if (!res.success) {
        alert(res.error || "Submission failed. Please check your entries.");
        setSubmitting(false);
        return;
      }

      // Clear session draft
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {}

      router.push(`/assessment/thank-you?ref=${res.shortId}&name=${encodeURIComponent(formData.name)}`);
    } catch (err) {
      console.error(err);
      alert("Submission encountered an issue. Please try again or email contact@exergy-solutions.com.");
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[80vh] bg-navy-950 text-white">
      {/* Top Banner */}
      <section className="border-b border-slate-800 bg-navy-950 py-10">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <span className="text-teal-400 font-mono text-xs uppercase tracking-wider font-semibold block mb-2">
            Multi-Point Facility Assessment
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to see what your plant is really losing?
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl">
            Book a no-obligation exergy assessment. We’ll quantify the opportunity and back our implementation with a performance guarantee.
          </p>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className={step >= 1 ? "text-teal-400 font-bold" : ""}>1. Contact</span>
              <span className={step >= 2 ? "text-teal-400 font-bold" : ""}>2. Facility</span>
              <span className={step >= 3 ? "text-teal-400 font-bold" : ""}>3. Needs</span>
              <span className={step >= 4 ? "text-teal-400 font-bold" : ""}>4. Review</span>
            </div>
            <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-teal-400 transition-all duration-300 rounded-full"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Wizard Form */}
      <section className="py-12 flex-1">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl">
            {/* Step 1: Contact Details */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white">Step 1: Your Contact Information</h3>
                  <p className="text-xs text-slate-400 mt-1">We reply within one business day. No spam, ever.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                      Full Name <span className="text-teal-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                      Work Email <span className="text-teal-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                      Company / Organization <span className="text-teal-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Gulf Petrochemicals Ltd"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      placeholder="Plant Director / Energy Manager"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                    Direct Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971 50 123 4567"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Facility */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white">Step 2: Facility & Sector Profile</h3>
                  <p className="text-xs text-slate-400 mt-1">Select the operational domain of your facility.</p>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-3">
                    Target Sector <span className="text-teal-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {industriesSeed.map((ind) => (
                      <button
                        type="button"
                        key={ind.slug}
                        onClick={() => setFormData({ ...formData, sector: ind.slug })}
                        className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                          formData.sector === ind.slug
                            ? "border-teal-500 bg-teal-500/15 text-teal-300 ring-2 ring-teal-500/40"
                            : "border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        {ind.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                      Country Location
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="United Arab Emirates"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                      Facility Type / Operations
                    </label>
                    <input
                      type="text"
                      value={formData.facilityType}
                      onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
                      placeholder="e.g. Greenfield plant, District Cooling, 24/7 Mill"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Needs */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white">Step 3: Systems of Interest & Timeline</h3>
                  <p className="text-xs text-slate-400 mt-1">Multi-select all utility streams you wish to optimize.</p>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-3">
                    Optimization Streams (Select all that apply) <span className="text-teal-400">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servicesSeed.map((s) => {
                      const selected = formData.services.includes(s.slug);
                      return (
                        <button
                          type="button"
                          key={s.slug}
                          onClick={() => toggleService(s.slug)}
                          className={`p-3.5 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-all ${
                            selected
                              ? "border-teal-500 bg-teal-500/15 text-white ring-1 ring-teal-500"
                              : "border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-700"
                          }`}
                        >
                          <span className="font-semibold">{s.title}</span>
                          {selected ? (
                            <CheckCircle2 className="w-4 h-4 text-teal-400" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-700" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                    Project Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="this_quarter">Urgent: This Quarter (Within 90 days)</option>
                    <option value="six_months">Next 6 Months</option>
                    <option value="exploring">Exploratory / Feasibility Study</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                    Primary Challenge / Operational Notes
                  </label>
                  <textarea
                    rows={3}
                    value={formData.mainChallenge}
                    onChange={(e) => setFormData({ ...formData, mainChallenge: e.target.value })}
                    placeholder="e.g. Chiller plant peak electrical demand is high during summer, steam boilers consume excessive natural gas..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white">Step 4: Review & Confirm Submission</h3>
                  <p className="text-xs text-slate-400 mt-1">Review your assessment request summary before dispatching.</p>
                </div>

                <div className="space-y-3 bg-slate-950/70 p-5 rounded-xl border border-slate-800 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Name & Title:</span>
                    <span className="text-white font-medium">{formData.name} ({formData.jobTitle || "N/A"})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Email:</span>
                    <span className="text-teal-300 font-medium">{formData.email}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Company & Country:</span>
                    <span className="text-white font-medium">{formData.company} ({formData.country})</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Sector:</span>
                    <span className="text-white font-medium capitalize">{formData.sector}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Selected Streams:</span>
                    <span className="text-teal-300 font-medium">{formData.services.join(", ")}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Timeline:</span>
                    <span className="text-white font-medium capitalize">{formData.timeline.replace("_", " ")}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-950 text-teal-500 focus:ring-teal-500"
                    />
                    <span className="text-xs text-slate-300 leading-relaxed">
                      I consent to Exergy Solutions storing my contact and facility details to prepare our diagnostic review in accordance with the <a href="/privacy" className="text-teal-400 underline">Privacy Policy</a>.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-semibold text-xs py-3 px-6 rounded-xl shadow-md transition-all"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-white font-bold text-xs py-3.5 px-8 rounded-xl shadow-xl transition-all disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Submitting Assessment...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Assessment Request</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AssessmentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy-950 flex items-center justify-center text-slate-400">Loading assessment wizard...</div>}>
      <AssessmentContent />
    </Suspense>
  );
}
