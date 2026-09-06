import { Squad, CaseStudy, InternalDevVaultMember, ClientLead } from "./types";

export const INITIAL_SQUADS: Squad[] = [
  {
    id: "sq-01",
    slug: "shopify",
    name: "VoltX Commerce Lab",
    short_description: "Enterprise Liquid Customization, Headless Shopify & Conversion Infrastructure",
    hero_tagline: "Enterprise Liquid Customization, Headless Shopify & Conversion Infrastructure",
    priority_order: 1,
    is_active: true,
    capacity_full: false,
    deliverables: [
      "Headless Hydrogen/Next.js Storefronts",
      "Custom Checkout UI Extensions",
      "Sub-Second Page Transitions",
      "Automated Inventory Ingestion Pipelines"
    ]
  },
  {
    id: "sq-02",
    slug: "wordpress",
    name: "VoltX Enterprise WordPress",
    short_description: "Headless WordPress Implementations, Enterprise WooCommerce & Core Web Vitals Engineering",
    hero_tagline: "Headless WordPress Implementations, Enterprise WooCommerce & Core Web Vitals Engineering",
    priority_order: 2,
    is_active: true,
    capacity_full: false,
    deliverables: [
      "WPGraphQL + Next.js Decoupled Platforms",
      "Custom Gutenberg Block Systems",
      "Enterprise-Grade Redis Object Caching",
      "Zero-Bloat PHP Architectures"
    ]
  },
  {
    id: "sq-03",
    slug: "automation",
    name: "VoltX Intelligent Automation & AI-Ops",
    short_description: "Autonomous In-Cluster AI Agents, SRE Automation & Distributed Schedulers",
    hero_tagline: "Autonomous In-Cluster AI Agents, SRE Automation & Distributed Schedulers",
    priority_order: 3,
    is_active: true,
    capacity_full: false,
    deliverables: [
      "Self-Hosted In-Cluster LLM Agents",
      "Deterministic Incident Diagnostics (PromQL)",
      "Ingest-Time Log Pattern Clustering (Drain3)",
      "Distributed Cloudflare Workers & n8n Fleets"
    ]
  },
  {
    id: "sq-04",
    slug: "growth-analytics",
    name: "VoltX Attribution & Growth Engineering",
    short_description: "First-Party Data Engineering, Server-Side CAPI & Scaled PPC Architecture",
    hero_tagline: "First-Party Data Engineering, Server-Side CAPI & Scaled PPC Architecture",
    priority_order: 4,
    is_active: true,
    capacity_full: false,
    deliverables: [
      "Server-Side GTM & Meta Conversions API (CAPI)",
      "Cloud Container Stape.io Deduplication",
      "Algorithmic PPC Bidding Optimization",
      "Full-Funnel Multi-Touch Attribution Modeling"
    ]
  },
  {
    id: "sq-05",
    slug: "devops",
    name: "VoltX Cloud & Infrastructure",
    short_description: "Bare-Metal to Cloud Orchestration, Sub-Second Database Failovers & Zero-Downtime Migration",
    hero_tagline: "Bare-Metal to Cloud Orchestration, Sub-Second Database Failovers & Zero-Downtime Migration",
    priority_order: 5,
    is_active: true,
    capacity_full: false,
    deliverables: [
      "HA Redis Sentinel & HAProxy Orchestration",
      "K3s & Envoy 47k+ QPS Ingress Routing",
      "FastAPI & Nginx X-Accel Media Gateways",
      "Multi-Hop Global CDN Telemetry"
    ]
  },
  {
    id: "sq-06",
    slug: "game-dev",
    name: "VoltX Interactive & 3D Systems",
    short_description: "Unreal Engine 5 Strike Unit (Core Mechanics, C++ Architecture & VR Runtime Optimization)",
    hero_tagline: "Unreal Engine 5 Strike Unit (Core Mechanics, C++ Architecture & VR Runtime Optimization)",
    priority_order: 6,
    is_active: true,
    capacity_full: false,
    deliverables: [
      "Autonomous Gameplay Pipeline Integration",
      "Multiplayer Space Sim C++ VR Runtime",
      "Non-Linear Quest Progression State Machines",
      "HLOD & Tick Throttling GPU Optimization"
    ]
  },
  {
    id: "sq-07",
    slug: "web-systems",
    name: "VoltX Web Systems & Apps",
    short_description: "Custom Micro-SaaS Portals, Internal Business Engines & Scalable Web Architectures",
    hero_tagline: "Custom Micro-SaaS Portals, Internal Business Engines & Scalable Web Architectures",
    priority_order: 7,
    is_active: true,
    capacity_full: false,
    deliverables: [
      "Next.js Enterprise Frontends",
      "TypeScript REST & GraphQL Architectures",
      "Flutter Cross-Platform Runtimes",
      "Multitenant Supabase & PostgreSQL Systems"
    ]
  },
  {
    id: "sq-08",
    slug: "creative",
    name: "VoltX Creative & Motion Studio",
    short_description: "Visual Systems, 3D Motion Engineering & High-Converting Commerce Assets",
    hero_tagline: "Visual Systems, 3D Motion Engineering & High-Converting Commerce Assets",
    priority_order: 8,
    is_active: true,
    capacity_full: false,
    deliverables: [
      "Technical Brand Guideline Kits",
      "Cinema4D & Blender 3D Product Renders",
      "High-Converting Commercial Motion",
      "Enterprise Design Token Systems"
    ]
  }
];

