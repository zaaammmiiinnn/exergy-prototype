import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, MessageSquare, X, Send, UserCheck, Sparkles, AlertCircle, 
  ChevronDown, Phone, Mail, User, CheckCircle2, RefreshCw 
} from 'lucide-react';
import { api } from '../api/client';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! I am Exergy's AI Engineering Assistant. Ask me about our cooling, steam, drying, or water efficiency solutions, or our 4-step methodology.",
      canEscalate: false,
      suggestions: [
        'How does Cooling Optimization work?',
        'Explain the Diagnose, Model, Design, Implement approach',
        'Which industries do you serve?',
        'What is Waste-Heat Recovery?'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  
  // Escalation Modal / Inline state
  const [isEscalating, setIsEscalating] = useState(false);
  const [escalateForm, setEscalateForm] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [escalateSuccess, setEscalateSuccess] = useState(false);
  const [escalateLoading, setEscalateLoading] = useState(false);
  const [escalateError, setEscalateError] = useState('');

  const messagesEndRef = useRef(null);

  useEffect(() => {
    let currentSession = sessionStorage.getItem('exergy_chat_session');
    if (!currentSession) {
      currentSession = 'sess_' + Math.random().toString(36).substring(2, 11);
      sessionStorage.setItem('exergy_chat_session', currentSession);
    }
    setSessionId(currentSession);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isEscalating]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsgId = 'msg_' + Date.now();
    const newMessages = [
      ...messages,
      { id: userMsgId, sender: 'user', text: query }
    ];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const data = await api.sendChatMessage(query, sessionId);
      setMessages([
        ...newMessages,
        {
          id: 'bot_' + Date.now(),
          sender: 'bot',
          text: data.answer,
          topic: data.topic,
          confidence: data.confidence,
          canEscalate: data.can_escalate,
          suggestions: data.suggestions || []
        }
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages([
        ...newMessages,
        {
          id: 'bot_' + Date.now(),
          sender: 'bot',
          text: "I encountered a network issue reaching our knowledge base. Please click below to connect with an engineering specialist directly.",
          canEscalate: true,
          suggestions: ['Connect to Agent']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleEscalateSubmit = async (e) => {
    e.preventDefault();
    if (!escalateForm.name || !escalateForm.phone) {
      setEscalateError('Please provide both your name and phone number.');
      return;
    }

    setEscalateLoading(true);
    setEscalateError('');

    try {
      const payload = {
        session_id: sessionId,
        name: escalateForm.name,
        phone: escalateForm.phone,
        email: escalateForm.email,
        reason: 'AI Chatbot Priority Escalation',
        notes: escalateForm.notes || 'Inquired through Exergy AI assistant widget'
      };

      await api.escalateChat(payload);
      setEscalateSuccess(true);
      setTimeout(() => {
        setIsEscalating(false);
        setEscalateSuccess(false);
        setEscalateForm({ name: '', phone: '', email: '', notes: '' });
        setMessages((prev) => [
          ...prev,
          {
            id: 'escalate_ack_' + Date.now(),
            sender: 'bot',
            text: `✅ Request received, ${payload.name}! A senior Exergy Solutions engineer has been assigned and will call you at ${payload.phone} shortly.`,
            canEscalate: false,
            suggestions: ['What services do you offer?', 'Explore Methodology']
          }
        ]);
      }, 2500);
    } catch (err) {
      setEscalateError(err.message || 'Failed to submit escalation');
    } finally {
      setEscalateLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Widget Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-14 h-14 rounded-full bg-[#0c758d] hover:bg-[#095f73] text-white flex items-center justify-center shadow-xl shadow-teal-900/25 hover:scale-105 active:scale-95 transition-all duration-300 group"
          aria-label="Open Exergy AI Chatbot"
        >
          <Bot className="w-7 h-7 text-white" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#30a66a] border-2 border-white"></span>
          </span>
        </button>
      )}

      {/* Chat Window Container */}
      {isOpen && (
        <div className="w-[380px] sm:w-[420px] h-[580px] max-h-[85vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Header */}
          <div className="px-5 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0c758d]/10 text-[#0c758d] flex items-center justify-center shadow-xs">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-sm text-slate-900 font-display">
                    Exergy AI Assistant
                  </h3>
                  <span className="flex h-2 w-2 rounded-full bg-[#30a66a] animate-pulse"></span>
                </div>
                <p className="text-[11px] text-[#0c758d] font-medium">
                  Thermodynamic & Water Knowledge RAG
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#0c758d] text-white font-medium rounded-br-none shadow-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* If bot response includes topic tag */}
                {msg.sender === 'bot' && msg.topic && msg.topic !== 'Greeting' && (
                  <span className="text-[10px] text-slate-400 mt-1 ml-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#30a66a]" />
                    <span>Topic: {msg.topic}</span>
                  </span>
                )}

                {/* Connect to Agent Button */}
                {msg.sender === 'bot' && msg.canEscalate && !isEscalating && (
                  <div className="mt-2.5 ml-1">
                    <button
                      onClick={() => setIsEscalating(true)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-[#30a66a] border border-emerald-200 hover:bg-emerald-100 transition-all shadow-xs"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-[#30a66a]" />
                      <span>Connect to Agent</span>
                    </button>
                  </div>
                )}

                {/* Suggested prompt chips */}
                {msg.sender === 'bot' && msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2.5 ml-1">
                    {msg.suggestions.map((suggestion, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => {
                          if (suggestion === 'Connect to Agent') {
                            setIsEscalating(true);
                          } else {
                            handleSend(suggestion);
                          }
                        }}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 text-[#0c758d] border border-slate-200 hover:border-[#30a66a] transition-all text-left shadow-2xs"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-slate-500 text-xs py-2 ml-1">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#0c758d]" />
                <span>Searching Exergy knowledge base...</span>
              </div>
            )}

            {/* Escalation Form Overlay / Section */}
            {isEscalating && (
              <div className="p-4 rounded-2xl bg-white border border-emerald-300 shadow-md space-y-3 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-1.5 text-[#30a66a] font-semibold text-xs">
                    <UserCheck className="w-4 h-4" />
                    <span>Connect with an Engineering Specialist</span>
                  </div>
                  <button
                    onClick={() => setIsEscalating(false)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {escalateSuccess ? (
                  <div className="text-center py-4 space-y-1 text-[#30a66a]">
                    <CheckCircle2 className="w-8 h-8 mx-auto" />
                    <p className="text-xs font-semibold">Priority Lead Created!</p>
                    <p className="text-[11px] text-slate-500">Connecting you now...</p>
                  </div>
                ) : (
                  <form onSubmit={handleEscalateSubmit} className="space-y-2.5 text-xs">
                    {escalateError && (
                      <p className="text-rose-600 text-[11px]">{escalateError}</p>
                    )}
                    <div>
                      <label className="text-[10px] text-slate-600 block mb-0.5">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tariq Al-Mansoor"
                        value={escalateForm.name}
                        onChange={(e) => setEscalateForm({ ...escalateForm, name: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#30a66a] text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-600 block mb-0.5">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +971 50 123 4567"
                        value={escalateForm.phone}
                        onChange={(e) => setEscalateForm({ ...escalateForm, phone: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#30a66a] text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-600 block mb-0.5">Email (Optional)</label>
                      <input
                        type="email"
                        placeholder="name@company.com"
                        value={escalateForm.email}
                        onChange={(e) => setEscalateForm({ ...escalateForm, email: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#30a66a] text-xs"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={escalateLoading}
                      className="w-full py-2 rounded-xl bg-[#30a66a] hover:bg-emerald-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50 shadow-xs"
                    >
                      {escalateLoading ? 'Routing to Specialist...' : 'Confirm & Request Call'}
                    </button>
                  </form>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about cooling, steam, drying, water..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="flex-1 bg-slate-50 border border-slate-200 focus:border-[#0c758d] focus:bg-white rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-xl bg-[#0c758d] hover:bg-[#095f73] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
