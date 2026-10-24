"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Building,
  MapPin,
  Shield,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Save,
  Clock,
  IdCard,
  Database,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getAdminProfileAction,
  updateAdminProfileAction,
  type EmployeeProfile,
} from "@/app/actions/profile";

export default function AdminProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<EmployeeProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  const loadProfile = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAdminProfileAction();
      if (res.success && res.profile) {
        setProfile(res.profile);
        setFullName(res.profile.full_name || "");
        setJobTitle(res.profile.job_title || "");
        setDepartment(res.profile.department || "");
        setPhone(res.profile.phone || "");
        setLocation(res.profile.location || "");
        setBio(res.profile.bio || "");
        setEmergencyContact(res.profile.emergency_contact || "");
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Failed to load employee profile.",
        });
      }
    } catch {
      setFeedback({
        type: "error",
        message: "Failed to connect to Supabase database.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setFeedback({ type: "error", message: "Full Name is required." });
      return;
    }

    setSaving(true);
    setFeedback(null);

    try {
      const res = await updateAdminProfileAction({
        full_name: fullName,
        job_title: jobTitle,
        department,
        phone,
        location,
        bio,
        emergency_contact: emergencyContact,
      });

      if (res.success && res.profile) {
        setProfile(res.profile);
        setFeedback({
          type: "success",
          message:
            res.message || "Profile details updated and synchronized with Supabase database.",
        });
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Failed to save profile changes.",
        });
      }
    } catch (err: any) {
      setFeedback({
        type: "error",
        message: err?.message || "An unexpected error occurred while saving.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (profile) {
      setFullName(profile.full_name || "");
      setJobTitle(profile.job_title || "");
      setDepartment(profile.department || "");
      setPhone(profile.phone || "");
      setLocation(profile.location || "");
      setBio(profile.bio || "");
      setEmergencyContact(profile.emergency_contact || "");
      setFeedback(null);
    }
  };

  const roleLabel =
    profile?.role === "founder"
      ? "Founder Desk"
      : profile?.role === "admin"
      ? "Administrator"
      : "Staff Engineer";

  const roleBadgeStyle =
    profile?.role === "founder"
      ? "bg-purple-50 text-purple-700 border-purple-200"
      : profile?.role === "admin"
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : "bg-teal-50 text-teal-700 border-teal-200";

  const initials = profile?.full_name
    ? profile.full_name
        .split(" ")
        .map((s) => s[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : profile?.email
    ? profile.email.slice(0, 2).toUpperCase()
    : "EX";

  const formattedDate = (isoStr?: string) => {
    if (!isoStr) return "N/A";
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header Row with Breadcrumb & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
            <Link href="/admin" className="hover:text-[#0c758d] transition-colors">
              Console
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-[#12232b] font-medium">Employee Profile</span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="font-heading font-extrabold text-2xl text-[#12232b] tracking-tight">
              Employee Profile
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0c758d] border border-teal-200/70 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
              <Database className="w-3 h-3 text-teal-600" />
              <span>Supabase Live</span>
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider ${roleBadgeStyle}`}
            >
              {roleLabel}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Manage your personal credentials, organizational role, and communication details in Supabase PostgreSQL
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadProfile}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-teal-200/80 bg-teal-50/70 hover:bg-teal-100 text-[#0c758d] font-mono text-xs font-semibold transition-all shadow-2xs cursor-pointer disabled:opacity-50"
            title="Refresh profile from Supabase"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-teal-600" : ""}`} />
            <span>Sync DB</span>
          </button>

          <Link
            href="/admin/change-password"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-sans text-xs font-medium transition-all shadow-2xs cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5 text-teal-600" />
            <span>Update Password</span>
          </Link>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-mono transition-all animate-in fade-in ${
            feedback.type === "success"
              ? "bg-teal-50 border-teal-200 text-[#0c758d]"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-slate-400 hover:text-slate-600 cursor-pointer font-sans text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Profile Card & Overview */}
        <div className="lg:col-span-4 space-y-6">
          {/* Identity Overview Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50/50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

            <div className="flex flex-col items-center text-center space-y-3 relative z-10">
              {/* Avatar Circle with Ring */}
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#0c758d] via-[#12232b] to-[#2C7FB8] text-white flex items-center justify-center font-heading font-extrabold text-2xl shadow-md ring-4 ring-teal-50">
                  {initials}
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Active in Supabase">
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <h2 className="font-heading font-bold text-lg text-[#12232b] leading-tight">
                  {profile?.full_name || "Staff Member"}
                </h2>
                <p className="text-xs text-[#0c758d] font-semibold mt-0.5">
                  {profile?.job_title || "Thermodynamic Specialist"}
                </p>
                <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                  {profile?.department || "Engineering & Audits"}
                </p>
              </div>

              <div className="w-full pt-3 border-t border-slate-100 flex flex-col gap-2 text-left">
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-slate-500 flex items-center gap-1.5 font-mono">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Email:</span>
                  </span>
                  <span className="font-mono text-slate-800 font-medium truncate max-w-[180px]" title={profile?.email}>
                    {profile?.email}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-slate-500 flex items-center gap-1.5 font-mono">
                    <IdCard className="w-3.5 h-3.5 text-slate-400" />
                    <span>Staff ID:</span>
                  </span>
                  <span className="font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                    {profile?.employee_id || "EX-EMP-001"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-slate-500 flex items-center gap-1.5 font-mono">
                    <Shield className="w-3.5 h-3.5 text-slate-400" />
                    <span>Role Access:</span>
                  </span>
                  <span className="font-mono font-bold text-[#0c758d] uppercase text-[11px]">
                    {profile?.role || "Employee"}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-slate-500 flex items-center gap-1.5 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Member Since:</span>
                  </span>
                  <span className="font-mono text-slate-600 text-[11px]">
                    {formattedDate(profile?.created_at)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-slate-500 flex items-center gap-1.5 font-mono">
                    <Database className="w-3.5 h-3.5 text-slate-400" />
                    <span>DB Sync:</span>
                  </span>
                  <span className="text-[11px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Verified Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Security Status Box */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0c758d]" />
              <h3 className="font-heading font-bold text-xs text-[#12232b] uppercase tracking-wider">
                Security & Authentication
              </h3>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
              Credentials are encrypted using PBKDF2 Web Crypto with 100,000 SHA-256 iterations and synced with Supabase PostgreSQL.
            </p>
            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500">Password Status:</span>
              <span className="text-[11px] font-mono font-bold text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded">
                Secured
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Profile Details Form */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="font-heading font-bold text-base text-[#12232b]">
                Edit Profile Information
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Update your contact details, designation, and professional background. Changes are immediately persisted in Supabase.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Full Name & Read-Only Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold text-slate-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Staff Engineer"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#12232b] bg-white focus:outline-hidden focus:border-[#0c758d] focus:ring-1 focus:ring-[#0c758d]/20 transition-all font-sans"
                      required
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono">
                    Shown across audit task boards and system directives.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold text-slate-700">
                    Company Email (Database Account)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={profile?.email || ""}
                      readOnly
                      disabled
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-500 bg-slate-50 font-mono cursor-not-allowed"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono">
                    Managed by system administrator in Supabase Auth.
                  </p>
                </div>
              </div>

              {/* Row 2: Job Title & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold text-slate-700">
                    Job Title / Engineering Designation
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g. Senior Thermodynamicist & Pinch Specialist"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#12232b] bg-white focus:outline-hidden focus:border-[#0c758d] focus:ring-1 focus:ring-[#0c758d]/20 transition-all font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold text-slate-700">
                    Department / Division
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g. Exergy Engineering & Audits"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#12232b] bg-white focus:outline-hidden focus:border-[#0c758d] focus:ring-1 focus:ring-[#0c758d]/20 transition-all font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Phone & Office Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold text-slate-700">
                    Direct Contact Phone / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +971 4 380 5000"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#12232b] bg-white focus:outline-hidden focus:border-[#0c758d] focus:ring-1 focus:ring-[#0c758d]/20 transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold text-slate-700">
                    Operating Hub / Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Dubai Industrial Park, UAE"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#12232b] bg-white focus:outline-hidden focus:border-[#0c758d] focus:ring-1 focus:ring-[#0c758d]/20 transition-all font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: Professional Qualifications & Bio */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold text-slate-700">
                  Engineering Qualifications & Specialization Bio
                </label>
                <textarea
                  rows={4}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Summarize your engineering background, thermodynamic competencies, and audit scopes..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#12232b] bg-white focus:outline-hidden focus:border-[#0c758d] focus:ring-1 focus:ring-[#0c758d]/20 transition-all font-sans leading-relaxed"
                />
                <p className="text-[10px] text-slate-400 font-mono">
                  Referenced during internal assignment of thermodynamic pinch audits and facility walkthroughs.
                </p>
              </div>

              {/* Row 5: Emergency Escalation Contact */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold text-slate-700">
                  Emergency Escalation Line
                </label>
                <div className="relative">
                  <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    placeholder="e.g. +971 50 882 1944"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#12232b] bg-white focus:outline-hidden focus:border-[#0c758d] focus:ring-1 focus:ring-[#0c758d]/20 transition-all font-mono"
                  />
                </div>
                <p className="text-[10px] text-slate-400 font-mono">
                  Used exclusively for critical plant boiler shutdowns or urgent on-site audit directives.
                </p>
              </div>

              {/* Form Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-teal-600" />
                  <span>All updates immediately committed to Supabase</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={saving}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0c758d] hover:bg-[#095f73] text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving to DB...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Profile</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
