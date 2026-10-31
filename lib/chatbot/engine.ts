import { chatQABankSeed, QABankItem } from "@/content/seed/chatbot";

export interface ChatSessionState {
  currentNode: string;
  mode: "menu" | "capture_name" | "capture_email" | "capture_company" | "qa";
  fallbackCount: number;
  visitorName?: string;
  visitorEmail?: string;
  visitorCompany?: string;
  visitorNote?: string;
}

export interface ChatEngineOutput {
  reply: string;
  quickReplies: { label: string; action: string; url?: string }[];
  nextState: ChatSessionState;
  intent?: "handoff" | "assessment" | "qa" | "menu" | "lead_captured" | "track";
  leadPayload?: {
    name: string;
    email: string;
    company: string;
    note?: string;
  };
  navigationLink?: {
    label: string;
    url: string;
  };
}

export interface ChatMenuItemNode {
  key: string;
  parent?: string;
  position: number;
  label: string;
  text: string;
  keywords: string[];
  action?: string;
  url?: string;
}

export const CHAT_MENU_TREE: Record<string, ChatMenuItemNode> = {
  main: {
    key: "main",
    position: 0,
    label: "Main Menu",
    text: "Welcome to Exergy Solutions. I am your automated engineering assistant. How can we optimize your plant today?\n\n1. Services Overview\n2. Industries Served\n3. Request an Assessment\n4. Frequently Asked Questions\n5. About Our Physics Approach\n6. Talk to a Human Specialist\n7. Track Your Request Status",
    keywords: ["menu", "main", "start", "restart", "home"],
  },
  services: {
    key: "services",
    parent: "main",
    position: 1,
    label: "Services",
    text: "We optimize 6 core industrial energy and water streams:\n\n• Cooling optimization (Chilled water & refrigeration)\n• Heating & steam (Boilers & heat recovery)\n• Drying processes (Thermal & mechanical dewatering)\n• Water quality (Desalination & effluent reuse)\n• Waste-heat recovery (ORC & cascading)\n• Process integration (Plant-wide pinch analysis)\n\n1. Request Facility Assessment\n2. Speak to an Engineer (Lead Capture)\n0. Main Menu",
    keywords: ["service", "services", "cooling", "heating", "steam", "drying", "water", "waste-heat", "process"],
    url: "/services",
  },
  industries: {
    key: "industries",
    parent: "main",
    position: 2,
    label: "Industries",
    text: "We specialize in heavy operations where energy and water are mission-critical:\n\n1. Paper Mills\n2. Processing (Food & Chemical)\n3. Petroleum & Refining\n4. Commercial Buildings\n5. Hospitality\n6. Healthcare & Cleanrooms",
    keywords: ["industry", "industries", "sectors", "paper", "petroleum", "buildings", "hospitality", "healthcare"],
    url: "/industries",
  },
  assessment: {
    key: "assessment",
    parent: "main",
    position: 3,
    label: "Assessment",
    text: "Book a no-obligation exergy assessment. We will quantify the opportunity and back our implementation with a performance guarantee. We reply within one business day.",
    keywords: ["assessment", "audit", "quote", "book", "cost"],
    action: "start_assessment",
    url: "/assessment",
  },
  faqs: {
    key: "faqs",
    parent: "main",
    position: 4,
    label: "FAQs",
    text: "Frequently Asked Questions:\n\n• What is exergy analysis?\n• How is this different from a normal energy audit?\n• What does guaranteed turnkey mean?\n• How much can we save? (Typical: 25–30% cut)",
    keywords: ["faq", "faqs", "question", "questions", "answers"],
  },
  approach: {
    key: "approach",
    parent: "main",
    position: 5,
    label: "Approach",
    text: "Efficiency engineered from the laws of physics. While first-law audits count kilowatt-hours, we measure useful work potential (second law) to find savings conventional methods overlook.",
    keywords: ["approach", "method", "physics", "thermodynamics", "second law"],
    url: "/approach",
  },
  handoff: {
    key: "handoff",
    parent: "main",
    position: 6,
    label: "Talk to a Human",
    text: "Our engineering operations team is available at sarfraz@exergy-solutions.com and info@support.exergy-solutions.com.\n\nTo have an engineer follow up directly with your facility, what is your full name?",
    keywords: ["human", "agent", "person", "representative", "call", "engineer", "help", "talk", "handoff"],
    action: "handoff",
  },
  track: {
    key: "track",
    parent: "main",
    position: 7,
    label: "Track Your Request",
    text: "You can track the live status of your assessment request anytime inside your Client Account Portal (/portal) or tracking page (/track). Sign in to view assigned engineers, thermodynamic modeling progress, and direct contact details.",
    keywords: ["track", "tracking", "status", "progress", "reference", "my request", "check status", "order", "lead"],
    action: "track",
    url: "/track",
  },
};

