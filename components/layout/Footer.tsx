import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default async function Footer() {
  "use cache";

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-bold">The Future Path Studio</h2>

          <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400">
            Practical support for stronger training and compliance systems.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Quick Links</h3>

          <nav
            aria-label="Footer navigation"
            className="mt-4 grid grid-cols-2 gap-3"
          >
            {footerLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-400 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-zinc-800 px-6 py-5 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} The Future Path Studio. All rights
        reserved.
      </div>
    </footer>
  );
}
