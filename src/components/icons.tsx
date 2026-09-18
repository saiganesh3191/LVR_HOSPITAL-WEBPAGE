import Image from "next/image";
import { Activity, Baby, Sparkles, Stethoscope } from "lucide-react";

export function SpecialtyIcon({ slug, size = 30 }: { slug: string; size?: number }) {
  const Icon = slug === "dermatology" ? Sparkles : slug === "pediatrics" ? Baby : ["gastroenterology", "nephrology"].includes(slug) ? Activity : Stethoscope;
  return <Icon size={size} strokeWidth={1.4} aria-hidden="true" />;
}

export function BrandMark({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return <span className={`official-emblem ${className}`} aria-hidden="true"><Image src="/branding/lvr-official-logo.webp" alt="" width={1200} height={1271} priority={priority} /></span>;
}

export function HospitalLogo({ priority = false }: { priority?: boolean }) {
  return <span className="official-logo" role="img" aria-label="LVR Multi Speciality Hospital - Helping hands and caring hearts"><BrandMark priority={priority} /><span className="logo-wordmark"><strong>LVR</strong><span>MULTI SPECIALITY HOSPITAL</span><small>HELPING HANDS AND CARING HEARTS</small></span></span>;
}
