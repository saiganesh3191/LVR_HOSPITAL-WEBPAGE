import { PhotoViewer } from "./photo-viewer";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function HospitalBuilding({ caption = true }: { caption?: boolean }) {
  return <figure className="hospital-building"><div className="building-photo"><PhotoViewer src="/images/lvr-building.webp" alt="Exterior of LVR Multi Speciality Hospital in Sathupally, with the hospital sign above the entrance" title="LVR Hospital exterior" width={613} height={578} /></div>{caption && <figcaption><span>LVR MULTI SPECIALITY HOSPITAL</span><Link href="/contact">Jupalli Eye Hospital Road, Sathupally <ArrowUpRight size={16} /></Link></figcaption>}</figure>;
}
