import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock3, GraduationCap, Phone } from "lucide-react";
import { CareCta, Eyebrow } from "@/components/ui";
import { ProfileBackground } from "@/components/profile-background";
import { profileDetails } from "@/lib/hospital-details";
import { DoctorPortrait } from "@/components/doctor-portrait";
import { doctors, hospital } from "@/lib/hospital";

export function generateStaticParams() { return doctors.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: doctors.find(doctor => doctor.slug === slug)?.name ?? "Doctor not found" };
}
export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doctor = doctors.find(item => item.slug === slug);
  if (!doctor) notFound();
  return <><section className="section profile-section"><div className="container"><div className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/doctors">Our doctors</Link><span>/</span><span>{doctor.department}</span></div><div className="profile-grid"><DoctorPortrait doctor={doctor} profile /><div><Eyebrow>{doctor.department}</Eyebrow><h1 className="doctor-profile-name">{doctor.name}</h1><p className="profile-qualification"><GraduationCap size={22} />{doctor.qualification}</p><div className="profile-facts">{doctor.appointmentType === "Consultant" && <span>Consultant</span>}</div><p className="detail-description">{doctor.bio}</p><div className="profile-consultation"><span>Outpatient consultation</span><strong>₹{profileDetails[slug]?.fee}</strong><p>Emergency consultation after 9:30 PM: ₹500. Tests, medicines, and procedures are charged separately.</p></div><div className="profile-timing"><Clock3 size={21} /><div><strong>Consultation timings</strong><p>{doctor.timing}</p><small>Please call to confirm the day and time before your visit.</small></div></div><div className="detail-actions"><Link className="button" href={`/appointment?doctor=${doctor.slug}`}>Request an appointment <ArrowUpRight size={18} /></Link><a className="text-link" href={hospital.phoneHref}><Phone size={17} />Call reception</a></div><Link href={`/departments/${doctor.departmentSlug}`} className="profile-department-link">Explore {doctor.department} at LVR <ArrowRightIcon /></Link></div></div></div></section><ProfileBackground slug={slug} /><CareCta /></>;
}
function ArrowRightIcon() { return <ArrowUpRight size={17} />; }
