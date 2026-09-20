import { ArrowUpRight, Quote, Star } from "lucide-react";
import { hospital } from "@/lib/hospital";
import { Eyebrow } from "./ui";

const reviews = [
  { name: "MOUNI PRIYA Kshatriya", initials: "MP", text: "I had a great experience at the hospital. The doctors were very attentive and took excellent care of the patients." },
  { name: "BALA RAVINDRA KUMAR", initials: "BR", text: "The doctors were very patient, listened carefully to the concerns, and explained the treatment clearly." },
  { name: "Satti Mahesh", initials: "SM", text: "Every staff member treated us with respect and compassion. Highly recommended for anyone seeking quality healthcare." },
  { name: "Mohammad Haq", initials: "MH", text: "Best hospital in town which has good management and staff." },
  { name: "VANAMA. RAMSAI.", initials: "VR", text: "They have the best doctors in the city. Pediatric sir treatment is too good." },
] as const;

function Stars() {
  return <span className="review-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} fill="currentColor" />)}</span>;
}

export function GoogleReviews() {
  return <section className="section google-reviews-section" aria-labelledby="google-reviews-title"><div className="container">
    <div className="google-reviews-heading"><div><Eyebrow>PATIENT FEEDBACK</Eyebrow><h2 id="google-reviews-title">Kind words from<br /><em>our community.</em></h2></div><div className="google-rating" aria-label="4.8 out of 5 from 255 Google reviews"><strong>4.8</strong><div><span className="google-stars" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={18} fill="currentColor" />)}</span><p>255 Google reviews</p></div></div></div>
    <div className="google-review-cards">
      {reviews.map((review, index) => <article className={`google-review-card${index === 0 ? " google-review-featured" : ""}`} key={review.name}>
        <div className="google-review-card-top"><Stars /><span className="review-source">GOOGLE REVIEW</span></div>
        <Quote className="google-review-quote" size={24} aria-hidden="true" />
        <blockquote>“{review.text}”</blockquote>
        <footer><span>{review.initials}</span><div><strong>{review.name}</strong><small>Public review on Google</small></div></footer>
      </article>)}
      <aside className="google-review-cta"><span className="google-g-mark" aria-hidden="true">G</span><div><h3>See every patient review.</h3><p>Open LVR Hospital’s verified Google Reviews page or share your own experience.</p></div><div className="google-review-actions"><a className="button" href={hospital.reviewsUrl} target="_blank" rel="noopener noreferrer">Read all reviews <ArrowUpRight size={17} /></a><a className="text-link" href={hospital.reviewsUrl} target="_blank" rel="noopener noreferrer">Write a review <ArrowUpRight size={16} /></a></div><small>Selected public reviews. Rating and review count checked in September 2026 and may change on Google.</small></aside>
    </div>
  </div></section>;
}
