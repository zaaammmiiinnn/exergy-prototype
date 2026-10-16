export interface QABankItem {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  category: string;
  source_page: string;
}

export const chatQABankSeed: QABankItem[] = [
  {
    id: "qa-001",
    question: "What does Exergy Solutions do?",
    answer: "We apply thermodynamics and exergy analysis to slash the capex and opex of energy- and water-intensive operations — delivered as guaranteed, turnkey implementation.",
    keywords: ["what", "do", "company", "about", "exergy", "solutions"],
    category: "general",
    source_page: "Home"
  },
  {
    id: "qa-002",
    question: "What is exergy analysis?",
    answer: "Most audits count kilowatt-hours (first law). We measure exergy — the useful work energy can actually do (second law). That distinction lets us find savings conventional methods overlook.",
    keywords: ["exergy", "analysis", "thermodynamics", "physics", "second law"],
    category: "approach",
    source_page: "Approach"
  },
  {
    id: "qa-003",
    question: "How is this different from a normal energy audit?",
    answer: "First-law audits assume energy is conserved and overlook temperature/pressure degradation. Exergy analysis reveals where useful work potential is destroyed, enabling 25–30% typical resource cuts.",
    keywords: ["audit", "different", "normal", "conventional", "first law"],
    category: "approach",
    source_page: "Approach"
  },
  {
    id: "qa-004",
    question: "What does guaranteed, turnkey mean?",
    answer: "We don't merely supply consulting reports. We engineer, procure, and install the complete solution, backing our results with contractual performance guarantees against baseline instrumentation.",
    keywords: ["guarantee", "turnkey", "contract", "performance", "promise"],
    category: "benefits",
    source_page: "Benefits"
  },
  {
    id: "qa-005",
    question: "What services do you offer?",
    answer: "We provide six core engineering solutions: Cooling optimization, Heating & steam, Drying processes, Water quality, Waste-heat recovery, and Process integration.",
    keywords: ["services", "offer", "solutions", "scope"],
    category: "services",
    source_page: "Services"
  },
  {
    id: "qa-006",
    question: "What is cooling optimization?",
    answer: "Chilled water, refrigeration and HVAC networks re-engineered for minimum exergy loss and lower peak demand.",
    keywords: ["cooling", "chiller", "tower", "hvac", "refrigeration"],
    category: "services",
    source_page: "Services / Cooling"
  },
  {
    id: "qa-007",
    question: "What is heating & steam optimization?",
    answer: "Boiler, steam and hot-water systems integrated with heat recovery to reclaim energy otherwise sent to atmosphere.",
    keywords: ["heating", "steam", "boiler", "hot water"],
    category: "services",
    source_page: "Services / Heating"
  },
  {
    id: "qa-008",
    question: "What does water quality include?",
    answer: "Surface water bodies, effluent treatment and desalination improved through low-energy, regenerative treatment trains.",
    keywords: ["water", "quality", "treatment", "desalination", "effluent", "ro"],
    category: "services",
    source_page: "Services / Water"
  },
  {
    id: "qa-009",
    question: "What is process integration?",
    answer: "Whole-plant pinch and exergy integration unifying capex and opex decisions across energy and water.",
    keywords: ["process", "integration", "pinch", "whole-plant"],
    category: "services",
    source_page: "Services / Process"
  },
  {
    id: "qa-010",
    question: "Which industries do you serve?",
    answer: "We specialize in heavy industrial sectors: Paper, Processing (Food & Chemical), Petroleum, Buildings, Hospitality, and Healthcare.",
    keywords: ["industries", "sectors", "clients", "plants"],
    category: "industries",
    source_page: "Industries"
  },
  {
    id: "qa-011",
    question: "How much can I save?",
    answer: "From well-designed systems we attempt to reduce 5–10%, and in general we have experience of reducing resource utilisation by 25–30%.",
    keywords: ["save", "savings", "reduction", "percent", "cost", "cut"],
    category: "benefits",
    source_page: "About / Benefits"
  },
  {
    id: "qa-012",
    question: "Where are you located?",
    answer: "Our headquarters are at 334/6D Al Wasl Street DM199 Al Satwa, Dubai UAE.",
    keywords: ["where", "location", "address", "dubai", "office"],
    category: "contact",
    source_page: "Contact"
  },
  {
    id: "qa-013",
    question: "What is your email or phone?",
    answer: "You can reach our engineering team directly at sarfraz@exergy-solutions.com or book an assessment online.",
    keywords: ["email", "phone", "contact", "call", "reach"],
    category: "contact",
    source_page: "Contact"
  },
  {
    id: "qa-014",
    question: "How do I request an assessment?",
    answer: "You can complete our 4-step online assessment wizard at /assessment. We will review your facility data and reply within one business day.",
    keywords: ["assessment", "request", "book", "audit", "quote"],
    category: "assessment",
    source_page: "Assessment"
  }
];
