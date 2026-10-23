"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Flame,
  ArrowUpRight,
  RefreshCw,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Building,
  Mail,
  Phone,
  Calendar,
  X,
  MessageSquare,
  Lock,
} from "lucide-react";
import {
  fetchAdminLeads,
  updateLeadStatusAction,
  type AdminLeadItem,
} from "@/app/actions/admin-leads";
import { adminSignOutAction } from "@/app/actions/admin-auth";

const INITIAL_FALLBACK_LEADS: AdminLeadItem[] = [
  {
    id: "EX-2026-1055",
    name: "Exergy Solutions Founder Desk",
    email: "sarfraz@exergy-solutions.com",
    company: "Exergy Solutions Engineering",
    sector: "Industrial Processing",
    score: 95,
    priority: "hot",
    status: "new",
    createdAt: "Just now",
    phone: "+971 50 123 4567",
    services: ["Cooling Optimization", "Waste Heat Recovery", "Pinch Analysis"],
    timeline: "immediate",
    notes: "Thermal fluid integration assessment for continuous batch reactor line. Looking for turnkey performance guarantee.",
  },
  {
    id: "EX-2026-1054",
    name: "Exergy Operations Support",
    email: "info@exergy-solutions.com",
    company: "Exergy Solutions Operations",
    sector: "Cooling & Power",
    score: 82,
    priority: "hot",
    status: "contacted",
    createdAt: "8 mins ago",
    phone: "+971 50 123 4567",
    services: ["Cooling Systems", "Water & Effluent Reduction"],
    timeline: "q1_2027",
    notes: "Multi-chiller plant retrofitting with thermodynamic exergy baselining across GCC regional data center cooling towers.",
  },
  {
    id: "EX-2026-1042",
    name: "Tariq Mansoor",
    email: "t.mansoor@gulfpaper.ae",
    company: "Gulf Paper Mills FZCO",
    sector: "Paper & Pulp",
    score: 85,
    priority: "hot",
    status: "new",
    createdAt: "10 mins ago",
    phone: "+971 50 882 1199",
    services: ["Drying Processes", "Waste-Heat Recovery", "Process Integration"],
    timeline: "immediate",
    notes: "Paper packaging mill corrugator line steam reduction and dryer hood exhaust recuperation.",
  },
  {
    id: "EX-2026-1039",
    name: "Dr. Hassan Al-Hashimi",
    email: "h.hashimi@emiratesfood.com",
    company: "Emirates Food & Beverage Logistics",
    sector: "Food & Beverage",
    score: 72,
    priority: "warm",
    status: "qualified",
    createdAt: "2 hours ago",
    phone: "+971 55 412 8830",
    services: ["Cooling Optimization", "Water Quality & Treatment"],
    timeline: "this_quarter",
    notes: "Ammonia refrigeration cascade loop and industrial CIP water recovery.",
  },
];

