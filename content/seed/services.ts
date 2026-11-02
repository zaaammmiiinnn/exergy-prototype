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
    slug: "engineering-design-consultancy",
    title: "Engineering Design and Consultancy Services for Water, Wastewater and Desalination Systems",
    summary:
      "Comprehensive Front-End Engineering Design (FEED), thermodynamic process modeling, hydraulic transient analysis, and commissioning advisory for high-performance water and desalination infrastructure.",
    body_md:
      "Engineering Design and Consultancy Services for Water, Wastewater and Desalination Systems.\n\nFrom Greenfield conceptualization to brownfield retrofits, our engineering advisory unifies second-law exergy analysis with advanced hydraulic modeling. We deliver detailed process engineering, digital twins, and techno-economic feasibility studies that de-risk capital expenditures while maximizing long-term energy and water recovery across the UAE and GCC.",
    highlights: [
      "Front-End Engineering Design (FEED) & detailed process flow integration",
      "Hydraulic transient, water hammer, and pumping system optimization",
      "Second-law exergy modeling for minimal thermodynamic loss",
      "Tendering technical advisory, HAZOP, and commissioning verification",
    ],
    hero_image: "https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png",
    icon: "Compass",
    position: 1,
    is_published: true,
    locale: "en",
    seo_title: "Water, Wastewater & Desalination Engineering Design & Consultancy | Exergy Solutions Dubai",
    seo_description:
      "Turnkey FEED, hydraulic modeling, and exergy optimization consultancy for municipal and industrial water, wastewater, and desalination systems across UAE.",
    video_url: "/videos/water.mp4",
    video_poster: "https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png",
    video_title: "Engineering Design & Advanced Water Systems Modeling",
    video_duration: "3:40",
    video_chapters: [
      {
        time: "0:00",
        title: "FEED & Baseline Assessment",
        description: "Diagnosing feed water chemistry, seasonal variability, and hydraulic baseline requirements.",
      },
      {
        time: "1:20",
        title: "Thermodynamic & Process Simulation",
        description: "Applying second-law exergy analysis to eliminate redundant pumping lift and frictional pressure drop.",
      },
      {
        time: "2:35",
        title: "Detailed Engineering & Commissioning",
        description: "3D digital twin fabrication drawings, HAZOP sign-off, and guaranteed commissioning protocols.",
      },
    ],
    thermodynamic_principle:
      "Every pump, valve, and membrane barrier represents a pressure gradient where useful flow exergy is dissipated. By combining hydraulic transient analysis with exergy-optimal pipe sizing and variable-frequency pumping arrays, we cut parasitic hydraulic power destruction by up to 35%.",
    sec_kpi: "Reduces parasitic distribution power by 25–35% across multi-stage hydraulic loops.",
    equipment_scope: [
      "Dynamic hydraulic network simulation & transient surge suppression",
      "3D digital twin & BIM mechanical/piping layout packages",
      "Process flow diagrams (PFD) and piping & instrumentation diagrams (P&ID)",
      "Automated SCADA telemetry, PLC architecture & instrumentation engineering",
    ],
    roi_payback: "Pre-construction design optimization typically slashes initial capex by 12–18% with operational payback under 14 months.",
  },
  {
    id: "srv-002",
    slug: "water-treatment-systems-design-installation",
    title: "Water Treatment Systems Design, Installation and Maintenance",
    summary:
      "Turnkey skid design, precision mechanical installation, and preventative maintenance programs for industrial process water, ultrafiltration, and high-purity treatment trains.",
    body_md:
      "Water Treatment Systems Design, Installation and Maintenance.\n\nWe provide end-to-end turnkey delivery of modular and field-erected water treatment plants. Our engineering teams oversee skid fabrication, membrane rack assembly, high-pressure piping installation, and ongoing maintenance contracts that maintain peak permeate flux and ensure zero unscheduled operational downtime.",
    highlights: [
      "Custom containerized and skid-mounted water treatment plants",
      "Ultrafiltration (UF), nanofiltration (NF) & media filtration systems",
      "Precision mechanical, electrical, and instrumentation installation",
      "Predictive maintenance, chemical cleaning (CIP), and membrane life extension",
    ],
    hero_image: "https://images.hostinger.com/7953796b-93b0-49f3-8314-6db64a5896f2.png",
    icon: "Filter",
    position: 2,
    is_published: true,
    locale: "en",
    seo_title: "Water Treatment Systems Design, Installation & Maintenance | Exergy Solutions",
    seo_description:
      "Turnkey skid design, installation, and preventative maintenance for industrial and commercial water treatment plants in Dubai and UAE.",
    video_url: "/videos/water.mp4",
    video_poster: "https://images.hostinger.com/7953796b-93b0-49f3-8314-6db64a5896f2.png",
    video_title: "Turnkey Water Treatment Skid Design & Assembly",
    video_duration: "2:55",
    video_chapters: [
      {
        time: "0:00",
        title: "Modular Skid Architecture",
        description: "Engineered stainless-steel skid fabrication with optimized flow headers and minimal footprint.",
      },
      {
        time: "1:10",
        title: "Site Installation & Integration",
        description: "Seamless on-site tie-ins to raw water feeds, electrical power distribution, and discharge headers.",
      },
      {
        time: "2:05",
        title: "Preventative Maintenance & CIP",
        description: "Automated Clean-in-Place cycles maintaining membrane permeability and extending element life by 40%.",
      },
    ],
    thermodynamic_principle:
      "Membrane fouling increases hydraulic resistance, forcing high-pressure pumps to consume surplus electrical exergy to overcome osmotic and fouling resistance. Smart automated flux balancing and proactive CIP maintain minimum net driving pressure (NDP).",
    sec_kpi: "Guaranteed stable permeate flux with up to 30% reduction in specific energy consumption (kWh/m³).",
    equipment_scope: [
      "Modular stainless-steel 316L and duplex UF / NF treatment skids",
      "Automated backwash and Clean-in-Place (CIP) neutralization stations",
      "High-efficiency vertical multistage booster pump arrays with IE4 drives",
      "Continuous conductivity, turbidity, pH, and redox telemetry instrumentation",
    ],
    roi_payback: "Typical installation payback between 12 to 20 months through reduced chemical consumption and lower electricity bills.",
  },
  {
    id: "srv-003",
    slug: "water-quality-improvement-treatment",
    title: "Water Quality Improvement and Treatment Services",
    summary:
      "Specialized water quality remediation, chemical conditioning, disinfection, scaling & corrosion mitigation, and environmental compliance for industrial and potable streams.",
    body_md:
      "Water Quality Improvement and Treatment Services.\n\nWater quality dictates process reliability, boiler lifespan, cooling tower cycles of concentration, and environmental permit compliance. We diagnose raw water contaminants, heavy metals, biological pathogens, and hardness, applying low-chemical advanced oxidation, UV disinfection, and ion-exchange polishing to deliver water tailored to your exact purity specification.",
    highlights: [
      "Advanced oxidation processes (AOP), UV disinfection & ozone polishing",
      "Total Dissolved Solids (TDS), silica, and heavy metal removal",
      "Boiler feedwater & cooling tower conditioning to prevent scaling/corrosion",
      "100% compliance with Dubai Municipality and UAE federal effluent guidelines",
    ],
    hero_image: "https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png",
    icon: "Sparkles",
    position: 3,
    is_published: true,
    locale: "en",
    seo_title: "Water Quality Improvement & Treatment Services Dubai | Exergy Solutions",
    seo_description:
      "Advanced water conditioning, UV disinfection, TDS removal, and industrial water quality improvement services across the United Arab Emirates.",
    video_url: "/videos/water.mp4",
    video_poster: "https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png",
    video_title: "Precision Water Quality Remediation & Conditioning",
    video_duration: "3:15",
    video_chapters: [
      {
        time: "0:00",
        title: "Water Quality Baseline Chemistry",
        description: "Full-spectrum laboratory chromatography profiling microbial, inorganic, and mineral contaminants.",
      },
      {
        time: "1:05",
        title: "Advanced Oxidation & Polishing",
        description: "Low-footprint UV and AOP reactors neutralizing recalcitrant organic pollutants without toxic byproducts.",
      },
      {
        time: "2:10",
        title: "Corrosion & Scaling Mitigation",
        description: "Precision antiscalant dosing and mineral rebalancing protecting downstream heat exchangers and boilers.",
      },
    ],
    thermodynamic_principle:
      "Mineral scale as thin as 0.5 mm in boilers or cooling exchangers degrades heat transfer by up to 15%, destroying high-grade thermal exergy. Preventing scale formation at the chemical level restores pristine heat transfer coefficients.",
    sec_kpi: "Eliminates scale-induced heat transfer degradation, restoring heat exchanger U-values to 98%+ of design.",
    equipment_scope: [
      "Medium and low-pressure UV disinfection chambers with automated wiper systems",
      "Continuous electro-deionization (CEDI) and twin-bed ion exchange softeners",
      "Proportional dosing skids with redundant metering pumps and flow pacing",
      "Online analytical transmitters for silica, hardness, chlorine, and TOC",
    ],
    roi_payback: "Payback in 8 to 15 months through extended equipment lifetime, zero acid descaling shutdowns, and lower blowdown losses.",
  },
  {
    id: "srv-004",
    slug: "seawater-brackish-water-desalination",
    title: "Seawater and Brackish Water Desalination Systems",
    summary:
      "High-recovery Seawater Reverse Osmosis (SWRO) and Brackish Water Reverse Osmosis (BWRO) plants engineered with isobaric energy recovery devices for lowest specific energy consumption.",
    body_md:
      "Seawater and Brackish Water Desalination Systems.\n\nDesalination in the Arabian Gulf requires overcoming high salinity and elevated sea surface temperatures. Our SWRO and BWRO systems incorporate high-recovery membrane configurations and ceramic isobaric energy recovery devices (ERD) that transfer high-pressure brine energy directly to incoming seawater with up to 98% efficiency, cutting specific electrical energy down to benchmark levels.",
    highlights: [
      "Seawater RO (SWRO) & Brackish Water RO (BWRO) turnkey plants",
      "Isobaric pressure exchanger (PX) energy recovery recovering 60%+ pumping work",
      "High-salinity Gulf intake pre-treatment with DAF and ultrafiltration",
      "Brine concentration & Zero Liquid Discharge (ZLD) integration",
    ],
    hero_image: "https://images.hostinger.com/7953796b-93b0-49f3-8314-6db64a5896f2.png",
    icon: "Waves",
    position: 4,
    is_published: true,
    locale: "en",
    seo_title: "Seawater & Brackish Water Desalination Systems Dubai | Exergy Solutions",
    seo_description:
      "Ultra-low energy SWRO and BWRO desalination systems with isobaric energy recovery devices engineered for GCC marine environments.",
    video_url: "/videos/water.mp4",
    video_poster: "https://images.hostinger.com/7953796b-93b0-49f3-8314-6db64a5896f2.png",
    video_title: "SWRO Desalination & Isobaric Energy Recovery",
    video_duration: "3:45",
    video_chapters: [
      {
        time: "0:00",
        title: "Intake & Dissolved Air Flotation",
        description: "Protecting membranes against Gulf red tides and algae with pressurized DAF pre-clarification.",
      },
      {
        time: "1:15",
        title: "High-Pressure RO & Membrane Pass",
        description: "Optimized flux distribution preventing concentration polarization and membrane compaction.",
      },
      {
        time: "2:30",
        title: "Isobaric Pressure Exchanger",
        description: "Transferring 98% of reject brine pressure energy directly to feed water, cutting pump power by over 55%.",
      },
    ],
    thermodynamic_principle:
      "Standard throttling of 65 bar SWRO concentrate brine wastes substantial hydraulic exergy. Isobaric pressure exchangers operate on positive-displacement thermodynamics, recycling pressure work directly into feed flow and driving plant SEC down toward the thermodynamic minimum.",
    sec_kpi: "Specific Energy Consumption (SEC) reduced to < 2.8 kWh/m³ for seawater and < 0.8 kWh/m³ for brackish water.",
    equipment_scope: [
      "High-pressure positive displacement and multi-stage centrifugal pumps in Super Duplex 2507",
      "Isobaric pressure exchanger (PX) energy recovery ceramic rotors",
      "High-rejection seawater polyamide thin-film composite (TFC) membrane elements",
      "Energy-optimized energy recovery booster pumps with variable frequency drives",
    ],
    roi_payback: "Energy recovery upgrades pay for themselves in 14 to 22 months through massive monthly electricity bill savings.",
  },
  {
    id: "srv-005",
    slug: "waste-management-resource-recovery-valorisation",
    title: "Waste Management, Resource Recovery and Waste Valorisations Services",
    summary:
      "Circular industrial waste valorisation, biological sludge conversion, high-grade mineral recovery, and waste thermal energy cascading turning liabilities into revenue.",
    body_md:
      "Waste Management, Resource Recovery and Waste Valorisations Services.\n\nModern industry cannot afford linear disposal. Our waste valorisation engineering turns industrial sludge, process effluents, organic residues, and reject heat into valuable secondary resources. We implement anaerobic digestion for biogas generation, struvite nutrient precipitation, and thermal cascading to close resource loops and achieve zero-waste milestones.",
    highlights: [
      "Industrial effluent valorisation & Zero Liquid Discharge (ZLD) crystallization",
      "Sludge dewatering, anaerobic digestion & renewable biogas energy generation",
      "Nutrient recovery: Nitrogen and Phosphorus (Struvite) extraction",
      "Waste heat cascading and thermal integration across manufacturing lines",
    ],
    hero_image: "https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png",
    icon: "Recycle",
    position: 5,
    is_published: true,
    locale: "en",
    seo_title: "Waste Management & Resource Valorisation Services Dubai | Exergy Solutions",
    seo_description:
      "Industrial waste valorisation, resource recovery, ZLD crystallization, and circular economic engineering across UAE and Middle East.",
    video_url: "/videos/waste-heat.mp4",
    video_poster: "https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png",
    video_title: "Resource Valorisation & Closed-Loop Waste Recovery",
    video_duration: "3:10",
    video_chapters: [
      {
        time: "0:00",
        title: "Waste Characterization & Mass Balance",
        description: "Mapping chemical energy, mineral concentrations, and moisture content across operational waste streams.",
      },
      {
        time: "1:05",
        title: "Anaerobic Digestion & Biogas Capture",
        description: "Converting high-COD organic effluents into clean biomethane for on-site combined heat and power.",
      },
      {
        time: "2:10",
        title: "Mineral & Water Reclamation (ZLD)",
        description: "Multi-effect evaporation recovering 99% pure distilled water and commercial-grade crystalline salts.",
      },
    ],
    thermodynamic_principle:
      "Discharging warm effluent or concentrated waste throws away both chemical exergy and sensible enthalpy. Waste valorisation captures this work potential through biological digestion and thermal pinch cascading before any material leaves the site perimeter.",
    sec_kpi: "Recovers up to 95% of process water while generating up to 350 kWh of renewable thermal/electrical energy per ton of COD.",
    equipment_scope: [
      "High-rate anaerobic digestion reactors (UASB / EGSB) with gas scrubbing systems",
      "Mechanical vapor recompression (MVR) and falling-film crystallizers",
      "High-pressure belt filter presses, decanter centrifuges, and solar drying tunnels",
      "Biogas conditioning skids with H2S removal and cogeneration (CHP) interfaces",
    ],
    roi_payback: "Direct revenue from reclaimed water, generated energy, and eliminated disposal gate fees yields 16–26 month payback.",
  },
  {
    id: "srv-006",
    slug: "municipal-wastewater-treatment-reuse",
    title: "Municipal Wastewater Treatment, Reuse and Resource Recovery Systems",
    summary:
      "Advanced municipal sewage treatment plants (STP), Membrane Bioreactors (MBR), treated sewage effluent (TSE) polishing for district cooling and green irrigation.",
    body_md:
      "Municipal Wastewater Treatment, Reuse and Resource Recovery Systems.\n\nMunicipal wastewater is a continuous urban water reservoir. We engineer and optimize centralized and decentralized Sewage Treatment Plants (STP) using advanced Membrane Bioreactors (MBR) and Moving Bed Biofilm Reactors (MBBR). We upgrade treated sewage effluent (TSE) to ultra-pure standards for district cooling tower makeup, urban landscaping, and aquifer recharge.",
    highlights: [
      "Membrane Bioreactor (MBR) and MBBR municipal sewage treatment plants",
      "Treated Sewage Effluent (TSE) ultrafiltration & RO polishing for cooling towers",
      "Aeration energy optimization with fine-bubble diffusers and dissolved O2 control",
      "Odor control, biosolid stabilization, and compliance with TSE irrigation standards",
    ],
    hero_image: "https://images.hostinger.com/7953796b-93b0-49f3-8314-6db64a5896f2.png",
    icon: "Building2",
    position: 6,
    is_published: true,
    locale: "en",
    seo_title: "Municipal Wastewater Treatment & Reuse Systems Dubai | Exergy Solutions",
    seo_description:
      "Municipal wastewater treatment, MBR systems, TSE water polishing for district cooling, and resource recovery in Dubai and UAE.",
    video_url: "/videos/water.mp4",
    video_poster: "https://images.hostinger.com/7953796b-93b0-49f3-8314-6db64a5896f2.png",
    video_title: "Municipal Wastewater Circular Reclamation & MBR",
    video_duration: "3:30",
    video_chapters: [
      {
        time: "0:00",
        title: "Secondary Biological Nitrification",
        description: "Optimizing biological nutrient removal (BNR) with automated dissolved oxygen (DO) blowers.",
      },
      {
        time: "1:15",
        title: "MBR Membrane Filtration",
        description: "Submerged hollow-fiber membranes delivering crystal-clear effluent free of suspended solids and bacteria.",
      },
      {
        time: "2:20",
        title: "TSE Polishing & District Cooling Supply",
        description: "Post-treatment conditioning supplying millions of gallons daily for district cooling plant makeup water.",
      },
    ],
    thermodynamic_principle:
      "Aeration blowers consume 55–65% of municipal STP electrical power. By introducing exergy-optimized dissolved oxygen algorithms and turbo blowers, we minimize air throttling losses and compress aeration energy by up to 40%.",
    sec_kpi: "Cuts specific aeration energy from 0.45 kWh/m³ down to < 0.22 kWh/m³ while producing unrestricted reuse TSE.",
    equipment_scope: [
      "Submerged hollow-fiber and flat-sheet Membrane Bioreactor (MBR) cassettes",
      "High-efficiency air-bearing and magnetic-bearing turbo blowers with VFD control",
      "Fine-bubble membrane diffusers with automated DO cascade controllers",
      "Tertiary polishing RO systems and multi-barrier UV disinfection systems",
    ],
    roi_payback: "Replacing expensive potable water with polished TSE in district cooling and irrigation yields ROI within 14–20 months.",
  },
];
