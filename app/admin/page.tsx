"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Users,
  MessageSquare,
  Flame,
  Clock,
  TrendingUp,
  Download,
  ArrowUpRight,
  Search,
  ChevronRight,
  LogOut,
  X,
  Mail,
  Building,
  Phone,
  Calendar,
  Zap,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Database,
  Trash2,
  Inbox,
  Lock,
} from "lucide-react";
import {
  fetchAdminLeads,
  updateLeadStatusAction,
  deleteLeadAction,
  type AdminLeadItem,
} from "@/app/actions/admin-leads";
import { useRouter } from "next/navigation";
import { adminSignOutAction } from "@/app/actions/admin-auth";
import { AssignedTasksSection } from "@/components/admin/assigned-tasks-section";

interface MockLead {
  id: string;
  name: string;
  email: string;
  company: string;
  sector: string;
  score: number;
  priority: "hot" | "warm" | "cold";
  status: "new" | "contacted" | "qualified" | "proposal" | "won";
  createdAt: string;
  rawCreatedAt?: string;
  phone?: string;
  services?: string[];
  timeline?: string;
  notes?: string;
}

const MOCK_LEADS: MockLead[] = [
  {
    id: "EX-2026-1055",
    name: "Neural Waves Engineering",
    email: "neuralwaves.official@gmail.com",
    company: "Neural Waves Industrial AI",
    sector: "processing",
    score: 95,
    priority: "hot",
    status: "new",
    createdAt: "Just now",
    rawCreatedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    phone: "+971 50 123 4567",
    services: ["Cooling Optimization", "Waste Heat Recovery", "Pinch Analysis"],
    timeline: "immediate",
    notes: "Thermal fluid integration assessment for 4.2 MW continuous batch reactor line. Looking for turnkey performance guarantee.",
  },
  {
    id: "EX-2026-1054",
    name: "Exergy Operations Support",
    email: "info@exergy-solutions.com",
    company: "Exergy Solutions Operations",
    sector: "cooling",
    score: 82,
    priority: "hot",
    status: "contacted",
    createdAt: "8 mins ago",
    rawCreatedAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    phone: "+91 98765 43210",
    services: ["Cooling Systems", "Water & Effluent Reduction"],
    timeline: "q1_2027",
    notes: "Multi-chiller plant retrofitting with thermodynamic exergy baselining across GCC regional data center cooling towers.",
  },
  {
    id: "EX-2026-1042",
    name: "Tariq Mansoor",
    email: "t.mansoor@gulfpaper.ae",
    company: "Gulf Paper Mills FZCO",
    sector: "paper",
    score: 85,
    priority: "hot",
    status: "new",
    createdAt: "10 mins ago",
    rawCreatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    phone: "+971 52 987 6543",
    services: ["Drying Optimization", "Steam & Condensate"],
    timeline: "immediate",
    notes: "Dryer hood exhaust steam recovery to preheat boiler feedwater and reduce natural gas consumption.",
  },
  {
    id: "EX-2026-1039",
    name: "Dr. Hamad Al-Nuaimi",
    email: "h.alnuaimi@petrogulf.com",
    company: "PetroGulf Refining",
    sector: "petroleum",
    score: 75,
    priority: "hot",
    status: "contacted",
    createdAt: "2 hours ago",
    rawCreatedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    phone: "+971 50 888 1234",
    services: ["Waste Heat Recovery", "Process Integration"],
    timeline: "q2_2027",
    notes: "Crude distillation preheat train pinch analysis. Target 15% reduction in furnace duty.",
  },
  {
    id: "EX-2026-1035",
    name: "Siddharth Nair",
    email: "siddharth@dubaiholdings.ae",
    company: "District Cooling Towers LLC",
    sector: "buildings",
    score: 55,
    priority: "warm",
    status: "qualified",
    createdAt: "Yesterday",
    rawCreatedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    phone: "+971 55 432 1098",
    services: ["Cooling Systems", "Water Optimization"],
    timeline: "exploring",
    notes: "Evaluation of blowdown water recycling and delta-T syndrome mitigation.",
  },
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [leads, setLeads] = useState<MockLead[]>([]);
  const [selectedLead, setSelectedLead] = useState<MockLead | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);
  const [statusSaveFeedback, setStatusSaveFeedback] = useState<string | null>(null);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [currentSession, setCurrentSession] = useState<{ role: string; email: string } | null>(null);

  useEffect(() => {
    try {
      const match = document.cookie.match(/exergy_admin_session=([^;]+)/);
      if (match) {
        setCurrentSession(JSON.parse(decodeURIComponent(match[1])));
        return;
      }
      const stored = localStorage.getItem("exergy_admin_session");
      if (stored) {
        setCurrentSession(JSON.parse(stored));
      }
    } catch {}

    // Scroll to #assigned-tasks if hash is present
    if (typeof window !== "undefined" && window.location.hash === "#assigned-tasks") {
      setTimeout(() => {
        document.getElementById("assigned-tasks")?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, []);

  const handleSelectLeadFromTask = (leadId: string) => {
    const found = leads.find((l) => l.id === leadId);
    if (found) {
      setSelectedLead(found);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await adminSignOutAction();
    } catch {}
    try {
      localStorage.removeItem("exergy_admin_session");
      document.cookie = "exergy_admin_session=; path=/; max-age=0";
    } catch {}
    router.replace("/admin/login");
    router.refresh();
  };

  const getCachedStatuses = (): Record<string, MockLead["status"]> => {
    try {
      const stored = localStorage.getItem("exergy_admin_status_cache");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  const setCachedStatus = (id: string, status: MockLead["status"]) => {
    try {
      const cached = getCachedStatuses();
      cached[id] = status;
      localStorage.setItem("exergy_admin_status_cache", JSON.stringify(cached));
    } catch {
      // storage blocked fallback
    }
  };

  const getDeletedLeadIds = (): Set<string> => {
    try {
      const stored = localStorage.getItem("exergy_admin_deleted_leads");
      return new Set(stored ? JSON.parse(stored) : []);
    } catch {
      return new Set();
    }
  };

  const addDeletedLeadId = (id: string) => {
    try {
      const set = getDeletedLeadIds();
      set.add(id);
      localStorage.setItem("exergy_admin_deleted_leads", JSON.stringify(Array.from(set)));
    } catch {
      // storage blocked fallback
    }
  };

  const formatReceivedTime = (lead: MockLead): string => {
    if (lead.rawCreatedAt) {
      const date = new Date(lead.rawCreatedAt);
      if (!isNaN(date.getTime())) {
        const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);
        if (diffSec < 60) return "Just now";
        if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
        if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
        if (diffSec < 86400 * 2) return "Yesterday";
        if (diffSec < 86400 * 7) return `${Math.floor(diffSec / 86400)}d ago`;
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    }
    return lead.createdAt || "Recent";
  };

  const loadLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const cachedStatuses = getCachedStatuses();
      const deletedIds = getDeletedLeadIds();
      const res = await fetchAdminLeads();
      if (res.isConnected) {
        setIsSupabaseConnected(true);
        // Supabase PostgreSQL is the single source of truth.
        // We do NOT resurrect deleted mock leads.
        const activeLeads = res.leads
          .filter((item) => !deletedIds.has(item.id))
          .map((item) => {
            if (cachedStatuses[item.id]) {
              return { ...item, status: cachedStatuses[item.id] };
            }
            return item;
          });
        setLeads(activeLeads);
      } else {
        setIsSupabaseConnected(false);
        setLeads([]);
      }
    } catch (err) {
      console.warn("Failed to load admin leads:", err);
      setIsSupabaseConnected(false);
      setLeads([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [leadToDelete, setLeadToDelete] = useState<{ id: string; name: string } | null>(null);

  const requestDeleteLead = (id: string, name: string) => {
    setLeadToDelete({ id, name });
  };

  const confirmDeleteLead = async () => {
    if (!leadToDelete) return;
    const { id } = leadToDelete;

    setIsDeletingId(id);

    // Optimistically remove from state
    setLeads((prev) => prev.filter((l) => l.id !== id));
    if (selectedLead?.id === id) {
      setSelectedLead(null);
    }
    setLeadToDelete(null);

    // Persist to local deletion cache
    addDeletedLeadId(id);

    // Sync deletion with Supabase PostgreSQL
    try {
      const res = await deleteLeadAction(id);
      if (!res.success) {
        console.warn("Supabase lead deletion warning:", res.error);
      }
    } catch (err) {
      console.warn("Failed to delete lead from Supabase:", err);
    } finally {
      setIsDeletingId(null);
    }
  };

  const updateLeadStatus = async (id: string, newStatus: MockLead["status"]) => {
    setIsUpdatingStatus(newStatus);
    setStatusSaveFeedback(null);

    // Optimistic UI state update
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }

    // Persist to local cache immediately
    setCachedStatus(id, newStatus);

    // Persist to live Supabase Postgres
    try {
      const target = leads.find((l) => l.id === id) || selectedLead;
      const res = await updateLeadStatusAction(
        id,
        newStatus,
        target
          ? {
              name: target.name,
              email: target.email,
              company: target.company,
              sector: target.sector,
              score: target.score,
              priority: target.priority,
              phone: target.phone,
              services: target.services,
              timeline: target.timeline,
              notes: target.notes,
            }
          : undefined
      );

      if (res.success) {
        setStatusSaveFeedback("Saved");
        setTimeout(() => setStatusSaveFeedback(null), 3000);
      } else {
        console.warn("Supabase sync warning:", res.error);
      }
    } catch (err) {
      console.warn("Failed to sync status update to Supabase:", err);
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(190,30%,98%)] text-[#12232b] flex flex-col font-sans">
      {/* Sovereign Admin Top Header */}
      <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md px-6 py-4 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-extrabold text-xl text-[#12232b] tracking-tight">
                  Operations Dashboard
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-teal-50 text-[#0c758d] border border-teal-200/70 text-[10px] font-mono font-bold uppercase tracking-wider">
                  Live Feed
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono">
                Thermodynamic assessment pipeline & lead intelligence
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Supabase Sync Status Indicator & Refresh */}
            <button
              onClick={() => loadLeads()}
              disabled={isLoading}
              title="Click to refresh leads from Supabase"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-teal-200/80 bg-teal-50/70 hover:bg-teal-100/70 text-[#0c758d] font-mono text-[11px] font-semibold transition-all shadow-2xs cursor-pointer disabled:opacity-50"
            >
              <Database className="w-3.5 h-3.5 text-teal-600" />
              <span>{isSupabaseConnected ? "Supabase Live" : "Supabase Sync"}</span>
              <RefreshCw className={`w-3 h-3 text-teal-600 ml-0.5 ${isLoading ? "animate-spin" : ""}`} />
            </button>

            {/* Active Verified Admin Session */}
            <div className="flex items-center gap-2 bg-slate-50/80 border border-slate-200/80 px-3.5 py-1.5 rounded-full shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-slate-800 font-mono font-medium text-[11px]">
                Active Administrator
              </span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#2C7FB8]/15 text-[#2C7FB8] text-[9px] font-mono font-bold uppercase">
                Database Verified
              </span>
            </div>

            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-red-200/80 bg-red-50/70 hover:bg-red-100 text-red-700 font-medium text-xs transition-all shadow-2xs hover:shadow-xs cursor-pointer disabled:opacity-50"
            >
              <LogOut className={`w-3.5 h-3.5 text-red-600 ${isSigningOut ? "animate-spin" : ""}`} />
              <span>{isSigningOut ? "Signing Out..." : "Sign Out"}</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-medium text-xs transition-all shadow-2xs hover:shadow-xs"
            >
              <span>Exit to Public Site</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full space-y-8 flex-1">
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-400">
                Total Leads (Database)
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-heading font-extrabold text-[#12232b] tracking-tight">
              {isLoading ? "..." : leads.length}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
              <TrendingUp className="w-3 h-3" />
              <span>{leads.length > 0 ? "Synced with Supabase PostgreSQL" : "0 active leads recorded"}</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-400">
                Hot Priority Leads
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-heading font-extrabold text-amber-600 tracking-tight">
              {isLoading ? "..." : leads.filter((l) => l.priority === "hot").length}
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              {leads.filter((l) => l.priority === "hot").length > 0
                ? "Immediate timeline (Action required)"
                : "None currently flagged hot"}
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-400">
                Open Chat Inquiries
              </span>
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0c758d] flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-heading font-extrabold text-[#0c758d] tracking-tight">
              0
            </div>
            <p className="mt-2 text-[11px] text-teal-700 font-mono">
              Deterministic Q&A engine active
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-400">
                Database Status
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Database className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-heading font-extrabold text-[#12232b] tracking-tight">
              {isSupabaseConnected ? "Connected" : "Standby"}
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              PostgreSQL project twwdvliikafbtvzsotks
            </p>
          </div>
        </div>

        {/* Assigned Engineering Tasks Section */}
        <AssignedTasksSection
          currentUserRole={currentSession?.role || "employee"}
          currentUserEmail={currentSession?.email || "employee@exergy.com"}
          onSelectLeadId={handleSelectLeadFromTask}
        />

        {/* Pipeline Table */}
        <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h3 className="font-heading font-bold text-lg text-[#12232b]">
                Active Assessment Submissions
              </h3>
              <span className="px-3 py-0.5 rounded-full bg-teal-50 text-[#0c758d] border border-teal-200/70 text-xs font-mono font-semibold">
                {filteredLeads.length} Leads
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter name, email, company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-50/80 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0c758d]/20 focus:bg-white transition-all shadow-2xs w-64"
                />
              </div>

              <button
                onClick={() =>
                  alert(
                    "CSV Export dispatched for administrative record: sarfraz@exergy-solutions.com & info@exergy-solutions.com"
                  )
                }
                className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-mono uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3.5 px-6">Lead ID</th>
                  <th className="py-3.5 px-6">Contact</th>
                  <th className="py-3.5 px-6">Company & Sector</th>
                  <th className="py-3.5 px-6">Priority & Score</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Received</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <RefreshCw className="w-5 h-5 text-teal-600 animate-spin" />
                        <span className="text-xs font-mono text-slate-500">
                          Connecting to Supabase PostgreSQL & synchronizing leads...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-16 text-center">
                      <div className="max-w-md mx-auto flex flex-col items-center justify-center text-center px-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-400 mb-3 shadow-2xs">
                          <Inbox className="w-6 h-6 text-slate-400" />
                        </div>
                        <h4 className="font-heading font-bold text-slate-800 text-sm">
                          {searchTerm ? "No matching leads found" : "No assessment submissions in database"}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-sm">
                          {searchTerm
                            ? `No records match "${searchTerm}". Check the spelling or reset filters.`
                            : "All facility audit requests and contact assessments submitted by visitors will stream here in real time."}
                        </p>
                        {searchTerm ? (
                          <button
                            onClick={() => setSearchTerm("")}
                            className="mt-4 px-3.5 py-1.5 rounded-full text-xs font-medium text-teal-700 bg-teal-50 border border-teal-200 hover:bg-teal-100 transition-colors"
                          >
                            Clear Search Filter
                          </button>
                        ) : (
                          <Link
                            href="/assessment"
                            target="_blank"
                            className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#0c758d] hover:bg-[#0a6074] shadow-xs transition-colors"
                          >
                            <span>Open Assessment Tool</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        lead.email.includes("neuralwaves") ? "bg-teal-50/30" : ""
                      }`}
                    >
                      <td className="py-4 px-6 font-mono font-semibold text-[#0c758d]">
                        {lead.id}
                        {lead.email.includes("neuralwaves") && (
                          <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] bg-teal-100 text-teal-800 border border-teal-300 font-bold uppercase">
                            Verified
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-[#12232b]">{lead.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{lead.email}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-slate-900 font-medium">{lead.company}</div>
                        <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                          {lead.sector}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold uppercase font-mono ${
                            lead.priority === "hot"
                              ? "bg-red-50 text-red-600 border border-red-200/80"
                              : "bg-amber-50 text-amber-600 border border-amber-200/80"
                          }`}
                        >
                          {lead.priority} ({lead.score}/100)
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`capitalize px-3 py-1 rounded-full text-[11px] font-mono font-medium ${
                            lead.status === "new"
                              ? "bg-blue-50 text-blue-700 border border-blue-200/80"
                              : lead.status === "contacted"
                              ? "bg-purple-50 text-purple-700 border border-purple-200/80"
                              : "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td
                        className="py-4 px-6 text-slate-500 font-mono text-[11px]"
                        title={lead.rawCreatedAt ? new Date(lead.rawCreatedAt).toLocaleString() : lead.createdAt}
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="font-semibold text-slate-800">{formatReceivedTime(lead)}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 mt-0.5">
                            {lead.createdAt}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-teal-50 text-[#0c758d] border border-teal-200/80 hover:bg-[#0c758d] hover:text-white transition-all shadow-2xs cursor-pointer"
                          >
                            <span>Review</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                          {currentSession?.role !== "employee" && (
                            <button
                              onClick={() => requestDeleteLead(lead.id, lead.name)}
                              disabled={isDeletingId === lead.id}
                              title="Permanently delete this lead"
                              className="p-1.5 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all cursor-pointer disabled:opacity-40"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Selected Lead Modal Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-[#061821]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-7 space-y-6 shadow-2xl relative text-slate-900">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start justify-between border-b border-slate-100 pb-5">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono text-[#0c758d] uppercase font-bold tracking-wider">
                    Facility Assessment File — {selectedLead.id}
                  </span>
                  <a
                    href={`/track?ref=${encodeURIComponent(selectedLead.id)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 transition-colors cursor-pointer"
                    title="View live customer-facing status tracking page for this request"
                  >
                    <span>View Customer Tracking Page</span>
                    <ArrowUpRight className="w-3 h-3 text-teal-600" />
                  </a>
                </div>
                <h3 className="font-heading font-bold text-2xl text-[#12232b] mt-1">
                  {selectedLead.company}
                </h3>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase font-mono ${
                  selectedLead.priority === "hot"
                    ? "bg-red-50 text-red-600 border border-red-200"
                    : "bg-amber-50 text-amber-600 border border-amber-200"
                }`}
              >
                Score: {selectedLead.score}/100 ({selectedLead.priority})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-slate-400 uppercase font-mono text-[10px] font-semibold tracking-wider block">
                  Primary Contact
                </span>
                <div className="font-semibold text-[#12232b] text-sm">{selectedLead.name}</div>
                <div className="text-[#0c758d] font-mono font-medium">{selectedLead.email}</div>
                {selectedLead.phone && (
                  <div className="text-slate-500">{selectedLead.phone}</div>
                )}
              </div>

              <div className="space-y-1.5 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                <span className="text-slate-400 uppercase font-mono text-[10px] font-semibold tracking-wider block">
                  Operational Scope
                </span>
                <div className="text-slate-900 capitalize font-medium text-sm">
                  Sector: {selectedLead.sector}
                </div>
                <div className="text-slate-600">
                  Timeline: {selectedLead.timeline || "Immediate (Q4 2026)"}
                </div>
                <div className="text-slate-500 font-mono text-[11px] flex items-center gap-1.5 mt-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>Received: {formatReceivedTime(selectedLead)} ({selectedLead.createdAt})</span>
                </div>
              </div>
            </div>

            {selectedLead.services && (
              <div className="space-y-2">
                <span className="text-xs uppercase font-mono text-slate-400 font-semibold tracking-wider block">
                  Requested Services & Thermodynamic Streams
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedLead.services.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-teal-50 text-[#0c758d] border border-teal-200/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedLead.notes && (
              <div className="space-y-2">
                <span className="text-xs uppercase font-mono text-slate-400 font-semibold tracking-wider block">
                  Engineering Notes & Challenge Description
                </span>
                <p className="text-xs text-slate-700 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 leading-relaxed">
                  {selectedLead.notes}
                </p>
              </div>
            )}

            {/* Status Transition Actions & Delete Option */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-400 font-medium">Status:</span>
                <span className="text-xs font-bold font-mono uppercase text-[#0c758d]">
                  {selectedLead.status}
                </span>

                {isUpdatingStatus && (
                  <span className="text-[10px] text-amber-700 font-mono font-semibold flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 animate-pulse">
                    <RefreshCw className="w-2.5 h-2.5 animate-spin" /> Saving to Supabase...
                  </span>
                )}

                {statusSaveFeedback && !isUpdatingStatus && (
                  <span className="text-[10px] text-emerald-700 font-mono font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Saved &amp; Synced with Customer Portal
                  </span>
                )}
              </div>

              {currentSession?.role === "employee" ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/90 text-xs font-mono text-slate-600">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Lead Stage managed by Head of Engineering (Read-only for Staff)</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  {(["new", "contacted", "qualified", "proposal", "won"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => updateLeadStatus(selectedLead.id, st)}
                      disabled={isUpdatingStatus !== null}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-mono capitalize transition-all cursor-pointer disabled:opacity-50 ${
                        selectedLead.status === st
                          ? "bg-[#0c758d] text-white font-bold shadow-xs ring-2 ring-[#0c758d]/30"
                          : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}

                  <button
                    onClick={() => requestDeleteLead(selectedLead.id, selectedLead.name)}
                    disabled={isDeletingId === selectedLead.id}
                    title="Permanently delete this lead from Supabase"
                    className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-semibold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 border border-red-200 hover:border-red-600 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* In-App Delete Confirmation Modal */}
      {leadToDelete && (
        <div className="fixed inset-0 z-50 bg-[#061821]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative text-slate-900 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setLeadToDelete(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-200/60">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-slate-900">
                  Delete Lead Record?
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  {leadToDelete.id} — {leadToDelete.name}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              Are you sure you want to permanently delete this lead? This will remove the record from both the operations dashboard and the Supabase PostgreSQL database.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => setLeadToDelete(null)}
                disabled={isDeletingId !== null}
                className="px-4 py-2 rounded-full text-xs font-medium text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteLead}
                disabled={isDeletingId !== null}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-red-600 hover:bg-red-700 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                {isDeletingId ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Permanently</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

