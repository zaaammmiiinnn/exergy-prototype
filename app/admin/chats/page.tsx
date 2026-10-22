"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Clock,
  Send,
  User,
  Bot,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Building,
  Mail,
  Phone,
  Search,
  Filter,
  CheckSquare,
  ArrowLeft,
  ArrowDown,
  Sparkles,
  RefreshCw,
  UserCheck,
  XCircle,
} from "lucide-react";

interface ChatMessageItem {
  id: string;
  sender: "visitor" | "bot" | "staff" | "system";
  text: string;
  time: string;
}

interface ChatSessionItem {
  id: string;
  visitor: string;
  company: string;
  sector: string;
  email?: string;
  phone?: string;
  status: "needs_human" | "bot_resolved" | "staff_active" | "closed";
  lastMessageTime: string;
  unread: boolean;
  messages: ChatMessageItem[];
}

const INITIAL_SESSIONS: ChatSessionItem[] = [
  {
    id: "CHAT-2026-081",
    visitor: "Gulf Food & Bev Plant Manager",
    company: "Gulf F&B Processors FZCO",
    sector: "Continuous Food & Beverage Processing",
    email: "ops.manager@gulffnb.ae",
    phone: "+971 50 234 5678",
    status: "needs_human",
    lastMessageTime: "4 mins ago",
    unread: true,
    messages: [
      {
        id: "m-1",
        sender: "visitor",
        text: "Hello, we operate 3 industrial ammonia chillers in Al Quoz and our peak electricity bill exceeded AED 180,000 last month. Can you optimize compressor lift and condenser temperatures?",
        time: "10:41 AM",
      },
      {
        id: "m-2",
        sender: "bot",
        text: "Exergy Solutions specializes in industrial refrigeration lift cycle minimization and waste-heat recovery. We evaluate condenser approach temperatures, subcooling loops, and variable head pressure controls to typically yield 15–25% power reductions. Would you like to connect with our Dubai engineering team for a plant assessment?",
        time: "10:41 AM",
      },
      {
        id: "m-3",
        sender: "visitor",
        text: "Yes please, could a senior engineer review our condenser logs? We have 4.2 MW thermal cooling load.",
        time: "10:43 AM",
      },
      {
        id: "m-4",
        sender: "system",
        text: "Visitor requested technical consultation • Escalated to Staff Engineer queue",
        time: "10:43 AM",
      },
    ],
  },
  {
    id: "CHAT-2026-080",
    visitor: "Sharjah Chemical Engineer",
    company: "Crescent Chemical Technologies",
    sector: "Chemical Refining & Distillation",
    email: "dr.hamad@crescentchem.ae",
    status: "bot_resolved",
    lastMessageTime: "22 mins ago",
    unread: false,
    messages: [
      {
        id: "m-1",
        sender: "visitor",
        text: "Do you provide whole-plant pinch analysis and composite curve integration for continuous distillation columns?",
        time: "10:20 AM",
      },
      {
        id: "m-2",
        sender: "bot",
        text: "Yes. Our process integration service uses Pinch Analysis and thermodynamic exergy modeling to match high-grade heat sources with low-grade reboiler duties, reducing net utility demand across chemical processing plants.",
        time: "10:20 AM",
      },
      {
        id: "m-3",
        sender: "visitor",
        text: "Understood, thank you. I will submit an assessment intake with our stream data.",
        time: "10:22 AM",
      },
      {
        id: "m-4",
        sender: "bot",
        text: "You can submit your facility specifications at /assessment anytime. Have a productive day!",
        time: "10:22 AM",
      },
    ],
  },
  {
    id: "CHAT-2026-079",
    visitor: "District Cooling Ops Lead",
    company: "Emirates Regional Cooling Utilities",
    sector: "District Cooling & HVAC",
    email: "cooling.lead@ercu.ae",
    phone: "+971 52 876 5432",
    status: "needs_human",
    lastMessageTime: "1 hour ago",
    unread: true,
    messages: [
      {
        id: "m-1",
        sender: "visitor",
        text: "We are experiencing low delta-T syndrome across several commercial tower substations. Can exergy optimization resolve this without repiping the entire building?",
        time: "09:30 AM",
      },
      {
        id: "m-2",
        sender: "bot",
        text: "Low Delta-T syndrome causes excessive pumping power and chiller derating. Exergy Solutions addresses this through hydraulic balancing, decoupled coil staging, and secondary bridge valve tuning to restore designed Delta-T.",
        time: "09:31 AM",
      },
      {
        id: "m-3",
        sender: "visitor",
        text: "Can an engineer visit our Business Bay plant next Tuesday to review the temperature sensors and valve bypasses?",
        time: "09:34 AM",
      },
      {
        id: "m-4",
        sender: "system",
        text: "Visitor requested on-site engineering review • Awaiting staff response",
        time: "09:34 AM",
      },
    ],
  },
  {
    id: "CHAT-2026-076",
    visitor: "Ras Al Khaimah Cement Plant",
    company: "RAK Industrial Materials Ltd",
    sector: "Cement & Calcination",
    email: "tariq@rakcement.ae",
    status: "staff_active",
    lastMessageTime: "3 hours ago",
    unread: false,
    messages: [
      {
        id: "m-1",
        sender: "visitor",
        text: "Can waste heat from our clinker cooler exhaust be converted into power or steam?",
        time: "07:15 AM",
      },
      {
        id: "m-2",
        sender: "bot",
        text: "Yes, exhaust gas from clinker coolers (typically 280°C–340°C) is prime for Organic Rankine Cycle (ORC) power generation or high-pressure waste heat recovery steam generators.",
        time: "07:16 AM",
      },
      {
        id: "m-3",
        sender: "staff",
        text: "Hello Tariq, this is Staff Engineer from Exergy Solutions. Based on your clinker cooler flow rates, we estimate 1.8 MW of clean electrical power generation. When are you available for a preliminary stream review?",
        time: "07:45 AM",
      },
      {
        id: "m-4",
        sender: "visitor",
        text: "Thursday afternoon works great for our technical director.",
        time: "08:00 AM",
      },
    ],
  },
];

