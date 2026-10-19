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
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Video playback requires user gesture or mute:", err);
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          });
      }
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

  const handleChapterClick = (idx: number, timeStr: string) => {
    setActiveChapter(idx);
    if (!videoRef.current) return;
    const parts = timeStr.split(":").map(Number);
    const seconds = parts.length === 2 ? parts[0] * 60 + parts[1] : 0;
    if (!isNaN(seconds)) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-xl relative">
      {/* Header bar */}
      <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200 shadow-2xs">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-teal-700 font-bold uppercase tracking-wider">
                Engineering Video Walkthrough
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-teal-100 text-teal-800 font-mono font-semibold">
                <Sparkles className="w-2.5 h-2.5" /> 4K Simulation
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">{title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-600 font-mono">
          <span className="inline-flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            <span>Duration: {duration}</span>
          </span>
          <span className="hidden md:inline-flex items-center gap-1 text-slate-600 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Verified Thermodynamics</span>
          </span>
        </div>
      </div>

      {/* Main Video Viewport & Controls */}
      <div className="relative aspect-video bg-slate-950 group overflow-hidden">
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
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-slate-950/30"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-teal-500/30 animate-ping opacity-75" />
              <button
                type="button"
                aria-label="Play video"
                className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-blue-700 to-teal-500 text-white flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-110"
              >
                <Play className="w-8 h-8 ml-1 fill-white" />
              </button>
            </div>
            <div className="mt-4 text-center px-4">
              <span className="text-sm font-bold text-white block drop-shadow-md">
                Watch {serviceTitle} Breakdown
              </span>
              <span className="text-xs text-slate-200 font-mono drop-shadow mt-0.5 block font-medium">
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
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <span className="text-xs font-mono text-slate-200">{subtitle}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFullscreen}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Chapters / Key Demonstration Milestones */}
      {chapters.length > 0 && (
        <div className="p-6 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase text-slate-500 font-bold tracking-wider">
              Demonstration Chapters & Key Observations
            </span>
            <span className="text-[11px] font-mono text-teal-700 font-semibold">
              {chapters.length} Key Stages
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {chapters.map((ch, idx) => (
              <div
                key={ch.time}
                onClick={() => handleChapterClick(idx, ch.time)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  activeChapter === idx
                    ? "bg-teal-50/80 border-teal-300 shadow-xs"
                    : "bg-white border-slate-200 hover:bg-slate-100/70 hover:border-slate-300 shadow-2xs"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold text-slate-900 leading-tight">{ch.title}</span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-teal-700 border border-slate-200">
                    {ch.time}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
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
