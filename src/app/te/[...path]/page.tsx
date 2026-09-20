import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutPage from "../../about/page";
import AppointmentPage from "../../appointment/page";
import CareersPage from "../../careers/page";
import ContactPage from "../../contact/page";
import DepartmentsPage from "../../departments/page";
import DepartmentPage from "../../departments/[slug]/page";
import DoctorsPage from "../../doctors/page";
import DoctorPage from "../../doctors/[slug]/page";
import FacilitiesPage from "../../facilities/page";
import GalleryPage from "../../gallery/page";
import PatientGuidePage from "../../patient-guide/page";
import PrivacyPage from "../../privacy/page";
import UpdatesPage from "../../updates/page";
import { departments, doctors } from "@/lib/hospital";
import { TeluguLocalizer } from "@/components/telugu-localizer";

const pages = ["about", "appointment", "careers", "contact", "departments", "doctors", "facilities", "gallery", "patient-guide", "privacy", "updates"];

export const dynamicParams = false;
export function generateStaticParams() {
  return [
    ...pages.map(page => ({ path: [page] })),
    ...departments.map(item => ({ path: ["departments", item.slug] })),
    ...doctors.map(item => ({ path: ["doctors", item.slug] })),
  ];
}
export const metadata: Metadata = { title: "తెలుగు సమాచారం" };

export default async function TeluguRoutePage({ params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const [page, slug] = path;
  let content: React.ReactNode;
  if (path.length === 1) {
    content = page === "about" ? <AboutPage />
      : page === "appointment" ? <AppointmentPage />
      : page === "careers" ? <CareersPage />
      : page === "contact" ? <ContactPage />
      : page === "departments" ? <DepartmentsPage />
      : page === "doctors" ? <DoctorsPage />
      : page === "facilities" ? <FacilitiesPage />
      : page === "gallery" ? <GalleryPage />
      : page === "patient-guide" ? <PatientGuidePage />
      : page === "privacy" ? <PrivacyPage />
      : page === "updates" ? <UpdatesPage />
      : null;
  } else if (path.length === 2 && page === "departments" && departments.some(item => item.slug === slug)) {
    content = <DepartmentPage params={Promise.resolve({ slug })} />;
  } else if (path.length === 2 && page === "doctors" && doctors.some(item => item.slug === slug)) {
    content = <DoctorPage params={Promise.resolve({ slug })} />;
  } else content = null;
  if (!content) notFound();
  return <TeluguLocalizer>{content}</TeluguLocalizer>;
}
