import type { Metadata } from "next";
import HomePage from "../page";
import { TeluguLocalizer } from "@/components/telugu-localizer";

export const metadata: Metadata = {
  title: "LVR హాస్పిటల్, సత్తుపల్లి",
  description: "LVR మల్టీ స్పెషాలిటీ హాస్పిటల్ వైద్య సేవలు, వైద్యులు మరియు అపాయింట్‌మెంట్ సమాచారం తెలుగులో.",
};

export default function TeluguHomePage() {
  return <TeluguLocalizer><HomePage /></TeluguLocalizer>;
}
