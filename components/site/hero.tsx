"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { HeroSchematic } from "./hero-schematic";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-8 pb-20 sm:pt-10 md:pt-12 lg:pt-14 md:pb-28 border-b border-white/[0.08]">
      {/* Original Crawled Hero Image Background - Vibrant, Bright and Dramatic */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="https://images.hostinger.com/7953796b-93b0-49f3-8314-6db64a5896f2.png"
          alt="Exergy and thermodynamic water energy convergence background"
          fill
          priority
          className="object-cover object-center opacity-100 scale-100 brightness-135 contrast-110 saturate-120 transition-opacity"
          sizes="100vw"
        />
        {/* Localized dark backdrop on far-left for text contrast; center is 100% open, vivid & luminous */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/65 via-transparent via-30% to-transparent" />
        {/* Soft bottom edge feathering only */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/25" />
      </div>

      {/* Luminous Center Vortex Core Glow & Ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gradient-to-r from-cyan-400/20 via-amber-400/20 to-emerald-400/20 rounded-full blur-3xl pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0c758d]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#30a66a]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1720px] 2xl:max-w-[1800px] w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-14 items-center -mt-2 sm:-mt-4">
          
          {/* LEFT COLUMN: Headings, Badge, CTAs, Stats - Aligned to the far-left dark region, shifted up */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-7 order-2 lg:order-1 text-left max-w-xl xl:max-w-2xl lg:-mt-6 xl:-mt-8">
            
            {/* Pill Badge with Animated Dripping Droplet */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-white/20 bg-slate-950/70 rounded-full text-white/95 text-xs font-medium backdrop-blur-md shadow-md"
            >
              {/* Continuous Dripping Droplet Animation in Badge */}
              <span className="relative flex items-center justify-center w-4 h-5 overflow-visible shrink-0">
                <svg
                  viewBox="0 0 16 22"
                  className="w-3.5 h-5 overflow-visible"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <style>{`
                    @keyframes heroBadgeDrip {
                      0% {
                        transform: translateY(0px) scale(0.65, 0.7);
                        opacity: 0;
                      }
                      15% {
                        transform: translateY(2px) scale(0.9, 1);
                        opacity: 1;
                      }
                      60% {
                        transform: translateY(11px) scale(0.85, 1.25);
                        opacity: 1;
                      }
                      80% {
                        transform: translateY(14px) scale(1.2, 0.5);
                        opacity: 0.9;
                      }
                      100% {
                        transform: translateY(16px) scale(1.4, 0.1);
                        opacity: 0;
                      }
                    }
                    @keyframes heroBadgeRipple {
                      0%, 55% {
                        transform: scale(0.2);
                        opacity: 0;
                      }
                      70% {
                        transform: scale(0.8);
                        opacity: 1;
                      }
                      100% {
                        transform: scale(1.5);
                        opacity: 0;
                      }
                    }
                  `}</style>
                  {/* Water drop source silhouette */}
                  <path
                    d="M 8 2 C 5.5 6, 3.5 9, 3.5 12.5 A 4.5 4.5 0 0 0 12.5 12.5 C 12.5 9, 10.5 6, 8 2 Z"
                    fill="#38BDF8"
                    opacity="0.35"
                  />
                  {/* Continuously dripping droplet falling downwards */}
                  <g style={{ animation: "heroBadgeDrip 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite", transformOrigin: "8px 4px" }}>
                    <path
                      d="M 8 2.5 C 6.2 5.8, 4.5 8.2, 4.5 11 A 3.5 3.5 0 0 0 11.5 11 C 11.5 8.2, 9.8 5.8, 8 2.5 Z"
                      fill="#38BDF8"
                    />
                    <circle cx="9.3" cy="10" r="1" fill="#FFFFFF" opacity="0.9" />
                  </g>
                  {/* Ripple upon droplet impact */}
                  <ellipse
                    cx="8"
                    cy="18.5"
                    rx="5"
                    ry="1.8"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="1.2"
                    style={{ animation: "heroBadgeRipple 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite", transformOrigin: "8px 18.5px" }}
                  />
                </svg>
              </span>
              <span className="uppercase tracking-wider text-[11px] font-semibold text-white/95">
                EXERGY OPTIMIZED &amp; WATER SOLUTIONS
              </span>
            </motion.div>

            {/* Main Sora Heading with Emerald Brush Underline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="font-heading text-4xl sm:text-6xl lg:text-[54px] xl:text-[66px] 2xl:text-[72px] font-bold tracking-tight text-white leading-[1.08] drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
                Turn wasted energy and water into{" "}
                <span className="relative inline-block text-white">
                  profit
                  {/* Emerald hand-drawn wavy underline matching target */}
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-[#30a66a] overflow-visible"
                    viewBox="0 0 160 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M 2 9 C 40 15, 80 4, 158 8"
                      stroke="#30a66a"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-base sm:text-lg text-white/90 font-normal leading-relaxed max-w-xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.95)]">
                We apply thermodynamics and exergy analysis to slash the capex and opex of energy- and water-intensive operations — delivered as guaranteed, turnkey implementation.
              </p>
            </motion.div>

            {/* CTAs: Emerald Primary Pill + White Ghost Pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center gap-2.5 bg-[#30a66a] hover:bg-[#28925c] text-white font-semibold text-sm px-7 py-3.5 rounded-full shadow-md hover:shadow-lg shadow-[#30a66a]/25 transition-all duration-150 active:scale-95"
              >
                <span>Book an assessment</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/25 hover:border-white/40 transition-colors"
              >
                <span>Explore services</span>
              </Link>

              <Link
                href="/about#explainer-video"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-200 font-medium text-sm border border-cyan-500/30 hover:border-cyan-400/60 transition-all group"
              >
                <Play className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Watch Explainer</span>
              </Link>
            </motion.div>

            {/* Stat Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-8 border-t border-white/15 grid grid-cols-3 gap-6 max-w-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              {/* Stat 1 */}
              <div>
                <div className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  30–45%
                </div>
                <div className="text-xs text-white/80 mt-1 leading-snug">
                  Typical energy saved
                </div>
              </div>

              {/* Stat 2 */}
              <div>
                <div className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#30a66a]">
                  100%
                </div>
                <div className="text-xs text-white/80 mt-1 leading-snug">
                  Turnkey &amp; guaranteed
                </div>
              </div>

              {/* Stat 3 */}
              <div>
                <div className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  6
                </div>
                <div className="text-xs text-white/80 mt-1 leading-snug">
                  Industries served
                </div>
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Technical Blueprint Schematic - Shifted to the far-right dark region */}
          <div className="lg:col-span-6 xl:col-span-7 relative order-1 lg:order-2 flex justify-center lg:justify-end items-center w-full">
            <HeroSchematic />
          </div>

        </div>
      </div>
    </section>
  );
}
