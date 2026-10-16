"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, RotateCcw } from "lucide-react";
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

const STORAGE_KEY = "exergy_chat_state_v1";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionState, setSessionState] = useState<ChatSessionState>({
    currentNode: "main",
    mode: "menu",
    fallbackCount: 0,
  });
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Restore chat state safely
  useEffect(() => {
    try {
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

  // Save chat state safely
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ messages: messages.slice(-30), state: sessionState })
        );
      } catch {
        // storage blocked
      }
    }
  }, [messages, sessionState]);

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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isOpen, messages]);

  const dispatchInput = (text: string) => {
    if (!text.trim()) return;

    // Check special link action
    if (text === "start_assessment" || text === "assessment") {
      window.location.href = "/assessment";
      return;
    }

    const userMessage: DisplayMessage = {
      id: crypto.randomUUID(),
      sender: "visitor",
      text,
    };

    const output: ChatEngineOutput = handleChatMessage(sessionState, text);

    const botMessage: DisplayMessage = {
      id: crypto.randomUUID(),
      sender: "bot",
      text: output.reply,
      quickReplies: output.quickReplies,
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setSessionState(output.nextState);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const currentInput = input;
    setInput("");
    dispatchInput(currentInput);
  };

  const resetChat = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
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
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 border border-teal-300 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-none">Exergy Assistant</h3>
                <span className="text-[10px] text-teal-700 font-mono">Deterministic Engine (No AI)</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Restart Menu"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "visitor" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed whitespace-pre-wrap ${
                    m.sender === "visitor"
                      ? "bg-blue-600 text-white rounded-br-none shadow-sm"
                      : "bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm"
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
                        onClick={() => dispatchInput(qr.action)}
                        className="text-[11px] font-medium bg-white hover:bg-teal-50 text-teal-800 border border-teal-300/60 rounded-lg px-2.5 py-1 transition-colors shadow-xs"
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
          <form onSubmit={handleFormSubmit} className="p-3 border-t border-slate-200 bg-slate-50 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type option number (1-6) or question..."
              className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
