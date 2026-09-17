import type { Metadata } from "next";
import { CareCta, PageIntro } from "@/components/ui";
import { DoctorDirectory } from "@/components/doctor-directory";
import { doctors, hospital } from "@/lib/hospital";

export const metadata: Metadata = { title: "Our doctors" };
export default function DoctorsPage() {
  return <><PageIntro eyebrow="Our doctors" title={<>Expertise with<br /><em>a human touch.</em></>} description="Get to know the doctors caring for our community. Find your specialty, explore a profile, and request a visit." /><section className="section"><div className="container"><DoctorDirectory /><div className="schedule-overview"><div><span className="updates-eyebrow">PLAN YOUR VISIT</span><h2>Doctor consultation information</h2><p>Only the published timings shown below are available on this website. Call reception to confirm before travelling, especially for visiting consultants.</p></div><div className="schedule-list">{doctors.map(doctor => <div key={doctor.slug}><strong>{doctor.name}</strong><span>{doctor.timing}</span></div>)}</div><a className="text-link" href={hospital.phoneHref}>Confirm with reception: {hospital.phone}</a></div></div></section><CareCta /></>;
}
