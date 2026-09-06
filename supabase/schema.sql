-- ==============================================================================
-- VoltX Agency Hub: Unified Database Schema & Row-Level Security (RLS)
-- Target Platform: Supabase / PostgreSQL
-- ==============================================================================

-- 1. Public Squads Table
create table if not exists squads (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  short_description text not null,
  hero_tagline text,
  priority_order int default 10,
  is_active boolean default true,
  capacity_full boolean default false,
  deliverables text[] default '{}',
  created_at timestamp with time zone default now()
);

-- 2. Sanitized Case Studies (Strictly Internal - NO external links)
create table if not exists case_studies (
  id uuid primary key default gen_random_uuid(),
  squad_id uuid references squads(id) on delete cascade,
  squad_slug text not null,
  title text not null,
  codename text not null,
  challenge text not null,
  solution text not null,
  metrics text not null,
  tech_stack text[] default '{}',
  is_published boolean default true,
  created_at timestamp with time zone default now()
);

-- 3. Internal Developer Vault (STRICTLY PRIVATE - NO PUBLIC API ACCESS)
create table if not exists internal_dev_vault (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  internal_contact text not null,
  telegram_handle text,
  primary_stack text not null,
  tier text default 'Active Core', -- 'Active Core', 'Standby', 'Bench'
  is_available boolean default true,
  status text default 'Available for Allocation',
  notes text,
  assigned_squad_slugs text[] default '{}',
  created_at timestamp with time zone default now()
);

-- 4. Dynamic Squad-to-Developer Internal Assignment
create table if not exists internal_assignments (
  squad_id uuid references squads(id) on delete cascade,
  dev_id uuid references internal_dev_vault(id) on delete cascade,
  role_alias text default 'Core Specialist',
  primary key (squad_id, dev_id)
);

-- 5. Inbound Client Leads
create table if not exists client_leads (
  id uuid primary key default gen_random_uuid(),
  squad_id uuid references squads(id),
  squad_slug text not null,
  client_email text not null,
  client_handle text,
  project_scope text not null,
  budget_bracket text not null,
  preferred_channel text default 'Telegram',
  assigned_dev_id uuid references internal_dev_vault(id),
  lead_status text default 'New Lead', -- 'New Lead', 'TG Contacted', 'Assigned', 'Closed'
  created_at timestamp with time zone default now()
);

-- ==============================================================================
-- Row-Level Security (RLS)
-- ==============================================================================
alter table squads enable row level security;
alter table case_studies enable row level security;
alter table internal_dev_vault enable row level security;
alter table internal_assignments enable row level security;
alter table client_leads enable row level security;

-- Drop existing policies if re-running
drop policy if exists "Public read access on active squads" on squads;
drop policy if exists "Public read access on published case studies" on case_studies;
drop policy if exists "Public insert on leads" on client_leads;
drop policy if exists "Admin squad control" on squads;
drop policy if exists "Admin case studies control" on case_studies;
drop policy if exists "Admin vault control" on internal_dev_vault;
drop policy if exists "Admin assignment control" on internal_assignments;
drop policy if exists "Admin leads control" on client_leads;

-- Public Access Rules
create policy "Public read access on active squads" on squads for select using (is_active = true);
create policy "Public read access on published case studies" on case_studies for select using (is_published = true);
create policy "Public insert on leads" on client_leads for insert with check (true);

-- Admin Full Access Rules
create policy "Admin squad control" on squads for all using (auth.role() = 'authenticated');
create policy "Admin case studies control" on case_studies for all using (auth.role() = 'authenticated');
create policy "Admin vault control" on internal_dev_vault for all using (auth.role() = 'authenticated');
create policy "Admin assignment control" on internal_assignments for all using (auth.role() = 'authenticated');
create policy "Admin leads control" on client_leads for all using (auth.role() = 'authenticated');
