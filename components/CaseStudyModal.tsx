"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  Terminal, 
  ShieldCheck, 
  Zap, 
  Send, 
  MessageCircle,
  CheckCircle2, 
  Activity,
  ArrowRight,
  Copy,
  Check
} from "lucide-react";
import { CaseStudy } from "@/lib/types";
import { useToast } from "./Toast";

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
  onInitiateScoping: (squadSlug: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  isOpen,
  onClose,
  onInitiateScoping,
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !caseStudy) return null;

  const handleCopyCodename = () => {
    navigator.clipboard.writeText(caseStudy.codename);
    setCopied(true);
    toast(
      "CODENAME COPIED",
      `[${caseStudy.codename}] copied to clipboard for precision dispatch.`,
      "success"
    );
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      id="case-study-modal-overlay"
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        id="case-study-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-tech-md border border-border-tech bg-surface-card p-6 sm:p-8 shadow-2xl transition-all my-auto"
      >
        {/* Close Button - 44px touch target */}
        <button
          id="case-study-close-btn"
          onClick={onClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 p-2.5 text-text-muted hover:text-text-primary rounded-tech hover:bg-surface transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* System Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-tech overflow-hidden border border-border-tech bg-surface shadow-sm shrink-0">
              <img
                src="/logo.png"
                alt="VoltX Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-text-muted uppercase tracking-wider">
              <span className="flex h-2 w-2 rounded-full bg-volt-mint"></span>
              <span>INTERNAL ARCHITECTURAL BREAKDOWN</span>
              <span className="text-text-muted/40">//</span>
              <button
                onClick={handleCopyCodename}
                className="inline-flex items-center space-x-1 font-mono text-xs font-bold text-volt-cyan bg-volt-subtle px-2 py-0.5 rounded border border-volt-cyan/30 hover:border-volt-cyan transition-all"
                title="Click to copy codename"
              >
                <span>{caseStudy.codename}</span>
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3 opacity-70" />}
              </button>
            </div>
          </div>

          <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary">
            {caseStudy.title}
          </h2>
          <div className="mt-1 flex items-center space-x-2 text-xs font-mono text-text-secondary">
            <span>UNIT: {caseStudy.squad_slug.toUpperCase()}</span>
            <span>•</span>
            <span className="text-emerald-500 flex items-center space-x-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Zero External Leak Confinement</span>
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="space-y-4 text-xs">
          {/* Engineering Challenge */}
          <div className="rounded-tech border border-border-tech bg-surface p-4">
            <div className="flex items-center space-x-2 font-mono text-[11px] uppercase tracking-wider text-text-primary font-semibold mb-1.5">
              <Terminal className="h-3.5 w-3.5 text-volt-cyan" />
              <span>Engineering Challenge & Bottleneck</span>
            </div>
            <p className="text-text-secondary leading-relaxed font-sans text-xs">
              {caseStudy.challenge}
            </p>
          </div>

          {/* Architectural Solution */}
          <div className="rounded-tech border border-border-tech bg-surface p-4">
            <div className="flex items-center space-x-2 font-mono text-[11px] uppercase tracking-wider text-text-primary font-semibold mb-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              <span>Architectural Solution & Delivery</span>
            </div>
            <p className="text-text-secondary leading-relaxed font-sans text-xs">
              {caseStudy.solution}
            </p>
          </div>

          {/* Verified Production Metric */}
          <div className="rounded-tech border border-emerald-500/30 bg-emerald-950/10 dark:bg-emerald-950/30 p-4">
            <div className="flex items-center space-x-1.5 font-mono text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold mb-1">
              <Activity className="h-3.5 w-3.5 text-emerald-500" />
              <span>Verified Production Metric</span>
            </div>
            <div className="font-display text-sm sm:text-base font-bold text-emerald-700 dark:text-emerald-300">
              {caseStudy.metrics}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted mb-2">
              Architecture & Stack Directives:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {caseStudy.tech_stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="rounded bg-surface px-2.5 py-1 text-[11px] font-mono text-text-primary border border-border-tech"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 pt-5 border-t border-border-tech flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onInitiateScoping(caseStudy.squad_slug);
            }}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-tech bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-volt-mint dark:hover:bg-volt-cyan dark:text-slate-950 px-5 py-2.5 text-xs font-mono font-bold transition-all shadow-sm"
          >
            <Zap className="h-3.5 w-3.5 text-white dark:text-slate-950" />
            <span>Scope Similar Architecture</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap sm:flex-nowrap">
            <a
              href={`https://wa.me/8801629944975?text=${encodeURIComponent(`Hi VoltX, I would like to inspect the architecture and deliverables for [${caseStudy.codename}]: ${caseStudy.title}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 rounded-tech border-2 border-emerald-500 bg-white hover:bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-500/60 px-3.5 py-2 text-xs font-mono font-bold shadow-sm transition-all"
              title="Discuss on WhatsApp (+880 1629-944975)"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`https://t.me/+8801629944975`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 rounded-tech border border-border-tech bg-surface px-3.5 py-2 text-xs font-mono font-medium text-text-primary hover:border-volt-cyan hover:bg-surface-card transition-all"
              title="Discuss on Telegram (15m SLA)"
            >
              <Send className="h-3.5 w-3.5 text-volt-cyan" />
              <span>TG Discussion</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
