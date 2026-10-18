import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteSettingsSeed } from "@/content/seed/settings";
import { servicesSeed } from "@/content/seed/services";
import { industriesSeed } from "@/content/seed/industries";
import { MapPin, Mail, Phone, Linkedin, ArrowUpRight, MessageSquare } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Methodology & Approach", href: "/approach" },
    { label: "Industries Served", href: "/industries" },
    { label: "Applications & Projects", href: "/applications" },
    { label: "Benefits & Value", href: "/benefits" },
    { label: "Engineering Assessment", href: "/assessment" },
  ];

  return (
    <footer className="bg-[#0A1628] text-[#F1F5F9] border-t border-white/[0.08] relative">
      {/* Top Engineering Accent Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00B4D8] via-[#0077B6]/50 to-transparent" />

      <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
          
          {/* Col 1: Brand & Positioning (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative h-10 w-[58px] shrink-0">
                <Image
                  src="https://horizons-cdn.hostinger.com/7ad3b21d-4954-4ffa-80db-3f8b05d3a164/19a079c855d5710fe1ed0f1611a8efd2.png"
                  alt="Exergy Solutions logo"
                  fill
                  className="object-contain object-left"
                  sizes="60px"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-heading text-lg font-bold tracking-tight text-[#F1F5F9] group-hover:text-[#00B4D8] transition-colors">
                    EXERGY
                  </span>
                  <span className="font-heading text-lg font-semibold tracking-tight text-[#00B4D8]">
                    SOLUTIONS
                  </span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#94A3B8] leading-tight mt-1">
                  ENERGY ENGINEERING · DUBAI
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#94A3B8] max-w-sm leading-relaxed font-sans">
              Thermodynamic modeling and Second-Law exergy analysis to reduce capex and opex across energy- and water-intensive industrial assets. Guaranteed turnkey implementation.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteSettingsSeed.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#94A3B8] hover:text-[#00B4D8] px-3 py-1.5 border border-white/[0.08] rounded-[2px] bg-[#0F1E33] hover:border-[#00B4D8]/40 transition-colors"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#00B4D8]" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-[#94A3B8]" />
              </a>

              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#94A3B8] hover:text-emerald-400 px-3 py-1.5 border border-white/[0.08] rounded-[2px] bg-[#0F1E33] hover:border-emerald-500/40 transition-colors"
                aria-label="Direct WhatsApp Desk"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Col 2: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#F1F5F9] pb-2 border-b border-white/[0.08]">
              01 / ENGINEERING SERVICES
            </h3>
            <ul className="space-y-2.5 text-xs font-sans text-[#94A3B8]">
              {servicesSeed.map((s) => (
                <li key={s.slug}>
                  <Link 
                    href={`/services/${s.slug}`} 
                    className="hover:text-[#00B4D8] transition-colors flex items-center justify-between group"
                  >
                    <span>{s.title}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#00B4D8]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#F1F5F9] pb-2 border-b border-white/[0.08]">
              02 / COMPANY
            </h3>
            <ul className="space-y-2.5 text-xs font-sans text-[#94A3B8]">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="hover:text-[#00B4D8] transition-colors flex items-center justify-between group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#00B4D8]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Regional Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#F1F5F9] pb-2 border-b border-white/[0.08]">
              03 / UAE HEADQUARTERS
            </h3>
            
            <div className="space-y-3 text-xs text-[#94A3B8] font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00B4D8] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{siteSettingsSeed.address}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#00B4D8] shrink-0 mt-0.5" />
                <a href="tel:+971501234567" className="hover:text-white transition-colors">
                  +971 50 123 4567 (UAE Engineering Desk)
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#00B4D8] shrink-0 mt-0.5" />
                <div className="space-y-1 font-mono text-[11px]">
                  <a href="mailto:neuralwaves.official@gmail.com" className="hover:text-white transition-colors block text-[#00B4D8]">
                    neuralwaves.official@gmail.com
                  </a>
                  <a href="mailto:support@neuralwaves.in" className="hover:text-white transition-colors block">
                    support@neuralwaves.in
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.08]">
              <Link
                href="/admin"
                className="font-mono text-[11px] uppercase tracking-wider text-[#94A3B8] hover:text-[#00B4D8] transition-colors inline-flex items-center gap-1.5"
              >
                <span>Executive Admin Console</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between text-xs font-mono text-[#94A3B8] gap-4">
          <div>
            © {currentYear} Exergy Solutions FZE · All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#00B4D8] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/terms" className="hover:text-[#00B4D8] transition-colors">
              Terms of Engagement
            </Link>
            <span className="text-white/20">|</span>
            <span className="text-[#94A3B8]/60">ISO 50001 & IPMVP Aligned</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
