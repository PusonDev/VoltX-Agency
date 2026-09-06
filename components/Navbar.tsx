"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Zap, 
  Terminal, 
  ChevronDown, 
  Send, 
  MessageCircle,
  Layers, 
  Cpu, 
  BarChart3, 
  Server, 
  Gamepad2, 
  Globe, 
  Sparkles,
  Menu,
  X,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface NavbarProps {
  onOpenLeadModal: (squadSlug?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLeadModal }) => {
  const [squadsMenuOpen, setSquadsMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const squads = [
    { name: "VoltX Commerce Lab", slug: "shopify", icon: Zap, priority: "Top Priority" },
    { name: "Enterprise WordPress", slug: "wordpress", icon: Globe, priority: "Top Priority" },
    { name: "Intelligent Automation & AI-Ops", slug: "automation", icon: Cpu, priority: "SRE Agents" },
    { name: "Attribution & Growth", slug: "growth-analytics", icon: BarChart3, priority: "548% ROAS" },
    { name: "Cloud & Infrastructure", slug: "devops", icon: Server, priority: "47k QPS" },
    { name: "Interactive & 3D Systems", slug: "game-dev", icon: Gamepad2, priority: "UE5 / VR" },
    { name: "Web Systems & Apps", slug: "web-systems", icon: Layers, priority: "Full-Stack" },
    { name: "Creative & Motion Studio", slug: "creative", icon: Sparkles, priority: "Controlled" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-tech bg-canvas/85 backdrop-blur-md transition-colors duration-200">
      {/* Top Precision Status Bar */}
      <div className="border-b border-border-tech/60 bg-surface/80 px-4 py-1 text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between font-mono">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt-mint opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-volt-mint"></span>
            </span>
            <span className="text-[11px] font-medium tracking-tight text-text-primary">
              SYSTEM_STATUS: <span className="text-emerald-500 font-semibold">NOMINAL</span>
            </span>
            <span className="text-text-muted/40">//</span>
            <span className="hidden sm:inline text-[11px] text-text-secondary">
              ALL 8 SPECIALIZED SQUADS DEPLOYABLE
            </span>
          </div>
          
          <div className="flex items-center space-x-3 text-[11px] text-text-secondary">
            <a 
              href="https://wa.me/8801629944975"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 hover:underline transition-colors font-mono font-medium"
            >
              <MessageCircle className="h-3 w-3 text-emerald-500" />
              <span>WHATSAPP: +880 1629-944975</span>
            </a>
            <span className="text-text-muted/40 hidden md:inline">//</span>
            <a 
              href="https://t.me/+8801629944975"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center space-x-1 text-text-primary hover:text-volt-cyan transition-colors"
            >
              <Send className="h-3 w-3 text-volt-cyan" />
              <span>TG SLA: 15-MIN</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Studio Navigation Bar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Official Brand Logo & Badge */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-tech overflow-hidden border border-border-tech bg-surface-card shadow-sm transition-all duration-300 group-hover:border-emerald-500 dark:group-hover:border-volt-mint group-hover:scale-105">
              <img
                src="/logo.png"
                alt="VoltX Agency Official Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-display text-lg font-bold tracking-tight text-text-primary">VOLTX</span>
                <span className="text-volt-cyan font-mono font-light text-sm">/</span>
                <span className="font-mono text-xs font-medium text-text-secondary tracking-wide">AGENCY</span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted -mt-1">
                Precision Engineering Hub
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center space-x-1 pl-4">
            {/* Squads Dropdown Trigger */}
            <div 
              className="relative"
              onMouseEnter={() => setSquadsMenuOpen(true)}
              onMouseLeave={() => setSquadsMenuOpen(false)}
            >
              <button 
                className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-text-primary rounded-tech hover:bg-surface-card transition-colors"
              >
                <span>Engineering Squads</span>
                <ChevronDown className="h-3.5 w-3.5 text-text-muted" />
              </button>

              {/* Squads Megamenu Dropdown */}
              {squadsMenuOpen && (
                <div className="absolute left-0 top-full mt-1 w-80 rounded-tech-md border border-border-tech bg-surface-card p-2 shadow-2xl animate-in fade-in-50 zoom-in-95 duration-100 backdrop-blur-xl">
                  <div className="px-2 py-1 mb-1 border-b border-border-tech font-mono text-[10px] text-text-muted uppercase tracking-wider flex justify-between items-center">
                    <span>Specialized Operational Units</span>
                    <span className="text-emerald-600 dark:text-volt-cyan font-bold">8 ACTIVE</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {squads.map((squad) => {
                      const Icon = squad.icon;
                      return (
                        <Link
                          key={squad.slug}
                          href={`/squads/${squad.slug}`}
                          onClick={() => setSquadsMenuOpen(false)}
                          className="flex items-center justify-between rounded-tech p-2 hover:bg-surface transition-colors group"
                        >
                          <div className="flex items-center space-x-2.5">
                            <Icon className="h-4 w-4 text-text-muted group-hover:text-emerald-600 dark:group-hover:text-volt-cyan transition-colors" />
                            <span className="text-xs font-medium text-text-primary group-hover:text-emerald-600 dark:group-hover:text-volt-cyan">
                              {squad.name}
                            </span>
                          </div>
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-surface border border-border-tech text-text-secondary group-hover:border-emerald-500/40 group-hover:text-emerald-600 dark:group-hover:text-volt-mint">
                            {squad.priority}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <Link 
              href="/#benchmarks"
              className="px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-text-primary rounded-tech hover:bg-surface-card transition-colors"
            >
              Production Benchmarks
            </Link>

            <Link 
              href="/#architecture"
              className="px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-text-primary rounded-tech hover:bg-surface-card transition-colors"
            >
              System Specs
            </Link>

            <Link 
              href="/admin"
              className="flex items-center space-x-1 px-3 py-1.5 font-mono text-[11px] text-text-muted hover:text-emerald-600 dark:hover:text-volt-cyan rounded-tech hover:bg-surface-card transition-colors"
            >
              <Terminal className="h-3 w-3" />
              <span>[COMMAND]</span>
            </Link>
          </nav>
        </div>

        {/* Action CTAs & Theme Toggle */}
        <div className="flex items-center space-x-2">
          {/* Dual Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark / Light Theme"
            className="flex h-9 w-9 items-center justify-center rounded-tech border border-border-tech bg-surface-card text-text-secondary hover:text-text-primary hover:border-emerald-500 dark:hover:border-volt-cyan transition-all hover:scale-105 active:scale-95 shadow-sm"
            title={`Switch to ${mounted && theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {mounted && theme === "dark" ? (
              <Sun className="h-4 w-4 text-volt-gold transition-transform rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 text-emerald-600 transition-transform -rotate-12 hover:rotate-0" />
            )}
          </button>

          {/* WhatsApp Direct Line - Highly Visible! */}
          <a
            href="https://wa.me/8801629944975"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-1.5 rounded-tech border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all shadow-sm"
            title="Chat on WhatsApp (+880 1629-944975)"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          {/* Telegram Quick-Action */}
          <a
            href="https://t.me/+8801629944975"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-1.5 rounded-tech border border-border-tech bg-surface px-3 py-1.5 text-xs font-mono font-medium text-text-primary hover:border-volt-cyan hover:bg-surface-card transition-all"
            title="Telegram SLA 15m"
          >
            <Send className="h-3.5 w-3.5 text-volt-cyan" />
            <span>Telegram</span>
          </a>

          {/* Primary Lead Scoping CTA with Micro-glow */}
          <button
            onClick={() => onOpenLeadModal()}
            className="relative flex items-center space-x-2 rounded-tech bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-volt-mint dark:hover:bg-volt-cyan dark:text-slate-950 px-4 py-2 text-xs font-semibold shadow-sm transition-all border border-emerald-500/40 dark:border-volt-mint group"
          >
            <Zap className="h-3.5 w-3.5 text-volt-mint dark:text-slate-950 transition-transform group-hover:scale-110" />
            <span>Initiate Scoping</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-text-primary hover:bg-surface-card rounded-tech"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border-tech bg-surface-card p-4 animate-in slide-in-from-top-2">
          <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-2 flex justify-between items-center">
            <span>Engineering Squads</span>
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-1 text-xs text-emerald-600 dark:text-volt-cyan"
            >
              {theme === "dark" ? <Sun className="h-3 w-3 text-volt-gold" /> : <Moon className="h-3 w-3 text-emerald-600" />}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
          <div className="grid grid-cols-1 gap-1 mb-4">
            {squads.map((squad) => (
              <Link
                key={squad.slug}
                href={`/squads/${squad.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2 rounded-tech text-xs text-text-primary hover:bg-surface"
              >
                <span>{squad.name}</span>
                <span className="font-mono text-[10px] text-text-muted">{squad.slug}</span>
              </Link>
            ))}
          </div>
          <div className="pt-2 border-t border-border-tech flex flex-col gap-2">
            <a
              href="https://wa.me/8801629944975"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-tech text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold"
            >
              <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
              <span>WhatsApp Direct (+880 1629-944975)</span>
            </a>
            <a
              href="https://t.me/+8801629944975"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 p-2 bg-surface rounded-tech text-xs font-mono text-text-primary border border-border-tech"
            >
              <Send className="h-3.5 w-3.5 text-volt-cyan" />
              <span>Telegram Channel</span>
            </a>
            <Link 
              href="/admin" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-xs font-mono text-text-muted hover:text-text-primary"
            >
              [ADMIN COMMAND CENTER]
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
