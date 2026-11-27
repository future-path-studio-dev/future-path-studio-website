import Link from "next/link";
import { homeServices } from "@/features/home/home";

// Figma "Services" 2:12.
export default function HomeServices() {
  return (
    <section aria-labelledby="home-services-heading" className="bg-surface py-11">
      <div className="fps-container flex flex-col gap-3.5">
        <h2
          id="home-services-heading"
          className="text-[32px]/[40px] font-bold text-foreground min-[900px]:text-[40px]/[48px]"
        >
          Our Services
        </h2>
        <p className="max-w-[900px] text-lg/7 text-muted">
          Support across compliance, training and assessment systems, resources and staff
          capability.
        </p>

        <ul className="grid gap-x-10 gap-y-6 min-[600px]:grid-cols-2 min-[1024px]:grid-cols-3">
          {homeServices.map((service) => (
            <li key={service.slug} className="flex">
              <Link
                href={`/services/${service.slug}`}
                className="group flex w-full flex-col items-start gap-4 rounded-fps-medium border border-border bg-surface p-7 shadow-[0_6px_18px_rgba(15,36,56,0.1)] transition-shadow hover:shadow-[0_10px_24px_rgba(15,36,56,0.16)] focus-visible:outline-offset-2"
              >
                <span aria-hidden="true" className="size-[54px] shrink-0 bg-brand-secondary" />
                <h3 className="text-[22px]/[30px] font-semibold text-foreground">
                  {service.name}
                </h3>
                <p className="text-base/[26px] text-muted">{service.summary}</p>
                <span className="text-sm/[22px] font-semibold whitespace-pre text-brand-secondary group-hover:underline">
                  {"Learn more  →"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
