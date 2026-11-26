"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import BrandMark from "@/components/layout/BrandMark";
import { publicNavigation } from "@/components/layout/navigation";

const navigation = [
  ...publicNavigation,
  { label: "Login", href: "/login" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    if (menuOpen) {
      menuButton.current?.focus({ preventScroll: true });
      setMenuOpen(false);
    }
  }

  return (
    <header
      className="sticky top-0 z-50 bg-surface text-foreground"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setMenuOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (menuOpen && event.key === "Escape") {
          event.preventDefault();
          closeMenu();
        }
      }}
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 px-5 min-[900px]:px-[clamp(32px,5vw,72px)]">
        <Link
          href="/"
          onNavigate={() => setMenuOpen(false)}
          className="flex min-h-[68px] w-fit max-w-full items-center gap-3 rounded-lg text-[11px] leading-[normal] font-bold focus-visible:-outline-offset-2 min-[900px]:min-h-[88px] min-[900px]:text-[13px] min-[900px]:leading-[18px]"
        >
          <BrandMark className="size-9 shrink-0 min-[900px]:size-12" />
          <span>THE FUTURE PATH STUDIO</span>
        </Link>

        <button
          ref={menuButton}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="-mr-[5px] grid size-11 cursor-pointer place-items-center rounded-lg min-[900px]:hidden"
        >
          <span
            aria-hidden="true"
            className="grid size-[34px] place-items-center rounded-lg bg-alternate text-[15px] font-bold text-brand-primary"
          >
            {menuOpen ? "×" : "☰"}
          </span>
        </button>

        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={`col-span-2 max-h-[calc(100dvh-68px)] flex-col overflow-y-auto border-t border-border pt-2 pb-4 min-[900px]:col-span-1 min-[900px]:flex min-[900px]:max-h-none min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-[18px] min-[900px]:overflow-visible min-[900px]:border-0 min-[900px]:p-0 ${menuOpen ? "flex" : "hidden"}`}
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onNavigate={closeMenu}
              aria-current={pathname === item.href ? "page" : undefined}
              className="flex min-h-11 shrink-0 items-center rounded py-2 text-base leading-6 font-medium hover:text-brand-secondary focus-visible:-outline-offset-2 aria-[current=page]:font-semibold aria-[current=page]:text-brand-secondary min-[900px]:min-h-0 min-[900px]:py-0 min-[900px]:focus-visible:outline-offset-3"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