// Strictly INTERNAL Case Studies (Zero Outbound Links)
export const INITIAL_CASE_STUDIES: CaseStudy[] = [
  // Squad 01: Shopify Commerce Lab
  {
    id: "cs-01",
    squad_id: "sq-01",
    squad_slug: "shopify",
    title: "Artisanal Ceramics Global Storefront",
    codename: "Tenmoku-Core",
    challenge: "High-resolution ceramics imagery caused layout shift and 4.2s mobile load times across international checkouts.",
    solution: "Engineered a custom Liquid modular layout with WebP responsive srcset pipelines, client-side currency routing, and decoupled cart drawers.",
    metrics: "Sub-second transitions across 12 countries with 99.8% checkout completion rate.",
    tech_stack: ["Shopify Plus", "Custom Liquid", "ES6+ Modules", "Tailwind CSS"],
    is_published: true
  },
  {
    id: "cs-02",
    squad_id: "sq-01",
    squad_slug: "shopify",
    title: "Luxury Gold-Field Jewelry Architecture",
    codename: "DAvila-Lux",
    challenge: "Complex product variants and dynamic financing SDKs were triggering cumulative layout shifts (CLS 0.38) and bounce rates on mobile.",
    solution: "Rebuilt variant selector state machine with zero-shift skeleton layouts and asynchronous Afterpay payment gateway mount.",
    metrics: "0.00 Cumulative Layout Shift (CLS) & 38% mobile conversion surge.",
    tech_stack: ["Shopify 2.0", "Liquid", "Afterpay SDK", "CSS Grid"],
    is_published: true
  },
  {
    id: "cs-03",
    squad_id: "sq-01",
    squad_slug: "shopify",
    title: "Clinical Diagnostics & Biomarker Portal",
    codename: "Nudae-System",
    challenge: "Strict GDPR health-compliance requirements paired with recurring lab-kit subscriptions and clinical lab result routing.",
    solution: "Architected custom Recharge API subscription pipelines with HIPAA/GDPR-compliant customer data presentation layers.",
    metrics: "100% regulatory compliance & frictionless recurring billing engine.",
    tech_stack: ["Shopify Plus", "Recharge API", "Liquid", "Custom React Apps"],
    is_published: true
  },
  {
    id: "cs-04",
    squad_id: "sq-01",
    squad_slug: "shopify",
    title: "Athletic Gear & High-Concurrency Catalog",
    codename: "Powerband-Engine",
    challenge: "High-traffic flash sales caused race conditions in stock reservation and cart lockups during peak influencer drops.",
    solution: "Implemented optimistic inventory locks, lightweight Alpine.js micro-funnels, and asynchronous webhook dispatch to Klaviyo.",
    metrics: "Zero checkout drops during flash sale peaks; 2.1x mobile conversion rate.",
    tech_stack: ["Shopify 2.0", "Alpine.js", "Liquid Engine", "Klaviyo Webhooks"],
    is_published: true
  },
  {
    id: "cs-05",
    squad_id: "sq-01",
    squad_slug: "shopify",
    title: "Algorithmic Search & Discovery Engine",
    codename: "Searchaly-Core",
    challenge: "Large 50,000+ SKU catalogue suffered from 1.8s native search latency and sluggish faceted filter queries.",
    solution: "Deployed an off-thread Typesense indexing pipeline synchronized via Shopify webhooks, delivering instant instant-as-you-type search.",
    metrics: "12ms search response latency across 50,000+ indexed SKUs.",
    tech_stack: ["Next.js", "Typesense", "Shopify Storefront API", "Node.js"],
    is_published: true
  },
  {
    id: "cs-06",
    squad_id: "sq-01",
    squad_slug: "shopify",
    title: "Organic Apothecary & Botanical Platform",
    codename: "Botanical-Store",
    challenge: "Multi-ingredient herbal products required dynamic bundling rules, tiered volume discounts, and custom contraindication filters.",
    solution: "Custom client-side bundle calculator with automatic threshold discount application and real-time stock allocation.",
    metrics: "42% increase in average order value (AOV) across 15,000 orders.",
    tech_stack: ["Shopify 2.0", "Liquid", "Custom Bundle Engine", "CSS Grid"],
    is_published: true
  },

  // Squad 02: WordPress
  {
    id: "cs-07",
    squad_id: "sq-02",
    squad_slug: "wordpress",
    title: "Decoupled WPGraphQL Portal",
    codename: "WP-Decoupled",
    challenge: "Monolithic WordPress installation suffering from 2.4s TTFB and database bloat from excessive third-party plugins.",
    solution: "Decoupled WordPress into a headless CMS delivering WPGraphQL endpoints to a Next.js App Router edge frontend with ISR.",
    metrics: "Sub-100ms Time to First Byte (TTFB) & 99+ Google Lighthouse score.",
    tech_stack: ["WPGraphQL", "Next.js App Router", "Redis", "Docker"],
    is_published: true
  },
  {
    id: "cs-08",
    squad_id: "sq-02",
    squad_slug: "wordpress",
    title: "Custom Enterprise Gutenberg Suite",
    codename: "Gutenberg-Core",
    challenge: "Client editorial team was constrained by fragile page builders that injected bloated DOM trees and broken CSS.",
    solution: "Constructed 24 bespoke, lightweight React-based Gutenberg block components with strict design token constraints.",
    metrics: "70% reduction in HTML payload size; zero third-party plugin dependencies.",
    tech_stack: ["React", "Gutenberg API", "PHP 8.3", "Tailwind CSS"],
    is_published: true
  },
  {
    id: "cs-09",
    squad_id: "sq-02",
    squad_slug: "wordpress",
    title: "High-Concurrency WooCommerce Engine",
    codename: "Woo-Scale",
    challenge: "10,000+ SKU store experienced database deadlocks during multi-product cart checkout bursts.",
    solution: "Engineered Redis Object Cache Pro with master-slave query routing and optimized MySQL indexes on postmeta tables.",
    metrics: "Zero cart lockups during 10,000 concurrent cart additions.",
    tech_stack: ["WooCommerce", "Redis Sentinel", "MySQL Optimization", "HAProxy"],
    is_published: true
  },

  // Squad 03: Automation & AI-Ops
  {
    id: "cs-10",
    squad_id: "sq-03",
    squad_slug: "automation",
    title: "kagent Autonomous SRE Cluster",
    codename: "kagent-SRE",
    challenge: "SRE team spent 45+ minutes manually querying Prometheus and parsing alerts during high-priority cluster incidents.",
    solution: "Self-hosted in-cluster LLM agent executing real-time PromQL queries against Prometheus for deterministic root-cause diagnosis.",
    metrics: "MTTR slashed from 45 min down to 3.2 min across 180 incident drills.",
    tech_stack: ["Python", "Prometheus", "Kubernetes", "Ollama / LLM", "Grafana"],
    is_published: true
  },
  {
    id: "cs-11",
    squad_id: "sq-03",
    squad_slug: "automation",
    title: "Drain3 Log Pattern Intelligence",
    codename: "Drain3-Engine",
    challenge: "Hundreds of thousands of raw logs overwhelmed ingestion pipelines and caused exorbitant SaaS observability bills.",
    solution: "Ingest-time parsing engine using Drain3 prefix tree clustering to compress repetitive logs into semantic patterns without vector DB overhead.",
    metrics: "Compressed 346,155 raw logs to 378 patterns at 99.9% coverage with zero licensing costs.",
    tech_stack: ["Python", "Drain3", "Redis Streams", "FastAPI"],
    is_published: true
  },
  {
    id: "cs-12",
    squad_id: "sq-03",
    squad_slug: "automation",
    title: "Serverless Edge Tunnels & Infrastructure Guardrails",
    codename: "Edge-Tunnels",
    challenge: "Multi-region microservices required automated zero-trust tunnels and instantaneous, idempotent kill switches during DDoS.",
    solution: "Cloudflare Workers + TypeScript control plane orchestrating automated tunnel provisioning with sub-second circuit breaking.",
    metrics: "Zero breach rate across 1.2M monthly edge requests.",
    tech_stack: ["Cloudflare Workers", "TypeScript", "Wrangler", "HashiCorp Vault"],
    is_published: true
  },
  {
    id: "cs-13",
    squad_id: "sq-03",
    squad_slug: "automation",
    title: "Distributed Production Scheduler Fleet",
    codename: "Cronicle-Fleet",
    challenge: "Legacy cron servers failed silently, accumulated orphan locks, and exhausted filesystem inodes under heavy worker loads.",
    solution: "Distributed high-availability Cronicle & n8n cluster with automated inode pruning, worker health probes, and queue backoff.",
    metrics: "Handles ~151,000 scheduled jobs/day with 99.99% execution reliability.",
    tech_stack: ["n8n", "Cronicle", "Docker", "PostgreSQL", "RabbitMQ"],
    is_published: true
  },

  // Squad 04: Growth Analytics
  {
    id: "cs-14",
    squad_id: "sq-04",
    squad_slug: "growth-analytics",
    title: "Server-Side GTM & Meta CAPI Pipelines",
    codename: "CAPI-Pipeline",
    challenge: "Safari ITP restrictions and client-side ad-blockers degraded ad attribution by up to 35% of true conversion volume.",
    solution: "Dedicated Stape.io cloud container running server-side GTM with cryptographic event deduplication across client and server.",
    metrics: "98.4% Meta CAPI event match quality score; recovered 28% lost ad attribution.",
    tech_stack: ["Server-Side GTM", "Stape.io", "Meta CAPI", "GA4 Protocol"],
    is_published: true
  },
  {
    id: "cs-15",
    squad_id: "sq-04",
    squad_slug: "growth-analytics",
    title: "Fitness Brand Paid Search Engine",
    codename: "ROAS-Algo",
    challenge: "High CPC bidding competition in fitness gear eroded profit margins on Google Ads search campaigns.",
    solution: "Algorithmic bidding script synchronizing inventory margin data with Google Ads API, dynamically adjusting target CPA.",
    metrics: "Delivered verified 548% ROAS across competitive search query auctions.",
    tech_stack: ["Google Ads API", "BigQuery", "Python Scripts", "Looker Studio"],
    is_published: true
  },
  {
    id: "cs-16",
    squad_id: "sq-04",
    squad_slug: "growth-analytics",
    title: "Full-Funnel E-commerce Scaling",
    codename: "Funnel-Scale",
    challenge: "Client brand plateaued at $12k/month due to untracked funnel leaks and cross-domain checkout attribution drops.",
    solution: "Comprehensive GA4 audit, custom dimension user-journey stitching, and predictive lifetime value cohort modeling.",
    metrics: "Scaled direct-to-consumer store to $50,000+ run-rate across 230+ production audits.",
    tech_stack: ["GA4", "Mixpanel", "PostHog", "BigQuery"],
    is_published: true
  },

  // Squad 05: DevOps
  {
    id: "cs-17",
    squad_id: "sq-05",
    squad_slug: "devops",
    title: "Sub-Second Database Failover Cluster",
    codename: "Sentinel-HA",
    challenge: "Single master database node failure resulted in 5-10 seconds of write errors and dropped transactional requests.",
    solution: "3-node Redis Sentinel cluster fronted by HAProxy with health-check socket polling and automated VIP re-homing.",
    metrics: "Failover write downtime slashed from ~5s down to ~500ms with zero application code changes.",
    tech_stack: ["Redis Sentinel", "HAProxy", "Keepalived", "Ubuntu Linux"],
    is_published: true
  },
  {
    id: "cs-18",
    squad_id: "sq-05",
    squad_slug: "devops",
    title: "High-Throughput Ingress Engine",
    codename: "Envoy-47K",
    challenge: "Kubernetes ingress controller suffered from high TCP retransmits and latency spikes during 40k+ QPS traffic surges.",
    solution: "K3s cluster paired with Envoy Gateway, eBPF packet acceleration, and aligned L2 segment VIP configuration.",
    metrics: "47,000+ QPS benchmarked at 6ms p99 latency with 100x reduction in TCP retransmits.",
    tech_stack: ["K3s", "Envoy Gateway", "eBPF", "Cilium", "Linux Kernel Tuning"],
    is_published: true
  },
  {
    id: "cs-19",
    squad_id: "sq-05",
    squad_slug: "devops",
    title: "92 TB Media Streaming Gateway",
    codename: "Media-92TB",
    challenge: "Catalog of 173,965 high-bitrate media files caused severe CPU thrashing when streamed through Node.js runtimes.",
    solution: "FastAPI catalog metadata gateway delegating raw byte transfers to Nginx X-Accel-Redirect, bypassing application workers.",
    metrics: "CPU held at 0.10% with 8-12ms API latency while serving 92 TB of media throughput.",
    tech_stack: ["FastAPI", "PostgreSQL", "Nginx X-Accel", "S3 Storage"],
    is_published: true
  },
  {
    id: "cs-20",
    squad_id: "sq-05",
    squad_slug: "devops",
    title: "Live Zero-Downtime Data Migration",
    codename: "Atomic-Migrate",
    challenge: "Requirement to transfer 10M+ hot Redis keys and a 2.6M-record Elasticsearch index with zero downtime or customer disconnects.",
    solution: "Parallel Go streaming replication daemon with atomic index alias swap and continuous hash validation.",
    metrics: "10M+ keys moved across clusters in 5 minutes at ~45K ops/sec with zero downtime.",
    tech_stack: ["Redis Sync", "Elasticsearch", "Go CLI", "Docker"],
    is_published: true
  },
  {
    id: "cs-21",
    squad_id: "sq-05",
    squad_slug: "devops",
    title: "42-Node Global CDN Telemetry",
    codename: "CDN-Telemetry",
    challenge: "Multi-CDN streaming platform experienced undetected regional edge degradation due to blind spots in client DNS steering.",
    solution: "Agentless per-hop latency monitoring probing 21 origins and 21 edge PoPs to provide sub-millisecond route telemetry.",
    metrics: "Sub-millisecond route convergence for live stream edge synchronization.",
    tech_stack: ["Prometheus", "Grafana", "Go Agent", "Anycast BGP"],
    is_published: true
  },

  // Squad 06: Game Dev
  {
    id: "cs-22",
    squad_id: "sq-06",
    squad_slug: "game-dev",
    title: "Autonomous Gameplay Architecture",
    codename: "Gameplay-Gen",
    challenge: "Dynamic narrative generation required synchronizing AI mission states with multiplayer clients without game thread stalls.",
    solution: "Unreal Engine 5.4 C++ async pipeline integrating Claude 4.5 API with MongoDB/Firebase state synchronization.",
    metrics: "Zero desync across 1,000 continuous gameplay generation cycles.",
    tech_stack: ["Unreal Engine 5.4", "Claude 4.5 API", "MongoDB", "C++"],
    is_published: true
  },
  {
    id: "cs-23",
    squad_id: "sq-06",
    squad_slug: "game-dev",
    title: "Multiplayer Space Simulator (UE5 / C++)",
    codename: "VR-SpaceSim",
    challenge: "6DoF space flight in VR caused severe motion sickness when framerate dropped below 60 FPS under network latency.",
    solution: "Server-authoritative net-prediction with client rollback, aggressive draw-call culling, and OpenXR runtime tuning.",
    metrics: "Stable 60+ FPS maintained on Meta Quest and PCVR under heavy combat loads.",
    tech_stack: ["Unreal Engine 5", "C++", "OpenXR", "SteamNetworkingSockets"],
    is_published: true
  },
  {
    id: "cs-24",
    squad_id: "sq-06",
    squad_slug: "game-dev",
    title: "Non-Linear Quest Progression Engine",
    codename: "Quest-Graph",
    challenge: "Branching RPG dialogue trees generated memory fragmentation and garbage collection hitches during quest state updates.",
    solution: "Custom C++ text parser and state machine built on UE5 StateTree with pre-allocated memory arenas.",
    metrics: "Zero garbage collection pauses during quest transitions.",
    tech_stack: ["C++", "UE5 StateTree", "Custom JSON Parser"],
    is_published: true
  },
  {
    id: "cs-25",
    squad_id: "sq-06",
    squad_slug: "game-dev",
    title: "Performance Profiling Overhauls",
    codename: "HLOD-Optimizer",
    challenge: "Dense visual assets and physics actors caused high GPU draw calls and CPU frame time spikes on target hardware.",
    solution: "Hierarchical Level of Detail (HLOD) mesh optimization, custom tick throttling, and memory pool refactoring.",
    metrics: "25% reduction in CPU/GPU overhead on target hardware.",
    tech_stack: ["Unreal Insights", "RenderDoc", "C++ Profiler"],
    is_published: true
  },

  // Squad 07: Web Systems
  {
    id: "cs-26",
    squad_id: "sq-07",
    squad_slug: "web-systems",
    title: "Custom Micro-SaaS Portals & Billing Engine",
    codename: "SaaS-Kernel",
    challenge: "B2B client needed a multitenant portal with enterprise role-based access control and usage-metered billing.",
    solution: "Next.js App Router portal with Supabase Row Level Security, TypeScript REST/GraphQL APIs, and Stripe Billing integration.",
    metrics: "Zero multi-tenant cross-talk; 40ms p95 API response time on edge routes.",
    tech_stack: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Stripe API"],
    is_published: true
  },
  {
    id: "cs-27",
    squad_id: "sq-07",
    squad_slug: "web-systems",
    title: "Offline-First Logistics Mobile Suite",
    codename: "Logistics-Sync",
    challenge: "Field drivers operated in zero-cellular warehouse zones, causing lost order manifests and dispatch desynchronization.",
    solution: "Flutter mobile application with offline-first SQLite database and automated conflict-free sync over WebSockets upon reconnect.",
    metrics: "100% offline uptime with zero order loss in cellular dead zones.",
    tech_stack: ["Flutter", "Dart", "WebSockets", "SQLite", "Node.js"],
    is_published: true
  },

  // Squad 08: Creative & Motion Studio
  {
    id: "cs-28",
    squad_id: "sq-08",
    squad_slug: "creative",
    title: "Visual Systems & 3D Motion Engineering",
    codename: "Render-3D",
    challenge: "E-commerce client required photorealistic 3D product animations to replace expensive physical studio shoots.",
    solution: "Cinema4D and Blender procedural rendering pipeline producing high-converting short-form product commercials.",
    metrics: "3.1x ad click-through rate surge with 3D product explainer motion assets.",
    tech_stack: ["Cinema4D", "Blender", "After Effects", "Design Tokens"],
    is_published: true
  }
];

