"use client";

import React from "react";

export function WhatsAppLauncher() {
  return (
    <a
      href="https://wa.me/971501234567"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Exergy Solutions on WhatsApp"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 group"
    >
      {/* Ripple ring effect */}
      <span className="absolute -inset-1 rounded-full bg-[#25D366]/20 animate-ping pointer-events-none opacity-75" />

      {/* WhatsApp SVG Icon */}
      <svg
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="currentColor"
        className="relative z-10 transition-transform group-hover:scale-110"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.94 7.22C8.74 7.22 8.42 7.29 8.16 7.58C7.89 7.86 7.15 8.56 7.15 9.98C7.15 11.4 8.19 12.77 8.33 12.96C8.47 13.15 10.37 16.07 13.28 17.33C13.97 17.63 14.51 17.81 14.93 17.94C15.63 18.17 16.26 18.14 16.76 18.06C17.33 17.98 18.49 17.36 18.73 16.68C18.97 16 18.97 15.42 18.9 15.3C18.83 15.18 18.63 15.11 18.34 14.97C18.05 14.82 16.63 14.12 16.37 14.03C16.11 13.93 15.91 13.88 15.72 14.17C15.52 14.46 14.96 15.11 14.78 15.3C14.61 15.5 14.44 15.52 14.15 15.38C13.86 15.23 12.63 14.83 11.17 13.53C10.04 12.52 9.27 11.27 9.05 10.89C8.83 10.51 9.03 10.3 9.17 10.16C9.3 10.03 9.47 9.81 9.61 9.64C9.76 9.47 9.8 9.35 9.9 9.16C10 8.96 9.95 8.8 9.88 8.65C9.8 8.51 9.23 7.11 8.99 6.54C8.75 5.98 8.52 6.06 8.35 6.05L7.81 6.04C7.57 6.04 7.23 6.13 6.99 6.39L8.94 7.22Z" />
      </svg>
    </a>
  );
}
