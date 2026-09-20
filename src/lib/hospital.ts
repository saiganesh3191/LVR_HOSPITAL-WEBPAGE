export const hospital = {
  name: "LVR Multi Speciality Hospital",
  tagline: "Helping hands. Caring hearts.",
  phone: "+91 91349 93499",
  phoneHref: "tel:+919134993499",
  secondaryPhone: "+91 76639 99000",
  secondaryPhoneHref: "tel:+917663999000",
  whatsapp: "919791039302",
  address: "4-70/1, Jupalli Eye Hospital Road, Main Road, Sathupally, Khammam District, Telangana 507303",
  mapsUrl: "https://www.google.com/maps?cid=8996527365855545148",
  reviewsUrl: "https://www.google.com/maps/place/LVR+Multispeciality+Hospital/@17.2118092,80.8323339,17z/data=!4m8!3m7!1s0x3a3683a2c309cdc5:0x7cda15f93de6873c!8m2!3d17.2118092!4d80.8323339!9m1!1b1!16s%2Fg%2F11whpqr5m6",
  established: "2024",
  email: "lakshmansaivanama@gmail.com",
  instagram: "https://www.instagram.com/lvr_multispeciality_hospital/",
  linksUrl: "https://beacons.ai/lvrhospital",
};

export const departments = [
  {
    slug: "general-medicine", name: "General Medicine", short: "Everyday health. Thoughtful care.",
    description: "A place to start when you feel unwell. Consult our general medicine doctor for infections, general health concerns, and ongoing medical care.",
    focus: ["General medical consultations", "Infection-related concerns", "Ongoing general health care"],
    icon: "stethoscope", color: "sage", doctor: "lakshman-sai", label: "Care for your everyday health",
    intro: "From a new concern to an ongoing condition, getting the right advice starts with a conversation. Our general medicine department offers consultations for adult health and general medical concerns.",
  },
  {
    slug: "dermatology", name: "Dermatology", short: "Feel comfortable in your skin.",
    description: "Personal attention for your skin concerns, with a dermatologist who can help you understand your condition and discuss your care.",
    focus: ["Skin consultations", "Assessment of skin conditions", "Follow-up skin care"],
    icon: "sparkles", color: "peach", doctor: "prathyusha", label: "Care that understands your skin",
    intro: "Skin concerns deserve careful attention. Meet our dermatologist for an assessment, a conversation about your symptoms, and guidance on the next steps in your care.",
  },
  {
    slug: "pediatrics", name: "Pediatrics", short: "Little ones. Our full attention.",
    description: "A caring space for children and their parents. Speak with our pediatrician about your child's health and day-to-day concerns.",
    focus: ["Children’s health consultations", "Assessment of childhood health concerns", "Parent and caregiver guidance"],
    icon: "baby", color: "lavender", doctor: "chaithanya", label: "For every little milestone",
    intro: "We know how much your child's health matters to you. Our pediatric department offers a place to ask questions, discuss concerns, and seek medical care for your child.",
  },
  {
    slug: "gastroenterology", name: "Gastroenterology", short: "A conversation about digestive health.",
    description: "Request a gastroenterology consultation with Dr. S. Adil Basha. Our team can help you confirm the consultant’s next available visit.",
    focus: ["Consultation enquiries", "Discussing digestive health concerns", "Planning your consultant visit"],
    icon: "activity", color: "peach", doctor: "adil-pasha", label: "Care for your digestive health",
    intro: "Our Gastroenterology department offers consultant appointments with Dr. S. Adil Basha. Call reception to discuss your enquiry and confirm the scope of care, consultation date, and availability.",
  },
  {
    slug: "nephrology", name: "Nephrology", short: "Attention to your kidney health.",
    description: "Request a nephrology consultation with Dr. Vijesh Varma. Speak with reception to plan your visit and confirm availability.",
    focus: ["Consultation enquiries", "Discussing kidney health concerns", "Planning your consultant visit"],
    icon: "activity", color: "sage", doctor: "vijay-varma", label: "Care for your kidney health",
    intro: "Our Nephrology department offers consultant appointments with Dr. Vijesh Varma. Contact reception to discuss your needs and confirm the next available consultation. Please ask the team about any specific service you require.",
  },

] as const;

