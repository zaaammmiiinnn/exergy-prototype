import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteSettingsSeed } from "@/content/seed/settings";
import { servicesSeed } from "@/content/seed/services";
import { industriesSeed } from "@/content/seed/industries";
import { MapPin, Mail, Linkedin, ShieldCheck, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100/90 text-slate-700 border-t border-slate-200/80">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative h-10 w-44">
                <Image
                  src="https://horizons-cdn.hostinger.com/7ad3b21d-4954-4ffa-80db-3f8b05d3a164/19a079c855d5710fe1ed0f1611a8efd2.png"
                  alt="Exergy Solutions logo"
                  fill
                  className="object-contain"
                  sizes="176px"
                />
              </div>
            </Link>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              Exergy and thermodynamics-integrated consulting for energy and water optimization — with guaranteed, turnkey implementation.
            </p>
            <div className="space-y-2 pt-2 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>{siteSettingsSeed.address}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <a href="mailto:neuralwaves.official@gmail.com" className="hover:text-teal-700 transition-colors block font-medium text-slate-800">
                    neuralwaves.official@gmail.com
                  </a>
                  <a href="mailto:support@neuralwaves.in" className="hover:text-teal-700 transition-colors block text-slate-500 text-xs">
                    support@neuralwaves.in
                  </a>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <a
                href={siteSettingsSeed.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 hover:text-teal-700 transition-colors bg-white border border-slate-200 px-3 py-1.5 rounded-md shadow-xs hover:bg-slate-50"
              >
                <Linkedin className="w-3.5 h-3.5 text-teal-600" />
                <span>Connect on LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              {servicesSeed.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-teal-700 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Industries */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Industries
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              {industriesSeed.map((ind) => (
                <li key={ind.slug}>
                  <Link href={`/industries#${ind.slug}`} className="hover:text-teal-700 transition-colors">
                    {ind.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Company & Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <Link href="/about" className="hover:text-teal-700 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/approach" className="hover:text-teal-700 transition-colors">
                  Approach & Methodology
                </Link>
              </li>
              <li>
                <Link href="/applications" className="hover:text-teal-700 transition-colors">
                  Applications
                </Link>
              </li>
              <li>
                <Link href="/benefits" className="hover:text-teal-700 transition-colors">
                  Benefits & Guarantee
                </Link>
              </li>
              <li>
                <Link href="/assessment" className="hover:text-teal-700 transition-colors text-teal-700 font-semibold">
                  Request Assessment
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-teal-700 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-teal-700 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-teal-700 transition-colors text-slate-500 hover:text-slate-700">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Exergy Solutions. All rights reserved. Dubai, United Arab Emirates.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-600">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              Contractual Performance Guarantee
            </span>
            <Link href="/healthz" className="text-slate-500 hover:text-slate-700">
              System Health
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
