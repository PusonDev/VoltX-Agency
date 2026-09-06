import React from "react";
import Link from "next/link";
import { Send, MessageCircle, ShieldCheck, Terminal, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border-tech bg-surface py-12 px-4 sm:px-6 transition-colors duration-200">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Architecture */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-tech overflow-hidden border border-border-tech bg-surface-card shadow-sm">
                <img
                  src="/logo.png"
                  alt="VoltX Agency Official Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-text-primary tracking-tight">VoltX Agency</span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted -mt-0.5">Precision Lab</span>
              </div>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Bespoke, high-performance engineering hub & technical consultancy. Architecting headless commerce, autonomous AI-Ops, and high-concurrency cloud infrastructure.
            </p>
            <div className="flex items-center space-x-2 pt-1">
              <span className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-surface-card text-[10px] font-mono text-text-primary border border-border-tech">
                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                <span>ZERO_OUTBOUND_LEAK_POLICY</span>
              </span>
            </div>
          </div>

          {/* Col 2: Commerce & Web Squads */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs font-semibold text-text-primary uppercase tracking-wider">
              Commerce & Web
            </h4>
            <ul className="space-y-1.5 text-xs text-text-secondary">
              <li>
                <Link href="/squads/shopify" className="hover:text-text-primary transition-colors flex items-center justify-between">
                  <span>[01] VoltX Commerce Lab</span>
                  <ArrowUpRight className="h-3 w-3 text-text-muted" />
                </Link>
              </li>
              <li>
                <Link href="/squads/wordpress" className="hover:text-text-primary transition-colors flex items-center justify-between">
                  <span>[02] Enterprise WordPress</span>
                  <ArrowUpRight className="h-3 w-3 text-text-muted" />
                </Link>
              </li>
              <li>
                <Link href="/squads/web-systems" className="hover:text-text-primary transition-colors flex items-center justify-between">
                  <span>[07] Scalable Web Systems</span>
                  <ArrowUpRight className="h-3 w-3 text-text-muted" />
                </Link>
              </li>
              <li>
                <Link href="/squads/creative" className="hover:text-text-primary transition-colors flex items-center justify-between">
                  <span>[08] Creative & Motion</span>
                  <ArrowUpRight className="h-3 w-3 text-text-muted" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Systems, Cloud & Intelligence */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs font-semibold text-text-primary uppercase tracking-wider">
              Systems & Intelligence
            </h4>
            <ul className="space-y-1.5 text-xs text-text-secondary">
              <li>
                <Link href="/squads/automation" className="hover:text-text-primary transition-colors flex items-center justify-between">
                  <span>[03] AI-Ops & Automation</span>
                  <ArrowUpRight className="h-3 w-3 text-text-muted" />
                </Link>
              </li>
              <li>
                <Link href="/squads/growth-analytics" className="hover:text-text-primary transition-colors flex items-center justify-between">
                  <span>[04] Attribution & Growth</span>
                  <ArrowUpRight className="h-3 w-3 text-text-muted" />
                </Link>
              </li>
              <li>
                <Link href="/squads/devops" className="hover:text-text-primary transition-colors flex items-center justify-between">
                  <span>[05] Cloud & DevOps</span>
                  <ArrowUpRight className="h-3 w-3 text-text-muted" />
                </Link>
              </li>
              <li>
                <Link href="/squads/game-dev" className="hover:text-text-primary transition-colors flex items-center justify-between">
                  <span>[06] Interactive & 3D (UE5)</span>
                  <ArrowUpRight className="h-3 w-3 text-text-muted" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Rapid Direct Dispatch */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-semibold text-text-primary uppercase tracking-wider">
              Direct Technical Lines
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              Bypass sales gatekeepers. Direct channel to lead technical architect with a guaranteed 15-minute response SLA.
            </p>
            <div className="flex flex-col space-y-2">
              <a
                href="https://t.me/+8801629944975"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 rounded-tech border border-border-tech bg-surface-card px-3 py-2 text-xs font-mono font-medium text-text-primary hover:border-volt-cyan hover:bg-surface transition-all"
              >
                <Send className="h-3.5 w-3.5 text-volt-cyan" />
                <span>Telegram: +880 1629-944975</span>
              </a>
              <a
                href="https://wa.me/8801629944975"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 rounded-tech border border-border-tech bg-surface-card px-3 py-2 text-xs font-mono font-medium text-text-primary hover:border-emerald-500 hover:bg-surface transition-all"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-500" />
                <span>WhatsApp: +880 1629-944975</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Telemetry & Strict Privacy Statement */}
        <div className="border-t border-border-tech pt-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-text-muted">
          <div className="flex items-center space-x-4 flex-wrap">
            <span>© {new Date().getFullYear()} VoltX Agency. All Rights Reserved.</span>
            <span className="text-border-tech">|</span>
            <span className="text-text-primary font-medium">STRICT PRIVACY GOVERNANCE</span>
            <span className="text-border-tech">|</span>
            <span className="text-emerald-500">ZERO OUTBOUND EXPOSURE</span>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/admin" className="hover:text-text-primary transition-colors flex items-center space-x-1">
              <Terminal className="h-3 w-3" />
              <span>COMMAND_CENTER</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
