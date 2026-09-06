import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://voltxagency.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/squads/"],
        disallow: ["/admin/", "/admin", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/squads/"],
        disallow: ["/admin/", "/admin", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
