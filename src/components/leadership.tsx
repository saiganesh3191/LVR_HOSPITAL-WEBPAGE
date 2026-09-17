import Image from "next/image";
import { Eyebrow } from "./ui";

const leaders = [
  { name: "Dr. Lakshmansai Vanama", role: "Founder & Director", src: "/images/team/lakshmansai-vanama.webp", position: "50% 64%" },
  { name: "Vanama Srinivasu Deva Rao", role: "Chairman", src: "/images/team/chairman.webp", position: "50% 46%" },
  { name: "Ram Sai Vanama", role: "Managing Director", src: "/images/team/managing-director.webp", position: "50% 28%" },
];

export function Leadership() {
  return <section className="section leadership-section"><div className="container"><div className="section-heading"><div><Eyebrow>HOSPITAL LEADERSHIP</Eyebrow><h2>The people<br /><em>behind LVR.</em></h2></div><p className="section-description">Meet our founder, chairman, and managing director.</p></div><div className="leadership-grid">{leaders.map(person => <article className="leader-card" key={person.role}><div className="leader-photo"><Image src={person.src} alt={person.name} fill sizes="(max-width: 760px) 100vw, 50vw" style={{ objectPosition: person.position }} /></div><div className="leader-caption"><span>{person.role}</span><h3>{person.name}</h3></div></article>)}</div></div></section>;
}
