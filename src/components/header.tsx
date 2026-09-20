"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CalendarDays, ClipboardList, MapPin, Menu, Phone, X } from "lucide-react";
import { HospitalLogo } from "./icons";
import { hospital } from "@/lib/hospital";
import { SiteSearch } from "./site-search";

const navigation = [ ["Home", "/"], ["About us", "/about"], ["Specialties", "/departments"], ["Our doctors", "/doctors"], ["Facilities", "/facilities"], ["Gallery", "/gallery"], ["Patient guide", "/patient-guide"], ["Contact", "/contact"] ];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); } };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return <>
    <div className="topbar"><div className="container topbar-inner"><span className="topbar-location"><MapPin size={13} /> Sathupally, Telangana <span className="topbar-divider">|</span> Close to home. Here for you.</span><a href={hospital.phoneHref}><span className="status-dot" /> 24/7 hospital care <span className="topbar-divider">|</span> <Phone size={13} /> {hospital.phone}</a></div></div>
    <header className="site-header"><div className="container nav-inner">
      <Link href="/" className="brand" aria-label="LVR Hospital home" onClick={() => setOpen(false)}><HospitalLogo priority /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href || (href !== "/" && pathname.startsWith(href + "/")) ? "page" : undefined}>{label}</Link>)}</nav>
      <div className="header-utilities"><SiteSearch /><Link href="/te" className="language-link" lang="te" aria-label="Read hospital information in Telugu">తెలుగు</Link><Link href="/appointment" className="button button-small header-book">Book appointment <ArrowUpRight size={16} /></Link></div>
      <button ref={menuButton} className="menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{navigation.map(([label, href]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={17} /></Link>)}<Link href="/updates" onClick={() => setOpen(false)}>Hospital updates <ArrowUpRight size={17} /></Link><Link href="/te" lang="te" onClick={() => setOpen(false)}>తెలుగు సమాచారం <ArrowUpRight size={17} /></Link><button type="button" className="mobile-visit-link" onClick={() => { setOpen(false); menuButton.current?.focus(); window.dispatchEvent(new Event("open-lvr-visit-guide")); }}>Before your visit <ClipboardList size={18} /></button><Link className="button" href="/appointment" onClick={() => setOpen(false)}>Book appointment <CalendarDays size={18} /></Link></nav>}
    </header>
  </>;
}
