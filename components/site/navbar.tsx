"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Compass, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "Benefits", href: "/benefits" },
  { label: "Contact Us", href: "/contact" },
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
        "sticky top-0 z-50 w-full transition-all duration-200 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs",
        isScrolled ? "py-2.5 shadow-sm" : "py-3.5"
      )}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative h-8 w-[48px] sm:h-9 sm:w-[54px] shrink-0">
            <Image
              src="https://horizons-cdn.hostinger.com/7ad3b21d-4954-4ffa-80db-3f8b05d3a164/19a079c855d5710fe1ed0f1611a8efd2.png"
              alt="Exergy Solutions"
              fill
              priority
              className="object-contain object-left"
              sizes="60px"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-1 leading-none">
              <span className="font-heading text-base sm:text-lg font-bold tracking-tight text-slate-900">
                Exergy Solutions<span className="text-[#0c758d]">.</span>
              </span>
            </div>
            <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-slate-500 leading-tight mt-0.5">
              ENERGY & WATER ENGINEERING
            </span>
          </div>
        </Link>

        {/* Floating Centered Pill Navigation (Matching Target Site) */}
        <nav className="hidden lg:flex items-center bg-slate-100/90 border border-slate-200/80 rounded-full p-1 shadow-2xs">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-150",
                  isActive
                    ? "bg-white text-slate-900 font-semibold shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action CTAs */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link
            href="/portal"
            className={cn(
              "rounded-full border font-medium text-xs px-4 py-2 transition-all flex items-center gap-1.5",
              pathname?.startsWith("/portal")
                ? "bg-[#0c758d] text-white border-[#0c758d] font-semibold"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border-slate-200/90"
            )}
          >
            <User className="w-3.5 h-3.5 text-[#0c758d]" />
            <span>Client Portal</span>
          </Link>

          <Link
            href="/assessment"
            className="rounded-full bg-[#0c758d] hover:bg-[#095f73] text-white font-semibold text-xs px-5 py-2.5 shadow-sm transition-all duration-150 flex items-center gap-1.5"
          >
            <span>Request Audit</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-slate-900 border border-slate-200 bg-white rounded-full"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-1.5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "block px-3.5 py-2 rounded-xl text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-slate-100 text-[#0c758d] font-semibold"
                  : "text-slate-700 hover:bg-slate-50"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2.5 rounded-full border border-slate-200"
            >
              Client Portal
            </Link>
            <Link
              href="/assessment"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-[#0c758d] text-white text-xs font-semibold py-2.5 rounded-full shadow-sm"
            >
              Request Audit
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
