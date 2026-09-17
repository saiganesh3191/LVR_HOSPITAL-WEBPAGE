"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: content stays visible without JavaScript. */
export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;

    function setup() {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
      if (preference.matches || !("IntersectionObserver" in window)) return;

      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          observer?.unobserve(entry.target);
          const siblings = Array.from(entry.target.parentElement?.children ?? []);
          const stagger = entry.target.matches(".doctor-card, .journey-step, .specialty-card")
            ? (siblings.indexOf(entry.target) % 3) * 70 : 0;
          const animation = entry.target.animate([
            { opacity: 0.25, transform: "translateY(22px)" },
            { opacity: 1, transform: "translateY(0)" },
          ], { duration: 650, delay: stagger, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" });
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        });
      }, { threshold: 0.08 });

      document.querySelectorAll(".section-heading, .doctor-card, .specialty-card, .journey-step, .community-statement, .community-facts, .faq-grid, .care-cta .container, .contact-method, .address-card, .guide-card").forEach(element => observer?.observe(element));
    }

    setup();
    preference.addEventListener("change", setup);
    return () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      preference.removeEventListener("change", setup);
    };
  }, [pathname]);

  return null;
}
