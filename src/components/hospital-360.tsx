import Image from "next/image";
import { ExternalLink, RotateCw } from "lucide-react";
import { Eyebrow } from "./ui";

const photoSphereUrl = "https://www.google.com/maps/place/LVR+Multispeciality+Hospital/@17.2118097,80.8323926,3a,75y,90t/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgICnrqfbygE!2e10!3e12!6shttps:%2F%2Flh3.googleusercontent.com%2Fgps-cs-s%2FAHRPTWmAIZ8p3M5JchOiway6cEAEAarLYx5wdRAHap6ou-v9Bgucj0BR3srPd8FDwHhaagNmtXpWc-ZN48xtQY2a0oRfoqJCQGfGXuyBDHF4y84TQSbvvQ80Jux6V1fUmkXhdcL17k8Rtg%3Dw203-h135-k-no!7i7008!8i4672!4m7!3m6!1s0x3a3683a2c309cdc5:0x7cda15f93de6873c!8m2!3d17.2118092!4d80.8323339!10e5!16s%2Fg%2F11whpqr5m6";

export function Hospital360() {
  return <section className="section hospital-360" aria-labelledby="hospital-360-title">
    <div className="container hospital-360-grid">
      <a className="hospital-360-preview" href={photoSphereUrl} target="_blank" rel="noopener noreferrer" aria-label="Open the interactive LVR Hospital 360 degree tour in Google Maps">
        <Image src="/media/facilities/critical-care-ward.webp" alt="Interior of LVR Multi Speciality Hospital" fill sizes="(max-width: 760px) 100vw, 56vw" />
        <span className="hospital-360-orbit"><RotateCw size={34} /><strong>360°</strong></span>
        <span className="hospital-360-cue">Drag to look around on Google Maps <ExternalLink size={16} /></span>
      </a>
      <div className="hospital-360-copy">
        <Eyebrow>VIRTUAL HOSPITAL TOUR</Eyebrow>
        <h2 id="hospital-360-title">Explore LVR<br /><em>in 360°.</em></h2>
        <p>Take an interactive look inside LVR Multi Speciality Hospital before your visit. The official 360° Photo Sphere opens in Google Maps.</p>
        <a className="button" href={photoSphereUrl} target="_blank" rel="noopener noreferrer">Start the 360° tour <ExternalLink size={18} /></a>
        <small>Google Maps opens in a new tab. Drag or swipe to look around.</small>
      </div>
    </div>
  </section>;
}
