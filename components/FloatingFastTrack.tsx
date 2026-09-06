"use client";

import React from "react";
import { Send, MessageCircle } from "lucide-react";

interface FloatingFastTrackProps {
  onOpenLeadModal: () => void;
}

export const FloatingFastTrack: React.FC<FloatingFastTrackProps> = ({ onOpenLeadModal }) => {
  return (
    <div className="fixed bottom-5 right-5 z-30 flex items-center space-x-2">
      {/* WhatsApp Full Direct Action */}
      <a
        href="https://wa.me/8801629944975"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Channel"
        className="flex items-center space-x-2 rounded-tech bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2.5 text-xs font-mono font-bold shadow-xl hover:scale-105 transition-all border border-emerald-500/50"
        title="Direct Line on WhatsApp (+880 1629-944975)"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
        </span>
        <MessageCircle className="h-4 w-4 text-white" />
        <span className="hidden md:inline">WHATSAPP DIRECT</span>
        <span className="md:hidden">WhatsApp</span>
      </a>

      {/* Primary Floating Fast-Track Telegram CTA */}
      <div className="relative group">
        <div className="absolute -inset-0.5 rounded-tech bg-gradient-to-r from-volt-mint to-volt-cyan opacity-60 blur-sm group-hover:opacity-100 transition-opacity animate-pulse"></div>
        <a
          href="https://t.me/+8801629944975"
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center space-x-1.5 rounded-tech bg-surface text-slate-900 border-2 border-emerald-500 shadow-2xl hover:bg-emerald-50/40 dark:bg-slate-950 dark:text-white dark:border-volt-mint px-3 py-2 text-xs font-mono font-bold transition-all"
          title="Telegram SLA 15m"
        >
          <Send className="h-3.5 w-3.5 text-volt-cyan" />
          <span className="hidden md:inline">TELEGRAM SLA: 15M</span>
          <span className="md:hidden">Telegram</span>
        </a>
      </div>
    </div>
  );
};
