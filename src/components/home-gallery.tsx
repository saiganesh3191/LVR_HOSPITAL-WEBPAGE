import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Images } from "lucide-react";
import { Eyebrow } from "./ui";

const moments = [
  { src: "/media/gallery/thumbs/community-outreach-01.webp", alt: "LVR Hospital community healthcare outreach", label: "Community care" },
  { src: "/media/gallery/thumbs/team-celebration-06.webp", alt: "LVR Hospital team celebrating together", label: "Our people" },
  { src: "/media/gallery/thumbs/hospital-visit-09.webp", alt: "A clinical interaction at LVR Hospital", label: "Hospital moments" },
];

export function HomeGallery() {
  return <section className="section home-gallery-section"><div className="container"><div className="section-heading"><div><Eyebrow>04 / LIFE AT LVR</Eyebrow><h2>Care in action.<br /><em>People at heart.</em></h2></div><div className="section-heading-aside"><p>Hospital visits, community outreach and the people who make compassionate care possible.</p><Link className="text-link" href="/gallery">Explore the full gallery <ArrowUpRight size={19} /></Link></div></div><div className="home-gallery-grid">{moments.map((moment, index) => <Link href="/gallery" className={`home-gallery-card home-gallery-card-${index + 1}`} key={moment.src}><Image src={moment.src} alt={moment.alt} fill sizes="(max-width: 760px) 90vw, 33vw" /><span>{moment.label}<ArrowUpRight size={17} /></span></Link>)}</div><Link href="/gallery" className="button button-outline home-gallery-button"><Images size={18} /> View photos & videos</Link></div></section>;
}
