"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const DISPLAY_TIME_MS = 5000;

export function DussehraWishes() {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setClosing(true), DISPLAY_TIME_MS - 450);
    const removeTimer = window.setTimeout(() => setVisible(false), DISPLAY_TIME_MS);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  function dismiss() {
    setClosing(true);
    window.setTimeout(() => setVisible(false), 320);
  }

  if (!visible) return null;

  return (
    <section className={`dussehra-wish${closing ? " is-closing" : ""}`} role="status" aria-live="polite" aria-label="Dussehra wishes from LVR Multi Speciality Hospital">
      <button className="dussehra-backdrop" type="button" onClick={dismiss} aria-label="Close Dussehra wishes" />
      <div className="dussehra-ambient" aria-hidden="true"><i /><i /><i /></div>
      <div className="dussehra-poster-card">
        <button className="dussehra-close" type="button" onClick={dismiss} aria-label="Close Dussehra wishes">
          <X size={20} />
        </button>
        <Image
          className="dussehra-poster"
          src="/media/festivals/lvr-dussehra-2026.png"
          alt="Dussehra greetings from LVR Multi Speciality Hospital and doctors Dr. V. Lakshman Sai, Dr. V. Prathyusha and Dr. K. Chaithanya"
          width={813}
          height={818}
          priority
          sizes="(max-width: 720px) calc(100vw - 24px), 720px"
        />
        <div className="dussehra-timer" aria-hidden="true" />
      </div>
    </section>
  );
}
