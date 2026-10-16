export interface ServiceSeed {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body_md: string;
  highlights: string[];
  hero_image: string;
  icon: string;
  position: number;
  is_published: boolean;
  locale: string;
  seo_title: string;
  seo_description: string;
}

export const servicesSeed: ServiceSeed[] = [
  {
    id: "srv-001",
    slug: "cooling",
    title: "Cooling optimization",
    summary: "Chilled water, refrigeration and HVAC networks re-engineered for minimum exergy loss and lower peak demand.",
    body_md: "Chilled water, refrigeration and HVAC networks re-engineered for minimum exergy loss and lower peak demand. We analyze heat dissipation and refrigeration lift cycles to minimize thermodynamic irreversibility.",
    highlights: [
      "Chilled water & cooling tower balancing",
      "Refrigeration cycle exergy recovery",
      "Lower peak electricity demand charges",
      "Dynamic load matching & reset controls"
    ],
    hero_image: "https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png",
    icon: "Snowflake",
    position: 1,
    is_published: true,
    locale: "en",
    seo_title: "Cooling Optimization | Exergy Solutions",
    seo_description: "Chilled water, refrigeration and HVAC networks re-engineered for minimum exergy loss and lower peak demand."
  },
  {
    id: "srv-002",
    slug: "heating",
    title: "Heating & steam",
    summary: "Boiler, steam and hot-water systems integrated with heat recovery to reclaim energy otherwise sent to atmosphere.",
    body_md: "Boiler, steam and hot-water systems integrated with heat recovery to reclaim energy otherwise sent to atmosphere. We diagnose high-pressure steam drop irreversibility and capture high-grade heat.",
    highlights: [
      "High-pressure to low-pressure steam exergy preservation",
      "Flue-gas economizer & condensate heat recovery",
      "Steam trap monitoring & flash steam reuse",
      "Boiler combustion efficiency tuning"
    ],
    hero_image: "https://images.hostinger.com/7953796b-93b0-49f3-8314-6db64a5896f2.png",
    icon: "Flame",
    position: 2,
    is_published: true,
    locale: "en",
    seo_title: "Heating & Steam Optimization | Exergy Solutions",
    seo_description: "Boiler, steam and hot-water systems integrated with heat recovery to reclaim energy otherwise sent to atmosphere."
  },
  {
    id: "srv-003",
    slug: "drying",
    title: "Drying processes",
    summary: "Thermal and mechanical dewatering redesigned to cut the single largest energy cost in paper and processing.",
    body_md: "Thermal and mechanical dewatering redesigned to cut the single largest energy cost in paper and processing. We optimize air exchange humidity ratios and latent heat recovery.",
    highlights: [
      "Mechanical vs thermal dewatering pinch balance",
      "Hood exhaust heat recovery & heat pumps",
      "Target moisture uniformity controls",
      "Reduction of drying cycle specific energy consumption"
    ],
    hero_image: "https://images.hostinger.com/2025f758-1013-44c6-b723-1117c9aa2810.png",
    icon: "Wind",
    position: 3,
    is_published: true,
    locale: "en",
    seo_title: "Drying Process Optimization | Exergy Solutions",
    seo_description: "Thermal and mechanical dewatering redesigned to cut the single largest energy cost in paper and processing."
  },
  {
    id: "srv-004",
    slug: "water",
    title: "Water quality",
    summary: "Surface water bodies, effluent treatment and desalination improved through low-energy, regenerative treatment trains.",
    body_md: "Surface water bodies, effluent treatment and desalination improved through low-energy, regenerative treatment trains. We align hydraulic energy recovery with regenerative biological stages.",
    highlights: [
      "Energy recovery devices (ERDs) in high-pressure RO",
      "Closed-loop process water regeneration",
      "Low-energy biological effluent treatment",
      "Zero Liquid Discharge (ZLD) thermal efficiency"
    ],
    hero_image: "https://images.hostinger.com/f5fa9afd-9b48-4bce-8326-a997fad4bd0c.png",
    icon: "Droplets",
    position: 4,
    is_published: true,
    locale: "en",
    seo_title: "Water Quality & Conservation | Exergy Solutions",
    seo_description: "Surface water bodies, effluent treatment and desalination improved through low-energy, regenerative treatment trains."
  },
  {
    id: "srv-005",
    slug: "waste-heat",
    title: "Waste-heat recovery",
    summary: "Cascade low-grade heat between processes so one stream’s reject becomes another’s supply.",
    body_md: "Cascade low-grade heat between processes so one stream’s reject becomes another’s supply. Low-grade thermal energy is elevated or used directly in district loops.",
    highlights: [
      "Thermal pinch matching for source-to-sink cascading",
      "Organic Rankine Cycle (ORC) power generation",
      "Industrial absorption chillers driven by waste heat",
      "Heat pipe and plate heat exchanger retrofits"
    ],
    hero_image: "https://images.hostinger.com/7953796b-93b0-49f3-8314-6db64a5896f2.png",
    icon: "Recycle",
    position: 5,
    is_published: true,
    locale: "en",
    seo_title: "Waste-Heat Recovery | Exergy Solutions",
    seo_description: "Cascade low-grade heat between processes so one stream’s reject becomes another’s supply."
  },
  {
    id: "srv-006",
    slug: "process",
    title: "Process integration",
    summary: "Whole-plant pinch and exergy integration unifying capex and opex decisions across energy and water.",
    body_md: "Whole-plant pinch and exergy integration unifying capex and opex decisions across energy and water. Comprehensive thermodynamic modeling of entire industrial complexes.",
    highlights: [
      "Comprehensive plant-wide pinch analysis",
      "Combined utility network optimization",
      "Capex right-sizing before capital expansion",
      "Turnkey guaranteed performance delivery"
    ],
    hero_image: "https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png",
    icon: "Network",
    position: 6,
    is_published: true,
    locale: "en",
    seo_title: "Process Integration | Exergy Solutions",
    seo_description: "Whole-plant pinch and exergy integration unifying capex and opex decisions across energy and water."
  }
];
