import Image from "next/image";
import Link from "next/link";
import { homeAboutPoints } from "@/features/home/home";
import aboutImage from "@/public/images/home/homepage-about.png";

// Figma "About" 2:13. The 1040×820 illustration (258:124) is placed at 2× inside
// the 520×410 frame and offset by (-260, -214), so only its centre shows.
export default function HomeAbout() {
  return (
    <section aria-labelledby="home-about-heading" className="bg-alternate py-10">
      <div className="fps-container grid items-center gap-10 min-[1024px]:grid-cols-[520px_minmax(0,650px)] min-[1024px]:justify-between min-[1024px]:gap-[70px]">
        {/* The 1px frame stroke is an overlay so the 2x crop is measured from the full frame, as in Figma. */}
        <div className="relative aspect-520/410 w-full max-w-[520px] overflow-hidden bg-brand-primary after:pointer-events-none after:absolute after:inset-0 after:border after:border-brand-primary">
          <Image
            src={aboutImage}
            alt="Illustration of a team member helping a colleague up a set of steps"
            sizes="(min-width: 1024px) 1040px, 200vw"
            className="absolute top-[-52.2%] left-[-50%] h-[200%] w-[200%] max-w-none"
          />
        </div>

        <div className="flex flex-col items-start gap-5">
          <h2
            id="home-about-heading"
            className="max-w-[620px] text-[32px]/[40px] font-bold text-foreground min-[900px]:text-[40px]/[48px]"
          >
            Supporting quality, compliance and capability in training
          </h2>
          <p className="max-w-[600px] text-lg/7 text-muted">
            The Future Path Studio works with RTOs and training organisations to simplify complex
            requirements, strengthen training and assessment systems and develop practical,
            learner-centred solutions.
          </p>
          <ul className="text-base/[26px] text-foreground">
            {homeAboutPoints.map((point) => (
              <li key={point}>
                <span aria-hidden="true">• </span>
                {point}
              </li>
            ))}
          </ul>
          <Link
            href="/about"
            className="flex h-12 w-[150px] items-center justify-center rounded-fps-medium border border-brand-secondary bg-brand-secondary text-base/6 font-semibold text-white hover:brightness-110"
          >
            About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
