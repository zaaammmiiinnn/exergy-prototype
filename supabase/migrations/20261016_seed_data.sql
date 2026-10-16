-- =============================================================================
-- EXERGY SOLUTIONS SEED DATA
-- Default Founder: neuralwaves.official@gmail.com
-- =============================================================================

-- 1. Site Settings
insert into public.site_settings (key, value)
values
  ('notify_emails', '["neuralwaves.official@gmail.com", "support@neuralwaves.in"]'::jsonb),
  ('contact', '{
    "company_name": "Exergy Solutions",
    "address": "334/6D Al Wasl Street DM199 Al Satwa, Dubai UAE",
    "email": "support@neuralwaves.in",
    "admin_contact": "neuralwaves.official@gmail.com",
    "linkedin_url": "https://www.linkedin.com/company/135328489/"
  }'::jsonb),
  ('lead_routing', '{
    "hot_threshold": 60,
    "warm_threshold": 35,
    "weights": {
      "timeline_this_quarter": 30,
      "timeline_six_months": 15,
      "priority_sector": 20,
      "phone_provided": 10,
      "company_email_domain": 15,
      "multiple_services": 10,
      "challenge_text_length": 10,
      "chatbot_handoff": 15
    }
  }'::jsonb),
  ('chatbot', '{
    "version": 1,
    "welcome_text": "Welcome to Exergy Solutions. I am your automated engineering assistant. How can we optimize your plant today?",
    "fallback_message": "I didn''t catch that. Here is our menu, or you can speak with a human specialist:",
    "offline_message": "Our Dubai team is offline right now. Leave your details and an engineer will reply within one business day."
  }'::jsonb)
on conflict (key) do update set value = excluded.value;

-- 2. Services Seed
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
   'Cascade low-grade heat between processes so one stream’s reject becomes another’s supply.',
   'Cascade low-grade heat between processes so one stream’s reject becomes another’s supply. Low-grade thermal energy is elevated or used directly in district loops.',
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

-- 3. Industries Seed
insert into public.industries (slug, name, summary, body_md, challenges, hero_image, position, is_published, locale)
values
  ('paper', 'Paper',
   'Drying and steam efficiency at the heart of margin.',
   'Paper production consumes immense steam and mechanical energy across pulping, refining, and machine drying sections. We apply second-law exergy analysis to balance steam blow-through, hood ventilation, and white-water recovery.',
   '["Massive drying hood thermal losses", "Steam condensate return contamination and heat drop", "High freshwater intake in pulping and stock prep", "Extreme peak electrical demand from refiners"]'::jsonb,
   'https://images.hostinger.com/2025f758-1013-44c6-b723-1117c9aa2810.png', 1, true, 'en'),

  ('processing', 'Processing',
   'Integrated heat and water across complex process lines.',
   'Chemical, food & beverage, and materials processing plants require precise temperature controls, pasteurization, sterilization, and CIP systems. Exergy integration maps concurrent heating and cooling loads.',
   '["Simultaneous heating and cooling requirements across batches", "High effluent treatment volumes and organic loads", "Boiler steam degradation through non-condensing vents", "Refrigeration compressor lift energy spikes"]'::jsonb,
   'https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png', 2, true, 'en'),

  ('petroleum', 'Petroleum',
   'Exergy recovery in refining and petrochemical utilities.',
   'Refining and petrochemical facilities rely on furnace fired heat and complex distillation columns. We identify thermal degradation across reboilers, crude preheat trains, and cooling towers.',
   '["High-temperature furnace stack heat discharge", "Severe cooling tower water evaporation losses", "Irreversible pressure reduction in steam distribution", "Complex multi-utility balancing across units"]'::jsonb,
   'https://images.hostinger.com/7953796b-93b0-49f3-8314-6db64a5896f2.png', 3, true, 'en'),

  ('buildings', 'Buildings',
   'HVAC and water systems tuned for comfort and cost.',
   'Commercial towers, retail developments, and mixed-use districts face extreme cooling loads and chilled water pumping costs. We optimize central cooling plant sequencing, delta-T management, and greywater systems.',
   '["Low delta-T syndrome in chilled water loops", "Continuous fresh air cooling and dehumidification penalties", "High potable water demand for evaporative cooling towers", "High peak tariff penalties during summer daytime hours"]'::jsonb,
   'https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png', 4, true, 'en'),

  ('hospitality', 'Hospitality',
   'Reliable comfort with dramatically lower running cost.',
   'Luxury hotels and resorts demand uninterrupted guest comfort, hot water, and laundry services. We turn central chiller reject heat into high-temperature domestic hot water.',
   '["Huge domestic hot water and laundry thermal demands", "Swimming pool heating and cooling balancing", "Continuous 24/7 HVAC comfort expectations without failure", "Water desalination and landscape irrigation expense"]'::jsonb,
   'https://images.hostinger.com/f5fa9afd-9b48-4bce-8326-a997fad4bd0c.png', 5, true, 'en'),

  ('healthcare', 'Healthcare',
   'Resilient, clean utilities that never compromise care.',
   'Hospitals and pharmaceutical cleanrooms require tight humidity tolerances, 100% outside air changes, and fail-safe redundancy. We eliminate energy waste in reheat loops and steam sterilizers.',
   '["Simultaneous cooling, dehumidification and reheat cycles", "Stringent air change rates and hygiene standards", "Clean steam generation and condensate management", "Mission-critical resilience without downtime"]'::jsonb,
   'https://images.hostinger.com/2025f758-1013-44c6-b723-1117c9aa2810.png', 6, true, 'en')