const HUMAN_PATTERNS = [
  /\bhuman\b/,
  /\bagent\b/,
  /\bperson\b/,
  /\bcall me\b/,
  /\bcall\b/,
  /\bengineer\b/,
  /\brepresentative\b/,
  /\bspeak\b/,
  /\btalk\b/,
  /\bcontact\b/,
  /\bhandoff\b/,
];

const GREETING_PATTERNS = [
  /\bhello\b/,
  /\bhi\b/,
  /\bhey\b/,
  /\bgreetings\b/,
  /\bgood\s+morning\b/,
  /\bgood\s+afternoon\b/,
  /\bgood\s+evening\b/,
  /\bsalam\b/,
  /\bmarhaba\b/,
];

// Direct section navigation patterns
const NAVIGATION_RULES: {
  patterns: RegExp[];
  reply: string;
  url: string;
  label: string;
}[] = [
  {
    patterns: [
      /\b(where\s+can\s+i\s+see|show\s+me|explore|view)\s+your\s+services\b/,
      /\bwhere\s+are\s+the\s+services\b/,
    ],
    reply: "You can explore all our services here.\n\n[Explore Services → /services]",
    url: "/services",
    label: "Explore Services",
  },
  {
    patterns: [
      /\b(how\s+can\s+i\s+contact|how\s+to\s+contact)\s+(your\s+team|you|support)\b/,
      /\bwhere\s+can\s+i\s+contact\b/,
      /\bcontact\s+page\b/,
    ],
    reply: "You can reach our engineering team through our contact page.\n\n[Contact Us → /contact]",
    url: "/contact",
    label: "Contact Us",
  },
  {
    patterns: [
      /\b(where\s+can\s+i\s+see|view|check)\s+(your\s+)?pricing\b/,
      /\bhow\s+much\s+does\s+it\s+cost\b/,
      /\bview\s+pricing\b/,
    ],
    reply: "You can find our available packages and turnkey ROI models here.\n\n[View Pricing → /pricing]",
    url: "/assessment",
    label: "View Pricing",
  },
  {
    patterns: [
      /\b(how\s+do\s+i\s+track|track\s+my\s+request|check\s+status\s+of\s+my\s+request)\b/,
    ],
    reply: "You can monitor the live status of your facility assessment request here.\n\n[Track Request → /track]",
    url: "/track",
    label: "Track Request",
  },
  {
    patterns: [
      /\b(where\s+is|open)\s+(the\s+)?(client\s+)?portal\b/,
    ],
    reply: "You can access your client account portal here.\n\n[Client Portal → /portal]",
    url: "/portal",
    label: "Client Portal",
  },
  {
    patterns: [
      /\b(cooling\s+services?|cooling\s+optimization)\b/,
    ],
    reply: "Explore our industrial cooling and refrigeration optimization engineering.\n\n[Cooling Optimization → /services#cooling]",
    url: "/services#cooling",
    label: "Cooling Optimization",
  },
  {
    patterns: [
      /\b(heating\s+services?|steam\s+optimization|boilers?)\b/,
    ],
    reply: "Learn how we integrate boiler steam networks and heat recovery.\n\n[Heating & Steam → /services#heating]",
    url: "/services#heating",
    label: "Heating & Steam",
  },
  {
    patterns: [
      /\b(drying\s+processes?|dewatering|paper\s+drying)\b/,
    ],
    reply: "Discover our thermal and mechanical drying optimizations for paper and processing.\n\n[Drying Processes → /services#drying]",
    url: "/services#drying",
    label: "Drying Processes",
  },
  {
    patterns: [
      /\b(water\s+quality|desalination\s+consultancy|effluent\s+treatment)\b/,
    ],
    reply: "Review our low-energy desalination, effluent reuse, and water quality solutions.\n\n[Water Quality → /services#water]",
    url: "/services#water",
    label: "Water Quality",
  },
  {
    patterns: [
      /\b(waste\s*heat\s*recovery|orc\s+systems?)\b/,
    ],
    reply: "Discover our low-grade thermal cascading and ORC power generation systems.\n\n[Waste-Heat Recovery → /services#waste-heat]",
    url: "/services#waste-heat",
    label: "Waste-Heat Recovery",
  },
  {
    patterns: [
      /\b(process\s+integration|pinch\s+analysis)\b/,
    ],
    reply: "Learn about our whole-plant pinch analysis unifying thermal energy and water.\n\n[Process Integration → /services#process]",
    url: "/services#process",
    label: "Process Integration",
  },
];

