import Image from "next/image";
import Link from "next/link";
import heroImage from "@/public/images/home/homepage-hero.jpg";

// Figma "Hero" 83:2. At 1440px the copy is 570px wide, and the 682px image runs
// 82px past the 1240px content column toward the frame edge.
export default function HomeHero() {
  return (
    <section aria-labelledby="home-hero-heading" className="overflow-hidden bg-background py-10 min-[1024px]:py-[60px]">
      <div className="fps-container flex flex-col gap-10 min-[1024px]:flex-row min-[1024px]:items-center min-[1024px]:gap-[70px]">
        <div className="flex flex-col items-start gap-[22px] min-[1024px]:w-[570px] min-[1024px]:shrink-0">
          <p className="text-[13px]/[18px] font-semibold text-brand-secondary">
            RTO COMPLIANCE • TRAINING SYSTEMS • PRACTICAL SUPPORT
          </p>
          <h1
            id="home-hero-heading"
            className="text-[40px]/[48px] font-bold text-foreground min-[600px]:text-[56px]/[64px]"
          >
            Practical support for stronger training and compliance systems
          </h1>
          <p className="text-lg/7 text-muted">
            The Future Path Studio supports RTOs and training organisations with practical
            compliance guidance, contextualised resources and solutions designed to strengthen
            quality and capability.
          </p>
          <div className="flex flex-wrap gap-[18px]">
            <Link
              href="/services"
              className="flex h-[52px] w-[170px] items-center justify-center rounded-fps-medium border border-brand-primary bg-brand-primary text-base/6 font-semibold text-white hover:bg-brand-hover"
            >
              Explore Services
            </Link>
            <Link
              href="/contact"
              className="flex h-[52px] w-[180px] items-center justify-center rounded-fps-medium border border-brand-secondary bg-surface text-base/6 font-semibold text-brand-secondary hover:bg-alternate"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="w-full max-w-[682px] min-w-0 flex-1 min-[1440px]:-mr-[82px]">
          <Image
            src={heroImage}
            alt="The Future Path Studio logo: Guiding today, building tomorrow"
            priority
            sizes="(min-width: 1440px) 682px, (min-width: 1024px) 50vw, 100vw"
            className="aspect-[682/324.762] h-auto w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
