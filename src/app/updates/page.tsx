import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Instagram, Phone } from "lucide-react";
import { PageIntro } from "@/components/ui";
import { hospital } from "@/lib/hospital";
import { currentHospitalUpdates } from "@/lib/updates";

export const metadata: Metadata = { title: "Hospital updates", description: "Official announcements and visitor information from LVR Multi Speciality Hospital, Sathupally." };
export const dynamic = "force-dynamic";

export default function UpdatesPage() {
  const updates = currentHospitalUpdates();
  return <><PageIntro eyebrow="Hospital updates" title={<>What’s happening<br /><em>at LVR.</em></>} description="Hospital news and announcements for patients and families." /><section className="section"><div className="container updates-layout"><div><span className="updates-eyebrow">LATEST FROM THE HOSPITAL</span>{updates.length ? <div className="updates-list">{updates.map(update => <article className="update-card" key={`${update.publishedOn}-${update.title}`}><time dateTime={update.publishedOn}>{new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${update.publishedOn}T00:00:00Z`))}</time><h2>{update.title}</h2><p>{update.summary}</p>{update.href && <a href={update.href} target="_blank" rel="noopener noreferrer">Read more <ArrowUpRight size={16} /></a>}</article>)}</div> : <div className="updates-empty"><h2>Check back for hospital announcements.</h2><p>There are no current announcements. For doctor visiting dates or appointment availability, please contact reception directly.</p><Link href="/doctors" className="text-link">Explore our doctors <ArrowUpRight size={17} /></Link></div>}</div><aside className="updates-aside"><h2>Planning a visit?</h2><p>Consultant schedules can change. Our reception team can confirm the next available appointment.</p><a href={hospital.phoneHref}><Phone size={17} /> {hospital.phone}</a><a href={hospital.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={17} /> Follow LVR on Instagram</a></aside></div></section></>;
}
