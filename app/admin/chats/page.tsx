"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  ArrowLeft,
  ArrowDown,
  Sparkles,
  RefreshCw,
  UserCheck,
  Trash2,
  Check,
  RotateCcw,
  X,
  Smartphone,
  Monitor,
} from "lucide-react";

interface ChatMessageItem {
  id: string;
  sender: "visitor" | "bot" | "admin" | "system";
  text: string;
  time: string;
}

interface ChatSessionItem {
  id: string;
  visitor: string;
  company?: string;
  sector?: string;
  email?: string;
  phone?: string;
  deviceType?: string;
  status: "needs_human" | "open" | "resolved" | "closed" | "bot";
  lastMessageTime: string;
  unread: boolean;
  messages: ChatMessageItem[];
}

export default function AdminChatsPage() {
  const [sessions, setSessions] = useState<ChatSessionItem[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [replyText, setReplyText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const userScrolledUpRef = useRef(false);

  // Fetch conversations from central database
  const fetchConversations = useCallback(async (selectId?: string) => {
    try {
      const url = `/api/admin/chats${activeFilter !== "all" ? `?status=${activeFilter}` : ""}${
        searchQuery ? `${activeFilter !== "all" ? "&" : "?"}search=${encodeURIComponent(searchQuery)}` : ""
      }`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.success && Array.isArray(data.conversations)) {
        const mapped: ChatSessionItem[] = data.conversations.map((c: any) => {
          const d = c.last_message_at ? new Date(c.last_message_at) : new Date(c.created_at);
          const timeStr = !isNaN(d.getTime())
            ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "Recent";

          return {
            id: c.id,
            visitor: c.visitor_name || (c.visitor_id ? `Visitor ${c.visitor_id.slice(-6)}` : "Visitor"),
            company: c.company_name || "Prospective Industrial Client",
            sector: "Industrial Operations",
            email: c.visitor_email || undefined,
            phone: undefined,
            deviceType: c.user_agent?.toLowerCase().includes("mobile") ? "mobile" : "desktop",
            status: c.status || "open",
            lastMessageTime: timeStr,
            unread: Boolean(c.unread_by_admin),
            messages: [],
          };
        });

        setSessions(mapped);

        // Maintain selection or select first
        setSelectedSessionId((prev) => {
          if (selectId) return selectId;
          if (prev && mapped.some((s) => s.id === prev)) return prev;
          return mapped[0]?.id || "";
        });
      }
    } catch (err) {
      console.warn("[ADMIN CHATS FETCH ERROR]", err);
    } finally {
      setIsLoading(false);
    }
  }, [activeFilter, searchQuery]);

  // Initial load and periodic polling every 4 seconds
  useEffect(() => {
    fetchConversations();
    const interval = setInterval(() => {
      fetchConversations();
    }, 4000);
    return () => clearInterval(interval);
  }, [fetchConversations]);

  // Load message history for currently selected conversation
  const loadMessagesForSession = useCallback(async (convId: string) => {
    if (!convId) return;
    try {
      const res = await fetch(`/api/chat/messages?conversationId=${encodeURIComponent(convId)}&markRead=true`);
      const data = await res.json();

      if (data.success && Array.isArray(data.messages)) {
        const formatted: ChatMessageItem[] = data.messages.map((m: any) => {
          const d = m.created_at ? new Date(m.created_at) : new Date();
          const timeStr = !isNaN(d.getTime())
            ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "";

          return {
            id: m.id,
            sender: m.sender_type || (m.sender === "admin" ? "admin" : m.sender === "visitor" ? "visitor" : "bot"),
            text: m.message_content || m.body || "",
            time: timeStr,
          };
        });

        setSessions((prev) =>
          prev.map((s) => {
            if (s.id === convId) {
              return {
                ...s,
                unread: false,
                messages: formatted,
              };
            }
            return s;
          })
        );
      }
    } catch (err) {
      console.warn("[FETCH SESSION MESSAGES ERROR]", err);
    }
  }, []);

  useEffect(() => {
    if (selectedSessionId) {
      loadMessagesForSession(selectedSessionId);
    }
  }, [selectedSessionId, loadMessagesForSession]);

  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "end",
      });
    }
  };

  const handleMessagesScroll = () => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const isUp = scrollHeight - scrollTop - clientHeight > 80;
    userScrolledUpRef.current = isUp;
    setShowScrollBottom(isUp);
  };

  const selectedSession = sessions.find((s) => s.id === selectedSessionId) || sessions[0];

  useEffect(() => {
    userScrolledUpRef.current = false;
    setShowScrollBottom(false);
    const timer = setTimeout(() => scrollToBottom(false), 50);
    return () => clearTimeout(timer);
  }, [selectedSessionId]);

  useEffect(() => {
    if (!userScrolledUpRef.current) {
      const timer = setTimeout(() => scrollToBottom(true), 50);
      return () => clearTimeout(timer);
    }
  }, [selectedSession?.messages?.length]);

  // Send admin reply
  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedSession || isSubmitting) return;

    const currentText = replyText.trim();
    setReplyText("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/chats/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: selectedSession.id,
          message: currentText,
          senderName: "Operations Engineer",
        }),
      });

      const data = await res.json();
      if (data.success && data.message) {
        const d = new Date(data.message.created_at);
        const timeStr = !isNaN(d.getTime())
          ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : "Just now";

        const newMsg: ChatMessageItem = {
          id: data.message.id,
          sender: "admin",
          text: currentText,
          time: timeStr,
        };

        setSessions((prev) =>
          prev.map((s) =>
            s.id === selectedSession.id
              ? {
                  ...s,
                  status: "open",
                  messages: [...s.messages, newMsg],
                }
              : s
          )
        );
      }
    } catch (err) {
      console.error("[ADMIN SEND REPLY ERROR]", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Change conversation status
  const handleStatusChange = async (newStatus: "open" | "needs_human" | "resolved" | "closed") => {
    if (!selectedSession) return;
    try {
      await fetch("/api/admin/chats/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: selectedSession.id,
          status: newStatus,
        }),
      });

      setSessions((prev) =>
        prev.map((s) =>
          s.id === selectedSession.id ? { ...s, status: newStatus } : s
        )
      );
    } catch (err) {
      console.warn("[UPDATE STATUS ERROR]", err);
    }
  };

  // Delete conversation
  const handleDeleteConversation = async () => {
    if (!selectedSession) return;
    if (!confirm("Are you sure you want to permanently delete this conversation?")) return;

    try {
      const res = await fetch(`/api/admin/chats?id=${encodeURIComponent(selectedSession.id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setSessions((prev) => prev.filter((s) => s.id !== selectedSession.id));
        const remaining = sessions.filter((s) => s.id !== selectedSession.id);
        setSelectedSessionId(remaining[0]?.id || "");
      }
    } catch (err) {
      console.warn("[DELETE CONVERSATION ERROR]", err);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "needs_human":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertCircle className="w-3 h-3 text-amber-600" />
            Needs Engineer
          </span>
        );
      case "open":
      case "bot":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Active
          </span>
        );
      case "resolved":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <Check className="w-3 h-3 text-slate-500" />
            Resolved
          </span>
        );
      case "closed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <X className="w-3 h-3 text-rose-500" />
            Closed
          </span>
        );
      default:
        return null;
    }
  };

  const stats = {
    total: sessions.length,
    needsHuman: sessions.filter((s) => s.status === "needs_human").length,
    open: sessions.filter((s) => s.status === "open" || s.status === "bot").length,
    resolved: sessions.filter((s) => s.status === "resolved").length,
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-50 border border-teal-200 text-[#0c758d]">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-heading font-extrabold text-2xl text-[#12232b] tracking-tight">
                Customer Support / Live Chat
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Real-time central database chat console & customer inquiry management.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => fetchConversations()}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-xs self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Live Queue</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Total Conversations
          </span>
          <p className="text-2xl font-bold font-heading text-[#12232b] mt-1">
            {stats.total}
          </p>
        </div>
        <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-700">
            Needs Human Engineer
          </span>
          <p className="text-2xl font-bold font-heading text-amber-900 mt-1">
            {stats.needsHuman}
          </p>
        </div>
        <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
            Active Chats
          </span>
          <p className="text-2xl font-bold font-heading text-emerald-900 mt-1">
            {stats.open}
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Resolved Sessions
          </span>
          <p className="text-2xl font-bold font-heading text-slate-800 mt-1">
            {stats.resolved}
          </p>
        </div>
      </div>

      {/* Main Split-Pane Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-slate-200 rounded-2xl shadow-sm min-h-[640px] overflow-hidden">
        {/* Left Column: Conversation Sessions List */}
        <div className="lg:col-span-5 border-r border-slate-200 flex flex-col h-[640px]">
          {/* Search & Filter Bar */}
          <div className="p-3.5 border-b border-slate-200 space-y-2.5 bg-slate-50/60">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search visitor, email, or session..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 overflow-x-auto text-xs pb-0.5">
              {[
                { id: "all", label: "All" },
                { id: "needs_human", label: "Needs Human" },
                { id: "open", label: "Open" },
                { id: "resolved", label: "Resolved" },
                { id: "closed", label: "Closed" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                    activeFilter === tab.id
                      ? "bg-[#0c758d] text-white"
                      : "bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Session Cards Scroll Container */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {sessions.length === 0 ? (
              <div className="p-8 text-center text-slate-400">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">No customer conversations found.</p>
              </div>
            ) : (
              sessions.map((s) => {
                const isSelected = s.id === selectedSessionId;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSessionId(s.id)}
                    className={`w-full text-left p-3.5 transition-colors relative flex flex-col gap-1.5 ${
                      isSelected
                        ? "bg-teal-50/50 border-l-4 border-l-[#0c758d]"
                        : "hover:bg-slate-50/80"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-900 truncate">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{s.visitor}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0">
                        {s.lastMessageTime}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] text-slate-500 truncate">
                        {s.email || s.company || "Prospective Industrial Inquirer"}
                      </span>
                      {getStatusBadge(s.status)}
                    </div>

                    {s.unread && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-3.5 right-3" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Live Chat Pane & Admin Dispatch */}
        <div className="lg:col-span-7 flex flex-col h-[640px]">
          {selectedSession ? (
            <>
              {/* Conversation Header */}
              <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-heading font-bold text-sm text-[#12232b]">
                      {selectedSession.visitor}
                    </h2>
                    {getStatusBadge(selectedSession.status)}
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      {selectedSession.deviceType === "mobile" ? (
                        <Smartphone className="w-3 h-3" />
                      ) : (
                        <Monitor className="w-3 h-3" />
                      )}
                      <span className="capitalize">{selectedSession.deviceType || "Desktop"}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    {selectedSession.email && (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{selectedSession.email}</span>
                      </span>
                    )}
                    <span className="font-mono text-[11px] text-slate-400">
                      ID: {selectedSession.id.slice(0, 12)}
                    </span>
                  </div>
                </div>

                {/* Status Action Buttons */}
                <div className="flex items-center gap-1.5">
                  <select
                    value={selectedSession.status}
                    onChange={(e) =>
                      handleStatusChange(
                        e.target.value as "open" | "needs_human" | "resolved" | "closed"
                      )
                    }
                    className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1 font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
                  >
                    <option value="needs_human">Needs Human</option>
                    <option value="open">Active / Open</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>

                  <button
                    onClick={handleDeleteConversation}
                    title="Delete Conversation"
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Thread Container */}
              <div
                ref={messagesContainerRef}
                onScroll={handleMessagesScroll}
                className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/40 text-xs"
              >
                {selectedSession.messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-1">
                    <Bot className="w-8 h-8 opacity-40" />
                    <p>No messages loaded for this session.</p>
                  </div>
                ) : (
                  selectedSession.messages.map((m) => {
                    const isStaff = m.sender === "admin";
                    const isVisitor = m.sender === "visitor";
                    const isBot = m.sender === "bot";

                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col ${
                          isStaff ? "items-end" : "items-start"
                        }`}
                      >
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 mb-0.5 px-1">
                          {isStaff ? (
                            <>
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              <span className="font-semibold text-emerald-700">
                                Engineering Support
                              </span>
                            </>
                          ) : isVisitor ? (
                            <>
                              <User className="w-3 h-3 text-slate-500" />
                              <span>{selectedSession.visitor}</span>
                            </>
                          ) : (
                            <>
                              <Bot className="w-3 h-3 text-[#0c758d]" />
                              <span>Exergy Automated Assistant</span>
                            </>
                          )}
                          <span>•</span>
                          <span>{m.time}</span>
                        </div>

                        <div
                          className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed whitespace-pre-wrap ${
                            isStaff
                              ? "bg-[#0c758d] text-white rounded-br-none shadow-xs"
                              : isVisitor
                              ? "bg-white border border-slate-200 text-slate-900 rounded-bl-none shadow-xs"
                              : "bg-slate-100 text-slate-800 rounded-bl-none"
                          }`}
                        >
                          {m.text}
                        </div>
                      </div>
                    );
                  })
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Jump to bottom shortcut */}
              {showScrollBottom && (
                <div className="relative">
                  <button
                    onClick={() => scrollToBottom(true)}
                    className="absolute -top-10 right-4 px-3 py-1 bg-white border border-slate-200 rounded-full shadow-md text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1"
                  >
                    <ArrowDown className="w-3.5 h-3.5 text-[#0c758d]" />
                    <span>Latest Messages</span>
                  </button>
                </div>
              )}

              {/* Admin Reply Composer Bar */}
              <form
                onSubmit={handleSendReply}
                className="p-3 border-t border-slate-200 bg-white flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  placeholder="Reply directly to customer..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  disabled={isSubmitting}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim() || isSubmitting}
                  className="px-4 py-2 rounded-full bg-[#0c758d] hover:bg-[#095f73] text-white text-xs font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Reply</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-2">
              <MessageSquare className="w-10 h-10 opacity-30" />
              <p className="text-sm font-medium">Select a conversation from the left to view messages.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
