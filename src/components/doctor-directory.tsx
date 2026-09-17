"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { departments, doctors } from "@/lib/hospital";
import { DoctorCard } from "./ui";

export function DoctorDirectory() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const filtered = doctors.filter(doctor => (filter === "all" || doctor.departmentSlug === filter) && `${doctor.name} ${doctor.department}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <><div className="directory-toolbar"><div className="filter-tabs" aria-label="Filter by specialty"><button aria-pressed={filter === "all"} onClick={() => setFilter("all")}>All doctors</button>{departments.map(department => <button key={department.slug} aria-pressed={filter === department.slug} onClick={() => setFilter(department.slug)}>{department.name}</button>)}</div><div className="search-field"><Search size={18} /><input aria-label="Search doctors by name or specialty" placeholder="Find your doctor" value={query} onChange={event => setQuery(event.target.value)} />{query && <button onClick={() => setQuery("")} aria-label="Clear search"><X size={15} /></button>}</div></div><p className="directory-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? "doctor" : "doctors"}{filter !== "all" ? ` in ${departments.find(department => department.slug === filter)?.name}` : " · Here for your family"}</p><div className="doctor-grid">{filtered.map(doctor => <DoctorCard key={doctor.slug} doctor={doctor} />)}</div>{filtered.length === 0 && <div className="empty-state"><Search size={34} /><h2>No doctors match your search.</h2><p>Try another name or view all specialties.</p><button className="button button-outline" onClick={() => { setFilter("all"); setQuery(""); }}>Reset search</button></div>}<p className="small-note directory-note">The hospital is open 24/7. Individual doctor schedules vary; please confirm availability with reception before visiting.</p></>;
}
