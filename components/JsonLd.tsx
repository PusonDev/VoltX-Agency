import React from "react";

export function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voltxagency.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "Organization"],
    "name": "VoltX Agency",
    "alternateName": "VoltX Engineering Lab",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "image": `${baseUrl}/logo.png`,
    "description":
      "Elite precision engineering laboratory and technical consultancy specializing in enterprise Shopify Plus, headless web architectures, autonomous SRE, server-side attribution, and cloud infrastructure.",
    "telephone": "+8801629944975",
    "email": "contact@voltxagency.com",
    "priceRange": "$$$$",
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Worldwide"
    },
    "sameAs": [
      "https://wa.me/8801629944975",
      "https://t.me/+8801629944975"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+8801629944975",
        "contactType": "technical engineering consultation",
        "availableLanguage": ["English", "Bengali"],
        "contactOption": "TollFree"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "VoltX Technical Engineering Squads",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Enterprise Headless Shopify & Liquid Infrastructure",
            "description": "Hydrogen, Storefront GraphQL, Custom Checkout Extensibility, 0.00 CLS target."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Enterprise Headless WordPress & WooCommerce",
            "description": "Decoupled Next.js WPGraphQL, Redis Object Caching, High-Volume E-Commerce."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Autonomous Automation & Agentic Pipelines",
            "description": "n8n Self-Hosted, Make, Python Agents, LLM Semantic Routing, Zero-Data-Loss."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Server-Side Attribution & Growth Analytics",
            "description": "Server-Side GTM, Meta CAPI, GA4 BigQuery Ingestion, First-Party Cookie Recovery."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cloud DevOps & Autonomous SRE Infrastructure",
            "description": "Kubernetes EKS, Terraform IaC, ArgoCD GitOps, Zero-Downtime Blue/Green Deployments."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Interactive 3D WebGL & Game Systems",
            "description": "Three.js, WebGPU, React Three Fiber, Unreal Engine 5 Pixel Streaming."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mission-Critical Fullstack Web Systems",
            "description": "Next.js Enterprise App Router, High-Concurrency Node.js, Distributed PostgreSQL."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Design Engineering & Creative Systems",
            "description": "Figma Design Systems, Micro-Interactions, Cyber-Minimalist Aesthetics, Framer Motion."
          }
        }
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "VoltX Agency Hub",
    "url": baseUrl,
    "description": "Precision Engineering Laboratory & Technical Consultancy"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
