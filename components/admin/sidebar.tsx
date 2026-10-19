"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Bot,
  Settings2,
  Factory,
  Settings,
  LogOut,
  X,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

const NAV_ITEMS: NavItem[] = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Leads",
    href: "/admin/leads",
    icon: Users,
  },
  {
    name: "Chat Inbox",
    href: "/admin/chats",
    icon: MessageSquare,
    badge: 3,
  },
  {
    name: "Chatbot Editor",
    href: "/admin/chatbot",
    icon: Bot,
  },
  {
    name: "Services",
    href: "/admin/services",
    icon: Settings2,
  },
  {
    name: "Industries",
    href: "/admin/industries",
    icon: Factory,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close navigation overlay"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onClose?.();
            }
          }}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden transition-opacity cursor-pointer"
        />
      )}

      {/* Persistent Left Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-[260px] bg-[#0A1628] border-r border-white/[0.08] flex flex-col z-50 transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Top Header: Logo + Admin Console Title */}
        <div className="h-16 px-5 border-b border-white/[0.08] flex items-center justify-between shrink-0">
          <Link
            href="/admin"
            onClick={onClose}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2C7FB8] to-[#0E4A4F] p-1 flex items-center justify-center shrink-0 shadow-xs ring-1 ring-white/10 group-hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Exergy Solutions"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = "none";
                }}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading font-extrabold text-sm text-white tracking-tight leading-tight truncate">
                Exergy Solutions
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#2C7FB8] font-bold">
                Admin Console
              </span>
            </div>
          </Link>

          {/* Close button on mobile */}
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close Sidebar"
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/5 md:hidden transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto overflow-x-hidden">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#2C7FB8]/10 text-white font-semibold border-l-2 border-[#2C7FB8] shadow-xs"
                    : "text-slate-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive
                        ? "text-[#2C7FB8]"
                        : "text-slate-400 group-hover:text-white"
                    }`}
                  />
                  <span className="truncate">{item.name}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#F0A431] text-[#0A1628] shrink-0 shadow-xs">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile Block */}
        <div className="p-3.5 border-t border-white/[0.08] bg-[#07101d] shrink-0">
          <div className="flex items-center gap-2.5 mb-3 px-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2C7FB8] to-[#0E4A4F] text-white flex items-center justify-center font-bold text-xs shrink-0 ring-1 ring-white/10">
              NW
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-xs font-medium text-white truncate"
                title="neuralwaves.official@gmail.com"
              >
                neuralwaves.official@gmail.com
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Founder
                </span>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors border border-white/5"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
