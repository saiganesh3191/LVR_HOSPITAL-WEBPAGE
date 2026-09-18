import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Clock3, Phone, Plus } from "lucide-react";
import { profileDetails } from "@/lib/hospital-details";
import { DoctorPortrait } from "./doctor-portrait";
import { Department, Doctor, faqs, hospital } from "@/lib/hospital";
import { CareArtwork } from "./care-artwork";
import { SpecialtyIcon } from "./icons";

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow${light ? " eyebrow-light" : ""}`}><span />{children}</p>;
}
export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description: string }) {
  return <section className="page-intro"><div className="container"><div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>{eyebrow}</span></div><div className="page-intro-grid"><div><Eyebrow>{eyebrow}</Eyebrow><h1>{title}</h1></div><div className="page-intro-aside"><p className="page-description">{description}</p></div></div></div></section>;
}
export function DepartmentCard({ department, index }: { department: Department; index: number }) {
  return <Link href={`/departments/${department.slug}`} className={`specialty-card ${department.color}`}><CareArtwork specialty={department.slug} /><div className="specialty-card-top"><span className="specialty-icon"><SpecialtyIcon slug={department.slug} size={31} /></span><span className="card-number">0{index + 1}</span></div><h3>{department.name}</h3><p>{department.description}</p><div className="specialty-card-bottom"><span>Explore department</span><span className="circle-arrow"><ArrowUpRight size={21} /></span></div></Link>;
}
export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return <article className={`doctor-card doctor-card-with-photo ${doctor.color}`}><Link className="portrait-link" href={`/doctors/${doctor.slug}`} aria-label={`View ${doctor.name}'s profile`}><DoctorPortrait doctor={doctor} /></Link><div className="doctor-card-copy"><h3><Link href={`/doctors/${doctor.slug}`}>{doctor.name}</Link></h3><span className="doctor-qualification">{doctor.qualification}</span><div className="doctor-summary"><span><small>OP consultation</small><strong>₹{profileDetails[doctor.slug]?.fee}</strong></span><span><small>Consultation</small><strong>{doctor.appointmentType === "Consultant" ? "Visiting specialist" : "Regular clinic"}</strong></span></div><p><Clock3 size={15} /> {doctor.timing.startsWith("Available 24/7") ? "Available 24/7 · call to arrange" : "Confirm availability with reception"}</p><div className="doctor-card-actions"><Link className="doctor-profile-link" href={`/doctors/${doctor.slug}`}>View profile <ArrowUpRight size={16} /></Link><Link className="text-link" href={`/appointment?doctor=${doctor.slug}`}>Request appointment <ArrowRight size={16} /></Link></div></div></article>;
}
export function CareCta() {
  return <section className="care-cta"><div className="container care-cta-inner"><div><Eyebrow light>WE’RE HERE WHEN YOU NEED US</Eyebrow><h2>Let’s take care<br /><em>of you.</em></h2></div><div className="cta-buttons"><p>A question. A concern. A visit.<br />Start with a conversation.</p><Link href="/appointment" className="button button-lime">Book an appointment <ArrowUpRight size={21} /></Link><a className="cta-phone" href={hospital.phoneHref}><Phone size={18} /> {hospital.phone}</a></div></div></section>;
}
export function FaqList({ limit }: { limit?: number }) {
  return <div className="faq-list">{faqs.slice(0, limit ?? faqs.length).map((faq, index) => <details key={faq.question} className="faq-item"><summary><span className="faq-index">0{index + 1}</span><span>{faq.question}</span><Plus size={21} /></summary><p>{faq.answer}</p></details>)}</div>;
}
export function CheckList({ items }: { items: readonly string[] }) {
  return <ul className="check-list">{items.map(item => <li key={item}><Check size={18} />{item}</li>)}</ul>;
}
