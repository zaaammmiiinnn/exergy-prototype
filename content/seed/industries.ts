export interface IndustrySeed {
  id: string;
  slug: string;
  name: string;
  summary: string;
  body_md: string;
  challenges: string[];
  hero_image: string;
  position: number;
  is_published: boolean;
  locale: string;
}

export const industriesSeed: IndustrySeed[] = [
  {
    id: "ind-001",
    slug: "paper",
    name: "Paper",
    summary: "Drying and steam efficiency at the heart of margin.",
    body_md: "Paper production consumes immense steam and mechanical energy across pulping, refining, and machine drying sections. We apply second-law exergy analysis to balance steam blow-through, hood ventilation, and white-water recovery.",
    challenges: [
      "Massive drying hood thermal losses",
      "Steam condensate return contamination and heat drop",
      "High freshwater intake in pulping and stock prep",
      "Extreme peak electrical demand from refiners"
    ],
    hero_image: "https://images.hostinger.com/2025f758-1013-44c6-b723-1117c9aa2810.png",
    position: 1,
    is_published: true,
    locale: "en"
  },
  {
    id: "ind-002",
    slug: "processing",
    name: "Processing",
    summary: "Integrated heat and water across complex process lines.",
    body_md: "Chemical, food & beverage, and materials processing plants require precise temperature controls, pasteurization, sterilization, and CIP systems. Exergy integration maps concurrent heating and cooling loads.",
    challenges: [
      "Simultaneous heating and cooling requirements across batches",
      "High effluent treatment volumes and organic loads",
      "Boiler steam degradation through non-condensing vents",
      "Refrigeration compressor lift energy spikes"
    ],
    hero_image: "https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png",
    position: 2,
    is_published: true,
    locale: "en"
  },
  {
    id: "ind-003",
    slug: "petroleum",
    name: "Petroleum",
    summary: "Exergy recovery in refining and petrochemical utilities.",
    body_md: "Refining and petrochemical facilities rely on furnace fired heat and complex distillation columns. We identify thermal degradation across reboilers, crude preheat trains, and cooling towers.",
    challenges: [
      "High-temperature furnace stack heat discharge",
      "Severe cooling tower water evaporation losses",
      "Irreversible pressure reduction in steam distribution",
      "Complex multi-utility balancing across units"
    ],
    hero_image: "https://images.hostinger.com/7953796b-93b0-49f3-8314-6db64a5896f2.png",
    position: 3,
    is_published: true,
    locale: "en"
  },
  {
    id: "ind-004",
    slug: "buildings",
    name: "Buildings",
    summary: "HVAC and water systems tuned for comfort and cost.",
    body_md: "Commercial towers, retail developments, and mixed-use districts face extreme cooling loads and chilled water pumping costs. We optimize central cooling plant sequencing, delta-T management, and greywater systems.",
    challenges: [
      "Low delta-T syndrome in chilled water loops",
      "Continuous fresh air cooling and dehumidification penalties",
      "High potable water demand for evaporative cooling towers",
      "High peak tariff penalties during summer daytime hours"
    ],
    hero_image: "https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png",
    position: 4,
    is_published: true,
    locale: "en"
  },
  {
    id: "ind-005",
    slug: "hospitality",
    name: "Hospitality",
    summary: "Reliable comfort with dramatically lower running cost.",
    body_md: "Luxury hotels and resorts demand uninterrupted guest comfort, hot water, and laundry services. We turn central chiller reject heat into high-temperature domestic hot water.",
    challenges: [
      "Huge domestic hot water and laundry thermal demands",
      "Swimming pool heating and cooling balancing",
      "Continuous 24/7 HVAC comfort expectations without failure",
      "Water desalination and landscape irrigation expense"
    ],
    hero_image: "https://images.hostinger.com/f5fa9afd-9b48-4bce-8326-a997fad4bd0c.png",
    position: 5,
    is_published: true,
    locale: "en"
  },
  {
    id: "ind-006",
    slug: "healthcare",
    name: "Healthcare",
    summary: "Resilient, clean utilities that never compromise care.",
    body_md: "Hospitals and pharmaceutical cleanrooms require tight humidity tolerances, 100% outside air changes, and fail-safe redundancy. We eliminate energy waste in reheat loops and steam sterilizers.",
    challenges: [
      "Simultaneous cooling, dehumidification and reheat cycles",
      "Stringent air change rates and hygiene standards",
      "Clean steam generation and condensate management",
      "Mission-critical resilience without downtime"
    ],
    hero_image: "https://images.hostinger.com/2025f758-1013-44c6-b723-1117c9aa2810.png",
    position: 6,
    is_published: true,
    locale: "en"
  }
];
