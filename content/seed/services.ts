export interface VideoChapter {
  time: string;
  title: string;
  description: string;
}

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
  // Video and detailed thermodynamic engineering specs
  video_url: string;
  video_poster: string;
  video_title: string;
  video_duration: string;
  video_chapters: VideoChapter[];
  thermodynamic_principle: string;
  sec_kpi: string;
  equipment_scope: string[];
  roi_payback: string;
}

export const servicesSeed: ServiceSeed[] = [
  {
    id: "srv-001",
    slug: "cooling",
    title: "Cooling optimization",
    summary: "Chilled water, refrigeration and HVAC networks re-engineered for minimum exergy loss and lower peak demand.",
    body_md: "Chilled water, refrigeration and HVAC networks re-engineered for minimum exergy loss and lower peak demand. In high-ambient Gulf environments, cooling represents up to 65% of facility electricity consumption. We analyze heat dissipation and refrigeration lift cycles to minimize thermodynamic irreversibility.",
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
    seo_description: "Chilled water, refrigeration and HVAC networks re-engineered for minimum exergy loss and lower peak demand.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    video_poster: "https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png",
    video_title: "Chiller Network & Thermodynamic Lift Optimization",
    video_duration: "3:12",
    video_chapters: [
      {
        time: "0:00",
        title: "Baseline Lift Irreversibility",
        description: "Diagnosing compressor head pressure and unnecessary temperature lift causing excessive entropy destruction."
      },
      {
        time: "1:15",
        title: "Delta-T Syndrome Mitigation",
        description: "Re-balancing primary/secondary hydraulic loops to restore designed return chilled water temperatures."
      },
      {
        time: "2:20",
        title: "Dynamic Reset & M&V Verification",
        description: "Implementing condenser water relief algorithms with guaranteed 0.58 kW/TR operating performance."
      }
    ],
    thermodynamic_principle: "Carnot cop analysis reveals that every 1°C increase in evaporating temperature or 1°C reduction in condensing temperature yields a 2.5–3.5% reduction in compressor power. We minimize the thermodynamic lift between source and sink, cutting irreversible exergy destruction (T₀·S_gen) across heat exchangers.",
    sec_kpi: "Reduces specific power from typical 0.85–0.95 kW/TR down to 0.55–0.62 kW/TR measured across entire plant envelope.",
    equipment_scope: [
      "Centrifugal & magnetic bearing chillers with variable lift geometry",
      "Variable-speed primary hydraulic pumping stations",
      "Low-approach crossflow cooling towers with ECM fan arrays",
      "Automated thermodynamic delta-T balancing valves and enthalpy sensors"
    ],
    roi_payback: "Typical simple payback between 14 to 22 months, backed by contractual performance guarantees against pre-audit baseline."
  },
  {
    id: "srv-002",
    slug: "heating",
    title: "Heating & steam",
    summary: "Boiler, steam and hot-water systems integrated with heat recovery to reclaim energy otherwise sent to atmosphere.",
    body_md: "Boiler, steam and hot-water systems integrated with heat recovery to reclaim energy otherwise sent to atmosphere. Generating high-pressure steam simply to satisfy low-temperature wash or space heating is a massive destruction of exergy. We diagnose high-pressure steam drop irreversibility and capture high-grade heat.",
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
    seo_description: "Boiler, steam and hot-water systems integrated with heat recovery to reclaim energy otherwise sent to atmosphere.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    video_poster: "https://images.hostinger.com/7953796b-93b0-49f3-8314-6db64a5896f2.png",
    video_title: "Industrial Steam Traps & Exergy Preservation",
    video_duration: "2:45",
    video_chapters: [
      {
        time: "0:00",
        title: "Steam Throttling Exergy Destruction",
        description: "Evaluating pressure-reducing valves (PRVs) that destroy useful work without producing shaft work."
      },
      {
        time: "1:02",
        title: "Condensate & Flash Steam Cascading",
        description: "Installing thermal recompression and flash vessels to repurpose low-pressure latent enthalpy."
      },
      {
        time: "2:05",
        title: "Condensing Flue Economizers",
        description: "Subcooling flue gas below acid dew point using duplex stainless heat recovery to boost efficiency past 94%."
      }
    ],
    thermodynamic_principle: "While a standard boiler claims 80% First-Law combustion efficiency, its Second-Law exergy efficiency is often below 35% because chemical fuel at 1,500°C is degraded into steam at 180°C. We recover high-grade work potential via micro-turbines and sub-dewpoint latent economizers.",
    sec_kpi: "Reclaims 12–28% of total fuel input, increasing overall system thermal efficiency to > 93% on LHV basis.",
    equipment_scope: [
      "Direct-contact and condensing flue-gas heat recovery economizers",
      "Thermocompressors and Mechanical Vapor Recompression (MVR) units",
      "Closed-loop high-temperature pressurized condensate return stations",
      "Acoustic ultrasonic continuous steam trap monitoring networks"
    ],
    roi_payback: "Payback delivered in 11 to 18 months through direct fuel expenditure reduction and water demineralization savings."
  },
  {
    id: "srv-003",
    slug: "drying",
    title: "Drying processes",
    summary: "Thermal and mechanical dewatering redesigned to cut the single largest energy cost in paper and processing.",
    body_md: "Thermal and mechanical dewatering redesigned to cut the single largest energy cost in paper and processing. Evaporating water thermally requires ~2,260 kJ/kg, whereas mechanical dewatering requires less than 50 kJ/kg. We optimize air exchange humidity ratios and latent heat recovery.",
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
    seo_description: "Thermal and mechanical dewatering redesigned to cut the single largest energy cost in paper and processing.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    video_poster: "https://images.hostinger.com/2025f758-1013-44c6-b723-1117c9aa2810.png",
    video_title: "Thermal & Mechanical Dewatering Optimization",
    video_duration: "3:40",
    video_chapters: [
      {
        time: "0:00",
        title: "Evaporative Latent Energy Mapping",
        description: "Psychrometric evaluation of exhaust air mass flows, relative humidity, and enthalpy loss."
      },
      {
        time: "1:20",
        title: "Mechanical Dewatering Optimization",
        description: "Maximizing press nip pressure and vacuum efficiency prior to the thermal dryer section."
      },
      {
        time: "2:35",
        title: "Industrial High-Lift Heat Pumps",
        description: "Capturing moist exhaust air and upgrading latent heat to produce 85°C process water."
      }
    ],
    thermodynamic_principle: "Psychrometric exergy optimization balances dry-bulb temperature and humidity ratio to maximize moisture carrying capacity per kilogram of dry air while recovering the latent heat of vaporization through cascading air preheaters and thermal vapor recompression.",
    sec_kpi: "Reduces specific steam consumption in paper and processing from 1.6 kg steam/kg water evaporated to below 1.15 kg steam/kg.",
    equipment_scope: [
      "Closed dryer hood dewpoint control and variable exhaust damper automation",
      "High-temperature industrial heat pumps (up to 120°C delivery)",
      "Multi-stage air-to-air heat pipe recuperators",
      "Infrared moisture profiling and automated trim re-moisturizers"
    ],
    roi_payback: "16 to 24 months, with capacity debottlenecking enabling up to 15% increased machine line throughput."
  },
  {
    id: "srv-004",
    slug: "water",
    title: "Water quality",
    summary: "Surface water bodies, effluent treatment and desalination improved through low-energy, regenerative treatment trains.",
    body_md: "Surface water bodies, effluent treatment and desalination improved through low-energy, regenerative treatment trains. Water and energy are inseparable in modern industrial complexes. We align hydraulic energy recovery with regenerative biological stages to drive down specific power consumption.",
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
    seo_description: "Surface water bodies, effluent treatment and desalination improved through low-energy, regenerative treatment trains.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    video_poster: "https://images.hostinger.com/f5fa9afd-9b48-4bce-8326-a997fad4bd0c.png",
    video_title: "Industrial Effluent & Desalination Energy Recovery",
    video_duration: "2:55",
    video_chapters: [
      {
        time: "0:00",
        title: "Hydraulic Exergy Destruction",
        description: "Assessing high-pressure brine rejection without isobaric pressure exchanger recovery."
      },
      {
        time: "1:10",
        title: "Regenerative Membrane Cascading",
        description: "Integrating nanofiltration and anti-fouling reverse osmosis to reach 85%+ recovery rates."
      },
      {
        time: "2:05",
        title: "Low-Energy ZLD Crystallization",
        description: "MVR crystallizers that reduce thermal utility consumption by over 60% compared to direct steam."
      }
    ],
    thermodynamic_principle: "Separation work requires overcoming osmotic pressure (Gibbs free energy of mixing). By utilizing isobaric ceramic pressure exchangers, up to 98% of the hydraulic energy contained in reject brine is transferred directly into incoming feedwater without conversion to electricity.",
    sec_kpi: "Lowers specific energy consumption of seawater RO to < 2.8 kWh/m³ and brackish recycling to < 1.1 kWh/m³.",
    equipment_scope: [
      "Isobaric ceramic pressure exchange energy recovery devices (ERDs)",
      "High-flux fouling-resistant polyamide and ceramic hollow-fiber membranes",
      "Energy-optimized fine-bubble diffused aeration blowers with dissolved oxygen reset",
      "Mechanical Vapor Recompression (MVR) falling-film brine concentrators"
    ],
    roi_payback: "18 to 26 months, delivering simultaneous water cost reduction and municipal discharge compliance."
  },
  {
    id: "srv-005",
    slug: "waste-heat",
    title: "Waste-heat recovery",
    summary: "Cascade low-grade heat between processes so one stream’s reject becomes another’s supply.",
    body_md: "Cascade low-grade heat between processes so one stream’s reject becomes another’s supply. Industrial facilities discharge immense quantities of sensible and latent heat into cooling towers and stacks. Low-grade thermal energy is elevated or used directly in district loops.",
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
    seo_description: "Cascade low-grade heat between processes so one stream’s reject becomes another’s supply.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    video_poster: "https://images.hostinger.com/7953796b-93b0-49f3-8314-6db64a5896f2.png",
    video_title: "Pinch Cascading & Organic Rankine Cycle Systems",
    video_duration: "3:05",
    video_chapters: [
      {
        time: "0:00",
        title: "Sensible Stack Heat Audit",
        description: "Thermographic and mass-flow analysis of high-temperature exhaust stacks and furnace discharge."
      },
      {
        time: "1:05",
        title: "Organic Rankine Cycle Integration",
        description: "Using low-boiling-point working fluids to generate on-site zero-emission electricity from 110°C heat."
      },
      {
        time: "2:10",
        title: "Waste-Heat Driven Absorption Chillers",
        description: "Producing 7°C chilled water using waste heat to displace electric centrifugal chiller loads."
      }
    ],
    thermodynamic_principle: "Exergy of a heat stream depends on its temperature relative to ambient: Ex = Q · (1 - T₀/T). Rather than venting thermal energy below 150°C as 'unusable', we match low-temperature sources to appropriate heat sinks, producing electricity, hot water, or absorption refrigeration.",
    sec_kpi: "Converts 8–18% of low-grade thermal waste into on-site net electrical power or 65% into sub-ambient refrigeration.",
    equipment_scope: [
      "Organic Rankine Cycle (ORC) turbo-generators (50 kW to 2 MW)",
      "Single and double-effect LiBr-H₂O absorption chillers",
      "Superconducting thermal heat pipe exchangers with low pressure drop",
      "Wide-gap welded plate heat exchangers for particulate-laden industrial streams"
    ],
    roi_payback: "20 to 30 months, unlocking clean distributed power and permanent boiler/chiller opex reduction."
  },
  {
    id: "srv-006",
    slug: "process",
    title: "Process integration",
    summary: "Whole-plant pinch and exergy integration unifying capex and opex decisions across energy and water.",
    body_md: "Whole-plant pinch and exergy integration unifying capex and opex decisions across energy and water. Treating utility systems as isolated islands creates massive systemic inefficiency. Comprehensive thermodynamic modeling of entire industrial complexes reveals optimal cascading networks.",
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
    seo_description: "Whole-plant pinch and exergy integration unifying capex and opex decisions across energy and water.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    video_poster: "https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png",
    video_title: "Whole-Plant Pinch Composite Curves & HEN Synthesis",
    video_duration: "3:35",
    video_chapters: [
      {
        time: "0:00",
        title: "Hot and Cold Composite Curves",
        description: "Plotting enthalpy versus temperature across all facility streams to locate the exact Pinch point."
      },
      {
        time: "1:25",
        title: "Heat Exchanger Network (HEN) Synthesis",
        description: "Re-configuring heat exchange paths strictly respecting the golden rule: never transfer heat across the pinch."
      },
      {
        time: "2:40",
        title: "Capex Right-Sizing for Capital Projects",
        description: "Downsizing boilers, chillers, and substations prior to procurement, saving upfront capital."
      }
    ],
    thermodynamic_principle: "Pinch analysis provides a rigorous thermodynamic methodology for guaranteeing minimum utility targets (QH,min and QC,min) before designing the network. Transferring heat across the pinch point doubles the energy penalty by simultaneously increasing both heating and cooling utility demands.",
    sec_kpi: "Guarantees 20–35% reduction in plant-wide external heating and cooling utilities with reduced network complexity.",
    equipment_scope: [
      "Process simulation software integrations (Aspen Plus, Pro/II, thermodynamic pinch solvers)",
      "Automated cross-unit thermal bypass and enthalpy control valves",
      "Multi-stream plate-fin and shell-and-tube heat exchanger banks",
      "Continuous supervisory exergy M&V telemetry across all balance-of-plant interfaces"
    ],
    roi_payback: "12 to 18 months, with capex savings on future equipment often paying for the entire implementation before installation."
  }
];
