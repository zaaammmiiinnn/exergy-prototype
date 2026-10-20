import React, { useState, useEffect, useCallback } from "react";
import {
  CheckSquare,
  Clock,
  AlertCircle,
  Plus,
  Trash2,
  CheckCircle2,
  PlayCircle,
  Building,
  UserCheck,
  Calendar,
  X,
  Sparkles,
  ExternalLink,
  RotateCcw,
  Lock,
  ShieldCheck,
  ShieldAlert,
  Database,
  RefreshCw,
} from "lucide-react";
import {
  fetchAdminTasksAction,
  syncAdminTasksAction,
  updateTaskStatusAction,
  type DatabaseTask,
} from "@/app/actions/admin-tasks";
import { formatDynamicTime } from "@/lib/time-utils";

export type EmployeeTask = DatabaseTask;

const STORAGE_KEY = "exergy_employee_tasks_v3";

interface AssignedTasksSectionProps {
  onSelectLeadId?: (leadId: string) => void;
  currentUserRole?: string;
  currentUserEmail?: string;
}

export function AssignedTasksSection({
  onSelectLeadId,
  currentUserRole = "employee",
  currentUserEmail = "employee@exergy.com",
}: AssignedTasksSectionProps) {
  const isHead = currentUserRole === "founder" || currentUserRole === "admin";
  const [tasks, setTasks] = useState<EmployeeTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);
  const [isDatabaseConnected, setIsDatabaseConnected] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "in_progress" | "pending" | "completed">("all");
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  // Form State for creating a new task
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newLeadId, setNewLeadId] = useState("");
  const [newPriority, setNewPriority] = useState<EmployeeTask["priority"]>("high");
  const [newDueDays, setNewDueDays] = useState(1);

  // Load tasks directly from Supabase PostgreSQL
  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetchAdminTasksAction();
      if (res.success && res.tasks.length > 0) {
        setTasks(res.tasks);
        setIsDatabaseConnected(res.isDatabaseConnected);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(res.tasks));
        } catch {}
        return;
      }
    } catch (e) {
      console.warn("Error fetching tasks from Supabase:", e);
    } finally {
      setIsLoading(false);
    }

    // Fallback to localStorage if offline
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTasks(parsed);
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Save tasks directly to Supabase PostgreSQL
  const saveTasks = async (updated: EmployeeTask[]) => {
    setTasks(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
    try {
      await syncAdminTasksAction(updated);
      setIsDatabaseConnected(true);
    } catch (e) {
      console.warn("Failed to sync tasks to Supabase:", e);
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: EmployeeTask["status"]) => {
    // 1. Optimistic update immediately
    const updated = tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t));
    setTasks(updated);
    setUpdatingTaskId(taskId);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}

    // 2. Persist directly to Supabase PostgreSQL
    try {
      const res = await updateTaskStatusAction(taskId, newStatus);
      if (res.success && res.tasks) {
        setTasks(res.tasks);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(res.tasks));
        } catch {}
      }
      setIsDatabaseConnected(true);
    } catch (e) {
      console.warn("Failed to update status in Supabase:", e);
    } finally {
      setUpdatingTaskId(null);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    if (!isHead) return; // Employee cannot delete directives
    const updated = tasks.filter((t) => t.id !== taskId);
    saveTasks(updated);
  };

  const handleResetDefaults = async () => {
    if (!isHead) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
      await loadTasks();
    } catch {}
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isHead || !newTitle.trim()) return;

    const dueTarget = new Date(Date.now() + newDueDays * 86400000);
    dueTarget.setHours(17, 0, 0, 0);

    const newTask: EmployeeTask = {
      id: `TASK-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle.trim(),
      description: newDescription.trim() || "Engineering audit directive assigned to Staff Engineer.",
      leadId: newLeadId.trim() || undefined,
      clientName: newCompany.trim() || "Exergy Client",
      company: newCompany.trim() || "Exergy Solutions Facility",
      sector: "Engineering & Thermodynamics",
      priority: newPriority,
      status: "in_progress",
      dueAt: dueTarget.toISOString(),
      dueDateDisplay: formatDynamicTime(dueTarget.toISOString()).full,
      assigneeName: "Staff Engineer",
      assigneeEmail: "employee@exergy.com",
      assignedBy: currentUserRole === "founder" ? "Founder" : "Head of Engineering",
      lockedDirective: true,
      createdAt: new Date().toISOString(),
    };

    saveTasks([newTask, ...tasks]);
    setNewTitle("");
    setNewDescription("");
    setNewCompany("");
    setNewLeadId("");
    setIsNewTaskModalOpen(false);
  };

  const filteredTasks = tasks.filter((t) => {
    if (activeFilter === "all") return true;
    return t.status === activeFilter;
  });

  const countInProgress = tasks.filter((t) => t.status === "in_progress").length;
  const countPending = tasks.filter((t) => t.status === "pending").length;
  const countCompleted = tasks.filter((t) => t.status === "completed").length;

  return (
    <section id="assigned-tasks" className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200/70 text-[#0c758d] flex items-center justify-center shadow-2xs">
              <CheckSquare className="w-4 h-4" />
            </div>
            <h3 className="font-heading font-extrabold text-lg text-slate-900 tracking-tight">
              Assigned Engineering Tasks
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[11px] font-mono font-bold uppercase tracking-wider">
              {!isHead ? "Your Directives" : "Staff Engineer Queue"}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200/80 text-[11px] font-mono font-semibold">
              <Database className="w-3 h-3 text-[#0c758d]" />
              <span>PostgreSQL Live</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            {!isHead
              ? "Official thermodynamic workflows, pinch analysis calculations, and client follow-up assignments designated by the Head. These directives are live in PostgreSQL, locked, and cannot be altered until instructed."
              : "Review, schedule, and assign thermodynamic audit directives, pinch analysis workflows, and facility assessment tasks to engineering staff in PostgreSQL."}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 self-start sm:self-center">
          <button
            onClick={() => loadTasks()}
            title="Refresh tasks from Supabase"
            className="p-2 rounded-full border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-teal-600" : ""}`} />
          </button>

          {isHead ? (
            <>
              <button
                onClick={() => setIsNewTaskModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0c758d] hover:bg-[#095f73] text-white text-xs font-heading font-bold shadow-xs transition-all cursor-pointer active:scale-98"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Assign Task</span>
              </button>

              <button
                onClick={handleResetDefaults}
                title="Reset default engineering tasks"
                className="p-2 rounded-full border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 text-slate-600 text-xs font-mono">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold">Assigned by Head • Locked</span>
            </div>
          )}
        </div>
      </div>

      {/* Filter Tabs & Quick Counters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center p-1 rounded-xl bg-slate-100/90 border border-slate-200/80 text-xs font-mono font-medium">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeFilter === "all"
                ? "bg-white text-slate-900 font-bold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All ({tasks.length})
          </button>
          <button
            onClick={() => setActiveFilter("in_progress")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFilter === "in_progress"
                ? "bg-white text-amber-700 font-bold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>In Progress ({countInProgress})</span>
          </button>
          <button
            onClick={() => setActiveFilter("pending")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeFilter === "pending"
                ? "bg-white text-sky-700 font-bold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Pending ({countPending})
          </button>
          <button
            onClick={() => setActiveFilter("completed")}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeFilter === "completed"
                ? "bg-white text-emerald-700 font-bold shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Completed ({countCompleted})
          </button>
        </div>

        <div className="text-[11px] font-mono text-slate-500 flex items-center gap-2">
          <UserCheck className="w-3.5 h-3.5 text-teal-600" />
          <span>Assignee: <strong className="text-slate-700">Staff Engineer</strong> ({currentUserEmail})</span>
        </div>
      </div>

      {/* Task List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.length === 0 ? (
          <div className="col-span-full py-12 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2 opacity-80" />
            <h4 className="text-sm font-bold text-slate-800 font-heading">No tasks in this view</h4>
            <p className="text-xs text-slate-500 mt-1">All assigned tasks in this category are completed or filtered out.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCompleted = task.status === "completed";
            const isInProgress = task.status === "in_progress";

            return (
              <div
                key={task.id}
                className={`group relative rounded-2xl p-5 border transition-all ${
                  isCompleted
                    ? "bg-emerald-50/30 border-emerald-200/80"
                    : isInProgress
                    ? "bg-white border-teal-200/90 shadow-sm hover:shadow-md"
                    : "bg-white border-slate-200/80 hover:border-slate-300"
                }`}
              >
                {/* Status Bar Accent */}
                <div
                  className={`absolute top-0 left-5 right-5 h-1 rounded-b-full ${
                    isCompleted
                      ? "bg-emerald-500"
                      : isInProgress
                      ? "bg-gradient-to-r from-[#0c758d] to-[#30a66a]"
                      : "bg-slate-300"
                  }`}
                />

                <div className="flex items-start justify-between gap-3 pt-1">
                  {/* Priority & Lead Reference */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                        task.priority === "urgent"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : task.priority === "high"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : task.priority === "medium"
                          ? "bg-sky-50 text-sky-700 border-sky-200"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}
                    >
                      {task.priority}
                    </span>

                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-slate-600 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200/80">
                      <ShieldCheck className="w-3 h-3 text-[#0c758d]" />
                      <span>{task.assignedBy || "Head of Engineering"}</span>
                    </span>

                    {task.leadId && (
                      <span className="text-[10px] font-mono font-semibold text-slate-500 px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200/70">
                        {task.leadId}
                      </span>
                    )}

                    <span className="text-[10px] font-mono text-slate-400">
                      {task.id}
                    </span>
                  </div>

                  {/* Delete Task Button (Head Only) */}
                  {isHead && (
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-600 transition-opacity p-1 cursor-pointer"
                      title="Remove task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Title */}
                <h4
                  className={`font-heading font-bold text-sm mt-3 ${
                    isCompleted ? "text-slate-500 line-through" : "text-slate-900"
                  }`}
                >
                  {task.title}
                </h4>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-sans line-clamp-2">
                  {task.description}
                </p>

                {/* Client & Sector Metadata + Live Due Date */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate max-w-[170px]">{task.company}</span>
                  </div>

                  <div
                    className="flex items-center gap-1.5 text-slate-700 font-mono text-[11px] bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/80"
                    title={task.dueAt ? `Due Target: ${new Date(task.dueAt).toLocaleString()}` : task.dueDateDisplay}
                  >
                    <Clock className="w-3 h-3 text-[#0c758d] shrink-0" />
                    <span className="font-semibold text-slate-900">
                      {task.dueDateDisplay || (task.dueAt ? formatDynamicTime(task.dueAt).relative : "Pending")}
                    </span>
                  </div>
                </div>

                {/* Live Assignment Timestamp */}
                <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-slate-400 px-0.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>Assigned: {task.createdAt ? formatDynamicTime(task.createdAt).relative : "Recently"}</span>
                  </span>
                  {task.dueAt && (
                    <span className="text-slate-400 font-sans">
                      Target: {new Date(task.dueAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  )}
                </div>

                {/* Status Indicator & Lead Action */}
                <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      disabled={updatingTaskId === task.id}
                      onClick={() => handleStatusChange(task.id, "in_progress")}
                      className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                        isInProgress
                          ? "bg-amber-100 text-amber-900 border border-amber-300 ring-2 ring-amber-400/30 shadow-2xs"
                          : "text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/60"
                      }`}
                    >
                      {isInProgress && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />}
                      <span>In Progress</span>
                    </button>
                    <button
                      type="button"
                      disabled={updatingTaskId === task.id}
                      onClick={() => handleStatusChange(task.id, "pending")}
                      className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                        task.status === "pending"
                          ? "bg-sky-100 text-sky-900 border border-sky-300 ring-2 ring-sky-400/30 shadow-2xs"
                          : "text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/60"
                      }`}
                    >
                      {task.status === "pending" && <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />}
                      <span>Pending</span>
                    </button>
                    <button
                      type="button"
                      disabled={updatingTaskId === task.id}
                      onClick={() => handleStatusChange(task.id, "completed")}
                      className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                        isCompleted
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-300 ring-2 ring-emerald-400/30 shadow-2xs"
                          : "text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/60"
                      }`}
                    >
                      {isCompleted && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                      <span>✓ Completed</span>
                    </button>

                    {updatingTaskId === task.id && (
                      <span className="text-[10px] font-mono text-teal-700 flex items-center gap-1 ml-1 animate-pulse">
                        <RefreshCw className="w-2.5 h-2.5 animate-spin" /> Saving to PostgreSQL...
                      </span>
                    )}
                  </div>

                  {task.leadId && onSelectLeadId && (
                    <button
                      onClick={() => onSelectLeadId(task.leadId!)}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[#0c758d] hover:text-[#095f73] transition-colors cursor-pointer ml-auto"
                    >
                      <span>View Lead</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* New Task Modal */}
      {isNewTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-[#0c758d] flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <h4 className="font-heading font-bold text-base text-slate-900">
                  Assign New Engineering Task
                </h4>
              </div>
              <button
                onClick={() => setIsNewTaskModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-slate-700 mb-1">
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Conduct Steam Header Heat Exchanger Audit"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0c758d]/20 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-slate-700 mb-1">
                  Company / Facility Name
                </label>
                <input
                  type="text"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. NeuralWaves Labs / Gulf Paper"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0c758d]/20 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-slate-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c758d]/20 focus:bg-white"
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Standard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-slate-700 mb-1">
                    Due Target
                  </label>
                  <select
                    value={newDueDays}
                    onChange={(e) => setNewDueDays(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0c758d]/20 focus:bg-white"
                  >
                    <option value={0}>Today by 5:00 PM</option>
                    <option value={1}>Tomorrow by 5:00 PM</option>
                    <option value={2}>In 2 Days</option>
                    <option value={3}>In 3 Days</option>
                    <option value={7}>Next Week (7 Days)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-slate-700 mb-1">
                  Description / Engineering Scope
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Specific engineering steps, thermodynamic formulas, or client goals..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0c758d]/20 focus:bg-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-mono text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#0c758d] hover:bg-[#095f73] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-xs cursor-pointer"
                >
                  Create & Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
