import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Phone } from "lucide-react";
import { CareCta, CheckList, DoctorCard, Eyebrow, PageIntro } from "@/components/ui";
import { departmentServices, profileDetails } from "@/lib/hospital-details";
import { SpecialtyIcon } from "@/components/icons";
import { departments, doctors, hospital } from "@/lib/hospital";
import { PhototherapyReference } from "@/components/phototherapy-reference";
import { DermatologyTreatments } from "@/components/dermatology-treatments";

export function generateStaticParams() { return departments.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: departments.find(department => department.slug === slug)?.name ?? "Specialty not found" };
}
export default async function DepartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const department = departments.find(item => item.slug === slug);
  if (!department) notFound();
  const doctor = doctors.find(item => item.slug === department.doctor)!;
  return <><PageIntro eyebrow={department.name} title={<>{department.label.split(" ").slice(0, 3).join(" ")}<br /><em>{department.label.split(" ").slice(3).join(" ")}</em></>} description={department.short} /><section className="section"><div className="container detail-grid"><div><span className={`detail-specialty-icon ${department.color}`}><SpecialtyIcon slug={department.slug} size={46} /></span><Eyebrow>PERSONAL ATTENTION. THOUGHTFUL CARE.</Eyebrow><h2>{department.name}<br /><em>at LVR Hospital.</em></h2><p className="detail-description">{department.intro}</p><h3 className="subheading">How we can help</h3><CheckList items={profileDetails[department.doctor]?.focus ?? department.focus} /><h3 className="subheading">Services at LVR</h3><CheckList items={departmentServices[slug] ?? []} />{slug === "dermatology" && <PhototherapyReference />}<p className="small-note">Your doctor will advise whether a test or procedure is appropriate. Confirm availability and preparation instructions with reception.</p><div className="detail-actions"><Link href={`/appointment?department=${department.slug}`} className="button">Request a consultation <ArrowUpRight size={18} /></Link><a href={hospital.phoneHref} className="text-link"><Phone size={16} />Talk to reception</a></div><p className="small-note">Consultations are subject to the doctor’s availability. Our team will confirm your appointment on WhatsApp.</p></div><aside><Eyebrow>MEET YOUR DOCTOR</Eyebrow><DoctorCard doctor={doctor} /><div className="timing-note"><strong>Planning your visit</strong><p>{doctor.timing}</p><Link href="/patient-guide" className="text-link">Read the patient guide <ArrowUpRight size={15} /></Link></div></aside></div>{slug === "dermatology" && <div className="container"><DermatologyTreatments /></div>}</section><CareCta /></>;
}

