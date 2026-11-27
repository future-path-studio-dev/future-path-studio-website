import Link from "next/link";
import { Fragment } from "react";

type Crumb = { label: string; href?: string };

// Figma breadcrumb 500:2038 / 509:2610.
export default function ResourcesBreadcrumb({ items, className = "" }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm/[normal]">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <Fragment key={item.label}>
              <li className={last ? "font-medium text-foreground" : "text-muted"}>
                {item.href && !last ? (
                  <Link href={item.href} className="hover:text-brand-secondary hover:underline">
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined}>{item.label}</span>
                )}
              </li>
              {!last && (
                <li aria-hidden="true" className="text-muted">
                  /
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
