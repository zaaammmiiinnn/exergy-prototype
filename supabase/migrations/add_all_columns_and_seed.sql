-- Add all required columns to leads table if missing
alter table public.leads add column if not exists short_id text;
alter table public.leads add column if not exists phone text;
alter table public.leads add column if not exists job_title text;
alter table public.leads add column if not exists country text default 'United Arab Emirates';
alter table public.leads add column if not exists sector text default 'general';
alter table public.leads add column if not exists service_interest text[] default '{}';
alter table public.leads add column if not exists facility_type text;
alter table public.leads add column if not exists main_challenge text;
alter table public.leads add column if not exists timeline text;
alter table public.leads add column if not exists message text;
alter table public.leads add column if not exists score int not null default 0;
alter table public.leads add column if not exists priority text default 'warm';
alter table public.leads add column if not exists source text default 'assessment';
alter table public.leads add column if not exists consent_at timestamptz default now();
alter table public.leads add column if not exists email_status jsonb default '{"admin_notified": false, "visitor_replied": false}'::jsonb;
alter table public.leads add column if not exists updated_at timestamptz default now();

-- Ensure site_settings exists
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Seed site_settings
insert into public.site_settings (key, value)
values
  ('notify_emails', '["neuralwaves.official@gmail.com", "support@neuralwaves.in"]'::jsonb),
  ('contact', '{
    "company_name": "Exergy Solutions",
    "address": "334/6D Al Wasl Street DM199 Al Satwa, Dubai UAE",
    "email": "support@neuralwaves.in",
    "admin_contact": "neuralwaves.official@gmail.com",
    "linkedin_url": "https://www.linkedin.com/company/135328489/"
  }'::jsonb)
on conflict (key) do update set value = excluded.value;

-- Seed all 6 services
insert into public.services (slug, title, summary, body_md, highlights, hero_image, icon, position, is_published, locale)
values
  ('cooling', 'Cooling optimization',
   'Chilled water, refrigeration and HVAC networks re-engineered for minimum exergy loss and lower peak demand.',
   'Chilled water, refrigeration and HVAC networks re-engineered for minimum exergy loss and lower peak demand. We analyze heat dissipation and refrigeration lift cycles to minimize thermodynamic irreversibility.',
   '["Chilled water & cooling tower balancing", "Refrigeration cycle exergy recovery", "Lower peak electricity demand charges", "Dynamic load matching & reset controls"]'::jsonb,
   'https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png', 'Snowflake', 1, true, 'en'),

  ('heating', 'Heating & steam',
   'Boiler, steam and hot-water systems integrated with heat recovery to reclaim energy otherwise sent to atmosphere.',
   'Boiler, steam and hot-water systems integrated with heat recovery to reclaim energy otherwise sent to atmosphere. We diagnose high-pressure steam drop irreversibility and capture high-grade heat.',
   '["High-pressure to low-pressure steam exergy preservation", "Flue-gas economizer & condensate heat recovery", "Steam trap monitoring & flash steam reuse", "Boiler combustion efficiency tuning"]'::jsonb,
   'https://images.hostinger.com/7953796b-93b0-49f3-8314-6db64a5896f2.png', 'Flame', 2, true, 'en'),

  ('drying', 'Drying processes',
   'Thermal and mechanical dewatering redesigned to cut the single largest energy cost in paper and processing.',
   'Thermal and mechanical dewatering redesigned to cut the single largest energy cost in paper and processing. We optimize air exchange humidity ratios and latent heat recovery.',
   '["Mechanical vs thermal dewatering pinch balance", "Hood exhaust heat recovery & heat pumps", "Target moisture uniformity controls", "Reduction of drying cycle specific energy consumption"]'::jsonb,
   'https://images.hostinger.com/2025f758-1013-44c6-b723-1117c9aa2810.png', 'Wind', 3, true, 'en'),

  ('water', 'Water quality',
   'Surface water bodies, effluent treatment and desalination improved through low-energy, regenerative treatment trains.',
   'Surface water bodies, effluent treatment and desalination improved through low-energy, regenerative treatment trains. We align hydraulic energy recovery with regenerative biological stages.',
   '["Energy recovery devices (ERDs) in high-pressure RO", "Closed-loop process water regeneration", "Low-energy biological effluent treatment", "Zero Liquid Discharge (ZLD) thermal efficiency"]'::jsonb,
   'https://images.hostinger.com/f5fa9afd-9b48-4bce-8326-a997fad4bd0c.png', 'Droplets', 4, true, 'en'),

  ('waste-heat', 'Waste-heat recovery',
   'Cascade low-grade heat between processes so one stream reject becomes another supply.',
   'Cascade low-grade heat between processes so one stream reject becomes another supply. Low-grade thermal energy is elevated or used directly in district loops.',
   '["Thermal pinch matching for source-to-sink cascading", "Organic Rankine Cycle (ORC) power generation", "Industrial absorption chillers driven by waste heat", "Heat pipe and plate heat exchanger retrofits"]'::jsonb,
   'https://images.hostinger.com/7953796b-93b0-49f3-8314-6db64a5896f2.png', 'Recycle', 5, true, 'en'),

  ('process', 'Process integration',
   'Whole-plant pinch and exergy integration unifying capex and opex decisions across energy and water.',
   'Whole-plant pinch and exergy integration unifying capex and opex decisions across energy and water. Comprehensive thermodynamic modeling of entire industrial complexes.',
   '["Comprehensive plant-wide pinch analysis", "Combined utility network optimization", "Capex right-sizing before capital expansion", "Turnkey guaranteed performance delivery"]'::jsonb,
   'https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png', 'Network', 6, true, 'en')