const STORAGE_KEY = "exergy_admin_chats_v2";

export default function AdminChatsPage() {
  const [sessions, setSessions] = useState<ChatSessionItem[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string>("CHAT-2026-081");
  const [activeFilter, setActiveFilter] = useState<"all" | "needs_human" | "staff_active" | "bot_resolved">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [replyText, setReplyText] = useState("");
  const [isMobileListHidden, setIsMobileListHidden] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const userScrolledUpRef = useRef(false);

  const scrollToBottom = (smooth = true) => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: smooth ? "smooth" : "instant",
    });
  };

  const handleMessagesScroll = () => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    // Show jump-to-bottom if scrolled up more than 80px
    const isUp = scrollHeight - scrollTop - clientHeight > 80;
    userScrolledUpRef.current = isUp;
    setShowScrollBottom(isUp);
  };

  // Load chat sessions from localStorage or default
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSessions(parsed);
          setSelectedSessionId(parsed[0].id);
          return;
        }
      }
    } catch {}
    setSessions(INITIAL_SESSIONS);
    setSelectedSessionId(INITIAL_SESSIONS[0].id);
  }, []);

  // Save sessions to localStorage
  const saveSessions = (updated: ChatSessionItem[]) => {
    setSessions(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  };

  const selectedSession = sessions.find((s) => s.id === selectedSessionId) || sessions[0];

  // When switching conversation sessions, reset scroll position to bottom
  useEffect(() => {
    userScrolledUpRef.current = false;
    setShowScrollBottom(false);
    const timer = setTimeout(() => {
      scrollToBottom(false);
    }, 50);
    return () => clearTimeout(timer);
  }, [selectedSessionId]);

  // When a message is added, smooth scroll to bottom if user hasn't scrolled up to read earlier history
  useEffect(() => {
    if (!userScrolledUpRef.current) {
      const timer = setTimeout(() => {
        scrollToBottom(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [selectedSession?.messages?.length]);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedSession) return;

    const newMessage: ChatMessageItem = {
      id: `msg-${Date.now()}`,
      sender: "staff",
      text: replyText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedSessions = sessions.map((session) => {
      if (session.id === selectedSession.id) {
        return {
          ...session,
          status: "staff_active" as const,
          unread: false,
          lastMessageTime: "Just now",
          messages: [...session.messages, newMessage],
        };
      }
      return session;
    });

    saveSessions(updatedSessions);
    setReplyText("");
  };

  const handleQuickReply = (text: string) => {
    setReplyText(text);
  };

  const handleMarkResolved = () => {
    if (!selectedSession) return;
    const updatedSessions = sessions.map((session) => {
      if (session.id === selectedSession.id) {
        return {
          ...session,
          status: "bot_resolved" as const,
          unread: false,
        };
      }
      return session;
    });
    saveSessions(updatedSessions);
  };

  const filteredSessions = sessions.filter((s) => {
    const matchesFilter =
      activeFilter === "all" ? true : s.status === activeFilter;
    const matchesSearch =
      s.visitor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const countNeedsHuman = sessions.filter((s) => s.status === "needs_human").length;
  const countStaffActive = sessions.filter((s) => s.status === "staff_active").length;

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200/70 text-[#0c758d] flex items-center justify-center shadow-2xs">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-slate-900 tracking-tight">
              Chat Inbox &amp; Inquiries
            </h1>
            {countNeedsHuman > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-mono font-bold animate-pulse">
                {countNeedsHuman} Needs Review
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Real-time deterministic chatbot sessions and human escalation requests
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Role: <strong className="text-slate-800">Staff Engineer</strong></span>
        </div>
      </div>

      {/* Main Two-Pane Chat Container */}
      <div className="bg-white border border-slate-200/90 rounded-3xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 h-[calc(100vh-210px)] min-h-[580px] max-h-[850px]">
        {/* Left Pane: Conversation List (4 columns) */}
        <div
          className={`md:col-span-4 border-r border-slate-200/80 flex flex-col h-full min-h-0 overflow-hidden bg-slate-50/50 ${
            isMobileListHidden ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Search & Filter Header */}
          <div className="p-4 border-b border-slate-200/80 space-y-3 bg-white shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search visitor, company, ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0c758d]/20 focus:bg-white"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-mono">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
                  activeFilter === "all"
                    ? "bg-[#0c758d] text-white font-bold"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All ({sessions.length})
              </button>
              <button
                onClick={() => setActiveFilter("needs_human")}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
                  activeFilter === "needs_human"
                    ? "bg-amber-600 text-white font-bold"
                    : "bg-amber-50 text-amber-800 border border-amber-200/80 hover:bg-amber-100"
                }`}
              >
                Needs Review ({countNeedsHuman})
              </button>
              <button
                onClick={() => setActiveFilter("staff_active")}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
                  activeFilter === "staff_active"
                    ? "bg-teal-700 text-white font-bold"
                    : "bg-teal-50 text-teal-800 border border-teal-200/80 hover:bg-teal-100"
                }`}
              >
                Active ({countStaffActive})
              </button>
            </div>
          </div>

          {/* Session Cards List */}
          <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-slate-100 overscroll-contain">
            {filteredSessions.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs font-mono">
                No matching chat inquiries.
              </div>
            ) : (
              filteredSessions.map((session) => {
                const isSelected = selectedSession?.id === session.id;
                const lastMsg = session.messages[session.messages.length - 1];

                return (
                  <div
                    key={session.id}
                    onClick={() => {
                      setSelectedSessionId(session.id);
                      setIsMobileListHidden(true);
                    }}
                    className={`p-4 transition-all cursor-pointer relative hover:bg-white ${
                      isSelected
                        ? "bg-white shadow-xs border-l-4 border-l-[#0c758d]"
                        : "bg-slate-50/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-bold text-[#0c758d]">
                        {session.id}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {session.lastMessageTime}
                      </span>
                    </div>

                    <h4 className="font-heading font-bold text-xs text-slate-900 mt-1 line-clamp-1">
                      {session.visitor}
                    </h4>

                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {session.company}
                    </p>

                    <p className="text-xs text-slate-600 line-clamp-1 mt-1 font-sans">
                      {lastMsg?.text || "New chat initiated..."}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between gap-2">
                      <span
                        className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                          session.status === "needs_human"
                            ? "bg-amber-50 text-amber-800 border-amber-200"
                            : session.status === "staff_active"
                            ? "bg-teal-50 text-teal-800 border-teal-200"
                            : "bg-emerald-50 text-emerald-800 border-emerald-200"
                        }`}
                      >
                        {session.status === "needs_human"
                          ? "Needs Review"
                          : session.status === "staff_active"
                          ? "Staff Active"
                          : "Bot Resolved"}
                      </span>

                      <span className="text-[11px] text-[#0c758d] font-bold font-mono">
                        Open &rarr;
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Pane: Active Conversation & Reply View (8 columns) */}
        <div
          className={`md:col-span-8 flex flex-col h-full min-h-0 overflow-hidden bg-white relative ${
            !isMobileListHidden ? "hidden md:flex" : "flex"
          }`}
        >
          {selectedSession ? (
            <>
              {/* Conversation Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-3 bg-slate-50/40 shrink-0">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsMobileListHidden(false)}
                    className="md:hidden p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <div className="w-9 h-9 rounded-full bg-teal-100/70 border border-teal-200 text-[#0c758d] flex items-center justify-center shrink-0 font-bold text-xs font-mono">
                    {selectedSession.id.slice(-2)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-bold text-sm text-slate-900">
                        {selectedSession.visitor}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-400">
                        {selectedSession.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Building className="w-3 h-3 text-slate-400" />
                        {selectedSession.company}
                      </span>
                      {selectedSession.email && (
                        <span className="hidden sm:flex items-center gap-1 font-mono text-[11px]">
                          <Mail className="w-3 h-3 text-slate-400" />
                          {selectedSession.email}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleMarkResolved}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-mono font-bold transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Resolve</span>
                  </button>
                </div>
              </div>

              {/* Message Transcript Stream */}
              <div
                ref={messagesContainerRef}
                onScroll={handleMessagesScroll}
                className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/20 overscroll-contain"
              >
                {selectedSession.messages.map((msg) => {
                  if (msg.sender === "system") {
                    return (
                      <div
                        key={msg.id}
                        className="flex items-center justify-center my-3"
                      >
                        <span className="px-3 py-1 rounded-full bg-amber-50/90 border border-amber-200 text-amber-900 text-[11px] font-mono flex items-center gap-1.5 shadow-2xs">
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          <span>{msg.text}</span>
                        </span>
                      </div>
                    );
                  }

                  const isVisitor = msg.sender === "visitor";
                  const isStaff = msg.sender === "staff";

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        isVisitor ? "items-start" : "items-end"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] font-mono text-slate-400">
                        {isVisitor ? (
                          <>
                            <User className="w-3 h-3 text-slate-400" />
                            <span>{selectedSession.visitor}</span>
                          </>
                        ) : isStaff ? (
                          <>
                            <UserCheck className="w-3 h-3 text-teal-600" />
                            <span className="text-[#0c758d] font-bold">Staff Engineer</span>
                          </>
                        ) : (
                          <>
                            <Bot className="w-3 h-3 text-teal-600" />
                            <span>Exergy Bot</span>
                          </>
                        )}
                        <span>•</span>
                        <span>{msg.time}</span>
                      </div>

                      <div
                        className={`max-w-lg rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-2xs ${
                          isVisitor
                            ? "bg-white border border-slate-200 text-slate-800 rounded-tl-xs"
                            : isStaff
                            ? "bg-[#0c758d] text-white rounded-tr-xs"
                            : "bg-teal-50 border border-teal-200/80 text-teal-950 rounded-tr-xs"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Scroll to Bottom Floating Pill */}
              {showScrollBottom && (
                <button
                  type="button"
                  onClick={() => {
                    userScrolledUpRef.current = false;
                    setShowScrollBottom(false);
                    scrollToBottom(true);
                  }}
                  className="absolute bottom-28 right-6 z-20 px-3.5 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white text-[11px] font-mono font-medium shadow-xl flex items-center gap-1.5 backdrop-blur-sm transition-all cursor-pointer animate-in fade-in"
                >
                  <ArrowDown className="w-3.5 h-3.5 text-teal-400" />
                  <span>Scroll to latest</span>
                </button>
              )}

              {/* Quick Response Suggestion Chips */}
              <div className="p-2.5 px-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-[11px] font-mono shrink-0">
                <span className="text-slate-400 shrink-0">Quick reply:</span>
                <button
                  type="button"
                  onClick={() =>
                    handleQuickReply(
                      "Hi, this is Staff Engineer from Exergy Solutions. I have reviewed your plant inquiry and would be glad to assist. Could you share your current evaporator operating temperatures?"
                    )
                  }
                  className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-[#0c758d] hover:border-[#0c758d] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Request Operating Temps
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleQuickReply(
                      "We can schedule an engineer on-site next week to conduct temperature baseline measurements across your headers. Does Tuesday 10:00 AM work for your team?"
                    )
                  }
                  className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-[#0c758d] hover:border-[#0c758d] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Propose Site Visit
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleQuickReply(
                      "Please upload your recent utility bills and P&ID diagrams at /portal so we can calculate your estimated thermal exergy savings."
                    )
                  }
                  className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-[#0c758d] hover:border-[#0c758d] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Request Utility Bills
                </button>
              </div>

              {/* Reply Input Box */}
              <form
                onSubmit={handleSendReply}
                className="p-4 border-t border-slate-200 bg-white flex items-center gap-3 shrink-0"
              >
                <input
                  type="text"
                  required
                  placeholder="Type engineering response to client as Staff Engineer..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0c758d]/20 focus:bg-white"
                />

                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0c758d] hover:bg-[#095f73] text-white font-heading font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-40 cursor-pointer shadow-xs active:scale-98"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-xs font-mono p-8">
              <MessageSquare className="w-8 h-8 text-slate-300 mb-2" />
              <span>Select a conversation from the left to view and respond</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
