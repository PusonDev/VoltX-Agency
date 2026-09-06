"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  Zap, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Clock, 
  AlertCircle,
  Copy,
  Check
} from "lucide-react";
import { SquadSlug } from "@/lib/types";
import { voltxStore } from "@/lib/store";
import { useToast } from "./Toast";

interface LeadFunnelModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSquadSlug?: string;
}

const BUDGET_BRACKETS = ["$1k-$3k", "$3k-$7k", "$7k+"];

const SQUADS_OPTIONS: { slug: SquadSlug; label: string }[] = [
  { slug: "shopify", label: "VoltX Commerce Lab (Shopify Plus / Headless)" },
  { slug: "wordpress", label: "VoltX Enterprise WordPress & WooCommerce" },
  { slug: "automation", label: "VoltX Intelligent Automation & AI-Ops" },
  { slug: "growth-analytics", label: "VoltX Attribution & Growth Engineering" },
  { slug: "devops", label: "VoltX Cloud & Infrastructure (DevOps)" },
  { slug: "game-dev", label: "VoltX Interactive & 3D Systems (UE5)" },
  { slug: "web-systems", label: "VoltX Web Systems & Micro-SaaS" },
  { slug: "creative", label: "VoltX Creative & Motion Studio" },
];

export const LeadFunnelModal: React.FC<LeadFunnelModalProps> = ({
  isOpen,
  onClose,
  initialSquadSlug = "shopify",
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [squadSlug, setSquadSlug] = useState<string>(initialSquadSlug);
  const [budget, setBudget] = useState<string>("$3k-$7k");
  const [scope, setScope] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [handle, setHandle] = useState<string>("");
  const [preferredChannel, setPreferredChannel] = useState<string>("Telegram");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedBrief, setCopiedBrief] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (initialSquadSlug) {
      setSquadSlug(initialSquadSlug);
    }
  }, [initialSquadSlug]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleResetAndClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scope.trim()) {
      setErrorMessage("Please provide a brief 1-2 sentence description of your project scope.");
      return;
    }
    setErrorMessage(null);
    setStep(2);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid work or corporate email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          squadSlug,
          budgetBracket: budget,
          projectScope: scope,
          clientEmail: email,
          clientHandle: handle,
          preferredChannel,
        }),
      });

      // Persist in client store immediately
      try {
        voltxStore.addLead({
          squad_slug: squadSlug,
          client_email: email,
          client_handle: handle,
          project_scope: scope,
          budget_bracket: budget,
          preferred_channel: preferredChannel,
          lead_status: "New Lead",
        });
      } catch (storeErr) {
        console.warn("Local lead store error:", storeErr);
      }

      toast("DISPATCH CONFIRMED", "Technical brief routed to lead architects.", "success");
      setStep(3); // Success Screen
    } catch (err: any) {
      console.warn("Lead dispatch handled locally or offline:", err);
      try {
        voltxStore.addLead({
          squad_slug: squadSlug,
          client_email: email,
          client_handle: handle,
          project_scope: scope,
          budget_bracket: budget,
          preferred_channel: preferredChannel,
          lead_status: "New Lead",
        });
      } catch (e) {}
      toast("DISPATCH QUEUED", "Brief prepared for immediate Telegram handoff.", "info");
      setStep(3);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyScopeBrief = () => {
    const briefText = `[VoltX Scope Brief]\nUnit: ${squadSlug.toUpperCase()}\nBudget: ${budget}\nScope: ${scope}\nContact: ${email} (${handle || "No handle"})`;
    navigator.clipboard.writeText(briefText);
    setCopiedBrief(true);
    toast("BRIEF COPIED", "Paste directly into Telegram chat for instant review.", "success");
    setTimeout(() => setCopiedBrief(false), 2000);
  };

  const handleResetAndClose = () => {
    setStep(1);
    setScope("");
    setEmail("");
    setHandle("");
    setErrorMessage(null);
    onClose();
  };

  return (
    <div 
      id="lead-funnel-modal-overlay"
      onClick={handleResetAndClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        id="lead-funnel-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-tech-md border border-border-tech bg-surface-card p-6 sm:p-8 shadow-2xl transition-all my-auto"
      >
        {/* Close Button - 44px touch target */}
        <button
          id="lead-funnel-close-btn"
          onClick={handleResetAndClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 p-2.5 text-text-muted hover:text-text-primary rounded-tech hover:bg-surface transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-tech overflow-hidden border border-border-tech bg-surface shadow-sm">
              <img
                src="/logo.png"
                alt="VoltX Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex items-center space-x-2 font-mono text-[11px] text-text-muted uppercase tracking-wider">
              <span className="flex h-1.5 w-1.5 rounded-full bg-volt-mint animate-pulse"></span>
              <span>VoltX Scoping Pipeline</span>
              <span className="text-text-muted/40">//</span>
              <span className="text-text-primary font-semibold">
                {step === 1 && "Step [01]: Technical Scope & Squad"}
                {step === 2 && "Step [02]: Direct Channel & Email"}
                {step === 3 && "Step [03]: Scoping Fast-Track Confirmed"}
              </span>
            </div>
          </div>

          {/* Visual Step Progress Track */}
          <div className="flex items-center space-x-2 my-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex flex-col space-y-1">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s < step 
                      ? "bg-emerald-500" 
                      : s === step 
                        ? "bg-emerald-600 dark:bg-volt-mint" 
                        : "bg-slate-200 dark:bg-slate-800"
                  }`} 
                />
                <span className={`text-[10px] font-mono ${s === step ? "text-emerald-700 dark:text-volt-mint font-bold" : "text-text-muted"}`}>
                  0{s} {s === 1 ? "Scope" : s === 2 ? "Channel" : "Confirm"}
                </span>
              </div>
            ))}
          </div>

          <h3 className="font-display text-xl font-bold tracking-tight text-text-primary">
            {step === 1 && "Define Technical Requirements"}
            {step === 2 && "Connect With Technical Lead"}
            {step === 3 && "Priority Dispatch Initiated"}
          </h3>
          <p className="text-xs text-text-secondary mt-1 font-sans">
            {step === 1 && "Select the appropriate engineering unit and deliverable scope."}
            {step === 2 && "Provide your corporate email. Zero marketing drivel or unsolicited spam."}
            {step === 3 && "Your brief has been routed. Connect directly on Telegram to bypass waitlists."}
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 flex items-center space-x-2 rounded-tech border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-500">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Step 1 Form */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-medium text-text-primary uppercase mb-1.5">
                Target Engineering Squad
              </label>
              <select
                value={squadSlug}
                onChange={(e) => setSquadSlug(e.target.value)}
                className="w-full rounded-tech border border-border-tech bg-surface px-3 py-2 text-xs text-text-primary focus:border-volt-mint focus:outline-none focus:ring-1 focus:ring-volt-mint font-sans"
              >
                {SQUADS_OPTIONS.map((opt) => (
                  <option key={opt.slug} value={opt.slug}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono font-medium text-text-primary uppercase mb-1.5">
                Estimated Budget Bracket
              </label>
              <div className="grid grid-cols-3 gap-2">
                {BUDGET_BRACKETS.map((bracket) => (
                  <button
                    key={bracket}
                    type="button"
                    onClick={() => setBudget(bracket)}
                    className={`rounded-tech border py-2 text-xs font-mono font-semibold transition-all ${
                      budget === bracket
                        ? "border-volt-mint bg-volt-subtle text-text-primary ring-1 ring-volt-mint"
                        : "border-border-tech bg-surface text-text-muted hover:border-slate-400"
                    }`}
                  >
                    {bracket}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-mono font-medium text-text-primary uppercase">
                  Technical Requirement Brief
                </label>
                <span className="text-[10px] font-mono text-text-muted">Pick a template or type below:</span>
              </div>

              {/* Quick scope template pills */}
              <div className="flex flex-wrap gap-1.5 mb-2.5">
                {[
                  "Headless Shopify (Hydrogen/Next.js)",
                  "Core Web Vitals 99+ Overhaul",
                  "Autonomous n8n & AI Agent Fleet",
                  "Meta CAPI 9.0+ EMQ Setup",
                  "Kubernetes Zero-Downtime Cluster",
                  "Custom Full-Stack Next.js SaaS"
                ].map((chip, cIdx) => (
                  <button
                    key={cIdx}
                    type="button"
                    onClick={() => setScope(`We need VoltX to deliver: ${chip} with guaranteed production SLAs.`)}
                    className="rounded bg-surface-muted hover:bg-emerald-500/10 hover:border-emerald-500/30 text-[10px] font-mono px-2 py-1 text-text-secondary border border-border-tech transition-colors text-left"
                  >
                    + {chip}
                  </button>
                ))}
              </div>

              <textarea
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                rows={3}
                placeholder="e.g. Need headless Shopify store rebuild with sub-second transitions, or HA Redis cluster under high concurrency."
                className="w-full rounded-tech border border-border-tech bg-surface p-3 text-xs text-text-primary placeholder:text-text-muted/60 focus:border-volt-mint focus:outline-none focus:ring-1 focus:ring-volt-mint font-sans"
                required
              />
            </div>

            {/* Instant Bypass Channels */}
            <div className="pt-1 pb-1 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-border-tech/60 pt-3">
              <div className="text-[10px] font-mono text-text-muted">
                Prefer direct chat?
              </div>
              <div className="flex items-center space-x-2">
                <a
                  href={`https://wa.me/8801629944975?text=Hi%20VoltX,%20I'd%20like%20to%20scope%20a%20project%20with%20unit:%20${squadSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  <MessageCircle className="h-3 w-3" />
                  <span>WhatsApp</span>
                </a>
                <span className="text-text-muted/40">•</span>
                <a
                  href="https://t.me/+8801629944975"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-[11px] font-mono font-bold text-volt-cyan hover:underline"
                >
                  <Send className="h-3 w-3" />
                  <span>Telegram (15m)</span>
                </a>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="flex items-center space-x-2 rounded-tech bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-volt-mint dark:hover:bg-volt-cyan dark:text-slate-950 px-5 py-2.5 text-xs font-semibold transition-all"
              >
                <span>Continue to Step [02]</span>
                <ArrowRight className="h-3.5 w-3.5 text-white dark:text-slate-950" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2 Form */}
        {step === 2 && (
          <form onSubmit={handleFinalSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-medium text-text-primary uppercase mb-1.5">
                Corporate / Business Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="architect@yourcompany.com"
                className="w-full rounded-tech border border-border-tech bg-surface px-3 py-2 text-xs text-text-primary placeholder:text-text-muted/60 focus:border-volt-mint focus:outline-none focus:ring-1 focus:ring-volt-mint font-sans"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-medium text-text-primary uppercase mb-1.5">
                  Telegram Handle or Phone (Optional)
                </label>
                <input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="@handle or +1..."
                  className="w-full rounded-tech border border-border-tech bg-surface px-3 py-2 text-xs text-text-primary placeholder:text-text-muted/60 focus:border-volt-mint focus:outline-none focus:ring-1 focus:ring-volt-mint font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-text-primary uppercase mb-1.5">
                  Preferred Contact Channel
                </label>
                <select
                  value={preferredChannel}
                  onChange={(e) => setPreferredChannel(e.target.value)}
                  className="w-full rounded-tech border border-border-tech bg-surface px-3 py-2 text-xs text-text-primary focus:border-volt-mint focus:outline-none focus:ring-1 focus:ring-volt-mint font-sans"
                >
                  <option value="Telegram">Telegram (Recommended - 15m SLA)</option>
                  <option value="Email">Email Dispatch</option>
                  <option value="WhatsApp">WhatsApp Business</option>
                </select>
              </div>
            </div>

            <div className="rounded-tech border border-border-tech bg-surface p-3 font-mono text-[11px] text-text-secondary flex items-center space-x-2">
              <Lock className="h-3.5 w-3.5 text-volt-cyan shrink-0" />
              <span>Strict zero-leak privacy. Information routed directly to technical leads only.</span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-mono text-text-muted hover:text-text-primary"
              >
                ← Back to Step [01]
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-2 rounded-tech bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-volt-mint dark:hover:bg-volt-cyan dark:text-slate-950 px-5 py-2.5 text-xs font-semibold transition-all disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Dispatching Brief...</span>
                ) : (
                  <>
                    <Zap className="h-3.5 w-3.5 text-white dark:text-slate-950" />
                    <span>Submit & Unlock Fast-Track</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: High-Voltage Conversion Success Screen */}
        {step === 3 && (
          <div className="space-y-5 animate-in zoom-in-95 duration-200">
            <div className="rounded-tech border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-600 dark:text-emerald-400 flex items-start space-x-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold">Scope Brief Captured & Recorded</p>
                <p className="text-[11px] text-text-secondary mt-0.5">
                  Your project scope has been dispatched to the VoltX technical dispatch matrix.
                </p>
              </div>
            </div>

            {/* Copy Scope Brief Button */}
            <button
              onClick={handleCopyScopeBrief}
              className="w-full flex items-center justify-center space-x-2 rounded-tech border border-border-tech bg-surface p-2.5 text-xs font-mono text-text-primary hover:border-volt-cyan transition-all"
            >
              {copiedBrief ? (
                <>
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-400">Brief Copied To Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-volt-cyan" />
                  <span>Copy Formatted Brief for Chat</span>
                </>
              )}
            </button>

            {/* Primary High-Voltage Telegram CTA - Dual Theme, zero black box in light mode */}
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-tech-md bg-gradient-to-r from-volt-mint to-volt-cyan opacity-80 blur-sm animate-pulse"></div>
              <a
                href="https://t.me/+8801629944975"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex flex-col items-center justify-center rounded-tech-md bg-white border-2 border-emerald-500 text-slate-900 dark:bg-slate-950 dark:text-white dark:border-volt-mint p-5 text-center transition-all hover:bg-emerald-50/40 dark:hover:bg-slate-900 group shadow-lg"
              >
                <div className="flex items-center space-x-2 font-mono text-xs text-emerald-700 dark:text-volt-mint font-semibold mb-1">
                  <Send className="h-4 w-4 text-emerald-600 dark:text-volt-mint animate-bounce" />
                  <span>DIRECT LINE WITH LEAD TECHNICAL ARCHITECT</span>
                </div>
                <div className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-volt-mint transition-colors">
                  Fast-Track Scoping on Telegram
                </div>
                <div className="flex items-center space-x-1.5 font-mono text-[11px] text-slate-600 dark:text-slate-300 mt-1.5">
                  <Clock className="h-3 w-3 text-emerald-600 dark:text-volt-cyan" />
                  <span>Immediate response guaranteed within 15 minutes.</span>
                </div>
              </a>
            </div>

            {/* Secondary Action: WhatsApp */}
            <div className="flex flex-col items-center space-y-3 pt-1">
              <a
                href="https://wa.me/8801629944975"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 rounded-tech border border-border-tech bg-surface px-4 py-2 text-xs font-mono text-text-primary hover:border-emerald-500 hover:bg-surface-card transition-colors w-full justify-center"
              >
                <MessageCircle className="h-4 w-4 text-emerald-500" />
                <span>WhatsApp Business Channel (+880 1629-944975)</span>
              </a>

              <button
                onClick={handleResetAndClose}
                className="text-xs font-mono text-text-muted hover:text-text-primary pt-1"
              >
                Close Scoping Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
