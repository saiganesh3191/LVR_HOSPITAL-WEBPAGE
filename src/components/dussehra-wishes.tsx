"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const DISPLAY_TIME_MS = 5000;

export function DussehraWishes() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), DISPLAY_TIME_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <section className="dussehra-wish" role="status" aria-live="polite" aria-label="Dussehra wishes from LVR Multi Speciality Hospital">
      <button className="dussehra-backdrop" type="button" onClick={() => setVisible(false)} aria-label="Close Dussehra wishes" />
      <div className="dussehra-poster-card">
        <button className="dussehra-close" type="button" onClick={() => setVisible(false)} aria-label="Close Dussehra wishes">
          <X size={20} />
        </button>
        <Image
          className="dussehra-poster"
          src="/media/festivals/lvr-dussehra-2026.png"
          alt="Dussehra greetings from LVR Multi Speciality Hospital and doctors Dr. V. Lakshman Sai, Dr. V. Prathyusha and Dr. K. Chaithanya"
          width={816}
          height={810}
          priority
          sizes="(max-width: 720px) calc(100vw - 24px), 720px"
        />
        <div className="dussehra-timer" aria-hidden="true" />
      </div>
    </section>
  );
}
