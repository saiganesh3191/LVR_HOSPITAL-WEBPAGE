"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { departments, doctors } from "@/lib/hospital";

const pages = [
  { title: "About LVR Hospital", type: "Page", href: "/about", keywords: "hospital story chairman director" },
  { title: "Our doctors", type: "Page", href: "/doctors", keywords: "doctor physician consultant" },
  { title: "Facilities", type: "Page", href: "/facilities", keywords: "beds ICU rooms parking ambulance" },
  { title: "Patient guide", type: "Page", href: "/patient-guide", keywords: "fees insurance payment visit" },
  { title: "Request an appointment", type: "Page", href: "/appointment", keywords: "book consultation WhatsApp" },
  { title: "Contact & directions", type: "Page", href: "/contact", keywords: "address map phone Sathupally" },
  { title: "Hospital updates", type: "Page", href: "/updates", keywords: "news announcements health camps" },
  { title: "తెలుగు సమాచారం", type: "Page", href: "/te", keywords: "Telugu hospital information" },
];
const entries = [
  ...doctors.map(doctor => ({ title: doctor.name, type: "Doctor", href: `/doctors/${doctor.slug}`, keywords: `${doctor.department} ${doctor.qualification}` })),
  ...departments.map(department => ({ title: department.name, type: "Specialty", href: `/departments/${department.slug}`, keywords: `${department.short} ${department.description}` })),
  ...pages,
];

export function SiteSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const close = () => { setOpen(false); requestAnimationFrame(() => trigger.current?.focus()); };
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen(true); }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, []);
  useEffect(() => { if (open) input.current?.focus(); }, [open]);
  useEffect(() => {
    if (!open) return;
    const trap = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); close(); }
      if (event.key !== "Tab" || !panel.current) return;
      const focusable = [...panel.current.querySelectorAll<HTMLElement>('a[href], button, input')];
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    window.addEventListener("keydown", trap);
    return () => window.removeEventListener("keydown", trap);
  }, [open]);
  const terms = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  const results = terms.length ? entries.filter(entry => terms.every(term => `${entry.title} ${entry.keywords}`.toLocaleLowerCase().includes(term))).slice(0, 8) : entries.filter(entry => ["Our doctors", "Patient guide", "Contact & directions", "Request an appointment"].includes(entry.title));
  return <>
    <button ref={trigger} className="site-search-trigger" type="button" onClick={() => setOpen(true)} aria-label="Search the website"><Search size={18} /><span>Search</span></button>
    {open && <div className="site-search-overlay" onMouseDown={event => { if (event.target === event.currentTarget) close(); }}><div ref={panel} className="site-search-panel" role="dialog" aria-modal="true" aria-label="Search LVR Hospital"><div className="site-search-field"><Search size={22} /><input ref={input} aria-label="Search LVR Hospital" placeholder="Search doctors, specialties, visit information…" value={query} onChange={event => setQuery(event.target.value)} /><button type="button" onClick={close} aria-label="Close search"><X size={21} /></button></div><p className="site-search-caption">{query ? `${results.length} ${results.length === 1 ? "result" : "results"}` : "Popular pages"}</p><div className="site-search-results">{results.map(result => <Link key={result.href} href={result.href} onClick={() => { setOpen(false); setQuery(""); }}><span>{result.title}</span><small>{result.type}</small></Link>)}{results.length === 0 && <p className="site-search-empty">No match found. Try a doctor’s name or specialty, or contact reception for help.</p>}</div></div></div>}
  </>;
}
