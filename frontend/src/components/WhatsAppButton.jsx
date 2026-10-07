import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = '971501234567';
  const message = encodeURIComponent(
    'Hello Exergy Solutions! I would like to inquire about your energy and water optimization engineering services.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center">
      {/* Tooltip */}
      {showTooltip && (
        <div className="hidden sm:block absolute left-16 bg-white text-slate-800 text-xs px-3.5 py-2 rounded-xl border border-slate-200 shadow-xl whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-200">
          <div className="font-semibold text-[#30a66a]">Exergy WhatsApp Desk</div>
          <div className="text-[11px] text-slate-500">Direct chat with our engineering team</div>
        </div>
      )}

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all duration-300 group"
        aria-label="Chat with Exergy Solutions on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white fill-white" />
        
        {/* Pulsing ring */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#25D366] border-2 border-white"></span>
        </span>
      </a>
    </div>
  );
};
