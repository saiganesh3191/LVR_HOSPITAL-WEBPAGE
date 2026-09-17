"use client";

import { useEffect, useState } from "react";
import { Check, Phone, X } from "lucide-react";

function isDesktop() {
  return window.matchMedia("(pointer: fine) and (min-width: 761px)").matches;
}

/** Desktop phone links copy the number; phones keep the native dialer link. */
export function PhoneLinks() {
  const [number, setNumber] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    async function handleClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>('a[href^="tel:"]');
      if (!link || link.dataset.callApp === "true" || !isDesktop()) return;
      event.preventDefault();
      const phoneNumber = decodeURIComponent(link.getAttribute("href")!.slice(4));
      try {
        await navigator.clipboard.writeText(phoneNumber);
        setNumber(phoneNumber);
        setError(false);
      } catch {
        setNumber(phoneNumber);
        setError(true);
      }
    }
    function annotate() {
      document.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]:not([data-call-app])').forEach(link => {
        if (isDesktop()) link.title = "Copy number to call from your phone";
        else link.removeAttribute("title");
      });
    }
    document.addEventListener("click", handleClick);
    annotate();
    const observer = new MutationObserver(annotate);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", annotate);
    return () => { document.removeEventListener("click", handleClick); observer.disconnect(); window.removeEventListener("resize", annotate); };
  }, []);

  if (!number) return null;
  return <div className="phone-toast" role="status"><span className="phone-toast-icon">{error ? <Phone size={18} /> : <Check size={18} />}</span><div><strong>{error ? "Call LVR Hospital" : "Number copied"}</strong><span>{number} · {error ? "Use your phone to dial this number." : "Paste it into your phone or calling app."}</span></div><a data-call-app="true" href={`tel:${number}`}>Use calling app</a><button type="button" aria-label="Dismiss phone notice" onClick={() => setNumber("")}><X size={17} /></button></div>;
}
