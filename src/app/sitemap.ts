import type { MetadataRoute } from "next";
import { departments, doctors } from "@/lib/hospital";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.SITE_INDEXABLE !== "true") return [];
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return ["", "/about", "/departments", "/doctors", "/patient-guide", "/contact", "/facilities", "/gallery", "/careers", "/updates", "/te", ...departments.map(item => `/departments/${item.slug}`), ...doctors.map(item => `/doctors/${item.slug}`)].map(path => ({ url: `${base}${path}`, changeFrequency: "weekly", priority: path === "" ? 1 : 0.7 }));
}
