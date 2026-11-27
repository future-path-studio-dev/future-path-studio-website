import type { ReactNode } from "react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />

      <div className="flex-1">{children}</div>

      <Footer />
    </>
  );
}
