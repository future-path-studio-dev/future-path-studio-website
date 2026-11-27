import Link from "next/link";
import { getCategory, type Service } from "@/features/services/services";

// Figma component "Service Card" 469:975.
export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col items-start gap-3 rounded-lg border border-border bg-surface p-6 text-left shadow-[0_1px_4px_rgba(0,0,0,0.07)] transition-shadow hover:shadow-[0_4px_14px_rgba(0,0,0,0.1)] focus-visible:outline-offset-2"
    >
      <span
        aria-hidden="true"
        className="grid size-11 place-items-center rounded-lg bg-alternate text-[22px]/[normal]"
      >
        {service.icon}
      </span>
      <span className="text-xs/[normal] font-semibold tracking-[0.6px] text-brand-secondary uppercase">
        {getCategory(service.category)?.label}
      </span>
      <h2 className="text-lg/[normal] font-semibold text-foreground">{service.name}</h2>
      <p className="text-sm/[22px] text-muted">{service.summary}</p>
      <span className="flex w-full items-center justify-center rounded-lg border-[1.5px] border-brand-secondary bg-alternate py-[11px] text-sm/[normal] font-semibold text-brand-secondary transition-colors group-hover:bg-brand-secondary group-hover:text-white">
        View Details
      </span>
    </Link>
  );
}
