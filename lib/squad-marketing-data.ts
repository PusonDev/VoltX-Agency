import { SquadSlug } from "./types";

export interface ProblemSolutionItem {
  industryProblem: string;
  voltxSolution: string;
}

export interface PipelineMilestone {
  stepNumber: string;
  title: string;
  timeframe: string;
  description: string;
  deliverables: string[];
}

export interface EngagementTier {
  name: string;
  badge: string;
  recommendedFor: string;
  timeframe: string;
  deliverables: string[];
  ctaLabel: string;
  isPopular?: boolean;
}

export interface NicheFAQ {
  question: string;
  answer: string;
}

export interface NicheMarketingConfig {
  slug: SquadSlug;
  badge: string;
  heroHeadline: string;
  heroSub: string;
  visualizerType: "ecommerce" | "cms" | "neural" | "analytics" | "cloud" | "physics" | "edge" | "kinetic";
  colorHex: string;
  metrics: { label: string; value: string; sub: string }[];
  problemsVsSolutions: ProblemSolutionItem[];
  pipeline: PipelineMilestone[];
  tiers: EngagementTier[];
  faqs: NicheFAQ[];
  specs: { label: string; value: string }[];
  overviewTitle: string;
  overviewDescription: string;
}

export const SQUAD_MARKETING_DATA: Record<SquadSlug, NicheMarketingConfig> = {
  shopify: {
    slug: "shopify",
    badge: "ENTERPRISE COMMERCE LABORATORY",
    heroHeadline: "Enterprise Headless Shopify & High-Conversion Hydrogen Infrastructure",
    heroSub:
      "We replace bloated liquid theme architectures with decoupled Next.js & Shopify Hydrogen edge storefronts. Sub-second transitions, custom checkout extensibility, and zero third-party plugin drag.",
    visualizerType: "ecommerce",
    colorHex: "#00E599", // Volt Mint
    metrics: [
      { label: "Core Web Vitals", value: "99+", sub: "Mobile Lighthouse Score" },
      { label: "CLS (Layout Shift)", value: "0.00", sub: "Zero Visual Jitter" },
      { label: "Checkout Concurrency", value: "10,000+", sub: "Orders / Minute Without Fail" },
      { label: "TTFB (Time to First Byte)", value: "<45ms", sub: "Global Edge Rendered" },
    ],
    overviewTitle: "Decoupled Headless Shopify Engine & Checkout Extensibility",
    overviewDescription:
      "Monolithic Shopify stores suffer from cumulative script overhead, app conflict crashes, and rigid theme constraints. Our commerce squad decouples frontend presentation from Shopify backend logic using Storefront GraphQL, custom checkout UI extensions, and global edge caching.",
    specs: [
      { label: "Storefront Runtime", value: "Shopify Hydrogen / Next.js App Router" },
      { label: "Data Protocol", value: "Storefront GraphQL & Bulk Admin Webhooks" },
      { label: "Checkout Framework", value: "Shopify Checkout Extensibility UI" },
      { label: "Edge Delivery", value: "Cloudflare Workers / Fastly Compute" },
      { label: "Inventory Sync", value: "Real-time Redis Event Streams" },
      { label: "Search Engine", value: "Algolia / Meilisearch Micro-Index" },
    ],
    problemsVsSolutions: [
      {
        industryProblem: "Generic Liquid themes bloated with 30+ unoptimized Shopify apps degrading mobile conversion rates.",
        voltxSolution: "Zero-app frontend runtime. All custom logic compiled natively into lightweight Next.js edge modules.",
      },
      {
        industryProblem: "Rigid standard checkout flows that lose 20-30% of high-intent enterprise buyers at final payment steps.",
        voltxSolution: "Custom Shopify Plus Checkout Extensions: 1-click upsells, custom tax/VAT calculators, and automated fraud gating.",
      },
      {
        industryProblem: "Flash sales crash the store during peak Black Friday / holiday traffic spikes.",
        voltxSolution: "Distributed edge queuing and headless inventory buffer handling 10,000+ simultaneous checkouts.",
      },
      {
        industryProblem: "Vendor lock-in and impossible-to-maintain custom codebase with zero documentation.",
        voltxSolution: "Sanitized TypeScript codebase, modular component libraries, and comprehensive architecture blueprints provided.",
      },
    ],
    pipeline: [
      {
        stepNumber: "01",
        title: "Storefront & Script Audit",
        timeframe: "Day 1 – 2",
        description: "Deep profiling of existing Liquid assets, app script payloads, GraphQL schema dependencies, and cart bottleneck analysis.",
        deliverables: ["Script Payload Heatmap", "GraphQL Query Architecture", "Edge Caching Strategy"],
      },
      {
        stepNumber: "02",
        title: "Headless Engine Prototyping",
        timeframe: "Day 3 – 7",
        description: "Scaffolding Next.js / Hydrogen edge storefront, connecting Storefront GraphQL APIs, and custom checkout extensions.",
        deliverables: ["Fully Functional Edge Cart", "0.00 CLS Component System", "Dynamic Product Detail Routes"],
      },
      {
        stepNumber: "03",
        title: "Stress Testing & Zero-Downtime Migration",
        timeframe: "Day 8 – 10",
        description: "Simulating 5,000+ concurrent checkouts, verifying webhook idempotency, DNS cutover, and real-time conversion monitoring.",
        deliverables: ["Load Test Verification Report", "Automated Fallback Router", "Full Code Repository Handover"],
      },
    ],
    tiers: [
      {
        name: "Headless Architecture Audit",
        badge: "RAPID EVALUATION",
        recommendedFor: "Brands wanting to identify why their Shopify store is slow and losing cart conversions.",
        timeframe: "2 – 3 Days",
        deliverables: [
          "Full Liquid & App Script Performance Profile",
          "Checkout Extensibility Migration Blueprint",
          "GraphQL Query Optimization Plan",
          "Actionable 15-Minute Senior Architect Briefing",
        ],
        ctaLabel: "Scope Architecture Audit",
      },
      {
        name: "Full Storefront Sprint",
        badge: "CORE IMPLEMENTATION",
        recommendedFor: "DTC & B2B brands scaling beyond $1M ARR needing sub-second headless storefronts.",
        timeframe: "10 – 14 Days",
        deliverables: [
          "Complete Next.js / Hydrogen Headless Storefront",
          "Custom Checkout Extensibility Upsells & Logic",
          "Global Edge Caching (<45ms TTFB)",
          "Algolia / Meilisearch Instant Predictive Search",
          "30-Day Post-Launch SLA Warranty",
        ],
        ctaLabel: "Scope Storefront Sprint",
        isPopular: true,
      },
      {
        name: "Enterprise Dedicated Pod",
        badge: "RETAINER SQUAD",
        recommendedFor: "High-volume commerce brands requiring continuous conversion optimization & feature rollouts.",
        timeframe: "Monthly Retainer",
        deliverables: [
          "Dedicated Senior Commerce Architects",
          "Guaranteed 15-Minute Emergency SLA",
          "Continuous A/B Checkout Experimentation",
          "Multi-Currency & International ERP Integrations",
          "Private Slack / Telegram Dedicated Channel",
        ],
        ctaLabel: "Reserve Dedicated Pod",
      },
    ],
    faqs: [
      {
        question: "Can we still use our existing Shopify apps and product catalog?",
        answer: "Yes. Your product catalog, orders, customers, and backend inventory remain securely inside Shopify. We query them through Storefront GraphQL, replacing front-facing slow app scripts with edge-compiled microservices.",
      },
      {
        question: "Will our SEO and existing rankings be affected during migration?",
        answer: "We perform 1:1 URL mapping, automated 301 redirects, schema JSON-LD validation, and canonical tag preservation. Headless stores typically experience an SEO boost due to achieving 95+ Mobile Core Web Vitals.",
      },
      {
        question: "Who owns the code upon sprint completion?",
        answer: "You own 100% of the intellectual property, code repositories, design tokens, and infrastructure configurations. No vendor lock-in, ever.",
      },
      {
        question: "How fast can we launch if we have an upcoming marketing campaign?",
        answer: "Our sprint model is engineered for speed. Rapid audits complete in 48-72 hours, and standard headless migrations deploy within 10 to 14 business days.",
      },
    ],
  },

  wordpress: {
    slug: "wordpress",
    badge: "CMS ENGINEERING SQUAD",
    heroHeadline: "Decoupled Headless WordPress & High-Concurrency WooCommerce Systems",
    heroSub:
      "Eliminate monolithic PHP execution bottlenecks. We decouple WordPress editorial workflows using WPGraphQL and Next.js ISR, protected by enterprise Redis object caching and Cloudflare edge proxies.",
    visualizerType: "cms",
    colorHex: "#38BDF8", // Electric Sky
    metrics: [
      { label: "Page Load Speed", value: "< 250ms", sub: "Globally Cached Dynamic Pages" },
      { label: "Database Load Reduction", value: "92%", sub: "Via Persistent Object Cache" },
      { label: "Concurrent WooCommerce Checkouts", value: "5,000+", sub: "Zero MySQL Lockups" },
      { label: "Editorial Workflow", value: "100%", sub: "Native Gutenberg Retained" },
    ],
    overviewTitle: "WPGraphQL Decoupled Platform with Zero PHP Monolith Drag",
    overviewDescription:
      "WordPress is the world's most versatile CMS, but traditional theme architectures collapse under heavy traffic or dynamic database queries. We preserve the familiar Gutenberg editorial interface while serving lightning-fast headless Next.js frontend pages from edge CDNs.",
    specs: [
      { label: "Frontend Layer", value: "Next.js App Router with Incremental Static Regeneration" },
      { label: "API Gateway", value: "WPGraphQL + DataLoader Query Batching" },
      { label: "Cache Engine", value: "Redis Object Cache Pro + Varnish HTTP Accelerator" },
      { label: "Server Architecture", value: "PHP 8.3 FPM + Nginx Microcaching + MariaDB Galera" },
      { label: "Block System", value: "Custom React/Gutenberg Native Block Components" },
      { label: "Security Layer", value: "Cloudflare WAF + Restrictive REST API Endpoints" },
    ],
    problemsVsSolutions: [
      {
        industryProblem: "Heavy Elementor or generic page builders injecting hundreds of CSS/JS files slowing page load to 5+ seconds.",
        voltxSolution: "Bespoke Next.js edge frontend with sub-100kb JS bundles and instantaneous client-side page routing.",
      },
      {
        industryProblem: "WooCommerce crashes or slows to a crawl during high-traffic checkout spikes due to unindexed MySQL queries.",
        voltxSolution: "Decoupled cart microservices with Redis session storage and background transaction queuing.",
      },
      {
        industryProblem: "Frequent plugin updates breaking the production site and causing white screens of death.",
        voltxSolution: "Headless architecture isolates frontend from backend. Content updates never destabilize production builds.",
      },
      {
        industryProblem: "Vulnerabilities in third-party plugins exposing sensitive customer data and database credentials.",
        voltxSolution: "Backend WordPress is placed in a private VPC behind Cloudflare Access; only public GraphQL is exposed.",
      },
    ],
    pipeline: [
      {
        stepNumber: "01",
        title: "Database Profiling & Schema Mapping",
        timeframe: "Day 1 – 2",
        description: "Tracing slow MySQL queries, auditing existing custom post types, and designing clean WPGraphQL query schemas.",
        deliverables: ["Query Performance Report", "WPGraphQL Custom Types Blueprint", "Redis Caching Setup"],
      },
      {
        stepNumber: "02",
        title: "Decoupled Next.js Frontend Construction",
        timeframe: "Day 3 – 7",
        description: "Building the custom Next.js frontend with Gutenberg block hydration, dynamic routing, and instant cart state.",
        deliverables: ["Headless Next.js Prototype", "Gutenberg Block Component Library", "Cart & Checkout Bridge"],
      },
      {
        stepNumber: "03",
        title: "Load Benchmarking & Deployment",
        timeframe: "Day 8 – 10",
        description: "Stress-testing WooCommerce with 1,000 req/sec, configuring ISR revalidation webhooks, and production deployment.",
        deliverables: ["Load Test SLA Verification", "Automated ISR Revalidation Webhooks", "Production Handover"],
      },
    ],
    tiers: [
      {
        name: "WordPress Performance Audit",
        badge: "RAPID DIAGNOSTIC",
        recommendedFor: "Businesses experiencing slow load times, high server costs, or frequent WooCommerce checkout timeouts.",
        timeframe: "2 Days",
        deliverables: [
          "Complete MySQL Query & Plugin Payload Audit",
          "Headless vs Monolithic Cost-Benefit Roadmap",
          "Redis Object Caching Optimization Guide",
          "Direct Senior Architect Technical Review",
        ],
        ctaLabel: "Scope WordPress Audit",
      },
      {
        name: "Headless WP Modernization",
        badge: "FLAGSHIP SPRINT",
        recommendedFor: "Publishers & WooCommerce merchants requiring sub-second speed without giving up WordPress CMS.",
        timeframe: "10 – 14 Days",
        deliverables: [
          "Complete Decoupled Next.js Frontend",
          "WPGraphQL Setup with Custom Block Hydration",
          "Redis Object Cache Pro Configuration",
          "Cloudflare Enterprise Edge Caching Rules",
          "Zero-Downtime Production Cutover",
        ],
        ctaLabel: "Scope Modernization Sprint",
        isPopular: true,
      },
      {
        name: "Enterprise WooCommerce Retainer",
        badge: "DEDICATED UNIT",
        recommendedFor: "Enterprise high-SKU stores needing continuous architecture maintenance and zero-downtime scaling.",
        timeframe: "Monthly Retainer",
        deliverables: [
          "24/7 Monitored Uptime & Auto-Failover",
          "Custom Plugin Development & API Bridges",
          "Priority 15-Minute Direct SLA",
          "Dedicated WordPress Infrastructure Specialist",
        ],
        ctaLabel: "Retain WooCommerce Unit",
      },
    ],
    faqs: [
      {
        question: "Will our content team still use the familiar WordPress admin?",
        answer: "Yes! Your editors continue writing and publishing inside the standard WordPress Gutenberg dashboard. The moment they hit Publish, an ISR webhook revalidates the edge page in under 300ms.",
      },
      {
        question: "Can we migrate our existing WooCommerce data without losing orders?",
        answer: "Absolutely. All customers, order histories, coupons, and inventory remain completely intact in your WooCommerce database.",
      },
      {
        question: "What hosting do we need for a headless WordPress setup?",
        answer: "We typically host the backend WordPress on an optimized cloud VPS (AWS, DigitalOcean, or Kinsta) and the frontend on Vercel or Cloudflare Pages for global edge distribution.",
      },
      {
        question: "How does this prevent security hacks?",
        answer: "Because visitors interact only with the static Next.js frontend, the WordPress admin and database are never publicly exposed to direct DDoS or SQL injection vectors.",
      },
    ],
  },

  automation: {
    slug: "automation",
    badge: "AUTONOMOUS SYSTEMS SQUAD",
    heroHeadline: "Autonomous Enterprise Workflow Automation & AI Agent Orchestration",
    heroSub:
      "Stop losing hundreds of billable hours to fragmented manual tasks. We engineer self-healing automation pipelines, custom n8n/Python backbones, and secure LLM agent orchestration with zero API leak risk.",
    visualizerType: "neural",
    colorHex: "#A855F7", // Neon Violet
    metrics: [
      { label: "Manual Hours Saved", value: "85%+", sub: "Across Operations & Data Ops" },
      { label: "Pipeline Reliability", value: "99.98%", sub: "With Automated Fallback Queues" },
      { label: "Execution Latency", value: "< 120ms", sub: "Event-Driven Webhook Dispatch" },
      { label: "Zero-Leak Security", value: "100%", sub: "Air-Gapped Private LLM Bridges" },
    ],
    overviewTitle: "Event-Driven Autonomous Backbones & Secure Agentic Workflows",
    overviewDescription:
      "Off-the-shelf Zapier integrations break easily, leak data across third-party cloud hosts, and quickly become cost-prohibitive at scale. Our automation laboratory builds enterprise-grade, self-hosted automation engines using n8n, Python Celery, RabbitMQ, and private AI agent meshes.",
    specs: [
      { label: "Workflow Engine", value: "Self-Hosted n8n Enterprise / Temporal.io" },
      { label: "Async Task Broker", value: "Celery + Redis / RabbitMQ Queue" },
      { label: "AI Agent Orchestration", value: "LangChain / LangGraph + Anthropic/OpenAI APIs" },
      { label: "Webhook Ingestion", value: "High-Throughput Go / Fastify Micro-Gateways" },
      { label: "Data Transformations", value: "Python / Pandas / DuckDB Real-Time Engines" },
      { label: "Audit & Telemetry", value: "OpenTelemetry + Grafana Loki Log Streams" },
    ],
    problemsVsSolutions: [
      {
        industryProblem: "Zapier or Make bills escalating into thousands of dollars monthly with brittle multi-step zaps that break silently.",
        voltxSolution: "Self-hosted high-throughput pipeline infrastructure with retry queues, dead-letter logging, and zero per-run fees.",
      },
      {
        industryProblem: "Sensitive customer data and internal financials sent through unsecured third-party SaaS automation hubs.",
        voltxSolution: "Encrypted, VPC-isolated automation engines with local key management and strict GDPR/HIPAA compliance controls.",
      },
      {
        industryProblem: "Manual copy-pasting between CRM, billing, logistics, and communication channels causing human error.",
        voltxSolution: "Real-time bi-directional synchronization with automated validation gates and instant error alert webhooks.",
      },
      {
        industryProblem: "Unreliable AI integrations hallucinating answers or failing without fallbacks.",
        voltxSolution: "Deterministic AI agent routing with human-in-the-loop review triggers and schema-validated JSON outputs.",
      },
    ],
    pipeline: [
      {
        stepNumber: "01",
        title: "Operational Bottleneck Discovery",
        timeframe: "Day 1 – 2",
        description: "Mapping existing manual data entry, identifying API endpoints, webhooks, and outlining data schema transformations.",
        deliverables: ["Workflow Architecture Diagram", "API Schema Mapping", "ROI & Time Savings Projection"],
      },
      {
        stepNumber: "02",
        title: "Pipeline Construction & Agentic Mesh",
        timeframe: "Day 3 – 7",
        description: "Deploying self-hosted n8n/Python backbones, configuring webhook receivers, and building AI agent validation steps.",
        deliverables: ["Production Automation Backbone", "Error-Handling & Dead-Letter Queue", "Live Test Run Logs"],
      },
      {
        stepNumber: "03",
        title: "Stress Testing & Team Telemetry Handover",
        timeframe: "Day 8 – 10",
        description: "Simulating edge-case failures, training your team on telemetry alerts, and delivering full workflow blueprints.",
        deliverables: ["Stress Test & Retry Verification", "Operational Dashboard Handover", "Complete Documentation"],
      },
    ],
    tiers: [
      {
        name: "Workflow Discovery & Blueprint",
        badge: "FEASIBILITY SPRINT",
        recommendedFor: "Teams drowning in manual processes wanting a concrete engineering roadmap before building.",
        timeframe: "2 – 3 Days",
        deliverables: [
          "Comprehensive Operational Bottleneck Audit",
          "Automated Architecture & Tooling Blueprint",
          "Security & Data Isolation Risk Assessment",
          "Senior Automation Architect Strategy Session",
        ],
        ctaLabel: "Scope Discovery Blueprint",
      },
      {
        name: "Core Pipeline Implementation",
        badge: "FULL BUILD SPRINT",
        recommendedFor: "Agencies, SaaS, and e-commerce brands needing 2-4 critical end-to-end automated workflows deployed.",
        timeframe: "7 – 10 Days",
        deliverables: [
          "Self-Hosted n8n / Python Workflow Engine",
          "Up to 4 High-Volume End-to-End Pipelines",
          "Dead-Letter Auto-Retry & Error Alerting",
          "AI Document / Lead Parsing Microservice",
          "30-Day Operational Warranty & Handover",
        ],
        ctaLabel: "Scope Automation Sprint",
        isPopular: true,
      },
      {
        name: "Enterprise Agentic Retainer",
        badge: "CONTINUOUS AUTOMATION",
        recommendedFor: "Enterprises scaling rapidly requiring continuous pipeline creation and custom AI agent deployments.",
        timeframe: "Monthly Retainer",
        deliverables: [
          "Unlimited Workflow Sprint Iterations",
          "Custom LLM Fine-Tuning & Local Model Hosting",
          "15-Minute Critical Incident SLA",
          "Dedicated Senior Automation Engineer",
        ],
        ctaLabel: "Retain Automation Pod",
      },
    ],
    faqs: [
      {
        question: "Can these workflows connect to our proprietary internal software?",
        answer: "Yes. As long as your system has a REST API, GraphQL, database access, webhook triggers, or even email intake, we can build a deterministic bi-directional bridge.",
      },
      {
        question: "What happens if a third-party API goes down or rate-limits us?",
        answer: "We engineer dead-letter queues with exponential backoff. The system securely buffers incoming requests in Redis/RabbitMQ and retries automatically once the API recovers, preventing data loss.",
      },
      {
        question: "Is our proprietary company data safe when using AI agents?",
        answer: "Yes. We configure zero-data-retention API endpoints (or self-hosted local models like Llama 3 / Mistral) so your company data is never used for public model training.",
      },
      {
        question: "How difficult is it for our team to maintain after handover?",
        answer: "We provide visual workflow interfaces, clear error logging in Telegram/Slack, and thorough step-by-step documentation so non-technical staff can oversee day-to-day runs.",
      },
    ],
  },

  "growth-analytics": {
    slug: "growth-analytics",
    badge: "DATA ARCHITECTURE LAB",
    heroHeadline: "Multi-Touch Attribution & Server-Side Meta/Google CAPI Infrastructure",
    heroSub:
      "Stop wasting ad spend on unreliable client-side pixels. We engineer server-side conversions APIs, warehouse-first data pipelines, and deterministic attribution models with 95%+ event match quality.",
    visualizerType: "analytics",
    colorHex: "#F59E0B", // Amber Gold
    metrics: [
      { label: "CAPI Event Match Quality", value: "9.2/10", sub: "Industry Average is 6.1" },
      { label: "Ad Spend Efficiency Gain", value: "22-38%", sub: "Through Algorithmic Accuracy" },
      { label: "Signal Loss Recovery", value: "98%", sub: "Bypasses iOS / Adblockers" },
      { label: "Attribution Latency", value: "< 2.0s", sub: "Real-Time Warehouse Ingestion" },
    ],
    overviewTitle: "First-Party Server-Side Tracking & Warehouse-First Attribution",
    overviewDescription:
      "iOS 14+, Safari ITP, and ubiquitous browser adblockers destroy up to 40% of standard web tracking signals. Our data engineering squad builds first-party server-side tracking pipelines through Cloudflare Workers, Google Cloud, and BigQuery to feed conversion algorithms untampered purchase signals.",
    specs: [
      { label: "Server-Side Tagging", value: "Server-Side GTM on Cloudflare Workers / GCP" },
      { label: "Ad Platform APIs", value: "Meta CAPI, Google Enhanced Conversions, TikTok Events API" },
      { label: "Data Warehouse", value: "Google BigQuery / Snowflake / ClickHouse" },
      { label: "Attribution Engine", value: "Markov Chain & Shapley Multi-Touch Models" },
      { label: "Identity Resolution", value: "First-Party Persistent Cookies & SHA-256 Hashing" },
      { label: "Dashboard Layer", value: "Looker Studio / Metabase Real-Time BI" },
    ],
    problemsVsSolutions: [
      {
        industryProblem: "Meta ad spend optimization struggling due to iOS 14.5+ and browser adblockers masking 30-40% of sales.",
        voltxSolution: "Direct server-to-server CAPI stream sending first-party hashed customer telemetry directly from your backend.",
      },
      {
        industryProblem: "Discrepancies between Shopify analytics, Meta Ads Manager, and Google Ads leaving founders confused.",
        voltxSolution: "Single source of truth data warehouse unifying every impression, click, and transaction deterministically.",
      },
      {
        industryProblem: "Third-party tracking tools charging $500–$2,000/month while still sampling your traffic.",
        voltxSolution: "You own the server-side infrastructure on your own cloud. Zero SaaS subscription markups.",
      },
      {
        industryProblem: "Client-side tracking scripts slowing down frontend page load and hurting Core Web Vitals.",
        voltxSolution: "Offloading all tracking pixels to a single background edge request, saving up to 1.5 seconds of page load time.",
      },
    ],
    pipeline: [
      {
        stepNumber: "01",
        title: "Telemetry & Pixel Audit",
        timeframe: "Day 1 – 2",
        description: "Diagnosing event drop-offs, deduplication conflicts, and auditing your current Meta & Google tracking setup.",
        deliverables: ["Signal Loss Diagnostic Report", "Event Deduplication Audit", "Server-Side Architecture Plan"],
      },
      {
        stepNumber: "02",
        title: "Server-Side CAPI & Edge Container Deployment",
        timeframe: "Day 3 – 6",
        description: "Deploying Server-Side GTM on custom first-party subdomains, configuring Meta CAPI, Google Enhanced Conversions, and SHA-256 data normalization.",
        deliverables: ["Active Server-Side CAPI", "First-Party Cookie Preserver", "Full Event Deduplication (Browser + Server)"],
      },
      {
        stepNumber: "03",
        title: "Attribution Modeling & Verification",
        timeframe: "Day 7 – 9",
        description: "Verifying 9.0+ Meta Event Match Quality scores, building custom attribution reports, and training media buyers.",
        deliverables: ["Event Match Quality SLA Report", "Custom Looker/Metabase Dashboard", "Media Buyer Documentation"],
      },
    ],
    tiers: [
      {
        name: "Tracking & Signal Loss Audit",
        badge: "DIAGNOSTIC SPRINT",
        recommendedFor: "Brands spending $10k+/month on ads suspecting poor event matching or broken pixel attribution.",
        timeframe: "2 Days",
        deliverables: [
          "Complete Pixel vs Backend Discrepancy Audit",
          "Event Match Quality (EMQ) Diagnostic",
          "Server-Side CAPI Readiness Roadmap",
          "Senior Data Architect Review Call",
        ],
        ctaLabel: "Scope Tracking Audit",
      },
      {
        name: "Full Server-Side CAPI Setup",
        badge: "HIGH ROI SPRINT",
        recommendedFor: "E-commerce & lead gen businesses looking to feed clean conversion signals to Meta, Google, and TikTok.",
        timeframe: "5 – 7 Days",
        deliverables: [
          "Full Server-Side GTM on Custom Subdomain",
          "Meta Conversions API with 9.0+ EMQ Guarantee",
          "Google Enhanced Conversions Setup",
          "Zero Frontend Script Drag Optimization",
          "Full Event Deduplication & Validation",
        ],
        ctaLabel: "Scope CAPI Implementation",
        isPopular: true,
      },
      {
        name: "Enterprise Data Warehouse & BI",
        badge: "FULL DATA STACK",
        recommendedFor: "High-scale brands spending $50k+/month needing multi-touch attribution and real-time P&L dashboards.",
        timeframe: "14 Days",
        deliverables: [
          "BigQuery / ClickHouse Warehouse Setup",
          "Multi-Touch Attribution Modeling",
          "Real-Time Executive BI Dashboard",
          "Ongoing Event Health Monitoring & SLA",
        ],
        ctaLabel: "Scope Enterprise Data Stack",
      },
    ],
    faqs: [
      {
        question: "How quickly will we see an improvement in ad performance?",
        answer: "Typically within 7 to 14 days after Meta and Google algorithms ingest the newly recovered 9.0+ Event Match Quality signals and optimize bidding models accordingly.",
      },
      {
        question: "Does server-side tracking slow down our website?",
        answer: "No, it does the exact opposite! By removing heavy client-side tracking scripts and replacing them with a single background edge request, your website loads significantly faster.",
      },
      {
        question: "What platforms do you support?",
        answer: "Shopify, WooCommerce, custom Next.js/React web apps, Laravel, Webflow, and custom backend APIs.",
      },
      {
        question: "Is this compliant with privacy laws like GDPR and CCPA?",
        answer: "Yes. Because you own the server-side container, you have granular control over user consent gating, ensuring no data is passed without explicit opt-in compliance.",
      },
    ],
  },

  devops: {
    slug: "devops",
    badge: "SITE RELIABILITY & CLOUD LAB",
    heroHeadline: "Multi-Cloud Infrastructure, Kubernetes & Zero-Downtime CI/CD Engineering",
    heroSub:
      "Eliminate server crashes and fragile manual deployments. We architect automated Kubernetes clusters, Terraform infrastructure-as-code, and sub-minute CI/CD deployment pipelines with 99.99% uptime SLAs.",
    visualizerType: "cloud",
    colorHex: "#10B981", // Emerald
    metrics: [
      { label: "Infrastructure Uptime SLA", value: "99.99%", sub: "High-Availability Multi-Zone" },
      { label: "Deployment Duration", value: "< 90s", sub: "Zero-Downtime Blue/Green Cutover" },
      { label: "Automated Failover", value: "< 15s", sub: "Multi-Region Traffic Rerouting" },
      { label: "Cloud Cost Optimization", value: "30-50%", sub: "Through Proper Rightsizing" },
    ],
    overviewTitle: "Deterministic Infrastructure as Code & High-Availability K8s Pods",
    overviewDescription:
      "Manual cloud console setups create unreplicable snowflake servers, hidden security vulnerabilities, and catastrophic downtime during traffic surges. Our DevOps laboratory codifies your entire cloud architecture in Terraform, orchestrates hardened Kubernetes containers, and builds immutable CI/CD pipelines.",
    specs: [
      { label: "Container Orchestration", value: "Kubernetes (EKS / GKE / K3s) + Helm" },
      { label: "Infrastructure as Code", value: "Terraform / OpenTofu + Terragrunt" },
      { label: "CI/CD Pipelines", value: "GitHub Actions / GitLab CI + ArgoCD GitOps" },
      { label: "Monitoring & Alerting", value: "Prometheus + Grafana + PagerDuty / Telegram" },
      { label: "Security & Secrets", value: "HashiCorp Vault + AWS Secrets Manager" },
      { label: "Traffic Balancing", value: "Traefik / Nginx Ingress + Cloudflare Magic Transit" },
    ],
    problemsVsSolutions: [
      {
        industryProblem: "Deployments require taking the website offline or causing broken sessions and 502 errors.",
        voltxSolution: "Automated blue/green or canary deployment pipelines ensuring exactly zero seconds of user downtime.",
      },
      {
        industryProblem: "Cloud bills on AWS or GCP ballooning out of control with zombie resources and unoptimized instances.",
        voltxSolution: "Rigorous cloud architecture rightsizing, spot-instance orchestration, and auto-scaling saving 30-50% monthly.",
      },
      {
        industryProblem: "A single hardware or data center outage brings down your entire application.",
        voltxSolution: "Multi-availability zone and multi-region failover topology with automatic DNS health-check switching.",
      },
      {
        industryProblem: "Security vulnerabilities and hardcoded API keys leaked in code repositories.",
        voltxSolution: "Automated SAST security scanning, zero-trust network policies, and encrypted dynamic secret injection.",
      },
    ],
    pipeline: [
      {
        stepNumber: "01",
        title: "Cloud Infrastructure & Cost Audit",
        timeframe: "Day 1 – 2",
        description: "Auditing existing AWS/GCP setups, identifying single points of failure, security holes, and cost leakage.",
        deliverables: ["Cloud Reliability Scorecard", "Cost Rightsizing Report", "Target Infrastructure Architecture"],
      },
      {
        stepNumber: "02",
        title: "Terraform & Container Orchestration",
        timeframe: "Day 3 – 7",
        description: "Codifying infrastructure in Terraform, provisioning container clusters, and configuring automated secret management.",
        deliverables: ["Complete Terraform Repository", "Hardened Kubernetes / Docker Cluster", "CI/CD Pipeline Configurations"],
      },
      {
        stepNumber: "03",
        title: "Failover Simulation & Telemetry Cutover",
        timeframe: "Day 8 – 10",
        description: "Executing chaos engineering drills (killing nodes, simulating DDoS spikes), setting up Grafana alerts, and cutover.",
        deliverables: ["Chaos Test Resilience Report", "24/7 Telemetry Alert Channels", "Infrastructure Handover Guide"],
      },
    ],
    tiers: [
      {
        name: "Cloud Reliability & Security Audit",
        badge: "SECURITY ASSESSMENT",
        recommendedFor: "Companies preparing for high-traffic events or seeking to cut 30%+ from their AWS/GCP bills.",
        timeframe: "2 – 3 Days",
        deliverables: [
          "Infrastructure Single-Point-of-Failure Audit",
          "Cloud Spend Rightsizing Action Plan",
          "Vulnerability & IAM Security Review",
          "Senior SRE Technical Strategy Session",
        ],
        ctaLabel: "Scope Cloud Audit",
      },
      {
        name: "Zero-Downtime DevOps Sprint",
        badge: "CORE INFRASTRUCTURE",
        recommendedFor: "SaaS products and commerce platforms needing scalable Kubernetes clusters and automated CI/CD.",
        timeframe: "10 – 14 Days",
        deliverables: [
          "Complete Terraform Infrastructure as Code",
          "Hardened Kubernetes Cluster with Auto-Scaling",
          "Automated GitHub Actions CI/CD Pipeline",
          "Prometheus & Grafana Alerting Setup",
          "Zero-Downtime Migration Guarantee",
        ],
        ctaLabel: "Scope DevOps Sprint",
        isPopular: true,
      },
      {
        name: "24/7 Site Reliability Retainer",
        badge: "ON-CALL SRE POD",
        recommendedFor: "Mission-critical applications requiring round-the-clock incident response and 99.99% uptime guarantees.",
        timeframe: "Monthly Retainer",
        deliverables: [
          "Dedicated 15-Minute Critical Incident SLA",
          "Continuous Vulnerability & Patch Management",
          "Disaster Recovery Drills & Backup Verification",
          "Direct Telegram / PagerDuty Emergency Line",
        ],
        ctaLabel: "Retain SRE Pod",
      },
    ],
    faqs: [
      {
        question: "Which cloud providers do you support?",
        answer: "We support AWS, Google Cloud Platform (GCP), DigitalOcean, Hetzner Cloud, Microsoft Azure, and bare-metal hybrid setups.",
      },
      {
        question: "How do you guarantee zero downtime during deployment?",
        answer: "We use automated blue/green or rolling canary deployments: the new version of your app is fully booted, health-checked, and tested before traffic is rerouted at the router level.",
      },
      {
        question: "Will we be locked into your infrastructure management?",
        answer: "Never. All infrastructure is written cleanly in standard Terraform and standard Kubernetes manifests, stored in your own private GitHub repository.",
      },
      {
        question: "Can you help lower our existing AWS / cloud bills?",
        answer: "Yes! Most clients see an immediate 30% to 50% cloud cost reduction through container rightsizing, reserved instance planning, and removing redundant load balancers.",
      },
    ],
  },

  "game-dev": {
    slug: "game-dev",
    badge: "INTERACTIVE SIMULATION LAB",
    heroHeadline: "WebGL / Three.js 3D Web Experiences & Cross-Platform Unity Systems",
    heroSub:
      "Transform flat websites into memorable interactive digital experiences. We engineer 60fps WebGL interactive visualizers, browser-based 3D product configurators, and custom Unity/Unreal gameplay systems.",
    visualizerType: "physics",
    colorHex: "#EC4899", // Laser Pink
    metrics: [
      { label: "Target Frame Rate", value: "60 FPS", sub: "Flawless Performance on Mobile" },
      { label: "Shader Optimization", value: "< 2.5MB", sub: "Ultra-Lightweight 3D Asset Bundles" },
      { label: "Interactive Engagement", value: "4.2x", sub: "Time-on-Page Increase" },
      { label: "Asset Compression", value: "70-85%", sub: "Draco & KTX2 Texture Encoding" },
    ],
    overviewTitle: "High-Performance 3D Shaders & WebGL Rendering Pipelines",
    overviewDescription:
      "Heavy, unoptimized 3D models can freeze browser tabs and alienate mobile users. Our interactive simulation squad uses custom GLSL shaders, Draco compression, and WebGL/WebGPU pipelines to deliver buttery-smooth 60fps interactive 3D simulations on any device.",
    specs: [
      { label: "Web 3D Runtime", value: "Three.js / React Three Fiber / WebGPU" },
      { label: "Shader Programming", value: "Custom GLSL / WGSL Fragment Shaders" },
      { label: "Game Engines", value: "Unity (C#) / Unreal Engine 5 (C++ / Blueprints)" },
      { label: "3D Asset Pipeline", value: "Blender ➔ GLTF / Draco / KTX2 Texture Pipeline" },
      { label: "Physics Simulation", value: "Rapier.js / Cannon-es / PhysX" },
      { label: "State Management", value: "Zustand Reactive Interaction State" },
    ],
    problemsVsSolutions: [
      {
        industryProblem: "3D websites that take 10+ seconds to load and crash on standard mobile smartphones.",
        voltxSolution: "Draco mesh compression, progressive LOD (Level of Detail), and lazy-loaded WebGL canvas contexts.",
      },
      {
        industryProblem: "Generic low-quality 3D models that look dated and amateurish.",
        voltxSolution: "Bespoke studio-grade 3D modeling, PBR metallic-roughness texturing, and dynamic cinematic post-processing.",
      },
      {
        industryProblem: "Clunky UI controls that frustrate non-gamer users trying to inspect products.",
        voltxSolution: "Intuitive touch gestures, gyroscope integration, and smooth camera tweening animations.",
      },
      {
        industryProblem: "Inability to integrate 3D experiences into standard e-commerce or conversion funnels.",
        voltxSolution: "Seamless bridge connecting 3D product configurators directly to Shopify, Stripe, or custom checkout carts.",
      },
    ],
    pipeline: [
      {
        stepNumber: "01",
        title: "Art Direction & Technical Feasibility",
        timeframe: "Day 1 – 2",
        description: "Defining art style, polycount budgets, interaction mechanics, and verifying target mobile browser benchmarks.",
        deliverables: ["Visual Moodboard & Wireframes", "Polycount & Texture Budget", "WebGL Feasibility Architecture"],
      },
      {
        stepNumber: "02",
        title: "3D Modeling, Shaders & Canvas Integration",
        timeframe: "Day 3 – 8",
        description: "Optimizing 3D assets, writing custom GLSL shaders, building camera animations, and connecting UI controls.",
        deliverables: ["Interactive 3D WebGL Prototype", "Custom GLSL Shader Effects", "Responsive Mobile Touch Controls"],
      },
      {
        stepNumber: "03",
        title: "Framerate Profiling & Production Polish",
        timeframe: "Day 9 – 12",
        description: "Profiling draw calls on low-tier mobile devices, optimizing GPU fill rates, and final deployment.",
        deliverables: ["60fps Performance Profiling Report", "Production-Ready React/Next Component", "Full Asset Source Files"],
      },
    ],
    tiers: [
      {
        name: "3D Web Prototype Sprint",
        badge: "PROOF OF CONCEPT",
        recommendedFor: "Brands seeking to validate an interactive 3D hero or product viewer concept before full build.",
        timeframe: "3 – 5 Days",
        deliverables: [
          "Single High-Impact 3D WebGL Interactive Component",
          "Optimized 3D Model with Draco Compression",
          "Smooth OrbitControls & Touch Support",
          "Technical Performance Benchmark Report",
        ],
        ctaLabel: "Scope 3D Prototype",
      },
      {
        name: "Full 3D Web Experience Sprint",
        badge: "FLAGSHIP IMMERSIVE",
        recommendedFor: "High-ticket brands and agencies wanting an awe-inspiring, award-winning interactive landing page.",
        timeframe: "12 – 16 Days",
        deliverables: [
          "Complete WebGL / Three.js Interactive Page",
          "Custom GLSL Shader Lighting & Post-Processing",
          "Interactive Product Configurator / Gamified Funnel",
          "Guaranteed 60 FPS Mobile Performance",
          "Checkout / Lead Capture System Integration",
        ],
        ctaLabel: "Scope Full 3D Sprint",
        isPopular: true,
      },
      {
        name: "Dedicated Simulation Pod",
        badge: "GAME ENGINE POD",
        recommendedFor: "Game studios and spatial computing enterprises building full Unity/WebGL simulations or multi-user worlds.",
        timeframe: "Monthly Retainer",
        deliverables: [
          "Senior Gameplay & Graphics Engineers",
          "Unity / Unreal Cross-Platform Pipeline",
          "Multiplayer WebSockets / WebRTC Infrastructure",
          "Priority Technical Support & Sprint Planning",
        ],
        ctaLabel: "Retain Game Dev Pod",
      },
    ],
    faqs: [
      {
        question: "Will this 3D experience work smoothly on mobile phones?",
        answer: "Yes! We design mobile-first with adaptive resolution scaling, Draco compression, and strict draw-call budgets ensuring stable 60fps on iPhones and Android devices.",
      },
      {
        question: "Can we use our existing CAD or 3D models?",
        answer: "Yes. We accept standard formats (OBJ, FBX, STEP, STL, BLEND) and retopologize them into ultra-efficient WebGL-ready GLTF assets.",
      },
      {
        question: "Does this interfere with our website's SEO?",
        answer: "No. The 3D canvas is layered alongside standard semantic HTML elements, keeping all your text, metadata, and headings 100% crawlable by Google.",
      },
      {
        question: "Can users purchase configured 3D products directly?",
        answer: "Yes. We regularly build 3D configurators with direct state bridges to Shopify, WooCommerce, or custom Stripe checkouts.",
      },
    ],
  },

  "web-systems": {
    slug: "web-systems",
    badge: "PRECISION ARCHITECTURE LAB",
    heroHeadline: "High-Scale Next.js Web Systems & Distributed Edge Microservices",
    heroSub:
      "Engineered for high-ticket SaaS and enterprise web platforms. We build clean Next.js App Router platforms, robust TypeScript architectures, and distributed edge microservices with sub-50ms global response times.",
    visualizerType: "edge",
    colorHex: "#00F0FF", // Electric Cyan
    metrics: [
      { label: "Global Edge Latency", value: "< 45ms", sub: "Distributed Edge Execution" },
      { label: "TypeScript Strictness", value: "100%", sub: "Zero Implicit Any / Sound Types" },
      { label: "Concurrent QPS", value: "50,000+", sub: "Serverless Edge Scaling" },
      { label: "Test Coverage", value: "95%+", sub: "Vitest & Playwright E2E Suites" },
    ],
    overviewTitle: "Modern Next.js App Router Architecture with Zero Technical Debt",
    overviewDescription:
      "Legacy single-page apps (SPAs) suffer from slow initial loads, complex client state bugs, and poor SEO. Our web systems squad crafts clean, modular Next.js platforms utilizing Server Components, edge caching, and scalable PostgreSQL/Prisma backbones.",
    specs: [
      { label: "Core Framework", value: "Next.js 15+ (App Router, Server Actions, PPR)" },
      { label: "Programming Language", value: "TypeScript (Strict Mode, Zod Validation)" },
      { label: "Database Layer", value: "PostgreSQL (Neon / Supabase) + Prisma ORM" },
      { label: "Edge Computing", value: "Cloudflare Workers / Vercel Edge Functions" },
      { label: "State & Cache", value: "Zustand + TanStack Query + Redis Edge Cache" },
      { label: "Testing Suite", value: "Vitest Unit Tests + Playwright End-to-End" },
    ],
    problemsVsSolutions: [
      {
        industryProblem: "Messy spaghetti code with hidden state bugs that makes adding simple new features take weeks.",
        voltxSolution: "Strict TypeScript domain architecture with decoupled UI components and Zod schema-validated boundaries.",
      },
      {
        industryProblem: "Initial page load is sluggish because the browser has to download 5MB of bloated JavaScript.",
        voltxSolution: "React Server Components streaming HTML directly from the edge with sub-100kb client bundle sizes.",
      },
      {
        industryProblem: "Database crashes when marketing runs a viral ad campaign causing thousands of sudden users.",
        voltxSolution: "Connection pooling with Prisma Accelerate and edge Redis caching preventing database saturation.",
      },
      {
        industryProblem: "Freelancers disappearing after shipping half-working code without any test coverage.",
        voltxSolution: "Automated CI/CD test gates, complete type safety, and clear architecture documentation.",
      },
    ],
    pipeline: [
      {
        stepNumber: "01",
        title: "System Design & Domain Modeling",
        timeframe: "Day 1 – 2",
        description: "Mapping database schemas, state machines, API boundaries, and outlining security authorization models.",
        deliverables: ["Entity Relationship Diagram", "API Specification Document", "Component Hierarchy Blueprint"],
      },
      {
        stepNumber: "02",
        title: "Full-Stack Sprint Engineering",
        timeframe: "Day 3 – 9",
        description: "Building Server Components, connecting databases, implementing authentication, and crafting polished responsive UI.",
        deliverables: ["Working Web Application Prototype", "Strict TypeScript Codebase", "Authenticated User Workflows"],
      },
      {
        stepNumber: "03",
        title: "Automated Testing & Edge Deployment",
        timeframe: "Day 10 – 14",
        description: "Writing Playwright end-to-end tests, load testing edge endpoints, and executing production deployment.",
        deliverables: ["Automated E2E Test Suite", "Sub-50ms Edge Deployment", "Full Handover & Architecture Walkthrough"],
      },
    ],
    tiers: [
      {
        name: "Codebase & Architecture Audit",
        badge: "CODE HEALTH AUDIT",
        recommendedFor: "Companies with existing React/Next.js codebases experiencing performance degradation or scaling friction.",
        timeframe: "2 – 3 Days",
        deliverables: [
          "Deep Static Code Analysis & Bundle Breakdown",
          "Database Query & Indexing Optimization Plan",
          "Next.js App Router Migration Roadmap",
          "Senior Web Systems Architect Consultation",
        ],
        ctaLabel: "Scope Architecture Audit",
      },
      {
        name: "Core Web System Sprint",
        badge: "PRODUCTION SPRINT",
        recommendedFor: "Founders & enterprises launching a high-performance web app, customer portal, or internal platform.",
        timeframe: "10 – 14 Days",
        deliverables: [
          "Complete Next.js App Router Web Platform",
          "PostgreSQL Database with Prisma ORM & Auth",
          "Tailwind CSS / Precision UI Design System",
          "Sub-50ms Global Edge Caching Setup",
          "Automated Testing Suite & 30-Day SLA",
        ],
        ctaLabel: "Scope Web System Sprint",
        isPopular: true,
      },
      {
        name: "Dedicated Engineering Pod",
        badge: "STAFF AUGMENTATION",
        recommendedFor: "Scaling tech companies needing a specialized high-output engineering pod to accelerate roadmap delivery.",
        timeframe: "Monthly Retainer",
        deliverables: [
          "Senior Full-Stack TypeScript Engineers",
          "Agile Sprint Delivery & Weekly Deployments",
          "Direct Slack / GitHub Collaboration",
          "15-Minute Guaranteed Critical Incident SLA",
        ],
        ctaLabel: "Retain Web Systems Pod",
      },
    ],
    faqs: [
      {
        question: "Do you build both frontend and backend?",
        answer: "Yes! We engineer full-stack web applications using Next.js Server Components, API routes, Server Actions, and cloud databases (PostgreSQL, Supabase, Redis).",
      },
      {
        question: "Can this system integrate with our existing APIs?",
        answer: "Easily. We construct strongly typed SDK layers and Zod schema validators to connect with any REST or GraphQL service.",
      },
      {
        question: "How do you ensure our codebase is maintainable long-term?",
        answer: "We follow strict TypeScript rules (zero 'any'), comprehensive automated testing, and write clean domain-driven code that your internal engineers can easily understand.",
      },
      {
        question: "Who owns the code upon completion?",
        answer: "You retain 100% intellectual property ownership and full control over private GitHub repositories and hosting accounts.",
      },
    ],
  },

  creative: {
    slug: "creative",
    badge: "DIGITAL PRESTIGE LAB",
    heroHeadline: "Cyberpunk Digital Brand Identity & High-Conversion UI/UX Systems",
    heroSub:
      "Elevate your brand beyond generic templates. We craft precision design tokens, custom micro-interactions, dark-mode cyberpunk aesthetics, and high-conversion landing page systems tailored for tech leaders.",
    visualizerType: "kinetic",
    colorHex: "#00E599", // Volt Mint
    metrics: [
      { label: "Design System Tokens", value: "250+", sub: "Typography, Colors, Spacing & HUD" },
      { label: "Conversion Lift", value: "45-70%", sub: "Through Visual Hierarchy Overhaul" },
      { label: "Micro-Interaction Latency", value: "< 16ms", sub: "60fps Hardware-Accelerated CSS" },
      { label: "Brand Prestige Perception", value: "Top 1%", sub: "Enterprise & Silicon Valley Caliber" },
    ],
    overviewTitle: "Precision Technical Aesthetics & High-Ticket Conversion Psychology",
    overviewDescription:
      "Enterprise decision-makers judge your technical competence within 3 seconds of viewing your digital presence. Generic Bootstrap themes and bland SaaS templates signal low quality. Our creative engineering squad fuses high-contrast typography, cyberpunk HUD accents, and glassmorphic micro-interactions to position you as an undisputed market authority.",
    specs: [
      { label: "Design System Tooling", value: "Figma Tokens Studio + Tailwind Design System" },
      { label: "Motion Architecture", value: "CSS Hardware Transform + Framer Motion Curves" },
      { label: "Typography Engine", value: "Syne / Space Grotesk / JetBrains Mono Stack" },
      { label: "Visual Language", value: "Precision Laboratory HUD + Dark Cyberpunk Glass" },
      { label: "Component Delivery", value: "Reusable React / Next.js Component Library" },
      { label: "Accessibility Target", value: "WCAG 2.1 AA High-Contrast Compliance" },
    ],
    problemsVsSolutions: [
      {
        industryProblem: "Generic SaaS websites using the exact same bland purple gradients and stock illustrations as thousands of others.",
        voltxSolution: "Bespoke high-contrast technical aesthetics with bespoke HUD borders, neon badges, and tailored typography.",
      },
      {
        industryProblem: "Designers delivering pretty Figma mockups that are impossible for developers to code smoothly.",
        voltxSolution: "Designed by creative engineers. Every component is delivered directly as clean, production-ready React/Tailwind code.",
      },
      {
        industryProblem: "Overwhelming visual clutter that distracts visitors from taking action or booking calls.",
        voltxSolution: "Laser-focused visual hierarchy that guides the client's eye directly to key value propositions and CTAs.",
      },
      {
        industryProblem: "Slow, clunky animations that cause mobile browsers to stutter and drop frames.",
        voltxSolution: "Lightweight CSS-only transitions and GPU-accelerated micro-interactions running at buttery-smooth 60fps.",
      },
    ],
    pipeline: [
      {
        stepNumber: "01",
        title: "Brand Strategy & Visual Direction",
        timeframe: "Day 1 – 2",
        description: "Analyzing competitor positioning, defining brand voice, moodboards, and establishing technical aesthetic direction.",
        deliverables: ["Visual Moodboard & Style Tile", "Typography & Color Palette System", "Hero Concept Exploration"],
      },
      {
        stepNumber: "02",
        title: "Design System & High-Fidelity UI",
        timeframe: "Day 3 – 7",
        description: "Crafting comprehensive Figma design tokens, responsive desktop/mobile layouts, and interactive micro-animations.",
        deliverables: ["Figma Design Token Library", "Complete Responsive Page Mockups", "Interactive Prototype"],
      },
      {
        stepNumber: "03",
        title: "Code Componentization & Polish",
        timeframe: "Day 8 – 10",
        description: "Translating designs into production-ready React/Tailwind code with 60fps micro-interactions and dark/light modes.",
        deliverables: ["Production React / Tailwind Components", "Figma Source Files Handover", "Brand Asset Styleguide"],
      },
    ],
    tiers: [
      {
        name: "Brand & UI/UX Audit",
        badge: "VISUAL DIAGNOSTIC",
        recommendedFor: "Companies whose current website looks outdated, unprofessional, or is failing to convert high-ticket clients.",
        timeframe: "2 Days",
        deliverables: [
          "Complete Visual Hierarchy & Conversion UX Audit",
          "Competitor Visual Differentiation Blueprint",
          "Color, Typography & Token Recommendations",
          "1-on-1 Creative Director Strategy Review",
        ],
        ctaLabel: "Scope Design Audit",
      },
      {
        name: "Flagship Digital Identity Sprint",
        badge: "COMPLETE OVERHAUL",
        recommendedFor: "Tech companies & high-ticket agencies wanting a world-class, authority-building digital presence.",
        timeframe: "8 – 12 Days",
        deliverables: [
          "Complete Visual Brand Identity System",
          "High-Conversion Landing Page & Sub-Pages",
          "Full Figma Design Tokens & Component Library",
          "Production-Ready React / Tailwind Code Delivery",
          "Dark & Light Mode High-Contrast Support",
        ],
        ctaLabel: "Scope Brand Overhaul",
        isPopular: true,
      },
      {
        name: "Ongoing Creative Studio Retainer",
        badge: "MONTHLY SQUAD",
        recommendedFor: "Fast-growing companies requiring continuous UI/UX updates, new landing pages, and campaign creatives.",
        timeframe: "Monthly Retainer",
        deliverables: [
          "Dedicated Creative Engineer & UI/UX Lead",
          "Continuous Feature & Page Design Sprints",
          "Priority 15-Minute Turnaround for Quick Assets",
          "Direct Collaboration in Slack / Telegram",
        ],
        ctaLabel: "Retain Creative Studio",
      },
    ],
    faqs: [
      {
        question: "Do you deliver only Figma files or working code as well?",
        answer: "Both! We provide complete Figma design token files AND clean, production-ready React / Next.js / Tailwind CSS components ready to drop directly into your repository.",
      },
      {
        question: "Can you redesign our site without changing our current backend?",
        answer: "Yes. We regularly redesign frontend presentation layers and design systems while keeping your existing backend, databases, and business logic intact.",
      },
      {
        question: "What makes your aesthetic convert better than generic templates?",
        answer: "We focus on technical authority: clean typography, clear visual hierarchy, scannable data badges, and removing cognitive friction so high-ticket clients immediately trust your engineering capability.",
      },
      {
        question: "Do you support dark mode and light mode?",
        answer: "Yes, every design system we create includes native high-contrast dark and light mode tokens calibrated for maximum legibility and prestige.",
      },
    ],
  },
};
