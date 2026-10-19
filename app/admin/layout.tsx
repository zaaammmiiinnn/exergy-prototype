"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[hsl(190,30%,98%)] flex">
      {/* Fixed Persistent Sidebar */}
      <AdminSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area (Offset by 260px on desktop, independent scroll) */}
      <div className="flex-1 md:pl-[260px] flex flex-col min-h-screen min-w-0 transition-all">
        {/* Mobile Header with Hamburger Toggle */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0A1628] text-white border-b border-white/[0.08] sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              aria-label="Open Navigation Menu"
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-sm text-white tracking-tight">
                Exergy Solutions
              </span>
              <span className="text-[10px] font-mono uppercase text-[#2C7FB8] font-bold">
                Console
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase">
              Founder
            </span>
          </div>
        </header>

        {/* Scrollable Main Area */}
        <div className="flex-1 w-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
