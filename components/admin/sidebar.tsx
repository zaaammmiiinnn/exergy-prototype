"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  RefreshCw,
  ShieldCheck,
  CheckSquare,
  KeyRound,
  ShieldAlert,
  Mail,
} from "lucide-react";
import { adminSignOutAction, getAdminSessionAction, type AdminSession } from "@/app/actions/admin-auth";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

const ALL_NAV_ITEMS: NavItem[] = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Assigned Tasks",
    href: "/admin/tasks",
    icon: CheckSquare,
    badge: 2,
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
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminSession | null>(null);
  const [showEmployeeContactModal, setShowEmployeeContactModal] = useState(false);
  const [activeChatCount, setActiveChatCount] = useState<number>(0);

  // Sync active chat inquiries count dynamically (only counting unresolved/active chats)
  useEffect(() => {
    const computeActiveChats = () => {
      try {
        const raw = localStorage.getItem("exergy_admin_chats_v2");
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            // Count only chats requiring attention or active staff conversation
            // Exclude "bot_resolved" and "closed"
            const count = parsed.filter(
              (s: any) => s.status === "needs_human" || s.status === "staff_active"
            ).length;
            setActiveChatCount(count);
            return;
          }
        }
      } catch {}
    };

    computeActiveChats();

    window.addEventListener("storage", computeActiveChats);
    window.addEventListener("exergy-chats-updated", computeActiveChats);
    const interval = setInterval(computeActiveChats, 3000);

    return () => {
      window.removeEventListener("storage", computeActiveChats);
      window.removeEventListener("exergy-chats-updated", computeActiveChats);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // 1. Fetch current admin session from server action
    getAdminSessionAction().then((session) => {
      if (session) {
        setAdminUser(session);
        try {
          localStorage.setItem("exergy_admin_session", JSON.stringify(session));
        } catch {}
      }
    });

    // 2. Synchronous fallback from cookie or localStorage for instant render
    try {
      const match = document.cookie.match(/exergy_admin_session=([^;]+)/);
      if (match) {
        const decoded = decodeURIComponent(match[1]);
        setAdminUser(JSON.parse(decoded));
        return;
      }
      const stored = localStorage.getItem("exergy_admin_session");
      if (stored) {
        setAdminUser(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await adminSignOutAction();
    } catch (e) {
      console.warn("Sign out action error:", e);
    }

    try {
      localStorage.removeItem("exergy_admin_session");
      document.cookie = "exergy_admin_session=; path=/; max-age=0";
    } catch {}

    // Redirect to login page
    router.replace("/admin/login");
    router.refresh();
  };

  // RBAC Filtering Logic:
  // - 'founder' or 'admin': Show all links (Dashboard, Leads, Chats, Chatbot, Settings, etc.)
  // - 'employee': Only show Dashboard, Leads, and Chats. Hide Settings and Chatbot.
  const userRole = adminUser?.role || "employee";
  const isEmployee = userRole === "employee";

  const visibleNavItems = ALL_NAV_ITEMS.filter((item) => {
    if (isEmployee) {
      return ["/admin", "/admin#assigned-tasks", "/admin/leads", "/admin/chats"].includes(item.href);
    }
    return true;
  }).map((item) => {
    if (item.href === "/admin/chats") {
      return {
        ...item,
        badge: activeChatCount > 0 ? activeChatCount : undefined,
      };
    }
    return item;
  });

  // Role Badge Styling
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "founder":
        return {
          label: "Founder",
          classes: "bg-amber-500/20 text-amber-300 border-amber-500/40 ring-amber-500/20",
        };
      case "admin":
        return {
          label: "Admin",
          classes: "bg-[#2C7FB8]/25 text-[#7dd3fc] border-[#2C7FB8]/40 ring-[#2C7FB8]/20",
        };
      case "employee":
      default:
        return {
          label: "Employee",
          classes: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 ring-emerald-500/20",
        };
    }
  };

  const roleBadgeInfo = getRoleBadge(userRole);

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

        {/* Navigation Items (Filtered by RBAC) */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto overflow-x-hidden">
          {visibleNavItems.map((item) => {
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

        {/* User Profile Block with RBAC Role Indication */}
        <div className="p-3.5 border-t border-white/[0.08] bg-[#07101d] shrink-0">
          <div className="flex items-start gap-2.5 mb-3 px-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2C7FB8] to-[#0E4A4F] text-white flex items-center justify-center font-bold text-xs shrink-0 ring-1 ring-white/10 mt-0.5">
              {adminUser?.email
                ? adminUser.email.slice(0, 2).toUpperCase()
                : "AD"}
            </div>
            <div className="flex-1 min-w-0">
              {/* User Email with Role Badge e.g. neuralwaves.official@gmail.com [Founder] */}
              <div className="space-y-1">
                <p
                  className="text-xs font-medium text-white truncate leading-snug"
                  title={adminUser?.email || "Administrator"}
                >
                  {adminUser?.email || "admin@exergy.solutions"}
                </p>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold border uppercase tracking-wider ${roleBadgeInfo.classes}`}
                  >
                    [{roleBadgeInfo.label}]
                  </span>
                  {adminUser?.name && (
                    <span className="text-[10px] text-slate-400 font-mono truncate">
                      {adminUser.name}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                if (isEmployee) {
                  setShowEmployeeContactModal(true);
                } else {
                  if (onClose) onClose();
                  router.push("/admin/change-password");
                }
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5 text-teal-400" />
              <span>Update Password</span>
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer disabled:opacity-50"
            >
              {isSigningOut ? (
                <RefreshCw className="w-3.5 h-3.5 text-slate-400 animate-spin" />
              ) : (
                <LogOut className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
              )}
              <span>{isSigningOut ? "Signing Out..." : "Sign Out"}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Employee Contact Administrator Modal */}
      {showEmployeeContactModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-[#0b1728] border border-slate-700/90 rounded-2xl p-6 max-w-sm w-full shadow-2xl relative space-y-4 text-slate-200 font-sans">
            <button
              onClick={() => setShowEmployeeContactModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-white">
                  Contact Administrator
                </h3>
                <p className="text-[11px] font-mono text-amber-400">
                  Password Reset Restricted
                </p>
              </div>
            </div>

            <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-2.5 text-xs leading-relaxed text-slate-300">
              <p>
                Password updates are accessible only to the administrator. As an employee, please contact your system administrator to reset or update your password.
              </p>
              <div className="pt-2 border-t border-white/10 flex flex-col gap-1 text-[11px] font-mono">
                <span className="text-slate-400">System Administrator:</span>
                <a
                  href="mailto:admin@exergy.solutions?subject=Password%20Reset%20Request%20-%20Employee"
                  className="text-teal-400 hover:underline font-bold flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>admin@exergy.solutions</span>
                </a>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <a
                href="mailto:admin@exergy.solutions?subject=Password%20Reset%20Request%20-%20Employee"
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold text-white bg-[#0c758d] hover:bg-[#095f73] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Administrator</span>
              </a>
              <button
                type="button"
                onClick={() => setShowEmployeeContactModal(false)}
                className="py-2.5 px-4 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
