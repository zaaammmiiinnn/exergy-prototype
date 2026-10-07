import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const SocialMediaSection = ({ compact = false }) => {
  const socialPlatforms = [
    {
      name: 'LinkedIn',
      handle: 'exergy-solutions',
      tagline: 'Technical papers, engineering case studies & executive announcements.',
      url: 'https://www.linkedin.com/company/135328489/',
      badge: 'Professional Network',
      color: 'hover:border-[#0077b5]',
      accentBg: 'bg-[#0077b5]/10 text-[#0077b5]',
      icon: (
        <svg className="w-6 h-6 fill-current text-[#0077b5]" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    },
    {
      name: 'X.com',
      handle: '@ExergySol',
      tagline: 'Real-time thermodynamic insights, UAE Net Zero 2050 & energy policy.',
      url: 'https://x.com',
      badge: 'Live Updates',
      color: 'hover:border-slate-800',
      accentBg: 'bg-slate-100 text-slate-800',
      icon: (
        <svg className="w-6 h-6 fill-current text-slate-900" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: 'TikTok',
      handle: '@exergysolutions',
      tagline: 'Engineering site walk-throughs, chiller plant clips & steam trap forensics.',
      url: 'https://tiktok.com',
      badge: 'Video Explanations',
      color: 'hover:border-[#fe2c55]',
      accentBg: 'bg-[#fe2c55]/10 text-[#fe2c55]',
      icon: (
        <svg className="w-6 h-6 fill-current text-[#fe2c55]" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.77 1.81-.02 3.28-1.54 3.28-3.37.01-4.99-.01-9.98.01-14.97z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      handle: '@exergy_solutions',
      tagline: 'Visual project highlights, industrial installations & sustainable operations.',
      url: 'https://instagram.com',
      badge: 'Visual Gallery',
      color: 'hover:border-[#E1306C]',
      accentBg: 'bg-[#E1306C]/10 text-[#E1306C]',
      icon: (
        <svg className="w-6 h-6 fill-current text-[#E1306C]" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    }
  ];

  if (compact) {
    return (
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
          Connect Across Social Channels
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {socialPlatforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition-all group"
            >
              <div className="shrink-0">{p.icon}</div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-slate-900 truncate group-hover:text-[#0c758d]">
                  {p.name}
                </span>
                <span className="block text-[11px] text-slate-500 truncate">
                  {p.handle}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#30a66a]">
            Connect & Follow
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Connect With Exergy Solutions Across Social Media
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Follow our thermodynamics research, plant efficiency demonstrations, and regional decarbonization updates across LinkedIn, X.com, TikTok, and Instagram.
          </p>
        </div>

        {/* 4 Social Platforms Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialPlatforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-3xl bg-slate-50/70 border border-slate-200 p-6 flex flex-col justify-between hover:bg-white hover:shadow-xl transition-all duration-300 group ${platform.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {platform.icon}
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${platform.accentBg}`}>
                    {platform.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-[#0c758d] transition-colors">
                  {platform.name}
                </h3>
                <span className="text-xs font-mono text-slate-500 block mt-0.5">
                  {platform.handle}
                </span>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                  {platform.tagline}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-[#0c758d]">
                <span>Visit {platform.name}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
