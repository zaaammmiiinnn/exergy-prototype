"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Plus,
  ArrowRight,
  ExternalLink,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Trash2,
  Edit2,
  RefreshCw,
  Factory,
  ShieldCheck,
  Flame,
  Droplets,
  Layers,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import {
  fetchAdminIndustriesAction,
  createIndustryAction,
  updateIndustryAction,
  deleteIndustryAction,
  CreateIndustryInput,
} from "@/app/actions/industries";
import { IndustryItem } from "@/lib/industries/industry";

export default function AdminIndustriesPage() {
  const [industries, setIndustries] = useState<IndustryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    summary: "",
    body_md: "",
    challengesText: "",
    hero_image: "https://images.hostinger.com/2025f758-1013-44c6-b723-1117c9aa2810.png",
    position: 1,
    is_published: true,
  });

  const loadIndustries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchAdminIndustriesAction();
      if (res.success && res.industries) {
        setIndustries(res.industries);
      } else {
        setFeedback({ type: "error", message: res.error || "Failed to load industries." });
      }
    } catch {
      setFeedback({ type: "error", message: "Failed to connect to Supabase database." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadIndustries();
  }, [loadIndustries]);

  const openCreateModal = () => {
    setEditingSlug(null);
    setFormData({
      name: "",
      slug: "",
      summary: "",
      body_md: "",
      challengesText: "High-temperature exhaust thermal losses\nSteam condensate return contamination\nExtreme peak utility demand during batch cycles",
      hero_image: "https://images.hostinger.com/2025f758-1013-44c6-b723-1117c9aa2810.png",
      position: industries.length + 1,
      is_published: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (ind: IndustryItem) => {
    setEditingSlug(ind.slug);
    setFormData({
      name: ind.name,
      slug: ind.slug,
      summary: ind.summary,
      body_md: ind.body_md,
      challengesText: ind.challenges?.join("\n") || "",
      hero_image: ind.hero_image,
      position: ind.position,
      is_published: ind.is_published,
    });
    setModalOpen(true);
  };

  const handleNameChange = (name: string) => {
    if (!editingSlug) {
      const autoSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, name, slug: autoSlug }));
    } else {
      setFormData((prev) => ({ ...prev, name }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    const challenges = formData.challengesText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      if (editingSlug) {
        // Update existing industry
        const res = await updateIndustryAction(editingSlug, {
          name: formData.name,
          summary: formData.summary,
          body_md: formData.body_md,
          challenges,
          hero_image: formData.hero_image || undefined,
          position: formData.position,
          is_published: formData.is_published,
        });

        if (res.success) {
          setFeedback({
            type: "success",
            message: `Industry "${formData.name}" updated successfully and reflected on live site.`,
          });
          setModalOpen(false);
          await loadIndustries();
        } else {
          setFeedback({ type: "error", message: res.error || "Failed to update industry." });
        }
      } else {
        // Create new industry
        const res = await createIndustryAction({
          name: formData.name,
          slug: formData.slug,
          summary: formData.summary,
          body_md: formData.body_md,
          challenges,
          hero_image: formData.hero_image || undefined,
          position: formData.position,
          is_published: formData.is_published,
        });

        if (res.success && res.industry) {
          setFeedback({
            type: "success",
            message: `New industry "${res.industry.name}" added to Supabase and published to /industries#${res.industry.slug}!`,
          });
          setModalOpen(false);
          await loadIndustries();
        } else {
          setFeedback({ type: "error", message: res.error || "Failed to create industry." });
        }
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err?.message || "Operation failed." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string, name: string) => {
    if (!window.confirm(`Are you sure you want to remove the industry "${name}" (/industries#${slug})?`)) {
      return;
    }

    try {
      const res = await deleteIndustryAction(slug);
      if (res.success) {
        setFeedback({ type: "success", message: `Industry "${name}" deleted.` });
        setIndustries((prev) => prev.filter((ind) => ind.slug !== slug));
      } else {
        setFeedback({ type: "error", message: res.error || "Could not delete industry." });
      }
    } catch {
      setFeedback({ type: "error", message: "Network error deleting industry." });
    }
  };

  const filteredIndustries = industries.filter((ind) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      !q ||
      ind.name.toLowerCase().includes(q) ||
      ind.slug.toLowerCase().includes(q) ||
      ind.summary.toLowerCase().includes(q) ||
      ind.challenges?.some((c) => c.toLowerCase().includes(q))
    );
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header Row with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-heading font-extrabold text-2xl text-[#12232b] tracking-tight">
              Target Industries
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-50 text-[#0c758d] border border-teal-200/70 text-[10px] font-mono font-bold uppercase tracking-wider">
              Live Sectors
            </span>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Industrial sectors configured for assessment scoring, case studies, and engineering solutions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadIndustries}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-teal-200/80 bg-teal-50/70 hover:bg-teal-100 text-[#0c758d] font-mono text-xs font-semibold transition-all shadow-2xs cursor-pointer disabled:opacity-50"
            title="Refresh Industries from Supabase"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-teal-600" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0c758d] hover:bg-[#095f73] text-white font-sans text-xs uppercase tracking-wider font-semibold transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Industry</span>
          </button>
        </div>
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-mono transition-all animate-in fade-in ${
            feedback.type === "success"
              ? "bg-teal-50 border-teal-200 text-[#0c758d]"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-slate-400 hover:text-slate-700 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search industries by name, slug, summary, or challenges..."
            className="w-full bg-slate-50/70 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 font-mono transition-all"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">
            Total: <strong className="text-slate-900">{industries.length}</strong>
          </span>
          <span className="px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0c758d]">
            Active: <strong>{industries.filter((i) => i.is_published).length}</strong>
          </span>
        </div>
      </div>

      {/* Industries Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#0c758d] border-t-transparent animate-spin" />
          <span className="text-xs font-mono text-slate-500">Loading active industries...</span>
        </div>
      ) : filteredIndustries.length === 0 ? (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl space-y-3">
          <Factory className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="font-heading font-bold text-slate-800">No industries found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto font-mono">
            No industrial sectors matched your search query. Try clearing filters or create a new industry.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredIndustries.map((ind) => (
            <div
              key={ind.slug}
              className="bg-white border border-slate-200/90 hover:border-[#0c758d] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#0c758d] border border-teal-200/80 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Factory className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-semibold text-[#0c758d] bg-teal-50/70 border border-teal-200/60 px-2 py-0.5 rounded-full">
                        #{ind.slug}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                      ind.is_published
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    {ind.is_published ? "Active" : "Draft"}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-base text-[#12232b] group-hover:text-[#0c758d] transition-colors">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {ind.summary}
                  </p>
                </div>

                {/* Challenges preview */}
                {ind.challenges && ind.challenges.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold tracking-wider block">
                      Key Challenges Solved:
                    </span>
                    <div className="space-y-1">
                      {ind.challenges.slice(0, 2).map((c, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700 font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span className="truncate">{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link
                  href={`/industries#${ind.slug}`}
                  target="_blank"
                  className="text-xs font-semibold text-[#0c758d] hover:text-[#095f73] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Public View</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(ind)}
                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
                    title="Edit Industry"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(ind.slug, ind.name)}
                    className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer"
                    title="Delete Industry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Industry Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-7 space-y-5 text-slate-900 animate-in fade-in duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs text-[#0c758d] font-bold uppercase tracking-wider">
                  {editingSlug ? `Editing Sector: #${editingSlug}` : "New Sector Onboarding"}
                </span>
                <h2 className="text-xl font-heading font-extrabold text-[#12232b] mt-1">
                  {editingSlug ? `Update ${formData.name}` : "Add Target Industry"}
                </h2>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Industry Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="e.g. Dairy & Beverage Processing"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    URL Slug Identifier <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    disabled={Boolean(editingSlug)}
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. dairy-beverage"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 font-mono disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Short Value Proposition / Summary <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="e.g. Thermal pinch recovery and clean steam exergy balancing across continuous lines."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Detailed Thermodynamic Description (Markdown Supported) <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.body_md}
                  onChange={(e) => setFormData({ ...formData, body_md: e.target.value })}
                  placeholder="Describe where useful exergy is destroyed in this sector and how Exergy Solutions' second-law analysis achieves guaranteed capex/opex reductions..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 font-mono leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Primary Thermodynamic Challenges Solved (One per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.challengesText}
                  onChange={(e) => setFormData({ ...formData, challengesText: e.target.value })}
                  placeholder="High-temperature furnace stack heat discharge&#10;Condensate return contamination and heat drop&#10;Low Delta-T syndrome in central cooling loop"
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 font-mono leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Hero Showcase Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.hero_image}
                    onChange={(e) => setFormData({ ...formData, hero_image: e.target.value })}
                    placeholder="https://images.hostinger.com/..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Display Position / Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: parseInt(e.target.value) || 1 })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="publishedCheckbox"
                  checked={formData.is_published}
                  onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="publishedCheckbox" className="text-slate-800 font-medium cursor-pointer">
                  Publish sector publicly on main website (/industries & /assessment)
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-[#0c758d] hover:bg-[#095f73] text-white font-mono text-xs font-semibold transition-colors shadow-xs cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                >
                  {saving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingSlug ? "Update Sector" : "Create Industry"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
