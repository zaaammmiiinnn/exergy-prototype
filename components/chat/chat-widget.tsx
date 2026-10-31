"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  RotateCcw,
  ArrowRight,
  User,
  ShieldCheck,
  Check,
  ExternalLink,
} from "lucide-react";
import {
  handleChatMessage,
  ChatSessionState,
  ChatEngineOutput,
} from "@/lib/chatbot/engine";

interface DisplayMessage {
  id: string;
  sender: "bot" | "visitor" | "admin" | "system";
  text: string;
  time?: string;
  navigationLink?: { label: string; url: string };
  quickReplies?: { label: string; action: string; url?: string }[];
}

const VISITOR_TOKEN_STORAGE_KEY = "exergy_chat_visitor_token_v3";
const CONVERSATION_ID_STORAGE_KEY = "exergy_chat_conversation_id_v3";

export function ChatWidget() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string>("");
  const [visitorToken, setVisitorToken] = useState<string>("");
  const [unreadCount, setUnreadCount] = useState<number>(0);
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

  // Initialize Visitor Session and load conversation from Database
  useEffect(() => {
    let storedToken = "";
    let storedConvId = "";

    try {
      storedToken = localStorage.getItem(VISITOR_TOKEN_STORAGE_KEY) || "";
      storedConvId = localStorage.getItem(CONVERSATION_ID_STORAGE_KEY) || "";
    } catch {}

    if (storedToken) setVisitorToken(storedToken);
    if (storedConvId) setConversationId(storedConvId);

    // Fetch conversation from Database
    const url = storedConvId
      ? `/api/chat/messages?conversationId=${encodeURIComponent(storedConvId)}&visitorToken=${encodeURIComponent(storedToken)}`
      : `/api/chat/messages${storedToken ? `?visitorToken=${encodeURIComponent(storedToken)}` : ""}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.conversation) {
          setConversationId(data.conversation.id);
          try {
            localStorage.setItem(CONVERSATION_ID_STORAGE_KEY, data.conversation.id);
          } catch {}

          if (data.conversation.unread_by_visitor) {
            setUnreadCount(1);
          }

          if (Array.isArray(data.messages) && data.messages.length > 0) {
            const mapped: DisplayMessage[] = data.messages.map((m: any) => {
              const d = m.created_at ? new Date(m.created_at) : new Date();
              const timeStr = !isNaN(d.getTime())
                ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                : "";

              return {
                id: m.id,
                sender: m.sender_type || (m.sender === "admin" ? "admin" : m.sender === "visitor" ? "visitor" : "bot"),
                text: m.message_content || m.body || "",
                time: timeStr,
                navigationLink: m.metadata?.navigationLink,
                quickReplies: m.metadata?.quickReplies,
              };
            });
            setMessages(mapped);
          }
        }
      })
      .catch((err) => {
        console.warn("[CHAT WIDGET INIT ERROR]", err);
      });
  }, []);

  // Poll for new admin replies every 3.5 seconds
  useEffect(() => {
    if (!conversationId) return;

    const interval = setInterval(() => {
      const markReadParam = isOpen ? "&markRead=true" : "";
      fetch(
        `/api/chat/messages?conversationId=${encodeURIComponent(conversationId)}&visitorToken=${encodeURIComponent(visitorToken)}${markReadParam}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.messages)) {
            // Check for unread admin messages when window is closed
            if (!isOpen && data.conversation?.unread_by_visitor) {
              setUnreadCount((prev) => Math.max(prev, 1));
            } else if (isOpen) {
              setUnreadCount(0);
            }

            setMessages((prev) => {
              if (data.messages.length !== prev.length) {
                return data.messages.map((m: any) => {
                  const d = m.created_at ? new Date(m.created_at) : new Date();
                  const timeStr = !isNaN(d.getTime())
                    ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    : "";

                  return {
                    id: m.id,
                    sender: m.sender_type || (m.sender === "admin" ? "admin" : m.sender === "visitor" ? "visitor" : "bot"),
                    text: m.message_content || m.body || "",
                    time: timeStr,
                    navigationLink: m.metadata?.navigationLink,
                    quickReplies: m.metadata?.quickReplies,
                  };
                });
              }
              return prev;
            });
          }
        })
        .catch(() => {});
    }, 3500);

    return () => clearInterval(interval);
  }, [conversationId, visitorToken, isOpen]);

  // Clear unread badge when opened
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      if (conversationId) {
        fetch(
          `/api/chat/messages?conversationId=${encodeURIComponent(conversationId)}&visitorToken=${encodeURIComponent(visitorToken)}&markRead=true`
        ).catch(() => {});
      }
    }
  }, [isOpen, conversationId, visitorToken]);

  // Initial welcome message if conversation is fresh
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initial = handleChatMessage(sessionState, "0");
      const d = new Date();
      const timeStr = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      setMessages([
        {
          id: "m-welcome",
          sender: "bot",
          text: initial.reply,
          time: timeStr,
          quickReplies: initial.quickReplies,
          navigationLink: initial.navigationLink,
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
  }, [isOpen, messages.length, sessionState]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Auto-scroll on new message
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  const dispatchInput = async (text: string, directUrl?: string) => {
    if (!text.trim() || isTyping) return;

    // Direct client navigation
    if (directUrl) {
      router.push(directUrl);
      return;
    }
    if (text.startsWith("nav_")) {
      const dest = text.replace("nav_", "");
      router.push(dest);
      return;
    }
    if (text === "start_assessment" || text === "assessment") {
      router.push("/assessment");
      return;
    }
    if (text === "open_portal" || text === "track") {
      router.push("/portal");
      return;
    }

    const d = new Date();
    const timeStr = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMessage: DisplayMessage = {
      id: crypto.randomUUID(),
      sender: "visitor",
      text,
      time: timeStr,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId,
          visitorToken,
          input: text,
          state: sessionState,
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (data.conversationId && data.conversationId !== conversationId) {
          setConversationId(data.conversationId);
          try {
            localStorage.setItem(CONVERSATION_ID_STORAGE_KEY, data.conversationId);
          } catch {}
        }
        if (data.visitorToken && data.visitorToken !== visitorToken) {
          setVisitorToken(data.visitorToken);
          try {
            localStorage.setItem(VISITOR_TOKEN_STORAGE_KEY, data.visitorToken);
          } catch {}
        }

        const out: ChatEngineOutput = data.output;
        const botD = new Date();
        const botTimeStr = botD.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        const botMessage: DisplayMessage = {
          id: crypto.randomUUID(),
          sender: "bot",
          text: out.reply,
          time: botTimeStr,
          quickReplies: out.quickReplies,
          navigationLink: out.navigationLink,
        };

        setMessages((prev) => [...prev, botMessage]);
        setSessionState(out.nextState);
      }
    } catch (err) {
      console.warn("[DISPATCH CHAT ERROR]", err);
      // Offline fallback: compute local answer
      const localOut = handleChatMessage(sessionState, text);
      const botMessage: DisplayMessage = {
        id: crypto.randomUUID(),
        sender: "bot",
        text: localOut.reply,
        time: timeStr,
        quickReplies: localOut.quickReplies,
        navigationLink: localOut.navigationLink,
      };
      setMessages((prev) => [...prev, botMessage]);
      setSessionState(localOut.nextState);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const currentInput = input;
    setInput("");
    dispatchInput(currentInput);
  };

  const resetChat = async () => {
    try {
      const res = await fetch("/api/chat/clear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, visitorToken }),
      });
      const data = await res.json();
      if (data.success && data.conversationId) {
        setConversationId(data.conversationId);
        try {
          localStorage.setItem(CONVERSATION_ID_STORAGE_KEY, data.conversationId);
        } catch {}
      }
    } catch {}

    const initial = handleChatMessage(
      { currentNode: "main", mode: "menu", fallbackCount: 0 },
      "0"
    );
    const d = new Date();
    const timeStr = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setMessages([
      {
        id: "m-welcome",
        sender: "bot",
        text: initial.reply,
        time: timeStr,
        quickReplies: initial.quickReplies,
        navigationLink: initial.navigationLink,
      },
    ]);
    setSessionState(initial.nextState);
    setIsTyping(false);
  };

  // Clickable links rendering within markdown text
  const renderFormattedText = (text: string) => {
    const parts = text.split(
      /(\/[a-zA-Z0-9\-_#]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g
    );
    return parts.map((part, index) => {
      if (
        part.startsWith("/") &&
        (part === "/services" ||
          part.startsWith("/services#") ||
          part.startsWith("/services/") ||
          part === "/assessment" ||
          part === "/pricing" ||
          part === "/portal" ||
          part === "/track" ||
          part === "/contact" ||
          part === "/approach" ||
          part === "/industries" ||
          part === "/privacy" ||
          part === "/terms")
      ) {
        return (
          <Link
            key={index}
            href={part === "/pricing" ? "/assessment" : part}
            className="inline-flex items-center gap-0.5 underline font-semibold text-[#0c758d] hover:text-[#095f73] transition-colors"
          >
            {part}
          </Link>
        );
      }
      if (part.includes("@") && part.includes(".")) {
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
          className="relative flex items-center gap-2.5 bg-[#0c758d] hover:bg-[#095f73] text-white font-semibold py-3 px-4 sm:py-3.5 sm:px-5 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-[#0c758d]/30"
          aria-label="Open Customer Support Chatbot"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white animate-pulse" />
          </div>
          <span className="text-xs font-sans tracking-wide">Live Support</span>

          {/* Unread Message Badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-md animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[calc(100vw-2.5rem)] sm:w-[420px] h-[560px] max-h-[85vh] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-slate-50/95 border-b border-slate-200 p-3.5 sm:p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-teal-50 text-[#0c758d] border border-teal-200 flex items-center justify-center shrink-0">
                <Bot className="w-4.5 h-4.5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-heading font-bold text-slate-900 leading-none">
                    Exergy Customer Support
                  </h3>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  Live Chat • Verified Engineering Knowledge
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Restart & Clear Conversation"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
                aria-label="Restart chat conversation"
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
          <div
            ref={messagesContainerRef}
            className="flex-1 min-h-0 p-3.5 sm:p-4 overflow-y-auto overscroll-contain space-y-3.5 text-xs bg-slate-50/50"
          >
            {messages.map((m) => {
              const isAdmin = m.sender === "admin";
              const isVisitor = m.sender === "visitor";
              const isBot = m.sender === "bot";

              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${
                    isVisitor ? "items-end" : "items-start"
                  }`}
                >
                  {/* Sender Badge for Admin */}
                  {isAdmin && (
                    <div className="flex items-center gap-1 mb-1 text-[11px] font-semibold text-emerald-700">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Exergy Support Engineer</span>
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl max-w-[88%] sm:max-w-[85%] leading-relaxed whitespace-pre-wrap font-sans ${
                      isVisitor
                        ? "bg-[#0c758d] text-white rounded-br-none shadow-xs"
                        : isAdmin
                        ? "bg-emerald-50/90 border border-emerald-200 text-emerald-950 rounded-bl-none shadow-xs"
                        : "bg-white border border-slate-200/80 text-slate-800 rounded-bl-none shadow-xs"
                    }`}
                  >
                    {renderFormattedText(m.text)}

                    {/* Navigation Link Pill inside message */}
                    {m.navigationLink && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200/60">
                        <Link
                          href={m.navigationLink.url}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0c758d] hover:bg-[#095f73] text-white text-[11px] font-semibold transition-all shadow-xs"
                        >
                          <span>{m.navigationLink.label}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Timestamp */}
                  {m.time && (
                    <span className="text-[10px] text-slate-400 mt-1 px-1">
                      {m.time}
                    </span>
                  )}

                  {/* Quick reply buttons */}
                  {m.quickReplies && m.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {m.quickReplies.map((qr, idx) => (
                        <button
                          key={idx}
                          onClick={() => dispatchInput(qr.action, qr.url)}
                          className="inline-flex items-center gap-1 text-[11px] font-medium bg-white hover:bg-teal-50 text-[#0c758d] border border-teal-200 rounded-full px-3 py-1 transition-colors shadow-xs active:scale-95"
                        >
                          <span>{qr.label}</span>
                          {(qr.action === "assessment" ||
                            qr.action === "open_portal" ||
                            qr.action === "track" ||
                            qr.url) && (
                            <ArrowRight className="w-3 h-3 text-[#0c758d]" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

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
                  ? "Type your company & requirements..."
                  : "Ask a question or select an option..."
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
