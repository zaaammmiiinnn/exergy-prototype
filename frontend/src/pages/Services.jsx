import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Snowflake, Flame, Wind, Droplets, TrendingUp, Layers, 
  ArrowRight, ShieldCheck, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { SocialMediaSection } from '../components/SocialMediaSection';

export const Services = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.replace('#', ''));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const services = [
    {
      id: 'cooling-optimization',
      title: 'Cooling Optimization',
      subtitle: 'Central Chiller Plants & HVAC Networks',
      icon: Snowflake,
      overview: 'Chilled water, refrigeration and HVAC networks re-engineered for minimum exergy loss and lower peak demand.',
      problem: 'Chiller plants often suffer from Low Delta-T Syndrome, degraded heat transfer surfaces, and rigid sequencing that runs machines at partial load, consuming massive excess electrical power during peak thermal demand.',
      solution: 'We re-engineer central chilling systems by introducing Variable Primary Flow (VPF), dynamic condenser water reset, predictive wet-bulb cooling tower approach optimization, and automated chiller sequencing based on thermodynamic COP curves.',
      benefits: [
        '20% to 35% reduction in total chiller plant electricity consumption',
        'Mitigation of Low Delta-T syndrome and pump over-circulation',
        'Extended lifespan of centrifugal and screw compressors',
        'Permanent reduction in peak kW demand charges'
      ],
      kpi: '20-35% Chiller Savings'
    },
    {
      id: 'heating-and-steam',
      title: 'Heating & Steam',
      subtitle: 'Boilers, Distribution & Pressurized Condensate Loops',
      icon: Flame,
      overview: 'Boiler, steam and hot-water systems integrated with heat recovery to reclaim energy otherwise sent to atmosphere.',
      problem: 'Steam systems lose tremendous thermal exergy through failed steam traps, uninsulated distribution piping, cold boiler makeup water, and uncontrolled continuous surface blowdown.',
      solution: 'Exergy Solutions conducts ultrasonic steam trap surveillance, models thermal mass balances, recovers blowdown flash steam through dedicated heat exchangers, and engineers high-pressure closed condensate return systems.',
      benefits: [
        '15% to 30% reduction in primary fuel (Natural Gas, Diesel, Fuel Oil)',
        'Return over 85% of high-enthalpy condensate directly to feedwater deaerators',
        'Drastic decrease in boiler water makeup chemical treatment costs',
        'Real-time automated steam trap monitoring eliminating undetected steam venting'
      ],
      kpi: '85%+ Condensate Return'
    },
    {
      id: 'drying-processes',
      title: 'Drying Processes',
      subtitle: 'Industrial Convective & Thermal Dewatering',
      icon: Wind,
      overview: 'Thermal and mechanical dewatering redesigned to cut the single largest energy cost in paper and processing.',
      problem: 'Industrial drying consumes up to 25% of total industrial energy. Over-drying, uncontrolled exhaust humidity, and unrecuperated warm humid air vent massive thermal energy into the atmosphere.',
      solution: 'We calibrate psychrometric drying curves, install exhaust air heat recovery systems (heat pipes and plate recuperators) to pre-warm intake combustion air, and implement closed-loop product moisture sensors.',
      benefits: [
        'Up to 25% reduction in dryer thermal fuel consumption',
        'Substantial throughput elevation without requiring additional boiler capacity',
        'Elimination of uneven moisture profiles and scrap product rejection',
        'Combustion air preheat temperatures elevated by up to 60°C'
      ],
      kpi: 'Up to 25% Energy Cut'
    },
    {
      id: 'water-quality',
      title: 'Water Quality',
      subtitle: 'Surface Water, Effluent Treatment & Desalination',
      icon: Droplets,
      overview: 'Surface water bodies, effluent treatment and desalination improved through low-energy, regenerative treatment trains.',
      problem: 'Water-stressed regions spend excessive power on multi-stage reverse osmosis, high cooling tower blowdown cycles, and chemical treatments for raw surface water intake and wastewater compliance.',
      solution: 'We analyze the exergy of chemical separation processes, increasing cooling tower Cycles of Concentration (CoC), deploying advanced membrane foul-prevention protocols, and engineering nature-inspired low-energy effluent recovery systems.',
      benefits: [
        '30% to 50% decrease in industrial freshwater intake volume',
        'Elevated cooling tower Cycles of Concentration from 3.0 to 6.5+',
        'Turnkey Zero Liquid Discharge (ZLD) implementation with minimum thermodynamic work',
        'Full compliance with local environmental discharge regulations'
      ],
      kpi: '30-50% Water Conserved'
    },
    {
      id: 'waste-heat-recovery',
      title: 'Waste-Heat Recovery',
      subtitle: 'Low & Medium Grade Industrial Heat Cascading',
      icon: TrendingUp,
      overview: 'Cascade low-grade heat between processes so one stream’s reject becomes another’s supply.',
      problem: 'High-temperature flue gases, kiln radiators, exhaust air, and warm effluent are discharged directly into ambient air, losing invaluable second-law potential.',
      solution: 'We engineer custom condensing economizers, industrial heat pumps, and Organic Rankine Cycle (ORC) power generators that capture reject thermal streams and convert them into pressurized steam, hot process water, or on-site electricity.',
      benefits: [
        'Fast capital payback between 1.5 to 3 years',
        'Cogeneration of zero-fuel clean electricity via ORC loops',
        'Significant boiler feedwater preheating saving thousands of MMBtu annually',
        'Drop in stack temperature resulting in lower thermal plume emissions'
      ],
      kpi: '1.5 - 3 Yr Typical Payback'
    },
    {
      id: 'process-integration',
      title: 'Process Integration',
      subtitle: 'Whole-Plant Pinch Analysis & HEN Optimization',
      icon: Layers,
      overview: 'Whole-plant pinch and exergy integration unifying capex and opex decisions across energy and water.',
      problem: 'Plants often cool process stream A with expensive cooling tower water while simultaneously heating process stream B with expensive boiler steam, completely blind to thermodynamic pinch synergy.',
      solution: 'Applying rigorous Pinch Analysis and heat exchanger network (HEN) synthesis, we map plant-wide Composite Curves to discover cross-pinch heat transfer violations and synthesize the optimal heat exchanger matching network.',
      benefits: [
        'Reaches the absolute thermodynamic limit of practical energy recovery',
        'Eliminates cross-pinch utility heating and cooling waste',
        'De-bottlenecks cooling tower and boiler header capacity for facility expansion',
        'Integrates water pinch to co-optimize thermal and aqueous networks'
      ],
      kpi: 'Thermodynamic Limit'
    }
  ];

  return (
    <div className="bg-[hsl(190,30%,98%)] text-[hsl(200,40%,12%)] pb-24">
      
      {/* Header Banner */}
      <section className="pt-28 pb-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#30a66a]">
              What We Optimize
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-display">
              Consulting solutions across every energy and water flow
            </h1>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              From a single utility to a fully integrated plant — we optimize both the capital you spend and the energy and water you consume through rigorous second-law exergy analysis.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {services.map((item, idx) => {
          const IconC = item.icon;
          return (
            <div
              key={item.id}
              id={item.id}
              className="scroll-mt-28 rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-12 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#0c758d]/10 text-[#0c758d] flex items-center justify-center shrink-0">
                    <IconC className="w-7 h-7" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                      {item.title}
                    </h2>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="px-4 py-2 rounded-full text-xs font-semibold bg-emerald-50 text-[#30a66a] border border-emerald-200">
                    {item.kpi}
                  </span>
                  <Link
                    to={`/contact?service=${encodeURIComponent(item.title)}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#0c758d] text-white hover:bg-[#095f73] transition-colors shadow-xs"
                  >
                    <span>Request Audit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="mt-8 grid lg:grid-cols-2 gap-8">
                {/* Problem & Solution */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-2">
                      The Inefficiency Trap
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {item.problem}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#0c758d] mb-2">
                      Our Exergy-Engineered Solution
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {item.solution}
                    </p>
                  </div>
                </div>

                {/* Measurable Impact */}
                <div className="bg-slate-50/70 rounded-2xl p-6 sm:p-8 border border-slate-200/60">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#30a66a]" />
                    <span>Contractually Backed Deliverables</span>
                  </h3>
                  <ul className="space-y-3">
                    {item.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#30a66a] mt-2 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-20">
        <div className="rounded-3xl bg-[#0c758d] text-white p-8 sm:p-12 text-center shadow-lg">
          <h2 className="text-2xl sm:text-4xl font-bold font-display">
            Ready to optimize your facility's energy and water?
          </h2>
          <p className="mt-3 text-white/85 max-w-2xl mx-auto text-sm sm:text-base">
            Contact our engineering team for a preliminary exergy analysis and discover your turnkey savings potential.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              to="/contact"
              className="px-7 py-3 rounded-full bg-[#30a66a] text-white font-semibold text-sm hover:brightness-105 transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Book an Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <SocialMediaSection />

    </div>
  );
};
