"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Clock3, ClipboardList, MapPin, Phone, X } from "lucide-react";
import { hospital } from "@/lib/hospital";

export function VisitDrawer() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);

  function show() {
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : trigger.current;
    dialog.current?.showModal();
    if (dialog.current) dialog.current.scrollTop = 0;
    setOpen(true);
  }

  useEffect(() => {
    const openGuide = () => show();
    window.addEventListener("open-lvr-visit-guide", openGuide);
    return () => window.removeEventListener("open-lvr-visit-guide", openGuide);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  function close() { dialog.current?.close(); }

  return <>
    <button ref={trigger} className="visit-drawer-trigger" aria-haspopup="dialog" aria-controls="visit-drawer" onClick={show}><ClipboardList size={18} /><span>Before your visit</span></button>
    <dialog ref={dialog} id="visit-drawer" className="visit-drawer" onKeyDown={event => {
        if (event.key !== "Tab") return;
        const items = event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }} aria-labelledby="visit-drawer-title" onClose={() => { setOpen(false); (opener.current?.isConnected ? opener.current : trigger.current)?.focus(); }} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close(); } }}>
      <div className="visit-drawer-heading"><span>YOUR LVR VISIT</span><button type="button" className="drawer-close" aria-label="Close visit guide" onClick={close} autoFocus><X size={23} /></button></div>
      <div className="visit-drawer-body"><p className="eyebrow">A LITTLE PREPARATION</p><h2 id="visit-drawer-title">Feel ready.<br /><em>We’re here to help.</em></h2><p className="drawer-intro">A few useful details, all in one place.</p>
        <section className="drawer-section"><Clock3 size={23} /><div><h3>Choose your time</h3><p>The hospital is open 24/7. Individual doctor timings vary. Call reception to confirm before travelling.</p><Link href="/doctors" onClick={close}>Explore our doctors <ArrowUpRight size={16} /></Link></div></section>
        <section className="drawer-section"><ClipboardList size={23} /><div><h3>Bring along</h3><ul>{["Previous prescriptions and reports", "A list of your current medicines", "Questions you want to ask your doctor"].map(item => <li key={item}><Check size={16} />{item}</li>)}</ul></div></section>
        <section className="drawer-section"><MapPin size={23} /><div><h3>Find your way</h3><p>{hospital.address}</p><a href={hospital.mapsUrl} target="_blank" rel="noopener noreferrer">Open Google Maps <ArrowUpRight size={16} /></a></div></section>
        <div className="drawer-note">An online request is confirmed only when the hospital team replies. For urgent care, please call directly.</div>
        <Link href="/appointment" className="button" onClick={close}>Request an appointment <ArrowUpRight size={18} /></Link><a className="drawer-phone" href={hospital.phoneHref}><Phone size={17} />{hospital.phone}</a>
      </div>
    </dialog>
  </>;
}
