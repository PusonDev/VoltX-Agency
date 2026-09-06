import React from "react";
import type { Metadata } from "next";
import { SquadPageTemplate } from "@/components/SquadPageTemplate";
import { voltxStore } from "@/lib/store";

export const metadata: Metadata = {
  title: "Headless WordPress & WooCommerce Engineering",
  description:
    "WPGraphQL + Next.js decoupled platforms, custom Gutenberg block systems, enterprise-grade Redis object caching, and zero-bloat PHP architectures.",
  keywords: ["Headless WordPress", "WPGraphQL", "WooCommerce", "Next.js", "Redis Object Cache", "Gutenberg Blocks", "VoltX Agency"],
  alternates: { canonical: "/squads/wordpress" },
  openGraph: {
    title: "VoltX Enterprise WordPress | Headless WordPress & WooCommerce Engineering",
    description: "WPGraphQL + Next.js decoupled platforms, enterprise Redis caching, and zero-bloat PHP architectures.",
    url: "/squads/wordpress",
    type: "website",
  },
};

export default function WordPressSquadPage() {
  const squad = voltxStore.getSquadBySlug("wordpress")!;
  const caseStudies = voltxStore.getCaseStudies(squad?.id);

  return (
    <SquadPageTemplate
      squad={squad}
      caseStudies={caseStudies}
      squadNumber="02"
      architecturalOverview={{
        title: "Headless WordPress & High-Concurrency WooCommerce Architecture",
        description:
          "We decouple WordPress editorial systems from monolithic presentation by serving WPGraphQL endpoints to a Next.js edge-rendered frontend with Redis object caching and zero PHP bloat.",
        specs: [
          { label: "Decoupled Frontend", value: "Next.js App Router (ISR)" },
          { label: "GraphQL Layer", value: "WPGraphQL + DataLoader Batching" },
          { label: "Caching Infrastructure", value: "Redis Object Cache Pro + HAProxy" },
          { label: "Page Speed Target", value: "99+ Mobile Lighthouse Score" },
        ],
      }}
    />
  );
}