on conflict (slug) do update set
  name = excluded.name,
  summary = excluded.summary,
  body_md = excluded.body_md,
  challenges = excluded.challenges;

-- 4. Chat Q&A Bank Seed (all verbatim from content map)
insert into public.chat_qa_bank (question, answer, keywords, synonyms, category, source_page)
values
  ('What does Exergy Solutions do?',
   'We apply thermodynamics and exergy analysis to slash the capex and opex of energy- and water-intensive operations — delivered as guaranteed, turnkey implementation.',
   array['what', 'do', 'company', 'about', 'exergy', 'solutions'], array['overview', 'mission'], 'general', 'Home'),

  ('What is exergy analysis?',
   'Most audits count kilowatt-hours (first law). We measure exergy — the useful work energy can actually do (second law). That distinction lets us find savings conventional methods overlook.',
   array['exergy', 'analysis', 'thermodynamics', 'physics', 'second law'], array['definition', 'useful work'], 'approach', 'Approach'),

  ('How is this different from a normal energy audit?',
   'First-law audits assume energy is conserved and overlook temperature/pressure degradation. Exergy analysis reveals where useful work potential is destroyed, enabling 25–30% typical resource cuts.',
   array['audit', 'different', 'normal', 'conventional', 'first law'], array['comparison', 'distinction'], 'approach', 'Approach'),

  ('What does guaranteed, turnkey mean?',
   'We don''t merely supply consulting reports. We engineer, procure, and install the complete solution, backing our results with contractual performance guarantees against baseline instrumentation.',
   array['guarantee', 'turnkey', 'contract', 'performance', 'promise'], array['warranty', 'execution'], 'benefits', 'Benefits'),

  ('What services do you offer?',
   'We provide six core engineering solutions: Cooling optimization, Heating & steam, Drying processes, Water quality, Waste-heat recovery, and Process integration.',
   array['services', 'offer', 'solutions', 'scope'], array['capabilities', 'products'], 'services', 'Services'),

  ('What is cooling optimization?',
   'Chilled water, refrigeration and HVAC networks re-engineered for minimum exergy loss and lower peak demand.',
   array['cooling', 'chiller', 'tower', 'hvac', 'refrigeration'], array['chilled water', 'cooling tower'], 'services', 'Services / Cooling'),

  ('What is heating & steam optimization?',
   'Boiler, steam and hot-water systems integrated with heat recovery to reclaim energy otherwise sent to atmosphere.',
   array['heating', 'steam', 'boiler', 'hot water'], array['boilers', 'steam trap'], 'services', 'Services / Heating'),

  ('What does water quality include?',
   'Surface water bodies, effluent treatment and desalination improved through low-energy, regenerative treatment trains.',
   array['water', 'quality', 'treatment', 'desalination', 'effluent', 'ro'], array['etp', 'waste water', 'zld'], 'services', 'Services / Water'),

  ('What is process integration?',
   'Whole-plant pinch and exergy integration unifying capex and opex decisions across energy and water.',
   array['process', 'integration', 'pinch', 'whole-plant'], array['pinch analysis'], 'services', 'Services / Process'),

  ('Which industries do you serve?',
   'We specialize in heavy industrial sectors: Paper, Processing (Food & Chemical), Petroleum, Buildings, Hospitality, and Healthcare.',
   array['industries', 'sectors', 'clients', 'plants'], array['markets', 'verticals'], 'industries', 'Industries'),

  ('How much can I save?',
   'From well-designed systems we attempt to reduce 5–10%, and in general we have experience of reducing resource utilisation by 25–30%.',
   array['save', 'savings', 'reduction', 'percent', 'cost', 'cut'], array['roi', 'financials'], 'benefits', 'About / Benefits'),

  ('Where are you located?',
   'Our headquarters are at 334/6D Al Wasl Street DM199 Al Satwa, Dubai UAE.',
   array['where', 'location', 'address', 'dubai', 'office'], array['headquarters', 'map'], 'contact', 'Contact'),

  ('What is your email or phone?',
   'You can reach our engineering team directly at neuralwaves.official@gmail.com or support@neuralwaves.in, or book an assessment online.',
   array['email', 'phone', 'contact', 'call', 'reach'], array['inquiry'], 'contact', 'Contact'),

  ('How do I request an assessment?',
   'You can complete our 4-step online assessment wizard at /assessment. We will review your facility data and reply within one business day.',
   array['assessment', 'request', 'book', 'audit', 'quote'], array['get started'], 'assessment', 'Assessment');
