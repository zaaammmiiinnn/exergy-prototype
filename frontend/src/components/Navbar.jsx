import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, Shield, ArrowRight, User, LogOut, LayoutDashboard, 
  ChevronDown, ArrowUpRight, Share2 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const socialDropdownRef = useRef(null);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (socialDropdownRef.current && !socialDropdownRef.current.contains(event.target)) {
        setIsSocialOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setIsSocialOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Industries', path: '/industries' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const socialPlatforms = [
    {
      name: 'LinkedIn',
      handle: 'exergy-solutions',
      tagline: 'Technical papers & engineering case studies',
      url: 'https://www.linkedin.com/company/135328489/',
      icon: (
        <svg className="w-4 h-4 fill-current text-[#0077b5]" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    {
      name: 'X.com',
      handle: '@ExergySol',
      tagline: 'Thermodynamics updates & UAE Net Zero',
      url: 'https://x.com',
      icon: (
        <svg className="w-4 h-4 fill-current text-slate-800" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'TikTok',
      handle: '@exergysolutions',
      tagline: 'Site walk-throughs & chiller plant clips',
      url: 'https://tiktok.com',
      icon: (
        <svg className="w-4 h-4 fill-current text-[#fe2c55]" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.77 1.81-.02 3.28-1.54 3.28-3.37.01-4.99-.01-9.98.01-14.97z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      handle: '@exergy_solutions',
      tagline: 'Visual project highlights & facilities',
      url: 'https://instagram.com',
      icon: (
        <svg className="w-4 h-4 fill-current text-[#E1306C]" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    }
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

          {/* "Follow Us" Social Media Dropdown */}
          <div className="relative" ref={socialDropdownRef}>
            <button
              type="button"
              onClick={() => setIsSocialOpen(!isSocialOpen)}
              className={`text-xs font-semibold rounded-full px-3.5 py-2 transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                isSocialOpen
                  ? 'bg-white text-[#0c758d] shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Share2 className="w-3.5 h-3.5 text-[#30a66a]" />
              <span>Follow Us</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isSocialOpen ? 'rotate-180 text-[#0c758d]' : 'text-slate-400'}`} />
            </button>

            {/* Dropdown Menu */}
            {isSocialOpen && (
              <div className="absolute top-full right-0 mt-3 w-80 rounded-3xl bg-white border border-slate-200 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-slate-100 mb-2">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#30a66a]">
                    Official Channels
                  </span>
                  <span className="block text-xs font-bold text-slate-900 font-display">
                    Connect With Exergy Solutions
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Follow thermodynamic research, case studies & project videos.
                  </p>
                </div>

                <div className="space-y-1">
                  {socialPlatforms.map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsSocialOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-200/80"
                    >
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-[#0c758d] transition-colors">
                            {item.name}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#0c758d] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>
                        <span className="block text-[11px] font-mono text-slate-400 truncate">
                          {item.handle}
                        </span>
                        <span className="block text-[11px] text-slate-500 truncate mt-0.5">
                          {item.tagline}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
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

          {/* Mobile Follow Us on Social Media */}
          <div className="pt-3 pb-2 border-t border-slate-100 mt-2">
            <div className="flex items-center gap-1.5 px-2 mb-2">
              <Share2 className="w-3.5 h-3.5 text-[#30a66a]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Follow Us on Social Media
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {socialPlatforms.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 transition-colors"
                >
                  <div className="shrink-0">{item.icon}</div>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold text-slate-900 truncate">
                      {item.name}
                    </span>
                    <span className="block text-[10px] text-slate-500 truncate">
                      {item.handle}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2 mt-1">
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
