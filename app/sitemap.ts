import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voltxagency.com";
  const lastModified = new Date();

  const squadSlugs = [
    "shopify",
    "wordpress",
    "automation",
    "growth-analytics",
    "devops",
    "game-dev",
    "web-systems",
    "creative",
  ];

  const squadEntries: MetadataRoute.Sitemap = squadSlugs.map((slug) => ({
    url: `${baseUrl}/squads/${slug}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...squadEntries,
  ];
}
