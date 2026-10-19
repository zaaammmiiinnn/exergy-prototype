"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  ShieldCheck,
  Flame,
  Snowflake,
  TrendingUp,
  ArrowRight,
  Layers,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Cpu,
} from "lucide-react";

interface Scene {
  id: string;
  number: string;
  chapterTitle: string;
  heading: string;
  subheading: string;
  duration: number; // in seconds
  voiceoverText: string;
}

const SCENES: Scene[] = [
  {
    id: "who-we-are",
    number: "01",
    chapterTitle: "What We Are",
    heading: "Exergy Solutions — Energy & Water Engineering",
    subheading: "Thermodynamics-integrated consulting for energy & water optimization — with guaranteed, turnkey implementation.",
    duration: 15,
    voiceoverText: "We are Exergy Solutions. Based in Dubai, we apply thermodynamics and Second-Law exergy analysis to slash the capex and opex of energy- and water-intensive industrial facilities. Our philosophy starts with Reduce — engineering thermodynamic efficiency into every process.",
  },
  {
    id: "the-problem",
    number: "02",
    chapterTitle: "What The Problem Is",
    heading: "The First-Law Illusion: 30–45% of Useful Work is Destroyed",
    subheading: "Most audits count kilowatt-hours. They miss where energy quality and useful work potential are truly destroyed.",
    duration: 15,
    voiceoverText: "Here is the problem: Most conventional energy audits only count energy quantity. They treat high-grade electricity and low-grade waste heat as the same. In reality, industrial facilities destroy 30 to 45 percent of their useful work potential through irreversible temperature drops, unrecovered steam, and delta-T syndrome.",
  },
  {
    id: "how-we-work",
    number: "03",
    chapterTitle: "How We Will Work",
    heading: "Our 4-Step Engineering Discipline: From Audit to Guarantee",
    subheading: "A proven, systematic methodology that unifies heat, cooling, drying, and water flows into one optimized whole.",
    duration: 15,
    voiceoverText: "How do we work? Through a rigorous 4-step engineering discipline. First, Diagnose with exergy analysis to map true irreversibility. Second, Model and optimize using thermodynamic pinch simulation. Third, Design nature-inspired cascading loops. And fourth, Implement with contractual, guaranteed performance verified against your baseline.",
  },
  {
    id: "client-benefits",
    number: "04",
    chapterTitle: "How It Benefits You",
    heading: "Contractual Results: 25–30% Resource Cut with 14–22 Mo Payback",
    subheading: "Lower opex, right-sized capex, and freed-up utility capacity to expand production without expanding your bill.",
    duration: 15,
    voiceoverText: "How does this benefit you? You receive typical resource utilisation cuts of 25 to 30 percent, simple payback within 14 to 22 months, and freed-up utility capacity so you can expand production output without increasing energy bills — all backed by a 100 percent turnkey contractual performance guarantee.",
  },
];

const TOTAL_DURATION = SCENES.reduce((acc, s) => acc + s.duration, 0); // 60 seconds

