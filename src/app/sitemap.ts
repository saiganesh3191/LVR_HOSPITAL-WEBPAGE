import type { MetadataRoute } from "next";
import { departments, doctors } from "@/lib/hospital";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (process.env.SITE_INDEXABLE !== "true") return [];
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const paths = [
    "",
    "/about",
    "/appointment",
    "/careers",
    "/contact",
    "/departments",
    "/doctors",
    "/facilities",
    "/gallery",
    "/patient-guide",
    "/privacy",
    "/updates",
    ...departments.map((item) => `/departments/${item.slug}`),
    ...doctors.map((item) => `/doctors/${item.slug}`),
  ];
  const localizedPaths = paths.map((path) => `/te${path}`);

  return [...paths, ...localizedPaths].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : path === "/te" ? 0.9 : 0.7,
  }));
}
