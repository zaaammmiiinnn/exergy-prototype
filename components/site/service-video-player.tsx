"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, Maximize2, ShieldCheck, Film, Sparkles, Clock } from "lucide-react";

export interface VideoChapter {
  time: string;
  title: string;
  description: string;
}

export interface ServiceVideoProps {
  title: string;
  subtitle: string;
  videoUrl: string;
  posterUrl: string;
  duration?: string;
  chapters?: VideoChapter[];
  serviceTitle: string;
}

export function ServiceVideoPlayer({
  title,
  subtitle,
  videoUrl,
  posterUrl,
  duration = "2:30",
  chapters = [],
  serviceTitle,
}: ServiceVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeChapter, setActiveChapter] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {
        // Fallback if browser autoplay policies block
      });
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
      {/* Glow background accent */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="px-6 py-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-teal-400 font-semibold uppercase tracking-wider">
                Engineering Video Walkthrough
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-teal-500/20 text-teal-300 font-mono">
                <Sparkles className="w-2.5 h-2.5" /> 4K Simulation
              </span>
            </div>
            <h3 className="text-sm font-bold text-white">{title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
          <span className="inline-flex items-center gap-1 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>Duration: {duration}</span>
          </span>
          <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>Verified Thermodynamics</span>
          </span>
        </div>
      </div>

      {/* Main Video Viewport & Controls */}
      <div className="relative aspect-video bg-black group overflow-hidden">
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          playsInline
          muted={isMuted}
          loop
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Big Center Play Overlay (when paused) */}
        {!isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-slate-950/40"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-teal-500/30 animate-ping opacity-75" />
              <button
                type="button"
                aria-label="Play video"
                className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-teal-400 text-white flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-110"
              >
                <Play className="w-8 h-8 ml-1 fill-white" />
              </button>
            </div>
            <div className="mt-4 text-center px-4">
              <span className="text-sm font-semibold text-white block drop-shadow">
                Watch {serviceTitle} Breakdown
              </span>
              <span className="text-xs text-slate-300 font-mono drop-shadow mt-0.5 block">
                Click to play second-law thermodynamic flow demonstration
              </span>
            </div>
          </div>
        )}

        {/* Video Control Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-4 flex items-center justify-between text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <span className="text-xs font-mono text-slate-300">{subtitle}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFullscreen}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Chapters / Key Demonstration Milestones */}
      {chapters.length > 0 && (
        <div className="p-6 bg-slate-950/80 border-t border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">
              Demonstration Chapters & Key Observations
            </span>
            <span className="text-[11px] font-mono text-teal-400">
              {chapters.length} Key Stages
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {chapters.map((ch, idx) => (
              <div
                key={ch.time}
                onClick={() => setActiveChapter(idx)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  activeChapter === idx
                    ? "bg-teal-950/40 border-teal-500/50 shadow-md"
                    : "bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold text-white leading-tight">{ch.title}</span>
                  <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-teal-400 border border-slate-700">
                    {ch.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                  {ch.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
