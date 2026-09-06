import React from "react";
import type { Metadata } from "next";
import { SquadPageTemplate } from "@/components/SquadPageTemplate";
import { voltxStore } from "@/lib/store";

export const metadata: Metadata = {
  title: "Enterprise Headless Shopify & Liquid Infrastructure",
  description:
    "Enterprise Liquid customization, headless Hydrogen/Next.js storefronts, custom checkout UI extensions, and conversion-first commerce architectures.",
  keywords: ["Headless Shopify", "Shopify Plus", "Hydrogen", "Liquid Customization", "Checkout Extensibility", "Storefront GraphQL", "VoltX Agency"],
  alternates: { canonical: "/squads/shopify" },
  openGraph: {
    title: "VoltX Commerce Lab | Enterprise Headless Shopify & Liquid Infrastructure",
    description: "Enterprise Liquid customization, headless Hydrogen/Next.js storefronts, and conversion-first commerce architectures.",
    url: "/squads/shopify",
    type: "website",
  },
};

export default function ShopifySquadPage() {
  const squad = voltxStore.getSquadBySlug("shopify")!;
  const caseStudies = voltxStore.getCaseStudies(squad?.id);

  return (
    <SquadPageTemplate
      squad={squad}
      caseStudies={caseStudies}
      squadNumber="01"
      architecturalOverview={{
        title: "Headless Shopify & Enterprise Liquid Engine",
        description:
          "Our commerce lab architects custom Hydrogen and Next.js headless storefronts consuming Shopify Storefront GraphQL APIs, paired with custom checkout UI extensions and sub-second page transitions.",
        specs: [
          { label: "Core Runtime", value: "Shopify Plus / Hydrogen / Next.js" },
          { label: "CLS Target", value: "0.00 (Zero Layout Shift)" },
          { label: "API Protocol", value: "Storefront GraphQL & Admin Webhooks" },
          { label: "Checkout Engine", value: "Shopify Checkout Extensibility" },
        ],
      }}
    />
  );
}
