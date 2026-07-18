import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://printdekho.com";
  const lastModified = new Date();

  const pages: {
    url: string;
    changeFrequency: "daily" | "weekly" | "monthly";
    priority: number;
  }[] = [
    { url: "/", changeFrequency: "daily", priority: 1 },
    { url: "/about", changeFrequency: "monthly", priority: 0.7 },
    { url: "/products", changeFrequency: "weekly", priority: 0.9 },
    { url: "/products/corporate-gift-kits", changeFrequency: "weekly", priority: 0.8 },
    { url: "/products/bags", changeFrequency: "weekly", priority: 0.8 },
    { url: "/products/drinkware", changeFrequency: "weekly", priority: 0.8 },
    { url: "/products/apparel", changeFrequency: "weekly", priority: 0.8 },
    { url: "/products/sports-jerseys", changeFrequency: "weekly", priority: 0.8 },
    { url: "/products/stationery", changeFrequency: "weekly", priority: 0.8 },
    { url: "/products/promotional", changeFrequency: "weekly", priority: 0.8 },
    { url: "/products/combo-sets", changeFrequency: "weekly", priority: 0.8 },
    { url: "/products/festival-hampers", changeFrequency: "weekly", priority: 0.8 },
    { url: "/products/welcome-kits", changeFrequency: "weekly", priority: 0.8 },
    { url: "/blog", changeFrequency: "weekly", priority: 0.7 },
    { url: "/faq", changeFrequency: "monthly", priority: 0.6 },
    { url: "/contact", changeFrequency: "monthly", priority: 0.7 },
    { url: "/bulk-inquiry", changeFrequency: "monthly", priority: 0.7 },
    { url: "/portfolio", changeFrequency: "weekly", priority: 0.7 },
    { url: "/industries", changeFrequency: "monthly", priority: 0.7 },
    { url: "/corporate-kits", changeFrequency: "weekly", priority: 0.8 },
    { url: "/privacy", changeFrequency: "monthly", priority: 0.3 },
    { url: "/terms", changeFrequency: "monthly", priority: 0.3 },
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
