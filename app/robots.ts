import type { MetadataRoute } from "next";

function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw || typeof raw !== "string" || raw.trim() === "") {
    return "https://breemfoundation.vercel.app";
  }
  return raw.replace(/\/+$/, "");
}

export default function robots(): MetadataRoute.Robots {
  const SITE_URL = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/portal",
          "/portal/*",
          "/api/*",
          "/apply/success",
          "/donate/success"
        ]
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
