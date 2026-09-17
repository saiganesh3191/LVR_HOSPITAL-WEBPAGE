"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, CheckCircle2, MessageCircle, ShieldCheck } from "lucide-react";
import { departments, doctors, whatsappUrl } from "@/lib/hospital";

type Details = { name: string; age: string; sex: string; village: string; department: string; doctor: string; date: string; consent: boolean };

function todayInIndia() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}
function formatDate(value: string) {
  return value ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${value}T12:00:00+05:30`)) : "Please suggest an available date";
}
export function AppointmentForm({ initialDepartment, initialDoctor }: { initialDepartment: string; initialDoctor: string }) {
  const [details, setDetails] = useState<Details>({ name: "", age: "", sex: "", village: "", department: initialDepartment, doctor: initialDoctor, date: "", consent: false });
  const [review, setReview] = useState(false);
  const [error, setError] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const availableDoctors = doctors.filter(doctor => doctor.departmentSlug === details.department);
  const selectedDepartment = departments.find(department => department.slug === details.department)?.name ?? "";
  const selectedDoctor = doctors.find(doctor => doctor.slug === details.doctor)?.name ?? "Any available doctor";
  const message = `Hello LVR Hospital, I would like to request an appointment.\n\nPatient name: ${details.name.trim()}\nAge: ${details.age}\nSex: ${details.sex}\nVillage / town: ${details.village.trim()}\nDepartment: ${selectedDepartment}\nPreferred doctor: ${selectedDoctor}\nPreferred date: ${formatDate(details.date)}\n\nPlease confirm availability and the consultation fee. I understand this is a request, not a confirmed appointment.`;
  function setField<Key extends keyof Details>(key: Key, value: Details[Key]) { setDetails(previous => ({ ...previous, [key]: value })); setError(""); }
  function moveToReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!details.name.trim() || !details.village.trim()) { setError("Please enter your name and village or town."); return; }
    if (!details.department || !details.consent) { setError("Please select a department and agree to share your details on WhatsApp."); return; }
    if (details.date && details.date < todayInIndia()) { setError("Please choose today or a future date."); return; }
    setReview(true);
    requestAnimationFrame(() => heading.current?.focus());
  }
  return <div className="appointment-form-panel"><div className="form-progress" aria-label="Appointment request progress"><span className={!review ? "current" : "complete"}><b>{review ? <Check size={13} /> : "01"}</b>Your details</span><i /><span className={review ? "current" : ""}><b>02</b>Review & send</span></div>
    {!review ? <form onSubmit={moveToReview}><h2 ref={heading} tabIndex={-1}>Let’s get to know you.</h2><p className="form-intro">Fields marked <span aria-hidden="true">*</span> are required.</p><div className="form-grid">
      <label className="field full-field" htmlFor="patient-name">Patient’s full name <span>*</span><input id="patient-name" name="name" autoComplete="name" required maxLength={100} value={details.name} onChange={event => setField("name", event.target.value)} placeholder="Full name" /></label>
      <label className="field" htmlFor="patient-age">Age in years <span>*</span><input id="patient-age" name="age" type="number" inputMode="numeric" min="0" max="120" step="1" required value={details.age} onChange={event => setField("age", event.target.value)} placeholder="e.g. 32" /><small>For a baby under 1 year, enter 0.</small></label>
      <label className="field" htmlFor="patient-sex">Sex <span>*</span><select id="patient-sex" name="sex" value={details.sex} required onChange={event => setField("sex", event.target.value)}><option value="" disabled>Select</option><option>Female</option><option>Male</option><option>Other</option><option>Prefer not to say</option></select></label>
      <label className="field full-field" htmlFor="patient-village">Village / town <span>*</span><input id="patient-village" name="village" autoComplete="address-level2" required maxLength={100} value={details.village} onChange={event => setField("village", event.target.value)} placeholder="Where are you travelling from?" /></label>
      <label className="field" htmlFor="department">Department <span>*</span><select id="department" name="department" required value={details.department} onChange={event => { setDetails(previous => ({ ...previous, department: event.target.value, doctor: "" })); setError(""); }}><option value="" disabled>Choose a specialty</option>{departments.map(department => <option key={department.slug} value={department.slug}>{department.name}</option>)}</select></label>
      <label className="field" htmlFor="doctor">Preferred doctor <span className="optional">Optional</span><select id="doctor" name="doctor" disabled={!details.department} value={details.doctor} onChange={event => setField("doctor", event.target.value)}><option value="">Any available doctor</option>{availableDoctors.map(doctor => <option key={doctor.slug} value={doctor.slug}>{doctor.name}</option>)}</select></label>
      <label className="field full-field" htmlFor="preferred-date">Preferred date <span className="optional">Optional</span><input id="preferred-date" name="date" type="date" min={todayInIndia()} value={details.date} onChange={event => setField("date", event.target.value)} /><small>This is a preference. Our team will confirm the date and time.</small></label>
    </div><label className="consent"><input type="checkbox" required checked={details.consent} onChange={event => setField("consent", event.target.checked)} /><span>I agree to share these details with LVR Hospital through WhatsApp for my appointment request. I have read the <Link href="/privacy" target="_blank">privacy information</Link>.</span></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button form-submit" type="submit">Review appointment request <ArrowRight size={18} /></button><p className="form-privacy"><ShieldCheck size={15} />Your details stay in this form until you choose to send them.</p></form>
    : <div className="review-panel"><span className="review-check"><CheckCircle2 size={33} strokeWidth={1.5} /></span><h2 ref={heading} tabIndex={-1}>Looking good.<br /><em>Let’s check the details.</em></h2><p className="form-intro">Nothing has been sent yet. Review your details below.</p><dl className="review-details">{[["Patient", details.name.trim()], ["Age / sex", `${details.age} years / ${details.sex}`], ["Village / town", details.village.trim()], ["Department", selectedDepartment], ["Preferred doctor", selectedDoctor], ["Preferred date", formatDate(details.date)]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><div className="review-notice"><MessageCircle size={21} /><p><strong>One more step on WhatsApp.</strong><br />Tap below to open your prepared message, then press Send in WhatsApp. Your appointment is confirmed only when our team replies.</p></div><a className="button form-submit" href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer">Continue to WhatsApp <ArrowUpRight size={19} /></a><button type="button" className="review-back text-link" onClick={() => { setReview(false); requestAnimationFrame(() => heading.current?.focus()); }}><ArrowLeft size={16} />Edit my details</button><p className="form-privacy"><ShieldCheck size={15} />No payment is collected on this website.</p></div>}
  </div>;
}
