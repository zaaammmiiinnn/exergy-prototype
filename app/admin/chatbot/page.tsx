"use client";

import React, { useState, useEffect } from "react";
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
  Link as LinkIcon,
  RefreshCw,
  Edit2,
} from "lucide-react";
import { chatQABankSeed, QABankItem } from "@/content/seed/chatbot";
import { handleChatMessage } from "@/lib/chatbot/engine";

export default function AdminChatbotPage() {
  const [qaList, setQaList] = useState<QABankItem[]>(chatQABankSeed);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // New item form state
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newKeywords, setNewKeywords] = useState("");
  const [newSynonyms, setNewSynonyms] = useState("");
  const [newCategory, setNewCategory] = useState("general");
  const [newSourcePage, setNewSourcePage] = useState("Services");
  const [newDestinationUrl, setNewDestinationUrl] = useState("");
  const [newPriority, setNewPriority] = useState<number>(5);

  // Interactive Matcher Sandbox
  const [testInput, setTestInput] = useState("");
  const [testResult, setTestResult] = useState<any>(null);

  // Load from backend API
  const loadKnowledge = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/chatbot/knowledge");
      const data = await res.json();
      if (data.success && Array.isArray(data.knowledge) && data.knowledge.length > 0) {
        setQaList(data.knowledge);
      }
    } catch (err) {
      console.warn("[LOAD KNOWLEDGE ERROR]", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadKnowledge();
  }, []);

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

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    const keywordsArray = newKeywords
      .split(",")
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);

    const synonymsArray = newSynonyms
      .split(",")
      .map((k) => k.trim().toLowerCase())
      .filter(Boolean);

    const payload = {
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
      keywords: keywordsArray.length > 0 ? keywordsArray : [newQuestion.slice(0, 10).toLowerCase()],
      synonyms: synonymsArray,
      category: newCategory,
      source_page: newSourcePage.trim() || "General",
      destination_url: newDestinationUrl.trim() || undefined,
      priority: newPriority,
      is_active: true,
    };

    try {
      const res = await fetch("/api/admin/chatbot/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "add", item: payload }),
      });
      const data = await res.json();
      if (data.success && data.item) {
        setQaList((prev) => [data.item, ...prev]);
      }
    } catch {
      // Local fallback
      const localItem: QABankItem = {
        id: `qa-${Date.now()}`,
        ...payload,
      };
      setQaList((prev) => [localItem, ...prev]);
    }

    setIsAddModalOpen(false);
    setNewQuestion("");
    setNewAnswer("");
    setNewKeywords("");
    setNewSynonyms("");
    setNewDestinationUrl("");
  };

  const handleDeleteEntry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ entry?")) return;
    try {
      await fetch("/api/admin/chatbot/knowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id }),
      });
    } catch {}
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
              Chatbot Knowledge Management
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-teal-50 text-[#0c758d] border border-teal-200/70 text-xs font-mono font-bold">
              Database-Backed Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Manage FAQs, keywords, synonyms, and section navigation links. Updates take effect immediately.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadKnowledge}
            className="p-2 text-slate-500 hover:text-slate-900 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors shadow-xs"
            title="Refresh from Database"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0c758d] text-white text-xs font-semibold hover:bg-[#09586a] transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Knowledge Entry</span>
          </button>
        </div>
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
            Pre-approved thermodynamic answers with explicit source & navigation attribution.
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
          <span className="text-[10px] text-slate-400 font-mono">
            Test inquiries before publishing
          </span>
        </div>

        <form onSubmit={handleRunTest} className="flex gap-2">
          <input
            type="text"
            placeholder="Test customer question (e.g. 'How much does an assessment cost?', 'cooling', 'pricing')..."
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-400 font-mono"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Test Match</span>
          </button>
        </form>

        {testResult && (
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2.5 text-xs font-mono">
            <div className="flex items-center justify-between text-teal-400">
              <span className="font-bold">Engine Response:</span>
              <span className="text-[10px] text-slate-400">
                Mode: {testResult.nextState?.mode || "qa"}
              </span>
            </div>
            <p className="text-slate-200 whitespace-pre-wrap leading-relaxed font-sans text-xs">
              {testResult.reply}
            </p>
            {testResult.navigationLink && (
              <div className="text-[11px] text-teal-300 font-sans">
                Navigation Link: <span className="font-bold underline">{testResult.navigationLink.url}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto text-xs">
          <span className="text-slate-500 text-xs shrink-0">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize shrink-0 transition-colors ${
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

      {/* Knowledge Base Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Question</th>
                <th className="py-3 px-4">Answer & Source</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Keywords</th>
                <th className="py-3 px-4">Destination Link</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQA.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No matching FAQ entries found.
                  </td>
                </tr>
              ) : (
                filteredQA.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-xs">
                      {item.question}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-sm">
                      <p className="line-clamp-2">{item.answer}</p>
                      <span className="text-[10px] text-slate-400 mt-0.5 block font-mono">
                        Source: {item.source_page}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-semibold capitalize">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {item.keywords.slice(0, 4).map((kw, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 rounded bg-teal-50 text-[#0c758d] text-[10px] font-mono"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[11px] font-mono text-slate-500">
                      {item.destination_url ? (
                        <span className="text-[#0c758d] underline">{item.destination_url}</span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDeleteEntry(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Delete FAQ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Knowledge Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-heading font-bold text-base text-slate-900">
                Add Knowledge Base FAQ
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddEntry} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Question</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. What is the turnkey implementation warranty?"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Answer</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Accurate, pre-approved thermodynamic answer..."
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0c758d] capitalize"
                  >
                    <option value="general">General</option>
                    <option value="services">Services</option>
                    <option value="approach">Approach</option>
                    <option value="benefits">Benefits</option>
                    <option value="pricing">Pricing</option>
                    <option value="contact">Contact</option>
                    <option value="industries">Industries</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Destination URL</label>
                  <input
                    type="text"
                    placeholder="e.g. /services#cooling"
                    value={newDestinationUrl}
                    onChange={(e) => setNewDestinationUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Keywords (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. warranty, turnkey, guarantee, contract"
                  value={newKeywords}
                  onChange={(e) => setNewKeywords(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Synonyms / Phrases (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. performance warranty, guarantee terms"
                  value={newSynonyms}
                  onChange={(e) => setNewSynonyms(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0c758d] text-white rounded-xl font-semibold hover:bg-[#09586a]"
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
