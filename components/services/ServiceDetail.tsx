import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/services/Breadcrumb";
import {
  getCategory,
  serviceDetailHighlights,
  type Service,
} from "@/features/services/services";

// Shared template for the six Figma service-detail frames (475:1050 etc.).
export default function ServiceDetail({ service }: { service: Service }) {
  const categoryLabel = getCategory(service.category)?.label;

  return (
    <main className="fps-container flex flex-col gap-[30px] pt-10 pb-[70px]">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
      />

      <div className="grid items-start gap-10 min-[900px]:grid-cols-2 min-[900px]:gap-[60px]">
        <article className="flex min-w-0 flex-col gap-[26px]">
          <header className="flex flex-col items-start gap-3.5">
            <span className="rounded-full bg-alternate px-3 py-1.5 text-xs/[normal] font-semibold tracking-[0.6px] text-brand-secondary uppercase">
              {categoryLabel}
            </span>
            <h1 className="text-[28px]/[1.2] font-bold text-foreground min-[600px]:text-[32px]/[normal]">
              {service.name}
            </h1>
            <p className="text-base/[26px] text-muted">{service.introduction}</p>
          </header>

          <section className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-6">
            <h2 className="text-base/[normal] font-semibold text-foreground">
              Who is this service for?
            </h2>
            <p className="text-sm/[22px] text-muted">{service.audience}</p>
          </section>

          <section className="flex flex-col gap-3.5 rounded-lg border border-border bg-surface p-6">
            <h2 className="text-base/[normal] font-semibold text-foreground">What is included</h2>
            <ul className="flex flex-col gap-3.5">
              {service.inclusions.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span aria-hidden="true" className="leading-[normal] font-bold text-brand-secondary">
                    ✓
                  </span>
                  <span className="flex-1 leading-[22px] text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col gap-3.5 rounded-lg border border-border bg-surface p-6">
            <h2 className="text-base/[normal] font-semibold text-foreground">Key Benefits</h2>
            <ol className="flex flex-col gap-3.5">
              {service.benefits.map((benefit, index) => (
                <li key={benefit} className="flex items-start gap-3 rounded-lg bg-alternate p-3">
                  <span
                    aria-hidden="true"
                    className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-secondary text-xs/[normal] font-bold text-white"
                  >
                    {index + 1}
                  </span>
                  <span className="flex-1 text-sm/[22px] text-foreground">{benefit}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="flex flex-col gap-2.5 rounded-lg bg-brand-primary p-6">
            <h2 className="text-base/[normal] font-semibold text-white">Expected Outcome</h2>
            <p className="text-sm/[22px] text-[#b8cdd9]">{service.outcome}</p>
          </section>
        </article>

        <aside
          aria-label={`${service.name} summary`}
          className="flex min-w-0 flex-col items-start rounded-lg border border-border bg-surface p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
        >
          <span
            aria-hidden="true"
            className="grid size-14 place-items-center rounded-xl bg-alternate text-[26px]/[normal]"
          >
            {service.icon}
          </span>
          <p className="mt-4 text-base/[normal] font-bold text-foreground">{service.name}</p>
          <p className="text-xs/[normal] font-semibold tracking-[0.6px] text-brand-secondary uppercase">
            {categoryLabel}
          </p>

          <div className="relative mt-4 h-0 w-full">
            <div className="absolute inset-[-1px_0_0_0]">
              <Image
                src="/images/services/sidebar-divider.svg"
                alt=""
                width={542}
                height={1}
                unoptimized
                className="block size-full max-w-none"
              />
            </div>
          </div>

          <ul className="mt-3.5 w-full">
            {serviceDetailHighlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 pb-2">
                <span aria-hidden="true" className="text-[10px]/[normal] text-brand-accent">
                  ●
                </span>
                <span className="flex-1 text-xs/[18px] text-muted">{highlight}</span>
              </li>
            ))}
          </ul>

          {/* Temporary: routes to the contact form until Services & Booking
              (Figma 469:953) is implemented. */}
          <Link
            href="/contact"
            aria-describedby="consultation-note"
            className="mt-2 flex w-full items-center justify-center rounded-lg bg-brand-primary py-[13px] text-sm/[normal] font-bold text-white hover:bg-brand-hover"
          >
            Request a Consultation
          </Link>
          <p id="consultation-note" className="mt-2 w-full text-center text-xs/[18px] text-muted">
            Opens our contact form to send an enquiry. This is not a confirmed booking.
          </p>
          <Link
            href="/services"
            className="mt-3 flex w-full items-center justify-center rounded-lg border border-border bg-surface py-[13px] text-sm/[normal] font-semibold whitespace-pre text-muted hover:border-brand-primary hover:text-brand-primary"
          >
            {"←  Back to Services"}
          </Link>
        </aside>
      </div>
    </main>
  );
}
