import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const exploreLinks = [
    { label: 'About Us', href: '/#about' },
    { label: 'Approach', href: '/#approach' },
    { label: 'Services', href: '/#services' },
    { label: 'Applications', href: '/#applications' },
    { label: 'Industries', href: '/#industries' },
    { label: 'Benefits', href: '/#benefits' },
    { label: 'Contact Us', href: '/#contact' },
  ];

  const industries = [
    { name: 'Paper', desc: 'Drying & steam efficiency' },
    { name: 'Processing', desc: 'Integrated heat & water lines' },
    { name: 'Petroleum', desc: 'Exergy recovery in refining' },
    { name: 'Buildings', desc: 'HVAC & water systems' },
  ];

  return (
    <footer className="border-t border-slate-200 bg-white py-14 text-slate-600">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          
          {/* Brand Col */}
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="https://horizons-cdn.hostinger.com/7ad3b21d-4954-4ffa-80db-3f8b05d3a164/19a079c855d5710fe1ed0f1611a8efd2.png"
                alt="Exergy Solutions logo"
                className="h-8 w-8 object-contain"
              />
              <span className="font-display font-bold text-lg text-slate-900 tracking-tight">
                Exergy Solutions<span className="text-[#30a66a]">.</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              Exergy and thermodynamics-integrated consulting for energy and water optimization — with guaranteed, turnkey implementation.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-3">
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#0c758d] transition-colors"
              >
                <span>Staff & Management Portal</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm">
            {/* Explore */}
            <div>
              <div className="font-display font-semibold text-slate-900 mb-3">
                Explore
              </div>
              <ul className="space-y-2 text-slate-600">
                {exploreLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="hover:text-[#0c758d] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <div className="font-display font-semibold text-slate-900 mb-3">
                Industries
              </div>
              <ul className="space-y-2 text-slate-600">
                {industries.map((ind) => (
                  <li key={ind.name}>
                    <a
                      href="/#industries"
                      className="hover:text-[#0c758d] transition-colors"
                    >
                      {ind.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-2 sm:col-span-1">
              <div className="font-display font-semibold text-slate-900 mb-3">
                Contact
              </div>
              <ul className="space-y-2 text-slate-600">
                <li className="text-xs leading-relaxed">
                  334/6D Al Wasl Street DM199 Al Satwa, Dubai UAE
                </li>
                <li>
                  <a
                    href="mailto:sarfraz@exergy-solutions.com"
                    className="hover:text-[#0c758d] transition-colors text-xs font-medium"
                  >
                    sarfraz@exergy-solutions.com
                  </a>
                </li>
              </ul>
              
              <a
                href="https://www.linkedin.com/company/135328489/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:border-[#0c758d] hover:text-[#0c758d] hover:shadow-xs transition-colors"
              >
                <svg className="h-3.5 w-3.5 fill-current text-[#0077b5]" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>Connect on LinkedIn</span>
              </a>
            </div>

          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between gap-3 text-xs text-slate-500">
          <span>© {currentYear} Exergy Solutions. All rights reserved.</span>
          <span>Nature-inspired. Eco-friendly. Guaranteed.</span>
        </div>
      </div>
    </footer>
  );
};
