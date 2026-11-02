import { createClient } from "@supabase/supabase-js";
import * as fs from "node:fs";
import * as path from "node:path";

// Load .env.local if not already in process.env
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const content = fs.readFileSync(envLocalPath, "utf-8");
  for (const line of content.split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const val = match[2].trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy-exergy.supabase.co";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = createClient(supabaseUrl, serviceKey);

async function seedData() {
  console.log("Seeding services via Supabase JS client...");

  // 1. Seed Services
  const services = [
    {
      slug: "engineering-design-consultancy",
      title: "Engineering Design and Consultancy Services for Water, Wastewater and Desalination Systems",
      summary: "Comprehensive Front-End Engineering Design (FEED), thermodynamic process modeling, hydraulic transient analysis, and commissioning advisory for turnkey water infrastructure.",
      body_md: "Front-End Engineering Design (FEED), 3D digital-twin simulation, hydraulic transient analysis, and thermodynamic exergy modeling for municipal and industrial water, wastewater, and SWRO desalination systems.",
      is_published: true,
      locale: "en",
    },
    {
      slug: "water-treatment-systems-design-installation",
      title: "Water Treatment Systems Design, Installation and Maintenance",
      summary: "Turnkey skid design, precision mechanical installation, and preventative maintenance programs for industrial process water, ultrafiltration, and high-purity treatment trains.",
      body_md: "End-to-end turnkey delivery of modular and field-erected water treatment plants. Engineered skid fabrication, ultrafiltration membrane racks, and automated Clean-in-Place (CIP) systems.",
      is_published: true,
      locale: "en",
    },
    {
      slug: "water-quality-improvement-treatment",
      title: "Water Quality Improvement and Treatment Services",
      summary: "Specialized water quality remediation, chemical conditioning, disinfection, scaling & corrosion mitigation, and environmental compliance for industrial and potable streams.",
      body_md: "Water quality remediation, AOP and UV disinfection, TDS and silica removal, and precise chemical conditioning preventing heat exchanger scaling and boiler degradation.",
      is_published: true,
      locale: "en",
    },
    {
      slug: "seawater-brackish-water-desalination",
      title: "Seawater and Brackish Water Desalination Systems",
      summary: "High-recovery Seawater Reverse Osmosis (SWRO) and Brackish Water Reverse Osmosis (BWRO) plants engineered with isobaric energy recovery devices for lowest specific energy consumption.",
      body_md: "Turnkey SWRO and BWRO systems with isobaric pressure exchanger (PX) energy recovery recycling over 60% of pumping power, achieving < 2.8 kWh/m³ in GCC waters.",
      is_published: true,
      locale: "en",
    },
    {
      slug: "waste-management-resource-recovery-valorisation",
      title: "Waste Management, Resource Recovery and Waste Valorisations Services",
      summary: "Circular industrial waste valorisation, biological sludge conversion, high-grade mineral recovery, and waste thermal energy cascading turning liabilities into revenue.",
      body_md: "Effluent valorisation, anaerobic digestion for renewable biogas, Zero Liquid Discharge (ZLD) crystallization, and thermal heat cascading closing operational resource loops.",
      is_published: true,
      locale: "en",
    },
    {
      slug: "municipal-wastewater-treatment-reuse",
      title: "Municipal Wastewater Treatment, Reuse and Resource Recovery Systems",
      summary: "Advanced municipal sewage treatment plants (STP), Membrane Bioreactors (MBR), treated sewage effluent (TSE) polishing for district cooling and green irrigation.",
      body_md: "Centralized and decentralized sewage treatment plants utilizing Membrane Bioreactor (MBR) filtration and aeration energy optimization, yielding crystal-clear TSE for cooling and reuse.",
      is_published: true,
      locale: "en",
    },
  ];

  const { data: sData, error: sErr } = await supabase
    .from("services")
    .upsert(services, { onConflict: "slug" })
    .select();

  if (sErr) {
    console.error("Services seed error:", sErr);
  } else {
    console.log(`✅ Seeded ${sData?.length} services successfully.`);
  }

  // 2. Seed Industries
  const industries = [
    {
      slug: "paper",
      name: "Paper",
      summary: "Drying and steam efficiency at the heart of margin.",
      body_md: "Paper production consumes immense steam and mechanical energy across pulping, refining, and machine drying sections.",
      is_published: true,
      locale: "en",
    },
    {
      slug: "processing",
      name: "Processing",
      summary: "Integrated heat and water across complex process lines.",
      body_md: "Chemical, food & beverage, and materials processing plants require precise temperature controls, pasteurization, sterilization, and CIP systems.",
      is_published: true,
      locale: "en",
    },
    {
      slug: "petroleum",
      name: "Petroleum",
      summary: "Exergy recovery in refining and petrochemical utilities.",
      body_md: "Refining and petrochemical facilities rely on furnace fired heat and complex distillation columns.",
      is_published: true,
      locale: "en",
    },
    {
      slug: "buildings",
      name: "Buildings",
      summary: "HVAC and water systems tuned for comfort and cost.",
      body_md: "Commercial towers, retail developments, and mixed-use districts face extreme cooling loads and chilled water pumping costs.",
      is_published: true,
      locale: "en",
    },
    {
      slug: "hospitality",
      name: "Hospitality",
      summary: "Reliable comfort with dramatically lower running cost.",
      body_md: "Luxury hotels and resorts demand uninterrupted guest comfort, hot water, and laundry services.",
      is_published: true,
      locale: "en",
    },
    {
      slug: "healthcare",
      name: "Healthcare",
      summary: "Resilient, clean utilities that never compromise care.",
      body_md: "Hospitals and pharmaceutical cleanrooms require tight humidity tolerances, 100% outside air changes, and fail-safe redundancy.",
      is_published: true,
      locale: "en",
    },
  ];

  const { data: iData, error: iErr } = await supabase
    .from("industries")
    .upsert(industries, { onConflict: "slug" })
    .select();

  if (iErr) {
    console.error("Industries seed error:", iErr);
  } else {
    console.log(`✅ Seeded ${iData?.length} industries successfully.`);
  }

  // 3. Seed site_settings
  const settings = [
    {
      key: "notify_emails",
      value: ["sarfraz@exergy-solutions.com", "info@support.exergy-solutions.com"],
    },
    {
      key: "contact",
      value: {
        company_name: "Exergy Solutions",
        address: "334/6D Al Wasl Street DM199 Al Satwa, Dubai UAE",
        phone: "+971 50 645 1274",
        email: "sarfraz@exergy-solutions.com",
        admin_contact: "sarfraz@exergy-solutions.com",
        linkedin_url: "https://www.linkedin.com/company/135328489/",
      },
    },
  ];

  const { data: setRes, error: setErr } = await supabase
    .from("site_settings")
    .upsert(settings, { onConflict: "key" })
    .select();

  if (setErr) {
    console.error("Site settings error:", setErr);
  } else {
    console.log(`✅ Seeded ${setRes?.length} site settings.`);
  }
}

seedData();
