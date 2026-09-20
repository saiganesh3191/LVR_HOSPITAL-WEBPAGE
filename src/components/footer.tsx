import Link from "next/link";
import { ArrowUpRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { HospitalLogo } from "./icons";
import { hospital, whatsappUrl } from "@/lib/hospital";

export function Footer() {
  return <>
    <footer className="site-footer"><div className="container">
      <div className="footer-grid"><div className="footer-brand"><Link href="/" className="brand" aria-label="LVR Hospital home"><HospitalLogo /></Link><p>Helping hands. Caring hearts.<br />Care for your family, close to home.</p><span className="footer-established">SERVING SATHUPALLY SINCE 2024</span></div>
      <div><h2>Explore LVR</h2><Link href="/about">About our hospital</Link><Link href="/doctors">Meet our doctors</Link><Link href="/departments">Our specialties</Link><Link href="/patient-guide">Patient guide</Link><Link href="/facilities">Hospital facilities</Link><Link href="/gallery">Life at LVR gallery</Link><Link href="/updates">Hospital updates</Link><Link href="/te" lang="te">తెలుగు సమాచారం</Link><Link href="/careers">Careers at LVR</Link></div>
      <div><h2>How can we help?</h2><Link href="/appointment">Request an appointment</Link><Link href="/contact">Contact & directions</Link><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">WhatsApp enquiries <ArrowUpRight size={13} /></a><Link href="/patient-guide#questions">Frequently asked questions</Link></div>
      <div className="footer-contact"><h2>Come say hello</h2><p><MapPin size={18} /><span>Jupalli Eye Hospital Road,<br />Sathupally, Telangana 507303</span></p><a href={hospital.phoneHref}><Phone size={17} /> {hospital.phone}</a><a href={hospital.secondaryPhoneHref}>{hospital.secondaryPhone}</a><a href={`mailto:${hospital.email}`}>Email the hospital</a><a href={hospital.instagram} target="_blank" rel="noopener noreferrer">Instagram <ArrowUpRight size={13} /></a><span className="footer-open"><span className="status-dot" /> Open 24 hours, every day</span></div></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} LVR Multi Speciality Hospital.</span><span>With care, for our community.</span><Link href="/privacy">Privacy & website information</Link></div>
    </div></footer>
    <div className="mobile-actions" aria-label="Quick contact"><a href={hospital.phoneHref}><Phone size={19} />Call</a><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} />WhatsApp</a><Link href="/appointment">Book appointment <ArrowUpRight size={17} /></Link></div>
  </>;
}
