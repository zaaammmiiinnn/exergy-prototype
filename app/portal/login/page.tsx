"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Mail,
  User,
  Building,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Compass,
  Sparkles,
} from "lucide-react";
import {
  customerLoginAction,
  customerRegisterAction,
} from "@/app/actions/customer-auth";

function CustomerLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/portal";

  const [activeTab, setActiveTab] = useState<"signin" | "register">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [sector, setSector] = useState("Select");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your work or corporate email address.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await customerLoginAction(email, password);
      if (res.success) {
        router.push(redirectUrl);
        router.refresh();
      } else {
        setError(res.error || "Sign in failed. Please verify your email.");
      }
    } catch {
      setError("Sign in encountered an issue. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !company) {
      setError("Please fill in all required fields (Name, Company, Email).");
      return;
    }
    if (!sector || sector === "Select") {
      setError("Please select your industrial sector.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await customerRegisterAction({
        name,
        company,
        email,
        phone,
        sector,
        password,
      });
      if (res.success) {
        router.push(redirectUrl);
        router.refresh();
      } else {
        setError(res.error || "Account creation failed.");
      }
    } catch {
      setError("Registration encountered an issue. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0c758d]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#30a66a]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10 space-y-4">
        {/* Brand Logo */}
        <Link href="/" className="inline-flex items-center gap-3 group focus:outline-none">
          <div className="relative h-10 w-[54px] shrink-0">
            <Image
              src="https://horizons-cdn.hostinger.com/7ad3b21d-4954-4ffa-80db-3f8b05d3a164/19a079c855d5710fe1ed0f1611a8efd2.png"
              alt="Exergy Solutions logo"
              fill
              priority
              className="object-contain object-left"
              sizes="60px"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-heading text-lg font-bold tracking-tight text-slate-900 leading-none">
              Exergy Solutions<span className="text-[#0c758d]">.</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500 leading-tight mt-1">
              CLIENT PORTAL • DUBAI UAE
            </span>
          </div>
        </Link>

        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Client Account Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
            Check intake receipt, track request status, and communicate directly with your assigned Dubai engineering team.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl border border-slate-200/90 rounded-3xl space-y-6">
          {/* Tab Switcher */}
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              type="button"
              onClick={() => {
                setActiveTab("signin");
                setError(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "signin"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("register");
                setError(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === "register"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              New Client / Register
            </button>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {activeTab === "signin" ? (
            /* Sign In Form */
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Work / Corporate Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0c758d] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700">
                    Access Key / Password
                  </label>
                  <span className="text-[10px] text-slate-400 font-sans">
                    Optional for existing assessment holders
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0c758d] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0c758d] hover:bg-[#095f73] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Enter Client Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Registration Form */
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tariq Mansoor"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0c758d] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Company / Plant Name *
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Gulf Paper Mills"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0c758d] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Work Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tariq@gulfpaper.ae"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0c758d] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Phone / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971 50 123 4567"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0c758d] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Industrial Sector *
                </label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0c758d] focus:bg-white"
                >
                  <option value="Select">Select</option>
                  <option value="Processing">Continuous Processing (Food & Chemical)</option>
                  <option value="Paper">Paper & Pulp Mills</option>
                  <option value="Cooling">Regional Cooling & HVAC</option>
                  <option value="Petroleum">Petroleum Refining</option>
                  <option value="Commercial">Commercial & Industrial Facilities</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0c758d] hover:bg-[#095f73] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account &amp; Access Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Guarantee Footer */}
          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-500 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted Session • Exergy Solutions Dubai</span>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-xs text-slate-500 hover:text-[#0c758d] font-mono transition-colors"
          >
            ← Return to Exergy Solutions Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CustomerLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">Loading portal...</div>}>
      <CustomerLoginContent />
    </Suspense>
  );
}
