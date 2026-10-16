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
}

const MOCK_LEADS: MockLead[] = [
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
  },
  {
    id: "EX-2026-1028",
    name: "Rashid Khalifa",
    email: "rashid@creekhospitality.com",
    company: "Creek Resorts & Hotels",
    sector: "hospitality",
    score: 60,
    priority: "warm",
    status: "proposal",
    createdAt: "3 days ago",
  },
];

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"leads" | "chats" | "settings">("leads");
  const [searchTerm, setSearchTerm] = useState("");
  const [leads, setLeads] = useState<MockLead[]>(MOCK_LEADS);

  const currentUser = {
    email: "neuralwaves.official@gmail.com",
    role: "founder",
    name: "Admin Lead",
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Admin Header */}
      <div className="border-b border-slate-800 bg-navy-950 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-mono font-bold text-sm border border-teal-500/30">
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
            <div className="text-right hidden sm:block">
              <span className="text-slate-300 font-medium block">{currentUser.email}</span>
              <span className="text-[11px] font-mono text-teal-400 uppercase font-bold">
                Role: {currentUser.role}
              </span>
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
            <div className="text-3xl font-mono font-bold text-white">42</div>
            <span className="text-[11px] text-teal-400 font-medium mt-1 inline-flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18% vs last month
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Hot Priority Leads</span>
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-mono font-bold text-amber-400">8</div>
            <span className="text-[11px] text-slate-400 font-medium mt-1 block">
              Urgent timeline (This quarter)
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Open Chat Inquiries</span>
              <MessageSquare className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-3xl font-mono font-bold text-teal-300">5</div>
            <span className="text-[11px] text-teal-400 font-medium mt-1 block">
              Deterministic Q&A engine active
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold">Median First Contact</span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-mono font-bold text-white">3.4h</div>
            <span className="text-[11px] text-slate-400 font-medium mt-1 block">
              SLA target: &lt; 24h
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
                onClick={() => alert("CSV Export generated for admin: neuralwaves.official@gmail.com")}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-slate-200 hover:text-white"
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
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Received</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-teal-400">
                      {lead.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white">{lead.name}</div>
                      <div className="text-[11px] text-slate-400">{lead.email}</div>
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
                        {lead.priority} ({lead.score})
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="capitalize px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {lead.createdAt}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => alert(`Opening lead details for ${lead.name} (${lead.id})`)}
                        className="text-xs font-semibold text-teal-400 hover:text-teal-300"
                      >
                        Review Lead
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
