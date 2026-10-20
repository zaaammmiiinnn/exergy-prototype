"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Lock, Mail, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2, ShieldCheck, KeyRound } from "lucide-react";
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
        // Persist to localStorage for immediate client-side checks
        try {
          localStorage.setItem("exergy_admin_session", JSON.stringify(res.session));
        } catch {}

        setTimeout(() => {
          router.replace("/admin");
          router.refresh();
        }, 300);
      } else {
        setError(res.error || "Authentication failed. Please verify your credentials.");
      }
    } catch {
      setError("An unexpected network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Background ambient lighting matching main site */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0c758d]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#30a66a]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Login Container */}
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-[#0c758d] border border-teal-200/80 font-mono text-[10px] uppercase font-bold tracking-widest shadow-2xs">
              <KeyRound className="w-3 h-3 text-[#0c758d]" />
              <span>Administrative Console</span>
            </span>
          </div>

          <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
            Role-Based Management Console. Sign in with your administrator, founder, or staff credentials to access operations.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-9 shadow-xl shadow-slate-200/60 relative overflow-hidden space-y-5">
          {/* Top Accent Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0c758d] via-[#30a66a] to-[#0c758d]" />

          {error && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
              <span className="leading-relaxed">{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Authentication approved. Launching admin console...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-700 mb-1.5 font-bold">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="employee@exergy.com or admin@exergy.solutions"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl pl-10 pr-4 py-3 text-xs placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0c758d]/20 focus:border-[#0c758d] transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-700 mb-1.5 font-bold">
                Secure Key / Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password or paste database key"
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl pl-10 pr-4 py-3 text-xs placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0c758d]/20 focus:border-[#0c758d] transition-all font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-full font-heading font-bold text-xs uppercase tracking-wider text-white bg-[#0c758d] hover:bg-[#095f73] shadow-md shadow-[#0c758d]/20 transition-all cursor-pointer active:scale-[0.99] disabled:opacity-50"
            >
              <span>{isLoading ? "Authenticating Session..." : "Sign In to Admin Console"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Security Assurance */}
          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted Session • Exergy Solutions Dubai</span>
          </div>
        </div>

        {/* Back to Public Site */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0c758d] font-mono transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