// STRICTLY INTERNAL: Private Developer Vault (Isolated to /admin)
export const INITIAL_DEV_VAULT: InternalDevVaultMember[] = [
  {
    id: "dev-01",
    full_name: "Jahid Ahsan",
    internal_contact: "+880 1629-944975",
    telegram_handle: "@jahid_ue5",
    primary_stack: "Game Systems, UE5, C++, VR Optimization",
    tier: "Active Core",
    is_available: true,
    status: "Active Sprint",
    notes: "Lead on Unreal Engine 5 production unit, VR net-prediction, and locked 60+ FPS stabilization.",
    assigned_squad_slugs: ["game-dev"]
  },
  {
    id: "dev-02",
    full_name: "Ismail Hossain",
    internal_contact: "+880 1711-234567",
    telegram_handle: "@ismail_devops",
    primary_stack: "DevOps, Infrastructure, AI-Ops, Automation, Kubernetes, Envoy",
    tier: "Active Core",
    is_available: true,
    status: "Available for Allocation",
    notes: "Lead on Redis Sentinel failover, 47k QPS Envoy ingress, and kagent SRE cluster.",
    assigned_squad_slugs: ["devops", "automation"]
  },
  {
    id: "dev-03",
    full_name: "Raju A.",
    internal_contact: "+880 1811-345678",
    telegram_handle: "@raju_tracking",
    primary_stack: "Server-Side Tracking, GA4, Meta CAPI, PPC, BigQuery",
    tier: "Active Core",
    is_available: true,
    status: "Active Sprint",
    notes: "Lead on sGTM Stape.io containers, 548% Google Ads ROAS engine, and full-funnel attribution.",
    assigned_squad_slugs: ["growth-analytics"]
  },
  {
    id: "dev-04",
    full_name: "Minato & Team",
    internal_contact: "+880 1911-456789",
    telegram_handle: "@minato_commerce",
    primary_stack: "Shopify Liquid, Headless Storefronts, Hydrogen, Afterpay",
    tier: "Active Core",
    is_available: true,
    status: "Active Sprint",
    notes: "Lead commerce lab team for Tenmoku-Core, DAvila-Lux, and Searchaly-Core.",
    assigned_squad_slugs: ["shopify", "wordpress"]
  },
  {
    id: "dev-05",
    full_name: "Antor Ahmed",
    internal_contact: "+880 1511-567890",
    telegram_handle: "@antor_fullstack",
    primary_stack: "Full-Stack Systems, Flutter, APIs, Next.js, Supabase",
    tier: "Active Core",
    is_available: true,
    status: "Available for Allocation",
    notes: "Lead on Micro-SaaS portals, Flutter logistics suite, and multitenant PostgreSQL architectures.",
    assigned_squad_slugs: ["web-systems"]
  },
  {
    id: "dev-06",
    full_name: "Imran, Sajjat, Sadman",
    internal_contact: "+880 1611-678901",
    telegram_handle: "@voltx_creative_unit",
    primary_stack: "Creative, Motion, Identity, Cinema4D, Blender, Design Tokens",
    tier: "Active Core",
    is_available: true,
    status: "Active Sprint",
    notes: "Integrated studio unit managing 3D procedural product rendering and design systems.",
    assigned_squad_slugs: ["creative"]
  },
  {
    id: "dev-07",
    full_name: "Kawsar, Maidul, Saif",
    internal_contact: "+880 1311-789012",
    telegram_handle: "@voltx_specialists_reserve",
    primary_stack: "Standby / On-Call Specialists, High-Concurrency QA, DB Migration",
    tier: "Standby",
    is_available: true,
    status: "Available for Allocation",
    notes: "On-call specialist reserve for burst sprint capacity and migration verification.",
    assigned_squad_slugs: ["devops", "shopify", "web-systems"]
  }
];

