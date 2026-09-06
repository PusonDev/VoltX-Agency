import React from "react";
import type { Metadata } from "next";
import { SquadPageTemplate } from "@/components/SquadPageTemplate";
import { voltxStore } from "@/lib/store";

export const metadata: Metadata = {
  title: "Attribution & Growth Engineering | Server-Side GTM & Scaled PPC",
  description:
    "Server-side GTM & Meta Conversions API (CAPI) bypass for iOS ITP, algorithmic Google Ads scaling delivering 548% ROAS, and full-funnel attribution.",
  keywords: ["Server-Side GTM", "Meta CAPI", "Google Ads ROAS", "Attribution Engineering", "BigQuery", "GA4", "VoltX Agency"],
  alternates: { canonical: "/squads/growth-analytics" },
  openGraph: {
    title: "VoltX Attribution & Growth Engineering | Server-Side GTM & Scaled PPC",
    description: "Server-side GTM & Meta CAPI bypass for iOS ITP, algorithmic Google Ads delivering 548% ROAS.",
    url: "/squads/growth-analytics",
    type: "website",
  },
};

export default function GrowthAnalyticsSquadPage() {
  const squad = voltxStore.getSquadBySlug("growth-analytics")!;
  const caseStudies = voltxStore.getCaseStudies(squad?.id);

  return (
    <SquadPageTemplate
      squad={squad}
      caseStudies={caseStudies}
      squadNumber="04"
      architecturalOverview={{
        title: "Server-Side Data Layer & Algorithmic Attribution Engine",
        description:
          "Our tracking engineering unit bypasses browser ad-blockers and iOS ITP through dedicated Stape.io server containers, cryptographic event deduplication, and custom BigQuery attribution models.",
        specs: [
          { label: "Container Architecture", value: "Server-Side Google Tag Manager" },
          { label: "Meta CAPI Match Quality", value: "98.4% Match Score" },
          { label: "Paid Media Benchmark", value: "548% ROAS on Google Ads" },
          { label: "Audits Completed", value: "230+ Full-Funnel Production Audits" },
        ],
      }}
    />
  );
}
