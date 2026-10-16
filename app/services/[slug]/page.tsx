import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { servicesSeed } from "@/content/seed/services";
import { industriesSeed } from "@/content/seed/industries";
import { MotionDiv } from "@/components/site/motion";
import { CTABand } from "@/components/site/cta-band";
import { ServiceVideoPlayer } from "@/components/site/service-video-player";
import {
  CheckCircle2,
  ArrowRight,
  Gauge,
  ChevronRight,
  ShieldCheck,
  Factory,
  Zap,
  Cpu,
  TrendingDown,
  Layers,
  Sparkles,
} from "lucide-react";

export function generateStaticParams() {
  return servicesSeed.map((s) => ({
    slug: s.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const service = servicesSeed.find((s) => s.slug === params.slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Exergy Solutions`,
    description: service.summary,
  };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = servicesSeed.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  // Related sibling services
  const otherServices = servicesSeed.filter((s) => s.slug !== service.slug);

  return (
    <div className="flex flex-col">
      {/* Breadcrumb & Hero */}
      <section className="bg-slate-50 text-slate-900 pt-12 pb-16 border-b border-slate-200 relative">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-6">
            <Link href="/" className="hover:text-teal-700 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/services" className="hover:text-teal-700 transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-teal-700 font-semibold">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <MotionDiv delay={0.05}>
                <span className="text-teal-700 font-mono text-xs uppercase tracking-wider font-semibold">
                  Exergy Engineering Specialization
                </span>
              </MotionDiv>
              <MotionDiv delay={0.15}>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {service.title}
                </h1>
              </MotionDiv>
              <MotionDiv delay={0.25}>
                <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                  {service.summary}
                </p>
              </MotionDiv>

              <MotionDiv delay={0.35}>
                <div className="pt-2 flex flex-wrap gap-4">
                  <Link
                    href={`/assessment?service=${service.slug}`}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white font-semibold px-6 py-3.5 rounded-xl shadow-md transition-all"
                  >
                    <Gauge className="w-4 h-4" />
                    <span>Assess {service.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-sm font-medium transition-colors shadow-xs"
                  >
                    Speak with an Engineer
                  </Link>
                </div>
              </MotionDiv>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl">
                <Image
                  src={service.hero_image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Walkthrough Section */}
      <section className="py-16 bg-white text-slate-900 border-b border-slate-200">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-xs font-mono uppercase text-teal-700 tracking-wider font-semibold">
              Live Engineering Demonstration
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Thermodynamic Video Walkthrough
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Examine where useful exergy is destroyed in nominal systems and witness how our turnkey intervention restores optimal thermodynamic performance.
            </p>
          </div>

          <ServiceVideoPlayer
            title={service.video_title}
            subtitle={service.title}
            videoUrl={service.video_url}
            posterUrl={service.video_poster}
            duration={service.video_duration}
            chapters={service.video_chapters}
            serviceTitle={service.title}
          />
        </div>
      </section>

      {/* Scope Details & Deep Thermodynamic Analysis */}
      <section className="py-20 bg-slate-50 text-slate-900">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-10">
              {/* Core Scope */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  What We Do & Where Waste Occurs
                </h2>
                <p className="text-slate-600 leading-relaxed text-base">
                  {service.body_md}
                </p>
              </div>

              {/* Second Law Thermodynamic Physics Card */}
              <div className="p-7 rounded-2xl bg-white border border-teal-200 space-y-4 shadow-sm">
                <div className="flex items-center gap-3 text-teal-700 font-mono text-xs uppercase font-bold tracking-wider">
                  <Zap className="w-4 h-4" />
                  <span>Second-Law Thermodynamic Principle</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Why Conventional Audits Fail and How Exergy Succeeds
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {service.thermodynamic_principle}
                </p>
              </div>

              {/* Key Intervention Vectors */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Key Intervention Vectors
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                      <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specific Energy Consumption & Equipment Scope */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-teal-700 font-mono text-xs uppercase font-semibold">
                    <TrendingDown className="w-4 h-4" />
                    <span>Specific Energy Consumption (SEC)</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Performance KPI Benchmark</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {service.sec_kpi}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-teal-700 font-mono text-xs uppercase font-semibold">
                    <Layers className="w-4 h-4" />
                    <span>Payback & Financial ROI</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Contractual Guarantee</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {service.roi_payback}
                  </p>
                </div>
              </div>

              {/* Turnkey Equipment Scope */}
              {service.equipment_scope && service.equipment_scope.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900">
                    Turnkey Equipment & Engineering Scope
                  </h3>
                  <div className="space-y-2.5">
                    {service.equipment_scope.map((eq, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 shadow-xs"
                      >
                        <Cpu className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                        <span>{eq}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Performance Guarantee Note */}
              <div className="p-6 rounded-2xl bg-teal-50 border border-teal-200 flex items-start gap-4">
                <ShieldCheck className="w-8 h-8 text-teal-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Turnkey Delivery with Guaranteed Savings</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Every optimization project implemented by Exergy Solutions is backed by contractual performance guarantees measured against baseline utility instrumentation under IPMVP protocols.
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar: Industries where this applies */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-4 text-xs font-mono text-teal-700 uppercase font-semibold">
                  <Factory className="w-4 h-4" />
                  <span>Applicable Industries</span>
                </div>
                <div className="space-y-3">
                  {industriesSeed.map((ind) => (
                    <Link
                      key={ind.slug}
                      href={`/industries#${ind.slug}`}
                      className="block p-3 rounded-lg bg-slate-50 hover:bg-teal-50 border border-slate-200 text-sm font-medium text-slate-700 hover:text-teal-800 transition-colors"
                    >
                      {ind.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Sibling Services */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                <h4 className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4 font-semibold">
                  Other Services
                </h4>
                <div className="space-y-2 text-sm">
                  {otherServices.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="block text-slate-600 hover:text-teal-700 transition-colors py-1 flex items-center justify-between"
                    >
                      <span>{s.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Mobile Bar on Service Page */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:hidden flex items-center justify-between gap-3 shadow-lg">
        <div className="truncate">
          <span className="text-xs font-bold text-slate-900 block truncate">{service.title}</span>
          <span className="text-[10px] text-teal-700">Guaranteed turnkey delivery</span>
        </div>
        <Link
          href={`/assessment?service=${service.slug}`}
          className="shrink-0 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold text-xs px-4 py-2 rounded-lg"
        >
          Assess
        </Link>
      </div>

      <CTABand />
    </div>
  );
}
