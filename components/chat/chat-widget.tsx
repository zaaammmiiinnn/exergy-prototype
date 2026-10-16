"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MessageSquare, X, Send, Bot, User, ArrowRight, Phone, RotateCcw } from "lucide-react";
import { chatQABankSeed } from "@/content/seed/chatbot";
import { servicesSeed } from "@/content/seed/services";
import { industriesSeed } from "@/content/seed/industries";

interface Message {
  id: string;
  sender: "bot" | "visitor";
  text: string;
  quickReplies?: { label: string; action: string }[];
}

const STORAGE_KEY = "exergy_chat_token_v1";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initialize welcome message with menu
      initWelcomeMenu();
    }
    scrollToBottom();
  }, [isOpen, messages]);

  const initWelcomeMenu = () => {
    const welcomeMsg: Message = {
      id: "m-init",
      sender: "bot",
      text: "Welcome to Exergy Solutions. I am your automated engineering assistant. How can we optimize your plant today?\n\n1. Services Overview\n2. Industries Served\n3. Request an Assessment\n4. Frequently Asked Questions\n5. About Our Physics Approach\n6. Talk to a Human Specialist",
      quickReplies: [
        { label: "1. Services", action: "menu_services" },
        { label: "2. Industries", action: "menu_industries" },
        { label: "3. Request Assessment", action: "action_assessment" },
        { label: "4. FAQs", action: "menu_faqs" },
        { label: "5. Approach", action: "menu_approach" },
        { label: "6. Talk to a Human", action: "action_human" },
      ],
    };
    setMessages([welcomeMsg]);
  };

  const handleAction = (action: string) => {
    if (action === "menu_main" || action === "0") {
      initWelcomeMenu();
      return;
    }

    if (action === "menu_services" || action === "1") {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), sender: "visitor", text: "Services" },
        {
          id: crypto.randomUUID(),
          sender: "bot",
          text: "We optimize 6 core industrial energy and water streams:\n\n• Cooling optimization (Chilled water & refrigeration)\n• Heating & steam (Boilers & heat recovery)\n• Drying processes (Thermal & mechanical dewatering)\n• Water quality (Desalination & effluent reuse)\n• Waste-heat recovery (ORC & cascading)\n• Process integration (Plant-wide pinch analysis)",
          quickReplies: [
            { label: "Cooling Details", action: "srv_cooling" },
            { label: "Heating Details", action: "srv_heating" },
            { label: "Water Quality Details", action: "srv_water" },
            { label: "Main Menu", action: "menu_main" },
            { label: "Talk to Human", action: "action_human" },
          ],
        },
      ]);
      return;
    }

    if (action === "menu_industries" || action === "2") {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), sender: "visitor", text: "Industries" },
        {
          id: crypto.randomUUID(),
          sender: "bot",
          text: "We specialize in heavy operations:\n\n1. Paper Mills\n2. Processing (Food & Chemical)\n3. Petroleum & Refining\n4. Commercial Buildings\n5. Hospitality\n6. Healthcare & Cleanrooms\n\nWhere energy and water are mission-critical.",
          quickReplies: [
            { label: "Book Assessment", action: "action_assessment" },
            { label: "Main Menu", action: "menu_main" },
            { label: "Talk to Human", action: "action_human" },
          ],
        },
      ]);
      return;
    }

    if (action === "action_assessment" || action === "3") {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), sender: "visitor", text: "Request Assessment" },
        {
          id: crypto.randomUUID(),
          sender: "bot",
          text: "You can book our comprehensive 4-step thermodynamic assessment online. We reply within one business day with preliminary benchmarks.",
          quickReplies: [
            { label: "Launch Assessment Form", action: "link_assessment" },
            { label: "Main Menu", action: "menu_main" },
          ],
        },
      ]);
      return;
    }

    if (action === "menu_faqs" || action === "4") {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), sender: "visitor", text: "FAQs" },
        {
          id: crypto.randomUUID(),
          sender: "bot",
          text: "Common questions from plant directors:\n\n• What is exergy analysis?\n• How is this different from a normal energy audit?\n• What does guaranteed turnkey mean?\n• How much can we save? (Typical: 25–30% cut)",
          quickReplies: [
            { label: "What is Exergy?", action: "faq_exergy" },
            { label: "How much can I save?", action: "faq_savings" },
            { label: "What is the guarantee?", action: "faq_guarantee" },
            { label: "Main Menu", action: "menu_main" },
          ],
        },
      ]);
      return;
    }

    if (action === "menu_approach" || action === "5") {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), sender: "visitor", text: "Approach" },
        {
          id: crypto.randomUUID(),
          sender: "bot",
          text: "Efficiency engineered from the laws of physics. While first-law audits simply tally kilowatt-hours, we measure useful work potential (second law) and eliminate thermodynamic irreversibility.",
          quickReplies: [
            { label: "Main Menu", action: "menu_main" },
            { label: "Talk to Human", action: "action_human" },
          ],
        },
      ]);
      return;
    }

    if (action === "action_human" || action === "6") {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), sender: "visitor", text: "Talk to a human" },
        {
          id: crypto.randomUUID(),
          sender: "bot",
          text: "Our engineering operations team has been notified at neuralwaves.official@gmail.com and sarfraz@exergy-solutions.com. You can also reach our Dubai headquarters directly at 334/6D Al Wasl Street DM199 Al Satwa, Dubai UAE.",
          quickReplies: [
            { label: "Request Assessment", action: "action_assessment" },
            { label: "Main Menu", action: "menu_main" },
          ],
        },
      ]);
      return;
    }

    if (action === "faq_exergy") {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), sender: "visitor", text: "What is exergy?" },
        {
          id: crypto.randomUUID(),
          sender: "bot",
          text: "Exergy is the portion of energy that can be converted into useful mechanical or electrical work under ambient conditions. Normal audits treat all heat equally; exergy measures true thermodynamic quality.",
          quickReplies: [{ label: "Main Menu", action: "menu_main" }, { label: "Talk to Human", action: "action_human" }],
        },
      ]);
      return;
    }

    if (action === "faq_savings") {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), sender: "visitor", text: "How much can I save?" },
        {
          id: crypto.randomUUID(),
          sender: "bot",
          text: "From well-designed systems we attempt to reduce 5–10%, and in general we have experience of reducing resource utilisation by 25–30%.",
          quickReplies: [{ label: "Request Assessment", action: "action_assessment" }, { label: "Main Menu", action: "menu_main" }],
        },
      ]);
      return;
    }

    if (action === "faq_guarantee") {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), sender: "visitor", text: "What is the guarantee?" },
        {
          id: crypto.randomUUID(),
          sender: "bot",
          text: "We deliver turnkey implementation with performance guarantees, so savings are contractual, measured, and verified against baseline instrumentation.",
          quickReplies: [{ label: "Request Assessment", action: "action_assessment" }, { label: "Main Menu", action: "menu_main" }],
        },
      ]);
      return;
    }

    if (action === "link_assessment") {
      window.location.href = "/assessment";
      return;
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userInput = input.trim();
    setInput("");

    // Add user message
    const userMsg: Message = {
      id: crypto.randomUUID(),
      sender: "visitor",
      text: userInput,
    };
    setMessages((prev) => [...prev, userMsg]);

    // Deterministic keyword lookup against Q&A bank
    const normalized = userInput.toLowerCase();
    
    // Quick number routing:
    if (normalized === "1") return handleAction("menu_services");
    if (normalized === "2") return handleAction("menu_industries");
    if (normalized === "3") return handleAction("action_assessment");
    if (normalized === "4") return handleAction("menu_faqs");
    if (normalized === "5") return handleAction("menu_approach");
    if (normalized === "6" || normalized.includes("human") || normalized.includes("person") || normalized.includes("agent")) {
      return handleAction("action_human");
    }
    if (normalized === "0" || normalized === "menu" || normalized === "main") {
      return handleAction("menu_main");
    }

    // Match keywords
    let bestMatch = null;
    let maxOverlap = 0;

    for (const item of chatQABankSeed) {
      const matchCount = item.keywords.filter((kw) => normalized.includes(kw)).length;
      if (matchCount > maxOverlap) {
        maxOverlap = matchCount;
        bestMatch = item;
      }
    }

    setTimeout(() => {
      if (bestMatch && maxOverlap >= 1) {
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            sender: "bot",
            text: bestMatch.answer,
            quickReplies: [
              { label: "Request Assessment", action: "action_assessment" },
              { label: "Main Menu", action: "menu_main" },
              { label: "Talk to Human", action: "action_human" },
            ],
          },
        ]);
      } else {
        // Fallback message with menu
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            sender: "bot",
            text: "I didn't quite catch that. Here is our menu, or you can speak with a human specialist:",
            quickReplies: [
              { label: "1. Services", action: "menu_services" },
              { label: "2. Industries", action: "menu_industries" },
              { label: "3. Assessment", action: "action_assessment" },
              { label: "Talk to a Human", action: "action_human" },
            ],
          },
        ]);
      }
    }, 300);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-semibold py-3.5 px-5 rounded-full shadow-2xl hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-teal-400"
          aria-label="Open Exergy Engineering Chatbot"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-xs tracking-wide">Ask Exergy</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-navy-950 border-b border-slate-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white leading-none">Exergy Assistant</h3>
                <span className="text-[10px] text-teal-400 font-mono">Deterministic Engine (No AI)</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => initWelcomeMenu()}
                title="Restart Menu"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "visitor" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed whitespace-pre-wrap ${
                    m.sender === "visitor"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm"
                  }`}
                >
                  {m.text}
                </div>

                {/* Quick reply buttons */}
                {m.quickReplies && m.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {m.quickReplies.map((qr, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAction(qr.action)}
                        className="text-[11px] font-medium bg-slate-900 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-lg px-2.5 py-1 transition-colors"
                      >
                        {qr.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-navy-950 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type option number (1-6) or question..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
