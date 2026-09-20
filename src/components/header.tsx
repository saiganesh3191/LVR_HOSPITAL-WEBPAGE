"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CalendarDays, ClipboardList, MapPin, Menu, Phone, X } from "lucide-react";
import { HospitalLogo } from "./icons";
import { hospital } from "@/lib/hospital";
import { SiteSearch } from "./site-search";

const englishNavigation = [ ["Home", "/"], ["About us", "/about"], ["Specialties", "/departments"], ["Our doctors", "/doctors"], ["Facilities", "/facilities"], ["Gallery", "/gallery"], ["Patient guide", "/patient-guide"], ["Contact", "/contact"] ];
const teluguNavigation = [ ["హోమ్", "/"], ["మా గురించి", "/about"], ["వైద్య విభాగాలు", "/departments"], ["మా వైద్యులు", "/doctors"], ["సౌకర్యాలు", "/facilities"], ["గ్యాలరీ", "/gallery"], ["రోగి మార్గదర్శిని", "/patient-guide"], ["సంప్రదించండి", "/contact"] ];

export function Header() {
  const pathname = usePathname();
  const isTelugu = pathname === "/te" || pathname.startsWith("/te/");
  const navigation = isTelugu ? teluguNavigation : englishNavigation;
  const localHref = (href: string) => isTelugu ? (href === "/" ? "/te" : `/te${href}`) : href;
  const englishHref = isTelugu ? (pathname.replace(/^\/te/, "") || "/") : "/te";
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
      <Link href={localHref("/")} className="brand" aria-label={isTelugu ? "LVR హాస్పిటల్ హోమ్" : "LVR Hospital home"} onClick={() => setOpen(false)}><HospitalLogo priority /></Link>
      <nav className="desktop-nav" aria-label={isTelugu ? "ప్రధాన నావిగేషన్" : "Main navigation"}>{navigation.map(([label, href]) => { const target = localHref(href); return <Link key={href} href={target} aria-current={pathname === target || (target !== "/" && pathname.startsWith(target + "/")) ? "page" : undefined}>{label}</Link>; })}</nav>
      <div className="header-utilities">{!isTelugu && <SiteSearch />}<Link href={englishHref} data-locale-switch className="language-link" lang={isTelugu ? "en" : "te"} aria-label={isTelugu ? "Read the website in English" : "Read the website in Telugu"} onClick={(event) => { if (isTelugu) { event.preventDefault(); window.location.assign(englishHref); } }}>{isTelugu ? "English" : "తెలుగు"}</Link><Link href={localHref("/appointment")} className="button button-small header-book">{isTelugu ? "అపాయింట్‌మెంట్ బుక్ చేయండి" : "Book appointment"} <ArrowUpRight size={16} /></Link></div>
      <button ref={menuButton} className="menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-nav" aria-label={isTelugu ? "మొబైల్ నావిగేషన్" : "Mobile navigation"}>{navigation.map(([label, href]) => { const target = localHref(href); return <Link key={href} href={target} aria-current={pathname === target ? "page" : undefined} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={17} /></Link>; })}<Link href={localHref("/updates")} onClick={() => setOpen(false)}>{isTelugu ? "హాస్పిటల్ అప్‌డేట్లు" : "Hospital updates"} <ArrowUpRight size={17} /></Link><Link href={englishHref} data-locale-switch lang={isTelugu ? "en" : "te"} onClick={(event) => { setOpen(false); if (isTelugu) { event.preventDefault(); window.location.assign(englishHref); } }}>{isTelugu ? "English" : "తెలుగు సమాచారం"} <ArrowUpRight size={17} /></Link><button type="button" className="mobile-visit-link" onClick={() => { setOpen(false); menuButton.current?.focus(); window.dispatchEvent(new Event("open-lvr-visit-guide")); }}>{isTelugu ? "మీ సందర్శనకు ముందు" : "Before your visit"} <ClipboardList size={18} /></button><Link className="button" href={localHref("/appointment")} onClick={() => setOpen(false)}>{isTelugu ? "అపాయింట్‌మెంట్ బుక్ చేయండి" : "Book appointment"} <CalendarDays size={18} /></Link></nav>}
    </header>
  </>;
}
