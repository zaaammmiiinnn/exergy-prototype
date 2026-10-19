"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(pathname !== "/admin/login");

  useEffect(() => {
    if (pathname === "/admin/login") {
      setIsAuthChecking(false);
      return;
    }

    // Check if session exists in cookie or localStorage
    try {
      const hasCookie = document.cookie.includes("exergy_admin_session");
      const hasStorage = !!localStorage.getItem("exergy_admin_session");
      if (!hasCookie && !hasStorage) {
        router.replace("/admin/login");
        return;
      }
    } catch {}

    setIsAuthChecking(false);
  }, [pathname, router]);

  // For /admin/login, render standalone without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-[#06101E] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#2C7FB8] border-t-transparent animate-spin" />
          <span className="text-xs font-mono text-slate-400">Verifying administrator session...</span>
        </div>
      </div>
    );
  }

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
