"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";
import { changeAdminPasswordAction } from "@/app/actions/admin-auth";

export default function AdminChangePasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError("Your new password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please verify and re-type.");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Try Server Action first
      let res: { success: boolean; error?: string } | null = null;
      try {
        res = await changeAdminPasswordAction(newPassword);
      } catch (actionErr) {
        console.warn("[CHANGE PASSWORD ACTION FAILED, TRYING API FALLBACK]", actionErr);
      }

      // 2. Fallback to API route if needed
      if (!res || !res.success) {
        if (!res) {
          const apiRes = await fetch("/api/admin/change-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newPassword }),
          });
          res = await apiRes.json();
        }
      }

      if (res && res.success) {
        setSuccess(true);
        // Clear mustChangePassword in localStorage session if present
        try {
          const stored = localStorage.getItem("exergy_admin_session");
          if (stored) {
            const parsed = JSON.parse(stored);
            parsed.mustChangePassword = false;
            localStorage.setItem("exergy_admin_session", JSON.stringify(parsed));
          }
        } catch {}

        setTimeout(() => {
          window.location.href = "/admin";
        }, 500);
      } else {
        setError(res?.error || "Failed to update password. Please try again.");
      }
    } catch {
      setError("An unexpected network error occurred while updating your password.");
    } finally {
      setIsLoading(false);
    }
  };

  const isMinLength = newPassword.length >= 8;
  const isMatch = newPassword.length > 0 && newPassword === confirmPassword;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Background ambient lighting matching main site */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0c758d]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#30a66a]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Container */}
      <div className="max-w-md w-full relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-3 group focus:outline-none justify-center">
            <div className="relative h-11 w-[60px] shrink-0">
              <Image
                src="https://horizons-cdn.hostinger.com/7ad3b21d-4954-4ffa-80db-3f8b05d3a164/19a079c855d5710fe1ed0f1611a8efd2.png"
                alt="Exergy Solutions logo"
                fill
                priority
                className="object-contain"
                sizes="60px"
              />
            </div>
            <div className="flex flex-col text-left justify-center">
              <div className="flex items-center gap-1 leading-none">
                <span className="font-heading text-xl font-bold tracking-tight text-slate-900">
                  Exergy Solutions<span className="text-[#0c758d]">.</span>
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500 leading-tight mt-1">
                ENERGY & WATER ENGINEERING
              </span>
            </div>
          </Link>

          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-mono text-[10px] uppercase font-bold tracking-widest shadow-2xs">
              <KeyRound className="w-3 h-3 text-amber-600" />
              <span>Password Setup Required</span>
            </span>
          </div>

          <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
            You signed in using a temporary password. Create your own private, permanent password to finalize account activation.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-9 shadow-xl shadow-slate-200/60 relative overflow-hidden space-y-5">
          {/* Top Accent Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-[#0c758d] to-[#30a66a]" />

          {/* Temporary Password Notice Banner */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-amber-900 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-amber-950">Temporary Password In Use</h4>
              <p className="text-amber-800/90 leading-relaxed font-sans">
                Please set a secure permanent password below. Your database record will be updated immediately.
              </p>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Password successfully updated in database! Redirecting to dashboard...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-700 mb-1.5 font-bold">
                Create New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl pl-10 pr-10 py-3 text-xs placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0c758d]/20 focus:border-[#0c758d] transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-700 mb-1.5 font-bold">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type your new password"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl pl-10 pr-4 py-3 text-xs placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0c758d]/20 focus:border-[#0c758d] transition-all font-mono"
                />
              </div>
            </div>

            {/* Validation Feedback */}
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] font-mono">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isMinLength ? "bg-emerald-500" : "bg-slate-300"}`} />
                <span className={isMinLength ? "text-emerald-700 font-semibold" : "text-slate-500"}>
                  Minimum 8 characters
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isMatch ? "bg-emerald-500" : "bg-slate-300"}`} />
                <span className={isMatch ? "text-emerald-700 font-semibold" : "text-slate-500"}>
                  Passwords match
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || success || !isMinLength || !isMatch}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-full font-heading font-bold text-xs uppercase tracking-wider text-white bg-[#0c758d] hover:bg-[#095f73] shadow-md shadow-[#0c758d]/20 transition-all cursor-pointer active:scale-[0.99] disabled:opacity-50"
            >
              <span>{isLoading ? "Saving New Password..." : "Save Password & Enter Console"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Security Assurance */}
          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted WebCrypto PBKDF2 Hashing • Exergy Solutions</span>
          </div>
        </div>
      </div>
    </div>
  );
}
