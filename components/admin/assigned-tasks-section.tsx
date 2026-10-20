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
  Users,
  UserPlus,
  ArrowRight,
  Filter,
} from "lucide-react";
import {
  fetchAdminTasksAction,
  syncAdminTasksAction,
  updateTaskStatusAction,
  fetchTeamMembersAction,
  reassignTaskAction,
  type DatabaseTask,
  type TeamMember,
} from "@/app/actions/admin-tasks";
import { formatDynamicTime } from "@/lib/time-utils";

export type EmployeeTask = DatabaseTask;

const STORAGE_KEY = "exergy_employee_tasks_v3";

interface AssignedTasksSectionProps {
  onSelectLeadId?: (leadId: string) => void;
  currentUserRole?: string;
  currentUserEmail?: string;
}

function getInitials(name: string): string {
  if (!name) return "SE";
  const clean = name.replace(/\(.*?\)/g, "").trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
}

export function AssignedTasksSection({
  onSelectLeadId,
  currentUserRole = "employee",
  currentUserEmail = "employee@exergy.com",
}: AssignedTasksSectionProps) {
  const isHead = currentUserRole === "founder" || currentUserRole === "admin";
  const [tasks, setTasks] = useState<EmployeeTask[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);
  const [isDatabaseConnected, setIsDatabaseConnected] = useState(false);

  // Filters
  const [activeFilter, setActiveFilter] = useState<"all" | "in_progress" | "pending" | "completed">("all");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all");

  // Form State for creating a new task
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newLeadId, setNewLeadId] = useState("");
  const [newPriority, setNewPriority] = useState<EmployeeTask["priority"]>("high");
  const [newDueDays, setNewDueDays] = useState(1);

  // Assignee Selection State
  const [assigneeMode, setAssigneeMode] = useState<"preset" | "custom">("preset");
  const [selectedAssigneeEmail, setSelectedAssigneeEmail] = useState("employee@exergy.com");
  const [customAssigneeName, setCustomAssigneeName] = useState("");
  const [customAssigneeEmail, setCustomAssigneeEmail] = useState("");
  const [customAssigneeDept, setCustomAssigneeDept] = useState("Thermodynamics & Audits");

  // Reassign Modal State
  const [reassigningTask, setReassigningTask] = useState<EmployeeTask | null>(null);
  const [reassignMode, setReassignMode] = useState<"preset" | "custom">("preset");
  const [reassignTargetEmail, setReassignTargetEmail] = useState("employee@exergy.com");
  const [reassignCustomName, setReassignCustomName] = useState("");
  const [reassignCustomEmail, setReassignCustomEmail] = useState("");

  // Load team roster
  const loadTeamMembers = useCallback(async () => {
    try {
      const res = await fetchTeamMembersAction();
      if (res.success && res.members.length > 0) {
        setTeamMembers(res.members);
      }
    } catch (e) {
      console.warn("Failed to load team roster:", e);
    }
  }, []);

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
    loadTeamMembers();
  }, [loadTasks, loadTeamMembers]);

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
    const updated = tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t));
    setTasks(updated);
    setUpdatingTaskId(taskId);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}

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
    if (!isHead) return;
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

    let assigneeName = "Staff Engineer";
    let assigneeEmail = "employee@exergy.com";

    if (assigneeMode === "custom") {
      assigneeName = customAssigneeName.trim() || "Staff Engineer";
      assigneeEmail = customAssigneeEmail.trim() || "staff@exergy.solutions";
    } else {
      const found = teamMembers.find((m) => m.email.toLowerCase() === selectedAssigneeEmail.toLowerCase());
      if (found) {
        assigneeName = found.name;
        assigneeEmail = found.email;
      }
    }

    const dueTarget = new Date(Date.now() + newDueDays * 86400000);
    dueTarget.setHours(17, 0, 0, 0);

    const newTask: EmployeeTask = {
      id: `TASK-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle.trim(),
      description: newDescription.trim() || `Engineering audit directive assigned to ${assigneeName}.`,
      leadId: newLeadId.trim() || undefined,
      clientName: newCompany.trim() || "Exergy Client",
      company: newCompany.trim() || "Exergy Solutions Facility",
      sector: "Engineering & Thermodynamics",
      priority: newPriority,
      status: "in_progress",
      dueAt: dueTarget.toISOString(),
      dueDateDisplay: formatDynamicTime(dueTarget.toISOString()).full,
      assigneeName,
      assigneeEmail,
      assignedBy: currentUserRole === "founder" ? "Founder" : "Head of Engineering",
      lockedDirective: true,
      createdAt: new Date().toISOString(),
    };

    saveTasks([newTask, ...tasks]);

    // Reset Form
    setNewTitle("");
    setNewDescription("");
    setNewCompany("");
    setNewLeadId("");
    setCustomAssigneeName("");
    setCustomAssigneeEmail("");
    setAssigneeMode("preset");
    setIsNewTaskModalOpen(false);
  };

  const handleReassignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reassigningTask || !isHead) return;

    let newName = "Staff Engineer";
    let newEmail = "employee@exergy.com";

    if (reassignMode === "custom") {
      newName = reassignCustomName.trim() || "Staff Engineer";
      newEmail = reassignCustomEmail.trim() || "staff@exergy.solutions";
    } else {
      const found = teamMembers.find((m) => m.email.toLowerCase() === reassignTargetEmail.toLowerCase());
      if (found) {
        newName = found.name;
        newEmail = found.email;
      }
    }

    // Optimistic update
    const updated = tasks.map((t) =>
      t.id === reassigningTask.id
        ? { ...t, assigneeName: newName, assigneeEmail: newEmail }
        : t
    );
    setTasks(updated);
    setReassigningTask(null);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      const res = await reassignTaskAction(reassigningTask.id, newName, newEmail);
      if (res.success && res.tasks) {
        setTasks(res.tasks);
      }
    } catch (err) {
      console.warn("Failed to reassign task:", err);
    }
  };

  // Assignee unique list for filter dropdown
  const uniqueAssignees = Array.from(
    new Set(tasks.map((t) => t.assigneeEmail).filter(Boolean))
  );

  const filteredTasks = tasks.filter((t) => {
    // 1. Status Filter
    if (activeFilter !== "all" && t.status !== activeFilter) {
      return false;
    }
    // 2. Assignee Filter
    if (assigneeFilter === "my_tasks") {
      return (
        t.assigneeEmail.toLowerCase() === currentUserEmail.toLowerCase() ||
        (t.assigneeName && t.assigneeName.toLowerCase().includes("staff engineer"))
      );
    }
    if (assigneeFilter !== "all") {
      return t.assigneeEmail.toLowerCase() === assigneeFilter.toLowerCase();
    }
    return true;
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
              {!isHead ? "Your Directives" : "Team Task Queue"}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200/80 text-[11px] font-mono font-semibold">
              <Database className="w-3 h-3 text-[#0c758d]" />
              <span>PostgreSQL Live</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            {!isHead
              ? "Official thermodynamic workflows, pinch analysis calculations, and client follow-up assignments designated by the Head. These directives are live in PostgreSQL, locked, and cannot be altered until instructed."
              : "Review, schedule, and assign thermodynamic audit directives, pinch analysis workflows, and facility assessment tasks to engineering staff in PostgreSQL across 100 specialists."}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 self-start sm:self-center">
          <button
            onClick={() => {
              loadTasks();
              loadTeamMembers();
            }}
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

      {/* Filter Tabs & Assignee Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Status Filter Tabs */}
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

        {/* Assignee Filter Dropdown */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 rounded-xl px-2.5 py-1 text-xs">
            <Users className="w-3.5 h-3.5 text-[#0c758d]" />
            <span className="text-[11px] font-mono text-slate-500 font-semibold">Assignee:</span>
            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              className="bg-transparent text-slate-800 font-medium text-xs focus:outline-none cursor-pointer pr-1"
            >
              <option value="all">All 100 Employees ({tasks.length} tasks)</option>
              {!isHead && (
                <option value="my_tasks">Assigned to Me ({currentUserEmail})</option>
              )}
              {uniqueAssignees.map((email) => {
                const count = tasks.filter((t) => t.assigneeEmail === email).length;
                const sampleTask = tasks.find((t) => t.assigneeEmail === email);
                const name = sampleTask?.assigneeName || email;
                return (
                  <option key={email} value={email}>
                    {name} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          <div className="text-[11px] font-mono text-slate-500 hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-teal-50/50 border border-teal-100">
            <UserCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Active: <strong className="text-slate-800">{currentUserEmail}</strong></span>
          </div>
        </div>
      </div>

      {/* Task List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.length === 0 ? (
          <div className="col-span-full py-12 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2 opacity-80" />
            <h4 className="text-sm font-bold text-slate-800 font-heading">No tasks in this view</h4>
            <p className="text-xs text-slate-500 mt-1">
              {assigneeFilter !== "all"
                ? "No tasks assigned to the selected employee in this status category."
                : "All assigned tasks in this category are completed or filtered out."}
            </p>
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

                {/* Assigned Employee Section */}
                <div className="mt-3.5 p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/80 flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#0c758d] to-[#30a66a] text-white flex items-center justify-center font-bold text-[10px] shrink-0 shadow-2xs">
                      {getInitials(task.assigneeName || "SE")}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {task.assigneeName || "Staff Engineer"}
                        </span>
                        <span className="text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded bg-teal-100 text-teal-800 border border-teal-200/60">
                          Assignee
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-500 truncate">
                        {task.assigneeEmail || "employee@exergy.com"}
                      </div>
                    </div>
                  </div>

                  {/* Reassign Button (Head Only) */}
                  {isHead && (
                    <button
                      type="button"
                      onClick={() => {
                        setReassigningTask(task);
                        setReassignTargetEmail(task.assigneeEmail || "employee@exergy.com");
                        setReassignCustomName(task.assigneeName || "");
                        setReassignCustomEmail(task.assigneeEmail || "");
                        setReassignMode("preset");
                      }}
                      className="text-[10px] font-mono font-semibold text-teal-700 hover:text-teal-900 bg-white hover:bg-teal-50 border border-teal-200 px-2 py-1 rounded-lg cursor-pointer transition-colors shrink-0 flex items-center gap-1 shadow-2xs"
                      title="Reassign to another employee"
                    >
                      <UserCheck className="w-3 h-3 text-[#0c758d]" />
                      <span>Reassign</span>
                    </button>
                  )}
                </div>

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

                {/* Status Actions & Lead Link */}
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
                        <RefreshCw className="w-2.5 h-2.5 animate-spin" /> Saving...
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

      {/* New Task Assignment Modal */}
      {isNewTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-[#0c758d] flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-slate-900">
                    Assign Task to Employee
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Select from 100 engineering staff or specify a custom specialist
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsNewTaskModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
              {/* Assignee Selection */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono font-bold uppercase text-slate-700 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#0c758d]" />
                    <span>Assign To (Employee / Specialist) *</span>
                  </label>

                  <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-0.5 text-[10px] font-mono font-medium">
                    <button
                      type="button"
                      onClick={() => setAssigneeMode("preset")}
                      className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                        assigneeMode === "preset"
                          ? "bg-[#0c758d] text-white font-bold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Team Roster
                    </button>
                    <button
                      type="button"
                      onClick={() => setAssigneeMode("custom")}
                      className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                        assigneeMode === "custom"
                          ? "bg-[#0c758d] text-white font-bold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Custom Employee
                    </button>
                  </div>
                </div>

                {assigneeMode === "preset" ? (
                  <div>
                    <select
                      value={selectedAssigneeEmail}
                      onChange={(e) => setSelectedAssigneeEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-[#0c758d]/20"
                    >
                      {teamMembers.map((member) => (
                        <option key={member.email} value={member.email}>
                          {member.name} — {member.department || "Engineering"} ({member.email})
                        </option>
                      ))}
                    </select>
                    <p className="text-[10px] text-slate-500 mt-1 font-mono">
                      Target engineer will receive this directive in their dashboard queue.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-600 mb-0.5">
                          Employee Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={customAssigneeName}
                          onChange={(e) => setCustomAssigneeName(e.target.value)}
                          placeholder="e.g. Tariq Mansoor"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#0c758d]/20"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-600 mb-0.5">
                          Employee Email or ID *
                        </label>
                        <input
                          type="text"
                          required
                          value={customAssigneeEmail}
                          onChange={(e) => setCustomAssigneeEmail(e.target.value)}
                          placeholder="e.g. t.mansoor@exergy.solutions"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#0c758d]/20"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Task Title */}
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0c758d]/20 focus:bg-white"
                />
              </div>

              {/* Company & Client */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-slate-700 mb-1">
                  Company / Facility Name
                </label>
                <input
                  type="text"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. NeuralWaves Labs / Gulf Paper"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0c758d]/20 focus:bg-white"
                />
              </div>

              {/* Priority & Deadline */}
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

              {/* Description */}
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

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-mono text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#0c758d] hover:bg-[#095f73] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Assign to Employee</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reassign Modal */}
      {reassigningTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-teal-50 text-[#0c758d] flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-slate-900">
                    Reassign Task
                  </h4>
                  <p className="text-[11px] font-mono text-slate-500">
                    {reassigningTask.id} • {reassigningTask.title}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setReassigningTask(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleReassignSubmit} className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-mono text-slate-500 block">Current Assignee:</span>
                <span className="font-bold text-slate-800 text-xs">
                  {reassigningTask.assigneeName} ({reassigningTask.assigneeEmail})
                </span>
              </div>

              {/* Mode Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono font-bold uppercase text-slate-700">
                  Select New Assignee
                </label>
                <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-lg p-0.5 text-[10px] font-mono">
                  <button
                    type="button"
                    onClick={() => setReassignMode("preset")}
                    className={`px-2 py-0.5 rounded cursor-pointer ${
                      reassignMode === "preset" ? "bg-[#0c758d] text-white font-bold" : "text-slate-600"
                    }`}
                  >
                    Roster
                  </button>
                  <button
                    type="button"
                    onClick={() => setReassignMode("custom")}
                    className={`px-2 py-0.5 rounded cursor-pointer ${
                      reassignMode === "custom" ? "bg-[#0c758d] text-white font-bold" : "text-slate-600"
                    }`}
                  >
                    Custom
                  </button>
                </div>
              </div>

              {reassignMode === "preset" ? (
                <div>
                  <select
                    value={reassignTargetEmail}
                    onChange={(e) => setReassignTargetEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-[#0c758d]/20"
                  >
                    {teamMembers.map((member) => (
                      <option key={member.email} value={member.email}>
                        {member.name} ({member.email})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    value={reassignCustomName}
                    onChange={(e) => setReassignCustomName(e.target.value)}
                    placeholder="Employee Full Name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs"
                  />
                  <input
                    type="text"
                    required
                    value={reassignCustomEmail}
                    onChange={(e) => setReassignCustomEmail(e.target.value)}
                    placeholder="Employee Email or Staff ID"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs"
                  />
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setReassigningTask(null)}
                  className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-mono text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#0c758d] hover:bg-[#095f73] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>Confirm Reassignment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
