import React from "react";
import type { Metadata } from "next";
import { SquadPageTemplate } from "@/components/SquadPageTemplate";
import { voltxStore } from "@/lib/store";

export const metadata: Metadata = {
  title: "Creative & Motion Studio | Visual Systems & 3D Product Renders",
  description:
    "Integrated technical creative unit covering technical brand guidelines, Cinema4D & Blender 3D product visualizers, and short-form commercial motion assets.",
  keywords: ["Creative Direction", "3D Visualization", "Motion Design", "Cinema4D", "Blender", "Brand Systems", "VoltX Agency"],
  alternates: { canonical: "/squads/creative" },
  openGraph: {
    title: "VoltX Creative & Motion Studio | Visual Systems & 3D Product Renders",
    description: "Technical brand guidelines, Cinema4D & Blender 3D product visualizers, and motion assets.",
    url: "/squads/creative",
    type: "website",
  },
};

export default function CreativeSquadPage() {
  const squad = voltxStore.getSquadBySlug("creative")!;
  const caseStudies = voltxStore.getCaseStudies(squad?.id);

  return (
    <SquadPageTemplate
      squad={squad}
      caseStudies={caseStudies}
      squadNumber="08"
      isControlledCapacity={true}
      architecturalOverview={{
        title: "Technical Design Systems & 3D Motion Engineering",
        description:
          "VoltX Creative operates as an integrated studio unit delivering engineered design tokens, procedural 3D product visualizers, and high-impact motion assets calibrated for commercial conversion.",
        specs: [
          { label: "3D Pipeline", value: "Cinema4D / Blender / Redshift" },
          { label: "Design Systems", value: "Figma Token Matrix / Tailwind Sync" },
          { label: "Capacity Policy", value: "Controlled Sprint Queue (3 Sprints/Mo)" },
          { label: "Ad Performance", value: "3.1x CTR Surge via 3D Explainer Assets" },
        ],
      }}
    />
  );
}
