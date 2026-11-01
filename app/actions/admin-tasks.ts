"use server";

import { createServiceRoleClient } from "@/lib/supabase/service";
import { formatDynamicTime } from "@/lib/time-utils";
import { assertAdminAuthorized } from "@/app/actions/admin-auth";

export interface DatabaseTask {
  id: string;
  title: string;
  description: string;
  leadId?: string;
  clientName: string;
  company: string;
  sector: string;
  priority: "urgent" | "high" | "medium" | "low";
  status: "pending" | "in_progress" | "completed";
  dueAt: string; // ISO date string or formatted deadline
  dueDateDisplay: string; // Dynamic human-readable label
  assigneeName: string;
  assigneeEmail: string;
  assignedBy: string;
  lockedDirective: boolean;
  createdAt: string; // ISO date string
}

const SETTINGS_KEY = "assigned_engineering_tasks";

/**
 * Fetch all assigned tasks directly from Supabase PostgreSQL
 */
export async function fetchAdminTasksAction(): Promise<{
  success: boolean;
  tasks: DatabaseTask[];
  isDatabaseConnected: boolean;
  error?: string;
}> {
  try {
    await assertAdminAuthorized(["founder", "admin", "employee"]);

    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", SETTINGS_KEY)
      .maybeSingle();

    if (error) {
      console.warn("[FETCH TASKS SUPABASE ERROR]", error);
      return { success: false, tasks: [], isDatabaseConnected: false, error: error.message };
    }

    if (data?.value && Array.isArray(data.value)) {
      // Re-hydrate dynamic relative times
      const hydrated: DatabaseTask[] = data.value.map((t: DatabaseTask) => {
        const timeInfo = t.dueAt ? formatDynamicTime(t.dueAt) : null;
        return {
          ...t,
          dueDateDisplay: timeInfo ? `${timeInfo.relative} (${timeInfo.full})` : t.dueDateDisplay || "Pending",
        };
      });
      return { success: true, tasks: hydrated, isDatabaseConnected: true };
    }

    // Initialize clean empty task queue into Supabase PostgreSQL
    await supabase.from("site_settings").upsert({
      key: SETTINGS_KEY,
      value: [],
    });

    return { success: true, tasks: [], isDatabaseConnected: true };
  } catch (err: any) {
    console.warn("[FETCH TASKS SERVER ERROR]", err);
    return { success: false, tasks: [], isDatabaseConnected: false, error: err?.message };
  }
}

/**
 * Save / Update full task list in Supabase PostgreSQL
 */
