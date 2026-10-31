import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getLiveIndustries } from "@/lib/industries/industry";
import { MotionDiv } from "@/components/site/motion";
import { CTABand } from "@/components/site/cta-band";
import { ArrowRight, CheckCircle2, Factory, ShieldCheck, Gauge } from "lucide-react";

import { constructMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { getWebPageSchema, getBreadcrumbSchema } from "@/lib/seo/schema";

export const dynamic = "force-dynamic";

export const metadata = constructMetadata({
  title: "Industries Served | Industrial Energy & Water Engineering Dubai",
  description:
    "Targeted thermodynamic optimization across energy- and water-intensive industries: pulp and paper, petrochemicals, district cooling, food processing, commercial facilities, and healthcare.",
  path: "/industries",
});

export default async function IndustriesPage() {
  const allIndustries = await getLiveIndustries();
  const industries = allIndustries.filter((ind) => ind.is_published !== false);

  const pageSchema = getWebPageSchema({
    title: "Industries Served | Industrial Energy & Water Optimization",
    description:
      "Targeted thermodynamic optimization across energy- and water-intensive industries: pulp and paper, petrochemicals, district cooling, food processing, commercial facilities, and healthcare.",
    url: "/industries",
    type: "CollectionPage",
  });

  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
  ]);

  return (
    <div className="flex flex-col">
      <JsonLd data={[pageSchema, breadcrumbs]} />
      {/* Hero */}
      <section className="bg-slate-50 text-slate-900 pt-16 pb-20 border-b border-slate-200 relative">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-6">
            <MotionDiv delay={0.05}>
              <span className="text-teal-700 font-mono text-xs uppercase tracking-wider font-semibold">
                Industrial & Commercial Sectors
              </span>
            </MotionDiv>
            <MotionDiv delay={0.15}>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Deep expertise where energy and water are mission-critical
              </h1>
            </MotionDiv>
            <MotionDiv delay={0.25}>
              <p className="text-lg text-slate-600 leading-relaxed">
                Energy- and water-intensive, made efficient across {industries.length} key sectors. We understand the specific thermodynamic constraints and operating uptime requirements of your industrial operations.
              </p>
            </MotionDiv>
          </div>
        </div>
      </section>

      {/* Industry Detail Sections */}
      <section className="py-20 bg-white text-slate-900">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
          {industries.map((ind, i) => (
            <div
              key={ind.slug}
              id={ind.slug}
              className="scroll-mt-24 p-8 sm:p-10 rounded-2xl bg-slate-50 border border-slate-200 transition-all hover:shadow-md hover:border-slate-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-teal-800 font-semibold uppercase bg-teal-50 border border-teal-200 px-2.5 py-1 rounded">
                      Sector {i + 1 < 10 ? `0${i + 1}` : i + 1}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {ind.name}
                    </h2>
                  </div>

                  <p className="text-base text-teal-700 font-medium">
                    {ind.summary}
                  </p>

                  <div className="text-sm text-slate-600 leading-relaxed space-y-2 whitespace-pre-line font-sans">
                    {ind.body_md}
                  </div>

                  {ind.challenges && ind.challenges.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3 font-semibold">
                        Primary Thermodynamic Challenges Solved:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        {ind.challenges.map((c, idx) => (
                          <div key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200 shadow-xs">
                            <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                            <span>{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4">
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                    <Image
                      src={ind.hero_image || "https://images.hostinger.com/2025f758-1013-44c6-b723-1117c9aa2810.png"}
                      alt={`Industrial thermodynamic efficiency for ${ind.name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 350px"
                      unoptimized
                    />
                  </div>

                  <Link
                    href={`/assessment?sector=${ind.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-md transition-all hover:scale-[1.01]"
                  >
                    <Gauge className="w-4 h-4" />
                    <span>Request {ind.name} Assessment</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABand />
    </div>
  );
}