export default function AdminLeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<AdminLeadItem[]>(INITIAL_FALLBACK_LEADS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedLead, setSelectedLead] = useState<AdminLeadItem | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchAdminLeads();
      if (res.success && res.leads && res.leads.length > 0) {
        // Merge with existing local changes if any
        setLeads(res.leads);
      }
    } catch (err) {
      console.warn("Failed to fetch admin leads:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const handleStatusChange = async (leadId: string, newStatus: AdminLeadItem["status"]) => {
    setIsUpdatingStatus(leadId);
    setStatusFeedback(null);

    // Optimistic UI update
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }

    try {
      const target = leads.find((l) => l.id === leadId);
      const res = await updateLeadStatusAction(leadId, newStatus, target ? {
        name: target.name,
        email: target.email,
        company: target.company,
        sector: target.sector,
        score: target.score,
        priority: target.priority,
        phone: target.phone,
      } : undefined);

      if (res.success) {
        setStatusFeedback(`Status updated to "${newStatus.toUpperCase()}"`);
        setTimeout(() => setStatusFeedback(null), 3000);
      } else {
        setStatusFeedback(`Status saved locally (${res.error || "Supabase offline"})`);
        setTimeout(() => setStatusFeedback(null), 3500);
      }
    } catch {
      setStatusFeedback("Status updated locally");
      setTimeout(() => setStatusFeedback(null), 3000);
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  const handleSignOut = async () => {
    await adminSignOutAction();
    router.push("/admin/login");
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      lead.company.toLowerCase().includes(q) ||
      lead.name.toLowerCase().includes(q) ||
      lead.email.toLowerCase().includes(q) ||
      lead.id.toLowerCase().includes(q) ||
      lead.sector.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  const hotCount = leads.filter((l) => l.priority === "hot").length;
  const newCount = leads.filter((l) => l.status === "new").length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Header Bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
              <span className="font-heading font-bold text-white tracking-tight text-sm sm:text-base">
                Exergy Console
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-teal-400 bg-teal-950/80 border border-teal-800/60 px-2 py-0.5 rounded-full">
                Operations
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
              <Link
                href="/admin"
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/admin/leads"
                className="px-3 py-1.5 rounded-lg text-teal-300 bg-teal-950/60 border border-teal-800/50 font-semibold"
              >
                Leads & Audits
              </Link>
              <Link
                href="/admin/chat"
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              >
                Live Chat
              </Link>
              <Link
                href="/admin/tasks"
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              >
                Tasks
              </Link>
              <Link
                href="/admin/settings"
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              >
                Settings
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadLeads}
              disabled={loading}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
              title="Refresh Leads from Database"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-teal-400" : ""}`} />
            </button>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/50 text-xs font-mono transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Page Title & KPI Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
              Assessment Leads & Inquiries
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
              Active engineering prospects, thermodynamic assessment requests & chatbot handoffs
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              <span className="text-xs font-mono text-slate-300">
                Total: <strong className="text-white">{leads.length}</strong>
              </span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-amber-950/40 border border-amber-800/50 flex items-center gap-2">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-mono text-amber-300">
                Hot: <strong>{hotCount}</strong>
              </span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-blue-950/40 border border-blue-800/50 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-mono text-blue-300">
                New: <strong>{newCount}</strong>
              </span>
            </div>
          </div>
        </div>

        {statusFeedback && (
          <div className="p-3 rounded-xl bg-teal-950/80 border border-teal-600 text-teal-300 text-xs font-mono flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>{statusFeedback}</span>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by facility, contact name, email, sector, or ID..."
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500 font-mono"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            {["all", "new", "contacted", "qualified", "proposal", "won"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg uppercase tracking-wider text-[11px] font-semibold transition-all ${
                  statusFilter === st
                    ? "bg-teal-500 text-slate-950 shadow-xs"
                    : "bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Ref ID</th>
                  <th className="py-3 px-4">Facility & Contact</th>
                  <th className="py-3 px-4">Sector</th>
                  <th className="py-3 px-4">Score & Priority</th>
                  <th className="py-3 px-4">Current Status</th>
                  <th className="py-3 px-4">Received</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-xs font-mono">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      No leads match your active filters.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="py-3.5 px-4 font-semibold text-teal-400">
                        {lead.id}
                      </td>
                      <td className="py-3.5 px-4 font-sans">
                        <div className="font-semibold text-white group-hover:text-teal-300 transition-colors">
                          {lead.company}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5 font-mono">
                          <span>{lead.name}</span>
                          <span>•</span>
                          <span>{lead.email}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        {lead.sector}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{lead.score}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              lead.priority === "hot"
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                                : lead.priority === "warm"
                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
                                : "bg-slate-700/40 text-slate-400 border border-slate-700"
                            }`}
                          >
                            {lead.priority}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          disabled={isUpdatingStatus === lead.id}
                          onChange={(e) =>
                            handleStatusChange(
                              lead.id,
                              e.target.value as AdminLeadItem["status"]
                            )
                          }
                          className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500 font-mono cursor-pointer disabled:opacity-50"
                        >
                          <option value="new">NEW</option>
                          <option value="contacted">CONTACTED</option>
                          <option value="qualified">QUALIFIED</option>
                          <option value="proposal">PROPOSAL</option>
                          <option value="won">WON</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                        {lead.createdAt}
                      </td>
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-white border border-slate-700 text-xs transition-colors inline-flex items-center gap-1"
                        >
                          <span>Inspect</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Slide-out Inspection Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="font-mono text-xs text-teal-400 font-semibold uppercase">
                  {selectedLead.id} // Full Facility Profile
                </span>
                <h2 className="text-xl font-heading font-bold text-white mt-1">
                  {selectedLead.company}
                </h2>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-slate-500 uppercase tracking-wider block mb-1">
                  Contact Person
                </span>
                <div className="text-white font-sans font-semibold text-sm">
                  {selectedLead.name}
                </div>
                <div className="text-slate-400 mt-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-teal-400" />
                  <a href={`mailto:${selectedLead.email}`} className="hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
                {selectedLead.phone && (
                  <div className="text-slate-400 mt-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-teal-400" />
                    <a href={`tel:${selectedLead.phone}`} className="hover:underline">
                      {selectedLead.phone}
                    </a>
                  </div>
                )}
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <span className="text-slate-500 uppercase tracking-wider block mb-1">
                  Thermodynamic Priority
                </span>
                <div className="text-white text-sm font-bold flex items-center gap-2">
                  <span>Score: {selectedLead.score}/100</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] uppercase ${
                      selectedLead.priority === "hot"
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-blue-500/20 text-blue-300"
                    }`}
                  >
                    {selectedLead.priority}
                  </span>
                </div>
                <div className="text-slate-400 mt-2">
                  <span>Sector: </span>
                  <strong className="text-slate-200">{selectedLead.sector}</strong>
                </div>
                <div className="text-slate-400 mt-1">
                  <span>Timeline: </span>
                  <strong className="text-slate-200">
                    {selectedLead.timeline || "Immediate"}
                  </strong>
                </div>
              </div>
            </div>

            {selectedLead.services && selectedLead.services.length > 0 && (
              <div>
                <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-2">
                  Selected Energy & Water Streams
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedLead.services.map((svc) => (
                    <span
                      key={svc}
                      className="px-2.5 py-1 rounded-lg bg-teal-950/80 border border-teal-800/60 text-teal-300 font-mono text-xs"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedLead.notes && (
              <div>
                <span className="font-mono text-xs text-slate-400 uppercase tracking-wider block mb-1">
                  Process Challenge / Facility Notes
                </span>
                <p className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs font-sans text-slate-300 leading-relaxed">
                  {selectedLead.notes}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-slate-400">Update Status:</span>
                <select
                  value={selectedLead.status}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedLead.id,
                      e.target.value as AdminLeadItem["status"]
                    )
                  }
                  className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500 font-mono"
                >
                  <option value="new">NEW</option>
                  <option value="contacted">CONTACTED</option>
                  <option value="qualified">QUALIFIED</option>
                  <option value="proposal">PROPOSAL</option>
                  <option value="won">WON</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs transition-colors"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
