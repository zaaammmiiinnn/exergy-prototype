"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "About", href: "/about" },
  { label: "Approach", href: "/approach" },
  { label: "Services", href: "/services" },
  { label: "Applications", href: "/applications" },
  { label: "Industries", href: "/industries" },
  { label: "Benefits", href: "/benefits" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200 border-b",
        isScrolled
          ? "bg-[#0A1628]/95 backdrop-blur-md border-white/[0.08] shadow-lg shadow-black/20 py-3.5"
          : "bg-[#0A1628]/80 backdrop-blur-sm border-white/[0.06] py-4"
      )}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Location Flag */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-[#00B4D8]"
          >
            {/* Logo Mark Graphic */}
            <div className="relative h-8 w-[52px] sm:h-9 sm:w-[58px] shrink-0 brightness-110">
              <Image
                src="https://horizons-cdn.hostinger.com/7ad3b21d-4954-4ffa-80db-3f8b05d3a164/19a079c855d5710fe1ed0f1611a8efd2.png"
                alt="Exergy Solutions"
                fill
                priority
                className="object-contain object-left"
                sizes="60px"
              />
            </div>

            {/* Startup Name */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-heading text-base sm:text-lg font-bold tracking-tight text-[#F1F5F9] group-hover:text-white transition-colors">
                  EXERGY
                </span>
                <span className="font-heading text-base sm:text-lg font-semibold tracking-tight text-[#00B4D8]">
                  SOLUTIONS
                </span>
              </div>
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-[#94A3B8] leading-tight mt-1">
                ENERGY ENGINEERING · DUBAI
              </span>
            </div>
          </Link>

          {/* Technical Location / Status Pill */}
          <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 border border-white/[0.08] bg-[#0F1E33] rounded-[2px] font-mono text-[10px] tracking-[0.1em] text-[#94A3B8]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8] animate-pulse" />
            <span className="text-[#F1F5F9]">SYS.ONLINE</span>
            <span className="text-white/20">|</span>
            <span>DUBAI, UAE</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 text-xs font-mono uppercase tracking-[0.08em] transition-colors rounded-[2px] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]",
                  isActive
                    ? "text-[#00B4D8] bg-[#00B4D8]/10 border border-[#00B4D8]/30 font-semibold"
                    : "text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.04]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/admin"
            className="text-[11px] font-mono uppercase tracking-[0.1em] text-[#94A3B8] hover:text-[#00B4D8] px-2.5 py-1.5 transition-colors"
          >
            Portal
          </Link>

          <Link
            href="/assessment"
            className="inline-flex items-center gap-2 bg-[#00B4D8] hover:bg-[#00B4D8]/90 text-[#0A1628] font-mono text-xs font-semibold uppercase tracking-[0.08em] px-4 py-2.5 rounded-[2px] shadow-[0_0_15px_rgba(0,180,216,0.25)] transition-all hover:shadow-[0_0_20px_rgba(0,180,216,0.4)] focus:outline-none focus:ring-1 focus:ring-[#00B4D8]"
          >
            <span>Request assessment</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#94A3B8] hover:text-[#F1F5F9] border border-white/[0.08] bg-[#0F1E33] rounded-[2px]"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1628] border-b border-white/[0.08] px-4 pt-4 pb-6 space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-[2px] font-mono text-xs uppercase tracking-wider text-[#94A3B8] hover:text-[#00B4D8] hover:bg-white/[0.04]"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
            <Link
              href="/assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-[#00B4D8] text-[#0A1628] font-mono text-xs font-semibold uppercase tracking-wider py-2.5 rounded-[2px]"
            >
              Request assessment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
