"use client";

import React, { useState, useEffect, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { Menu, ShieldAlert, X } from "lucide-react";
import { getAdminSessionAction, type AdminSession } from "@/app/actions/admin-auth";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(pathname !== "/admin/login");
  const [currentSession, setCurrentSession] = useState<AdminSession | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check URL query error for unauthorized access
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "unauthorized_role") {
      setToastMessage("Access Denied: Employee role cannot access Settings or Chatbot Editor.");
      // Clean up the URL parameter without a page reload
      try {
        const url = new URL(window.location.href);
        url.searchParams.delete("error");
        window.history.replaceState({}, "", url.pathname + (url.search ? url.search : ""));
      } catch {}
    }
  }, [searchParams]);

  // Auto-dismiss toast after 6 seconds
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 6000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Session verification and route protection
  useEffect(() => {
    if (pathname === "/admin/login" || pathname === "/admin/change-password") {
      setIsAuthChecking(false);
      return;
    }

    let sessionObj: AdminSession | null = null;
    try {
      const match = document.cookie.match(/exergy_admin_session=([^;]+)/);
      if (match) {
        sessionObj = JSON.parse(decodeURIComponent(match[1]));
      } else {
        const stored = localStorage.getItem("exergy_admin_session");
        if (stored) sessionObj = JSON.parse(stored);
      }
    } catch {}

    if (!sessionObj) {
      // Async verify
      getAdminSessionAction().then((session) => {
        if (!session) {
          router.replace("/admin/login");
        } else {
          setCurrentSession(session);
          checkRoutePermission(session, pathname);
          setIsAuthChecking(false);
        }
      });
      return;
    }

    setCurrentSession(sessionObj);
    checkRoutePermission(sessionObj, pathname);
    setIsAuthChecking(false);
  }, [pathname, router]);

  const checkRoutePermission = (session: AdminSession, path: string) => {
    if (session.mustChangePassword && path !== "/admin/change-password") {
      router.replace("/admin/change-password");
      return;
    }

    const isEmployee = session.role === "employee";
    const isRestricted =
      path === "/admin/settings" ||
      path.startsWith("/admin/settings/") ||
      path === "/admin/chatbot" ||
      path.startsWith("/admin/chatbot/");

    if (isEmployee && isRestricted) {
      router.replace("/admin?error=unauthorized_role");
    }
  };

  // For /admin/login and /admin/change-password, render standalone without sidebar
  if (pathname === "/admin/login" || pathname === "/admin/change-password") {
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

  const roleLabel =
    currentSession?.role === "founder"
      ? "Founder"
      : currentSession?.role === "admin"
      ? "Admin"
      : "Employee";

  return (
    <div className="min-h-screen bg-[hsl(190,30%,98%)] flex relative">
      {/* Toast Notification for Restricted RBAC Access */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 max-w-md w-full animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="bg-red-950 border border-red-800 text-white p-4 rounded-2xl shadow-2xl flex items-start gap-3 backdrop-blur-md">
            <div className="p-2 bg-red-900/60 text-red-300 rounded-xl shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-red-200 uppercase font-mono tracking-wider">
                Access Restricted (RBAC)
              </h4>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                {toastMessage}
              </p>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Fixed Persistent Sidebar */}
      <AdminSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area (Offset by 260px on desktop) */}
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
            <span
              className={`px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold uppercase ${
                currentSession?.role === "founder"
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  : currentSession?.role === "admin"
                  ? "bg-[#2C7FB8]/20 text-[#60a5fa] border-[#2C7FB8]/30"
                  : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
              }`}
            >
              {roleLabel}
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

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#06101E] flex items-center justify-center text-slate-400 font-mono text-xs">
          Loading console...
        </div>
      }
    >
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </Suspense>
  );
}
