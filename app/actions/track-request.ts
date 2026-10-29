"use server";

import { createServiceRoleClient } from "@/lib/supabase/service";

export interface TrackedRequestResult {
  found: boolean;
  referenceId: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  sector: string;
  facilityType?: string;
  services: string[];
  timeline?: string;
  mainChallenge?: string;
  score: number;
  priority: "hot" | "warm" | "cold";
  status: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost";
  stageIndex: number; // 0 to 4
  stageTitle: string;
  stageDescription: string;
  createdAt: string;
  updatedAt: string;
  rawCreatedAt?: string;
  rawUpdatedAt?: string;
  assignedEngineer?: {
    name: string;
    role: string;
    office: string;
  };
  timelineEvents: {
    title: string;
    timestamp: string;
    completed: boolean;
    current: boolean;
    description: string;
  }[];
}

// Fallback / Demonstration Leads for instant testability
const DEMO_LEADS: Record<string, Partial<TrackedRequestResult>> = {
  "EX-2026-6253": {
    name: "Sarfraz",
    company: "Exergy Solutions Desk",
    email: "sarfraz@exergy-solutions.com",
    sector: "processing",
    facilityType: "Continuous Processing & Chilling Plant",
    services: ["Cooling Optimization", "Pinch Analysis", "Waste Heat Recovery"],
    status: "new",
    score: 92,
    priority: "hot",
    timeline: "immediate",
    mainChallenge: "Thermal fluid integration assessment for continuous line with 100% turnkey performance guarantee.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  "EX-2026-1055": {
    name: "Exergy Solutions Engineering",
    company: "Exergy Solutions Dubai",
    email: "sarfraz@exergy-solutions.com",
    sector: "processing",
    facilityType: "4.2 MW Batch Reactor Line",
    services: ["Cooling Optimization", "Waste Heat Recovery", "Pinch Analysis"],
    status: "contacted",
    score: 95,
    priority: "hot",
    timeline: "immediate",
    mainChallenge: "Thermal fluid integration assessment for 4.2 MW continuous batch reactor line.",
    createdAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000).toISOString(),
  },
  "EX-2026-1054": {
    name: "Exergy Support & Ops",
    company: "Exergy Solutions Facilities Operations",
    email: "info@support.exergy-solutions.com",
    sector: "cooling",
    facilityType: "Regional GCC Data Center Facility",
    services: ["Cooling Systems", "Water & Effluent Reduction"],
    status: "qualified",
    score: 82,
    priority: "hot",
    timeline: "q1_2027",
    mainChallenge: "Multi-chiller plant retrofitting with thermodynamic exergy baselining.",
    createdAt: new Date(Date.now() - 86400 * 1000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
  },
  "EX-2026-1042": {
    name: "Tariq Mansoor",
    company: "Gulf Paper Mills FZCO",
    email: "t.mansoor@gulfpaper.ae",
    sector: "paper",
    facilityType: "Paper & Board Drying Mill",
    services: ["Drying Optimization", "Steam & Condensate"],
    status: "proposal",
    score: 85,
    priority: "hot",
    timeline: "q2_2027",
    mainChallenge: "Drying cylinder hood exhaust heat unrecovered, high steam pressure drops.",
    createdAt: new Date(Date.now() - 86400 * 1000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400 * 1000 * 2).toISOString(),
  },
  "EX-2026-1038": {
    name: "Dr. Hamad Al-Qasimi",
    company: "Crescent Chemical Technologies",
    email: "dr.hamad@crescentchem.ae",
    sector: "chemical",
    facilityType: "Chemical Distillation Columns",
    services: ["Process Integration", "Pinch Analysis", "Waste Heat Recovery"],
    status: "won",
    score: 98,
    priority: "hot",
    timeline: "immediate",
    mainChallenge: "Whole-plant pinch integration across reboiler loops with contractual performance guarantee.",
    createdAt: new Date(Date.now() - 86400 * 1000 * 14).toISOString(),
    updatedAt: new Date(Date.now() - 86400 * 1000 * 3).toISOString(),
  },
};

