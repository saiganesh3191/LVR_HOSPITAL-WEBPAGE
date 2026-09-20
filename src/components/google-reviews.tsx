import { ArrowUpRight, Star } from "lucide-react";
import { hospital } from "@/lib/hospital";
import { Eyebrow } from "./ui";

export function GoogleReviews() {
  return <section className="section google-reviews-section" aria-labelledby="google-reviews-title"><div className="container">
    <div className="google-reviews-heading"><div><Eyebrow>PATIENT FEEDBACK</Eyebrow><h2 id="google-reviews-title">Kind words from<br /><em>our community.</em></h2></div><div className="google-rating" aria-label="4.9 out of 5 on Google"><strong>4.9</strong><div><span className="google-stars" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={18} fill="currentColor" />)}</span><p>Google rating</p></div></div></div>
    <div className="google-review-grid">
      <article className="google-review-card"><span className="review-source">GOOGLE REVIEW</span><div className="review-stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“I had a great experience at LVR Multispeciality Hospital.”</blockquote><p>The reviewer highlighted the hospital’s cleanliness, accessible location, gentle care, and reasonable pricing.</p><footer><span>MR</span><div><strong>Mallikarjun Rao</strong><small>Patient feedback · January 2026</small></div></footer></article>
      <aside className="google-review-cta"><span className="google-g-mark" aria-hidden="true">G</span><div><h3>See what patients are saying.</h3><p>Read the latest feedback on Google or share your own experience with LVR Hospital.</p></div><div className="google-review-actions"><a className="button" href={hospital.mapsUrl} target="_blank" rel="noopener noreferrer">Read Google reviews <ArrowUpRight size={17} /></a><a className="text-link" href={hospital.mapsUrl} target="_blank" rel="noopener noreferrer">Write a review <ArrowUpRight size={16} /></a></div><small>Ratings and review counts may change on Google.</small></aside>
    </div>
  </div></section>;
}
