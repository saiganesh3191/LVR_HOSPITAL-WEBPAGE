import Image from "next/image";
import { Doctor } from "@/lib/hospital";

export const portraitSources: Record<string, { src: string; position: string }> = {
  "lakshman-sai": { src: "/images/team/lakshmansai-vanama.webp", position: "50% 64%" },
  "prathyusha": { src: "/images/team/prathyusha.webp", position: "50% 60%" },
  "chaithanya": { src: "/images/team/k-chaithanya.webp", position: "50% 30%" },
  "vijay-varma": { src: "/images/team/vijesh-varma.webp", position: "50% 30%" },
  "adil-pasha": { src: "/images/team/adil-basha.webp", position: "50% 30%" },
};

export function DoctorPortrait({ doctor, profile = false }: { doctor: Doctor; profile?: boolean }) {
  const photo = portraitSources[doctor.slug];
  return <div className={`doctor-photo${profile ? " doctor-photo-profile" : ""} ${doctor.color}`}>
    {photo ? <Image src={photo.src} alt={doctor.name} fill sizes={profile ? "(max-width: 760px) 100vw, 40vw" : "(max-width: 760px) 100vw, (max-width: 1000px) 50vw, 33vw"} style={{ objectPosition: photo.position }} /> : <span className="portrait-initials" aria-hidden="true">{doctor.initials}</span>}
    <span className="portrait-department">{doctor.department}</span>
  </div>;
}
