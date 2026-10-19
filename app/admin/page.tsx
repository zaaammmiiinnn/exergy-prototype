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
} from "lucide-react";
import {
  fetchAdminLeads,
  updateLeadStatusAction,
  type AdminLeadItem,
} from "@/app/actions/admin-leads";

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
    phone: "+971 50 123 4567",
    services: ["Cooling Optimization", "Waste Heat Recovery", "Pinch Analysis"],
    timeline: "immediate",
    notes: "Thermal fluid integration assessment for 4.2 MW continuous batch reactor line. Looking for turnkey performance guarantee.",
  },
  {
    id: "EX-2026-1054",
    name: "Neural Waves Support & Ops",
    email: "support@neuralwaves.in",
    company: "Neural Waves Facilities Operations",
    sector: "cooling",
    score: 82,
    priority: "hot",
    status: "contacted",
    createdAt: "8 mins ago",
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
    phone: "+971 55 432 1098",
    services: ["Cooling Systems", "Water Optimization"],
    timeline: "exploring",
    notes: "Evaluation of blowdown water recycling and delta-T syndrome mitigation.",
  },
];

export default function AdminDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [leads, setLeads] = useState<MockLead[]>(MOCK_LEADS);
  const [selectedLead, setSelectedLead] = useState<MockLead | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  const loadLeads = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchAdminLeads();
      if (res.success && res.leads.length > 0) {
        setIsSupabaseConnected(true);
        // Put live Supabase leads first, then distinct mock leads
        const existingIds = new Set(res.leads.map((l) => l.id));
        const nonDuplicateMocks = MOCK_LEADS.filter((m) => !existingIds.has(m.id));
        setLeads([...res.leads, ...nonDuplicateMocks]);
      } else {
        setIsSupabaseConnected(false);
      }
    } catch (err) {
      console.warn("Failed to load admin leads:", err);
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

  const updateLeadStatus = async (id: string, newStatus: MockLead["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
    try {
      await updateLeadStatusAction(id, newStatus);
    } catch (err) {
      console.warn("Failed to sync status update to Supabase:", err);
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

            {/* Active Verified Admin Users */}
            <div className="flex items-center gap-3 bg-slate-50/80 border border-slate-200/80 px-3.5 py-1.5 rounded-full shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-slate-800 font-mono font-medium text-[11px]">
                  neuralwaves.official@gmail.com
                </span>
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-100/70 text-emerald-800 text-[9px] font-mono font-bold uppercase">
                  Founder
                </span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                <span className="text-slate-600 font-mono text-[11px]">
                  support@neuralwaves.in
                </span>
                <span className="px-1.5 py-0.2 rounded-full bg-teal-100/70 text-teal-800 text-[9px] font-mono font-bold uppercase">
                  Support
                </span>
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-medium text-xs transition-all shadow-2xs hover:shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-500" />
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
                Total Leads (Month)
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-heading font-extrabold text-[#12232b] tracking-tight">
              44
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-emerald-600">
              <TrendingUp className="w-3 h-3" />
              <span>+22% vs last month</span>
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
              10
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              Urgent timeline (This quarter)
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
              6
            </div>
            <p className="mt-2 text-[11px] text-teal-700 font-mono">
              Deterministic Q&A engine active
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-400">
                Median First Contact
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-heading font-extrabold text-[#12232b] tracking-tight">
              2.8h
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              Alerts dispatched to team inbox
            </p>
          </div>
        </div>

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
                    "CSV Export dispatched for administrative record: neuralwaves.official@gmail.com & support@neuralwaves.in"
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
                {filteredLeads.map((lead) => (
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
                    <td className="py-4 px-6 text-slate-400 font-mono text-[11px]">
                      {lead.createdAt}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-teal-50 text-[#0c758d] border border-teal-200/80 hover:bg-[#0c758d] hover:text-white transition-all shadow-2xs"
                      >
                        <span>Review</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
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
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start justify-between border-b border-slate-100 pb-5">
              <div>
                <span className="text-xs font-mono text-[#0c758d] uppercase font-bold tracking-wider">
                  Facility Assessment File — {selectedLead.id}
                </span>
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
                <div className="text-slate-400 font-mono text-[11px]">
                  Recorded: {selectedLead.createdAt}
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

            {/* Status Transition Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Status:</span>
                <span className="text-xs font-bold font-mono uppercase text-[#0c758d]">
                  {selectedLead.status}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {(["new", "contacted", "qualified", "proposal", "won"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => updateLeadStatus(selectedLead.id, st)}
                    className={`px-3 py-1 rounded-full text-[11px] font-mono capitalize transition-all ${
                      selectedLead.status === st
                        ? "bg-[#0c758d] text-white font-bold shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

