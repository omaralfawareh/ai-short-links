import type { MetadataRoute } from "next";

import { ARTICLE_SLUGS } from "@/content/articleSlugs";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const staticPaths = ["", "/about", "/blog", "/faq", "/privacy", "/terms"] as const;

  const entries: MetadataRoute.Sitemap = [
    ...staticPaths.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.72,
      lastModified: new Date(),
    })),
    ...ARTICLE_SLUGS.map((slug) => ({
      url: `${base}/blog/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.65,
      lastModified: new Date(),
    })),
  ];

  return entries;
}