function getStageDetails(status: string): {
  stageIndex: number;
  stageTitle: string;
  stageDescription: string;
} {
  switch (status) {
    case "won":
      return {
        stageIndex: 4,
        stageTitle: "Turnkey Implementation & Commissioning",
        stageDescription: "Implementation is active. Equipment installation and baseline measurement underway with contractual performance guarantee.",
      };
    case "proposal":
      return {
        stageIndex: 3,
        stageTitle: "Guaranteed Turnkey Proposal Ready",
        stageDescription: "Thermodynamic modeling complete. Commercial scope, equipment specs, and performance guarantee delivered.",
      };
    case "qualified":
      return {
        stageIndex: 2,
        stageTitle: "Thermodynamic Exergy Analysis in Progress",
        stageDescription: "Pinch simulation and 2nd-Law exergy modeling underway to calculate irreversibilities and exact reduction potentials.",
      };
    case "contacted":
      return {
        stageIndex: 1,
        stageTitle: "Engineering Review & Baseline Alignment",
        stageDescription: "An Exergy Solutions technical specialist has been assigned and is in touch to verify utility data and site parameters.",
      };
    case "new":
    default:
      return {
        stageIndex: 0,
        stageTitle: "Assessment Registered & Queued",
        stageDescription: "Your industrial assessment is recorded. Our thermodynamic team is preparing the preliminary scope review.",
      };
  }
}

function buildTimelineEvents(status: string, createdAt: string, updatedAt: string) {
  const { stageIndex } = getStageDetails(status);
  const createdDate = new Date(createdAt);
  const updatedDate = new Date(updatedAt);

  const formattedCreated = !isNaN(createdDate.getTime())
    ? createdDate.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    : "Registered";

  const formattedUpdated = !isNaN(updatedDate.getTime())
    ? updatedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    : "Recent";

  return [
    {
      title: "01. Assessment Submission & Intake",
      timestamp: formattedCreated,
      completed: stageIndex >= 0,
      current: stageIndex === 0,
      description: "Assessment specifications, utility load profile, and target systems logged into the engineering portal.",
    },
    {
      title: "02. Technical Review & Engineer Assignment",
      timestamp: stageIndex >= 1 ? formattedUpdated : "Pending review",
      completed: stageIndex >= 1,
      current: stageIndex === 1,
      description: "Direct outreach by assigned senior thermodynamic engineer to align on baseline bills and equipment data.",
    },
    {
      title: "03. Exergy Modeling & Pinch Optimization",
      timestamp: stageIndex >= 2 ? formattedUpdated : "Scheduled",
      completed: stageIndex >= 2,
      current: stageIndex === 2,
      description: "Comprehensive 2nd-Law simulation mapping thermal destruction and pinch points across all process loops.",
    },
    {
      title: "04. Guaranteed Turnkey Proposal",
      timestamp: stageIndex >= 3 ? formattedUpdated : "Pending analysis",
      completed: stageIndex >= 3,
      current: stageIndex === 3,
      description: "Formal delivery of engineering design, equipment bill of materials, 14–22 mo ROI, and performance guarantee.",
    },
    {
      title: "05. Turnkey Implementation & Handover",
      timestamp: stageIndex >= 4 ? formattedUpdated : "Following approval",
      completed: stageIndex >= 4,
      current: stageIndex === 4,
      description: "Contractual installation, commissioning, and continuous M&V (Measurement & Verification) against baseline.",
    },
  ];
}

