import { profileDetails } from "@/lib/hospital-details";
import { CheckList, Eyebrow } from "./ui";

export function ProfileBackground({ slug }: { slug: string }) {
  const detail = profileDetails[slug];
  if (!detail) return null;
  return <section className="section profile-background"><div className="container"><div className="profile-detail-grid"><div><Eyebrow>GET TO KNOW YOUR DOCTOR</Eyebrow><h2>Clinical focus<br /><em>& background.</em></h2><p className="profile-detail-intro">These areas can help you choose whom to consult. Your doctor will assess your needs and advise on appropriate care.</p>{detail.languages && <div className="profile-languages"><h3>Languages spoken</h3><p>{detail.languages.join(" · ")}</p></div>}{detail.registration && <p className="small-note">{detail.registration}</p>}</div><div className="profile-detail-sections"><section><h3>{slug === "lakshman-sai" ? "Special interests & expertise" : "Areas of care"}</h3><CheckList items={detail.focus} /></section>{detail.education && <section><h3>Education & training</h3><ol className="education-timeline">{detail.education.map(item => <li key={item.title}><span>{item.years}</span><h4>{item.title}</h4><p>{item.institution}</p></li>)}</ol></section>}{detail.career && <section><h3>Professional background</h3><CheckList items={detail.career} /></section>}{detail.recognition && <section><h3>Academic work & recognition</h3><CheckList items={detail.recognition} /></section>}</div></div></div></section>;
}
