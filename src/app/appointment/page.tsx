import type { Metadata } from "next";
import { Clock3, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageIntro } from "@/components/ui";
import { AppointmentForm } from "@/components/appointment-form";
import { departments, doctors, hospital } from "@/lib/hospital";

export const metadata: Metadata = { title: "Request an appointment", robots: { index: false, follow: false } };
export default async function AppointmentPage({ searchParams }: { searchParams: Promise<{ department?: string; doctor?: string }> }) {
  const query = await searchParams;
  const doctor = doctors.find(item => item.slug === query.doctor);
  const department = doctor?.departmentSlug ?? departments.find(item => item.slug === query.department)?.slug ?? "";
  return <><PageIntro eyebrow="Book an appointment" title={<>Your care starts<br /><em>with a conversation.</em></>} description="Share a few details, then send your request on WhatsApp. Our team will get in touch to confirm your visit." /><section className="section appointment-section"><div className="container appointment-grid"><AppointmentForm initialDepartment={department} initialDoctor={doctor?.slug ?? ""} /><aside className="appointment-aside"><div className="aside-card"><span className="aside-icon"><MessageCircle size={27} strokeWidth={1.5} /></span><h2>A real person.<br /><em>A helping hand.</em></h2><p>Our reception team will check availability and confirm your appointment on WhatsApp.</p><div className="aside-divider" /><p className="icon-line"><Clock3 size={19} /><span><strong>Hospital open 24/7</strong><br />Specialist consultation times vary.</span></p><p className="icon-line"><MapPin size={19} /><span>Jupalli Eye Hospital Road,<br />Sathupally, Telangana</span></p><a className="text-link" href={hospital.phoneHref}><Phone size={16} />{hospital.phone}</a></div><div className="urgent-note"><strong>Need urgent care?</strong><p>Please call the hospital directly. Appointment requests are not monitored as an emergency service.</p><a href={hospital.phoneHref}><Phone size={16} /> Call {hospital.phone}</a></div></aside></div></section></>;
}