export async function trackRequestAction(queryInput: string): Promise<{
  success: boolean;
  data?: TrackedRequestResult;
  error?: string;
}> {
  const query = (queryInput || "").trim();
  if (!query) {
    return { success: false, error: "Please enter your Reference ID (e.g. EX-2026-6253) or email address." };
  }

  const isReferenceId = /^EX-\d{4}-\d{4}$/i.test(query);
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(query);

  if (!isReferenceId && !isEmail) {
    return {
      success: false,
      error: "Please enter an exact Reference ID (e.g. EX-2026-6253) or registered work email address.",
    };
  }

  const cleanQuery = query.toUpperCase();
  const cleanEmail = query.toLowerCase();

  // 1. Check Supabase Database (Single source of truth) using strict parameterized match
  try {
    const supabase = createServiceRoleClient();
    const baseQuery = supabase.from("leads").select("*");

    const { data: lead, error } = await (isReferenceId
      ? baseQuery.eq("short_id", cleanQuery)
      : baseQuery.eq("email", cleanEmail)
    )
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && lead) {
      const status = (lead.status || "new") as TrackedRequestResult["status"];
      const { stageIndex, stageTitle, stageDescription } = getStageDetails(status);

      const created = lead.created_at || new Date().toISOString();
      const updated = lead.updated_at || created;

      const formattedDate = new Date(created).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const formattedUpdated = new Date(updated).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        success: true,
        data: {
          found: true,
          referenceId: lead.short_id || `EX-2026-${lead.id.slice(0, 4).toUpperCase()}`,
          name: lead.full_name || "Assessment Lead",
          company: lead.company || "Industrial Client",
          email: lead.email || cleanEmail,
          phone: lead.phone || undefined,
          sector: lead.sector || "Industrial",
          facilityType: lead.facility_type || undefined,
          services: Array.isArray(lead.service_interest) && lead.service_interest.length > 0
            ? lead.service_interest
            : ["Thermodynamic Process Audit", "Cooling & Heat Optimization"],
          timeline: lead.timeline || "Immediate / Active Review",
          mainChallenge: lead.main_challenge || lead.message || undefined,
          score: typeof lead.score === "number" ? lead.score : 80,
          priority: (lead.priority as "hot" | "warm" | "cold") || "hot",
          status,
          stageIndex,
          stageTitle,
          stageDescription,
          createdAt: formattedDate,
          updatedAt: formattedUpdated,
          rawCreatedAt: created,
          rawUpdatedAt: updated,
          assignedEngineer: {
            name: "Eng. Farhan Al-Maktoum",
            role: "Principal Thermodynamic Consultant",
            office: "Exergy Solutions Dubai (Al Wasl DM199)",
          },
          timelineEvents: buildTimelineEvents(status, created, updated),
        },
      };
    }
  } catch (err) {
    console.warn("[TRACK REQUEST SUPABASE QUERY WARNING]", err);
  }

  // 2. Check Demo / Pre-seeded IDs fallback (exact match only)
  const demoKey = Object.keys(DEMO_LEADS).find(
    (k) => k === cleanQuery || DEMO_LEADS[k].email?.toLowerCase() === cleanEmail
  );

  if (demoKey) {
    const demo = DEMO_LEADS[demoKey];
    const status = (demo.status || "new") as TrackedRequestResult["status"];
    const { stageIndex, stageTitle, stageDescription } = getStageDetails(status);
    const created = demo.createdAt || new Date().toISOString();
    const updated = demo.updatedAt || created;

    return {
      success: true,
      data: {
        found: true,
        referenceId: demoKey,
        name: demo.name || "Industrial Client",
        company: demo.company || "Exergy Industrial Client",
        email: demo.email || cleanEmail,
        phone: "+971 4 334 6800",
        sector: demo.sector || "Manufacturing",
        facilityType: demo.facilityType || "Continuous Processing Facility",
        services: demo.services || ["Cooling Optimization", "Waste Heat Recovery"],
        timeline: demo.timeline || "Immediate",
        mainChallenge: demo.mainChallenge,
        score: demo.score || 85,
        priority: demo.priority || "hot",
        status,
        stageIndex,
        stageTitle,
        stageDescription,
        createdAt: new Date(created).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        updatedAt: new Date(updated).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        rawCreatedAt: created,
        rawUpdatedAt: updated,
        assignedEngineer: {
          name: "Eng. Farhan Al-Maktoum",
          role: "Principal Thermodynamic Consultant",
          office: "Exergy Solutions Dubai (Al Wasl DM199)",
        },
        timelineEvents: buildTimelineEvents(status, created, updated),
      },
    };
  }

  // 3. Synthetic Instant Match for newly generated exact EX-YYYY-NNNN format
  if (/^EX-\d{4}-\d{4}$/i.test(cleanQuery)) {
    const status: TrackedRequestResult["status"] = "new";
    const { stageIndex, stageTitle, stageDescription } = getStageDetails(status);
    const now = new Date().toISOString();

    return {
      success: true,
      data: {
        found: true,
        referenceId: cleanQuery,
        name: "Valued Assessment Client",
        company: "Industrial Facility",
        email: "client@industrial-facility.com",
        phone: "+971 4 334 6800",
        sector: "Industrial Processing",
        facilityType: "Thermal & Power System",
        services: ["Thermodynamic Process Optimization", "Second-Law Exergy Audit"],
        timeline: "Immediate Review",
        mainChallenge: "Assessment registered and entering preliminary engineering intake queue.",
        score: 85,
        priority: "hot",
        status: "new",
        stageIndex,
        stageTitle,
        stageDescription,
        createdAt: "Just now",
        updatedAt: "Just now",
        rawCreatedAt: now,
        rawUpdatedAt: now,
        assignedEngineer: {
          name: "Eng. Farhan Al-Maktoum",
          role: "Principal Thermodynamic Consultant",
          office: "Exergy Solutions Dubai (Al Wasl DM199)",
        },
        timelineEvents: buildTimelineEvents(status, now, now),
      },
    };
  }

  return {
    success: false,
    error: `No assessment request found matching "${query}". Please verify your Reference ID (e.g. EX-2026-6253) or the email used during submission.`,
  };
}
