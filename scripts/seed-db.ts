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
      slug: "cooling",
      title: "Cooling optimization",
      summary: "Chilled water, refrigeration and HVAC networks re-engineered for minimum exergy loss and lower peak demand.",
      body_md: "Chilled water, refrigeration and HVAC networks re-engineered for minimum exergy loss and lower peak demand. We analyze heat dissipation and refrigeration lift cycles to minimize thermodynamic irreversibility.",
      is_published: true,
      locale: "en",
    },
    {
      slug: "heating",
      title: "Heating & steam",
      summary: "Boiler, steam and hot-water systems integrated with heat recovery to reclaim energy otherwise sent to atmosphere.",
      body_md: "Boiler, steam and hot-water systems integrated with heat recovery to reclaim energy otherwise sent to atmosphere. We diagnose high-pressure steam drop irreversibility and capture high-grade heat.",
      is_published: true,
      locale: "en",
    },
    {
      slug: "drying",
      title: "Drying processes",
      summary: "Thermal and mechanical dewatering redesigned to cut the single largest energy cost in paper and processing.",
      body_md: "Thermal and mechanical dewatering redesigned to cut the single largest energy cost in paper and processing. We optimize air exchange humidity ratios and latent heat recovery.",
      is_published: true,
      locale: "en",
    },
    {
      slug: "water",
      title: "Water quality",
      summary: "Surface water bodies, effluent treatment and desalination improved through low-energy, regenerative treatment trains.",
      body_md: "Surface water bodies, effluent treatment and desalination improved through low-energy, regenerative treatment trains. We align hydraulic energy recovery with regenerative biological stages.",
      is_published: true,
      locale: "en",
    },
    {
      slug: "waste-heat",
      title: "Waste-heat recovery",
      summary: "Cascade low-grade heat between processes so one stream reject becomes another supply.",
      body_md: "Cascade low-grade heat between processes so one stream reject becomes another supply. Low-grade thermal energy is elevated or used directly in district loops.",
      is_published: true,
      locale: "en",
    },
    {
      slug: "process",
      title: "Process integration",
      summary: "Whole-plant pinch and exergy integration unifying capex and opex decisions across energy and water.",
      body_md: "Whole-plant pinch and exergy integration unifying capex and opex decisions across energy and water. Comprehensive thermodynamic modeling of entire industrial complexes.",
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
      value: ["neuralwaves.official@gmail.com", "support@neuralwaves.in"],
    },
    {
      key: "contact",
      value: {
        company_name: "Exergy Solutions",
        address: "334/6D Al Wasl Street DM199 Al Satwa, Dubai UAE",
        email: "support@neuralwaves.in",
        admin_contact: "neuralwaves.official@gmail.com",
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
