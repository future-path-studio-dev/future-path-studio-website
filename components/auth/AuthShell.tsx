import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

type Panel = { heading: string; body: string; benefits: readonly string[] };

type AuthShellProps = {
  panel: Panel;
  illustration: { src: StaticImageData; alt: string; height: 300 | 340; top: string };
  /** Figma card and panel height at desktop: Login 780, Register 880. */
  size: "login" | "register";
  children: ReactNode;
};

// Shared two-panel layout for Login 10:2, Register 10:26 and Forgot Password
// 136:236. The pages sit inside app/(auth)/layout.tsx, which already renders the
// shared Navbar and Footer.
//
// Figma has no mobile auth frames. Below 1200px the layout follows the FAQ
// mobile frame (411:805): the information panel becomes a compact band and the
// illustration and benefits are hidden; the form card is full width.
export default function AuthShell({ panel, illustration, size, children }: AuthShellProps) {
  const desktopHeight = size === "login" ? "min-[1200px]:min-h-[780px]" : "min-[1200px]:min-h-[880px]";
  // Figma strokes sit inside the frame without taking space, so padding is 1px
  // less than Figma's to keep the same 460px (card) and 412px (panel) content width.
  const cardSpacing =
    size === "login"
      ? "gap-[18px] min-[600px]:px-[49px] min-[600px]:py-[41px]"
      : "gap-3.5 min-[600px]:px-[49px] min-[600px]:py-[35px]";

  return (
    <main className="bg-background min-[1200px]:flex min-[1200px]:min-h-[1062px] min-[1200px]:items-center min-[1200px]:justify-center min-[1200px]:py-20">
      <div className="flex flex-col min-[1200px]:flex-row min-[1200px]:items-stretch min-[1200px]:gap-20">
        {/* Information panel: Login 11:2 / Register 12:2 */}
        <section
          aria-label="About client accounts"
          className={`flex flex-col gap-2.5 bg-brand-primary px-5 py-[26px] min-[1200px]:w-[500px] min-[1200px]:shrink-0 min-[1200px]:gap-6 min-[1200px]:border min-[1200px]:border-brand-primary min-[1200px]:p-[43px] ${desktopHeight}`}
        >
          <p className="text-[11px] font-semibold text-brand-accent min-[1200px]:text-[13px]/[18px]">
            THE FUTURE PATH STUDIO
          </p>
          <p className="text-[26px]/[normal] font-bold text-white min-[1200px]:w-[400px] min-[1200px]:text-[40px]/[48px]">{panel.heading}</p>
          <p className="text-sm text-[#c9d6e2] min-[1200px]:w-[400px] min-[1200px]:text-lg/7 min-[1200px]:text-white">{panel.body}</p>

          {/* Illustration 258:125 / 258:126: the 824px-wide image is drawn at 2x
              inside the 412px frame, offset as in Figma, so only its centre shows. */}
          <div
            className={`relative hidden w-[412px] shrink-0 overflow-hidden bg-brand-dark after:pointer-events-none after:absolute after:inset-0 after:border after:border-brand-accent min-[1200px]:block ${
              illustration.height === 300 ? "h-[300px]" : "h-[340px]"
            }`}
          >
            <Image
              src={illustration.src}
              alt={illustration.alt}
              sizes="824px"
              priority
              className="absolute left-[-50%] h-[200%] w-[200%] max-w-none"
              style={{ top: illustration.top }}
            />
          </div>

          <ul className="hidden w-[400px] text-base/[26px] text-white min-[1200px]:block">
            {panel.benefits.map((benefit) => (
              <li key={benefit}>
                <span aria-hidden="true">• </span>
                {benefit}
              </li>
            ))}
          </ul>
        </section>

        {/* Form card: Login 11:9 / Register 12:9 */}
        <div className="mx-auto w-full max-w-[600px] px-5 pt-6 pb-10 min-[1200px]:mx-0 min-[1200px]:w-[560px] min-[1200px]:max-w-none min-[1200px]:shrink-0 min-[1200px]:p-0">
          <div
            className={`flex h-full flex-col items-start rounded-fps-medium border border-border bg-surface p-6 shadow-[0_6px_18px_rgba(15,36,56,0.1)] ${cardSpacing} ${desktopHeight}`}
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