/**
 * Pure function: deterministic rule-based chatbot engine with interactive lead capture
 * and website-aware navigation.
 */
export function handleChatMessage(
  state: ChatSessionState,
  input: string,
  qaBank: QABankItem[] = chatQABankSeed,
  menuTree: Record<string, ChatMenuItemNode> = CHAT_MENU_TREE
): ChatEngineOutput {
  const tree = menuTree || CHAT_MENU_TREE;
  const rawTrimmed = input.trim();
  const normalized = rawTrimmed
    .toLowerCase()
    .replace(/[^\w\s]/gi, " ")
    .trim()
    .replace(/\s+/g, " ");

  // 0. Cancellation / Reset while in multi-step form mode
  if (
    normalized === "cancel" ||
    normalized === "exit" ||
    normalized === "stop" ||
    normalized === "main" ||
    normalized === "menu" ||
    normalized === "0" ||
    normalized === "start over" ||
    normalized === "restart"
  ) {
    if ((state.mode && state.mode.startsWith("capture_")) || state.currentNode === "handoff") {
      return {
        reply: "Conversation reset. How else can we help optimize your operations today?",
        quickReplies: getMainQuickReplies(),
        nextState: {
          currentNode: "main",
          mode: "menu",
          fallbackCount: 0,
        },
        intent: "menu",
      };
    }
  }

  // B. Lead Capture Mode: Step 2 - Work Email
  if (state.mode === "capture_email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(rawTrimmed)) {
      return {
        reply: "Please enter a valid work email address (e.g., engineer@plant.com) or type 'cancel':",
        quickReplies: [{ label: "Cancel", action: "main" }],
        nextState: state,
      };
    }
    const visitorEmail = rawTrimmed;
    return {
      reply: `Thank you! What company or facility are you with, and what is your main industrial process challenge?`,
      quickReplies: [{ label: "Cancel", action: "main" }],
      nextState: {
        ...state,
        visitorEmail,
        currentNode: "handoff",
        mode: "capture_company",
        fallbackCount: 0,
      },
    };
  }

  // C. Lead Capture Mode: Step 3 - Company & Process Challenge
  if (state.mode === "capture_company") {
    const visitorCompany = rawTrimmed.length > 0 ? rawTrimmed : "Company not specified";
    const leadPayload = {
      name: state.visitorName || "Website Visitor",
      email: state.visitorEmail || "",
      company: visitorCompany,
      note: rawTrimmed,
    };

    return {
      reply: `Thank you, ${leadPayload.name}! Your request has been logged and dispatched to our engineering team in Dubai.\n\nA senior specialist will review your requirements and follow up at ${leadPayload.email} within one business day.\n\nOur operations desk can also be contacted directly at sarfraz@exergy-solutions.com and info@support.exergy-solutions.com.`,
      quickReplies: [
        { label: "1. Services Overview", action: "services" },
        { label: "3. Full Assessment", action: "assessment" },
        { label: "7. Track Status", action: "track" },
        { label: "Main Menu", action: "main" },
      ],
      nextState: {
        currentNode: "main",
        mode: "menu",
        fallbackCount: 0,
        visitorName: leadPayload.name,
        visitorEmail: leadPayload.email,
        visitorCompany: leadPayload.company,
      },
      intent: "lead_captured",
      leadPayload,
    };
  }

  // A. Lead Capture Mode: Step 1 - Full Name
  if (state.mode === "capture_name" || state.currentNode === "handoff") {
    if (
      normalized === "6" ||
      normalized === "handoff" ||
      HUMAN_PATTERNS.some((pattern) => pattern.test(normalized))
    ) {
      return formatNodeOutput(tree.handoff || CHAT_MENU_TREE.handoff, {
        ...state,
        currentNode: "handoff",
        mode: "capture_name",
        fallbackCount: 0,
      });
    }

    if (rawTrimmed.length < 2) {
      return {
        reply: "Please provide your full name (or type 'cancel' to exit):",
        quickReplies: [{ label: "Cancel", action: "main" }],
        nextState: {
          ...state,
          currentNode: "handoff",
          mode: "capture_name",
        },
      };
    }

    const visitorName = rawTrimmed;
    return {
      reply: `Nice to meet you, ${visitorName}. What is your work email address so our engineers can contact you?`,
      quickReplies: [{ label: "Cancel", action: "main" }],
      nextState: {
        ...state,
        visitorName,
        currentNode: "handoff",
        mode: "capture_email",
        fallbackCount: 0,
      },
    };
  }

  // 1. Direct Action / Button Tap (node_key)
  if (tree[input]) {
    const node = tree[input];
    return formatNodeOutput(node, state);
  }

  // 2. Global Shortcuts: Menu / Main / 0 / Restart
  if (
    normalized === "0" ||
    normalized === "menu" ||
    normalized === "main" ||
    normalized === "start over" ||
    normalized === "restart"
  ) {
    return formatNodeOutput(tree.main || CHAT_MENU_TREE.main, {
      ...state,
      currentNode: "main",
      fallbackCount: 0,
      mode: "menu",
    });
  }

  // 3. Contextual Sub-Menu Handlers
  if (state.currentNode === "services") {
    if (
      normalized === "2" ||
      normalized === "lead capture" ||
      normalized === "speak to engineer" ||
      normalized === "speak to an engineer" ||
      normalized === "talk to human" ||
      normalized === "engineer"
    ) {
      return formatNodeOutput(tree.handoff || CHAT_MENU_TREE.handoff, {
        ...state,
        currentNode: "handoff",
        mode: "capture_name",
        fallbackCount: 0,
      });
    }
    if (normalized === "1" || normalized === "assessment" || normalized === "request assessment") {
      return formatNodeOutput(tree.assessment || CHAT_MENU_TREE.assessment, state);
    }
  }

  // 3.5. Direct Website Navigation Pattern Match
  for (const nav of NAVIGATION_RULES) {
    if (nav.patterns.some((p) => p.test(normalized))) {
      return {
        reply: nav.reply,
        quickReplies: [
          { label: `${nav.label} →`, action: `nav_${nav.url}`, url: nav.url },
          { label: "Book Assessment", action: "assessment", url: "/assessment" },
          { label: "Main Menu", action: "main" },
        ],
        navigationLink: {
          label: `${nav.label} →`,
          url: nav.url,
        },
        nextState: { ...state, fallbackCount: 0, mode: "menu" },
      };
    }
  }

  // 4. Global Shortcuts: Human / Agent / Person / Call / Engineer
  if (normalized === "6" || HUMAN_PATTERNS.some((pattern) => pattern.test(normalized))) {
    return formatNodeOutput(tree.handoff || CHAT_MENU_TREE.handoff, {
      ...state,
      currentNode: "handoff",
      mode: "capture_name",
      fallbackCount: 0,
    });
  }

  // 5. Greetings: Hi / Hello / Good morning / etc.
  if (GREETING_PATTERNS.some((pattern) => pattern.test(normalized))) {
    return {
      reply: "Hello! Welcome to Exergy Solutions. I am your automated engineering assistant.\n\nHow can we help optimize your plant's energy and water streams today?",
      quickReplies: getMainQuickReplies(),
      nextState: {
        ...state,
        currentNode: "main",
        mode: "menu",
        fallbackCount: 0,
      },
      intent: "menu",
    };
  }

  // 6. Global Shortcuts: Back / 9
  if (normalized === "9" || normalized === "back") {
    const current = tree[state.currentNode] || CHAT_MENU_TREE[state.currentNode];
    const parentKey = current?.parent || "main";
    return formatNodeOutput(tree[parentKey] || tree.main || CHAT_MENU_TREE.main, {
      ...state,
      currentNode: parentKey,
      fallbackCount: 0,
    });
  }

  // 7. Position Number Matching (1-7)
  if (/^[1-7]$/.test(normalized)) {
    const num = parseInt(normalized, 10);
    const targetNode = Object.values(tree).find((n) => n.position === num);
    if (targetNode) {
      return formatNodeOutput(targetNode, state);
    }
  }


  // 9. Keyword Match against Menu Items (Whole-word boundary)
  for (const node of Object.values(CHAT_MENU_TREE)) {
    if (
      node.keywords.some((kw) => {
        const regex = new RegExp(`\\b${kw}\\b`, "i");
        return regex.test(normalized);
      })
    ) {
      return formatNodeOutput(node, state);
    }
  }

  // 10. Keyword & Synonyms Overlap against Q&A Bank
  let bestQA: QABankItem | null = null;
  let maxScore = 0;

  for (const qa of qaBank) {
    let score = 0;

    // Check direct synonym phrases
    if (qa.synonyms) {
      for (const syn of qa.synonyms) {
        if (normalized.includes(syn.toLowerCase())) {
          score += 3;
        }
      }
    }

    // Check keywords
    for (const kw of qa.keywords) {
      const regex = new RegExp(`\\b${kw}\\b`, "i");
      if (regex.test(normalized)) {
        score += 1;
      }
    }

    if (score > maxScore) {
      maxScore = score;
      bestQA = qa;
    }
  }

  if (bestQA && maxScore >= 1) {
    const quickReplies: { label: string; action: string; url?: string }[] = [];

    if (bestQA.destination_url) {
      quickReplies.push({
        label: `View ${bestQA.source_page || "Section"} →`,
        action: `nav_${bestQA.destination_url}`,
        url: bestQA.destination_url,
      });
    }

    quickReplies.push(
      { label: "Request Assessment", action: "assessment", url: "/assessment" },
      { label: "Main Menu", action: "main" },
      { label: "Talk to Human", action: "handoff" }
    );

    return {
      reply: `${bestQA.answer}\n\n(Source: ${bestQA.source_page})`,
      quickReplies,
      navigationLink: bestQA.destination_url
        ? {
            label: `Explore ${bestQA.source_page} →`,
            url: bestQA.destination_url,
          }
        : undefined,
      nextState: { ...state, fallbackCount: 0, mode: "qa" },
      intent: "qa",
    };
  }

  // 11. Fallback Ladder
  const newFallback = state.fallbackCount + 1;
  const reply =
    newFallback >= 2
      ? "I didn't quite catch that. Would you like to view our services menu or speak directly with an engineer in Dubai?"
      : "I didn't catch that, here is our menu again:";

  return {
    reply,
    quickReplies: [
      { label: "1. Services", action: "services" },
      { label: "2. Industries", action: "industries" },
      { label: "3. Assessment", action: "assessment" },
      { label: "7. Track Request", action: "track" },
      { label: "Talk to Human", action: "handoff" },
    ],
    nextState: { ...state, fallbackCount: newFallback },
  };
}

