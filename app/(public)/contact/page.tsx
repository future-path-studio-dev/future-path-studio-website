import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactMain from "@/components/contact/ContactMain";
import FaqStrip from "@/components/contact/FaqStrip";
import GetInTouch from "@/components/contact/GetInTouch";

export const metadata: Metadata = {
  title: "Contact Us | The Future Path Studio",
  description:
    "Tell us what support your organisation requires and The Future Path Studio can help identify the appropriate next step.",
};

// Figma "Contact Us – Desktop 1440" 403:610 and "Contact Us – Mobile 390" 411:897.
// Form states: 405:652 (validation errors), 405:755 (filled), 405:853
// (submitting), 405:953 (success).
export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactMain details={<GetInTouch />} />
      <FaqStrip />
    </main>
  );
}
