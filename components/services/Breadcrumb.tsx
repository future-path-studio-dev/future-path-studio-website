import Link from "next/link";
import { Fragment } from "react";

type Crumb = { label: string; href?: string };

export default function Breadcrumb({ items }: { items: readonly Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-start gap-2 text-sm/[normal]">
        {items.map((item, index) => (
          <Fragment key={item.label}>
            {index > 0 && (
              <li aria-hidden="true" className="text-muted">
                /
              </li>
            )}
            <li>
              {item.href ? (
                <Link
                  href={item.href}
                  className="rounded text-brand-secondary underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-foreground">
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
