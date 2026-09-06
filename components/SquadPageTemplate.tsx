"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Zap, 
  ShieldCheck, 
  Terminal, 
  Send, 
  MessageCircle, 
  Activity, 
  Code, 
  Check, 
  AlertTriangle, 
  Clock, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Cpu, 
  Sparkles,
  Lock,
  Compass,
  Copy
} from "lucide-react";
import { Squad, CaseStudy } from "@/lib/types";
import { useScoping } from "@/components/ClientShell";
import { SpotlightCard } from "./SpotlightCard";
import { Niche3DVisualizer } from "./Niche3DVisualizer";
import { SQUAD_MARKETING_DATA } from "@/lib/squad-marketing-data";
import { useToast } from "./Toast";

interface SquadPageTemplateProps {
  squad: Squad;
  caseStudies: CaseStudy[];
  squadNumber: string;
  isControlledCapacity?: boolean;
  architecturalOverview?: {
    title: string;
    description: string;
    specs: { label: string; value: string }[];
  };
}

export const SquadPageTemplate: React.FC<SquadPageTemplateProps> = ({
  squad,
  caseStudies,
  squadNumber,
  isControlledCapacity = false,
  architecturalOverview,
}) => {
  const { openScopingModal, openCaseStudyModal } = useScoping();
  const { toast } = useToast();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copiedCodename, setCopiedCodename] = useState<string | null>(null);

  const handleCopyCodename = (e: React.MouseEvent, codename: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(codename);
    setCopiedCodename(codename);
    toast(
      "CODENAME COPIED",
      `[${codename}] copied to clipboard for direct routing.`,
      "success"
    );
    setTimeout(() => setCopiedCodename(null), 2000);
  };

  if (!squad) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="font-display text-2xl font-bold text-text-primary">Squad Unit Initializing...</h2>
        <p className="mt-2 text-xs font-mono text-text-muted">The requested operational squad is being verified.</p>
        <a href="/" className="mt-4 px-4 py-2 rounded-tech bg-emerald-600 text-white font-mono text-xs font-bold">Return to VoltX Hub</a>
      </div>
    );
  }

  // Retrieve comprehensive marketing config for this squad
  const marketing = SQUAD_MARKETING_DATA[squad.slug] || {
    badge: "PRECISION ENGINEERING SQUAD",
    heroHeadline: squad.name,
    heroSub: squad.hero_tagline,
    visualizerType: "edge" as const,
    colorHex: "#00E599",
    metrics: [
      { label: "Execution Speed", value: "<45ms", sub: "Global Edge Latency" },
      { label: "SLA Guarantee", value: "99.99%", sub: "Enterprise High Availability" },
      { label: "Code Integrity", value: "100%", sub: "Zero-Leak IP Isolation" },
      { label: "Response Window", value: "<15 Min", sub: "Dedicated Architect Intake" },
    ],
    problemsVsSolutions: [],
    pipeline: [],
    tiers: [],
    faqs: [],
    specs: architecturalOverview?.specs || [],
    overviewTitle: architecturalOverview?.title || `${squad.name} Architecture`,
    overviewDescription: architecturalOverview?.description || squad.short_description,
  };

  const whatsappMessage = encodeURIComponent(
    `Hello VoltX, I would like to scope a project with the [${squad.name}] unit. Can we discuss technical feasibility?`
  );

  return (
    <div className="relative overflow-hidden bg-tech-grid pb-24 transition-colors duration-200">
      {/* Precision Squad Breadcrumbs & Pre-Header */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:pt-12 sm:px-6">
        <div className="flex items-center space-x-2 font-mono text-xs text-text-muted uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-emerald-500 transition-colors">
            VoltX Hub
          </Link>
          <span>/</span>
          <Link href="/#squads" className="hover:text-emerald-500 transition-colors">
            Squads
          </Link>
          <span>/</span>
          <span className="text-emerald-600 dark:text-volt-cyan font-bold">
            {squad.slug.toUpperCase()}
          </span>
        </div>

        {/* Hero Section Container */}
        <div className="rounded-tech-md border border-border-tech bg-surface-card p-6 sm:p-10 shadow-xl backdrop-blur-xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div 
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10 pointer-events-none blur-3xl"
            style={{ backgroundColor: marketing.colorHex }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: High-Impact Marketing Copy */}
            <div className="lg:col-span-7">
              {/* Unit Tag & Availability Status */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="font-mono text-xs font-bold text-text-primary px-2.5 py-0.5 rounded bg-surface border border-border-tech shadow-sm">
                  [{squadNumber}]
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                  UNIT_ID: {squad.slug.toUpperCase()}
                </span>
                <span className="text-text-muted/40">•</span>
                <span 
                  className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 rounded border"
                  style={{
                    backgroundColor: `${marketing.colorHex}15`,
                    color: marketing.colorHex,
                    borderColor: `${marketing.colorHex}40`
                  }}
                >
                  {marketing.badge}
                </span>

                {squad.capacity_full ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    High-Demand Waitlist
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>Ready for Sprints</span>
                  </span>
                )}
              </div>

              {/* Massive Display Title */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-text-primary leading-[1.15]">
                {marketing.heroHeadline}
              </h1>

              {/* Sub-Headline */}
              <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed font-sans max-w-2xl">
                {marketing.heroSub}
              </p>

              {/* Core Engineering Capabilities Grid */}
              <div className="mt-6 pt-6 border-t border-border-tech">
                <div className="font-mono text-[11px] text-text-muted uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                  <Terminal className="h-3.5 w-3.5 text-emerald-500 dark:text-volt-mint" />
                  <span>Core Deliverables & Protocols:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {squad.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-text-secondary">
                      <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  id="squad-initiate-scoping-btn"
                  onClick={() => openScopingModal(squad.slug)}
                  className="flex items-center space-x-2 rounded-tech bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-volt-mint dark:hover:bg-volt-cyan dark:text-slate-950 px-6 py-3 text-xs font-mono font-bold shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <Zap className="h-4 w-4 text-white dark:text-slate-950" />
                  <span>
                    {isControlledCapacity ? "REQUEST SQUAD AVAILABILITY" : "INITIATE SCOPING SPRINT"}
                  </span>
                </button>

                {/* Direct WhatsApp Channel */}
                <a
                  href={`https://wa.me/8801629944975?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 rounded-tech border-2 border-emerald-500 bg-surface-card hover:bg-emerald-50/70 text-emerald-800 dark:text-emerald-300 dark:border-emerald-500/60 px-5 py-3 text-xs font-mono font-bold shadow-sm hover:-translate-y-0.5 transition-all"
                  title="Direct Line on WhatsApp (+880 1629-944975)"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>WHATSAPP DIRECT [+880 1629-944975]</span>
                </a>

                {/* Telegram 15m SLA */}
                <a
                  href="https://t.me/+8801629944975"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 rounded-tech border border-border-tech bg-surface-card px-5 py-3 text-xs font-mono font-bold text-text-primary shadow-sm hover:border-volt-cyan hover:bg-surface hover:-translate-y-0.5 transition-all"
                  title="Direct Telegram Fast-Track (15m SLA)"
                >
                  <Send className="h-4 w-4 text-volt-cyan" />
                  <span>TELEGRAM FAST-TRACK [15M SLA]</span>
                </a>
              </div>
            </div>

            {/* Right Col: Eye-Catching Interactive 3D Canvas Visualizer */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <Niche3DVisualizer
                type={marketing.visualizerType}
                colorHex={marketing.colorHex}
                badge={`3D_${squad.slug.toUpperCase()}_ENGINE`}
              />

              {/* Real-time Trust Badges under 3D model */}
              <div className="mt-4 w-full grid grid-cols-2 gap-2 font-mono text-[10px] text-text-muted">
                <div className="flex items-center space-x-1.5 p-2 rounded bg-surface border border-border-tech">
                  <Clock className="h-3 w-3 text-emerald-500 shrink-0" />
                  <span>&lt; 15M SCOPING INTAKE</span>
                </div>
                <div className="flex items-center space-x-1.5 p-2 rounded bg-surface border border-border-tech">
                  <ShieldCheck className="h-3 w-3 text-emerald-500 shrink-0" />
                  <span>ZERO IP LEAK ASSURED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Telemetry KPI Metrics Bar */}
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {marketing.metrics.map((metric, idx) => (
            <SpotlightCard
              key={idx}
              className="p-5 hover:-translate-y-1 transition-all duration-300"
              spotlightColor="rgba(0, 240, 255, 0.1)"
            >
              <div className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                {metric.label}
              </div>
              <div 
                className="mt-1.5 font-display text-3xl font-extrabold"
                style={{ color: idx === 0 ? marketing.colorHex : undefined }}
              >
                {metric.value}
              </div>
              <div className="mt-1 text-[11px] font-mono text-text-secondary">
                {metric.sub}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* The Problem vs The VoltX Precision Solution */}
      {marketing.problemsVsSolutions.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-border-tech">
            <div>
              <div className="flex items-center space-x-2 font-mono text-xs text-text-muted uppercase tracking-wider mb-1">
                <span>Direct Comparison</span>
                <span className="text-text-muted/40">//</span>
                <span className="text-text-primary font-semibold">Engineering Superiority</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                The Industry Standard vs. VoltX Precision
              </h2>
            </div>
            <p className="mt-2 md:mt-0 text-xs font-mono text-text-muted max-w-md">
              Why leading founders and tech leaders replace traditional agencies with our isolated collective units.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {marketing.problemsVsSolutions.map((item, idx) => (
              <div 
                key={idx}
                className="rounded-tech-md border border-border-tech bg-surface-card p-6 shadow-sm flex flex-col justify-between"
              >
                {/* Industry Problem */}
                <div className="mb-4 pb-4 border-b border-border-tech">
                  <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-red-600 dark:text-red-400 uppercase mb-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                    <span>The Industry Standard:</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed font-sans">
                    {item.industryProblem}
                  </p>
                </div>

                {/* VoltX Precision Solution */}
                <div>
                  <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-emerald-600 dark:text-volt-mint uppercase mb-2">
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>VoltX Precision Engineering:</span>
                  </div>
                  <p className="text-xs text-text-primary leading-relaxed font-sans font-medium">
                    {item.voltxSolution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Deep-Dive Architecture & Tech Directives */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="rounded-tech-md border border-border-tech bg-surface-card p-6 sm:p-10 shadow-sm backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-border-tech">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-2 font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
                <Cpu className="h-3.5 w-3.5 text-volt-cyan" />
                <span>TECHNICAL DIRECTIVES // ZERO TECHNICAL DEBT</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-text-primary">
                {marketing.overviewTitle}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                {marketing.overviewDescription}
              </p>
            </div>

            <div className="shrink-0 p-3 rounded-tech bg-surface border border-border-tech font-mono text-xs text-text-muted flex flex-col justify-center">
              <span>SECURITY ISOLATION: 100%</span>
              <span className="text-emerald-500 font-bold mt-1">AIR-GAPPED IP REPOSITORIES</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-6">
            {marketing.specs.map((spec, sIdx) => (
              <div key={sIdx} className="font-mono p-3 rounded bg-surface border border-border-tech">
                <div className="text-[10px] text-text-muted uppercase tracking-wider">
                  {spec.label}
                </div>
                <div className="text-xs font-semibold text-text-primary mt-1 break-words">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Phase-by-Phase Delivery Workflow Pipeline */}
      {marketing.pipeline.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-border-tech">
            <div>
              <div className="flex items-center space-x-2 font-mono text-xs text-text-muted uppercase tracking-wider mb-1">
                <span>Operational Discipline</span>
                <span className="text-text-muted/40">//</span>
                <span className="text-text-primary font-semibold">10-Day Sprint Roadmap</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                Delivery Milestones Pipeline
              </h2>
            </div>
            <p className="mt-2 md:mt-0 text-xs font-mono text-text-muted max-w-md">
              Rigorous, predictable engineering phases designed for rapid time-to-production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {marketing.pipeline.map((step, idx) => (
              <div 
                key={idx}
                className="relative rounded-tech-md border border-border-tech bg-surface-card p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-sm font-extrabold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 dark:text-volt-mint border border-emerald-500/20">
                      PHASE [{step.stepNumber}]
                    </span>
                    <span className="font-mono text-xs text-text-muted font-bold">
                      {step.timeframe}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-text-primary mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-text-secondary leading-relaxed font-sans mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border-tech">
                  <div className="font-mono text-[10px] uppercase text-text-muted mb-2 font-semibold">
                    Key Sprint Deliverables:
                  </div>
                  <ul className="space-y-1.5">
                    {step.deliverables.map((deliv, dIdx) => (
                      <li key={dIdx} className="flex items-center space-x-1.5 text-xs text-text-secondary">
                        <span className="text-emerald-500 font-bold">→</span>
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sanitized Internal Case Studies Matrix */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-border-tech">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs text-text-muted uppercase tracking-wider mb-1">
              <span>Sanitized Internal Deliverables</span>
              <span className="text-text-muted/40">//</span>
              <span className="text-text-primary font-semibold">Zero External Exposure</span>
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary">
              Verified Production Benchmarks ({caseStudies.length})
            </h2>
          </div>
          <span className="font-mono text-xs text-text-muted mt-2 sm:mt-0">
            Strict Internal Sandbox // No Outbound Client Exposure
          </span>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStudies.map((cs, idx) => (
            <SpotlightCard
              key={cs.id || idx}
              className="p-6 flex flex-col justify-between group"
              spotlightColor="rgba(0, 240, 255, 0.1)"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-text-muted">
                    [{String(idx + 1).padStart(2, "0")}]
                  </span>
                  
                  {/* Codename Badge with Quick Copy */}
                  <button
                    onClick={(e) => handleCopyCodename(e, cs.codename)}
                    className="inline-flex items-center space-x-1 font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-0.5 rounded border border-emerald-500/25 transition-all cursor-pointer"
                    title="Click to copy codename for direct dispatch"
                  >
                    <Code className="h-3 w-3 text-emerald-500" />
                    <span>CODENAME: {cs.codename}</span>
                    {copiedCodename === cs.codename ? (
                      <Check className="h-3 w-3 text-emerald-500 ml-1" />
                    ) : (
                      <Copy className="h-2.5 w-2.5 opacity-60 ml-0.5" />
                    )}
                  </button>
                </div>

                <h3 className="font-display text-xl font-bold text-text-primary group-hover:text-volt-cyan transition-colors">
                  {cs.title}
                </h3>

                {/* Challenge Preview */}
                <div className="mt-3 rounded-tech border border-border-tech bg-surface p-3">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted font-medium mb-0.5">
                    Engineering Challenge:
                  </div>
                  <p className="text-xs text-text-secondary line-clamp-2">
                    {cs.challenge}
                  </p>
                </div>

                {/* Verified Metric Pill */}
                <div className="mt-3 rounded-tech border border-emerald-500/20 bg-emerald-500/5 p-3">
                  <div className="flex items-center space-x-1 font-mono text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold mb-0.5">
                    <Activity className="h-3 w-3 text-emerald-500" />
                    <span>Verified Production Metric:</span>
                  </div>
                  <div className="text-xs font-medium text-emerald-600 dark:text-emerald-300">
                    {cs.metrics}
                  </div>
                </div>
              </div>

              {/* Bottom Bar: Tech Stack & Inspect Action */}
              <div className="mt-6 pt-4 border-t border-border-tech flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {cs.tech_stack.slice(0, 3).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded bg-surface-muted px-2 py-0.5 text-[10px] font-mono text-text-primary border border-border-tech"
                    >
                      {tech}
                    </span>
                  ))}
                  {cs.tech_stack.length > 3 && (
                    <span className="rounded bg-surface-muted px-1.5 py-0.5 text-[10px] font-mono text-text-muted border border-border-tech">
                      +{cs.tech_stack.length - 3}
                    </span>
                  )}
                </div>

                {/* Open Internal Case Study Breakdown */}
                <button
                  onClick={() => openCaseStudyModal(cs)}
                  className="flex items-center justify-center space-x-1.5 rounded-tech bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-volt-mint dark:hover:bg-volt-cyan dark:text-slate-950 px-3.5 py-1.5 text-xs font-mono font-bold shadow-sm transition-all cursor-pointer shrink-0"
                >
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Inspect Architecture</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Sprint Engagement Tiers (Marketing & Pricing Scope) */}
      {marketing.tiers.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-border-tech">
            <div>
              <div className="flex items-center space-x-2 font-mono text-xs text-text-muted uppercase tracking-wider mb-1">
                <span>Commercial Structuring</span>
                <span className="text-text-muted/40">//</span>
                <span className="text-text-primary font-semibold">Predictable Sprints</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                Engagement & Sprint Tiers
              </h2>
            </div>
            <p className="mt-2 md:mt-0 text-xs font-mono text-text-muted max-w-md">
              Select the optimal technical scope for your infrastructure requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {marketing.tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`rounded-tech-md border p-6 flex flex-col justify-between transition-all duration-300 relative ${
                  tier.isPopular
                    ? "border-emerald-500 bg-surface-card shadow-xl ring-2 ring-emerald-500/20"
                    : "border-border-tech bg-surface-card shadow-sm"
                }`}
              >
                {tier.isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-600 text-white font-mono text-[10px] font-bold tracking-wider uppercase shadow">
                    MOST POPULAR // FLAGSHIP SPRINT
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] uppercase font-bold text-text-muted">
                      {tier.badge}
                    </span>
                    <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                      {tier.timeframe}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-text-primary mb-2">
                    {tier.name}
                  </h3>

                  <p className="text-xs text-text-secondary leading-relaxed font-sans mb-6">
                    {tier.recommendedFor}
                  </p>

                  <div className="pt-4 border-t border-border-tech space-y-2.5 mb-8">
                    {tier.deliverables.map((d, dIdx) => (
                      <div key={dIdx} className="flex items-start space-x-2 text-xs text-text-secondary">
                        <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => openScopingModal(squad.slug)}
                  className={`w-full py-3 rounded-tech font-mono text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer ${
                    tier.isPopular
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-volt-mint dark:hover:bg-volt-cyan dark:text-slate-950 shadow-md"
                      : "bg-surface border border-border-tech text-text-primary hover:border-volt-cyan hover:bg-surface-muted"
                  }`}
                >
                  <span>{tier.ctaLabel}</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical FAQ Accordion */}
      {marketing.faqs.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 pt-20 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
              <Lock className="h-3.5 w-3.5 text-emerald-500" />
              <span>CLIENT ASSURANCE & CONTRACTUAL TERMS</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
              Frequently Asked Technical Questions
            </h2>
            <p className="mt-2 text-xs text-text-secondary max-w-xl mx-auto">
              Everything you need to know about intellectual property, NDAs, handover, and our 15-minute scoping response.
            </p>
          </div>

          <div className="space-y-3">
            {marketing.faqs.map((faq, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-tech border border-border-tech bg-surface-card overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left cursor-pointer"
                  >
                    <span className="font-display text-sm sm:text-base font-bold text-text-primary">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-emerald-500 shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-text-muted shrink-0 ml-4" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-text-secondary leading-relaxed font-sans border-t border-border-tech pt-3 bg-surface/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* High-Impact Bottom Conversion Banner */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="rounded-tech-md border-2 border-emerald-400/80 bg-gradient-to-br from-white via-emerald-50/50 to-slate-50 dark:bg-slate-950 dark:border-border-tech dark:from-transparent dark:to-transparent p-8 sm:p-12 text-slate-900 dark:text-white shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8 transition-all duration-200">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 font-mono text-xs text-emerald-700 dark:text-volt-mint mb-2 font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-volt-mint animate-pulse"></span>
              <span>DIRECT INTAKE // SPRINT CAPACITY RESERVATION</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Ready to Deploy {squad.name}?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 font-sans leading-relaxed">
              Initiate scoping directly with our senior squad architect. Scopes analyzed and initial architecture blueprints delivered within 15 minutes.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => openScopingModal(squad.slug)}
              className="flex items-center justify-center space-x-2 rounded-tech bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-volt-mint dark:hover:bg-volt-cyan dark:text-slate-950 px-6 py-3.5 text-xs font-mono font-bold transition-all shadow-lg hover:-translate-y-0.5 cursor-pointer"
            >
              <Zap className="h-4 w-4 text-white dark:text-slate-950" />
              <span>
                {isControlledCapacity ? "CHECK SQUAD CAPACITY" : "SCOPE PROJECT NOW"}
              </span>
            </button>

            <a
              href={`https://wa.me/8801629944975?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 rounded-tech border-2 border-emerald-600 bg-white text-emerald-800 hover:bg-emerald-50 dark:bg-slate-900 dark:text-emerald-300 dark:border-emerald-500/60 px-6 py-3.5 text-xs font-mono font-bold transition-all shadow-sm hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>WHATSAPP [+880 1629-944975]</span>
            </a>

            <a
              href="https://t.me/+8801629944975"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 rounded-tech border border-border-tech bg-surface-card px-6 py-3.5 text-xs font-mono font-bold text-text-primary hover:border-volt-cyan hover:bg-surface transition-all shadow-sm hover:-translate-y-0.5"
            >
              <Send className="h-4 w-4 text-volt-cyan" />
              <span>TELEGRAM</span>
            </a>
          </div>
        </div>
      </section>

      {/* Sticky Mobile Floating Fast-Track Conversion Bar for Direct Marketing Traffic */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface-card/95 backdrop-blur-md border-t border-border-tech p-3 flex md:hidden items-center justify-between gap-2 shadow-2xl">
        <a
          href={`https://wa.me/8801629944975?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 rounded-tech border-2 border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold"
        >
          <MessageCircle className="h-4 w-4 text-emerald-500" />
          <span>WHATSAPP</span>
        </a>

        <button
          onClick={() => openScopingModal(squad.slug)}
          className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 rounded-tech bg-emerald-600 text-white dark:bg-volt-mint dark:text-slate-950 text-xs font-mono font-bold shadow-sm"
        >
          <Zap className="h-4 w-4" />
          <span>SCOPE UNIT</span>
        </button>
      </div>
    </div>
  );
};
