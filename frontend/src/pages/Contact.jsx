import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, 
  Clock, ShieldCheck, ArrowRight, User 
} from 'lucide-react';
import { api } from '../api/client';
import { SocialMediaSection } from '../components/SocialMediaSection';

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

  const serviceOptions = [
    'Cooling optimization (Chilled water, HVAC, refrigeration)',
    'Heating & steam (Boiler, steam traps, condensate)',
    'Drying processes (Exhaust heat, moisture control)',
    'Water quality (RO, effluent treatment, ZLD)',
    'Waste-heat recovery (ORC, economizers, heat cascading)',
    'Process integration (Pinch analysis, HEN synthesis)',
    'Comprehensive Energy & Water Audit',
    'Other Custom Engineering Project'
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
        reason_for_connecting: 'Cooling optimization (Chilled water, HVAC, refrigeration)',
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
    <div className="bg-[hsl(190,30%,98%)] text-[hsl(200,40%,12%)]">
      
      {/* Header Banner */}
      <section className="pt-24 pb-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#30a66a]">
              Get in Touch
            </span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-display">
              Ready to see what your plant is really losing?
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              Book a no-obligation exergy assessment. We quantify the savings opportunity through second-law thermodynamics and back implementation with contractual performance guarantees.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Form + Office Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          {/* Left Column: Office info & quick contacts (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Office Card */}
            <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Headquarters & Direct Office
              </h2>

              <div className="space-y-5 text-sm text-slate-600">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#0c758d]/10 text-[#0c758d] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Physical Address
                    </h3>
                    <p className="mt-1 leading-relaxed text-slate-600">
                      334/6D Al Wasl Street DM199 Al Satwa, Dubai UAE
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#0c758d]/10 text-[#0c758d] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Official Engineering Email
                    </h3>
                    <a
                      href="mailto:sarfraz@exergy-solutions.com"
                      className="mt-1 block text-[#0c758d] font-semibold hover:underline"
                    >
                      sarfraz@exergy-solutions.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#0c758d]/10 text-[#0c758d] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Regional Phone
                    </h3>
                    <a
                      href="tel:+97142345678"
                      className="mt-1 block text-slate-700 font-medium hover:text-[#0c758d]"
                    >
                      +971 4 234 5678
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#0c758d]/10 text-[#0c758d] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Response Guarantee
                    </h3>
                    <p className="mt-1 text-slate-600">
                      Within 1 business day. Strict non-disclosure confidentiality on all utility data.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Guarantee badge */}
            <div className="rounded-3xl bg-[#0c758d] text-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-[#30a66a]" />
                <h3 className="font-bold text-base">Contractual Performance Guarantee</h3>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-white/85">
                Savings targets are contractual, measured, and verified against baseline using IPMVP international measurement protocols.
              </p>
            </div>

          </div>

          {/* Right Column: Contact & Inquiry Form (3 cols) */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm">
              <div className="border-b border-slate-100 pb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#30a66a]">
                  Preliminary Audit Request
                </span>
                <h2 className="text-2xl font-bold text-slate-900 font-display mt-1">
                  Connect With Our Engineering Team
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-500">
                  Please provide your contact details and the specific service or utility area you wish to optimize.
                </p>
              </div>

              {success ? (
                <div className="mt-8 p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-slate-800 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center gap-3 text-[#30a66a]">
                    <CheckCircle2 className="w-8 h-8" />
                    <h3 className="text-xl font-bold text-slate-900 font-display">
                      Audit Request Successfully Submitted!
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Thank you! Your inquiry has been registered in our engineering management portal. A senior thermodynamicist will review your plant specifications and follow up within one business day.
                  </p>
                  {submittedLead?.lead_id && (
                    <div className="text-xs font-mono text-slate-600 bg-white p-3 rounded-xl border border-emerald-200">
                      Tracking Reference ID: <span className="font-bold text-slate-900">#{submittedLead.lead_id}</span>
                    </div>
                  )}
                  <button
                    onClick={() => setSuccess(false)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold bg-[#0c758d] text-white hover:bg-[#095f73]"
                  >
                    Submit Another Inquiry
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

                  {/* 1. Name & Phone */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        1. Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Tariq Al-Mansoor"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0c758d] focus:ring-1 focus:ring-[#0c758d] outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        2. Phone Number *
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
                  </div>

                  {/* 2. Email & Service Reason */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        3. Work Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="tariq@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0c758d] focus:ring-1 focus:ring-[#0c758d] outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        4. Reason or Service Desired *
                      </label>
                      <select
                        value={formData.reason_for_connecting}
                        onChange={(e) => setFormData({ ...formData, reason_for_connecting: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:bg-white focus:border-[#0c758d] focus:ring-1 focus:ring-[#0c758d] outline-none transition-all"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 3. Facility Notes */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      5. Facility Details & Inefficiency Symptoms (Optional)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Share facility details (e.g. Chiller capacity in TR, Boiler steam rating, dryer gas usage, or high freshwater bills)..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#0c758d] focus:ring-1 focus:ring-[#0c758d] outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-full bg-[#0c758d] hover:bg-[#095f73] text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Sending inquiry to engineering team...</span>
                    ) : (
                      <>
                        <span>Submit Assessment Request</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-400 mt-2">
                    Guaranteed confidential evaluation. No unsolicited promotional emails.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Social Media Channels Integration Section */}
      <SocialMediaSection />

    </div>
  );
};