export async function syncAdminTasksAction(
  tasks: DatabaseTask[]
): Promise<{ success: boolean; error?: string }> {
  try {
    await assertAdminAuthorized(["founder", "admin", "employee"]);

    const supabase = createServiceRoleClient();
    const { error } = await supabase.from("site_settings").upsert({
      key: SETTINGS_KEY,
      value: tasks,
    });

    if (error) {
      console.warn("[SYNC TASKS SUPABASE ERROR]", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.warn("[SYNC TASKS SERVER ERROR]", err);
    return { success: false, error: err?.message };
  }
}

/**
 * Update a single task in Supabase
 */
export async function updateTaskStatusAction(
  taskId: string,
  newStatus: DatabaseTask["status"]
): Promise<{ success: boolean; tasks?: DatabaseTask[]; error?: string }> {
  try {
    await assertAdminAuthorized(["founder", "admin", "employee"]);

    const supabase = createServiceRoleClient();
    const { data } = await supabase.from("site_settings").select("value").eq("key", SETTINGS_KEY).maybeSingle();
    const currentTasks: DatabaseTask[] = Array.isArray(data?.value) ? data.value : [];

    const updated = currentTasks.map((t) =>
      t.id === taskId
        ? {
            ...t,
            status: newStatus,
            updatedAt: new Date().toISOString(),
          }
        : t
    );

    const { error } = await supabase.from("site_settings").upsert({
      key: SETTINGS_KEY,
      value: updated,
    });

    if (error) {
      console.warn("[UPDATE TASK STATUS SUPABASE ERROR]", error);
      return { success: false, error: error.message };
    }
    return { success: true, tasks: updated };
  } catch (err: any) {
    console.warn("[UPDATE TASK STATUS SERVER ERROR]", err);
    return { success: false, error: err?.message };
  }
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
}

/**
 * Fetch team roster from Supabase admin_users and department specialists
 */
export async function fetchTeamMembersAction(): Promise<{
  success: boolean;
  members: TeamMember[];
}> {
  try {
    await assertAdminAuthorized(["founder", "admin", "employee"]);

    const supabase = createServiceRoleClient();
    const { data } = await supabase
      .from("admin_users")
      .select("id, full_name, email, role")
      .order("full_name", { ascending: true });

    const registered: TeamMember[] = (data || []).map((u: any) => ({
      id: u.id?.slice(0, 8) || "USER",
      name: u.full_name || u.email.split("@")[0],
      email: u.email,
      role: u.role || "employee",
      department: u.role === "founder" ? "Executive Leadership" : u.role === "admin" ? "Operations" : "Engineering",
    }));

    // Pre-populate core engineering roster representing the 100-member engineering organization
    const defaultRoster: TeamMember[] = [
      { id: "EMP-001", name: "Staff Engineer (Primary)", email: "employee@exergy.com", role: "employee", department: "Thermodynamics & Audits" },
      { id: "EMP-012", name: "Rashid Al-Falasi (Lead Thermodynamicist)", email: "r.falasi@exergy.solutions", role: "employee", department: "Thermodynamics & Pinch" },
      { id: "EMP-028", name: "Sara Mansoor (Chiller & HVAC Specialist)", email: "s.mansoor@exergy.solutions", role: "employee", department: "District Cooling & HVAC" },
      { id: "EMP-045", name: "Zaid Tariq (Senior Energy Auditor)", email: "z.tariq@exergy.solutions", role: "employee", department: "Industrial Facility Audits" },
      { id: "EMP-067", name: "Elena Rostov (Pinch Analysis Specialist)", email: "e.rostov@exergy.solutions", role: "employee", department: "Pinch Network Synthesis" },
      { id: "EMP-082", name: "Ahmed Al-Maktoum (Piping & Steam Systems)", email: "a.maktoum@exergy.solutions", role: "employee", department: "Steam & Waste Heat" },
      { id: "EMP-094", name: "Farhan Siddiqui (Water & Effluent Lead)", email: "f.siddiqui@exergy.solutions", role: "employee", department: "Water & Effluent Treatment" },
      { id: "EMP-100", name: "Laila Chen (Industrial Process Auditor)", email: "l.chen@exergy.solutions", role: "employee", department: "Batch Processing & Heat Transfer" },
    ];

    const seenEmails = new Set(registered.map((r) => r.email.toLowerCase()));
    const combined = [...registered];
    for (const member of defaultRoster) {
      if (!seenEmails.has(member.email.toLowerCase())) {
        combined.push(member);
        seenEmails.add(member.email.toLowerCase());
      }
    }

    return { success: true, members: combined };
  } catch (err: any) {
    console.warn("[FETCH TEAM MEMBERS SERVER ERROR]", err);
    return {
      success: true,
      members: [
        { id: "EMP-001", name: "Staff Engineer (Primary)", email: "employee@exergy.com", role: "employee", department: "Thermodynamics" },
        { id: "EMP-012", name: "Rashid Al-Falasi (Lead Thermodynamicist)", email: "r.falasi@exergy.solutions", role: "employee", department: "Thermodynamics & Pinch" },
        { id: "EMP-028", name: "Sara Mansoor (Chiller & HVAC Specialist)", email: "s.mansoor@exergy.solutions", role: "employee", department: "District Cooling" },
        { id: "EMP-045", name: "Zaid Tariq (Senior Energy Auditor)", email: "z.tariq@exergy.solutions", role: "employee", department: "Audits" },
      ],
    };
  }
}

/**
 * Reassign an existing task to another employee
 */
export async function reassignTaskAction(
  taskId: string,
  newAssigneeName: string,
  newAssigneeEmail: string
): Promise<{ success: boolean; tasks?: DatabaseTask[]; error?: string }> {
  try {
    await assertAdminAuthorized(["founder", "admin"]);

    const supabase = createServiceRoleClient();
    const { data } = await supabase.from("site_settings").select("value").eq("key", SETTINGS_KEY).maybeSingle();
    const currentTasks: DatabaseTask[] = Array.isArray(data?.value) ? data.value : [];

    const updated = currentTasks.map((t) =>
      t.id === taskId
        ? {
            ...t,
            assigneeName: newAssigneeName,
            assigneeEmail: newAssigneeEmail,
            updatedAt: new Date().toISOString(),
          }
        : t
    );

    const { error } = await supabase.from("site_settings").upsert({
      key: SETTINGS_KEY,
      value: updated,
    });

    if (error) {
      console.warn("[REASSIGN TASK SUPABASE ERROR]", error);
      return { success: false, error: error.message };
    }
    return { success: true, tasks: updated };
  } catch (err: any) {
    console.warn("[REASSIGN TASK SERVER ERROR]", err);
    return { success: false, error: err?.message };
  }
}
