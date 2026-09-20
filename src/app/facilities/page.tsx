import type { Metadata } from "next";
import { HospitalFacilities } from "@/components/hospital-facilities";
import { Hospital360 } from "@/components/hospital-360";
import { CareCta, PageIntro } from "@/components/ui";
export const metadata: Metadata = { title: "Hospital facilities" };
export default function FacilitiesPage() {
  return <><PageIntro eyebrow="Hospital facilities" title={<>Care for your needs.<br /><em>Support for your stay.</em></>} description="Explore LVR’s inpatient capacity, emergency support, laboratory, pharmacy, rooms, and visitor facilities." /><HospitalFacilities /><Hospital360 /><CareCta /></>;
}
