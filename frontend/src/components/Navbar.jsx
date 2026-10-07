import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ArrowRight, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Industries', path: '/industries' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs'
          : 'bg-white/85 backdrop-blur-sm border-b border-slate-200/60'
      }`}
    >
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 h-[74px] flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="https://horizons-cdn.hostinger.com/7ad3b21d-4954-4ffa-80db-3f8b05d3a164/19a079c855d5710fe1ed0f1611a8efd2.png"
            alt="Exergy Solutions logo"
            className="h-9 w-9 object-contain group-hover:scale-105 transition-transform"
          />
          <div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900 leading-none block">
              Exergy Solutions<span className="text-[#30a66a]">.</span>
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-semibold block mt-0.5">
              Energy & Water Engineering
            </span>
          </div>
        </Link>

        {/* Multi-Page Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 px-2 py-1.5 rounded-full border border-slate-200/70">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs font-semibold rounded-full px-4 py-2 transition-all duration-150 ${
                isActive(link.path)
                  ? 'bg-white text-[#0c758d] shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Authentication & CTA controls */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2 bg-slate-100/80 border border-slate-200/70 p-1.5 rounded-full">
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-[#0c758d] hover:bg-white transition-colors"
                title="Management Dashboard"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#0c758d]" />
                <span className="truncate max-w-[100px]">{user?.name?.split(' ')[0] || 'Dashboard'}</span>
              </Link>
              <Link
                to="/logout"
                className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
            >
              <User className="w-3.5 h-3.5 text-slate-500" />
              <span>Log In</span>
            </Link>
          )}

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#0c758d] hover:bg-[#095f73] px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
          >
            <span>Request Audit</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          {isAuthenticated ? (
            <Link
              to="/admin/dashboard"
              className="p-2 rounded-xl bg-slate-100 text-[#0c758d] border border-slate-200"
              title="Dashboard"
            >
              <LayoutDashboard className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              to="/login"
              className="p-2 rounded-xl bg-slate-100 text-slate-600 border border-slate-200"
              title="Log In"
            >
              <User className="w-4 h-4" />
            </Link>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-4 flex flex-col gap-1.5 shadow-xl animate-in fade-in-0 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`py-2.5 px-3.5 rounded-xl text-sm font-semibold transition-colors ${
                isActive(link.path)
                  ? 'bg-[#0c758d]/10 text-[#0c758d]'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2 mt-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 hover:bg-slate-200"
                >
                  Admin Portal
                </Link>
                <Link
                  to="/logout"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100"
                >
                  Log Out
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-800 hover:bg-slate-200"
              >
                Sign In to Admin Portal
              </Link>
            )}

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="inline-flex justify-center items-center gap-2 rounded-full bg-[#0c758d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#095f73]"
            >
              Request Efficiency Audit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
