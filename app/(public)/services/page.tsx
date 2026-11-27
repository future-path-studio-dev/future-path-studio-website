import type { Metadata } from "next";
import { Suspense } from "react";
import Breadcrumb from "@/components/services/Breadcrumb";
import HowItWorks from "@/components/services/HowItWorks";
import ServicesCta from "@/components/services/ServicesCta";
import { ServicesExplorer, ServicesExplorerFallback } from "@/components/services/ServicesExplorer";
import ServicesFaq from "@/components/services/ServicesFaq";

export const metadata: Metadata = {
  title: "Services | The Future Path Studio",
  description:
    "Practical consulting, resources and capability support for RTOs and training organisations.",
};

// Figma "Services – Overview" 471:955.
export default function ServicesPage() {
  return (
    <main>
      <div className="fps-container pt-10">
        <div className="flex flex-col items-start gap-5">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
          <h1 className="text-[40px]/[normal] font-bold text-foreground">Services</h1>
          <p className="max-w-[760px] text-lg/7 text-muted">
            Practical consulting, resources and capability support for RTOs and training
            organisations.
          </p>
        </div>

        <Suspense fallback={<ServicesExplorerFallback />}>
          <ServicesExplorer />
        </Suspense>
      </div>

      <HowItWorks />
      <ServicesFaq />
      <ServicesCta />
    </main>
  );
}
