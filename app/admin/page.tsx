"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  MessageSquare,
  Flame,
  Clock,
  TrendingUp,
  CheckCircle2,
  Filter,
  Download,
  Shield,
  Layers,
  ArrowUpRight,
  Search,
  ChevronRight,
  LogOut,
  Activity,
  X,
  Mail,
  Building,
  Phone,
  Calendar,
  Zap,
} from "lucide-react";

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

  const teamMembers = [
    { email: "neuralwaves.official@gmail.com", role: "Founder / Administrator" },
    { email: "support@neuralwaves.in", role: "Support & Operations" },
  ];

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateLeadStatus = (id: string, newStatus: MockLead["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Admin Header */}
      <div className="border-b border-slate-800 bg-navy-950 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-mono font-bold text-base border border-teal-500/30">
              EX
            </div>
            <div>
              <span className="text-xs font-mono text-teal-400 block font-semibold">
                Exergy Operations Command
              </span>
              <h1 className="text-base font-bold text-white leading-none">
                Admin & Lead Pipeline
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {/* Team Accounts */}
            <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg">
              <div className="space-y-0.5 text-left">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-200 font-mono font-medium">neuralwaves.official@gmail.com</span>
                  <span className="text-[10px] text-teal-400 uppercase font-mono font-bold">(Founder)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span className="text-slate-400 font-mono">support@neuralwaves.in</span>
                  <span className="text-[10px] text-slate-500 uppercase font-mono">(Support)</span>
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full space-y-8 flex-1">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Total Leads (Month)</span>
              <Users className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-mono font-bold text-white">44</div>
            <span className="text-[11px] text-teal-400 font-medium mt-1 inline-flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +22% vs last month
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Hot Priority Leads</span>
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-mono font-bold text-amber-400">10</div>
            <span className="text-[11px] text-slate-400 font-medium mt-1 block">
              Urgent timeline (This quarter)
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Open Chat Inquiries</span>
              <MessageSquare className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-3xl font-mono font-bold text-teal-300">6</div>
            <span className="text-[11px] text-teal-400 font-medium mt-1 block">
              Deterministic Q&A engine active
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Median First Contact</span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-mono font-bold text-white">2.8h</div>
            <span className="text-[11px] text-slate-400 font-medium mt-1 block">
              Alerts dispatched to team inbox
            </span>
          </div>
        </div>

        {/* Pipeline Table */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-white">Active Assessment Submissions</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-teal-400 text-xs font-mono font-semibold">
                {filteredLeads.length} leads
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter name, email, company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <button
                onClick={() => alert("CSV Export generated for admin: neuralwaves.official@gmail.com & support@neuralwaves.in")}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:text-white transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 border-b border-slate-800 text-slate-400 font-mono uppercase">
                <tr>
                  <th className="py-3 px-4">Lead ID</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Company & Sector</th>
                  <th className="py-3 px-4">Priority & Score</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Received</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className={`hover:bg-slate-800/50 transition-colors ${
                      lead.email.includes("neuralwaves") ? "bg-teal-950/20" : ""
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-semibold text-teal-400">
                      {lead.id}
                      {lead.email.includes("neuralwaves") && (
                        <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase">
                          Test
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{lead.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{lead.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-white font-medium">{lead.company}</div>
                      <div className="text-[11px] font-mono text-slate-400 uppercase">{lead.sector}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase font-mono ${
                          lead.priority === "hot"
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {lead.priority} ({lead.score}/100)
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`capitalize px-2 py-0.5 rounded text-[11px] font-mono ${
                          lead.status === "new"
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                            : lead.status === "contacted"
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            : "bg-slate-800 text-slate-300"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {lead.createdAt}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 transition-colors"
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
      </div>

      {/* Selected Lead Modal Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-teal-400 uppercase font-semibold">
                  Facility Assessment File — {selectedLead.id}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedLead.company}
                </h3>
              </div>
              <span
                className={`px-2.5 py-1 rounded text-xs font-bold uppercase font-mono ${
                  selectedLead.priority === "hot"
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                }`}
              >
                Score: {selectedLead.score}/100 ({selectedLead.priority})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 uppercase font-mono block">Primary Contact</span>
                <div className="text-white font-medium text-sm">{selectedLead.name}</div>
                <div className="text-teal-400 font-mono">{selectedLead.email}</div>
                {selectedLead.phone && (
                  <div className="text-slate-400">{selectedLead.phone}</div>
                )}
              </div>

              <div className="space-y-1 bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 uppercase font-mono block">Operational Scope</span>
                <div className="text-white capitalize font-medium text-sm">Sector: {selectedLead.sector}</div>
                <div className="text-slate-300">Timeline: {selectedLead.timeline || "Immediate (Q4 2026)"}</div>
                <div className="text-slate-400">Recorded: {selectedLead.createdAt}</div>
              </div>
            </div>

            {selectedLead.services && (
              <div className="space-y-2">
                <span className="text-xs uppercase font-mono text-slate-400 font-semibold block">
                  Requested Services & Thermodynamic Streams
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedLead.services.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-teal-500/10 text-teal-300 border border-teal-500/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedLead.notes && (
              <div className="space-y-1.5">
                <span className="text-xs uppercase font-mono text-slate-400 font-semibold block">
                  Engineering Notes & Challenge Description
                </span>
                <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed">
                  {selectedLead.notes}
                </p>
              </div>
            )}

            {/* Status Transition Actions */}
            <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Current Status:</span>
                <span className="text-xs font-bold font-mono uppercase text-teal-400">
                  {selectedLead.status}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {(["new", "contacted", "qualified", "proposal", "won"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => updateLeadStatus(selectedLead.id, st)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono capitalize transition-all ${
                      selectedLead.status === st
                        ? "bg-teal-500 text-slate-950 font-bold"
                        : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
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
