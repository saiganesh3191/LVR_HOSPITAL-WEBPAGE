import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Zap, ShieldCheck, Sun } from "lucide-react";

export type TreatmentCard = {
  id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  tag?: string;
  iconType?: "zap" | "shield" | "sparkles" | "sun";
};

export const dermatologyTreatments: TreatmentCard[] = [
  {
    id: "prp-gfc",
    title: "PRP / GFC Therapy",
    category: "Hair Regrowth & Skin Rejuvenation",
    description: "Revitalize hair density and skin elasticity using advanced Platelet-Rich Plasma and Growth Factor Concentrate treatments.",
    image: "/images/prp-treatment.webp",
    tag: "Popular Hair & Skin Care",
  },
  {
    id: "chemical-peels",
    title: "Chemical Peels",
    category: "Pigmentation & Skin Texture",
    description: "Target acne scars, hyperpigmentation, and uneven tone with dermatologist-curated medical peels.",
    image: "/images/chemical-peel.webp",
    tag: "Glow & Tone",
  },
  {
    id: "medifacial",
    title: "MediFacial",
    category: "Deep Hydration & Rejuvenation",
    description: "Nourishing, medical-grade facial treatments tailored to restore deep hydration, radiance, and healthy skin barrier.",
    image: "/images/medifacial.webp",
    tag: "Aesthetic Care",
  },

  {
    id: "phototherapy",
    title: "Phototherapy",
    category: "Narrowband UVB / UVA Care",
    description: "Advanced whole-body light therapy cabinet for managing vitiligo, psoriasis, eczema, and chronic skin conditions.",
    image: "/images/phototherapy-reference.webp",
    tag: "Specialised Equipment",
    iconType: "sun",
  },
  {
    id: "cautery-rfc",
    title: "Cautery / RFC",
    category: "Procedural Dermatology",
    description: "Safe, precise radiofrequency cautery for removing skin tags, warts, moles, and benign skin growths.",
    image: "/images/cautery-rfc.webp",
    tag: "Quick Procedure",
    iconType: "zap",
  },
  {
    id: "acne-scar-care",
    title: "Acne & Scar Care",
    category: "Clear Skin & Blemish Control",
    description: "Comprehensive medical evaluation and scar reduction therapies customized for acne-prone skin.",
    image: "/images/acne-scar-care.webp",
    tag: "Skin Health",
    iconType: "shield",
  },
];


export function DermatologyTreatments() {
  return (
    <section className="dermatology-treatments-section">
      <div className="dermatology-treatments-header">
        <div>
          <span className="dermatology-badge">
            <Sparkles size={14} /> DERMATOLOGY &amp; COSMETOLOGY
          </span>
          <h2>
            Featured Treatments<br />
            <em>at LVR Dermatology Clinic.</em>
          </h2>
        </div>
        <p className="dermatology-treatments-intro">
          Personalized skin, hair, and procedural dermatological treatments provided by Dr. Prathyusha.
        </p>
      </div>

      <div className="dermatology-treatments-grid">
        {dermatologyTreatments.map((item) => (
          <div key={item.id} className="treatment-card">
            {item.image ? (
              <div className="treatment-card-media">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="treatment-card-img"
                />
                {item.tag && <span className="treatment-tag">{item.tag}</span>}
              </div>
            ) : (
              <div className={`treatment-card-media-placeholder theme-${item.iconType || "sparkles"}`}>
                <div className="placeholder-content">
                  {item.iconType === "zap" && <Zap size={38} className="placeholder-icon" />}
                  {item.iconType === "shield" && <ShieldCheck size={38} className="placeholder-icon" />}
                  {item.iconType === "sun" && <Sun size={38} className="placeholder-icon" />}
                  {(!item.iconType || item.iconType === "sparkles") && <Sparkles size={38} className="placeholder-icon" />}
                  <span className="placeholder-label">{item.title}</span>
                </div>
                {item.tag && <span className="treatment-tag">{item.tag}</span>}
              </div>
            )}
            <div className="treatment-card-body">
              <span className="treatment-category">{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link
                href={`/appointment?department=dermatology`}
                className="treatment-card-link"
              >
                Book consultation <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

