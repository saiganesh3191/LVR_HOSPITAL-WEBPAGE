"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Stethoscope } from "lucide-react";

const steps = [
  { title: "Find your doctor", text: "Explore our departments and meet the people who care for you.", icon: Stethoscope, link: "/doctors", action: "Meet our doctors" },
  { title: "Request a visit", text: "Share a few details on WhatsApp. Our team will confirm the date and time.", icon: CalendarDays, link: "/appointment", action: "Plan your visit" },
  { title: "Meet your care team", text: "Bring your previous reports, your questions, and someone you trust if you’d like.", icon: MapPin, link: "/contact", action: "Find your way" },
];

export function CareJourney() {
  const journey = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = journey.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        element.classList.add("journey-entered");
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={journey} className="care-journey"><div className="journey-connector" aria-hidden="true"><span /></div><div className="journey-grid">{steps.map((step, index) => <article className="journey-step" key={step.link}><div className="journey-milestone"><span className="journey-dot">0{index + 1}</span><step.icon size={27} strokeWidth={1.5} /></div><h3>{step.title}</h3><p>{step.text}</p><Link href={step.link}>{step.action}<ArrowUpRight size={18} /></Link></article>)}</div></div>;
}
