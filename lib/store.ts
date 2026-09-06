import { Squad, CaseStudy, InternalDevVaultMember, ClientLead } from "./types";
import { INITIAL_SQUADS, INITIAL_CASE_STUDIES, INITIAL_DEV_VAULT, INITIAL_LEADS } from "./initial-data";

// In-memory runtime state for server and client
let squadsState: Squad[] = [...INITIAL_SQUADS];
let caseStudiesState: CaseStudy[] = [...INITIAL_CASE_STUDIES];
let vaultState: InternalDevVaultMember[] = [...INITIAL_DEV_VAULT];
let leadsState: ClientLead[] = [...INITIAL_LEADS];

// Initialize from localStorage if in browser
function getClientStore<T>(key: string, fallback: T[]): T[] {
  if (typeof window === "undefined") return fallback;
  try {
    const item = localStorage.getItem(`voltx_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

function saveClientStore<T>(key: string, data: T[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(`voltx_${key}`, JSON.stringify(data));
  } catch (e) {
    console.error("Storage error:", e);
  }
}

export const voltxStore = {
  // Public Squads
  getSquads: (includeInactive = false): Squad[] => {
    const data = typeof window !== "undefined" ? getClientStore("squads", squadsState) : squadsState;
    if (includeInactive) return data;
    return data.filter((s) => s.is_active);
  },

  getSquadBySlug: (slug: string): Squad | undefined => {
    const squads = voltxStore.getSquads(true);
    const found = squads.find((s) => s.slug === slug);
    if (found) return found;
    return INITIAL_SQUADS.find((s) => s.slug === slug);
  },

  updateSquad: (id: string, updates: Partial<Squad>): Squad[] => {
    const current = typeof window !== "undefined" ? getClientStore("squads", squadsState) : squadsState;
    const updated = current.map((s) => (s.id === id ? { ...s, ...updates } : s));
    squadsState = updated;
    saveClientStore("squads", updated);
    return updated;
  },

  // Internal Sanitized Case Studies (NO EXTERNAL LINKS)
  getCaseStudies: (squadId?: string, includeUnpublished = false): CaseStudy[] => {
    const current = typeof window !== "undefined" ? getClientStore("case_studies", caseStudiesState) : caseStudiesState;
    let list = current;
    if (squadId) {
      const filtered = list.filter((c) => c.squad_id === squadId);
      list = filtered.length > 0 ? filtered : INITIAL_CASE_STUDIES.filter((c) => c.squad_id === squadId);
    }
    if (!includeUnpublished) {
      list = list.filter((c) => c.is_published);
    }
    return list;
  },

  getCaseStudyById: (id: string): CaseStudy | undefined => {
    const current = voltxStore.getCaseStudies(undefined, true);
    return current.find((c) => c.id === id);
  },

  getCaseStudyByCodename: (codename: string): CaseStudy | undefined => {
    const current = voltxStore.getCaseStudies(undefined, true);
    return current.find((c) => c.codename.toLowerCase() === codename.toLowerCase());
  },

  updateCaseStudy: (id: string, updates: Partial<CaseStudy>): CaseStudy[] => {
    const current = typeof window !== "undefined" ? getClientStore("case_studies", caseStudiesState) : caseStudiesState;
    const updated = current.map((c) => (c.id === id ? { ...c, ...updates } : c));
    caseStudiesState = updated;
    saveClientStore("case_studies", updated);
    return updated;
  },

  // STRICTLY PRIVATE: Developer Vault (Only in /admin)
  getVaultMembers: (): InternalDevVaultMember[] => {
    return typeof window !== "undefined" ? getClientStore("dev_vault", vaultState) : vaultState;
  },

  updateVaultMember: (id: string, updates: Partial<InternalDevVaultMember>): InternalDevVaultMember[] => {
    const current = typeof window !== "undefined" ? getClientStore("dev_vault", vaultState) : vaultState;
    const updated = current.map((m) => (m.id === id ? { ...m, ...updates } : m));
    vaultState = updated;
    saveClientStore("dev_vault", updated);
    return updated;
  },

  addVaultMember: (member: Omit<InternalDevVaultMember, "id">): InternalDevVaultMember => {
    const current = typeof window !== "undefined" ? getClientStore("dev_vault", vaultState) : vaultState;
    const newMember: InternalDevVaultMember = {
      ...member,
      id: `dev-${Date.now().toString(36)}`,
      created_at: new Date().toISOString(),
    };
    const updated = [newMember, ...current];
    vaultState = updated;
    saveClientStore("dev_vault", updated);
    return newMember;
  },

  deleteVaultMember: (id: string): InternalDevVaultMember[] => {
    const current = typeof window !== "undefined" ? getClientStore("dev_vault", vaultState) : vaultState;
    const updated = current.filter((m) => m.id !== id);
    vaultState = updated;
    saveClientStore("dev_vault", updated);
    return updated;
  },

  // Captured Inbound Leads
  getLeads: (): ClientLead[] => {
    return typeof window !== "undefined" ? getClientStore("leads", leadsState) : leadsState;
  },

  addLead: (lead: Omit<ClientLead, "id" | "created_at">): ClientLead => {
    const current = typeof window !== "undefined" ? getClientStore("leads", leadsState) : leadsState;
    const newLead: ClientLead = {
      ...lead,
      id: `lead-${Date.now().toString(36)}`,
      created_at: new Date().toISOString(),
    };
    const updated = [newLead, ...current];
    leadsState = updated;
    saveClientStore("leads", updated);
    return newLead;
  },

  updateLead: (id: string, updates: Partial<ClientLead>): ClientLead[] => {
    const current = typeof window !== "undefined" ? getClientStore("leads", leadsState) : leadsState;
    const updated = current.map((l) => (l.id === id ? { ...l, ...updates } : l));
    leadsState = updated;
    saveClientStore("leads", updated);
    return updated;
  },

  deleteLead: (id: string): ClientLead[] => {
    const current = typeof window !== "undefined" ? getClientStore("leads", leadsState) : leadsState;
    const updated = current.filter((l) => l.id !== id);
    leadsState = updated;
    saveClientStore("leads", updated);
    return updated;
  },
};
