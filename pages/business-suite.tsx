import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import KeyFeaturesSection from "@/components/KeyFeaturesSection";
import SecureSection from "@/components/SecureSection";
import SeoHead from "@/components/SeoHead";
import WatchInActionSection from "@/components/WatchInActionSection";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function BusinessSuiteInner() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative w-full h-screen overflow-y-auto snap-mandatory snap-y">
      <HeroSection />
      <SecureSection />
      <WatchInActionSection />
      <KeyFeaturesSection />
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
