import { chatQABankSeed, QABankItem } from "@/content/seed/chatbot";

export interface ChatSessionState {
  currentNode: string;
  mode: "menu" | "capture_name" | "capture_email" | "qa";
  fallbackCount: number;
  visitorName?: string;
  visitorEmail?: string;
}

export interface ChatEngineOutput {
  reply: string;
  quickReplies: { label: string; action: string }[];
  nextState: ChatSessionState;
  intent?: "handoff" | "assessment" | "qa" | "menu";
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
    text: "Welcome to Exergy Solutions. I am your automated engineering assistant. How can we optimize your plant today?\n\n1. Services Overview\n2. Industries Served\n3. Request an Assessment\n4. Frequently Asked Questions\n5. About Our Physics Approach\n6. Talk to a Human Specialist",
    keywords: ["menu", "main", "start", "restart", "home"],
  },
  services: {
    key: "services",
    parent: "main",
    position: 1,
    label: "Services",
    text: "We optimize 6 core industrial energy and water streams:\n\n• Cooling optimization (Chilled water & refrigeration)\n• Heating & steam (Boilers & heat recovery)\n• Drying processes (Thermal & mechanical dewatering)\n• Water quality (Desalination & effluent reuse)\n• Waste-heat recovery (ORC & cascading)\n• Process integration (Plant-wide pinch analysis)",
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
    text: "Our engineering operations team has been alerted at neuralwaves.official@gmail.com and support@neuralwaves.in. An engineer will follow up directly.",
    keywords: ["human", "agent", "person", "representative", "call", "engineer", "help"],
    action: "handoff",
  },
};

/**
 * Pure function: deterministic rule-based chatbot engine.
 * No I/O inside this matcher.
 */
export function handleChatMessage(
  state: ChatSessionState,
  input: string,
  qaBank: QABankItem[] = chatQABankSeed
): ChatEngineOutput {
  const normalized = input
    .toLowerCase()
    .replace(/[^\w\s]/gi, " ")
    .trim()
    .replace(/\s+/g, " ");

  // 1. Direct Action / Button Tap (node_key)
  if (CHAT_MENU_TREE[input]) {
    const node = CHAT_MENU_TREE[input];
    return formatNodeOutput(node, { ...state, currentNode: node.key, fallbackCount: 0 });
  }

  // 2. Global Shortcuts: Menu / Main / 0
  if (
    normalized === "0" ||
    normalized === "menu" ||
    normalized === "main" ||
    normalized === "start over" ||
    normalized === "restart"
  ) {
    return formatNodeOutput(CHAT_MENU_TREE.main, {
      ...state,
      currentNode: "main",
      fallbackCount: 0,
      mode: "menu",
    });
  }

  // 3. Global Shortcuts: Human / Agent / Person / Call / Engineer
  const humanPatterns = [
    /\bhuman\b/,
    /\bagent\b/,
    /\bperson\b/,
    /\bcall me\b/,
    /\bcall\b/,
    /\bengineer\b/,
    /\brepresentative\b/,
    /\bspeak\b/,
  ];
  if (normalized === "6" || humanPatterns.some((pattern) => pattern.test(normalized))) {
    return formatNodeOutput(CHAT_MENU_TREE.handoff, {
      ...state,
      currentNode: "handoff",
      fallbackCount: 0,
    });
  }

  // 4. Global Shortcuts: Back / 9
  if (normalized === "9" || normalized === "back") {
    const current = CHAT_MENU_TREE[state.currentNode];
    const parentKey = current?.parent || "main";
    return formatNodeOutput(CHAT_MENU_TREE[parentKey] || CHAT_MENU_TREE.main, {
      ...state,
      currentNode: parentKey,
      fallbackCount: 0,
    });
  }

  // 5. Position Number Matching
  if (/^[1-6]$/.test(normalized)) {
    const num = parseInt(normalized, 10);
    const targetNode = Object.values(CHAT_MENU_TREE).find((n) => n.position === num);
    if (targetNode) {
      return formatNodeOutput(targetNode, {
        ...state,
        currentNode: targetNode.key,
        fallbackCount: 0,
      });
    }
  }

  // 6. Keyword Match against Menu Items (Whole-word boundary)
  for (const node of Object.values(CHAT_MENU_TREE)) {
    if (
      node.keywords.some((kw) => {
        const regex = new RegExp(`\\b${kw}\\b`, "i");
        return regex.test(normalized);
      })
    ) {
      return formatNodeOutput(node, {
        ...state,
        currentNode: node.key,
        fallbackCount: 0,
      });
    }
  }

  // 7. Keyword Overlap against Q&A Bank (Whole-word boundary)
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

  // 8. Fallback Ladder
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
      { label: "Talk to Human", action: "handoff" },
    ],
    nextState: { ...state, fallbackCount: newFallback },
  };
}

function formatNodeOutput(
  node: ChatMenuItemNode,
  nextState: ChatSessionState
): ChatEngineOutput {
  const quickReplies: { label: string; action: string }[] = [];

  if (node.key === "main") {
    quickReplies.push(
      { label: "1. Services", action: "services" },
      { label: "2. Industries", action: "industries" },
      { label: "3. Assessment", action: "assessment" },
      { label: "4. FAQs", action: "faqs" },
      { label: "5. Approach", action: "approach" },
      { label: "6. Talk to Human", action: "handoff" }
    );
  } else if (node.key === "services") {
    quickReplies.push(
      { label: "Request Assessment", action: "assessment" },
      { label: "Main Menu", action: "main" },
      { label: "Talk to Human", action: "handoff" }
    );
  } else if (node.key === "industries") {
    quickReplies.push(
      { label: "Book Assessment", action: "assessment" },
      { label: "Main Menu", action: "main" },
      { label: "Talk to Human", action: "handoff" }
    );
  } else {
    quickReplies.push(
      { label: "Main Menu", action: "main" },
      { label: "Talk to Human", action: "handoff" }
    );
  }

  return {
    reply: node.text,
    quickReplies,
    nextState,
    intent: node.action as any,
  };
}
