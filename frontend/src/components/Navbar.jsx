import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ArrowRight } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About Us', path: '/#about', page: '/about' },
    { name: 'Approach', path: '/#approach', page: '/about' },
    { name: 'Services', path: '/#services', page: '/services' },
    { name: 'Applications', path: '/#applications', page: '/services' },
    { name: 'Industries', path: '/#industries', page: '/industries' },
    { name: 'Benefits', path: '/#benefits', page: '/about' },
    { name: 'Contact Us', path: '/#contact', page: '/contact' },
  ];

  const handleNavClick = (e, path) => {
    if (location.pathname === '/' && path.startsWith('/#')) {
      e.preventDefault();
      const id = path.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-200/50'
      }`}
    >
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 h-[72px] flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="https://horizons-cdn.hostinger.com/7ad3b21d-4954-4ffa-80db-3f8b05d3a164/19a079c855d5710fe1ed0f1611a8efd2.png"
            alt="Exergy Solutions logo"
            className="h-9 w-9 object-contain group-hover:scale-105 transition-transform"
          />
          <span className="font-display font-bold text-xl tracking-tight text-slate-900 leading-none">
            Exergy Solutions<span className="text-[#30a66a]">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 backdrop-blur-md px-2 py-1.5 rounded-full border border-slate-200/60">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={(e) => handleNavClick(e, link.path)}
              className="text-sm font-medium text-slate-600 hover:text-[#0c758d] hover:bg-white rounded-full px-3.5 py-1.5 transition-all duration-150"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/admin/login"
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors border border-slate-200"
            title="Admin Portal"
          >
            <Shield className="w-3.5 h-3.5 text-slate-500" />
            <span>Admin</span>
          </Link>

          <a
            href="/#contact"
            onClick={(e) => handleNavClick(e, '/#contact')}
            className="inline-flex items-center gap-2 rounded-full bg-[#0c758d] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#095f73] hover:shadow-md transition-all active:scale-[0.98]"
          >
            <span>Start a project</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            to="/admin/login"
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 text-xs flex items-center gap-1"
          >
            <Shield className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-4 flex flex-col gap-1 shadow-lg animate-in fade-in-0 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={(e) => {
                handleNavClick(e, link.path);
                setIsOpen(false);
              }}
              className="py-2.5 px-3 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0c758d]"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2 mt-2">
            <a
              href="/#contact"
              onClick={(e) => {
                handleNavClick(e, '/#contact');
                setIsOpen(false);
              }}
              className="inline-flex justify-center items-center gap-2 rounded-full bg-[#0c758d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#095f73]"
            >
              Start a project
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
