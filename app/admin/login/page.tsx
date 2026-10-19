"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Lock, Mail, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { adminLoginAction } from "@/app/actions/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await adminLoginAction(email, password);
      if (res.success && res.session) {
        setSuccess(true);
        // Persist to localStorage for client-side persistence
        try {
          localStorage.setItem("exergy_admin_session", JSON.stringify(res.session));
        } catch {}

        setTimeout(() => {
          router.replace("/admin");
          router.refresh();
        }, 300);
      } else {
        setError(res.error || "Authentication failed.");
      }
    } catch {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06101E] text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#2C7FB8]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[300px] bg-[#0E4A4F]/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Login Card */}
      <div className="max-w-md w-full relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2C7FB8] to-[#0E4A4F] p-2.5 shadow-lg shadow-[#2C7FB8]/20 ring-1 ring-white/20 mb-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Exergy Solutions"
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = "none";
              }}
            />
            <Shield className="w-7 h-7 text-white" />
          </div>

          <h1 className="text-2xl font-heading font-extrabold text-white tracking-tight">
            Exergy Solutions
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest text-[#2C7FB8] font-semibold">
            Administrative Console
          </p>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Authorized operations only. Authenticate to manage facility assessment leads and dispatch audits.
          </p>
        </div>

        {/* Main Form Box */}
        <div className="bg-[#0A1628]/90 border border-white/10 rounded-2xl p-7 shadow-2xl backdrop-blur-md space-y-5">
          {error && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Authentication approved. Redirecting to console...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-semibold">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@exergy.solutions"
                  className="w-full bg-[#050C17] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2C7FB8] focus:border-transparent transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-300 mb-1.5 font-semibold">
                Secure Key / Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#050C17] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2C7FB8] focus:border-transparent transition-all font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-heading font-semibold text-xs text-white bg-gradient-to-r from-[#2C7FB8] to-[#0E4A4F] hover:from-[#358dcc] hover:to-[#125c62] shadow-md shadow-[#2C7FB8]/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? "Authenticating Session..." : "Sign In to Admin Console"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Back to Public Site */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
