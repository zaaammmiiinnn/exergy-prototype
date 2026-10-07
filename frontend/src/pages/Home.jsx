import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, ShieldCheck, TrendingUp, Droplets, Flame, 
  Wind, Cpu, CheckCircle2, Leaf, Target, Layers, Snowflake,
  Building, Hotel, Hospital, Newspaper, Factory, Send, Check
} from 'lucide-react';
import { api } from '../api/client';

export const Home = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleAssessmentSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || submitting) return;

    setSubmitting(true);
    setSubmitError('');
    try {
      await api.submitLeadInquiry({
        name: 'Website Lead',
        email: email.trim(),
        phone: 'Not provided',
        reason_for_connecting: 'Assessment Request from Homepage',
        notes: 'Requested exergy assessment from homepage banner',
        source: 'Home Assessment CTA'
      });
      setSubmitted(true);
      setEmail('');
    } catch (err) {
      console.error('Failed to submit assessment request:', err);
      // Still show polite confirmation to the client
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const tickerItems = [
    "Exergy Analysis",
    "Pinch Technology",
    "Waste-Heat Recovery",
    "Water Reuse",
    "Guaranteed Savings",
    "Nature-Inspired Design",
    "Turnkey Delivery"
  ];
  const fullTicker = [...tickerItems, ...tickerItems];

  const methodologySteps = [
    {
      step: '01',
      icon: Target,
      title: 'Diagnose with exergy',
      desc: 'We map where energy and water quality are truly lost — not just consumed — using second-law exergy analysis to expose hidden inefficiency.'
    },
    {
      step: '02',
      icon: Cpu,
      title: 'Model & optimize',
      desc: 'Thermodynamic modeling and pinch analysis reveal the optimal network of heat, cooling, and water flows for your specific process.'
    },
    {
      step: '03',
      icon: Leaf,
      title: 'Design nature-inspired',
      desc: 'Solutions mimic natural cycles — cascading, reuse, and regeneration — to cut waste while staying eco-friendly and low-impact.'
    },
    {
      step: '04',
      icon: ShieldCheck,
      title: 'Implement, guaranteed',
      desc: 'We deliver turnkey execution with performance guarantees, so savings are contractual, measured, and verified.'
    }
  ];

  const services = [
    {
      icon: Snowflake,
      title: 'Cooling optimization',
      desc: 'Chilled water, refrigeration and HVAC networks re-engineered for minimum exergy loss and lower peak demand.'
    },
    {
      icon: Flame,
      title: 'Heating & steam',
      desc: 'Boiler, steam and hot-water systems integrated with heat recovery to reclaim energy otherwise sent to atmosphere.'
    },
    {
      icon: Wind,
      title: 'Drying processes',
      desc: 'Thermal and mechanical dewatering redesigned to cut the single largest energy cost in paper and processing.'
    },
    {
      icon: Droplets,
      title: 'Water quality',
      desc: 'Surface water bodies, effluent treatment and desalination improved through low-energy, regenerative treatment trains.'
    },
    {
      icon: TrendingUp,
      title: 'Waste-heat recovery',
      desc: 'Cascade low-grade heat between processes so one stream’s reject becomes another’s supply.'
    },
    {
      icon: Layers,
      title: 'Process integration',
      desc: 'Whole-plant pinch and exergy integration unifying capex and opex decisions across energy and water.'
    }
  ];

  const applications = [
    { name: 'Cooling & refrigeration', tag: 'Energy' },
    { name: 'Heating & steam generation', tag: 'Energy' },
    { name: 'Industrial drying', tag: 'Energy' },
    { name: 'Surface water bodies', tag: 'Water' },
    { name: 'Effluent treatment', tag: 'Water' },
    { name: 'Desalination', tag: 'Water' }
  ];

  const industries = [
    {
      icon: Newspaper,
      name: 'Paper',
      desc: 'Drying and steam efficiency at the heart of margin.'
    },
    {
      icon: Factory,
      name: 'Processing',
      desc: 'Integrated heat and water across complex process lines.'
    },
    {
      icon: Flame,
      name: 'Petroleum',
      desc: 'Exergy recovery in refining and petrochemical utilities.'
    },
    {
      icon: Building,
      name: 'Buildings',
      desc: 'HVAC and water systems tuned for comfort and cost.'
    },
    {
      icon: Hotel,
      name: 'Hospitality',
      desc: 'Reliable comfort with dramatically lower running cost.'
    },
    {
      icon: Hospital,
      name: 'Healthcare',
      desc: 'Resilient, clean utilities that never compromise care.'
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Profitability',
      desc: 'Lower capex through right-sized design and lower opex through sustained energy and water savings.'
    },
    {
      icon: Cpu,
      title: 'Growth',
      desc: 'Freed-up utility capacity and headroom lets you expand output without expanding your energy bill.'
    },
    {
      icon: ShieldCheck,
      title: 'Excellence',
      desc: 'Best-in-class efficiency benchmarks that strengthen your ESG position and operational resilience.'
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      desc: 'Nature-inspired, eco-friendly solutions that reduce emissions, water stress and environmental impact.'
    }
  ];

  return (
    <div className="bg-[hsl(190,30%,98%)] text-[hsl(200,40%,12%)]">
      
      {/* 1. Hero Section (#top) */}
      <section id="top" className="relative min-h-[100dvh] flex items-center pt-[72px] overflow-hidden">
        {/* Background photo + dark gradient overlay for sharp white typography contrast */}
        <div className="absolute inset-0">
          <img
            src="https://images.hostinger.com/7953796b-93b0-49f3-8314-6db64a5896f2.png"
            alt="Symbolic composition of thermal, water, electric, and renewable energy converging around a glowing entropy vortex"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(200,65%,7%)]/95 via-[hsl(200,60%,10%)]/90 to-[hsl(190,55%,14%)]/75" />
          <div className="absolute inset-0 bg-black/25" />
        </div>

        <div className="relative mx-auto max-w-[90rem] px-5 sm:px-8 w-full z-10">
          <div className="max-w-3xl py-24">
            
            {/* Pill Tag */}
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
              <Leaf className="h-3.5 w-3.5 text-[#30a66a]" />
              Exergy-integrated consulting
            </span>

            {/* Headline */}
            <h1 className="mt-6 font-display font-extrabold text-white text-4xl sm:text-6xl lg:text-7xl leading-[1.02] tracking-tight drop-shadow-md">
              Turn wasted energy<br />
              and water into{' '}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">profit</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="14"
                  viewBox="0 0 300 14"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 8C60 3 240 3 297 9"
                    stroke="hsl(150 55% 52%)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Subhead */}
            <p className="mt-7 text-lg sm:text-xl text-white/95 max-w-2xl leading-relaxed drop-shadow-sm font-normal">
              We apply thermodynamics and exergy analysis to slash the capex and opex of energy- and water-intensive operations — delivered as guaranteed, turnkey implementation.
            </p>

            {/* Action buttons */}
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#30a66a] px-7 py-3.5 text-sm font-semibold text-white hover:brightness-105 transition-all shadow-md active:scale-95"
              >
                Book an assessment
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#approach"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-all backdrop-blur"
              >
                See how it works
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-xl border-t border-white/15 pt-6">
              {[
                ['30-45%', 'Typical energy saved'],
                ['100%', 'Turnkey & guaranteed'],
                ['6', 'Industries served']
              ].map(([val, label]) => (
                <div key={label}>
                  <div className="font-display font-bold text-2xl sm:text-3xl text-white drop-shadow-sm">
                    {val}
                  </div>
                  <div className="mt-1 text-xs sm:text-sm text-white/85">
                    {label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 2. Marquee Ticker */}
      <div className="bg-[#0c758d] text-white py-4 overflow-hidden shadow-inner">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {fullTicker.map((item, idx) => (
            <span
              key={idx}
              className="flex items-center gap-3 mx-6 text-sm font-semibold uppercase tracking-[0.14em]"
            >
              {item}
              <Leaf className="h-3.5 w-3.5 text-[#30a66a]" />
            </span>
          ))}
        </div>
      </div>

      {/* 3. About Us Section (#about) */}
      <section id="about" className="py-24 sm:py-32 bg-[hsl(150,40%,94%)]/50 border-b border-slate-200/80">
        <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
            
            {/* Text column */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#30a66a]">
                About us
              </span>
              <h2 className="mt-4 font-display font-bold text-3xl sm:text-5xl tracking-tight leading-[1.05] text-slate-900">
                Saving the earth, one efficient process at a time
              </h2>
              <div className="mt-6 space-y-5 text-lg text-slate-600 leading-relaxed">
                <p>
                  To save the earth for future generations we have been pushing{' '}
                  <span className="font-semibold text-slate-900">
                    reduce, reuse and recycle
                  </span>.
                </p>
                <p>
                  We are all about{' '}
                  <span className="font-semibold text-slate-900">Reduce</span> — we work towards making processes more efficient.
                </p>
                <p>
                  From well-designed systems we attempt to reduce{' '}
                  <span className="font-semibold text-[#30a66a]">5–10%</span>, and in general we have experience of reducing resource utilisation by{' '}
                  <span className="font-semibold text-[#30a66a]">25–30%</span>.
                </p>
              </div>
            </div>

            {/* Visual metric cards */}
            <div className="grid grid-cols-2 gap-4 items-stretch">
              {/* Card 1 */}
              <div className="rounded-2xl bg-white border border-slate-200/80 p-6 flex flex-col justify-between h-full min-h-[220px] shadow-sm hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-[#30a66a] flex items-center justify-center">
                  <Leaf className="h-6 w-6" strokeWidth={2} />
                </div>
                <div className="mt-8">
                  <div className="font-display font-bold text-4xl text-[#0c758d]">
                    5–10%
                  </div>
                  <p className="mt-1 text-sm text-slate-600 font-medium">
                    Reduction from well-designed systems
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl bg-[#0c758d] text-white p-6 flex flex-col justify-between h-full min-h-[220px] shadow-sm hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-xl bg-white/10 text-emerald-300 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6" strokeWidth={2} />
                </div>
                <div className="mt-8">
                  <div className="font-display font-bold text-4xl text-white">
                    25–30%
                  </div>
                  <p className="mt-1 text-sm text-white/80 font-medium">
                    Typical resource utilisation cut
                  </p>
                </div>
              </div>

              {/* Bottom Wide Card */}
              <div className="col-span-2 rounded-2xl bg-white border border-slate-200/80 p-6 flex items-center gap-4 shadow-sm">
                <span className="grid place-items-center h-12 w-12 shrink-0 rounded-xl bg-[#30a66a]/15 text-[#30a66a]">
                  <Leaf className="h-6 w-6" />
                </span>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Reduce, reuse, recycle — our work starts with{' '}
                  <span className="font-semibold text-slate-900">Reduce</span>, engineering efficiency into every system we touch.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Methodology / Approach Section (#approach) */}
      <section id="approach" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-[72rem] px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            
            {/* Sticky Overview */}
            <div className="lg:sticky lg:top-28">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#30a66a]">
                The methodology
              </span>
              <h2 className="mt-4 font-display font-bold text-3xl sm:text-5xl tracking-tight leading-[1.05] text-slate-900">
                Efficiency, engineered from the laws of physics
              </h2>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                Most audits count kilowatt-hours. We measure{' '}
                <strong className="text-slate-900 font-semibold">exergy</strong> — the useful work energy can actually do. That distinction lets us find savings conventional methods overlook, then integrate heating, cooling, drying, and water systems into one optimized whole.
              </p>
              <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <img
                  src="https://images.hostinger.com/f5fa9afd-9b48-4bce-8326-a997fad4bd0c.png"
                  alt="Nature-inspired fluid and heat exchange patterns"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>

            {/* 4 Steps */}
            <div className="space-y-4">
              {methodologySteps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={step.title}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 hover:border-[#30a66a]/60 hover:shadow-lg hover:shadow-teal-900/5 transition-all duration-200"
                  >
                    <div className="flex items-start gap-5">
                      <span className="grid place-items-center h-12 w-12 shrink-0 rounded-xl bg-slate-100 text-[#0c758d] group-hover:bg-[#30a66a] group-hover:text-white transition-colors">
                        <IconComponent className="h-6 w-6" strokeWidth={1.8} />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-slate-400 font-bold">
                            {step.step}
                          </span>
                          <h3 className="font-display font-semibold text-xl text-slate-900">
                            {step.title}
                          </h3>
                        </div>
                        <p className="mt-2 text-slate-600 leading-relaxed text-sm sm:text-base">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 5. Services Section (#services) */}
      <section id="services" className="py-24 sm:py-32 bg-[hsl(150,40%,94%)]/50 border-y border-slate-200/80">
        <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#30a66a]">
              What we optimize
            </span>
            <h2 className="mt-4 font-display font-bold text-3xl sm:text-5xl tracking-tight text-slate-900">
              Consulting solutions across every energy and water flow
            </h2>
            <p className="mt-5 text-lg text-slate-600">
              From a single utility to a fully integrated plant — we optimize both the capital you spend and the energy and water you consume.
            </p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((srv) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={srv.title}
                  className="h-full rounded-2xl bg-white border border-slate-200/80 p-7 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="grid place-items-center h-12 w-12 rounded-xl bg-[#0c758d]/10 text-[#0c758d] mb-5">
                      <IconComp className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <h3 className="font-display font-semibold text-xl text-slate-900">
                      {srv.title}
                    </h3>
                    <p className="mt-3 text-slate-600 leading-relaxed text-sm">
                      {srv.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0c758d] hover:text-[#30a66a] transition-colors"
                    >
                      Inquire about {srv.title}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Applications Section (#applications) */}
      <section id="applications" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-[90rem] px-5 sm:px-8 grid lg:grid-cols-[1fr_1.1fr] gap-14 items-center">
          
          {/* Applications list */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#30a66a]">
              Applications addressed
            </span>
            <h2 className="mt-4 font-display font-bold text-3xl sm:text-5xl tracking-tight leading-[1.05] text-slate-900">
              Energy- and water-intensive, made efficient
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              Wherever heat, cold, moisture or water quality drives your costs, exergy analysis reveals a leaner path. We treat energy and water as one integrated system — because in nature, they always are.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {applications.map((app) => (
                <div
                  key={app.name}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-xs"
                >
                  <CheckCircle2 className="h-5 w-5 text-[#30a66a] shrink-0" />
                  <span className="font-medium text-sm text-slate-800">
                    {app.name}
                  </span>
                  <span
                    className={`ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      app.tag === 'Water'
                        ? 'bg-[#0c758d]/10 text-[#0c758d]'
                        : 'bg-[#30a66a]/15 text-[#30a66a]'
                    }`}
                  >
                    {app.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual with floating badge */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-xl shadow-teal-950/10 border border-slate-200">
              <img
                src="https://images.hostinger.com/e5c328ee-2778-4da7-ba8a-5e933f55fcfa.png"
                alt="Energy optimization control room dashboards"
                className="w-full h-[520px] object-cover"
              />
            </div>
            
            <div className="animate-floaty absolute -bottom-6 -left-4 sm:-left-8 rounded-2xl bg-white border border-slate-200 shadow-xl p-5 max-w-[220px]">
              <div className="h-8 w-8 rounded-lg bg-emerald-50 text-[#30a66a] flex items-center justify-center mb-2">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div className="font-display font-bold text-2xl text-slate-900">
                Lower opex
              </div>
              <p className="text-xs text-slate-500 mt-1">
                measured, verified and guaranteed against baseline
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Industries Served Section (#industries) */}
      <section id="industries" className="py-24 sm:py-32 bg-[#0c758d] text-white relative overflow-hidden">
        {/* Subtle background image */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.hostinger.com/53922603-3cf5-4519-b6bf-f073820e56b9.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative mx-auto max-w-[90rem] px-5 sm:px-8 z-10">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#30a66a]">
              Industries served
            </span>
            <h2 className="mt-4 font-display font-bold text-3xl sm:text-5xl tracking-tight text-white">
              Deep expertise where energy and water are mission-critical
            </h2>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
            {industries.map((ind) => {
              const IconComponent = ind.icon;
              return (
                <div
                  key={ind.name}
                  className="h-full bg-[#0c758d] p-8 hover:bg-[hsl(190,80%,26%)] transition-colors"
                >
                  <IconComponent className="h-8 w-8 text-[#30a66a]" strokeWidth={1.6} />
                  <h3 className="mt-5 font-display font-semibold text-xl text-white">
                    {ind.name}
                  </h3>
                  <p className="mt-2 text-white/75 leading-relaxed text-sm">
                    {ind.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. The Benefits Section (#benefits) */}
      <section id="benefits" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-14 items-center">
            
            {/* Image */}
            <div className="overflow-hidden rounded-3xl shadow-xl shadow-slate-900/10 border border-slate-200">
              <img
                src="https://images.hostinger.com/2025f758-1013-44c6-b723-1117c9aa2810.png"
                alt="Engineers reviewing thermodynamic data in a paper plant"
                className="w-full h-[520px] object-cover"
              />
            </div>

            {/* Benefits Content */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#30a66a]">
                The benefits
              </span>
              <h2 className="mt-4 font-display font-bold text-3xl sm:text-5xl tracking-tight leading-[1.05] text-slate-900">
                Profitability, growth and excellence
              </h2>
              <p className="mt-5 text-lg text-slate-600">
                Our turnkey solutions convert thermodynamic insight into results you can bank on.
              </p>

              <div className="mt-8 space-y-5">
                {benefits.map((b) => {
                  const BIcon = b.icon;
                  return (
                    <div key={b.title} className="flex gap-4">
                      <span className="grid place-items-center h-11 w-11 shrink-0 rounded-xl bg-[#30a66a]/15 text-[#30a66a]">
                        <BIcon className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display font-semibold text-lg text-slate-900">
                          {b.title}
                        </h3>
                        <p className="mt-1 text-slate-600 leading-relaxed text-sm">
                          {b.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Contact / Assessment CTA Section (#contact) */}
      <section id="contact" className="py-24 sm:py-32 bg-[hsl(150,40%,94%)]/50 border-t border-slate-200/80">
        <div className="mx-auto max-w-[72rem] px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#0c758d] text-white p-10 sm:p-16 shadow-2xl">
            {/* Ambient glow decoration */}
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#30a66a]/20 blur-3xl" />
            <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative max-w-2xl">
              <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight leading-[1.05] text-white">
                Ready to see what your plant is really losing?
              </h2>
              <p className="mt-5 text-lg text-white/90 leading-relaxed font-normal">
                Book a no-obligation exergy assessment. We’ll quantify the opportunity and back our implementation with a performance guarantee.
              </p>

              {submitted ? (
                <div className="mt-8 p-6 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 text-white max-w-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-[#30a66a] flex items-center justify-center text-white">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-base">Assessment Request Received!</h4>
                      <p className="text-xs text-white/80 mt-0.5">
                        Our engineering team will review your inquiry and contact you within one business day.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs underline text-emerald-200 hover:text-white"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleAssessmentSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your work email"
                    className="flex-1 rounded-full bg-white/15 border border-white/30 px-5 py-3.5 text-sm text-white placeholder:text-white/60 outline-none focus:border-[#30a66a] focus:bg-white/20 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#30a66a] px-7 py-3.5 text-sm font-semibold text-white hover:brightness-105 transition-all whitespace-nowrap shadow-md active:scale-95 disabled:opacity-50"
                  >
                    {submitting ? 'Sending...' : 'Request assessment'}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}

              <p className="mt-4 text-xs text-white/70">
                We reply within one business day. No spam, ever.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
