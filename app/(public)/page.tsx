import HomeAbout from "@/components/home/HomeAbout";
import HomeBenefits from "@/components/home/HomeBenefits";
import HomeCta from "@/components/home/HomeCta";
import HomeHero from "@/components/home/HomeHero";
import HomeHowWeWork from "@/components/home/HomeHowWeWork";
import HomeServices from "@/components/home/HomeServices";
import HomeTestimonials from "@/components/home/HomeTestimonials";

// Figma "Homepage – Desktop 1440" 2:8.
export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <HomeBenefits />
      <HomeServices />
      <HomeAbout />
      <HomeHowWeWork />
      <HomeTestimonials />
      <HomeCta />
    </main>
  );
}
