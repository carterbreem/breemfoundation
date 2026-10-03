import type { MetadataRoute } from "next";

function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw || typeof raw !== "string" || raw.trim() === "") {
    return "https://breemfoundation.vercel.app";
  }
  return raw.replace(/\/+$/, ""); // strip trailing slash
}

export default function sitemap(): MetadataRoute.Sitemap {
  const SITE_URL = getSiteUrl();
  const now = new Date();

  const routes: {
    url: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { url: "", changeFrequency: "weekly", priority: 1.0 },
    { url: "/about", changeFrequency: "monthly", priority: 0.8 },
    { url: "/apply", changeFrequency: "monthly", priority: 0.9 },
    { url: "/donate", changeFrequency: "weekly", priority: 0.9 },
    { url: "/stories", changeFrequency: "weekly", priority: 0.8 },
    { url: "/faq", changeFrequency: "monthly", priority: 0.7 },
    { url: "/contact", changeFrequency: "monthly", priority: 0.7 },
    { url: "/privacy", changeFrequency: "yearly", priority: 0.4 },
    { url: "/terms", changeFrequency: "yearly", priority: 0.4 }
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority
  }));
}
