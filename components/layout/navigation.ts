import type { NavigationItem } from "@/types/navigation";

export const publicNavigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Resources", href: "/resources" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly NavigationItem[];
