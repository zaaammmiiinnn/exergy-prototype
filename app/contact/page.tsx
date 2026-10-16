"use client";

import React, { useState } from "react";
import { siteSettingsSeed } from "@/content/seed/settings";
import { MotionDiv } from "@/components/site/motion";
import { MapPin, Mail, Clock, Send, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulated lead capture action (in Phase 3 connects to Supabase/Resend)
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);
    setFormSubmitted(true);
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-navy-950 text-white pt-16 pb-20 border-b border-slate-800 relative">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <MotionDiv delay={0.05}>
              <span className="text-teal-400 font-mono text-xs uppercase tracking-wider font-semibold">
                Direct Engineering Inquiries
              </span>
            </MotionDiv>
            <MotionDiv delay={0.15}>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Ready to see what your plant is really losing?
              </h1>
            </MotionDiv>
            <MotionDiv delay={0.25}>
              <p className="text-lg text-slate-300 leading-relaxed">
                Connect directly with our engineering team in Dubai. We analyze your plant data and quantify thermodynamic energy and water recovery potential.
              </p>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Main Content: Info & Form */}
      <section className="py-20 bg-slate-950 text-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Dubai Headquarters
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Headquartered in Dubai, serving energy- and water-intensive industrial operations across the UAE, GCC, and international markets.
                </p>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase block font-semibold">Office Address</span>
                    <span className="text-slate-200">{siteSettingsSeed.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Mail className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-slate-400 uppercase block font-semibold">Direct Email & Support</span>
                    <a href="mailto:neuralwaves.official@gmail.com" className="text-teal-400 hover:text-teal-300 transition-colors block text-sm font-medium">
                      neuralwaves.official@gmail.com
                    </a>
                    <a href="mailto:support@neuralwaves.in" className="text-slate-300 hover:text-teal-300 transition-colors block text-xs">
                      support@neuralwaves.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Clock className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase block font-semibold">Response Guarantee</span>
                    <span className="text-slate-300">We reply within one business day. No spam, ever.</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/40 border border-teal-500/30 space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>Looking for an Assessment?</span>
                </h4>
                <p className="text-xs text-slate-400">
                  If you want a structured multi-point facility assessment, use our dedicated 4-step wizard for priority routing.
                </p>
                <div className="pt-2">
                  <a
                    href="/assessment"
                    className="text-xs font-semibold text-teal-400 hover:text-teal-300 inline-flex items-center gap-1"
                  >
                    <span>Launch Assessment Form</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
                {formSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-teal-500/20 text-teal-400 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Inquiry Received</h3>
                    <p className="text-slate-300 text-sm max-w-md mx-auto">
                      Thank you for contacting Exergy Solutions. Our engineering leadership has been notified and will reply within one business day.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs text-teal-400 underline pt-4"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                          Your Name <span className="text-teal-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. John Doe"
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
                          placeholder="john@plant.com"
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                          Company / Facility <span className="text-teal-400">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Industrial Operations LLC"
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+971 50 000 0000"
                          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-2">
                        Message / Project Scope <span className="text-teal-400">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Briefly describe your process lines, boilers, chillers, or water consumption challenges..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Engineering Inquiry</span>
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-slate-500">
                      We respect your privacy. All information is held confidential under UAE PDPL guidelines.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
