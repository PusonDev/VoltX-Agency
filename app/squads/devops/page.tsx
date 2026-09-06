import React from "react";
import type { Metadata } from "next";
import { SquadPageTemplate } from "@/components/SquadPageTemplate";
import { voltxStore } from "@/lib/store";

export const metadata: Metadata = {
  title: "Cloud & Infrastructure | HA Redis Sentinel, Envoy Ingress & 47k QPS",
  description:
    "Bare-metal to cloud orchestration, sub-second Redis failovers (500ms), 47,000+ QPS Envoy ingress at 6ms p99 latency, and 92 TB media gateways.",
  keywords: ["DevOps", "Kubernetes", "Redis Sentinel", "Envoy Proxy", "Terraform IaC", "ArgoCD GitOps", "VoltX Agency"],
  alternates: { canonical: "/squads/devops" },
  openGraph: {
    title: "VoltX Cloud & Infrastructure | HA Redis Sentinel, Envoy Ingress & 47k QPS",
    description: "Sub-second Redis failovers, 47k+ QPS Envoy ingress, and zero-downtime deployments.",
    url: "/squads/devops",
    type: "website",
  },
};

export default function DevOpsSquadPage() {
  const squad = voltxStore.getSquadBySlug("devops")!;
  const caseStudies = voltxStore.getCaseStudies(squad?.id);

  return (
    <SquadPageTemplate
      squad={squad}
      caseStudies={caseStudies}
      squadNumber="05"
      architecturalOverview={{
        title: "High-Concurrency Cloud & Sub-Second Database Failover",
        description:
          "VoltX Infrastructure Squad constructs hardened Redis Sentinel clusters slashing failovers from ~5s down to ~500ms, tunes Linux kernel socket buffers, and routes 47,000+ QPS through Envoy with 6ms p99 latency.",
        specs: [
          { label: "Redis Failover", value: "~500ms (10x reduction)" },
          { label: "Ingress Throughput", value: "47,000+ QPS @ 6ms p99" },
          { label: "Media Gateway", value: "92 TB Streaming Gateway (0.10% CPU)" },
          { label: "Migration Velocity", value: "10M+ keys in ~5 min sustained" },
        ],
      }}
    />
  );
}
