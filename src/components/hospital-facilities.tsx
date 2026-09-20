import Image from "next/image";
import Link from "next/link";
import { Activity, Ambulance, ArrowUpRight, BedDouble, FlaskConical, HeartPulse, Pill, Accessibility, Stethoscope } from "lucide-react";
import { facilities } from "@/lib/hospital-details";
import { Eyebrow } from "./ui";

const icons = { emergency: HeartPulse, icu: Activity, lab: FlaskConical, pharmacy: Pill, ambulance: Ambulance, theatre: Stethoscope, rooms: BedDouble, access: Accessibility };

export function HospitalFacilities({ compact = false }: { compact?: boolean }) {
  return <section className="section facilities-section" id="facilities"><div className="container">
    <div className="section-heading"><div><Eyebrow>CARE & FACILITIES</Eyebrow><h2>Support for your care.<br /><em>Here at LVR.</em></h2></div><p className="section-description">From outpatient visits to inpatient care, explore the facilities available at our Sathupally hospital.</p></div>
    <div className="hospital-capacity"><div><strong>20</strong><span>Hospital beds</span></div><div><strong>8</strong><span>ICU beds, included in total</span></div><div><strong>24/7</strong><span>Emergency, laboratory &amp; pharmacy</span></div></div>
    <div className="facility-grid">{facilities.slice(0, compact ? 4 : undefined).map(item => { const Icon = icons[item.icon]; return <article className="facility-card" key={item.title}><Icon size={27} strokeWidth={1.5} /><span>{item.hours}</span><h3>{item.title}</h3><p>{item.description}</p></article>; })}</div>
    {compact ? <Link href="/facilities" className="text-link facility-more">Explore all hospital facilities <ArrowUpRight size={18} /></Link> : <>
      <section className="facility-tour" aria-labelledby="facility-tour-title">
        <div className="facility-tour-heading"><Eyebrow>INSIDE LVR</Eyebrow><h2 id="facility-tour-title">A closer look at<br /><em>our hospital.</em></h2><p>Clean, practical spaces prepared for consultations, monitoring, and inpatient care.</p></div>
        <div className="facility-tour-grid">
          <figure className="facility-photo facility-photo-wide"><Image src="/media/facilities/critical-care-ward.webp" alt="Critical-care and inpatient beds at LVR Multi Speciality Hospital" fill sizes="(max-width: 760px) 100vw, 62vw" /><figcaption><span>Patient care</span><strong>Critical-care &amp; inpatient ward</strong></figcaption></figure>
          <figure className="facility-photo"><Image src="/media/facilities/consultation-room.webp" alt="Consultation room at LVR Multi Speciality Hospital" fill sizes="(max-width: 760px) 100vw, 38vw" /><figcaption><span>Consultations</span><strong>Doctor consultation room</strong></figcaption></figure>
        </div>
      </section>
      <div className="facility-practical"><div><h3>Home-service enquiries</h3><p>Home services may be arranged depending on the patient’s needs. Contact reception to discuss eligibility, availability, and charges.</p></div><div><h3>Services available elsewhere</h3><p>Dialysis, radiology, X-ray, CT, MRI, and a blood bank are not currently available at LVR. Please ask reception about your requirements before visiting.</p></div></div>
    </>}
  </div></section>;
}
