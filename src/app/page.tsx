import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Heart, MapPin, MessageCircle, Phone } from "lucide-react";
import { CareCta, DoctorCard, Eyebrow, FaqList } from "@/components/ui";
import { HospitalFacilities } from "@/components/hospital-facilities";
import { HospitalBuilding } from "@/components/hospital-visit";
import { CareJourney } from "@/components/care-journey";
import { CareFinder, SpecialtyExplorer } from "@/components/care-explorer";
import { doctors, hospital, whatsappUrl } from "@/lib/hospital";

export default function Home() {
  return <>
    <section className="hero">
      <div className="hero-shell">
        
        <div className="hero-copy">
          <div className="hero-location"><span className="status-dot" /> SATHUPALLY, TELANGANA <span>EST. 2024</span></div>
          <p className="hero-hospital-name">LVR Multi Speciality Hospital</p><h1>For the life<br /><em>you love.</em></h1>
          <p className="hero-description">General medicine, skin care, child care, and visiting consultants. Get to know your doctors and plan your visit to LVR in Sathupally.</p>
          <div className="hero-buttons"><Link className="button button-lime" href="/appointment">Let’s plan your visit <ArrowUpRight size={20} /></Link><Link className="hero-doctors-link" href="/doctors">Meet your doctors <ArrowRight size={18} /></Link></div>
          <div className="hero-signoff"><Heart size={21} strokeWidth={1.5} /><span>Helping hands.<br /><strong>Caring hearts.</strong></span><span className="hero-signoff-rule" /><p>A hospital for<br />our community.</p></div>
        </div>
        <div className="hero-visual"><div className="hero-portrait-stack"><Link href="/doctors/prathyusha" className="hero-mini-portrait"><Image src="/images/team/prathyusha.webp" alt="Dr. Prathyusha Papishetty" fill sizes="(max-width: 760px) 30vw, 15vw" /><span><strong>Dr. Prathyusha</strong><small>Dermatology</small><ArrowUpRight size={15} /></span></Link><Link href="/doctors/chaithanya" className="hero-mini-portrait"><Image src="/images/team/k-chaithanya.webp" alt="Dr. K. Chaithanya" fill sizes="(max-width: 760px) 30vw, 15vw" /><span><strong>Dr. K. Chaithanya</strong><small>Pediatrics</small><ArrowUpRight size={15} /></span></Link></div><span className="hero-visual-label" aria-hidden="true">YOUR PEOPLE. YOUR CARE.</span><div className="hero-photo"><Image src="/images/team/lakshmansai-vanama.webp" alt="Dr. Lakshmansai Vanama at LVR Hospital" fill priority sizes="(max-width: 760px) 100vw, 50vw" /><div className="photo-shade" /><div className="hero-photo-copy"><span>GENERAL MEDICINE AT LVR</span><p>Dr. Lakshmansai<br /><em>Vanama</em></p></div></div><div className="hero-care-strip"><div><strong>24/7</strong><span>Hospital care</span></div><span className="strip-line" /><div><strong>5</strong><span>Departments to explore</span></div><a href={hospital.phoneHref} aria-label="Call LVR Hospital"><Phone size={24} /></a></div></div>
      </div>
    </section>
    <nav className="hospital-shortcuts container" aria-label="Explore the hospital"><Link href="/about"><span>01 / THE HOSPITAL</span><strong>Get to know LVR <ArrowUpRight size={22} /></strong></Link><Link href="/doctors"><span>02 / YOUR DOCTORS</span><strong>Meet your care team <ArrowUpRight size={22} /></strong></Link><Link href="/facilities"><span>03 / HOSPITAL FACILITIES</span><strong>Explore care at LVR <ArrowUpRight size={22} /></strong></Link></nav>
    <CareFinder />
    <section id="specialties" className="section specialties-section"><div className="container"><div className="section-heading"><div><Eyebrow>01 / FIND YOUR CARE</Eyebrow><h2>Different specialties.<br /><em>One focus. You.</em></h2></div><p className="section-description">A place to start. A person to speak to.<br />Explore the care available at LVR.</p></div><SpecialtyExplorer /></div></section>
    <section className="community-section editorial-community"><div className="container community-grid"><div className="community-statement"><Eyebrow>02 / THE LVR WAY</Eyebrow><h2>Not far away.<br />Never <em>far from care.</em></h2><p>Good care starts with someone listening. We’re here to make space for your questions, explain the next step, and help you feel more at ease.</p><Link href="/about" className="text-link">This is our story <ArrowUpRight size={20} /></Link></div><HospitalBuilding /><div className="community-facts"><div className="community-year"><span>ROOTED IN SATHUPALLY</span><strong>Since<br /><em>2024.</em></strong><MapPin size={35} strokeWidth={1.3} /></div><div className="community-value"><Heart size={25} strokeWidth={1.4} /><div><h3>People, before everything.</h3><p>Personal attention for you and the people you love.</p></div></div><div className="community-value"><MessageCircle size={25} strokeWidth={1.4} /><div><h3>A conversation, not a complication.</h3><p>Our reception team helps you arrange your visit.</p></div></div></div></div></section>
    <section className="section doctors-section editorial-doctors"><div className="container"><div className="section-heading"><div><Eyebrow>03 / YOUR CARE TEAM</Eyebrow><h2>Good people.<br /><em>In your corner.</em></h2></div><div className="section-heading-aside"><p>Meet the doctors behind your care.<br />Get to know them before you say hello.</p><Link href="/doctors" className="text-link">Find your doctor <ArrowUpRight size={20} /></Link></div></div><div className="doctor-grid">{doctors.map(doctor => <DoctorCard doctor={doctor} key={doctor.slug} />)}</div><p className="directory-note small-note">Hospital care is available 24/7. Individual doctor schedules vary; reception will confirm your appointment.</p></div></section>
    <HospitalFacilities compact />
    <section className="visit-section"><div className="container"><div className="section-heading"><div><Eyebrow>04 / A LITTLE LESS WORRY</Eyebrow><h2>We’ll take it<br /><em>one step at a time.</em></h2></div><Link href="/patient-guide" className="text-link">Your guide to visiting LVR <ArrowUpRight size={20} /></Link></div><CareJourney /></div></section>
    <section className="section"><div className="container faq-grid"><div><Eyebrow>05 / GOOD TO KNOW</Eyebrow><h2>Less wondering.<br /><em>More clarity.</em></h2><p className="muted">Something else on your mind?</p><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="text-link">Let’s talk <MessageCircle size={19} /></a></div><FaqList limit={4} /></div></section>
    <CareCta />
  </>;
}
