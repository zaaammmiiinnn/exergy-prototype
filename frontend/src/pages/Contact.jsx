import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, 
  Clock, ShieldCheck, ArrowRight 
} from 'lucide-react';
import { api } from '../api/client';

export const Contact = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || searchParams.get('reason') || '';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    reason_for_connecting: preselectedService || 'Cooling optimization',
    notes: '',
  });

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({
        ...prev,
        reason_for_connecting: preselectedService,
      }));
    }
  }, [preselectedService]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [submittedLead, setSubmittedLead] = useState(null);

  const reasons = [
    'Cooling optimization',
    'Heating & steam',
    'Drying processes',
    'Water quality',
    'Waste-heat recovery',
    'Process integration',
    'Preliminary Exergy Assessment',
    'Other / Custom Process Engineering'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        reason_for_connecting: formData.reason_for_connecting,
        source: 'Contact Form',
        notes: formData.notes.trim() || undefined,
      };

      const res = await api.submitLeadInquiry(payload);
      setSubmittedLead(res);
      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        reason_for_connecting: 'Cooling optimization',
        notes: '',
      });
    } catch (err) {
      console.error('Contact submission error:', err);
      setError(err.message || 'Failed to submit inquiry. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[hsl(190,30%,98%)] text-[hsl(200,40%,12%)] pb-24">
      
      {/* Header Banner */}
      <section className="pt-28 pb-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#30a66a]">
              Connect With Engineering
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-display">
              Ready to see what your plant is really losing?
            </h1>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              Book a no-obligation exergy assessment. We’ll quantify the opportunity and back our implementation with a performance guarantee. We reply within one business day.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid lg:grid-cols-5 gap-10">
          
          {/* Contact Details & Office info (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Office Card */}
            <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Headquarters & Contact
              </h2>

              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0c758d] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
                      Address
                    </h3>
                    <p className="mt-1 leading-relaxed text-slate-600">
                      334/6D Al Wasl Street DM199 Al Satwa, Dubai UAE
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0c758d] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
                      Direct Email
                    </h3>
                    <a
                      href="mailto:sarfraz@exergy-solutions.com"
                      className="mt-1 block text-[#0c758d] font-medium hover:underline"
                    >
                      sarfraz@exergy-solutions.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0c758d] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
                      Response Time
                    </h3>
                    <p className="mt-1 text-slate-600">
                      Within 1 business day. Guaranteed privacy, no spam.
                    </p>
                  </div>
                </div>
              </div>

              {/* LinkedIn Button */}
              <div className="pt-2">
                <a
                  href="https://www.linkedin.com/company/135328489/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 hover:border-[#0c758d] hover:text-[#0c758d] hover:bg-white transition-all shadow-xs"
                >
                  <svg className="h-4 w-4 fill-current text-[#0077b5]" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>Connect on LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Performance Guarantee badge */}
            <div className="rounded-3xl bg-[#0c758d] text-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-300" />
                <h3 className="font-bold text-base">Contractual Performance Guarantees</h3>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-white/85">
                Our engineering team enters every turnkey contract with guaranteed energy and water savings verified by international measurement protocols.
              </p>
            </div>

          </div>

          {/* Form (3 cols) */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 font-display">
                Request an Exergy Assessment
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Please complete the form below. An engineering director will contact you directly.
              </p>

              {success ? (
                <div className="mt-8 p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-slate-800 space-y-4">
                  <div className="flex items-center gap-3 text-[#30a66a]">
                    <CheckCircle2 className="w-8 h-8" />
                    <h3 className="text-xl font-bold text-slate-900 font-display">
                      Inquiry Successfully Received
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Thank you! Your preliminary audit request has been recorded in our engineering portal. A senior engineer will review your inquiry and follow up within one business day.
                  </p>
                  {submittedLead?.lead_id && (
                    <div className="text-xs font-mono text-slate-500 bg-white p-3 rounded-lg border border-emerald-100">
                      Tracking Reference: <span className="font-bold text-slate-700">{submittedLead.lead_id}</span>
                    </div>
                  )}
                  <button
                    onClick={() => setSuccess(false)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#0c758d] text-white hover:bg-[#095f73]"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  {error && (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-3 text-xs text-rose-700">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0c758d] focus:ring-1 focus:ring-[#0c758d] outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="s.jenkins@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0c758d] focus:ring-1 focus:ring-[#0c758d] outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+971 50 123 4567"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0c758d] focus:ring-1 focus:ring-[#0c758d] outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Area of Optimization *
                      </label>
                      <select
                        value={formData.reason_for_connecting}
                        onChange={(e) => setFormData({ ...formData, reason_for_connecting: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:border-[#0c758d] focus:ring-1 focus:ring-[#0c758d] outline-none transition-all"
                      >
                        {reasons.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Facility & Process Details (Optional)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Mention your chiller capacity (TR), boiler steam rating (Ton/hr), current freshwater consumption, or main energy concerns..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0c758d] focus:ring-1 focus:ring-[#0c758d] outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-full bg-[#0c758d] hover:bg-[#095f73] text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Assessment Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-400 mt-2">
                    We treat all utility data and operational profiles under strict confidentiality.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