export function IllustrativeExplainerVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [voiceNarratorActive, setVoiceNarratorActive] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Compute active scene from currentTime
  let accumulatedTime = 0;
  let activeSceneIndex = 0;
  for (let i = 0; i < SCENES.length; i++) {
    if (currentTime >= accumulatedTime && currentTime < accumulatedTime + SCENES[i].duration) {
      activeSceneIndex = i;
      break;
    }
    accumulatedTime += SCENES[i].duration;
  }
  if (currentTime >= TOTAL_DURATION) {
    activeSceneIndex = SCENES.length - 1;
  }
  const activeScene = SCENES[activeSceneIndex];

  // Playback timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= TOTAL_DURATION) {
            setIsPlaying(false);
            return TOTAL_DURATION;
          }
          return Math.min(prev + 0.1, TOTAL_DURATION);
        });
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  // Voiceover narrator synthesis when scene changes and unmute is active
  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      if (isPlaying && !isMuted) {
        try {
          const utterance = new SpeechSynthesisUtterance(activeScene.voiceoverText);
          utterance.rate = 1.05;
          utterance.pitch = 1.0;
          utterance.onstart = () => setVoiceNarratorActive(true);
          utterance.onend = () => setVoiceNarratorActive(false);
          utterance.onerror = () => setVoiceNarratorActive(false);
          window.speechSynthesis.speak(utterance);
        } catch {
          setVoiceNarratorActive(false);
        }
      } else {
        setVoiceNarratorActive(false);
      }
    }
  }, [activeSceneIndex, isPlaying, isMuted, activeScene.voiceoverText]);

  const togglePlay = () => {
    if (currentTime >= TOTAL_DURATION) {
      setCurrentTime(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const jumpToScene = (index: number) => {
    let t = 0;
    for (let i = 0; i < index; i++) {
      t += SCENES[i].duration;
    }
    setCurrentTime(t);
    setIsPlaying(true);
  };

  const handleTimelineScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    setCurrentTime(ratio * TOTAL_DURATION);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl overflow-hidden border border-slate-700/60 bg-[#06101E] text-white shadow-2xl transition-all ${
        isFullscreen ? "h-screen w-screen rounded-none" : "max-w-5xl mx-auto"
      }`}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.08] bg-[#0A1628]/90 backdrop-blur-md z-20 relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2C7FB8] to-[#0E4A4F] p-1.5 flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#2C7FB8] font-bold">
                Illustrative Explainer Video
              </span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono font-bold">
                Thermodynamic Model
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-heading font-extrabold text-white truncate">
              Exergy Solutions: How We Transform Industrial Efficiency
            </h3>
          </div>
        </div>

        {/* Voiceover narration indicator */}
        <div className="flex items-center gap-2">
          {voiceNarratorActive && (
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full bg-[#2C7FB8]/20 border border-[#2C7FB8]/40 text-[#60a5fa] text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>Voiceover Active</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={isMuted ? "Enable Narration Voiceover" : "Mute Narration"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>
        </div>
      </div>

      {/* Main Canvas Area (16:9 Aspect Ratio Container) */}
      <div className="relative aspect-video w-full overflow-hidden bg-radial from-[#0B1E36] via-[#06101E] to-[#030810] flex items-center justify-center select-none">
        {/* Subtle Ambient Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(#2C7FB8 1px, transparent 1px), linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
            backgroundSize: "24px 24px, 48px 48px, 48px 48px",
          }}
        />

        {/* Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#2C7FB8]/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#0E4A4F]/25 blur-[120px] rounded-full pointer-events-none" />

        {/* SCENE 1: WHO WE ARE */}
        {activeScene.id === "who-we-are" && (
          <div className="relative z-10 w-full h-full p-6 sm:p-10 flex flex-col justify-between animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2C7FB8]/20 border border-[#2C7FB8]/40 text-[#60a5fa] text-xs font-mono font-bold tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                SECTION 01: WHAT WE ARE
              </span>
              <span className="text-xs font-mono text-slate-400">Dubai, UAE • Global Delivery</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto">
              <div className="md:col-span-7 space-y-4 text-left">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[11px] font-semibold">
                  Exergy & Second-Law Thermodynamics
                </div>
                <h2 className="text-xl sm:text-3xl font-heading font-black text-white leading-tight">
                  Turn Wasted Energy & Water Into Bottom-Line Profit
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  We are all about <strong className="text-cyan-400">Reduce</strong> — engineering thermodynamic efficiency into every heating, cooling, drying, and water system.
                </p>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="text-base sm:text-lg font-mono font-black text-cyan-400">25–30%</div>
                    <div className="text-[10px] text-slate-400 font-mono">Typical Resource Cut</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="text-base sm:text-lg font-mono font-black text-emerald-400">100%</div>
                    <div className="text-[10px] text-slate-400 font-mono">Turnkey Delivery</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="text-base sm:text-lg font-mono font-black text-amber-400">Guaranteed</div>
                    <div className="text-[10px] text-slate-400 font-mono">Contractual Savings</div>
                  </div>
                </div>
              </div>

              {/* Animated Illustrative Core Graphic */}
              <div className="md:col-span-5 flex items-center justify-center">
                <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#2C7FB8]/40 animate-spin" style={{ animationDuration: "25s" }} />
                  <div className="absolute inset-4 rounded-full border border-cyan-400/30 animate-ping" style={{ animationDuration: "3s" }} />
                  <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#2C7FB8]/20 to-[#0E4A4F]/40 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center p-4 text-center shadow-2xl">
                    <Cpu className="w-8 h-8 text-cyan-300 mb-1 animate-pulse" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 font-bold">2nd Law Core</span>
                    <span className="text-xs font-mono font-extrabold text-white mt-1">Exergy &gt; Energy</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-left text-[11px] text-slate-400 font-mono border-t border-white/[0.06] pt-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Reduce, Reuse, Recycle — our work starts with Reduce.</span>
            </div>
          </div>
        )}

        {/* SCENE 2: WHAT THE PROBLEM IS */}
        {activeScene.id === "the-problem" && (
          <div className="relative z-10 w-full h-full p-6 sm:p-10 flex flex-col justify-between animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-mono font-bold tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5" />
                SECTION 02: WHAT THE PROBLEM IS
              </span>
              <span className="text-xs font-mono text-amber-400">Irreversibility & Entropy Generation</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-auto">
              <div className="md:col-span-6 space-y-3 text-left">
                <h2 className="text-lg sm:text-2xl font-heading font-black text-white leading-tight">
                  The First-Law Illusion: Conventional Audits Count Raw kWh
                </h2>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Most audits assume energy is conserved, so they claim facilities are efficient. But they completely ignore <strong className="text-amber-400">energy quality</strong>.
                </p>
                <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 text-xs space-y-1.5 text-slate-300 font-mono">
                  <div className="flex items-center gap-2 text-red-400 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span>The Unseen Loss: T₀ · S_gen</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-sans">
                    Generating 200°C steam just for 40°C warm water destroys 70% of the fuel&apos;s work potential. Chillers suffer delta-T syndrome and pump excessive water.
                  </p>
                </div>
              </div>

              {/* Illustrative Comparison Diagram */}
              <div className="md:col-span-6 space-y-3">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-left space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Conventional First-Law Audit</span>
                    <span className="text-slate-400 font-bold">Misleadingly &ldquo;90% Efficient&rdquo;</span>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
                    <div className="w-[90%] bg-slate-500 h-full" />
                    <div className="w-[10%] bg-slate-700 h-full" />
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-gradient-to-r from-red-950/40 to-amber-950/30 border border-amber-500/30 text-left space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-300 font-bold">Exergy Second-Law Reality</span>
                    <span className="text-red-400 font-bold">30–45% DESTROYED</span>
                  </div>
                  <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden flex p-0.5 border border-red-500/40">
                    <div className="w-[55%] bg-gradient-to-r from-cyan-500 to-emerald-500 h-full rounded-l-full" title="Useful Exergy" />
                    <div className="w-[45%] bg-gradient-to-r from-amber-500 to-red-500 h-full rounded-r-full animate-pulse" title="Destroyed Exergy" />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-1">
                    <span>Useful Work: ~55%</span>
                    <span className="text-red-400 font-bold">Avoidable Exergy Destruction: 30–45%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-left text-[11px] text-amber-300/80 font-mono border-t border-white/[0.06] pt-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>Where heat, cold, and moisture drive costs, exergy exposes hidden irreversibility.</span>
            </div>
          </div>
        )}

        {/* SCENE 3: HOW WE WORK */}
        {activeScene.id === "how-we-work" && (
          <div className="relative z-10 w-full h-full p-6 sm:p-10 flex flex-col justify-between animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold tracking-wider">
                <Layers className="w-3.5 h-3.5" />
                SECTION 03: HOW WE WILL WORK
              </span>
              <span className="text-xs font-mono text-cyan-400">4-Step Engineering Discipline</span>
            </div>

            <div className="my-auto space-y-4">
              <div className="text-center max-w-xl mx-auto space-y-1">
                <h2 className="text-lg sm:text-2xl font-heading font-black text-white">
                  Efficiency, Engineered from the Laws of Physics
                </h2>
                <p className="text-xs text-slate-300">
                  We integrate heating, cooling, drying, and water systems into one optimized whole.
                </p>
              </div>

              {/* 4 Interactive Steps Pipeline */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#09182B] border border-cyan-500/40 text-left space-y-2 relative overflow-hidden group">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono font-bold flex items-center justify-center text-xs">
                    01
                  </div>
                  <h4 className="text-xs font-heading font-extrabold text-white">Diagnose with Exergy</h4>
                  <p className="text-[11px] text-slate-400 font-sans leading-snug">
                    Non-invasive telemetry maps exact entropy and water destruction nodes.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#09182B] border border-teal-500/40 text-left space-y-2 relative overflow-hidden group">
                  <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 font-mono font-bold flex items-center justify-center text-xs">
                    02
                  </div>
                  <h4 className="text-xs font-heading font-extrabold text-white">Model &amp; Optimize</h4>
                  <p className="text-[11px] text-slate-400 font-sans leading-snug">
                    Pinch analysis reveals the optimal network of heat, cooling, and water.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#09182B] border border-emerald-500/40 text-left space-y-2 relative overflow-hidden group">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono font-bold flex items-center justify-center text-xs">
                    03
                  </div>
                  <h4 className="text-xs font-heading font-extrabold text-white">Design Nature-Inspired</h4>
                  <p className="text-[11px] text-slate-400 font-sans leading-snug">
                    Cascading loops and regeneration so one stream&apos;s reject feeds another.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#09182B] border border-amber-500/40 text-left space-y-2 relative overflow-hidden group">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 font-mono font-bold flex items-center justify-center text-xs">
                    04
                  </div>
                  <h4 className="text-xs font-heading font-extrabold text-white">Implement, Guaranteed</h4>
                  <p className="text-[11px] text-slate-400 font-sans leading-snug">
                    Turnkey execution with contractual savings measured against baseline.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-left text-[11px] text-slate-400 font-mono border-t border-white/[0.06] pt-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Turnkey execution — from assessment through equipment commissioning.</span>
            </div>
          </div>
        )}

        {/* SCENE 4: HOW IT BENEFITS THE CLIENT */}
        {activeScene.id === "client-benefits" && (
          <div className="relative z-10 w-full h-full p-6 sm:p-10 flex flex-col justify-between animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold tracking-wider">
                <TrendingUp className="w-3.5 h-3.5" />
                SECTION 04: HOW IT BENEFITS YOU
              </span>
              <span className="text-xs font-mono text-emerald-400">Profitability, Growth &amp; Excellence</span>
            </div>

            <div className="my-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 grid grid-cols-2 gap-3 text-left">
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Profitability
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Lower capex through right-sized design, and lower opex through sustained 25–30% energy &amp; water cuts.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-teal-400 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Growth
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Freed-up utility capacity and headroom lets you expand output without expanding your power bill.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Excellence
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Best-in-class efficiency benchmarks that strengthen your ESG score and operational resilience.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Turnkey Guarantee
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Contractual performance measured and verified against pre-audit baseline. 14–22 month payback.
                  </p>
                </div>
              </div>

              {/* Action Callout */}
              <div className="md:col-span-4 p-5 rounded-2xl bg-gradient-to-br from-[#2C7FB8]/20 to-[#0E4A4F]/40 border border-cyan-400/40 text-center space-y-3 shadow-xl">
                <ShieldCheck className="w-8 h-8 text-cyan-300 mx-auto" />
                <h4 className="text-sm font-heading font-black text-white">
                  Ready to see what your plant is really losing?
                </h4>
                <Link
                  href="/assessment"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-heading font-bold text-[#0A1628] bg-cyan-400 hover:bg-cyan-300 transition-all shadow-md cursor-pointer"
                >
                  <span>Book Free Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="text-left text-[11px] text-emerald-400 font-mono border-t border-white/[0.06] pt-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Contractually guaranteed savings with zero disruption to active manufacturing.</span>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Timeline Bar & Scrubbing */}
      <div className="px-5 py-3 bg-[#0A1628] border-t border-white/[0.08] space-y-3">
        {/* Scrubber Progress Bar */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Video timeline scrubber"
          aria-valuemin={0}
          aria-valuemax={TOTAL_DURATION}
          aria-valuenow={Math.round(currentTime)}
          onClick={handleTimelineScrub}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") setCurrentTime((t) => Math.min(t + 2, TOTAL_DURATION));
            if (e.key === "ArrowLeft") setCurrentTime((t) => Math.max(t - 2, 0));
          }}
          className="relative h-2 w-full bg-slate-800 rounded-full cursor-pointer group"
        >
          {/* Active progress */}
          <div
            className="h-full bg-gradient-to-r from-[#2C7FB8] via-cyan-400 to-teal-400 rounded-full relative transition-all duration-75"
            style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform" />
          </div>

          {/* Chapter Tick Marks */}
          <div className="absolute inset-0 flex justify-between pointer-events-none px-1">
            <span className="w-0.5 h-full bg-white/20" title="Start" />
            <span className="w-0.5 h-full bg-white/20" title="Problem" />
            <span className="w-0.5 h-full bg-white/20" title="Methodology" />
            <span className="w-0.5 h-full bg-white/20" title="Benefits" />
          </div>
        </div>

        {/* Player Controls Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          {/* Controls: Play/Pause, Restart, Time readout */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlay}
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#2C7FB8] to-[#0E4A4F] text-white hover:from-[#358dcc] hover:to-[#125c62] shadow-md transition-all cursor-pointer"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>

            <button
              type="button"
              onClick={handleRestart}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Restart Video"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="text-xs font-mono text-slate-300">
              <span className="text-white font-bold">{formatTime(currentTime)}</span>
              <span className="text-slate-500"> / </span>
              <span className="text-slate-400">{formatTime(TOTAL_DURATION)}</span>
            </div>
          </div>

          {/* Scene Chapter Quick Selectors */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {SCENES.map((scene, idx) => {
              const isActive = activeSceneIndex === idx;
              return (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => jumpToScene(idx)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-[#2C7FB8] text-white shadow-xs font-bold"
                      : "bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>{scene.number}. </span>
                  <span>{scene.chapterTitle}</span>
                </button>
              );
            })}

            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer ml-1"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
