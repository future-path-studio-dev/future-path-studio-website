import type { Metadata } from "next";
import AboutBenefitStrip from "@/components/about/AboutBenefitStrip";
import AboutCta from "@/components/about/AboutCta";
import AboutHero from "@/components/about/AboutHero";
import HowWeSupportYou from "@/components/about/HowWeSupportYou";
import WhatWeDo from "@/components/about/WhatWeDo";
import WhoWeAre from "@/components/about/WhoWeAre";
import WhoWeSupport from "@/components/about/WhoWeSupport";
import WhyChoose from "@/components/about/WhyChoose";

export const metadata: Metadata = {
  title: "About Us | The Future Path Studio",
  description:
    "The Future Path Studio supports RTOs and training organisations with practical compliance guidance, quality training systems, contextualised resources and staff capability development.",
};

// Figma "About Us – Desktop 1440" 456:881.
export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutBenefitStrip />
      <WhoWeAre />
      <WhoWeSupport />
      <WhatWeDo />
      <HowWeSupportYou />
      <WhyChoose />
      <AboutCta />
    </main>
  );
}
