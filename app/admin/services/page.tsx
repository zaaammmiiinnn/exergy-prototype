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
  Layers,
  Trash2,
  Edit2,
  RefreshCw,
  Sparkles,
  Snowflake,
  Flame,
  Wind,
  Droplets,
  Recycle,
  Network,
  Zap,
  Gauge,
  Sun,
  Factory,
  Cpu,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import {
  fetchAdminServicesAction,
  createServiceAction,
  updateServiceAction,
  deleteServiceAction,
  CreateServiceInput,
} from "@/app/actions/services";
import { ServiceItem } from "@/lib/services/service";

const ICON_OPTIONS = [
  { value: "Snowflake", label: "Snowflake (Cooling / Cryo)", icon: Snowflake },
  { value: "Flame", label: "Flame (Heating / Steam / Thermal)", icon: Flame },
  { value: "Wind", label: "Wind (Air / Pneumatics / Ventilation)", icon: Wind },
  { value: "Droplets", label: "Droplets (Water / Desalination / ETP)", icon: Droplets },
  { value: "Recycle", label: "Recycle (Waste Heat / Regeneration)", icon: Recycle },
  { value: "Network", label: "Network (Process Integration / Pinch)", icon: Network },
  { value: "Zap", label: "Zap (Power / Electrical / Turbines)", icon: Zap },
  { value: "Gauge", label: "Gauge (Pressure / Compression / Flow)", icon: Gauge },
  { value: "Sun", label: "Sun (Solar Thermal / Drying)", icon: Sun },
  { value: "Factory", label: "Factory (Heavy Manufacturing / Steel / Cement)", icon: Factory },
  { value: "Cpu", label: "Cpu (Telemetry / Digital Automation)", icon: Cpu },
  { value: "ShieldCheck", label: "ShieldCheck (Quality / Zero-Liquid Discharge)", icon: ShieldCheck },
];

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    body_md: "",
    highlightsText: "",
    icon: "Network",
    hero_image: "",
    thermodynamic_principle: "",
    sec_kpi: "",
    roi_payback: "",
    equipment_scope_text: "",
    is_published: true,
  });

  const loadServices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchAdminServicesAction();
      if (res.success && res.services) {
        setServices(res.services);
      }
    } catch (err) {
      console.warn("Failed to load services:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const openCreateModal = () => {
    setEditingSlug(null);
    setFormData({
      title: "",
      slug: "",
      summary: "",
      body_md: "",
      highlightsText: "",
      icon: "Network",
      hero_image: "",
      thermodynamic_principle: "",
      sec_kpi: "",
      roi_payback: "",
      equipment_scope_text: "",
      is_published: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (s: ServiceItem) => {
    setEditingSlug(s.slug);
    setFormData({
      title: s.title,
      slug: s.slug,
      summary: s.summary,
      body_md: s.body_md,
      highlightsText: s.highlights ? s.highlights.join("\n") : "",
      icon: s.icon || "Network",
      hero_image: s.hero_image || "",
      thermodynamic_principle: s.thermodynamic_principle || "",
      sec_kpi: s.sec_kpi || "",
      roi_payback: s.roi_payback || "",
      equipment_scope_text: s.equipment_scope ? s.equipment_scope.join(", ") : "",
      is_published: s.is_published,
    });
    setModalOpen(true);
  };

  const handleTitleChange = (val: string) => {
    if (!editingSlug) {
      const autoSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, title: val, slug: autoSlug }));
    } else {
      setFormData((prev) => ({ ...prev, title: val }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.summary.trim() || !formData.body_md.trim()) {
      setFeedback({ type: "error", message: "Please fill in Title, Summary, and Detailed Description." });
      return;
    }

    setSaving(true);
    setFeedback(null);

    const highlights = formData.highlightsText
      .split("\n")
      .map((h) => h.trim())
      .filter(Boolean);

    const equipment_scope = formData.equipment_scope_text
      .split(",")
      .map((eq) => eq.trim())
      .filter(Boolean);

    try {
      if (editingSlug) {
        // Update existing service
        const res = await updateServiceAction(editingSlug, {
          title: formData.title,
          summary: formData.summary,
          body_md: formData.body_md,
          highlights,
          icon: formData.icon,
          hero_image: formData.hero_image || undefined,
          is_published: formData.is_published,
        });

        if (res.success) {
          setFeedback({ type: "success", message: `Service "${formData.title}" updated successfully and reflected on live site.` });
          setModalOpen(false);
          await loadServices();
        } else {
          setFeedback({ type: "error", message: res.error || "Failed to update service." });
        }
      } else {
        // Create new service
        const res = await createServiceAction({
          title: formData.title,
          slug: formData.slug,
          summary: formData.summary,
          body_md: formData.body_md,
          highlights,
          icon: formData.icon,
          hero_image: formData.hero_image || undefined,
          thermodynamic_principle: formData.thermodynamic_principle,
          sec_kpi: formData.sec_kpi,
          roi_payback: formData.roi_payback,
          equipment_scope,
          is_published: formData.is_published,
        });

        if (res.success && res.service) {
          setFeedback({
            type: "success",
            message: `New service "${res.service.title}" added to Supabase and published to /services/${res.service.slug}!`,
          });
          setModalOpen(false);
          await loadServices();
        } else {
          setFeedback({ type: "error", message: res.error || "Failed to create service." });
        }
      }
    } catch (err: any) {
      setFeedback({ type: "error", message: err?.message || "Operation failed." });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (slug: string, title: string) => {
    if (!window.confirm(`Are you sure you want to remove the service "${title}" (/services/${slug})?`)) {
      return;
    }

    try {
      const res = await deleteServiceAction(slug);
      if (res.success) {
        setFeedback({ type: "success", message: `Service "${title}" deleted.` });
        setServices((prev) => prev.filter((s) => s.slug !== slug));
      } else {
        setFeedback({ type: "error", message: res.error || "Could not delete service." });
      }
    } catch {
      setFeedback({ type: "error", message: "Network error deleting service." });
    }
  };

  const filteredServices = services.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.slug.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header Row with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-[#12232b] tracking-tight">
            Services Management
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            Active engineering thermodynamics services seeded & managed in Supabase
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadServices}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs"
            title="Refresh from Supabase"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#0c758d]" : ""}`} />
          </button>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 bg-[#0c758d] hover:bg-[#095f73] text-white px-4 py-2.5 rounded-xl font-mono text-xs font-semibold shadow-xs hover:shadow-md transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Global Feedback Banner */}
      {feedback && (
        <div
          className={`p-3.5 rounded-xl text-xs font-mono flex items-center justify-between gap-2 border animate-in fade-in duration-200 ${
            feedback.type === "success"
              ? "bg-teal-50 border-teal-300 text-teal-900"
              : "bg-red-50 border-red-300 text-red-900"
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
            className="text-slate-400 hover:text-slate-700 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Search & Counter Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search active services by title, slug or summary..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0c758d] font-mono"
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-mono px-2 text-slate-500 shrink-0">
          <span>Active Services:</span>
          <strong className="text-slate-900 font-bold bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
            {filteredServices.length}
          </strong>
        </div>
      </div>

      {/* Services Grid (Matches screenshot aesthetics with dynamic additions & actions) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((s) => (
          <div
            key={s.slug}
            className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#0c758d]">
                  /services/{s.slug}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    s.is_published
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {s.is_published ? "Active" : "Draft"}
                </span>
              </div>

              <div>
                <h3 className="font-heading font-bold text-sm text-[#12232b]">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {s.summary}
                </p>
              </div>

              {s.body_md && (
                <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-mono line-clamp-2 italic">
                  &ldquo;{s.body_md.slice(0, 95)}...&rdquo;
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link
                href={`/services/${s.slug}`}
                target="_blank"
                className="text-[#0c758d] font-semibold hover:underline inline-flex items-center gap-1.5"
              >
                <span>View Public Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openEditModal(s)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                  title="Edit service details"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(s.slug, s.title)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete service"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comprehensive Add/Edit Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-7 space-y-5 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#0c758d] font-bold">
                  {editingSlug ? "Edit Engineering Service" : "New Thermodynamic Discipline"}
                </span>
                <h2 className="text-xl font-heading font-extrabold text-[#12232b] mt-0.5">
                  {editingSlug ? `Modify /services/${editingSlug}` : "Add New Engineering Service"}
                </h2>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              {/* Row 1: Title and Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="font-mono text-[11px] font-semibold text-slate-700 block mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g., Compressed Air & Pneumatics"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] font-semibold text-slate-700 block mb-1">
                    URL Slug * (/services/&lt;slug&gt;)
                  </label>
                  <input
                    type="text"
                    required
                    disabled={Boolean(editingSlug)}
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
                      }))
                    }
                    placeholder="compressed-air"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0c758d] font-mono disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Row 2: Short Summary */}
              <div>
                <label className="font-mono text-[11px] font-semibold text-slate-700 block mb-1">
                  Short Summary (Card & Preview Tagline) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.summary}
                  onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
                  placeholder="Chilled water, steam, or air networks re-engineered for minimum exergy loss and lower peak demand."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
                />
              </div>

              {/* Row 3: Detailed Description (body_md) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-mono text-[11px] font-semibold text-slate-700">
                    Detailed Engineering Description (Markdown) *
                  </label>
                  <span className="font-mono text-[10px] text-slate-400">
                    Rendered in full on public /services/{formData.slug || "..."}
                  </span>
                </div>
                <textarea
                  required
                  rows={5}
                  value={formData.body_md}
                  onChange={(e) => setFormData((prev) => ({ ...prev, body_md: e.target.value }))}
                  placeholder="Exergy Solutions delivers end-to-end thermodynamic optimization for this stream. We audit heat dissipation, pressure lift cycles, and entropy generation across the operating envelope..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0c758d] font-mono leading-relaxed"
                />
              </div>

              {/* Row 4: Highlights */}
              <div>
                <label className="font-mono text-[11px] font-semibold text-slate-700 block mb-1">
                  Key Intervention Highlights (one per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.highlightsText}
                  onChange={(e) => setFormData((prev) => ({ ...prev, highlightsText: e.target.value }))}
                  placeholder={"Ultrasonic acoustic leak detection and pressure drop mapping\nVariable-speed sequencing and dynamic pressure relief\nHeat of compression recovery cascading into boiler makeup"}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0c758d] font-mono"
                />
              </div>

              {/* Row 5: Icon Selection */}
              <div>
                <label className="font-mono text-[11px] font-semibold text-slate-700 block mb-1">
                  Engineering Icon
                </label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData((prev) => ({ ...prev, icon: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
                >
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 6: Thermodynamic Principle & Performance Benchmarks (Optional) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-slate-100">
                <div>
                  <label className="font-mono text-[11px] font-semibold text-slate-700 block mb-1">
                    Second-Law Thermodynamic Principle
                  </label>
                  <input
                    type="text"
                    value={formData.thermodynamic_principle}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, thermodynamic_principle: e.target.value }))
                    }
                    placeholder="Carnot COP and isentropic lift optimization..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] font-semibold text-slate-700 block mb-1">
                    Specific Energy Consumption (SEC) KPI
                  </label>
                  <input
                    type="text"
                    value={formData.sec_kpi}
                    onChange={(e) => setFormData((prev) => ({ ...prev, sec_kpi: e.target.value }))}
                    placeholder="Reduces specific power by 25–35%..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
                  />
                </div>
              </div>

              {/* Row 7: Financial ROI & Equipment Scope */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="font-mono text-[11px] font-semibold text-slate-700 block mb-1">
                    Contractual Payback / Financial ROI
                  </label>
                  <input
                    type="text"
                    value={formData.roi_payback}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, roi_payback: e.target.value }))
                    }
                    placeholder="Simple payback between 12 to 18 months"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] font-semibold text-slate-700 block mb-1">
                    Equipment Scope (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.equipment_scope_text}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, equipment_scope_text: e.target.value }))
                    }
                    placeholder="Compressors, heat exchangers, VFDs"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-[#0c758d]"
                  />
                </div>
              </div>

              {/* Publish Toggle */}
              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={formData.is_published}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, is_published: e.target.checked }))
                  }
                  className="rounded text-[#0c758d] focus:ring-[#0c758d] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="is_published" className="font-mono text-xs text-slate-700 cursor-pointer">
                  Publish immediately to main website navigation, portfolio & assessment
                </label>
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-mono text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 bg-[#0c758d] hover:bg-[#095f73] text-white px-5 py-2.5 rounded-xl font-mono text-xs font-semibold shadow-xs disabled:opacity-60"
                >
                  {saving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingSlug ? "Save Changes" : "Create & Publish Service"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
