import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ClientShell } from "@/components/ClientShell";
import { JsonLd } from "@/components/JsonLd";
import Analytics from "@/components/Analytics";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8FAFC",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voltxagency.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VoltX Agency Hub | Precision Engineering Laboratory & Technical Consultancy",
    template: "%s | VoltX Agency Hub",
  },
  description:
    "Bespoke engineering junction for enterprise Shopify Plus, headless architectures, autonomous SRE agents, server-side attribution, and high-concurrency cloud infrastructure.",
  keywords: [
    "VoltX Agency",
    "Technical Consultancy",
    "Headless Shopify Plus",
    "Enterprise Liquid",
    "Autonomous SRE",
    "Server-Side GTM",
    "Meta CAPI Attribution",
    "DevOps Ingress",
    "Kubernetes GitOps",
    "Unreal Engine 5",
    "Three.js WebGL",
    "Next.js Enterprise",
    "High-Concurrency Web Systems",
    "Python Automation Agents",
    "Precision Engineering Lab"
  ],
  authors: [{ name: "VoltX Engineering Lab", url: siteUrl }],
  creator: "VoltX Agency",
  publisher: "VoltX Agency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VoltX Agency Hub | Precision Engineering Laboratory & Technical Consultancy",
    description:
      "Bespoke engineering junction for enterprise Shopify Plus, headless architectures, autonomous SRE agents, server-side attribution, and cloud infrastructure.",
    url: siteUrl,
    siteName: "VoltX Agency",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "VoltX Agency Official Brand Mark",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VoltX Agency Hub | Precision Engineering Laboratory",
    description:
      "Enterprise Shopify Plus, headless architectures, autonomous SRE agents, and high-concurrency cloud infrastructure.",
    creator: "@VoltXAgency",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth light" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd />
      </head>
      <body suppressHydrationWarning>
        <Analytics />
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}

