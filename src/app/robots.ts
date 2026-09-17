import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const indexable = process.env.SITE_INDEXABLE === "true";
  return { rules: { userAgent: "*", ...(indexable ? { allow: "/", disallow: "/appointment" } : { disallow: "/" }) }, ...(indexable ? { sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml` } : {}) };
}
