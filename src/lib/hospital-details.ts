// Public content from the completed client questionnaire and two CVs, reviewed 17 September 2026.
// CV contact details and home addresses are intentionally excluded.
export type ProfileDetail = {
  fee: number;
  languages?: string[];
  services?: string[];
  focus: string[];
  education?: { title: string; institution: string; years: string }[];
  career?: string[];
  recognition?: string[];
  registration?: string;
};
export const profileDetails: Record<string, ProfileDetail> = {
  "lakshman-sai": {
    fee: 300, languages: ["Telugu", "English", "Kannada", "Hindi"],
    services: [
      "Care of casualties and critically ill patients",
      "Geriatric care",
      "ICU patient care",
      "Viral fever treatment",
      "High fever treatment",
      "Pyrexia of unknown origin",
      "Infectious disease treatment",
      "HIV care",
      "Tuberculosis care",
      "Thyroid disorders",
      "High blood pressure treatment",
      "Diabetes treatment",
      "Vertigo treatment",
      "Acid-base and electrolyte imbalances",
      "Rheumatology and joint-related disorders",
      "Allergy and immunological disorders",
      "Anaemia and blood disorders",
      "Liver and kidney disorders",
      "Asthma and obstructive airway diseases",
      "Obesity and associated comorbidities",
      "Gestational diabetes and pregnancy-induced hypertension",
      "Unexplained weight loss",
      "Sepsis and multiple organ dysfunction syndrome (MODS)",
      "Dengue treatment",
      "Malaria treatment",
      "Adult vaccinations",
      "Master health check",
      "Master health check plans",
      "Hypothyroidism",
      "Hyperthyroidism",
      "Vaccination advice",
      "Diarrhoea treatment",
      "Vomiting treatment",
      "General physician consultation for fever",
      "Physician consultation for diabetes",
      "Thyroid consultation in Sathupally",
      "Constipation",
      "Gas-related digestive concerns",
    ],
    focus: ["General medical disorders", "Diabetes", "Rheumatological diseases", "Infectious diseases", "Allergy and immunological disorders"],
    education: [
      { title: "MBBS", institution: "NRI Institute of Medical Sciences, Visakhapatnam", years: "2012–2018" },
      { title: "MD, General Medicine", institution: "JSS Academy of Higher Education and Research, Mysuru", years: "2020–2023" },
    ],
    career: ["Founder and Director, LVR Multi Speciality Hospital.", "Senior residency in Critical Care Medicine at St. John’s Medical College, Bengaluru (2023–2024).", "Senior residency at Mamata Medical College, Khammam (2024–2025)."],
    recognition: ["Academic work includes research on acute ischaemic stroke and clinical case reports in general medicine.", "Moderated medical education sessions on MEDFLIX for doctors."],
    registration: "Telangana State Medical Council: 30655",
  },
  prathyusha: {
    fee: 300, languages: ["Telugu", "English", "Kannada", "Hindi"],
    focus: ["Hair fall and scalp concerns", "Nail conditions", "Sexually transmitted infections (STIs)", "Fungal skin infections (tinea)", "Scabies", "Psoriasis", "Hives (urticaria)", "Vitiligo"],
    education: [
      { title: "MBBS", institution: "Osmania Medical College, Hyderabad", years: "2013–2019" },
      { title: "MD, Dermatology, Venereology & Leprosy", institution: "JSS Medical College and Hospital, Mysuru", years: "2022–2025" },
    ],
    recognition: ["MD gold medallist; graduated with distinction.", "Dr. K. H. Basavaraj Memorial Gold Medal for the highest marks in MD Dermatology.", "Research interests include melasma assessment and fungal skin infections. Presented academic work at DERMACON 2024 and SARCD 2023."],
  },
  chaithanya: { fee: 300, languages: ["Telugu", "English", "Kannada", "Hindi"], focus: ["Growth concerns", "Reduced appetite", "Childhood infections", "Dengue and malaria", "Pneumonia"] },
  "adil-pasha": { fee: 500, focus: ["Gastroenterology outpatient consultations", "Upper gastrointestinal endoscopy enquiries"] },
  "vijay-varma": { fee: 500, focus: ["Nephrology outpatient consultations", "Ongoing kidney-health care"] },
};

export const facilities = [
  { title: "Emergency care", hours: "24 hours", description: "Emergency assessment and stabilisation. Call the hospital directly for urgent help.", icon: "emergency" },
  { title: "Intensive care unit", hours: "24 hours · 8 ICU beds", description: "An eight-bed ICU forms part of the hospital’s 20-bed inpatient capacity.", icon: "icu" },
  { title: "Laboratory", hours: "24 hours", description: "Blood investigations are available. Reception can confirm specific tests and preparation instructions.", icon: "lab" },
  { title: "Pharmacy", hours: "24 hours", description: "An on-site pharmacy supports patients’ medicine requirements.", icon: "pharmacy" },
  { title: "Ambulance support", hours: "24 hours", description: "Contact reception to arrange ambulance assistance and confirm availability.", icon: "ambulance" },
  { title: "Operation theatre", hours: "By doctor schedule", description: "Theatre availability depends on the treating doctor and planned procedure. Contact reception for details.", icon: "theatre" },
  { title: "Patient rooms", hours: "Inpatient care", description: "Single rooms, wards, and AC and non-AC deluxe rooms. Ask reception about current room availability.", icon: "rooms" },
  { title: "Access and parking", hours: "Visitor facilities", description: "Parking, a lift, and wheelchair access are available at the hospital.", icon: "access" },
] as const;

export const departmentServices: Record<string, string[]> = {
  "general-medicine": ["Outpatient consultations and inpatient treatment", "Blood investigations", "Emergency assessment and stabilisation"],
  dermatology: ["Skin biopsies", "Vitiligo treatment", "Chemical peels"],
  pediatrics: ["Childhood jaundice assessment and care", "Blood investigations"],
  gastroenterology: ["Outpatient consultations", "Upper gastrointestinal endoscopy (UGI scopy), by arrangement"],
  nephrology: ["Outpatient consultations and treatment"],
};
