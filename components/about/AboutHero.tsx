import Image from "next/image";
import Link from "next/link";
import heroImage from "@/public/images/about/about-hero.jpg";

// Figma "About Hero" 456:895. The 900×600 photo (466:981) sits at (-88, -127)
// inside the 560×400 frame; the percentages below reproduce that crop.
export default function AboutHero() {
  return (
    <section aria-labelledby="about-heading" className="bg-surface py-10 min-[1024px]:py-[70px]">
      <div className="fps-container grid items-center gap-10 min-[1024px]:grid-cols-[minmax(0,1fr)_560px] min-[1024px]:gap-[70px]">
        <div className="flex flex-col items-start gap-5">
          <p className="text-[13px]/[normal] font-semibold tracking-[1px] text-brand-accent uppercase">
            About The Future Path Studio
          </p>
          <h1
            id="about-heading"
            className="text-[38px]/[46px] font-bold text-foreground min-[900px]:text-[56px]/[64px]"
          >
            About The Future Path Studio
          </h1>
          <p className="text-lg/7 text-muted">
            The Future Path Studio supports RTOs and training organisations with practical
            compliance guidance, quality training systems, contextualised resources and staff
            capability development.
          </p>
          <div className="flex w-full flex-col gap-3.5 min-[600px]:w-auto min-[600px]:flex-row">
            <Link
              href="/services"
              className="flex items-center justify-center rounded-fps-medium border border-brand-primary bg-brand-primary px-6 py-3.5 text-base/[normal] font-semibold text-white hover:bg-brand-hover"
            >
              Explore Services
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center rounded-fps-medium border border-brand-primary bg-surface px-6 py-3.5 text-base/[normal] font-semibold text-brand-primary hover:bg-alternate"
            >
              Contact Us
            </Link>
          </div>
        </div>

        <div className="relative aspect-560/400 w-full overflow-hidden rounded-fps-large bg-alternate">
          <Image
            src={heroImage}
            alt="A consultant smiling while working on a laptop at a desk"
            priority
            sizes="(min-width: 1024px) 900px, 160vw"
            className="absolute top-[-31.75%] left-[-15.714%] h-[150%] w-[160.714%] max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
