import HomeAbout from "@/components/home/HomeAbout";
import HomeCta from "@/components/home/HomeCta";
import HomeHowWeWork from "@/components/home/HomeHowWeWork";
import HomeServices from "@/components/home/HomeServices";
import HomeTestimonials from "@/components/home/HomeTestimonials";

// Figma "Homepage – Desktop 1440" 2:8.
// The Hero (83:2) and Benefit Strip (2:11) are owned by W1.2 (issue #5,
// feature/w1-utsab-navbar-hero). Add them above HomeServices when that work
// lands, and move the page <h1> into the Hero.
export default function HomePage() {
  return (
    <main>
      <h1 className="sr-only">The Future Path Studio</h1>
      <HomeServices />
      <HomeAbout />
      <HomeHowWeWork />
      <HomeTestimonials />
      <HomeCta />
    </main>
  );
}