function getMainQuickReplies(): { label: string; action: string; url?: string }[] {
  return [
    { label: "1. Services", action: "services", url: "/services" },
    { label: "2. Industries", action: "industries", url: "/industries" },
    { label: "3. Assessment", action: "assessment", url: "/assessment" },
    { label: "4. FAQs", action: "faqs" },
    { label: "5. Approach", action: "approach", url: "/approach" },
    { label: "6. Talk to Human", action: "handoff" },
    { label: "7. Track Request", action: "track", url: "/track" },
  ];
}

function formatNodeOutput(
  node: ChatMenuItemNode,
  currentState: ChatSessionState
): ChatEngineOutput {
  const quickReplies: { label: string; action: string; url?: string }[] = [];
  const isHandoff = node.key === "handoff";

  if (node.key === "main") {
    quickReplies.push(...getMainQuickReplies());
  } else if (node.key === "services") {
    quickReplies.push(
      { label: "1. Request Assessment", action: "assessment", url: "/assessment" },
      { label: "2. Speak to Engineer", action: "handoff" },
      { label: "Main Menu", action: "main" }
    );
  } else if (node.key === "industries") {
    quickReplies.push(
      { label: "Book Assessment", action: "assessment", url: "/assessment" },
      { label: "Main Menu", action: "main" },
      { label: "Talk to Human", action: "handoff" }
    );
  } else if (node.key === "handoff") {
    quickReplies.push(
      { label: "Cancel", action: "main" },
      { label: "Book Assessment", action: "assessment", url: "/assessment" }
    );
  } else if (node.key === "track") {
    quickReplies.push(
      { label: "Open Tracking Portal", action: "open_portal", url: "/track" },
      { label: "Main Menu", action: "main" },
      { label: "Talk to Human", action: "handoff" }
    );
  } else {
    quickReplies.push(
      { label: "Main Menu", action: "main" },
      { label: "Talk to Human", action: "handoff" }
    );
  }

  const nextState: ChatSessionState = {
    ...currentState,
    currentNode: node.key,
    mode: isHandoff ? "capture_name" : "menu",
    fallbackCount: 0,
  };

  return {
    reply: node.text,
    quickReplies,
    navigationLink: node.url
      ? {
          label: `Open ${node.label} →`,
          url: node.url,
        }
      : undefined,
    nextState,
    intent: node.action as any,
  };
}