// Public names and qualifications corrected from client-supplied text and labelled posters on 14 September 2026.
// Stable slugs preserve existing links. Old fees and experience are withheld pending confirmation.
// Never import raw staff/user API responses into the public website.
export const doctors = [
  { sourceId: 2, slug: "lakshman-sai", name: "Dr. Lakshmansai Vanama", initials: "LV", qualification: "MBBS, MD (General Medicine)", department: "General Medicine", departmentSlug: "general-medicine", color: "sage", appointmentType: "Regular", timing: "Available 24/7 — call reception to arrange your consultation", bio: "Dr. Lakshmansai Vanama is the Founder and Director of LVR Multi Speciality Hospital. His work combines general medicine with a background in critical care, including care for diabetes, high blood pressure, infections, anaemia, and low platelet counts." },
  { sourceId: 4, slug: "prathyusha", name: "Dr. Prathyusha Papishetty", initials: "PP", qualification: "MBBS, MD (Dermatology, Venereology & Leprosy) · Gold Medalist", department: "Dermatology", departmentSlug: "dermatology", color: "peach", appointmentType: "Regular", timing: "Monday-Saturday: 10:00 AM-2:30 PM and 6:00-8:30 PM", bio: "Dr. Prathyusha Papishetty is a dermatologist and MD gold medallist from JSS Medical College, Mysuru. She provides consultations for skin, hair, and nail concerns, including fungal infections, scabies, psoriasis, urticaria, vitiligo, and sexually transmitted infections." },
  { sourceId: 3, slug: "chaithanya", name: "Dr. K. Chaithanya", initials: "KC", qualification: "MBBS, MD (Pediatrics)", department: "Pediatrics", departmentSlug: "pediatrics", color: "lavender", appointmentType: "Regular", timing: "Available 24/7 — call reception to arrange your consultation", bio: "Dr. K. Chaithanya provides pediatric consultations at LVR Multi Speciality Hospital for children’s health concerns." },
  { sourceId: 6, slug: "adil-pasha", name: "Dr. S. Adil Basha", initials: "AB", qualification: "MBBS, MD, DrNB (Gastroenterology)", department: "Gastroenterology", departmentSlug: "gastroenterology", color: "peach", appointmentType: "Consultant", timing: "Consultant visits — call to confirm the next available date", bio: "Dr. S. Adil Basha is listed as a consultant in Gastroenterology at LVR Multi Speciality Hospital. Contact reception to arrange a consultation and confirm availability." },
  { sourceId: 5, slug: "vijay-varma", name: "Dr. Vijesh Varma", initials: "VV", qualification: "MBBS, MD, DM (Nephrology - NIMS)", department: "Nephrology", departmentSlug: "nephrology", color: "sage", appointmentType: "Consultant", timing: "Consultant visits — call to confirm the next available date", bio: "Dr. Vijesh Varma is listed as a consultant in Nephrology at LVR Multi Speciality Hospital. Contact reception to arrange a consultation and confirm availability." },
] as const;

export type Doctor = (typeof doctors)[number];
export type Department = (typeof departments)[number];

export const faqs = [
  { question: "How do I book an appointment?", answer: "Choose a department and fill in the appointment request form. You can then review your details and send them to the hospital on WhatsApp. Our team will confirm the doctor’s availability and your appointment. You can also call +91 91349 93499." },
  { question: "Is the hospital open 24 hours?", answer: "LVR Hospital is open 24 hours a day, seven days a week. Individual specialists have their own consultation schedules. Please call before visiting to confirm that your chosen doctor is available." },
  { question: "What are the consultation charges?", answer: "Regular outpatient consultations are ₹300 for General Medicine, Dermatology, and Pediatrics, and ₹500 for Gastroenterology and Nephrology. Emergency consultation after 9:30 PM is ₹500 for all cases. Tests, medicines, and procedures are charged separately; confirm the applicable fee with reception." },
  { question: "Where is LVR Hospital located?", answer: "You’ll find us at 4-70/1, Jupalli Eye Hospital Road, Main Road, Sathupally, Khammam District, Telangana 507303. Use the directions link on our contact page or call reception for help finding us." },
  { question: "Can I use cashless insurance?", answer: "Cashless insurance is not currently available. The hospital provides bills; ask your insurer about reimbursement eligibility and documentation before treatment." },
  { question: "Which payment methods are accepted?", answer: "Cash and digital payments are accepted. Reception can confirm your preferred payment method." },
  { question: "Is dialysis or diagnostic imaging available?", answer: "Dialysis, X-ray, CT, MRI, radiology services, and a blood bank are not currently available at LVR. Please contact reception if you need help planning care that requires these services." },
  { question: "What should I bring to my consultation?", answer: "If you have them, bring your previous prescriptions, relevant reports, and a list of medicines you currently take. For a child’s appointment, bring their available health records. Call reception if you need instructions for a specific visit." },
];

export function whatsappUrl(message = "Hello LVR Hospital, I would like to enquire about an appointment.") {
  return `https://wa.me/${hospital.whatsapp}?text=${encodeURIComponent(message)}`;
}
