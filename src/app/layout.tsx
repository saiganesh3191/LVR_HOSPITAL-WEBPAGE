import type { Metadata, Viewport } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SiteMotion } from "@/components/site-motion";
import { VisitDrawer } from "@/components/visit-drawer";
import { PhoneLinks } from "@/components/phone-links";
import "./globals.css";
import "./visit-interactions.css";
import "./editorial-design.css";
import "./client-photos.css";
import "./hospital-visit.css";
import "./photo-refinements.css";
import "./signature-design.css";
import "./hospital-details.css";
import "./professional-design.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "LVR Hospital, Sathupally | Helping Hands. Caring Hearts.", template: "%s | LVR Hospital, Sathupally" },
  description: "Family-focused care in Sathupally. Explore five departments and the doctor directory at LVR Multi Speciality Hospital. Request an appointment on WhatsApp.",
  robots: { index: process.env.SITE_INDEXABLE === "true", follow: process.env.SITE_INDEXABLE === "true" },
  openGraph: { type: "website", locale: "en_IN", siteName: "LVR Multi Speciality Hospital", title: "LVR Hospital | Care that feels like family", description: "Find your doctor and request a consultation in Sathupally, Telangana." },
};
export const viewport: Viewport = { themeColor: "#174c43" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /><VisitDrawer /><PhoneLinks /><SiteMotion /></body></html>;
}
