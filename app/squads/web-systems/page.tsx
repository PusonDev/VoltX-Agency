import React from "react";
import type { Metadata } from "next";
import { SquadPageTemplate } from "@/components/SquadPageTemplate";
import { voltxStore } from "@/lib/store";

export const metadata: Metadata = {
  title: "Web Systems & Apps | Scalable Full-Stack Engineering & Micro-SaaS",
  description:
    "Next.js enterprise frontends, TypeScript REST/GraphQL APIs, Flutter mobile architectures, and secure Supabase/PostgreSQL multitenant systems.",
  keywords: ["Next.js", "Full-Stack Engineering", "TypeScript APIs", "Flutter", "Supabase", "PostgreSQL", "VoltX Agency"],
  alternates: { canonical: "/squads/web-systems" },
  openGraph: {
    title: "VoltX Web Systems & Apps | Scalable Full-Stack Engineering & Micro-SaaS",
    description: "Next.js enterprise frontends, TypeScript APIs, Flutter mobile, and Supabase multitenant systems.",
    url: "/squads/web-systems",
    type: "website",
  },
};

export default function WebSystemsSquadPage() {
  const squad = voltxStore.getSquadBySlug("web-systems")!;
  const caseStudies = voltxStore.getCaseStudies(squad?.id);

  return (
    <SquadPageTemplate
      squad={squad}
      caseStudies={caseStudies}
      squadNumber="07"
      architecturalOverview={{
        title: "Full-Stack Enterprise Systems & Multitenant Micro-SaaS",
        description:
          "End-to-end full-stack web and mobile engineering leveraging Next.js App Router, TypeScript API layers with strict Zod validation, Flutter cross-platform mobile apps, and Supabase Row Level Security.",
        specs: [
          { label: "Frontend Stack", value: "Next.js App Router / React Server Components" },
          { label: "Mobile Architecture", value: "Flutter / Offline-First SQLite Sync" },
          { label: "Database Layer", value: "PostgreSQL / Supabase Multitenant RLS" },
          { label: "API Latency", value: "40ms p95 on Serverless Edge Routes" },
        ],
      }}
    />
  );
}
