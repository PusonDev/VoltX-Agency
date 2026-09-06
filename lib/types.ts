export type SquadSlug =
  | "shopify"
  | "wordpress"
  | "automation"
  | "growth-analytics"
  | "devops"
  | "game-dev"
  | "web-systems"
  | "creative";

export interface Squad {
  id: string;
  slug: SquadSlug;
  name: string;
  short_description: string;
  hero_tagline: string;
  priority_order: number;
  is_active: boolean;
  capacity_full: boolean;
  deliverables: string[];
  created_at?: string;
}

export interface CaseStudy {
  id: string;
  squad_id: string;
  squad_slug: SquadSlug;
  title: string;
  codename: string;
  challenge: string;
  solution: string;
  metrics: string;
  tech_stack: string[];
  is_published: boolean;
  created_at?: string;
}

export type VaultTier = "Active Core" | "Standby" | "Bench";
export type VaultStatus = "Active Sprint" | "Available for Allocation" | "Offline / Standby";

export interface InternalDevVaultMember {
  id: string;
  full_name: string;
  internal_contact: string;
  telegram_handle?: string;
  primary_stack: string;
  tier: VaultTier;
  is_available: boolean;
  status: VaultStatus;
  notes?: string;
  assigned_squad_slugs?: SquadSlug[];
  created_at?: string;
}

export interface InternalAssignment {
  squad_id: string;
  dev_id: string;
  role_alias: string;
}

export type LeadStatus = "New Lead" | "TG Contacted" | "Assigned" | "Closed";

export interface ClientLead {
  id: string;
  squad_id?: string;
  squad_slug: string;
  client_email: string;
  client_handle?: string;
  project_scope: string;
  budget_bracket: string;
  preferred_channel?: string;
  assigned_dev_id?: string;
  lead_status: LeadStatus;
  created_at: string;
}
