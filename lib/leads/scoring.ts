export interface ScoringInput {
  email: string;
  phone?: string;
  sector: string;
  services: string[];
  timeline: string;
  mainChallenge?: string;
  source?: string;
}

export interface ScoringResult {
  score: number;
  priority: "hot" | "warm" | "cold";
  breakdown: Record<string, number>;
}

const PUBLIC_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "mail.com",
  "aol.com",
];

const TARGET_SECTORS = [
  "paper",
  "processing",
  "petroleum",
  "buildings",
  "hospitality",
  "healthcare",
];

export function calculateLeadScore(input: ScoringInput): ScoringResult {
  let score = 0;
  const breakdown: Record<string, number> = {};

  // 1. Timeline
  if (input.timeline === "this_quarter") {
    score += 30;
    breakdown["timeline_this_quarter"] = 30;
  } else if (input.timeline === "six_months") {
    score += 15;
    breakdown["timeline_six_months"] = 15;
  }

  // 2. Target Sector
  if (TARGET_SECTORS.includes(input.sector.toLowerCase())) {
    score += 20;
    breakdown["target_sector"] = 20;
  }

  // 3. Phone provided
  if (input.phone && input.phone.trim().length >= 7) {
    score += 10;
    breakdown["phone_provided"] = 10;
  }

  // 4. Corporate domain email
  const domain = input.email.split("@")[1]?.toLowerCase() || "";
  if (domain && !PUBLIC_EMAIL_DOMAINS.includes(domain)) {
    score += 15;
    breakdown["corporate_email"] = 15;
  }

  // 5. Multiple utility streams
  if (input.services && input.services.length >= 2) {
    score += 10;
    breakdown["multiple_services"] = 10;
  }

  // 6. Challenge description detail (>80 characters)
  if (input.mainChallenge && input.mainChallenge.trim().length >= 80) {
    score += 10;
    breakdown["detailed_challenge"] = 10;
  }

  // 7. Source is chatbot handoff
  if (input.source === "handoff") {
    score += 15;
    breakdown["chatbot_handoff"] = 15;
  }

  // Determine priority
  let priority: "hot" | "warm" | "cold" = "cold";
  if (score >= 60) {
    priority = "hot";
  } else if (score >= 35) {
    priority = "warm";
  }

  return {
    score,
    priority,
    breakdown,
  };
}
