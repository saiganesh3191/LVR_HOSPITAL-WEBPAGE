import type { Metadata } from "next";
import { CareCta, DepartmentCard, PageIntro } from "@/components/ui";
import { departments, hospital } from "@/lib/hospital";
import { Phone } from "lucide-react";

export const metadata: Metadata = { title: "Our specialties" };
export default function DepartmentsPage() {
  return <><PageIntro eyebrow="Our specialties" title={<>Care for every chapter<br /><em>of family life.</em></>} description="Explore our departments and contact reception to plan the right consultation for your needs." /><section className="section"><div className="container"><div className="three-grid">{departments.map((department, index) => <DepartmentCard key={department.slug} department={department} index={index} />)}</div><div className="help-panel"><div><h2>Not sure where to start?</h2><p>Tell our reception team what you need help with. They can guide you to a suitable department.</p></div><a href={hospital.phoneHref} className="button button-outline"><Phone size={17} />Call our team</a></div></div></section><CareCta /></>;
}
