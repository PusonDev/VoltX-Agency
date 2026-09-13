"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Terminal, 
  ShieldCheck, 
  Users, 
  Layers, 
  Send, 
  ToggleLeft, 
  ToggleRight, 
  Plus, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight,
  LogOut,
  RefreshCw,
  Copy,
  Check,
  Trash2
} from "lucide-react";
import { voltxStore } from "@/lib/store";
import { 
  Squad, 
  CaseStudy, 
  InternalDevVaultMember, 
  ClientLead, 
  VaultTier, 
  VaultStatus, 
  LeadStatus,
  SquadSlug 
} from "@/lib/types";
import { generateTelegramForwardUrl } from "@/lib/utils";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"kill-switch" | "vault" | "leads">("kill-switch");

  // Local state initialized from store
  const [squads, setSquads] = useState<Squad[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [vaultMembers, setVaultMembers] = useState<InternalDevVaultMember[]>([]);
  const [leads, setLeads] = useState<ClientLead[]>([]);
  const [copiedLeadId, setCopiedLeadId] = useState<string | null>(null);

  // Add Developer Modal state
  const [showAddDevModal, setShowAddDevModal] = useState(false);
  const [newDevName, setNewDevName] = useState("");
  const [newDevContact, setNewDevContact] = useState("");
  const [newDevTelegram, setNewDevTelegram] = useState("");
  const [newDevStack, setNewDevStack] = useState("");
  const [newDevTier, setNewDevTier] = useState<VaultTier>("Active Core");
  const [newDevStatus, setNewDevStatus] = useState<VaultStatus>("Available for Allocation");
  const [newDevNotes, setNewDevNotes] = useState("");
  const [newDevSquads, setNewDevSquads] = useState<SquadSlug[]>(["shopify"]);

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem("voltx_admin_auth");
    if (!auth) {
      router.push("/admin/login");
      return;
    }
    setIsAuthenticated(true);
    refreshData();
  }, [router]);

  // API Mutation Dispatcher
  const dispatchMutation = async (
    target: "squad" | "case_study" | "vault" | "lead",
    id: string,
    updates?: Record<string, any>,
    action?: "update" | "delete"
  ) => {
    try {
      await fetch("/api/admin/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target, id, updates, action: action || "update" }),
      });
    } catch (err) {
      console.warn("Failed to dispatch mutation to /api/admin/toggle:", err);
    }
  };

  const refreshData = async () => {
    setSquads(voltxStore.getSquads(true));
    setCaseStudies(voltxStore.getCaseStudies(undefined, true));
    setVaultMembers(voltxStore.getVaultMembers());
    
    // Load local leads
    const currentLeads = voltxStore.getLeads();
    setLeads([...currentLeads]);

    // Fetch and merge leads from server API / Firebase Firestore
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const json = await res.json();
        if (json?.leads && Array.isArray(json.leads)) {
          const existingIds = new Set(currentLeads.map((l) => l.id));
          const newLeads = json.leads.filter((l: ClientLead) => !existingIds.has(l.id));
          if (newLeads.length > 0) {
            newLeads.forEach((nl: ClientLead) => voltxStore.addLead(nl));
            setLeads(voltxStore.getLeads());
          }
        }
      }
    } catch (e) {
      // Local development fallback
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("voltx_admin_auth");
    document.cookie = "voltx_admin_token=; path=/; max-age=0";
    router.push("/admin/login");
  };

  // Squad Kill-Switch Handlers
  const handleToggleSquadActive = (squadId: string, current: boolean) => {
    const updated = voltxStore.updateSquad(squadId, { is_active: !current });
    setSquads([...updated]);
    dispatchMutation("squad", squadId, { is_active: !current });
  };

  const handleToggleSquadCapacity = (squadId: string, current: boolean) => {
    const updated = voltxStore.updateSquad(squadId, { capacity_full: !current });
    setSquads([...updated]);
    dispatchMutation("squad", squadId, { capacity_full: !current });
  };

  // Case Study Visibility Handler
  const handleToggleCaseStudyPublished = (caseStudyId: string, current: boolean) => {
    const updated = voltxStore.updateCaseStudy(caseStudyId, { is_published: !current });
    setCaseStudies([...updated]);
    dispatchMutation("case_study", caseStudyId, { is_published: !current });
  };

  // Vault Status & Tier Handlers
  const handleUpdateVaultStatus = (id: string, status: VaultStatus) => {
    const updated = voltxStore.updateVaultMember(id, { status });
    setVaultMembers([...updated]);
    dispatchMutation("vault", id, { status });
  };

  const handleUpdateVaultTier = (id: string, tier: VaultTier) => {
    const updated = voltxStore.updateVaultMember(id, { tier });
    setVaultMembers([...updated]);
    dispatchMutation("vault", id, { tier });
  };

  const handleUpdateVaultSquads = (id: string, squadSlug: SquadSlug) => {
    const member = vaultMembers.find((m) => m.id === id);
    if (!member) return;
    const current = member.assigned_squad_slugs || [];
    const exists = current.includes(squadSlug);
    const updatedSquads = exists
      ? current.filter((s) => s !== squadSlug)
      : [...current, squadSlug];
    const updated = voltxStore.updateVaultMember(id, { assigned_squad_slugs: updatedSquads });
    setVaultMembers([...updated]);
    dispatchMutation("vault", id, { assigned_squad_slugs: updatedSquads });
  };

  const handleDeleteVaultMember = (id: string, name: string) => {
    if (confirm(`Remove specialist [${name}] from private developer vault?`)) {
      const updated = voltxStore.deleteVaultMember(id);
      setVaultMembers([...updated]);
      dispatchMutation("vault", id, undefined, "delete");
    }
  };

  // Add Developer Submit
  const handleAddDeveloperSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDevName || !newDevContact) return;

    const newMember = voltxStore.addVaultMember({
      full_name: newDevName,
      internal_contact: newDevContact,
      telegram_handle: newDevTelegram,
      primary_stack: newDevStack,
      tier: newDevTier,
      is_available: newDevStatus === "Available for Allocation",
      status: newDevStatus,
      notes: newDevNotes,
      assigned_squad_slugs: newDevSquads,
    });

    setVaultMembers(voltxStore.getVaultMembers());
    dispatchMutation("vault", newMember.id, newMember);
    setShowAddDevModal(false);
    setNewDevName("");
    setNewDevContact("");
    setNewDevTelegram("");
    setNewDevStack("");
    setNewDevNotes("");
  };

  // Lead Handlers
  const handleAssignLead = (leadId: string, assignedDevId: string) => {
    const updates = {
      assigned_dev_id: assignedDevId || undefined,
      lead_status: (assignedDevId ? "Assigned" : "New Lead") as LeadStatus,
    };
    const updated = voltxStore.updateLead(leadId, updates);
    setLeads([...updated]);
    dispatchMutation("lead", leadId, updates);
  };

  const handleUpdateLeadStatus = (leadId: string, status: LeadStatus) => {
    const updated = voltxStore.updateLead(leadId, { lead_status: status });
    setLeads([...updated]);
    dispatchMutation("lead", leadId, { lead_status: status });
  };

  const handleDeleteLead = async (leadId: string) => {
    if (confirm("Permanently purge this inbound lead record?")) {
      const updated = voltxStore.deleteLead(leadId);
      setLeads([...updated]);
      try {
        await fetch(`/api/leads?id=${leadId}`, { method: "DELETE" });
      } catch (err) {
        dispatchMutation("lead", leadId, undefined, "delete");
      }
    }
  };

  // Copy Briefing String for Telegram
  const handleCopyBriefingString = (lead: ClientLead) => {
    const squad = squads.find((s) => s.slug === lead.squad_slug);
    const dev = vaultMembers.find((m) => m.id === lead.assigned_dev_id);
    
    const briefingText = `⚡ [VOLTX DISPATCH ASSIGNMENT]
━━━━━━━━━━━━━━━━━━━━━━━━━
• Squad: ${squad?.name || lead.squad_slug}
• Assigned Specialist: ${dev?.full_name || "Unassigned"}
• Budget Bracket: ${lead.budget_bracket}
• Client Email: ${lead.client_email} ${lead.client_handle ? `(${lead.client_handle})` : ""}
• Preferred Channel: ${lead.preferred_channel || "Telegram"}

📝 Project Requirement Brief:
"${lead.project_scope}"

━━━━━━━━━━━━━━━━━━━━━━━━━
Status: Queued via VoltX Admin Control Deck`;

    navigator.clipboard.writeText(briefingText);
    setCopiedLeadId(lead.id);
    setTimeout(() => setCopiedLeadId(null), 2500);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-xs text-text-primary bg-canvas">
        VERIFYING SESSION CRYPTO CREDENTIALS...
      </div>
    );
  }

  return (
    <div className="bg-canvas min-h-screen pb-24 text-text-primary transition-colors duration-200">
      {/* Top Admin Telemetry Header */}
      <div className="border-b border-border-tech bg-surface-card px-4 py-2.5">
        <div className="mx-auto flex max-w-7xl items-center justify-between font-mono text-xs">
          <div className="flex items-center space-x-3">
            <div className="relative flex h-7 w-7 items-center justify-center rounded-tech overflow-hidden border border-volt-mint/50 bg-surface">
              <img
                src="/logo.png"
                alt="VoltX Logo"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="font-bold text-text-primary tracking-wider">
              VOLTX MASTER COMMAND CENTER
            </span>
            <span className="text-text-muted/40">//</span>
            <span className="text-volt-cyan">ZERO-LEAK CONFINEMENT ACTIVE</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={refreshData}
              className="flex items-center space-x-1 text-text-secondary hover:text-text-primary transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>SYNC_STORE</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-red-500 hover:text-red-400 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>TERMINATE_SESSION</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Content Container */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        {/* Navigation Tabs & Security Pill */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-tech">
          <div className="flex items-center space-x-2 flex-wrap gap-y-2">
            <button
              onClick={() => setActiveTab("kill-switch")}
              className={`flex items-center space-x-2 rounded-tech px-4 py-2 text-xs font-mono font-semibold transition-all ${
                activeTab === "kill-switch"
                  ? "bg-text-primary text-canvas shadow"
                  : "bg-surface text-text-secondary hover:text-text-primary border border-border-tech"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>1. Squad Kill-Switch Matrix ({squads.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("vault")}
              className={`flex items-center space-x-2 rounded-tech px-4 py-2 text-xs font-mono font-semibold transition-all ${
                activeTab === "vault"
                  ? "bg-text-primary text-canvas shadow"
                  : "bg-surface text-text-secondary hover:text-text-primary border border-border-tech"
              }`}
            >
              <Users className="h-3.5 w-3.5" />
              <span>2. Private Developer Vault ({vaultMembers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("leads")}
              className={`flex items-center space-x-2 rounded-tech px-4 py-2 text-xs font-mono font-semibold transition-all ${
                activeTab === "leads"
                  ? "bg-text-primary text-canvas shadow"
                  : "bg-surface text-text-secondary hover:text-text-primary border border-border-tech"
              }`}
            >
              <Send className="h-3.5 w-3.5" />
              <span>3. Inbound Leads & Triage ({leads.length})</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-emerald-500/10 text-[11px] font-mono text-emerald-500 border border-emerald-500/20">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              <span>ZERO_OUTBOUND_LEAK_CONFIRMED</span>
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: GLOBAL KILL-SWITCH MATRIX */}
        {/* ============================================================== */}
        {activeTab === "kill-switch" && (
          <div className="mt-8 space-y-8 animate-in fade-in-50 duration-150">
            <div>
              <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-1">
                Command Layer [01]
              </div>
              <h2 className="font-display text-xl font-bold text-text-primary">
                Squad Visibility & Capacity Kill-Switch Matrix
              </h2>
              <p className="text-xs text-text-secondary mt-1">
                Instantly unpublish squads or trigger the high-demand waitlist badge on the live site.
              </p>
            </div>

            {/* Squads Table */}
            <div className="overflow-hidden rounded-tech-md border border-border-tech bg-surface-card shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface border-b border-border-tech font-mono text-[11px] text-text-muted uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Squad Name</th>
                    <th className="p-4">Route</th>
                    <th className="p-4">Live Hub Visibility</th>
                    <th className="p-4">Capacity State</th>
                    <th className="p-4 text-right">Route Preview</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-tech">
                  {squads.map((sq) => (
                    <tr key={sq.id} className="hover:bg-surface/50 transition-colors">
                      <td className="p-4 font-semibold text-text-primary">
                        {sq.name}
                      </td>
                      <td className="p-4 font-mono text-text-muted">
                        /squads/{sq.slug}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleSquadActive(sq.id, sq.is_active)}
                          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors ${
                            sq.is_active
                              ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                              : "bg-surface text-text-muted border border-border-tech"
                          }`}
                        >
                          {sq.is_active ? (
                            <>
                              <ToggleRight className="h-4 w-4 text-emerald-500" />
                              <span>ACTIVE_ON_HUB</span>
                            </>
                          ) : (
                            <>
                              <ToggleLeft className="h-4 w-4 text-text-muted" />
                              <span>DRAFT / HIDDEN</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleSquadCapacity(sq.id, sq.capacity_full)}
                          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors ${
                            sq.capacity_full
                              ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                              : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                          }`}
                        >
                          {sq.capacity_full ? (
                            <>
                              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                              <span>CAPACITY_FULL_WAITLIST</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                              <span>ACCEPTING_SPRINTS</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <Link
                          href={`/squads/${sq.slug}`}
                          target="_blank"
                          className="inline-flex items-center space-x-1 font-mono text-[11px] text-text-muted hover:text-text-primary"
                        >
                          <span>Inspect Live</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Case Study Visibility Toggles */}
            <div className="pt-6">
              <h3 className="font-display text-lg font-bold text-text-primary mb-1">
                Case Study Visibility Switches ({caseStudies.length} Cases)
              </h3>
              <p className="text-xs text-text-secondary mb-4">
                Instantly toggle individual internal case studies on/off across all squad pages.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {caseStudies.map((cs) => {
                  const parentSquad = squads.find((s) => s.id === cs.squad_id);
                  return (
                    <div
                      key={cs.id}
                      className="rounded-tech border border-border-tech bg-surface-card p-3 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-xs text-text-primary">
                          {cs.title}
                        </div>
                        <div className="font-mono text-[10px] text-volt-cyan mt-0.5">
                          Codename: {cs.codename} // {parentSquad?.name}
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleCaseStudyPublished(cs.id, cs.is_published)}
                        className={`flex items-center space-x-1 px-2.5 py-1 rounded text-[10px] font-mono font-medium ${
                          cs.is_published
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                            : "bg-surface text-text-muted border border-border-tech"
                        }`}
                      >
                        {cs.is_published ? "PUBLISHED" : "UNPUBLISHED"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: PRIVATE DEVELOPER VAULT */}
        {/* ============================================================== */}
        {activeTab === "vault" && (
          <div className="mt-8 space-y-6 animate-in fade-in-50 duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-1">
                  Private Human Asset Vault [02]
                </div>
                <h2 className="font-display text-xl font-bold text-text-primary">
                  Internal Developer Vault & Squad Assignments
                </h2>
                <p className="text-xs text-text-secondary mt-1">
                  Strictly internal developer profiles, Telegram handles, and direct lines. Never exposed on client-facing routes.
                </p>
              </div>

              <button
                onClick={() => setShowAddDevModal(true)}
                className="flex items-center space-x-1.5 rounded-tech bg-text-primary px-4 py-2 text-xs font-mono font-bold text-canvas hover:opacity-90 transition-opacity self-start sm:self-auto"
              >
                <Plus className="h-3.5 w-3.5 text-volt-mint" />
                <span>ADD_VAULT_TALENT</span>
              </button>
            </div>

            {/* Developer Vault Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vaultMembers.map((member) => (
                <div
                  key={member.id}
                  className="rounded-tech-md border border-border-tech bg-surface-card p-5 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-display text-base font-bold text-text-primary">
                          {member.full_name}
                        </h4>
                        <div className="font-mono text-xs text-text-secondary mt-0.5">
                          {member.internal_contact} {member.telegram_handle ? `// ${member.telegram_handle}` : ""}
                        </div>
                      </div>

                      <select
                        value={member.tier}
                        onChange={(e) => handleUpdateVaultTier(member.id, e.target.value as VaultTier)}
                        className="rounded border border-border-tech bg-surface px-2 py-1 text-[11px] font-mono text-text-primary"
                      >
                        <option value="Active Core">Active Core</option>
                        <option value="Standby">Standby</option>
                        <option value="Bench">Bench</option>
                      </select>
                    </div>

                    <div className="mt-3 pt-3 border-t border-border-tech">
                      <div className="font-mono text-[10px] text-text-muted uppercase">
                        Primary Stack & Core Units:
                      </div>
                      <div className="text-xs font-mono font-medium text-text-primary mt-0.5">
                        {member.primary_stack}
                      </div>
                      {member.notes && (
                        <p className="text-xs text-text-secondary mt-2 italic bg-surface p-2 rounded border border-border-tech">
                          &ldquo;{member.notes}&rdquo;
                        </p>
                      )}
                    </div>

                    {/* Squad Mapping Pills */}
                    <div className="mt-3 pt-2">
                      <div className="font-mono text-[10px] text-text-muted uppercase mb-1">
                        Squad Allocations:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {squads.map((sq) => {
                          const isAssigned = (member.assigned_squad_slugs || []).includes(sq.slug);
                          return (
                            <button
                              key={sq.slug}
                              onClick={() => handleUpdateVaultSquads(member.id, sq.slug)}
                              className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                                isAssigned
                                  ? "bg-volt-cyan/20 text-volt-cyan border border-volt-cyan/40 font-semibold"
                                  : "bg-surface text-text-muted hover:text-text-primary border border-border-tech"
                              }`}
                            >
                              {sq.slug}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border-tech flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] text-text-muted">Status:</span>
                      <select
                        value={member.status}
                        onChange={(e) => handleUpdateVaultStatus(member.id, e.target.value as VaultStatus)}
                        className="rounded border border-border-tech bg-surface px-2 py-1 text-[11px] font-mono font-semibold text-text-primary"
                      >
                        <option value="Active Sprint">Active Sprint</option>
                        <option value="Available for Allocation">Available for Allocation</option>
                        <option value="Offline / Standby">Offline / Standby</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      {member.telegram_handle && (
                        <a
                          href={`https://t.me/${member.telegram_handle.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-volt-cyan hover:underline flex items-center space-x-1"
                        >
                          <span>Direct TG</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      )}
                      <button
                        onClick={() => handleDeleteVaultMember(member.id, member.full_name)}
                        title="Remove specialist from vault"
                        className="p-1 rounded text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal: Add Vault Specialist */}
            {showAddDevModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                <div className="w-full max-w-lg rounded-tech-md border border-border-tech bg-surface-card p-6 shadow-2xl">
                  <h3 className="font-display text-lg font-bold text-text-primary mb-3">
                    Register Specialist in Developer Vault
                  </h3>
                  <form onSubmit={handleAddDeveloperSubmit} className="space-y-3 text-xs">
                    <div>
                      <label className="block font-mono font-medium text-text-primary mb-1">
                        Full Name / Talent Unit
                      </label>
                      <input
                        type="text"
                        value={newDevName}
                        onChange={(e) => setNewDevName(e.target.value)}
                        placeholder="e.g. Lead SRE Specialist"
                        className="w-full rounded border border-border-tech bg-surface p-2 text-text-primary"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-mono font-medium text-text-primary mb-1">
                          Phone / Internal Line
                        </label>
                        <input
                          type="text"
                          value={newDevContact}
                          onChange={(e) => setNewDevContact(e.target.value)}
                          placeholder="+880 1..."
                          className="w-full rounded border border-border-tech bg-surface p-2 text-text-primary"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-mono font-medium text-text-primary mb-1">
                          Telegram Handle
                        </label>
                        <input
                          type="text"
                          value={newDevTelegram}
                          onChange={(e) => setNewDevTelegram(e.target.value)}
                          placeholder="@handle"
                          className="w-full rounded border border-border-tech bg-surface p-2 text-text-primary"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-mono font-medium text-text-primary mb-1">
                        Primary Stack & Core Disciplines
                      </label>
                      <input
                        type="text"
                        value={newDevStack}
                        onChange={(e) => setNewDevStack(e.target.value)}
                        placeholder="Unreal Engine 5, C++, Next.js"
                        className="w-full rounded border border-border-tech bg-surface p-2 text-text-primary"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block font-mono font-medium text-text-primary mb-1">
                          Tier
                        </label>
                        <select
                          value={newDevTier}
                          onChange={(e) => setNewDevTier(e.target.value as VaultTier)}
                          className="w-full rounded border border-border-tech bg-surface p-2 text-text-primary"
                        >
                          <option value="Active Core">Active Core</option>
                          <option value="Standby">Standby</option>
                          <option value="Bench">Bench</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-mono font-medium text-text-primary mb-1">
                          Initial Status
                        </label>
                        <select
                          value={newDevStatus}
                          onChange={(e) => setNewDevStatus(e.target.value as VaultStatus)}
                          className="w-full rounded border border-border-tech bg-surface p-2 text-text-primary"
                        >
                          <option value="Available for Allocation">Available for Allocation</option>
                          <option value="Active Sprint">Active Sprint</option>
                          <option value="Offline / Standby">Offline / Standby</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block font-mono font-medium text-text-primary mb-1">
                        Internal Talent Notes
                      </label>
                      <textarea
                        value={newDevNotes}
                        onChange={(e) => setNewDevNotes(e.target.value)}
                        placeholder="Specialized domains, time zone availability..."
                        rows={2}
                        className="w-full rounded border border-border-tech bg-surface p-2 text-text-primary"
                      />
                    </div>
                    <div className="pt-3 flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => setShowAddDevModal(false)}
                        className="px-3 py-1.5 font-mono text-text-muted hover:text-text-primary"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 font-mono font-bold bg-text-primary text-canvas rounded hover:opacity-90"
                      >
                        Save Talent Profile
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: INBOUND LEADS & TRIAGE */}
        {/* ============================================================== */}
        {activeTab === "leads" && (
          <div className="mt-8 space-y-6 animate-in fade-in-50 duration-150">
            <div>
              <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-1">
                Dispatch Layer [03]
              </div>
              <h2 className="font-display text-xl font-bold text-text-primary">
                Inbound Lead Triage & Telegram Forwarding
              </h2>
              <p className="text-xs text-text-secondary mt-1">
                Assign client requirements to vault specialists and generate pre-formatted Telegram briefing messages in 1 click.
              </p>
            </div>

            {/* Leads Table */}
            <div className="overflow-hidden rounded-tech-md border border-border-tech bg-surface-card shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface border-b border-border-tech font-mono text-[11px] text-text-muted uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Client Contact</th>
                    <th className="p-4">Target Squad</th>
                    <th className="p-4">Budget</th>
                    <th className="p-4">Requirement Scope</th>
                    <th className="p-4">Specialist Assigned</th>
                    <th className="p-4">Pipeline Status</th>
                    <th className="p-4 text-right">Dispatch Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-tech">
                  {leads.map((lead) => {
                    const targetSquad = squads.find((s) => s.slug === lead.squad_slug);
                    const squadName = targetSquad ? targetSquad.name : lead.squad_slug;
                    const tgForwardUrl = generateTelegramForwardUrl(lead, squadName);
                    const isCopied = copiedLeadId === lead.id;

                    return (
                      <tr key={lead.id} className="hover:bg-surface/50 transition-colors">
                        <td className="p-4">
                          <div className="font-semibold text-text-primary">
                            {lead.client_email}
                          </div>
                          <div className="font-mono text-[11px] text-text-muted">
                            {lead.client_handle || "Channel: " + (lead.preferred_channel || "Telegram")}
                          </div>
                        </td>
                        <td className="p-4 font-mono text-text-primary">
                          {squadName}
                        </td>
                        <td className="p-4 font-mono font-semibold text-emerald-500">
                          {lead.budget_bracket}
                        </td>
                        <td className="p-4 max-w-xs text-text-secondary">
                          <p className="line-clamp-2" title={lead.project_scope}>
                            {lead.project_scope}
                          </p>
                        </td>
                        <td className="p-4">
                          <select
                            value={lead.assigned_dev_id || ""}
                            onChange={(e) => handleAssignLead(lead.id, e.target.value)}
                            className="rounded border border-border-tech bg-surface p-1 text-[11px] font-mono text-text-primary"
                          >
                            <option value="">-- Unassigned --</option>
                            {vaultMembers.map((dev) => (
                              <option key={dev.id} value={dev.id}>
                                {dev.full_name} ({dev.tier})
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="p-4">
                          <select
                            value={lead.lead_status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as LeadStatus)}
                            className={`rounded border px-2 py-0.5 text-[10px] font-mono font-semibold ${
                              lead.lead_status === "New Lead"
                                ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                : lead.lead_status === "TG Contacted"
                                ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                : lead.lead_status === "Assigned"
                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                : "bg-surface text-text-muted border-border-tech"
                            }`}
                          >
                            <option value="New Lead">New Lead</option>
                            <option value="TG Contacted">TG Contacted</option>
                            <option value="Assigned">Assigned</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                            {/* Copy Briefing String */}
                            <button
                              onClick={() => handleCopyBriefingString(lead)}
                              title="Copy pre-formatted Telegram briefing string"
                              className="inline-flex items-center space-x-1 rounded border border-border-tech bg-surface px-2 py-1 text-[10px] font-mono text-text-primary hover:bg-surface-card transition-colors"
                            >
                              {isCopied ? (
                                <>
                                  <Check className="h-3 w-3 text-emerald-500" />
                                  <span className="text-emerald-500">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3" />
                                  <span>Copy Brief</span>
                                </>
                              )}
                            </button>

                            {/* Direct TG Forward Link */}
                            <a
                              href={tgForwardUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1 rounded-tech bg-text-primary px-2.5 py-1 text-[10px] font-mono font-bold text-canvas hover:opacity-90 transition-opacity shadow-sm"
                            >
                              <Send className="h-3 w-3 text-volt-mint" />
                              <span>Dispatch</span>
                            </a>

                            {/* Delete Lead Action */}
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              title="Permanently purge lead"
                              className="p-1 rounded text-text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
