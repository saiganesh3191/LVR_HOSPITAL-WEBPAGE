"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { HeartPulse, ShieldCheck, Sparkles, X } from "lucide-react";

const DISPLAY_TIME_MS = 5000;

export function DussehraWishes() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), DISPLAY_TIME_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <section className="dussehra-wish" role="status" aria-live="polite" aria-label="Dussehra wishes from LVR Hospital">
      <div className="dussehra-backdrop" aria-hidden="true" />
      <div className="dussehra-card">
        <button className="dussehra-close" type="button" onClick={() => setVisible(false)} aria-label="Close Dussehra wishes">
          <X size={19} />
        </button>

        <div className="dussehra-portrait">
          <Image src="/images/team/lakshmansai-vanama.webp" alt="Dr. Lakshman Sai Vanama of LVR Multi Speciality Hospital" fill sizes="(max-width: 680px) 180px, 250px" priority />
          <div className="dussehra-doctor-name"><strong>Dr. Lakshman Sai Vanama</strong><span>and the LVR Hospital team</span></div>
          <div className="dussehra-lamp" aria-hidden="true">
            <span className="dussehra-flame" />
            <span className="dussehra-diya" />
            <i className="spark spark-one" /><i className="spark spark-two" /><i className="spark spark-three" />
          </div>
        </div>

        <div className="dussehra-copy">
          <p className="dussehra-kicker"><Sparkles size={15} /> LVR MULTI SPECIALITY HOSPITAL</p>
          <h2>Wishing you a healthy and<br /><em>joyful Dussehra</em></h2>
          <p>Dr. Lakshman Sai Vanama and the entire LVR Hospital family wish you renewed hope, stronger health and happiness this festive season.</p>
          <div className="dussehra-care-note">
            <span><ShieldCheck size={18} /> Protected by care</span>
            <span><HeartPulse size={18} /> Guided by compassion</span>
          </div>
        </div>

        <div className="dussehra-seal" aria-hidden="true">
          <HeartPulse size={29} />
          <span>Helping Hands<br />Caring Hearts</span>
        </div>
        <div className="dussehra-timer" aria-hidden="true" />
      </div>
    </section>
  );
}
