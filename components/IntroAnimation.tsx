"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * CINEMATIC INTRO ANIMATION (PRELOADER)
 * Sequence (2.8s total):
 * 1. (0.0s - 0.8s): Navy screen (#0A1628). Logo SVG draws itself in (#2C7FB8).
 * 2. (0.8s - 1.8s): "EXERGY SOLUTIONS" types out in JetBrains Mono.
 * 3. (1.8s - 2.2s): ".com" types out with a blinking terminal cursor.
 * 4. (2.2s - 2.8s): Curtain slides up (-100% y) revealing homepage with 1.05 -> 1.0 scale-up.
 *
 * Rules:
 * - sessionStorage 'intro_played': skip if already viewed in current session.
 * - Accessibility: skip if prefers-reduced-motion is true.
 * - Isolates /admin: never play on internal admin console.
 * - Loading progress bar at bottom in Golden Amber (#F0A431).
 */
export function IntroAnimation() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  const [isActive, setIsActive] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [extText, setExtText] = useState("");

  const fullTitle = "EXERGY SOLUTIONS";
  const fullExt = ".com";

  useEffect(() => {
    // 0. Do not run on admin routes
    if (isAdmin) return;

    // 1. Session Storage check
    try {
      if (sessionStorage.getItem("intro_played") === "true") {
        return;
      }
    } catch {
      // Storage access blocked or restricted
    }

    // 2. Reduced motion accessibility check
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      try {
        sessionStorage.setItem("intro_played", "true");
      } catch {}
      return;
    }

    // Activate intro sequence
    setIsActive(true);
    document.body.style.overflow = "hidden";

    // Set initial scale on main content for the reveal effect
    const mainEl = document.querySelector("main");
    if (mainEl) {
      mainEl.style.transform = "scale(1.05)";
      mainEl.style.transformOrigin = "center 15%";
    }

    let typeInterval: NodeJS.Timeout | null = null;
    let extInterval: NodeJS.Timeout | null = null;

    // 0.8s: Type out "EXERGY SOLUTIONS"
    const titleTimer = setTimeout(() => {
      let charIndex = 0;
      typeInterval = setInterval(() => {
        charIndex++;
        setDisplayText(fullTitle.slice(0, charIndex));

        if (charIndex >= fullTitle.length) {
          if (typeInterval) clearInterval(typeInterval);

          // 1.8s: Type out ".com"
          let extIndex = 0;
          extInterval = setInterval(() => {
            extIndex++;
            setExtText(fullExt.slice(0, extIndex));
            if (extIndex >= fullExt.length) {
              if (extInterval) clearInterval(extInterval);
            }
          }, 90);
        }
      }, 55);
    }, 800);

    // 2.2s: Slide up curtain and scale down main content to 1.0
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
      if (mainEl) {
        mainEl.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        mainEl.style.transform = "scale(1.0)";
      }
    }, 2200);

    // 2.8s: Unmount intro, restore overflow, mark session storage
    const completeTimer = setTimeout(() => {
      setIsActive(false);
      try {
        sessionStorage.setItem("intro_played", "true");
      } catch {}
      document.body.style.overflow = "";
      if (mainEl) {
        mainEl.style.transform = "";
        mainEl.style.transition = "";
        mainEl.style.transformOrigin = "";
      }
    }, 2800);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
      if (typeInterval) clearInterval(typeInterval);
      if (extInterval) clearInterval(extInterval);
      document.body.style.overflow = "";
      if (mainEl) {
        mainEl.style.transform = "";
        mainEl.style.transition = "";
        mainEl.style.transformOrigin = "";
      }
    };
  }, [isAdmin]);

  if (isAdmin || !isActive) return null;


  return (
    <AnimatePresence>
      <motion.div
        key="intro-overlay"
        initial={{ y: "0%" }}
        animate={isExiting ? { y: "-100%" } : { y: "0%" }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 z-[9999] bg-[#0A1628] flex flex-col items-center justify-center font-mono select-none overflow-hidden"
      >
        {/* Blueprint corner alignment crosshairs */}
        <span className="absolute top-6 left-6 text-xs text-[#2C7FB8] font-bold select-none">+</span>
        <span className="absolute top-6 right-6 text-xs text-[#2C7FB8] font-bold select-none">+</span>
        <span className="absolute bottom-8 left-6 text-xs text-[#2C7FB8] font-bold select-none">+</span>
        <span className="absolute bottom-8 right-6 text-xs text-[#2C7FB8] font-bold select-none">+</span>

        {/* Subtle background coordinate watermark */}
        <div className="absolute top-6 font-mono text-[10px] text-[#2C7FB8]/40 tracking-widest uppercase">
          EXERGY ENGINEERING ARCHITECTURE // 2nd LAW DYNAMICS
        </div>

        {/* Center Container: Animated Logo + Typographic Brand */}
        <div className="flex flex-col items-center justify-center text-center px-4">
          {/* Logo SVG (0.0s - 0.8s animated draw-in) */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-6 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full drop-shadow-[0_0_25px_rgba(44,127,184,0.35)]"
            >
              {/* Outer Exergy Wave Arc (Primary #2C7FB8) */}
              <motion.path
                d="M 20 65 C 20 38, 42 22, 65 22 C 84 22, 92 34, 92 48 C 92 68, 72 82, 50 82 C 34 82, 26 72, 26 62 C 26 48, 38 40, 52 40 C 66 40, 75 48, 75 58"
                stroke="#2C7FB8"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Inner Thermodynamic Core Wave (Accent Golden Amber #F0A431) */}
              <motion.path
                d="M 36 64 C 36 48, 48 36, 62 36 C 74 36, 80 44, 80 54 C 80 66, 68 74, 54 74 C 44 74, 38 68, 38 60"
                stroke="#F0A431"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Center Energy Pulse Node */}
              <motion.circle
                cx="58"
                cy="54"
                r="3"
                fill="#F0A431"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.2, 1], opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
              />
            </svg>
          </div>

          {/* Typewriter Text: EXERGY SOLUTIONS.com */}
          <div className="h-8 flex items-center justify-center">
            <div role="status" aria-label="Exergy Solutions preloader" className="text-xl sm:text-2xl md:text-3xl font-mono font-bold tracking-widest uppercase text-white flex items-center">
              <span>{displayText}</span>
              <span className="text-[#2C7FB8] font-normal">{extText}</span>
              {/* Terminal blinking cursor */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="inline-block w-2.5 h-5 sm:h-6 ml-1.5 bg-[#F0A431]"
              />
            </div>
          </div>

          <div className="mt-4 font-mono text-[10px] text-slate-400 tracking-[0.2em] uppercase">
            THERMODYNAMIC OPTIMIZATION & PINCH RECOVERY
          </div>
        </div>

        {/* Thin bottom loading progress bar (0% -> 100% in #F0A431) */}
        <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0E4A4F]/40 overflow-hidden">
          <motion.div
            className="h-full bg-[#F0A431] shadow-[0_0_10px_#F0A431]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, ease: "linear" }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
