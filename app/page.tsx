"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Zap, 
  ArrowRight, 
  Cpu, 
  BarChart3, 
  Server, 
  Gamepad2, 
  Globe, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  Terminal, 
  Clock, 
  CheckCircle2, 
  Activity,
  Send,
  MessageCircle,
  Search,
  Copy,
  Check,
  Radio,
  ChevronRight,
  Eye,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useScoping } from "@/components/ClientShell";
import { voltxStore } from "@/lib/store";
import { INITIAL_SQUADS, INITIAL_CASE_STUDIES } from "@/lib/initial-data";
import { Squad, CaseStudy } from "@/lib/types";
import { SpotlightCard } from "@/components/SpotlightCard";
import { useToast } from "@/components/Toast";

export default function HomePage() {
  const { openScopingModal, openCaseStudyModal } = useScoping();
  const { toast } = useToast();
  const radarCanvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Hydration-safe initial state
  const [squads, setSquads] = useState<Squad[]>(() => INITIAL_SQUADS.filter((s) => s.is_active));
  const [allCaseStudies, setAllCaseStudies] = useState<CaseStudy[]>(() => INITIAL_CASE_STUDIES.filter((c) => c.is_published));

  useEffect(() => {
    setSquads(voltxStore.getSquads(false));
    setAllCaseStudies(voltxStore.getCaseStudies(undefined, false));
  }, []);

  // Multi-Color Random Blinking Telemetry Radar Engine
  useEffect(() => {
    const canvas = radarCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Retina High-DPI Display Scaling
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.width = 192 * dpr;
    canvas.height = 192 * dpr;
    canvas.style.width = "192px";
    canvas.style.height = "192px";

    // Vibrant Multi-Color Palette
    const palette = [
      { hex: "#00F0FF", ping: "rgba(0, 240, 255, 0.55)" }, // Electric Cyan
      { hex: "#00E599", ping: "rgba(0, 229, 153, 0.55)" }, // Volt Mint
      { hex: "#F59E0B", ping: "rgba(245, 158, 11, 0.55)" }, // Amber Gold
      { hex: "#A855F7", ping: "rgba(168, 85, 247, 0.55)" }, // Neon Violet
      { hex: "#EC4899", ping: "rgba(236, 72, 153, 0.55)" }, // Laser Pink
      { hex: "#38BDF8", ping: "rgba(56, 189, 248, 0.55)" }, // Electric Sky
      { hex: "#10B981", ping: "rgba(16, 185, 129, 0.55)" }, // Emerald
    ];

    const telemetryLabels = [
      "INGRESS", "SRE-01", "COMMERCE", "K3S", "CACHE", 
      "ATTRIB", "HOT-SLA", "PROBE", "NODE-7", "HA-POD"
    ];

    interface CanvasBlip {
      id: number;
      x: number;
      y: number;
      color: { hex: string; ping: string };
      label: string;
      radius: number;
      maxRipple: number;
      createdAt: number;
      duration: number;
    }

    let blips: CanvasBlip[] = [];
    let animationFrameId: number;
    let lastSpawnTime = 0;
    let nextId = 1;

    const spawnRandomBlip = (now: number) => {
      // Random position strictly inside circular boundary (radius: 16px to 76px from center 96, 96)
      const angle = Math.random() * 2 * Math.PI;
      const distance = 16 + Math.random() * 60;
      const x = 96 + distance * Math.cos(angle);
      const y = 96 + distance * Math.sin(angle);
      const color = palette[Math.floor(Math.random() * palette.length)];
      const label = telemetryLabels[Math.floor(Math.random() * telemetryLabels.length)];

      blips.push({
        id: nextId++,
        x,
        y,
        color,
        label,
        radius: 2.2 + Math.random() * 1.5,
        maxRipple: 14 + Math.random() * 8,
        createdAt: now,
        duration: 1500 + Math.random() * 900, // 1.5s to 2.4s
      });

      if (blips.length > 10) {
        blips.shift();
      }
    };

    // Spawn 4 initial blips at different stages so it's lively immediately
    const start = performance.now();
    for (let i = 0; i < 4; i++) {
      spawnRandomBlip(start - i * 400);
    }

    const render = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      // Periodically spawn a new random blip at a brand new location every 380ms - 450ms
      if (now - lastSpawnTime > 400) {
        spawnRandomBlip(now);
        lastSpawnTime = now;
      }

      // Filter active blips
      blips = blips.filter((b) => now - b.createdAt < b.duration);

      blips.forEach((blip) => {
        const elapsed = now - blip.createdAt;
        const progress = elapsed / blip.duration; // 0 to 1

        // Smooth blink curve: 0 (invisible) -> 1 (peak visible) -> 0 (invisible)
        let opacity = 0;
        if (progress < 0.22) {
          // Fade in smoothly from invisible
          opacity = progress / 0.22;
        } else if (progress < 0.58) {
          // Stay visibly glowing
          opacity = 1;
        } else {
          // Smoothly fade back into invisibility
          opacity = Math.max(0, (1 - progress) / 0.42);
        }

        // 1. Expanding Sonar Ripple Wave
        if (progress < 0.8) {
          const rippleProgress = progress / 0.8;
          const currentRipple = blip.radius + rippleProgress * (blip.maxRipple - blip.radius);
          const rippleOpacity = (1 - rippleProgress) * opacity * 0.75;

          ctx.beginPath();
          ctx.arc(blip.x, blip.y, currentRipple, 0, Math.PI * 2);
          ctx.strokeStyle = blip.color.ping;
          ctx.lineWidth = 1.2;
          ctx.globalAlpha = rippleOpacity;
          ctx.stroke();
        }

        // 2. Core Glowing Dot with Halos
        ctx.beginPath();
        ctx.arc(blip.x, blip.y, blip.radius, 0, Math.PI * 2);
        ctx.fillStyle = blip.color.hex;
        ctx.shadowColor = blip.color.hex;
        ctx.shadowBlur = 12;
        ctx.globalAlpha = opacity;
        ctx.fill();

        // 3. Micro Monospace Telemetry Node Tag
        ctx.shadowBlur = 0;
        ctx.font = "8px 'JetBrains Mono', monospace";
        ctx.fillStyle = blip.color.hex;
        ctx.globalAlpha = opacity * 0.85;
        ctx.fillText(blip.label, blip.x + blip.radius + 3, blip.y + 2.5);
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Interactive Filter & Search State for Case Studies
  const [selectedSquadFilter, setSelectedSquadFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedCodename, setCopiedCodename] = useState<string | null>(null);

  // User requirement: Initial state is clean/collapsed. When user clicks or hovers squad tabs, reveal cards below!
  const [isGridRevealed, setIsGridRevealed] = useState<boolean>(false);

  const squadIcons: Record<string, any> = {
    shopify: Zap,
    wordpress: Globe,
    automation: Cpu,
    "growth-analytics": BarChart3,
    devops: Server,
    "game-dev": Gamepad2,
    "web-systems": Layers,
    creative: Sparkles,
  };

  const handleInspectByCodename = (codename: string) => {
    const cs = voltxStore.getCaseStudyByCodename(codename);
    if (cs) {
      openCaseStudyModal(cs);
    }
  };

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

  const handleTabInteraction = (slug: string) => {
    setSelectedSquadFilter(slug);
    setIsGridRevealed(true);
  };

  // Filtered Case Studies
  const filteredCaseStudies = useMemo(() => {
    return allCaseStudies.filter((cs) => {
      const matchesSquad =
        selectedSquadFilter === "all" || cs.squad_slug === selectedSquadFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        cs.title.toLowerCase().includes(q) ||
        cs.codename.toLowerCase().includes(q) ||
        cs.challenge.toLowerCase().includes(q) ||
        cs.solution.toLowerCase().includes(q) ||
        cs.tech_stack.some((t) => t.toLowerCase().includes(q));
      return matchesSquad && matchesQuery;
    });
  }, [allCaseStudies, selectedSquadFilter, searchQuery]);

  return (
    <div className="relative overflow-hidden bg-tech-grid pb-24 transition-colors duration-200">
      {/* Precision Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 pt-12 sm:pt-20 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-8 flex flex-col items-start">
            {/* Logo & Monospace Badge */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-tech overflow-hidden border border-border-tech bg-surface-card shadow-md transition-all duration-300 hover:scale-105 hover:border-emerald-500 dark:hover:border-volt-mint hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                <img
                  src="/logo.png"
                  alt="VoltX Emblem"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="inline-flex items-center space-x-2 rounded-tech border border-border-tech bg-surface-card px-3 py-1.5 text-xs font-mono font-medium text-text-primary shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-volt-mint animate-pulse"></span>
                <span className="text-text-muted">[VOLTX-SYS-V3.2]</span>
                <span className="text-text-muted/40">//</span>
                <span className="text-text-primary font-semibold">ZERO-LEAK TECHNICAL JUNCTION</span>
              </div>
            </div>

            {/* Main Display Headline */}
            <h1 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-text-primary sm:text-5xl lg:text-6xl max-w-4xl leading-[1.1]">
              Precision Engineering Laboratory &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 dark:from-volt-mint dark:via-volt-cyan dark:to-teal-300">
                High-Ticket Consultancy.
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-6 max-w-2xl text-sm sm:text-base text-text-secondary leading-relaxed">
              We do not deploy fragile templates or amateur freelancer code. VoltX operates collective, high-discipline engineering squads for enterprise headless commerce, autonomous SRE intelligence, 47,000+ QPS infrastructure, and server-side attribution.
            </p>

            {/* Hero Action Buttons - Providing clear, prominent WhatsApp and Telegram options */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openScopingModal("shopify")}
                className="flex items-center space-x-2 rounded-tech bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-volt-mint dark:hover:bg-volt-cyan dark:text-slate-950 px-5 py-3 text-xs font-mono font-bold shadow-lg hover:shadow-volt-glow hover:-translate-y-0.5 active:translate-y-0 transition-all border border-emerald-500/40 dark:border-volt-mint group cursor-pointer"
              >
                <Zap className="h-4 w-4 text-white dark:text-slate-950 group-hover:scale-110 transition-transform" />
                <span>INITIATE_SCOPING_SPRINT</span>
                <ArrowRight className="h-3.5 w-3.5 text-white dark:text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Direct WhatsApp Channel */}
              <a
                href="https://wa.me/8801629944975"
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

              {/* Telegram SLA Channel */}
              <a
                href="https://t.me/+8801629944975"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 rounded-tech border border-border-tech bg-surface-card px-5 py-3 text-xs font-mono font-bold text-text-primary shadow-sm hover:border-volt-cyan hover:bg-surface hover:-translate-y-0.5 transition-all"
                title="Fast-Track on Telegram"
              >
                <Send className="h-4 w-4 text-volt-cyan" />
                <span>FAST-TRACK TELEGRAM [15M SLA]</span>
              </a>
            </div>
          </div>

          {/* Hero Right: Live Radar Telemetry Beacon */}
          <div className="lg:col-span-4">
            <div className="relative rounded-tech-md border border-border-tech bg-surface-card p-6 shadow-xl overflow-hidden backdrop-blur-xl group hover:border-emerald-500/40 dark:hover:border-volt-mint/40 transition-all duration-300">
              {/* Corner HUD Accents */}
              <div className="absolute top-2 left-2 font-mono text-[9px] text-text-muted/50 select-none">┌ [RADAR-01]</div>
              <div className="absolute top-2 right-2 font-mono text-[9px] text-text-muted/50 select-none">360° ┐</div>
              <div className="absolute bottom-2 left-2 font-mono text-[9px] text-text-muted/50 select-none">└ 180°</div>
              <div className="absolute bottom-2 right-2 font-mono text-[9px] text-text-muted/50 select-none">SLA_OK ┘</div>

              {/* Monospace Telemetry Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-tech pt-2">
                <div className="flex items-center space-x-2 font-mono text-[11px] text-text-muted uppercase">
                  <Radio className="h-3.5 w-3.5 text-emerald-500 dark:text-volt-mint animate-pulse" />
                  <span>TELEMETRY_RADAR</span>
                </div>
                <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold flex items-center space-x-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>REAL-TIME ACTIVE</span>
                </span>
              </div>

              {/* Circular Radar Scan Display */}
              <div className="relative mx-auto h-48 w-48 rounded-full border border-border-tech/80 flex items-center justify-center overflow-hidden bg-surface/80">
                {/* Concentric circles */}
                <div className="absolute h-36 w-36 rounded-full border border-border-tech/60"></div>
                <div className="absolute h-24 w-24 rounded-full border border-border-tech/40"></div>
                <div className="absolute h-12 w-12 rounded-full border border-border-tech/30"></div>
                {/* Grid Crosshairs */}
                <div className="absolute w-full h-[1px] bg-border-tech/60"></div>
                <div className="absolute h-full w-[1px] bg-border-tech/60"></div>

                {/* Rotating Radar Sweep Line */}
                <div 
                  className="absolute inset-0 origin-center pointer-events-none animate-radar"
                  style={{
                    background: "conic-gradient(from 0deg, transparent 0deg, transparent 300deg, rgba(0, 229, 153, 0.22) 360deg)",
                  }}
                ></div>

                {/* Live Random Blinking Multi-Color Radar Blips Canvas */}
                <canvas
                  ref={radarCanvasRef}
                  width={192}
                  height={192}
                  className="absolute inset-0 z-10 pointer-events-none"
                />

                {/* Center Core */}
                <div className="relative z-10 h-3 w-3 rounded-full bg-emerald-500 border-2 border-surface shadow-[0_0_6px_#10B981]"></div>
              </div>

              {/* Telemetry Micro-Readouts */}
              <div className="mt-5 space-y-2 pt-3 border-t border-border-tech font-mono text-[11px]">
                <div className="flex justify-between items-center text-text-secondary hover:text-text-primary transition-colors">
                  <span>DISPATCH_LATENCY:</span>
                  <span className="text-emerald-600 dark:text-volt-cyan font-bold bg-emerald-500/10 dark:bg-volt-cyan/10 px-1.5 py-0.5 rounded">11.4ms [NOMINAL]</span>
                </div>
                <div className="flex justify-between items-center text-text-secondary hover:text-text-primary transition-colors">
                  <span>CLUSTER_THROUGHPUT:</span>
                  <span className="text-text-primary font-bold bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">47,218 QPS</span>
                </div>
                <div className="flex justify-between items-center text-text-secondary hover:text-text-primary transition-colors">
                  <span>FAILOVER_SLA:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">&lt; 500ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Telemetry Metric Cards */}
        <div className="mt-12 grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
          <SpotlightCard className="p-4 hover:-translate-y-1 transition-all duration-300 hover:border-emerald-500/50">
            <div className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
              Active Squads
            </div>
            <div className="mt-1 font-display text-2xl font-bold text-text-primary">
              08 Units
            </div>
            <div className="mt-1 flex items-center space-x-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">
              <CheckCircle2 className="h-3 w-3" />
              <span>Zero Outsourcing</span>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-4 hover:-translate-y-1 transition-all duration-300 hover:border-volt-cyan/50">
            <div className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
              Peak Ingress Routing
            </div>
            <div className="mt-1 font-display text-2xl font-bold text-text-primary">
              47,000+
            </div>
            <div className="mt-1 flex items-center space-x-1 text-[11px] text-text-secondary font-mono">
              <Activity className="h-3 w-3 text-volt-cyan" />
              <span>QPS @ 6ms p99 Latency</span>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-4 hover:-translate-y-1 transition-all duration-300 hover:border-emerald-500/50">
            <div className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
              Failover Downtime
            </div>
            <div className="mt-1 font-display text-2xl font-bold text-text-primary">
              ~500ms
            </div>
            <div className="mt-1 flex items-center space-x-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">
              <span>10x Slashed via Sentinel</span>
            </div>
          </SpotlightCard>

          <SpotlightCard className="p-4 hover:-translate-y-1 transition-all duration-300 hover:border-volt-mint/50">
            <div className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
              Scoping Response
            </div>
            <div className="mt-1 font-display text-2xl font-bold text-text-primary">
              &lt;15 Min
            </div>
            <div className="mt-1 flex items-center space-x-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono font-medium">
              <Clock className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
              <span>Lead Architect On-Call</span>
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* Bento Grid: Public Squads Master Directory */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6" id="squads">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-border-tech">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs text-text-muted uppercase tracking-wider mb-1">
              <span>Section [02]</span>
              <span className="text-text-muted/40">//</span>
              <span className="text-text-primary font-semibold">Specialized Operational Squads</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
              Collective Engineering Squad Matrix
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-xs font-mono text-text-muted max-w-md">
            All capabilities deployed as sanitized collective units. Zero individual developer exposure.
          </p>
        </div>

        {/* Bento Grid with SpotlightCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {squads.map((squad, index) => {
            const Icon = squadIcons[squad.slug] || Zap;
            const isCommerce = squad.slug === "shopify";
            const isWordPress = squad.slug === "wordpress";
            const isPriority = isCommerce || isWordPress;

            return (
              <SpotlightCard
                key={squad.slug}
                className={`p-6 flex flex-col justify-between group ${
                  isCommerce ? "lg:col-span-2" : ""
                }`}
                spotlightColor={isCommerce ? "rgba(16, 185, 129, 0.15)" : "rgba(0, 240, 255, 0.12)"}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-text-muted">
                        [{String(index + 1).padStart(2, "0")}]
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                        SQUAD_{squad.slug.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      {squad.capacity_full ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          Waitlist Only
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          <span>Ready for Sprints</span>
                        </span>
                      )}
                      {isPriority && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30">
                          TOP PRIORITY
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Icon: Direct Link to Dedicated Squad Page */}
                  <Link 
                    href={`/squads/${squad.slug}`}
                    className="flex items-start space-x-3 mb-3 group/title"
                  >
                    <div className="p-2.5 rounded-tech bg-surface border border-border-tech text-text-primary group-hover/title:bg-emerald-50 group-hover/title:text-emerald-700 group-hover/title:border-emerald-300 dark:group-hover/title:bg-slate-900 dark:group-hover/title:text-volt-mint transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-text-primary group-hover/title:text-emerald-600 dark:group-hover/title:text-volt-cyan transition-colors flex items-center space-x-1.5">
                        <span>{squad.name}</span>
                        <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 group-hover/title:opacity-100 group-hover/title:translate-x-0 transition-all text-emerald-500" />
                      </h3>
                      <p className="text-xs font-mono text-text-muted mt-0.5">
                        {squad.hero_tagline}
                      </p>
                    </div>
                  </Link>

                  {/* Deliverables checklist */}
                  <div className="mt-4 pt-3 border-t border-border-tech">
                    <div className="font-mono text-[10px] uppercase text-text-muted mb-2">
                      Core Engineering Deliverables:
                    </div>
                    <ul className="space-y-1.5">
                      {squad.deliverables.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-xs text-text-secondary">
                          <Check className="h-3 w-3 text-emerald-500 dark:text-volt-mint shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions: Prominent Link to Dedicated Squad Page */}
                <div className="mt-6 pt-4 border-t border-border-tech flex items-center justify-between">
                  <Link
                    href={`/squads/${squad.slug}`}
                    className="flex items-center space-x-1.5 text-xs font-mono font-bold text-emerald-600 dark:text-volt-mint hover:underline transition-colors group-hover:translate-x-1 duration-200"
                    title={`Open dedicated ${squad.name} landing page`}
                  >
                    <span>EXPLORE {squad.slug.toUpperCase()} HUB</span>
                    <ArrowRight className="h-3.5 w-3.5 text-emerald-500 dark:text-volt-mint" />
                  </Link>

                  <button
                    onClick={() => openScopingModal(squad.slug)}
                    className="rounded-tech border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-600 hover:text-white px-3 py-1.5 text-xs font-mono font-bold text-emerald-700 dark:text-volt-mint shadow-sm transition-all cursor-pointer"
                  >
                    Scope Unit
                  </button>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </section>

      {/* Production Case Studies with Live Search, Squad Filter, and Click/Hover to Reveal Cards */}
      <section className="mx-auto max-w-7xl px-4 pt-24 sm:px-6" id="benchmarks">
        <div className="rounded-tech-md border border-border-tech bg-surface-card p-6 sm:p-10 shadow-sm">
          {/* Section Header with Both WhatsApp and Telegram Direct Verification */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-border-tech gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 font-mono text-xs text-text-muted uppercase tracking-wider mb-1">
                <Terminal className="h-3.5 w-3.5 text-volt-cyan" />
                <span>Internal Sandbox Case Studies</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-text-primary">
                Verified Architectural Deliverables
              </h2>
            </div>
            
            {/* Direct Verification Channels: WhatsApp AND Telegram */}
            <div className="flex items-center space-x-2 flex-wrap gap-y-2">
              <a
                href="https://wa.me/8801629944975"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 rounded-tech border-2 border-emerald-500 bg-white hover:bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-500/60 px-3.5 py-2 text-xs font-mono font-bold shadow-sm transition-all"
                title="Verify Architecture on WhatsApp (+880 1629-944975)"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>WhatsApp: +880 1629-944975</span>
              </a>

              <a
                href="https://t.me/+8801629944975"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 rounded-tech bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-volt-mint dark:hover:bg-volt-cyan dark:text-slate-950 px-3.5 py-2 text-xs font-mono font-semibold shadow-sm transition-all"
              >
                <Send className="h-3.5 w-3.5 text-white dark:text-slate-950" />
                <span>Verify on Telegram</span>
              </a>
            </div>
          </div>

          {/* Interactive Filter & Search Controls */}
          <div className="mt-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Squad Filter Tabs - Compact, space-efficient, slick hover switching */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth pb-1 md:flex-wrap md:pb-0 max-w-full">
              {/* All Architecture Tab */}
              <button
                onClick={() => {
                  if (selectedSquadFilter === "all" && isGridRevealed) {
                    setIsGridRevealed(false);
                  } else {
                    setSelectedSquadFilter("all");
                    setIsGridRevealed(true);
                  }
                }}
                onMouseEnter={() => {
                  if (selectedSquadFilter !== "all" || !isGridRevealed) {
                    setSelectedSquadFilter("all");
                    setIsGridRevealed(true);
                  }
                }}
                className={`shrink-0 rounded-tech px-3 py-1.5 text-xs font-mono transition-all flex items-center space-x-1.5 cursor-pointer ${
                  selectedSquadFilter === "all" && isGridRevealed
                    ? "bg-emerald-600 text-white font-bold shadow-sm dark:bg-volt-cyan dark:text-slate-950 ring-2 ring-emerald-400/50 dark:ring-volt-cyan/50"
                    : "bg-surface border border-border-tech text-text-secondary hover:text-emerald-700 dark:hover:text-emerald-300 hover:border-emerald-500 hover:bg-emerald-50/50 shadow-sm"
                }`}
                title={isGridRevealed && selectedSquadFilter === "all" ? "Click to fold / collapse case studies" : "Hover or click to unfold all architectural case studies"}
              >
                <span className="font-semibold">All</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                    selectedSquadFilter === "all" && isGridRevealed
                      ? "bg-emerald-700 text-white dark:bg-slate-900 dark:text-volt-cyan font-bold"
                      : "bg-slate-100 dark:bg-slate-800 text-text-muted"
                  }`}
                >
                  {allCaseStudies.length}
                </span>
                {selectedSquadFilter === "all" && isGridRevealed ? (
                  <ChevronUp className="h-3 w-3 opacity-80" />
                ) : (
                  <ChevronDown className="h-2.5 w-2.5 opacity-40" />
                )}
              </button>

              {/* All Individual Squad Tabs */}
              {squads.map((s) => {
                const count = allCaseStudies.filter((c) => c.squad_slug === s.slug).length;
                const isActive = selectedSquadFilter === s.slug && isGridRevealed;

                return (
                  <button
                    key={s.slug}
                    onClick={() => {
                      if (isActive) {
                        setIsGridRevealed(false);
                      } else {
                        setSelectedSquadFilter(s.slug);
                        setIsGridRevealed(true);
                      }
                    }}
                    onMouseEnter={() => {
                      if (!isActive) {
                        setSelectedSquadFilter(s.slug);
                        setIsGridRevealed(true);
                      }
                    }}
                    className={`shrink-0 rounded-tech px-2.5 py-1.5 text-xs font-mono transition-all flex items-center space-x-1.5 cursor-pointer ${
                      isActive
                        ? "bg-emerald-600 text-white font-bold shadow-sm dark:bg-volt-cyan dark:text-slate-950 ring-2 ring-emerald-400/50 dark:ring-volt-cyan/50"
                        : "bg-surface border border-border-tech text-text-secondary hover:text-emerald-700 dark:hover:text-emerald-300 hover:border-emerald-500 hover:bg-emerald-50/50 shadow-sm"
                    }`}
                    title={
                      isActive
                        ? `Click to fold / collapse ${s.name}`
                        : `Hover or click to unfold ${s.name} (${count} cases)`
                    }
                  >
                    <span>{s.slug}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                        isActive
                          ? "bg-emerald-700 text-white dark:bg-slate-900 dark:text-volt-cyan font-bold"
                          : "bg-slate-100 dark:bg-slate-800 text-text-muted"
                      }`}
                    >
                      {count}
                    </span>
                    {isActive ? (
                      <ChevronUp className="h-3 w-3 opacity-80" />
                    ) : (
                      <ChevronDown className="h-2.5 w-2.5 opacity-40" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Real-time Search Input */}
            <div className="relative min-w-[220px] shrink-0">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim().length > 0) {
                    setIsGridRevealed(true);
                  }
                }}
                placeholder="Search stack (e.g. Redis)..."
                className="w-full rounded-tech border border-border-tech bg-surface pl-9 pr-3 py-1.5 text-xs font-mono text-text-primary placeholder:text-text-muted/60 focus:border-emerald-500 dark:focus:border-volt-cyan focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:focus:ring-volt-cyan transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2 text-[10px] font-mono text-text-muted hover:text-text-primary"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          {/* Filter Match Count & Interactive State Controls */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-text-muted">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-text-primary">
                {isGridRevealed
                  ? `Showing ${filteredCaseStudies.length} sandboxes for [${selectedSquadFilter.toUpperCase()}]`
                  : `28 Architectural Deliverables Folded`}
              </span>
              <span className="text-text-muted/40">//</span>
              <span className="text-emerald-600 dark:text-volt-cyan font-medium">
                {isGridRevealed
                  ? "Active • Click active tab or 'Fold Grid' to collapse"
                  : "Hover or click any squad tab above to unfold"}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {isGridRevealed && selectedSquadFilter !== "all" && (
                <Link
                  href={`/squads/${selectedSquadFilter}`}
                  className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-emerald-600 dark:text-volt-mint hover:underline bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30 shadow-sm transition-all"
                >
                  <span>OPEN {selectedSquadFilter.toUpperCase()} SQUAD HUB</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              )}

              {isGridRevealed && (
                <button
                  onClick={() => setIsGridRevealed(false)}
                  className="flex items-center space-x-1.5 text-xs font-mono font-semibold text-text-muted hover:text-emerald-600 dark:hover:text-volt-cyan transition-all bg-surface hover:bg-emerald-500/10 px-2.5 py-1 rounded border border-border-tech hover:border-emerald-500/30 cursor-pointer shadow-sm"
                  title="Click to collapse sandboxes view"
                >
                  <ChevronUp className="h-3.5 w-3.5" />
                  <span>Fold / Collapse Grid</span>
                </button>
              )}
            </div>
          </div>

          {/* Collapsed Initial Teaser State */}
          {!isGridRevealed ? (
            <div 
              onClick={() => {
                setSelectedSquadFilter("all");
                setIsGridRevealed(true);
              }}
              className="mt-6 cursor-pointer rounded-tech-md border-2 border-dashed border-emerald-400/40 bg-gradient-to-br from-emerald-50/20 to-slate-50/40 dark:from-emerald-950/10 dark:to-transparent p-8 text-center transition-all hover:border-emerald-500 hover:bg-emerald-50/40 group"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-tech bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                <Terminal className="h-6 w-6 text-emerald-600 dark:text-volt-cyan" />
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono text-[11px] mb-2 font-semibold">
                <span>⚡ 28 PRODUCTION BENCHMARKS AVAILABLE</span>
              </div>
              <h3 className="font-display text-base sm:text-lg font-bold text-text-primary">
                Hover or click any <span className="text-emerald-600 dark:text-volt-cyan underline decoration-emerald-400 underline-offset-4 font-mono">Squad tab</span> above to unfold
              </h3>
              <p className="mt-1 max-w-lg mx-auto text-xs text-text-secondary leading-relaxed font-sans">
                Browse 28 sanitized production architectures with sub-second failovers, zero layout shifts, and 47k+ QPS benchmarks across all 8 specialized engineering units.
              </p>
              <div className="mt-4 inline-flex items-center space-x-2 rounded-tech bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-xs font-mono font-bold shadow-md transition-all">
                <Eye className="h-3.5 w-3.5" />
                <span>CLICK TO UNFOLD ARCHITECTURAL BENCHMARKS</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </div>
            </div>
          ) : (
            /* Case Studies Grid - Displayed when unfolded */
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start animate-in fade-in slide-in-from-top-3 duration-300">
              {filteredCaseStudies.map((cs) => {
                const isCopied = copiedCodename === cs.codename;
                return (
                  <SpotlightCard
                    key={cs.codename}
                    className="p-5 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-emerald-500 dark:hover:border-volt-cyan hover:shadow-xl"
                    onClick={() => handleInspectByCodename(cs.codename)}
                    spotlightColor="rgba(0, 240, 255, 0.12)"
                  >
                    <div>
                      {/* Top Row: Squad Tag & Codename Copy Badge */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
                          {cs.squad_slug}
                        </span>
                        {/* Interactive Copy-to-Clipboard Codename Badge */}
                        <button
                          onClick={(e) => handleCopyCodename(e, cs.codename)}
                          className="inline-flex items-center space-x-1 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-500/20 transition-all"
                          title="Click to copy codename"
                        >
                          <span>{cs.codename}</span>
                          {isCopied ? (
                            <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <Copy className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                          )}
                        </button>
                      </div>

                      {/* Case Study Title */}
                      <div className="font-display text-base font-bold text-text-primary group-hover:text-emerald-600 dark:group-hover:text-volt-cyan transition-colors">
                        {cs.title}
                      </div>

                      {/* Unhovered Collapsed Teaser Hint */}
                      <div className="flex items-center space-x-1 font-mono text-[10px] text-text-muted group-hover:hidden transition-all mt-2.5">
                        <ChevronRight className="h-3 w-3 text-emerald-600 dark:text-volt-cyan animate-pulse" />
                        <span>Hover card for engineering challenge & metrics...</span>
                      </div>

                      {/* Deep data reveals smoothly when client hovers over the card */}
                      <div className="max-h-0 opacity-0 overflow-hidden group-hover:max-h-96 group-hover:opacity-100 transition-all duration-300 ease-out">
                        {/* Engineering Challenge Paragraph */}
                        <p className="mt-3 text-xs text-text-secondary leading-relaxed border-t border-border-tech/60 pt-2 font-sans">
                          <span className="font-mono text-[10px] text-text-muted uppercase block font-semibold mb-0.5">
                            Engineering Challenge:
                          </span>
                          {cs.challenge}
                        </p>

                        {/* Verified Production Metric Badge */}
                        <div className="mt-3 rounded bg-emerald-500/10 border border-emerald-500/20 p-2 text-[11px] font-mono font-medium text-emerald-700 dark:text-emerald-300">
                          <span className="text-[10px] uppercase tracking-wider block font-bold text-emerald-800 dark:text-emerald-400 mb-0.5">
                            Verified Metric:
                          </span>
                          {cs.metrics}
                        </div>

                        {/* Stack Directives Pills */}
                        <div className="mt-2.5 flex flex-wrap gap-1">
                          {cs.tech_stack.slice(0, 3).map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="rounded bg-surface px-1.5 py-0.5 text-[9px] font-mono text-text-muted border border-border-tech"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Bottom CTA Link */}
                    <div className="mt-4 pt-3 border-t border-border-tech flex items-center justify-between text-xs font-mono font-semibold text-text-primary group-hover:text-emerald-600 dark:group-hover:text-volt-cyan transition-colors">
                      <div className="flex items-center space-x-1.5">
                        <Terminal className="h-3 w-3 text-emerald-600 dark:text-volt-cyan" />
                        <span>Inspect Architecture</span>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 text-emerald-600 dark:text-volt-cyan group-hover:translate-x-1 transition-transform" />
                    </div>
                  </SpotlightCard>
                );
              })}

              {/* Bottom Collapse View Button for quick navigation */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3 mt-4 flex items-center justify-center">
                <button
                  onClick={() => {
                    setIsGridRevealed(false);
                    const el = document.getElementById("benchmarks");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="flex items-center space-x-2 rounded-tech bg-surface border border-border-tech hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-slate-900 px-4 py-2 text-xs font-mono font-semibold text-text-secondary hover:text-emerald-600 dark:hover:text-volt-cyan shadow-sm transition-all cursor-pointer"
                >
                  <ChevronUp className="h-4 w-4" />
                  <span>Collapse & Fold Benchmarks Grid</span>
                </button>
              </div>
            </div>
          )}

          {isGridRevealed && filteredCaseStudies.length === 0 && (
            <div className="text-center py-12 border border-dashed border-border-tech rounded-tech my-6 font-mono text-xs text-text-muted">
              No architectural case studies matched &ldquo;{searchQuery}&rdquo; under squad &ldquo;{selectedSquadFilter}&rdquo;.
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSquadFilter("all");
                }}
                className="block mx-auto mt-2 text-emerald-600 dark:text-volt-cyan underline font-sans"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Terminal Scoping Banner: Radiant Studio Card in Light Mode, Zero Black Box, Prominent WhatsApp + Telegram! */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6" id="architecture">
        <div className="relative rounded-tech-md border-2 border-emerald-300/70 bg-gradient-to-br from-white via-emerald-50/50 to-slate-50 dark:bg-slate-950 dark:border-border-tech dark:from-transparent dark:to-transparent p-8 sm:p-12 text-slate-900 dark:text-white shadow-xl overflow-hidden transition-all duration-200">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 h-48 w-48 rounded-full bg-emerald-400/20 dark:bg-volt-mint/10 blur-3xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-2 font-mono text-xs text-emerald-700 dark:text-volt-mint mb-2 font-semibold">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-volt-mint animate-pulse"></span>
                <span>VOLTX DISPATCH MATRIX // READY FOR SCOPE INGESTION</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Reserve an Engineering Sprint with Guaranteed SLA
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                Whether you require a headless Shopify rebuild, an autonomous SRE alert agent, or a 50k QPS ingress tuning audit, our technical architects review scopes within 15 minutes.
              </p>

              <div className="mt-6 flex items-center space-x-4 font-mono text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Zero Public Human Exposure</span>
                </div>
                <div>•</div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="h-4 w-4 text-emerald-600 dark:text-volt-cyan" />
                  <span>15-Minute Turnaround</span>
                </div>
              </div>
            </div>

            {/* Direct Action CTAs: Console + WhatsApp + Telegram */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                onClick={() => openScopingModal("shopify")}
                className="flex items-center justify-center space-x-2 rounded-tech bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 px-6 py-3 text-xs font-mono font-bold shadow-md transition-all"
              >
                <Zap className="h-4 w-4 text-white dark:text-emerald-600" />
                <span>OPEN SCOPING CONSOLE</span>
              </button>

              {/* Direct WhatsApp Channel Button */}
              <a
                href="https://wa.me/8801629944975"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 rounded-tech border-2 border-emerald-600 bg-white text-emerald-800 hover:bg-emerald-50 dark:border-emerald-500/60 dark:bg-slate-900 dark:text-emerald-400 px-6 py-3 text-xs font-mono font-bold transition-all shadow-sm"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>WHATSAPP (+880 1629-944975)</span>
              </a>

              {/* Telegram Channel Button */}
              <a
                href="https://t.me/+8801629944975"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 rounded-tech border-2 border-slate-700 bg-slate-900 text-white hover:bg-slate-800 dark:border-volt-mint dark:bg-slate-800/80 dark:text-volt-mint dark:hover:bg-slate-800 px-6 py-3 text-xs font-mono font-bold transition-all shadow-sm"
              >
                <Send className="h-4 w-4 text-volt-cyan" />
                <span>TELEGRAM DIRECT DISPATCH</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
