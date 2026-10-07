import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Bot, LogOut, ExternalLink, 
  Shield, ChevronRight, Activity 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminLayout = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-600">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 animate-spin text-[#0c758d]" />
          <span>Verifying admin session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Analytics Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Lead Management', path: '/admin/leads', icon: Users },
    { name: 'AI Project Agent (Future)', path: '/admin/ai-agent', icon: Bot, isNew: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between shrink-0 shadow-xs">
        <div className="space-y-6">
          {/* Admin Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="https://horizons-cdn.hostinger.com/7ad3b21d-4954-4ffa-80db-3f8b05d3a164/19a079c855d5710fe1ed0f1611a8efd2.png"
                alt="Exergy Solutions"
                className="w-7 h-7 object-contain"
              />
              <div>
                <span className="font-bold text-sm tracking-tight text-slate-900 font-display">
                  EXERGY ADMIN
                </span>
                <span className="text-[10px] block text-slate-500">Owner Portal</span>
              </div>
            </Link>
          </div>

          {/* Current User Info */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-xs font-semibold text-slate-900 truncate">{user?.name}</div>
            <div className="text-[11px] text-[#0c758d] truncate">{user?.email}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Role: {user?.role}</div>
          </div>

          {/* Nav links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#0c758d]/10 text-[#0c758d] font-semibold border border-[#0c758d]/25'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.isNew && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-[#30a66a] font-mono border border-emerald-200">
                      PREVIEW
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="pt-6 border-t border-slate-200 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content View */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-50">
        <Outlet />
      </main>

    </div>
  );
};
