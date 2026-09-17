"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, Phone, Stethoscope } from "lucide-react";
import { departments, doctors, hospital } from "@/lib/hospital";
import { CareArtwork } from "./care-artwork";
import { SpecialtyIcon } from "./icons";

export function CareFinder() {
  const [department, setDepartment] = useState("");
  const router = useRouter();
  return <section className="care-finder" aria-label="Find a consultation"><div className="container finder-inner"><div className="finder-title"><Stethoscope size={26} strokeWidth={1.4} /><div><span>YOUR NEXT STEP STARTS HERE</span><h2>How can we help?</h2></div></div><form className="finder-form" onSubmit={event => { event.preventDefault(); router.push(department ? `/appointment?department=${department}` : "/doctors"); }}><label htmlFor="care-department" className="sr-only">Choose a department to request a visit</label><select id="care-department" value={department} onChange={event => setDepartment(event.target.value)}><option value="">Choose your department</option>{departments.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select><button className="button" type="submit">Find my care <ArrowUpRight size={19} /></button></form><a className="finder-call" href={hospital.phoneHref}><span>Prefer a conversation?</span><strong><Phone size={16} />{hospital.phone}</strong></a></div></section>;
}

export function SpecialtyExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const department = departments[activeIndex];
  const doctor = doctors.find(item => item.slug === department.doctor)!;
  function keyboardTab(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % departments.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + departments.length - 1) % departments.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = departments.length - 1;
    else return;
    event.preventDefault(); setActiveIndex(next); tabs.current[next]?.focus();
  }
  return <div className="specialty-explorer"><div className="specialty-tabs" role="tablist" aria-label="Explore hospital departments" aria-orientation="vertical">{departments.map((item, index) => <button ref={element => { tabs.current[index] = element; }} key={item.slug} id={`tab-${item.slug}`} role="tab" aria-selected={index === activeIndex} aria-controls={index === activeIndex ? `panel-${item.slug}` : undefined} tabIndex={index === activeIndex ? 0 : -1} onClick={() => setActiveIndex(index)} onKeyDown={event => keyboardTab(event, index)}><span className="specialty-tab-number">0{index + 1}</span><span>{item.name}</span><ArrowUpRight size={22} /></button>)}</div><div key={department.slug} className="specialty-feature" role="tabpanel" id={`panel-${department.slug}`} aria-labelledby={`tab-${department.slug}`} tabIndex={0}><CareArtwork specialty={department.slug} /><div className="specialty-feature-top"><span className="feature-icon"><SpecialtyIcon slug={department.slug} size={49} /></span><span>CARE AT LVR / 0{activeIndex + 1}</span></div><h3>{department.short}</h3><p>{department.description}</p><ul>{department.focus.slice(0, 2).map(item => <li key={item}><Check size={16} />{item}</li>)}</ul><div className="feature-doctor"><span className="small-monogram">{doctor.initials}</span><div><strong>{doctor.name}</strong><span>{doctor.qualification} · {doctor.appointmentType === "Consultant" ? "Consultant" : doctor.department}</span></div></div><div className="feature-links"><Link className="button" href={`/appointment?department=${department.slug}`}>Request a consultation <ArrowUpRight size={18} /></Link><Link href={`/departments/${department.slug}`} aria-label={`Explore ${department.name}`}><ArrowRight size={22} /></Link></div></div></div>;
}
