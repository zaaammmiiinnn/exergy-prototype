-- =============================================================================
-- MIGRATION: Add 3 New Water, Wastewater & Desalination Services
-- Date: 2026-10-29
-- =============================================================================

insert into public.services (
  slug,
  title,
  summary,
  body_md,
  highlights,
  hero_image,
  icon,
  position,
  is_published,
  locale
)
values
  (
    'water-wastewater-desalination-consultancy',
    'Engineering Design and Consultancy Services for Water, Wastewater and Desalination Systems',
    'Front-end engineering design (FEED), hydraulic network modeling, and thermodynamic optimization for industrial effluent, municipal treatment, and SWRO desalination plants.',
    'Turnkey engineering design, hydraulic modeling, and thermodynamic consultancy for high-capacity seawater reverse osmosis (SWRO), industrial effluent plants, and advanced water treatment infrastructure. We bridge process chemistry and Second-Law thermodynamic optimization to eliminate parasitic pumping loads, optimize membrane flux, and right-size treatment trains prior to capital deployment. From feasibility studies and tender specifications to commissioning and M&V verification, our engineering consultancy ensures lifecycle efficiency and regulatory compliance.',
    '["Front-End Engineering Design (FEED) & hydraulic network modeling", "SWRO isobaric energy recovery device (ERD) optimization", "Membrane fouling mitigation & chemical dose balancing", "Capex right-sizing and lifecycle opex benchmarking"]'::jsonb,
    'https://images.hostinger.com/f5fa9afd-9b48-4bce-8326-a997fad4bd0c.png',
    'Layers',
    7,
    true,
    'en'
  ),
  (
    'water-treatment-systems-design-installation',
    'Water Treatment Systems Design, Installation and Maintenance',
    'Turnkey design, modular skid fabrication, precision site installation, and predictive maintenance for industrial process water and high-purity treatment trains.',
    'End-to-end engineering, precision skid assembly, site installation, and lifecycle maintenance for industrial process water and high-purity treatment networks. Utilizing multi-media filtration, ultrafiltration (UF), nanofiltration (NF), double-pass reverse osmosis (RO), and continuous electrodeionization (CEDI), we construct durable water treatment infrastructure tailored to the harsh water matrices of the Gulf region. Our proactive maintenance protocols prevent membrane scaling, biofouling, and unnecessary downtime.',
    '["Turnkey modular skid fabrication & site installation", "Ultrafiltration (UF) & brackish reverse osmosis (BWRO)", "Continuous electrodeionization (CEDI) for boiler feedwater", "Predictive maintenance, CIP cleaning & remote telemetry"]'::jsonb,
    'https://images.hostinger.com/f5fa9afd-9b48-4bce-8326-a997fad4bd0c.png',
    'Droplets',
    8,
    true,
    'en'
  ),
  (
    'municipal-wastewater-treatment-reuse',
    'Municipal Wastewater Treatment, Reuse and Resource Recovery Systems',
    'Advanced biological nutrient removal (BNR), membrane bioreactors (MBR), and resource recovery converting wastewater into high-grade reusable TSE and biogas energy.',
    'Next-generation municipal and decentralized wastewater treatment infrastructure engineered for high-recovery reuse, tertiary polishing, and valuable resource extraction. We transform wastewater facilities from energy sinks into regenerative utility hubs. Integrating membrane bioreactors (MBR), moving bed biofilm reactors (MBBR), anaerobic digestion for biogas recovery, and solar-sludge drying, we deliver TSE (treated sewage effluent) compliant with Dubai and GCC municipal irrigation and cooling tower make-up standards.',
    '["Advanced biological treatment (MBR & MBBR) with BNR", "High-purity TSE reclamation for district cooling & irrigation", "Biogas generation & anaerobic digester energy recovery", "Zero-odor enclosed systems & sludge volume minimization"]'::jsonb,
    'https://images.hostinger.com/2025f758-1013-44c6-b723-1117c9aa2810.png',
    'Recycle',
    9,
    true,
    'en'
  )
on conflict (slug) do update set
  title = excluded.title,
  summary = excluded.summary,
  body_md = excluded.body_md,
  highlights = excluded.highlights,
  hero_image = excluded.hero_image,
  icon = excluded.icon,
  position = excluded.position,
  is_published = excluded.is_published,
  locale = excluded.locale;
