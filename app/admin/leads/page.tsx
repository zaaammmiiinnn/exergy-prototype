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
      const res = await updateLeadStatusAction(
        leadId,
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
            }
          : undefined
      );

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
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header Row with KPI Counter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-heading font-extrabold text-2xl text-[#12232b] tracking-tight">
              Assessment Leads & Inquiries
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0c758d] border border-teal-200/70 text-[10px] font-mono font-bold uppercase tracking-wider">
              Live Pipeline
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Active engineering prospects, thermodynamic assessment requests & chatbot handoffs
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={loadLeads}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-teal-200/80 bg-teal-50/70 hover:bg-teal-100 text-[#0c758d] font-mono text-[11px] font-semibold transition-all shadow-2xs cursor-pointer disabled:opacity-50"
            title="Refresh Leads from Supabase"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-teal-600" : ""}`} />
            <span>Refresh</span>
          </button>

          <div className="px-3 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            <span className="text-xs font-mono text-slate-600">
              Total: <strong className="text-slate-900">{leads.length}</strong>
            </span>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 shadow-2xs flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-xs font-mono text-amber-800">
              Hot: <strong className="font-bold">{hotCount}</strong>
            </span>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-2xs flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-mono text-blue-800">
              New: <strong className="font-bold">{newCount}</strong>
            </span>
          </div>
        </div>
      </div>

      {statusFeedback && (
        <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-[#0c758d] text-xs font-mono flex items-center gap-2 animate-in fade-in duration-200 shadow-2xs">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span>{statusFeedback}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by facility, contact name, email, sector, or ID..."
            className="w-full bg-slate-50/70 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 font-mono transition-all"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          {["all", "new", "contacted", "qualified", "proposal", "won"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full uppercase tracking-wider text-[11px] font-semibold transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-[#0c758d] text-white shadow-xs"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-mono uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4 font-semibold">Ref ID</th>
                <th className="py-3 px-4 font-semibold">Facility & Contact</th>
                <th className="py-3 px-4 font-semibold">Sector</th>
                <th className="py-3 px-4 font-semibold">Score & Priority</th>
                <th className="py-3 px-4 font-semibold">Current Status</th>
                <th className="py-3 px-4 font-semibold">Received</th>
                <th className="py-3 px-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-mono">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-sans">
                    No leads match your active filters.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-teal-50/30 transition-colors group cursor-pointer"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="py-3.5 px-4 font-bold text-[#0c758d]">
                      {lead.id}
                    </td>
                    <td className="py-3.5 px-4 font-sans">
                      <div className="font-bold text-slate-900 group-hover:text-[#0c758d] transition-colors">
                        {lead.company}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5 font-mono">
                        <span>{lead.name}</span>
                        <span>•</span>
                        <span>{lead.email}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-sans">
                      {lead.sector}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{lead.score}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                            lead.priority === "hot"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : lead.priority === "warm"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
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
                        className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500 font-mono cursor-pointer disabled:opacity-50"
                      >
                        <option value="new">NEW</option>
                        <option value="contacted">CONTACTED</option>
                        <option value="qualified">QUALIFIED</option>
                        <option value="proposal">PROPOSAL</option>
                        <option value="won">WON</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {lead.createdAt}
                    </td>
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-[#0c758d] border border-teal-200/80 text-xs font-mono inline-flex items-center gap-1 transition-colors cursor-pointer"
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

      {/* Slide-out Inspection Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6 text-slate-900">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs text-[#0c758d] font-bold uppercase tracking-wider">
                  {selectedLead.id} // Full Facility Profile
                </span>
                <h2 className="text-xl font-heading font-extrabold text-[#12232b] mt-1">
                  {selectedLead.company}
                </h2>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-slate-400 uppercase tracking-wider block mb-1 font-semibold text-[10px]">
                  Contact Person
                </span>
                <div className="text-slate-900 font-sans font-bold text-sm">
                  {selectedLead.name}
                </div>
                <div className="text-slate-600 mt-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#0c758d]" />
                  <a href={`mailto:${selectedLead.email}`} className="hover:underline">
                    {selectedLead.email}
                  </a>
                </div>
                {selectedLead.phone && (
                  <div className="text-slate-600 mt-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#0c758d]" />
                    <a href={`tel:${selectedLead.phone}`} className="hover:underline">
                      {selectedLead.phone}
                    </a>
                  </div>
                )}
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-slate-400 uppercase tracking-wider block mb-1 font-semibold text-[10px]">
                  Thermodynamic Priority
                </span>
                <div className="text-slate-900 text-sm font-bold flex items-center gap-2">
                  <span>Score: {selectedLead.score}/100</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                      selectedLead.priority === "hot"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                  >
                    {selectedLead.priority}
                  </span>
                </div>
                <div className="text-slate-600 mt-2">
                  <span className="text-slate-400">Sector: </span>
                  <strong className="text-slate-800">{selectedLead.sector}</strong>
                </div>
                <div className="text-slate-600 mt-1">
                  <span className="text-slate-400">Timeline: </span>
                  <strong className="text-slate-800">
                    {selectedLead.timeline || "Immediate"}
                  </strong>
                </div>
              </div>
            </div>

            {selectedLead.services && selectedLead.services.length > 0 && (
              <div>
                <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-2 font-semibold">
                  Selected Energy & Water Streams
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedLead.services.map((svc) => (
                    <span
                      key={svc}
                      className="px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200/80 text-[#0c758d] font-mono text-xs font-semibold"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedLead.notes && (
              <div>
                <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block mb-1 font-semibold">
                  Process Challenge / Facility Notes
                </span>
                <p className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-sans text-slate-700 leading-relaxed">
                  {selectedLead.notes}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-slate-500">Update Status:</span>
                <select
                  value={selectedLead.status}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedLead.id,
                      e.target.value as AdminLeadItem["status"]
                    )
                  }
                  className="bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-500 font-mono cursor-pointer"
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
                className="px-4 py-2 rounded-xl bg-[#0c758d] hover:bg-[#095f73] text-white font-mono text-xs transition-colors shadow-xs cursor-pointer"
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
