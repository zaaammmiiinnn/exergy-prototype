import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, Cpu, Leaf, ShieldCheck, ArrowRight, 
  TrendingUp, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { SocialMediaSection } from '../components/SocialMediaSection';

export const About = () => {
  const [activeTab, setActiveTab] = useState(0);

  const methodologySteps = [
    {
      step: '01',
      title: 'Diagnose with exergy',
      subtitle: 'Second-Law Exergy Mapping & Irreversibility Audits',
      icon: Target,
      desc: 'We map where energy and water quality are truly lost — not just consumed — using second-law exergy analysis to expose hidden inefficiency that standard first-law audits completely miss.',
      actions: [
        'High-precision ultrasonic liquid and steam flow metrology',
        'Infrared thermographic surveys identifying heat dissipation zones',
        'Quantified Exergy Destruction Sankey diagrams tracking available work loss',
        'Benchmarking current operating thermodynamic efficiency against physical limits'
      ],
      deliverable: 'Comprehensive Exergy Loss Audit & Savings Roadmap'
    },
    {
      step: '02',
      title: 'Model & optimize',
      subtitle: 'Thermodynamic Pinch Modeling & Digital Simulation',
      icon: Cpu,
      desc: 'Thermodynamic modeling and pinch analysis reveal the optimal network of heat, cooling, and water flows for your specific process before any capital is spent.',
      actions: [
        'Construction of plant-wide Composite and Grand Composite Curves',
        'Pinch point calculation and eradication of cross-pinch heat transfer violations',
        'Psychrometric air-water modeling for drying and cooling tower loops',
        'Co-optimization of energy and water pinch networks'
      ],
      deliverable: 'Pinch Synthesis Model & Energy/Water Integration Blueprint'
    },
    {
      step: '03',
      title: 'Design nature-inspired',
      subtitle: 'Cascading, Reuse, and Eco-Friendly Regeneration',
      icon: Leaf,
      desc: 'Solutions mimic natural cycles — cascading, reuse, and regeneration — to cut waste while staying eco-friendly and low-impact.',
      actions: [
        'Cascading thermal energy across decreasing temperature steps',
        'Regenerative water recovery loops and low-energy membrane systems',
        'Equipment sizing, metallurgy specifications, and vendor tender dossiers',
        'Detailed Capex/Opex modeling with guaranteed ROI verification'
      ],
      deliverable: 'Detailed Engineering Design Package & Capex/Opex Model'
    },
    {
      step: '04',
      title: 'Implement, guaranteed',
      subtitle: 'Turnkey Execution Backed by Contractual Performance',
      icon: ShieldCheck,
      desc: 'We deliver turnkey execution with performance guarantees, so savings are contractual, measured, and verified against verified baselines.',
      actions: [
        'Full turnkey EPC procurement, installation, and integration oversight',
        'BMS and industrial PLC control loop tuning for automated optimization',
        'Commissioning under variable ambient and plant operational loads',
        'IPMVP-compliant Measurement & Verification (M&V) protocol execution'
      ],
      deliverable: 'Turnkey Commissioned Plant & Guaranteed Savings Certificate'
    }
  ];

  const benefits = [
    {
      title: 'Profitability',
      icon: TrendingUp,
      desc: 'Lower capex through right-sized design and lower opex through sustained energy and water savings.'
    },
    {
      title: 'Growth',
      icon: Cpu,
      desc: 'Freed-up utility capacity and headroom lets you expand output without expanding your energy bill.'
    },
    {
      title: 'Excellence',
      icon: ShieldCheck,
      desc: 'Best-in-class efficiency benchmarks that strengthen your ESG position and operational resilience.'
    },
    {
      title: 'Sustainability',
      icon: Leaf,
      desc: 'Nature-inspired, eco-friendly solutions that reduce emissions, water stress and environmental impact.'
    }
  ];

  return (
    <div className="bg-[hsl(190,30%,98%)] text-[hsl(200,40%,12%)] pb-24">
      
      {/* Header Banner */}
      <section className="pt-28 pb-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#30a66a]">
              About Exergy Solutions
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-display leading-[1.05]">
              Saving the earth, one efficient process at a time
            </h1>
            <div className="mt-6 space-y-4 text-lg text-slate-600 leading-relaxed">
              <p>
                To save the earth for future generations we have been pushing{' '}
                <strong className="text-slate-900 font-semibold">reduce, reuse and recycle</strong>.
              </p>
              <p>
                We are all about <strong className="text-slate-900 font-semibold">Reduce</strong> — we work towards making processes more efficient.
              </p>
              <p>
                From well-designed systems we attempt to reduce{' '}
                <strong className="text-[#30a66a] font-semibold">5–10%</strong>, and in general we have experience of reducing resource utilisation by{' '}
                <strong className="text-[#30a66a] font-semibold">25–30%</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy & Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-[#30a66a] flex items-center justify-center mb-6">
              <Leaf className="w-6 h-6" />
            </div>
            <div className="font-display font-bold text-4xl text-[#0c758d]">
              5–10%
            </div>
            <h3 className="font-semibold text-slate-900 mt-2 text-base">
              Reduction in Well-Designed Systems
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Even in modern, optimized facilities, exergy analysis identifies overlooked irreversibilities and unlocks another tier of efficiency.
            </p>
          </div>

          <div className="rounded-3xl bg-[#0c758d] text-white p-8 shadow-sm">
            <div className="h-12 w-12 rounded-2xl bg-white/10 text-emerald-300 flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="font-display font-bold text-4xl text-white">
              25–30%
            </div>
            <h3 className="font-semibold text-white mt-2 text-base">
              Typical Resource Utilisation Cut
            </h3>
            <p className="mt-2 text-sm text-white/80 leading-relaxed">
              Standard industrial plants typically achieve 25% to 30% cuts in utility expenditures through whole-plant pinch integration.
            </p>
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
            <div className="h-12 w-12 rounded-2xl bg-[#30a66a]/10 text-[#30a66a] flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="font-display font-bold text-4xl text-slate-900">
              100%
            </div>
            <h3 className="font-semibold text-slate-900 mt-2 text-base">
              Turnkey & Guaranteed
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Every project is backed by contractual performance guarantees, measured and verified against rigorous thermodynamic baselines.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#30a66a]">
            Our Engineering Methodology
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Efficiency, engineered from the laws of physics
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Most audits count kilowatt-hours. We measure <strong>exergy</strong> — the useful work energy can actually do. That distinction lets us find savings conventional methods overlook.
          </p>
        </div>

        {/* Interactive Step Switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {methodologySteps.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === idx
                  ? 'bg-[#0c758d] text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              Step {m.step}: {m.title}
            </button>
          ))}
        </div>

        {/* Selected Step Display */}
        {(() => {
          const step = methodologySteps[activeTab];
          const StepIcon = step.icon;
          return (
            <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm">
              <div className="flex flex-col lg:flex-row gap-8 items-start justify-between pb-8 border-b border-slate-100">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-[#0c758d]/10 text-[#0c758d] flex items-center justify-center shrink-0">
                    <StepIcon className="w-8 h-8" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-[#30a66a] uppercase">
                      Phase {step.step}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-0.5">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-sm mt-1">
                      {step.subtitle}
                    </p>
                  </div>
                </div>

                <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
                  <span className="text-slate-400 block text-[10px]">Deliverable:</span>
                  {step.deliverable}
                </div>
              </div>

              <div className="mt-8 grid lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                    Approach Details
                  </h4>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    {step.desc}
                  </p>
                </div>

                <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/60">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
                    Key Execution Activities
                  </h4>
                  <ul className="space-y-2.5">
                    {step.actions.map((act, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-[#30a66a] shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* The Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#30a66a]">
            The Benefits
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Profitability, growth and excellence
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Our turnkey solutions convert thermodynamic insight into results you can bank on.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => {
            const BIcon = b.icon;
            return (
              <div
                key={b.title}
                className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-10 w-10 rounded-xl bg-[#30a66a]/15 text-[#30a66a] flex items-center justify-center mb-4">
                  <BIcon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-semibold text-lg text-slate-900">
                  {b.title}
                </h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Headquarters and Contact Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-20">
        <div className="rounded-3xl bg-[#0c758d] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display">
              Ready to see what your plant is really losing?
            </h2>
            <p className="mt-2 text-white/85 text-sm sm:text-base max-w-xl">
              Book a no-obligation exergy assessment. 334/6D Al Wasl Street DM199 Al Satwa, Dubai UAE.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-7 py-3 rounded-full bg-[#30a66a] text-white font-semibold text-sm hover:brightness-105 transition-all shadow-md shrink-0 inline-flex items-center gap-2"
          >
            <span>Request Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Social Media Section */}
      <SocialMediaSection />

    </div>
  );
};
