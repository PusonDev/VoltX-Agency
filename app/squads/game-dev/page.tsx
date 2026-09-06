import React from "react";
import type { Metadata } from "next";
import { SquadPageTemplate } from "@/components/SquadPageTemplate";
import { voltxStore } from "@/lib/store";

export const metadata: Metadata = {
  title: "Interactive & 3D Systems | Unreal Engine 5 & WebGL",
  description:
    "Unreal Engine 5 strike unit covering gameplay systems, C++ architecture, server-authoritative net-prediction, and locked 60+ FPS VR optimization.",
  keywords: ["Unreal Engine 5", "Three.js", "WebGL", "WebGPU", "VR Optimization", "C++ Game Systems", "VoltX Agency"],
  alternates: { canonical: "/squads/game-dev" },
  openGraph: {
    title: "VoltX Interactive & 3D Systems | Unreal Engine 5 & C++ VR Optimization",
    description: "UE5 gameplay systems, C++ architecture, server-authoritative net-prediction, and 60+ FPS VR.",
    url: "/squads/game-dev",
    type: "website",
  },
};

export default function GameDevSquadPage() {
  const squad = voltxStore.getSquadBySlug("game-dev")!;
  const caseStudies = voltxStore.getCaseStudies(squad?.id);

  return (
    <SquadPageTemplate
      squad={squad}
      caseStudies={caseStudies}
      squadNumber="06"
      architecturalOverview={{
        title: "Unreal Engine 5 Production Architecture & VR Optimization",
        description:
          "Specialized interactive unit focusing on C++ gameplay frameworks, server-authoritative netcode rollback, OpenXR VR profiling, and HLOD optimization delivering locked 60+ FPS on standalone headsets.",
        specs: [
          { label: "Game Engine", value: "Unreal Engine 5.4 / C++" },
          { label: "Target Frame Rate", value: "Locked 60+ FPS on Meta Quest / PCVR" },
          { label: "Netcode Architecture", value: "Server-Authoritative with Rollback" },
          { label: "Profiling Overhaul", value: "25% Reduction in CPU/GPU Overhead" },
        ],
      }}
    />
  );
}
