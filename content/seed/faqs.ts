export interface FAQItem {
  question: string;
  answer: string;
  category: "general" | "methodology" | "results" | "commercial";
}

export const homeFAQs: FAQItem[] = [
  {
    category: "general",
    question: "What is exergy analysis and how does it differ from a conventional energy audit?",
    answer:
      "Conventional energy audits only track first-law energy balances (counting kilowatt-hours) and assume energy quantity is conserved, overlooking temperature and pressure degradation. Second-law exergy analysis measures the true useful work potential of energy and water streams, pinpointing where thermodynamic capacity is irreversibly destroyed by friction, throttling, mixing, and large temperature differentials. This reveals 25% to 45% utility reductions that standard audits overlook.",
  },
  {
    category: "results",
    question: "What typical energy, water, and cost savings does Exergy Solutions achieve?",
    answer:
      "Across continuous processing and manufacturing assets, Exergy Solutions delivers typical energy reductions of 30% to 45% and up to 35% water recovery. Specific KPIs include lowering chiller plant specific consumption by 18% to 28% (kW/TR), increasing industrial boiler efficiency to 88%+, and reducing seawater reverse osmosis specific energy consumption to <3.0 kWh/m³.",
  },
  {
    category: "commercial",
    question: "How does the 100% turnkey performance guarantee work?",
    answer:
      "Every project proposal includes guaranteed thermodynamic performance. We establish an empirical baseline using calibrated on-site instrumentation aligned with IPMVP (International Performance Measurement and Verification Protocol) Option B/C and ISO 50001 standards. If the guaranteed savings are not met during verification, Exergy Solutions bridges the gap at its own expense.",
  },
  {
    category: "methodology",
    question: "What is Pinch Analysis and how is it applied to industrial heating and cooling?",
    answer:
      "Pinch Analysis is a rigorous thermodynamic methodology that constructs composite hot and cold thermal curves across all process streams. By identifying the plant's thermodynamic 'pinch point', it calculates the minimum external heating and cooling duties theoretically possible and synthesizes optimal heat exchanger networks (HEN) to eliminate cross-pinch heat transfer.",
  },
  {
    category: "general",
    question: "Which industrial sectors and facility types qualify for a thermodynamic assessment?",
    answer:
      "We focus on energy- and water-intensive industrial assets across the UAE, Saudi Arabia, and GCC, including Food & Beverage Processing, Chemical & Petrochemical Plants, District Cooling Networks, Pulp & Paper Manufacturing, Commercial Real Estate / Hospitality Resorts, and Municipal Water/Wastewater infrastructure.",
  },
  {
    category: "commercial",
    question: "Where is Exergy Solutions located and how do we initiate an assessment?",
    answer:
      "Exergy Solutions FZE is headquartered at 334/6D Al Wasl Street, DM199 Al Satwa, Dubai, UAE. Plant engineering teams can initiate a preliminary evaluation in under 2 minutes through our online assessment wizard at exergy-solutions.com/assessment or contact our Dubai technical intake desk at info@support.exergy-solutions.com.",
  },
];

