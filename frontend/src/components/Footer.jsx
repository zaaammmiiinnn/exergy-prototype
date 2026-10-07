import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const exploreLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Industries', to: '/industries' },
    { label: 'Contact & Audit', to: '/contact' },
    { label: 'Portal Login', to: '/login' },
  ];

  const industryLinks = [
    { name: 'Pulp & Paper Manufacturing', to: '/industries#paper' },
    { name: 'Chemicals & Processing', to: '/industries#processing' },
    { name: 'Petroleum & Petrochemicals', to: '/industries#petroleum' },
    { name: 'Commercial Buildings & Districts', to: '/industries#buildings' },
    { name: 'Hotels & Hospitality', to: '/industries#hotels' },
    { name: 'Healthcare & Hospitals', to: '/industries#hospitals' },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/135328489/',
      icon: (
        <svg className="w-4 h-4 fill-current text-[#0077b5]" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    {
      name: 'X.com',
      href: 'https://x.com',
      icon: (
        <svg className="w-4 h-4 fill-current text-slate-800" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'TikTok',
      href: 'https://tiktok.com',
      icon: (
        <svg className="w-4 h-4 fill-current text-[#fe2c55]" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.77 1.81-.02 3.28-1.54 3.28-3.37.01-4.99-.01-9.98.01-14.97z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg className="w-4 h-4 fill-current text-[#E1306C]" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    }
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
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-[#0c758d] transition-colors"
              >
                <span>Engineering Portal Login</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm">
            {/* Explore Pages */}
            <div>
              <div className="font-display font-semibold text-slate-900 mb-3">
                Pages & Navigation
              </div>
              <ul className="space-y-2 text-slate-600">
                {exploreLinks.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="hover:text-[#0c758d] transition-colors"
                    >
                      {item.label}
                    </Link>
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
                {industryLinks.map((ind) => (
                  <li key={ind.name}>
                    <Link
                      to={ind.to}
                      className="hover:text-[#0c758d] transition-colors"
                    >
                      {ind.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Social Channels */}
            <div className="col-span-2 sm:col-span-1">
              <div className="font-display font-semibold text-slate-900 mb-3">
                Direct Contact
              </div>
              <ul className="space-y-2 text-slate-600">
                <li className="text-xs leading-relaxed">
                  334/6D Al Wasl Street DM199 Al Satwa, Dubai UAE
                </li>
                <li>
                  <a
                    href="mailto:sarfraz@exergy-solutions.com"
                    className="hover:text-[#0c758d] transition-colors text-xs font-semibold text-[#0c758d]"
                  >
                    sarfraz@exergy-solutions.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+97142345678"
                    className="hover:text-[#0c758d] transition-colors text-xs text-slate-600"
                  >
                    +971 4 234 5678
                  </a>
                </li>
              </ul>
              
              <div className="mt-5">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-800 mb-2.5">
                  Social Channels
                </span>
                <div className="flex items-center gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors border border-slate-200"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
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
