import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { hospital, whatsappUrl } from "@/lib/hospital";

export const metadata: Metadata = { title: "తెలుగు సమాచారం | LVR హాస్పిటల్", description: "సత్తుపల్లిలోని LVR మల్టీ స్పెషాలిటీ హాస్పిటల్ సమాచారం, వైద్య విభాగాలు, సంప్రదింపు వివరాలు." };

const specialties = [
  { name: "జనరల్ మెడిసిన్", doctor: "డా. లక్ష్మణ్‌సాయి వనమా", href: "/departments/general-medicine" },
  { name: "చర్మ వైద్యం", doctor: "డా. ప్రత్యూష పాపిశెట్టి", href: "/departments/dermatology" },
  { name: "పిల్లల వైద్యం", doctor: "డా. కె. చైతన్య", href: "/departments/pediatrics" },
  { name: "గ్యాస్ట్రోఎంటరాలజీ", doctor: "డా. ఎస్. ఆదిల్ బాషా", href: "/departments/gastroenterology" },
  { name: "నెఫ్రాలజీ", doctor: "డా. విజేష్ వర్మ", href: "/departments/nephrology" },
];

export default function TeluguPage() {
  return <div lang="te"><section className="section telugu-hero"><div className="container"><span className="updates-eyebrow">LVR MULTI SPECIALITY HOSPITAL · SATHUPALLY</span><h1>మీ కుటుంబానికి<br /><em>దగ్గరలో వైద్య సేవలు.</em></h1><p>సత్తుపల్లిలోని LVR మల్టీ స్పెషాలిటీ హాస్పిటల్ గురించి ముఖ్యమైన సమాచారం ఇక్కడ చూడండి. ఆసుపత్రి 24 గంటలు అందుబాటులో ఉంటుంది. వైద్యుల సంప్రదింపు సమయాల కోసం ముందుగా ఫోన్ చేయండి.</p><div className="telugu-actions"><a className="button" href={hospital.phoneHref}><Phone size={18} /> ఆసుపత్రికి ఫోన్ చేయండి</a><a className="text-link" href={whatsappUrl("నమస్కారం LVR హాస్పిటల్, అపాయింట్‌మెంట్ గురించి తెలుసుకోవాలనుకుంటున్నాను.")} target="_blank" rel="noopener noreferrer">WhatsApp లో అడగండి <ArrowUpRight size={17} /></a></div></div></section><section className="section"><div className="container"><span className="updates-eyebrow">వైద్య విభాగాలు</span><h2 className="telugu-section-title">మా వైద్యులు</h2><div className="telugu-specialties">{specialties.map(item => <Link href={item.href} key={item.href}><strong>{item.name}</strong><span>{item.doctor}</span><ArrowUpRight size={19} /></Link>)}</div><p className="small-note">వైద్యుల పూర్తి వివరాలు ప్రస్తుతం ఆంగ్లంలో ఉన్నాయి. మీకు కావలసిన వైద్యుడి లభ్యతను రిసెప్షన్ వద్ద నిర్ధారించుకోండి.</p></div></section><section className="section section-tinted"><div className="container telugu-visit"><div><span className="updates-eyebrow">చిరునామా</span><h2>మమ్మల్ని సంప్రదించండి</h2><p><MapPin size={20} /> జూపల్లి ఐ హాస్పిటల్ రోడ్, మెయిన్ రోడ్, సత్తుపల్లి, తెలంగాణ 507303</p><p><Phone size={20} /> {hospital.phone}</p></div><a className="button" href={hospital.mapsUrl} target="_blank" rel="noopener noreferrer">Google Maps లో దారి చూడండి <ArrowUpRight size={17} /></a></div></section></div>;
}
