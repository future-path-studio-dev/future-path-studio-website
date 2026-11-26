import Link from "next/link";
import BrandMark from "./BrandMark";
import { publicNavigation } from "./navigation";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white [--fps-focus-color:var(--fps-color-brand-accent)]">
      <div className="mx-auto grid max-w-[1440px] gap-2.5 px-5 py-7 min-[900px]:min-h-[250px] min-[900px]:grid-cols-[380fr_520fr_256fr] min-[900px]:gap-[min(4.861vw,70px)] min-[900px]:px-[5%] min-[900px]:py-[58px] min-[1440px]:px-[72px]">
        <div className="flex flex-col items-start gap-2.5 min-[900px]:h-[52px] min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-3">
          <BrandMark className="size-8 min-[900px]:size-12" />
          <p className="text-[11px]/[normal] font-bold uppercase min-[900px]:text-[13px]/[18px]">
            The Future Path Studio
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="sr-only text-[13px]/[18px] font-semibold text-brand-accent uppercase min-[900px]:not-sr-only min-[900px]:mb-[22px]">
            Quick Links
          </h2>
          <ul className="grid grid-cols-4 gap-3.5 text-[13px]/[normal] text-[#c9d6e2] min-[900px]:flex min-[900px]:flex-wrap min-[900px]:gap-x-3 min-[900px]:gap-y-2 min-[900px]:text-sm/[normal] min-[900px]:text-white">
            {publicNavigation.map(({ label, href }) => (
              <li
                key={href}
                className={
                  href === "/services" || href === "/resources"
                    ? "hidden min-[900px]:block"
                    : undefined
                }
              >
                <Link href={href} className="inline-block underline-offset-4 hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-2.5 text-xs/[normal] text-[#9bb0c4] min-[900px]:gap-[22px] min-[900px]:text-sm/[22px] min-[900px]:text-white">
          <p>© The Future Path Studio</p>
          <p className="whitespace-pre-wrap">
            {"Privacy Policy  •  Terms"}
          </p>
        </div>
      </div>
    </footer>
  );
}
