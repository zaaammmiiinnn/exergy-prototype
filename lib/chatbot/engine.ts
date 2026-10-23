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
  quickReplies: { label: string; action: string }[];
  nextState: ChatSessionState;
  intent?: "handoff" | "assessment" | "qa" | "menu" | "lead_captured" | "track";
  leadPayload?: {
    name: string;
    email: string;
    company: string;
    note?: string;
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
  },
  industries: {
    key: "industries",
    parent: "main",
    position: 2,
    label: "Industries",
    text: "We specialize in heavy operations where energy and water are mission-critical:\n\n1. Paper Mills\n2. Processing (Food & Chemical)\n3. Petroleum & Refining\n4. Commercial Buildings\n5. Hospitality\n6. Healthcare & Cleanrooms",
    keywords: ["industry", "industries", "sectors", "paper", "petroleum", "buildings", "hospitality", "healthcare"],
  },
  assessment: {
    key: "assessment",
    parent: "main",
    position: 3,
    label: "Assessment",
    text: "Book a no-obligation exergy assessment. We will quantify the opportunity and back our implementation with a performance guarantee. We reply within one business day.",
    keywords: ["assessment", "audit", "quote", "book", "cost"],
    action: "start_assessment",
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
  },
  handoff: {
    key: "handoff",
    parent: "main",
    position: 6,
    label: "Talk to a Human",
    text: "Our engineering operations team is available at sarfraz@exergy-solutions.com and info@exergy-solutions.com.\n\nTo have an engineer follow up directly with your facility, what is your full name?",
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

/**
 * Pure function: deterministic rule-based chatbot engine with interactive lead capture.
 * No I/O inside this matcher.
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

  // B. Lead Capture Mode: Step 2 - Work Email (Checked before name)
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
      reply: `Thank you, ${leadPayload.name}! Your request has been logged and dispatched to our engineering team in Dubai.\n\nA senior specialist will review your requirements and follow up at ${leadPayload.email} within one business day.\n\nOur operations desk can also be contacted directly at sarfraz@exergy-solutions.com and info@exergy-solutions.com.`,
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
  // Matches if mode is capture_name OR if visitor is currently at the handoff node
  if (state.mode === "capture_name" || state.currentNode === "handoff") {
    // If the visitor just clicked handoff or typed a human keyword again, prompt clearly for name
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

  // 3. Contextual Sub-Menu Handlers (e.g. In Services: 1 -> Assessment, 2 -> Lead Capture)
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

  // 7. Keyword Match against Menu Items (Whole-word boundary)
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

  // 8. Keyword Overlap against Q&A Bank (Whole-word boundary)
  let bestQA: QABankItem | null = null;
  let maxScore = 0;

  for (const qa of qaBank) {
    let score = 0;
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
    return {
      reply: `${bestQA.answer}\n\n(Source: ${bestQA.source_page})`,
      quickReplies: [
        { label: "Request Assessment", action: "assessment" },
        { label: "Main Menu", action: "main" },
        { label: "Talk to Human", action: "handoff" },
      ],
      nextState: { ...state, fallbackCount: 0, mode: "qa" },
      intent: "qa",
    };
  }

  // 9. Fallback Ladder
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

function getMainQuickReplies(): { label: string; action: string }[] {
  return [
    { label: "1. Services", action: "services" },
    { label: "2. Industries", action: "industries" },
    { label: "3. Assessment", action: "assessment" },
    { label: "4. FAQs", action: "faqs" },
    { label: "5. Approach", action: "approach" },
    { label: "6. Talk to Human", action: "handoff" },
    { label: "7. Track Request", action: "track" },
  ];
}

function formatNodeOutput(
  node: ChatMenuItemNode,
  currentState: ChatSessionState
): ChatEngineOutput {
  const quickReplies: { label: string; action: string }[] = [];
  const isHandoff = node.key === "handoff";

  if (node.key === "main") {
    quickReplies.push(...getMainQuickReplies());
  } else if (node.key === "services") {
    quickReplies.push(
      { label: "1. Request Assessment", action: "assessment" },
      { label: "2. Speak to Engineer", action: "handoff" },
      { label: "Main Menu", action: "main" }
    );
  } else if (node.key === "industries") {
    quickReplies.push(
      { label: "Book Assessment", action: "assessment" },
      { label: "Main Menu", action: "main" },
      { label: "Talk to Human", action: "handoff" }
    );
  } else if (node.key === "handoff") {
    quickReplies.push(
      { label: "Cancel", action: "main" },
      { label: "Book Assessment", action: "assessment" }
    );
  } else if (node.key === "track") {
    quickReplies.push(
      { label: "Open Tracking Portal", action: "open_portal" },
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
    nextState,
    intent: node.action as any,
  };
}