export const INITIAL_LEADS: ClientLead[] = [
  {
    id: "lead-01",
    squad_id: "sq-01",
    squad_slug: "shopify",
    client_email: "enterprise.director@acmecommerce.com",
    client_handle: "@acme_director",
    project_scope: "Headless store migration from legacy Magento to Shopify Plus Hydrogen with custom checkout UI extension.",
    budget_bracket: "$7k+",
    preferred_channel: "Telegram",
    assigned_dev_id: "dev-04",
    lead_status: "TG Contacted",
    created_at: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: "lead-02",
    squad_id: "sq-05",
    squad_slug: "devops",
    client_email: "cto@streamfast.io",
    client_handle: "@streamfast_cto",
    project_scope: "Need HA Redis Sentinel cluster failover optimization and Envoy ingress routing for 30k+ concurrent stream sessions.",
    budget_bracket: "$7k+",
    preferred_channel: "Telegram",
    assigned_dev_id: "dev-02",
    lead_status: "Assigned",
    created_at: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: "lead-03",
    squad_id: "sq-03",
    squad_slug: "automation",
    client_email: "operations@logixfin.com",
    client_handle: "@logix_ops",
    project_scope: "Deploying self-hosted LLM incident analysis agent against Prometheus alerts in our private VPC.",
    budget_bracket: "$3k-$7k",
    preferred_channel: "Telegram",
    lead_status: "New Lead",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];
