export interface SiteSettingsSeed {
  company_name: string;
  tagline: string;
  address: string;
  email: string;
  notify_emails: string[];
  linkedin_url: string;
  stats: {
    stat_well_designed: string;
    stat_typical_cut: string;
    guarantee_text: string;
  };
  benefits: {
    title: string;
    description: string;
  }[];
  method_steps: {
    step: number;
    title: string;
    description: string;
  }[];
}

export const siteSettingsSeed: SiteSettingsSeed = {
  company_name: "Exergy Solutions",
  tagline: "Turn wasted energy and water into profit",
  address: "334/6D Al Wasl Street DM199 Al Satwa, Dubai UAE",
  email: "info@support.exergy-solutions.com",
  notify_emails: ["sarfraz@exergy-solutions.com", "info@support.exergy-solutions.com"],
  linkedin_url: "https://www.linkedin.com/company/135328489/",
  stats: {
    stat_well_designed: "5–10%",
    stat_typical_cut: "25–30%",
    guarantee_text: "measured, verified and guaranteed against baseline",
  },
  benefits: [
    {
      title: "Profitability",
      description: "Lower capex through right-sized design and lower opex through sustained energy and water savings.",
    },
    {
      title: "Growth",
      description: "Freed-up utility capacity and headroom lets you expand output without expanding your energy bill.",
    },
    {
      title: "Excellence",
      description: "Best-in-class efficiency benchmarks that strengthen your ESG position and operational resilience.",
    },
    {
      title: "Sustainability",
      description: "Nature-inspired, eco-friendly solutions that reduce emissions, water stress and environmental impact.",
    },
  ],
  method_steps: [
    {
      step: 1,
      title: "Diagnose with exergy",
      description: "We map where energy and water quality are truly lost — not just consumed — using second-law exergy analysis to expose hidden inefficiency.",
    },
    {
      step: 2,
      title: "Model & optimize",
      description: "Thermodynamic modeling and pinch analysis reveal the optimal network of heat, cooling, and water flows for your specific process.",
    },
    {
      step: 3,
      title: "Design nature-inspired",
      description: "Solutions mimic natural cycles — cascading, reuse, and regeneration — to cut waste while staying eco-friendly and low-impact.",
    },
    {
      step: 4,
      title: "Implement, guaranteed",
      description: "We deliver turnkey execution with performance guarantees, so savings are contractual, measured, and verified.",
    },
  ],
};
