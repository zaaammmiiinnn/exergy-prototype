import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteSettingsSeed } from "@/content/seed/settings";
import { servicesSeed } from "@/content/seed/services";
import { industriesSeed } from "@/content/seed/industries";
import { MapPin, Mail, Phone, Linkedin, ArrowUpRight, MessageSquare, Twitter, Youtube, Lock } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Methodology & Approach", href: "/approach" },
    { label: "Industries Served", href: "/industries" },
    { label: "Applications & Projects", href: "/applications" },
    { label: "Benefits & Value", href: "/benefits" },
    { label: "Client Account Portal", href: "/portal" },
    { label: "Engineering Assessment", href: "/assessment" },
    { label: "Operations Admin", href: "/admin" },
  ];

  return (
    <footer className="bg-[#061821] text-slate-300 border-t border-teal-900/40 relative">
      {/* Top Engineering Accent Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0c758d] via-[#30a66a] to-transparent" />

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
                  <span className="font-heading text-lg font-bold tracking-tight text-white group-hover:text-[#0c758d] transition-colors">
                    EXERGY
                  </span>
                  <span className="font-heading text-lg font-semibold tracking-tight text-[#0c758d]">
                    SOLUTIONS
                  </span>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400 leading-tight mt-1">
                  ENERGY ENGINEERING · DUBAI
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-sans">
              Thermodynamic modeling and Second-Law exergy analysis to reduce capex and opex across energy- and water-intensive industrial assets. Guaranteed turnkey implementation.
            </p>

            {/* Follow Us & Social Media Links */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-slate-400 font-semibold block">
                Follow Us & Connect
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href={siteSettingsSeed.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-slate-300 hover:text-white px-3.5 py-1.5 border border-slate-700/80 rounded-full bg-white/5 hover:bg-[#0c758d]/20 hover:border-[#0c758d] transition-all"
                  aria-label="Follow Exergy Solutions on LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0c758d]" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>

                <a
                  href="https://twitter.com/exergysolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-slate-300 hover:text-white px-3.5 py-1.5 border border-slate-700/80 rounded-full bg-white/5 hover:bg-[#0c758d]/20 hover:border-[#0c758d] transition-all"
                  aria-label="Follow Exergy Solutions on X (Twitter)"
                >
                  <Twitter className="w-3.5 h-3.5 text-sky-400" />
                  <span>X / Twitter</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>

                <a
                  href="https://youtube.com/@exergysolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-slate-300 hover:text-white px-3.5 py-1.5 border border-slate-700/80 rounded-full bg-white/5 hover:bg-red-500/20 hover:border-red-500/50 transition-all"
                  aria-label="Watch Exergy Engineering Case Studies on YouTube"
                >
                  <Youtube className="w-3.5 h-3.5 text-red-500" />
                  <span>YouTube</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>

                <a
                  href="https://wa.me/971501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-slate-300 hover:text-white px-3.5 py-1.5 border border-slate-700/80 rounded-full bg-white/5 hover:bg-[#25D366]/20 hover:border-[#25D366] transition-all"
                  aria-label="Direct WhatsApp Engineering Desk"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white pb-2 border-b border-teal-900/40">
              01 / ENGINEERING SERVICES
            </h3>
            <ul className="space-y-2.5 text-xs font-sans text-slate-400">
              {servicesSeed.map((s) => (
                <li key={s.slug}>
                  <Link 
                    href={`/services/${s.slug}`} 
                    className="hover:text-[#0c758d] transition-colors flex items-center justify-between group"
                  >
                    <span>{s.title}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#0c758d]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white pb-2 border-b border-teal-900/40">
              02 / COMPANY
            </h3>
            <ul className="space-y-2.5 text-xs font-sans text-slate-400">
              {companyLinks.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className="hover:text-[#0c758d] transition-colors flex items-center justify-between group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#0c758d]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Regional Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-white pb-2 border-b border-teal-900/40">
              03 / UAE HEADQUARTERS
            </h3>
            
            <div className="space-y-3 text-xs text-slate-400 font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0c758d] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{siteSettingsSeed.address}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#0c758d] shrink-0 mt-0.5" />
                <a href="tel:+971501234567" className="hover:text-white transition-colors">
                  +971 50 123 4567 (UAE Engineering Desk)
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#0c758d] shrink-0 mt-0.5" />
                <div className="space-y-1 font-mono text-[11px]">
                  <a href="mailto:sarfraz@exergy-solutions.com" className="hover:text-white transition-colors block text-[#0c758d]">
                    sarfraz@exergy-solutions.com
                  </a>
                  <a href="mailto:info@exergy-solutions.com" className="hover:text-white transition-colors block">
                    info@exergy-solutions.com
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-teal-900/40 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                Internal Operations & Console
              </span>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-teal-500/40 bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 hover:text-white text-xs font-mono font-medium transition-all group"
              >
                <Lock className="w-3.5 h-3.5 text-teal-400" />
                <span>Portal Access</span>
                <ArrowUpRight className="w-3 h-3 text-teal-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-teal-900/40 flex flex-col md:flex-row items-center justify-between text-xs font-mono text-slate-400 gap-4">
          <div>
            © {currentYear} Exergy Solutions FZE · All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1 font-semibold">
              <Lock className="w-3 h-3 text-teal-400" />
              <span>Portal</span>
            </Link>
            <span className="text-teal-800">|</span>
            <Link href="/privacy" className="hover:text-[#0c758d] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-teal-800">|</span>
            <Link href="/terms" className="hover:text-[#0c758d] transition-colors">
              Terms of Engagement
            </Link>
            <span className="text-teal-800">|</span>
            <span className="text-slate-500">ISO 50001 & IPMVP Aligned</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
