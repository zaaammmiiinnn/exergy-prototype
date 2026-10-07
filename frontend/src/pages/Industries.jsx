import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Newspaper, Factory, Flame, Building, Hotel, Hospital, 
  ArrowRight, CheckCircle2, TrendingUp, ShieldCheck 
} from 'lucide-react';
import { SocialMediaSection } from '../components/SocialMediaSection';

export const Industries = () => {
  const industries = [
    {
      id: 'paper',
      name: 'Paper',
      headline: 'Drying and steam efficiency at the heart of margin.',
      icon: Newspaper,
      challenge: 'High thermal consumption across multi-cylinder dryer sections, vast steam venting from hoods, and heavy freshwater consumption in processing loops.',
      solutions: [
        'Dryer hood exhaust air heat recovery preheating combustion intake',
        'Steam cascade balancing and pressurized condensate flash recovery',
        'Process water closed-loop recycling and fiber separation optimization',
        'Mechanical dewatering tuning cutting thermal drying duty'
      ],
      impact: '18-25% steam reduction, 35% reduction in freshwater intake'
    },
    {
      id: 'processing',
      name: 'Processing',
      headline: 'Integrated heat and water across complex process lines.',
      icon: Factory,
      challenge: 'Simultaneous heating and cooling demands across pasteurization, evaporation, CIP (Clean-in-Place), and distillation resulting in severe cross-pinch utility loss.',
      solutions: [
        'Pinch-based heat exchanger network (HEN) synthesis between hot effluents and incoming feed',
        'Multi-effect evaporator vapor recompression (MVR / TVR) integration',
        'Clean-in-place (CIP) wash rinse thermal recovery and caustic water reuse',
        'Boiler blowdown heat exchange to preheat process water'
      ],
      impact: '20-30% thermal utility savings, reduced chemical discharge'
    },
    {
      id: 'petroleum',
      name: 'Petroleum',
      headline: 'Exergy recovery in refining and petrochemical utilities.',
      icon: Flame,
      challenge: 'Fired heater fuel burn, fouled crude preheat trains with high furnace entrance temperatures, and substantial heat rejection into cooling water circuits.',
      solutions: [
        'Crude preheat train retrofit using Pinch Analysis to minimize fired heater firing',
        'Flue gas condensing economizers on atmospheric and vacuum distillation furnaces',
        'Sour water stripper heat integration and high-pressure steam trap audits',
        'Waste-heat Organic Rankine Cycle (ORC) power generation from low-grade reboilers'
      ],
      impact: 'Up to 15% reduction in furnace duty, multi-megawatt fuel savings'
    },
    {
      id: 'buildings',
      name: 'Buildings',
      headline: 'HVAC and water systems tuned for comfort and cost.',
      icon: Building,
      challenge: 'Severe Low Delta-T Syndrome in district cooling connections, high pumping power, over-cooled air distribution, and lack of dynamic reset strategies.',
      solutions: [
        'Variable Primary Flow (VPF) conversion on chilled water pumping',
        'Automated chilled water supply temperature and differential pressure reset algorithms',
        'AHU outdoor air economizers and enthalpy heat recovery wheels',
        'Smart BMS integration with real-time predictive occupancy staging'
      ],
      impact: '20-35% cooling electrical energy savings, peak kW demand reduction'
    },
    {
      id: 'hospitality',
      name: 'Hospitality',
      headline: 'Reliable comfort with dramatically lower running cost.',
      icon: Hotel,
      challenge: 'Continuous domestic hot water (DHW) generation, high laundry steam requirements, kitchen exhaust thermal loss, and guest comfort chiller loads.',
      solutions: [
        'Chiller condenser heat recovery water heaters generating free 60°C hot water',
        'Continuous laundry wastewater heat recovery plate exchangers',
        'Kitchen hood demand-controlled ventilation (DCV) with electrostatic filtration',
        'Cooling tower blowdown recycling for landscape irrigation'
      ],
      impact: 'Up to 60% reduction in hotel hot water heating fuel'
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      headline: 'Resilient, clean utilities that never compromise care.',
      icon: Hospital,
      challenge: 'Strict clean-room and operating theatre ventilation air-change requirements, 100% fresh air intake humidity control, and 24/7 reliability mandates.',
      solutions: [
        'Run-around coil heat recovery systems preventing any cross-contamination',
        'Desiccant dehumidification paired with waste-heat regeneration',
        'High-efficiency surgical suite HVAC staging with night setbacks',
        'Reverse osmosis reject water recovery for sterilizer boiler makeup'
      ],
      impact: '15-28% reduction in HVAC energy with certified sterile air quality'
    }
  ];

  return (
    <div className="bg-[hsl(190,30%,98%)] text-[hsl(200,40%,12%)] pb-24">
      
      {/* Header Banner */}
      <section className="pt-28 pb-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#30a66a]">
              Industries Served
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-display">
              Deep expertise where energy and water are mission-critical
            </h1>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              We specialize in complex, utility-intensive operations where energy and water costs represent a core component of operating margins.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {industries.map((ind) => {
          const IconComp = ind.icon;
          return (
            <div
              key={ind.id}
              className="rounded-3xl bg-white border border-slate-200/80 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#0c758d]/10 text-[#0c758d] flex items-center justify-center">
                    <IconComp className="w-6 h-6" strokeWidth={1.8} />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-[#30a66a] border border-emerald-200">
                    {ind.impact.split(',')[0]}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 font-display mt-5">
                  {ind.name}
                </h2>
                <p className="text-xs font-medium text-[#0c758d] mt-0.5">
                  {ind.headline}
                </p>

                <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                  <strong className="text-slate-700">The Challenge:</strong> {ind.challenge}
                </p>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                    Turnkey Interventions:
                  </h3>
                  <ul className="space-y-2">
                    {ind.solutions.map((sol, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#30a66a] shrink-0 mt-0.5" />
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link
                  to={`/contact?reason=${encodeURIComponent(ind.name + ' Efficiency Audit')}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 hover:bg-[#0c758d] hover:text-white transition-colors"
                >
                  <span>Request {ind.name} Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Assessment Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-20">
        <div className="rounded-3xl bg-[#0c758d] text-white p-8 sm:p-12 text-center shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold font-display">
            Operating an energy-intensive industrial plant?
          </h2>
          <p className="mt-3 text-white/85 max-w-xl mx-auto text-sm sm:text-base">
            Book an assessment with our thermodynamics engineers to evaluate your facility's heat and water networks.
          </p>
          <div className="mt-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#30a66a] text-white font-semibold text-sm hover:brightness-105 transition-all shadow-md"
            >
              <span>Book an Exergy Assessment</span>
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
