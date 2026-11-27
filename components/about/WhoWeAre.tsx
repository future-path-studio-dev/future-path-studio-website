import Image from "next/image";
import Link from "next/link";
import { whoWeArePoints } from "@/features/about/about";
import whoWeAreImage from "@/public/images/about/about-who-we-are.jpg";
import bullet from "@/public/images/about/bullet-ellipse.svg";

// Figma "Who We Are" 456:920. The 900×700 photo (466:982) sits at (-154, -162)
// inside the 520×410 frame; the percentages below reproduce that crop.
export default function WhoWeAre() {
  return (
    <section aria-labelledby="who-we-are-heading" className="bg-alternate pt-10 pb-6 min-[1024px]:py-[70px]">
      <div className="fps-container grid items-center gap-8 min-[1024px]:grid-cols-[520px_minmax(0,1fr)] min-[1024px]:gap-[70px]">
        <div className="relative aspect-520/410 w-full max-w-[520px] overflow-hidden rounded-fps-large bg-surface">
          <Image
            src={whoWeAreImage}
            alt="A smiling woman in conversation with a colleague across a table"
            sizes="(min-width: 1024px) 900px, 175vw"
            className="absolute top-[-39.512%] left-[-29.615%] h-[170.732%] w-[173.077%] max-w-none"
          />
        </div>

        <div className="flex flex-col items-start gap-5">
          <h2
            id="who-we-are-heading"
            className="text-[30px]/[normal] font-bold text-foreground min-[900px]:text-[40px]/[normal]"
          >
            Who We Are
          </h2>
          <p className="text-lg/7 text-muted">
            The Future Path Studio is an education and training consultancy supporting RTOs,
            training providers, compliance teams, trainers and assessors. We work to improve the
            quality, integrity and accessibility of vocational education by helping organisations
            build clear, compliant and learner-centred systems.
          </p>
          <ul className="flex flex-col gap-5">
            {whoWeArePoints.map((point) => (
              <li key={point} className="flex items-center gap-3 text-base/[normal] text-foreground">
                <Image src={bullet} alt="" unoptimized className="size-2 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
          <Link
            href="#who-we-support"
            className="flex w-full items-center justify-center rounded-fps-medium bg-brand-secondary px-6 py-3.5 text-base/[normal] font-semibold text-white hover:brightness-110 min-[600px]:w-auto"
          >
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
