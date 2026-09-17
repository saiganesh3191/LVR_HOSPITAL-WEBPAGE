import type { Metadata } from "next";
import { ArrowUpRight, Mail } from "lucide-react";
import { CareCta, PageIntro } from "@/components/ui";
import { hospital } from "@/lib/hospital";
export const metadata: Metadata = { title: "Careers" };
export default function CareersPage() {
  return <><PageIntro eyebrow="Careers at LVR" title={<>Be part of<br /><em>our care team.</em></>} description="Explore nursing, reception, and pharmacy opportunities at LVR Multi Speciality Hospital, Sathupally." /><section className="section"><div className="container"><div className="three-grid">{["Nursing staff", "Receptionist", "Pharmacist"].map(role => <article className="guide-card" key={role}><h2>{role}</h2><p>Contact the hospital to confirm current openings, required qualifications, shift arrangements, and the application process.</p><a className="text-link" href={`mailto:${hospital.email}?subject=${encodeURIComponent(`Career enquiry: ${role}`)}`}>Enquire about this role <ArrowUpRight size={17} /></a></article>)}</div><div className="help-panel"><div><h2>Introduce yourself</h2><p>Email your name, role of interest, and relevant experience to our hospital team.</p></div><a className="button" href={`mailto:${hospital.email}`}><Mail size={18} />Email the hospital</a></div></div></section><CareCta /></>;
}
