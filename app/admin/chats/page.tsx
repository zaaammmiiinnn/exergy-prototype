"use client";

import React from "react";
import { MessageSquare, Clock, ArrowUpRight } from "lucide-react";

export default function AdminChatsPage() {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-heading font-extrabold text-2xl text-[#12232b] tracking-tight">
              Chat Inbox
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 border border-amber-500/30 text-xs font-mono font-bold">
              3 Unread Sessions
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Real-time deterministic chatbot sessions and human escalation requests
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            id: "CHAT-2026-081",
            visitor: "Gulf Food & Bev Plant Manager",
            preview: "Requested exergy audit for ammonia refrigeration plant...",
            time: "4 mins ago",
            status: "Needs Human Review",
          },
          {
            id: "CHAT-2026-080",
            visitor: "Sharjah Chemical Engineer",
            preview: "Inquired about pinch analysis software integrations...",
            time: "22 mins ago",
            status: "Bot Resolved",
          },
          {
            id: "CHAT-2026-079",
            visitor: "District Cooling Ops Lead",
            preview: "Asking about Delta-T syndrome mitigation case studies...",
            time: "1 hour ago",
            status: "Needs Human Review",
          },
        ].map((chat) => (
          <div
            key={chat.id}
            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-semibold text-[#0c758d]">
                {chat.id}
              </span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" />
                {chat.time}
              </span>
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-[#12232b]">
                {chat.visitor}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                {chat.preview}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  chat.status.includes("Human")
                    ? "bg-amber-100 text-amber-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {chat.status}
              </span>
              <span className="text-[#0c758d] font-semibold flex items-center gap-1 group cursor-pointer hover:underline">
                Open Chat <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
