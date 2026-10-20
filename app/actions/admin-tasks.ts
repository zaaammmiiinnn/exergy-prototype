"use server";

import { createServiceRoleClient } from "@/lib/supabase/service";
import { formatDynamicTime } from "@/lib/time-utils";

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
 * Generate default tasks synced with real leads in Supabase
 */
async function generateInitialTasks(supabase: any): Promise<DatabaseTask[]> {
  // Fetch real leads from Supabase leads table
  const { data: leads } = await supabase.from("leads").select("*").limit(5);
  const primaryLead = leads && leads.length > 0 ? leads[0] : null;

  const leadId = primaryLead?.short_id || "EX-2026-6253";
  const clientName = primaryLead?.full_name || "NeuralWaves Ai";
  const company = primaryLead?.company || "NeuralWaves Labs";
  const sector = primaryLead?.sector ? `${primaryLead.sector.toUpperCase()} & Continuous Processing` : "Paper & Continuous Processing";
  const leadCreatedAt = primaryLead?.created_at || new Date().toISOString();

  // Due times dynamically anchored to current date/time
  const now = new Date();
  const todayEod = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 17, 0, 0);
  const tomorrowNoon = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 12, 0, 0);
  const inThreeDays = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 16, 0, 0);
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 18, 0, 0);

  return [
    {
      id: "TASK-101",
      title: "Perform Thermodynamic Pinch Analysis",
      description:
        "Model hot & cold stream pinch temperatures on 4.2 MW continuous reactor line. Calculate minimum thermal utility demand and heat exchanger network retrofits.",
      leadId,
      clientName,
      company,
      sector,
      priority: "urgent",
      status: "in_progress",
      dueAt: todayEod.toISOString(),
      dueDateDisplay: "Today, 5:00 PM (Mandatory)",
      assigneeName: "Staff Engineer",
      assigneeEmail: "employee@exergy.com",
      assignedBy: "Head of Engineering",
      lockedDirective: true,
      createdAt: leadCreatedAt,
    },
    {
      id: "TASK-102",
      title: "Chilled Water Baseline & Lift Cycle Audit",
      description:
        "Audit primary/secondary pumping loops and verify condenser approach temperatures across GCC regional chiller modules.",
      leadId: "EX-2026-1054",
      clientName: "Neural Waves Support & Ops",
      company: "Neural Waves Facilities Operations",
      sector: "Cooling & Regional Districts",
      priority: "high",
      status: "in_progress",
      dueAt: tomorrowNoon.toISOString(),
      dueDateDisplay: "Tomorrow, 12:00 PM",
      assigneeName: "Staff Engineer",
      assigneeEmail: "employee@exergy.com",
      assignedBy: "Head of Engineering",
      lockedDirective: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "TASK-103",
      title: "Generate Executive Exergy Assessment Report",
      description:
        "Compile preliminary thermodynamic audit document with estimated 25-30% operating expenditure savings and turnkey ROI payback timeline.",
      leadId,
      clientName,
      company,
      sector,
      priority: "medium",
      status: "pending",
      dueAt: inThreeDays.toISOString(),
      dueDateDisplay: "Oct 24, 2026, 4:00 PM",
      assigneeName: "Staff Engineer",
      assigneeEmail: "employee@exergy.com",
      assignedBy: "Head of Engineering",
      lockedDirective: true,
      createdAt: new Date(Date.now() - 43200000).toISOString(),
    },
    {
      id: "TASK-104",
      title: "Initial Intake Verification & Bill Validation",
      description:
        "Validated utility bills, monthly natural gas consumption, and flow meter calibrations against baseline engineering data.",
      leadId: "EX-2026-1042",
      clientName: "Tariq Mansoor",
      company: "Gulf Paper Mills FZCO",
      sector: "Paper & Pulp Mills",
      priority: "low",
      status: "completed",
      dueAt: yesterday.toISOString(),
      dueDateDisplay: "Completed Oct 19, 6:00 PM",
      assigneeName: "Staff Engineer",
      assigneeEmail: "employee@exergy.com",
      assignedBy: "Head of Engineering",
      lockedDirective: true,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
    },
  ];
}

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

    if (data?.value && Array.isArray(data.value) && data.value.length > 0) {
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

    // Initialize default seed into Supabase PostgreSQL
    const initialTasks = await generateInitialTasks(supabase);
    await supabase.from("site_settings").upsert({
      key: SETTINGS_KEY,
      value: initialTasks,
    });

    return { success: true, tasks: initialTasks, isDatabaseConnected: true };
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

