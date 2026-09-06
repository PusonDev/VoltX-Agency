"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Terminal, Key, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Brute-force lockout: block after 5 failed attempts for 60 seconds
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const remainSec = Math.ceil((lockoutUntil - Date.now()) / 1000);
      setError(`Security lockout active. Try again in ${remainSec}s.`);
      return;
    }
    if (lockoutUntil && Date.now() >= lockoutUntil) {
      setLockoutUntil(null);
      setFailedAttempts(0);
    }

    setIsLoading(true);
    setError(null);

    // Verify against single master passkey only
    const validPin = process.env.NEXT_PUBLIC_ADMIN_PIN || "voltx2026!secret";

    if (pin === validPin) {
      try {
        localStorage.setItem("voltx_admin_auth", "authenticated_" + Date.now());
        const isSecure = typeof window !== "undefined" && window.location.protocol === "https:";
        document.cookie = `voltx_admin_token=valid_session; path=/; max-age=86400; SameSite=Lax${isSecure ? "; Secure" : ""}`;
      } catch (err) {}
      setFailedAttempts(0);
      router.push("/admin");
    } else {
      const newCount = failedAttempts + 1;
      setFailedAttempts(newCount);
      if (newCount >= 5) {
        const lockTime = Date.now() + 60_000;
        setLockoutUntil(lockTime);
        setError(`Too many failed attempts (${newCount}). Locked for 60 seconds.`);
      } else {
        setError(`Access Denied. ${5 - newCount} attempt(s) remaining before lockout.`);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-tech-grid px-4 py-12">
      <div className="w-full max-w-md rounded-tech-md border border-slate-800 bg-slate-900 p-8 text-white shadow-2xl">
        {/* Official Logo Banner */}
        <div className="flex items-center space-x-3 mb-5">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-tech overflow-hidden border border-volt-mint/40 bg-black shadow-volt-glow">
            <img
              src="/logo.png"
              alt="VoltX Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center space-x-1 font-mono text-[11px] text-volt-mint">
              <span className="flex h-1.5 w-1.5 rounded-full bg-volt-mint animate-pulse"></span>
              <span>RESTRICTED // LEVEL-3 ACCESS</span>
            </div>
            <h2 className="font-display text-lg font-bold text-white tracking-tight">
              VoltX Command Deck
            </h2>
          </div>
        </div>

        <h1 className="font-display text-xl font-bold tracking-tight text-white">
          Owner Authentication Portal
        </h1>
        <p className="mt-1 text-xs font-mono text-slate-400">
          Authenticate with master agency passkey to access the private developer vault, squad kill-switches, and lead triage pipelines.
        </p>

        {error && (
          <div className="mt-4 flex items-center space-x-2 rounded-tech border border-red-500/40 bg-red-950/50 p-3 text-xs text-red-200">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 uppercase mb-1.5">
              Agency Master Passkey
            </label>
            <div className="relative">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter master passkey..."
                className="w-full rounded-tech border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-volt-mint focus:outline-none focus:ring-1 focus:ring-volt-mint font-mono"
                required
              />
              <Key className="absolute right-3 top-2.5 h-4 w-4 text-slate-500" />
            </div>
            <p className="mt-1 text-[11px] font-mono text-slate-500">
              Contact agency owner for cryptographic passkey.
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center space-x-2 rounded-tech bg-volt-mint py-2.5 text-xs font-mono font-bold text-slate-heavy shadow hover:bg-volt-cyan transition-all disabled:opacity-50"
          >
            <span>AUTHENTICATE TERMINAL SESSION</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <div className="flex items-center space-x-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>RLS Protected Vault</span>
          </div>
          <span>SESSION_TIMEOUT: 24H</span>
        </div>
      </div>
    </div>
  );
}