on conflict (slug) do update set
  title = excluded.title,
  summary = excluded.summary,
  body_md = excluded.body_md,
  highlights = excluded.highlights;

-- Seed industries
insert into public.industries (slug, name, summary, body_md, challenges, hero_image, position, is_published, locale)
values
  ('paper', 'Paper', 'Drying and steam efficiency at the heart of margin.', 'Paper production consumes immense steam and mechanical energy across pulping, refining, and machine drying sections. We apply second-law exergy analysis to balance steam blow-through, hood ventilation, and white-water recovery.', '["Massive drying hood thermal losses", "Steam condensate return contamination and heat drop", "High freshwater intake in pulping and stock prep", "Extreme peak electrical demand from refiners"]'::jsonb, 'https://images.hostinger.com/2025f758-1013-44c6-b723-1117c9aa2810.png', 1, true, 'en'),
  ('processing', 'Processing', 'Integrated heat and water across complex process lines.', 'Chemical, food & beverage, and materials processing plants require precise temperature controls, pasteurization, sterilization, and CIP systems. Exergy integration maps concurrent heating and cooling loads.', '["Simultaneous heating and cooling requirements across batches", "High effluent treatment volumes and organic loads", "Boiler steam degradation through non-condensing vents", "Refrigeration compressor lift energy spikes"]'::jsonb, 'https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png', 2, true, 'en'),
  ('petroleum', 'Petroleum', 'Exergy recovery in refining and petrochemical utilities.', 'Refining and petrochemical facilities rely on furnace fired heat and complex distillation columns. We identify thermal degradation across reboilers, crude preheat trains, and cooling towers.', '["High-temperature furnace stack heat discharge", "Severe cooling tower water evaporation losses", "Irreversible pressure reduction in steam distribution", "Complex multi-utility balancing across units"]'::jsonb, 'https://images.hostinger.com/7953796b-93b0-49f3-8314-6db64a5896f2.png', 3, true, 'en'),
  ('buildings', 'Buildings', 'HVAC and water systems tuned for comfort and cost.', 'Commercial towers, retail developments, and mixed-use districts face extreme cooling loads and chilled water pumping costs. We optimize central cooling plant sequencing, delta-T management, and greywater systems.', '["Low delta-T syndrome in chilled water loops", "Continuous fresh air cooling and dehumidification penalties", "High potable water demand for evaporative cooling towers", "High peak tariff penalties during summer daytime hours"]'::jsonb, 'https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png', 4, true, 'en'),
  ('hospitality', 'Hospitality', 'Reliable comfort with dramatically lower running cost.', 'Luxury hotels and resorts demand uninterrupted guest comfort, hot water, and laundry services. We turn central chiller reject heat into high-temperature domestic hot water.', '["Huge domestic hot water and laundry thermal demands", "Swimming pool heating and cooling balancing", "Continuous 24/7 HVAC comfort expectations without failure", "Water desalination and landscape irrigation expense"]'::jsonb, 'https://images.hostinger.com/f5fa9afd-9b48-4bce-8326-a997fad4bd0c.png', 5, true, 'en'),
  ('healthcare', 'Healthcare', 'Resilient, clean utilities that never compromise care.', 'Hospitals and pharmaceutical cleanrooms require tight humidity tolerances, 100% outside air changes, and fail-safe redundancy. We eliminate energy waste in reheat loops and steam sterilizers.', '["Simultaneous cooling, dehumidification and reheat cycles", "Stringent air change rates and hygiene standards", "Clean steam generation and condensate management", "Mission-critical resilience without downtime"]'::jsonb, 'https://images.hostinger.com/2025f758-1013-44c6-b723-1117c9aa2810.png', 6, true, 'en')
on conflict (slug) do update set name = excluded.name;

-- Reload PostgREST schema cache
notify pgrst, 'reload schema';
