"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MessageSquare, X, Send, Bot, RotateCcw, ArrowRight } from "lucide-react";
import {
  handleChatMessage,
  ChatSessionState,
  ChatEngineOutput,
} from "@/lib/chatbot/engine";

interface DisplayMessage {
  id: string;
  sender: "bot" | "visitor";
  text: string;
  quickReplies?: { label: string; action: string }[];
}

const STORAGE_KEY = "exergy_chat_state_v2";
const SESSION_ID_KEY = "exergy_chat_session_id_v2";
const ADMIN_STORAGE_KEY = "exergy_admin_chats_v2";

export function ChatWidget() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [sessionState, setSessionState] = useState<ChatSessionState>({
    currentNode: "main",
    mode: "menu",
    fallbackCount: 0,
  });
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize or restore session ID and chat state safely
  useEffect(() => {
    try {
      let currentSessionId = localStorage.getItem(SESSION_ID_KEY);
      if (!currentSessionId) {
        currentSessionId = crypto.randomUUID();
        localStorage.setItem(SESSION_ID_KEY, currentSessionId);
      }
      setSessionId(currentSessionId);

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.messages && parsed.messages.length > 0) {
          setMessages(parsed.messages);
          if (parsed.state) setSessionState(parsed.state);
          return;
        }
      }
    } catch {
      // storage quota or blocked
    }
  }, []);

  // Save chat state and sync to admin queue safely
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ messages: messages.slice(-30), state: sessionState })
        );

        // Sync with admin chat desk
        const existingAdmin = localStorage.getItem(ADMIN_STORAGE_KEY);
        let adminSessions = existingAdmin ? JSON.parse(existingAdmin) : [];
        if (!Array.isArray(adminSessions)) adminSessions = [];

        const visitorName = sessionState.visitorName || "Website Visitor";
        const visitorEmail = sessionState.visitorEmail || undefined;
        const company = sessionState.visitorCompany || "Prospective Industrial Client";
        const isEscalated =
          sessionState.mode.startsWith("capture_") ||
          sessionState.currentNode === "handoff";

        const formattedMessages = messages.map((m, idx) => ({
          id: m.id || `m-${idx}`,
          sender: (m.sender === "visitor" ? "visitor" : "bot") as "visitor" | "bot",
          text: m.text,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }));

        const cleanSessionId = sessionId
          ? `CHAT-${sessionId.slice(0, 8).toUpperCase()}`
          : "CHAT-LIVE";

        const currentSessionObj = {
          id: cleanSessionId,
          visitor: visitorName,
          company: company,
          sector: "Industrial Energy & Water Operations",
          email: visitorEmail,
          status: isEscalated ? ("needs_human" as const) : ("bot_resolved" as const),
          lastMessageTime: "Just now",
          unread: true,
          messages: formattedMessages,
        };

        const existingIdx = adminSessions.findIndex(
          (s: any) => s.id === currentSessionObj.id
        );
        if (existingIdx >= 0) {
          adminSessions[existingIdx] = {
            ...adminSessions[existingIdx],
            ...currentSessionObj,
          };
        } else {
          adminSessions.unshift(currentSessionObj);
        }

        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(adminSessions.slice(0, 20)));
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("exergy-chats-updated"));
        }
      } catch {
        // storage blocked
      }
    }
  }, [messages, sessionState, sessionId]);

  // Initial welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initial = handleChatMessage(sessionState, "0");
      setMessages([
        {
          id: "m-welcome",
          sender: "bot",
          text: initial.reply,
          quickReplies: initial.quickReplies,
        },
      ]);
      setSessionState(initial.nextState);
    }
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isOpen, messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const dispatchInput = async (text: string) => {
    if (!text.trim() || isTyping) return;

    // Direct client navigation actions
    if (text === "start_assessment" || text === "assessment") {
      router.push("/assessment");
      return;
    }
    if (text === "open_portal" || text === "track") {
      router.push("/portal");
      return;
    }

    const userMessage: DisplayMessage = {
      id: crypto.randomUUID(),
      sender: "visitor",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Compute deterministic local reply
    const localOutput: ChatEngineOutput = handleChatMessage(sessionState, text);

    // Background sync with API route (persists message, triggers lead email if captured)
    try {
      fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          input: text,
          state: sessionState,
          leadData: localOutput.leadPayload,
        }),
      }).catch(() => {
        // Silent catch for offline or non-blocking sync
      });
    } catch {
      // ignore network errors
    }

    // Realistic typing delay for smooth UX
    setTimeout(() => {
      const botMessage: DisplayMessage = {
        id: crypto.randomUUID(),
        sender: "bot",
        text: localOutput.reply,
        quickReplies: localOutput.quickReplies,
      };

      setMessages((prev) => [...prev, botMessage]);
      setSessionState(localOutput.nextState);
      setIsTyping(false);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }, 380);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const currentInput = input;
    setInput("");
    dispatchInput(currentInput);
  };

  const resetChat = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      const newId = crypto.randomUUID();
      localStorage.setItem(SESSION_ID_KEY, newId);
      setSessionId(newId);
    } catch {}

    const initial = handleChatMessage(
      { currentNode: "main", mode: "menu", fallbackCount: 0 },
      "0"
    );
    setMessages([
      {
        id: "m-welcome",
        sender: "bot",
        text: initial.reply,
        quickReplies: initial.quickReplies,
      },
    ]);
    setSessionState(initial.nextState);
    setIsTyping(false);
  };

  // Helper to render text with clickable links (e.g. /portal, /assessment, emails)
  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\/[a-zA-Z0-9\-_]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g);
    return parts.map((part, index) => {
      if (part === "/portal" || part === "/track" || part === "/assessment" || part === "/services" || part === "/industries") {
        return (
          <Link
            key={index}
            href={part}
            className="underline font-semibold text-[#0c758d] hover:text-[#095f73] transition-colors"
          >
            {part}
          </Link>
        );
      }
      if (part.includes("@")) {
        return (
          <a
            key={index}
            href={`mailto:${part}`}
            className="underline font-medium text-[#0c758d] hover:text-[#095f73] transition-colors"
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 bg-[#0c758d] hover:bg-[#095f73] text-white font-semibold py-3 px-4 sm:py-3.5 sm:px-5 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-[#0c758d]/30"
          aria-label="Open Exergy Engineering Chatbot"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white animate-pulse" />
          </div>
          <span className="text-xs font-sans tracking-wide">Ask Exergy</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[calc(100vw-2.5rem)] sm:w-[400px] h-[520px] max-h-[82vh] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-slate-50/95 border-b border-slate-200 p-3.5 sm:p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-teal-50 text-[#0c758d] border border-teal-200 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-heading font-bold text-slate-900 leading-none">
                    Exergy Assistant
                  </h3>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  Dubai Engineering Desk • Verified Engine
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Restart Menu"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
                aria-label="Restart chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div ref={messagesContainerRef} className="flex-1 min-h-0 p-3.5 sm:p-4 overflow-y-auto overscroll-contain space-y-3.5 text-xs bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === "visitor" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[88%] sm:max-w-[85%] leading-relaxed whitespace-pre-wrap font-sans ${
                    m.sender === "visitor"
                      ? "bg-[#0c758d] text-white rounded-br-none shadow-xs"
                      : "bg-white border border-slate-200/80 text-slate-800 rounded-bl-none shadow-xs"
                  }`}
                >
                  {renderFormattedText(m.text)}
                </div>

                {/* Quick reply buttons */}
                {m.quickReplies && m.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {m.quickReplies.map((qr, idx) => (
                      <button
                        key={idx}
                        onClick={() => dispatchInput(qr.action)}
                        className="inline-flex items-center gap-1 text-[11px] font-medium bg-white hover:bg-teal-50 text-[#0c758d] border border-teal-200 rounded-full px-3 py-1 transition-colors shadow-xs active:scale-95"
                      >
                        <span>{qr.label}</span>
                        {(qr.action === "assessment" || qr.action === "open_portal" || qr.action === "track") && (
                          <ArrowRight className="w-3 h-3 text-[#0c758d]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-slate-200/80 text-slate-500 w-fit rounded-bl-none shadow-xs">
                <span className="w-1.5 h-1.5 bg-[#0c758d] rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-[#0c758d] rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-[#0c758d] rounded-full animate-bounce" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleFormSubmit}
            className="p-3 border-t border-slate-200 bg-white flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                sessionState.mode === "capture_name"
                  ? "Type your full name..."
                  : sessionState.mode === "capture_email"
                  ? "Type your work email..."
                  : sessionState.mode === "capture_company"
                  ? "Type your company & process challenge..."
                  : "Type option (1-7), question, or 'menu'..."
              }
              disabled={isTyping}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0c758d] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2 rounded-full bg-[#0c758d] hover:bg-[#095f73] text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
