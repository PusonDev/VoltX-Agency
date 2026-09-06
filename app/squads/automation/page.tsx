import React from "react";
import type { Metadata } from "next";
import { SquadPageTemplate } from "@/components/SquadPageTemplate";
import { voltxStore } from "@/lib/store";

export const metadata: Metadata = {
  title: "AI-Ops & Intelligent Automation | Autonomous SRE Agents",
  description:
    "Self-hosted in-cluster LLM agents executing live PromQL queries, Drain3 log pattern classification, and distributed n8n scheduler fleets.",
  keywords: ["Autonomous SRE", "AI-Ops", "n8n Automation", "LLM Agents", "Drain3", "PromQL", "VoltX Agency"],
  alternates: { canonical: "/squads/automation" },
  openGraph: {
    title: "VoltX AI-Ops & Intelligent Automation | Autonomous SRE Agents & Log Clustering",
    description: "Self-hosted in-cluster LLM agents, Drain3 log clustering, and distributed n8n scheduler fleets.",
    url: "/squads/automation",
    type: "website",
  },
};

export default function AutomationSquadPage() {
  const squad = voltxStore.getSquadBySlug("automation")!;
  const caseStudies = voltxStore.getCaseStudies(squad?.id);

  return (
    <SquadPageTemplate
      squad={squad}
      caseStudies={caseStudies}
      squadNumber="03"
      architecturalOverview={{
        title: "Autonomous In-Cluster SRE & Streaming Pattern Clustering",
        description:
          "VoltX deploys private, in-cluster LLM agents querying Prometheus metrics via PromQL to produce deterministic root causes during alerts, alongside zero-overhead Drain3 log pattern trees.",
        specs: [
          { label: "SRE Agent Runtime", value: "Python / Ollama In-Cluster / Kubernetes" },
          { label: "Incident MTTR", value: "Reduced from 45m to 3.2m" },
          { label: "Pattern Compression", value: "346k lines into 378 patterns" },
          { label: "Workflow Throughput", value: "~151,000 jobs/day via Cronicle/n8n" },
        ],
      }}
    />
  );
}
