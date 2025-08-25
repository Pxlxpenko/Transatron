import Footer from "@/components/Footer";
import HeroSectionBusinessSuite from "@/components/HeroSectionBusinessSuite";
import KeyFeaturesSectionBusinessSuite from "@/components/KeyFeaturesSectionBusinessSuite";
import SecureSectionBusinessSuite from "@/components/SecureSectionBusinessSuite";
import SeoHead from "@/components/SeoHead";
import WatchInActionSectionBusinessSuite from "@/components/WatchInActionSectionBusinessSuite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function BusinessSuiteInner() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative w-full h-screen overflow-y-auto snap-mandatory snap-y">
      <HeroSectionBusinessSuite />
      <SecureSectionBusinessSuite />
      <WatchInActionSectionBusinessSuite />
      <KeyFeaturesSectionBusinessSuite />
      <Footer />
    </div>
  );
}

export default function BusinessSuitePage() {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <SeoHead title="BusinessSuite" path="/business-suite" />
      <BusinessSuiteInner />
    </QueryClientProvider>
  );
}
