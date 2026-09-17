import Link from "next/link";
import { ArrowLeft, HeartHandshake } from "lucide-react";
export default function NotFound() { return <section className="section"><div className="container empty-state not-found"><HeartHandshake size={56} strokeWidth={1.1} /><p className="eyebrow">404 · PAGE NOT FOUND</p><h1>Let’s find your<br /><em>way back.</em></h1><p>The page you’re looking for isn’t here. Our home page is a good place to start.</p><Link className="button" href="/"><ArrowLeft size={18} />Back to home</Link></div></section>; }
