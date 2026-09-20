import type { Metadata } from "next";
import { GalleryExperience } from "@/components/gallery-experience";
import { PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Life at LVR — Photo & video gallery", description: "See hospital visits, team celebrations, community health outreach and everyday moments at LVR Multi Speciality Hospital, Sathupally." };

export default function GalleryPage() {
  return <><PageIntro eyebrow="Life at LVR" title={<>Care in action.<br /><em>People at heart.</em></>} description="A look at the people, community programmes and shared moments that shape LVR Multi Speciality Hospital." /><section className="section gallery-section"><div className="container"><GalleryExperience /></div></section></>;
}
