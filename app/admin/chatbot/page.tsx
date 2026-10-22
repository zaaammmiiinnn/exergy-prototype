"use client";

import React, { useState } from "react";
import {
  Bot,
  Plus,
  CheckCircle2,
  Search,
  BookOpen,
  Trash2,
  Tag,
  Sparkles,
  Terminal,
  Send,
  HelpCircle,
  X,
} from "lucide-react";
import { chatQABankSeed, QABankItem } from "@/content/seed/chatbot";
import { handleChatMessage } from "@/lib/chatbot/engine";

export default function AdminChatbotPage() {
  const [qaList, setQaList] = useState<QABankItem[]>(chatQABankSeed);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New item form state
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newKeywords, setNewKeywords] = useState("");
  const [newCategory, setNewCategory] = useState("general");
  const [newSourcePage, setNewSourcePage] = useState("Services");

  // Interactive Matcher Sandbox
  const [testInput, setTestInput] = useState("");
  const [testResult, setTestResult] = useState<any>(null);

  const categories = [
    "all",
    ...Array.from(new Set(qaList.map((item) => item.category))),
  ];

  const filteredQA = qaList.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keywords.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    const keywordsArray = newKeywords
      .split(",")
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);

    const newItem: QABankItem = {
      id: `qa-${Date.now()}`,
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
      keywords: keywordsArray.length > 0 ? keywordsArray : [newQuestion.slice(0, 10).toLowerCase()],
      category: newCategory,
      source_page: newSourcePage.trim() || "General",
    };

    setQaList((prev) => [newItem, ...prev]);
    setIsAddModalOpen(false);
    setNewQuestion("");
    setNewAnswer("");
    setNewKeywords("");
  };

  const handleDeleteEntry = (id: string) => {
    setQaList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRunTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testInput.trim()) return;

    const output = handleChatMessage(
      { currentNode: "main", mode: "menu", fallbackCount: 0 },
      testInput,
      qaList
    );
    setTestResult(output);
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-heading font-extrabold text-2xl text-[#12232b] tracking-tight">
              Chatbot Knowledge & Rules
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-teal-50 text-[#0c758d] border border-teal-200/70 text-xs font-mono font-bold">
              Deterministic Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Zero LLM hallucination — keyword matching, Q&A bank, and human handoff rules
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0c758d] text-white text-xs font-semibold hover:bg-[#09586a] transition-all shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Q&A Entry</span>
        </button>
      </div>

      {/* Core Rules Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-800 font-bold">
            <span>Deterministic Matcher</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-slate-500 font-sans text-xs">
            100% predictable rule routing with greetings, menus, and whole-word keyword boundaries.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-800 font-bold">
            <span>Human Escalation</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-slate-500 font-sans text-xs">
            Interactive multi-step visitor lead capture dispatched to operations desk in Dubai.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-800 font-bold">
            <span>Active Knowledge Entries</span>
            <span className="font-mono text-[#0c758d] font-bold">{qaList.length} Items</span>
          </div>
          <p className="text-slate-500 font-sans text-xs">
            Pre-approved thermodynamic answers with explicit source attribution.
          </p>
        </div>
      </div>

      {/* Interactive Matcher Tester / Sandbox */}
      <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-teal-400" />
            <h3 className="text-xs font-mono font-bold tracking-wider text-teal-300 uppercase">
              Live Engine Rule Tester
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Test input against current rules</span>
        </div>

        <form onSubmit={handleRunTest} className="flex gap-2">
          <input
            type="text"
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            placeholder="Type query to test (e.g. 'how much can we save', 'cooling', 'talk to human')..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#0c758d] hover:bg-[#095f73] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Test Match</span>
          </button>
        </form>

        {testResult && (
          <div className="mt-3 p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>Intent: <span className="text-teal-300 font-bold">{testResult.intent || "menu / message"}</span></span>
              <span>Next State Node: <span className="text-teal-300 font-bold">{testResult.nextState.currentNode}</span></span>
            </div>
            <div className="p-2.5 bg-slate-950 rounded border border-slate-800 text-slate-200 whitespace-pre-wrap font-sans text-xs">
              {testResult.reply}
            </div>
          </div>
        )}
      </div>

      {/* Knowledge Bank Management Section */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#0c758d]" />
            <h2 className="font-heading font-bold text-base text-[#12232b]">
              Knowledge Bank Entries ({filteredQA.length})
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions or keywords..."
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-[11px] px-2.5 py-1 rounded-full capitalize font-medium transition-colors ${
                    selectedCategory === cat
                      ? "bg-[#0c758d] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Q&A List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredQA.map((qa) => (
            <div
              key={qa.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-heading font-bold text-xs text-slate-900 leading-snug">
                    {qa.question}
                  </h4>
                  <button
                    onClick={() => handleDeleteEntry(qa.id)}
                    className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                    title="Delete Entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  {qa.answer}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
                <div className="flex flex-wrap items-center gap-1">
                  <Tag className="w-3 h-3 text-[#0c758d]" />
                  {qa.keywords.slice(0, 4).map((kw, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-600"
                    >
                      {kw}
                    </span>
                  ))}
                  {qa.keywords.length > 4 && (
                    <span className="text-slate-400">+{qa.keywords.length - 4}</span>
                  )}
                </div>
                <span className="text-slate-500 font-medium bg-slate-200/70 px-2 py-0.5 rounded">
                  Source: {qa.source_page}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Entry Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-heading font-bold text-sm text-slate-900">
                Add New Chatbot Q&A Rule
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddEntry} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Question
                </label>
                <input
                  type="text"
                  required
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="e.g. Do you support waste-heat recovery in food processing?"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Approved Answer
                </label>
                <textarea
                  required
                  rows={3}
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Enter exact technical answer..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Trigger Keywords (comma separated)
                </label>
                <input
                  type="text"
                  value={newKeywords}
                  onChange={(e) => setNewKeywords(e.target.value)}
                  placeholder="e.g. waste-heat, food, processing, pasteurization"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
                  >
                    <option value="general">General</option>
                    <option value="services">Services</option>
                    <option value="industries">Industries</option>
                    <option value="approach">Approach</option>
                    <option value="benefits">Benefits</option>
                    <option value="contact">Contact</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Source Page
                  </label>
                  <input
                    type="text"
                    value={newSourcePage}
                    onChange={(e) => setNewSourcePage(e.target.value)}
                    placeholder="e.g. Services / Waste-Heat"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#0c758d] text-white font-semibold hover:bg-[#095f73] transition-colors"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
