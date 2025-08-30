import HeroSectionBusinessSuite from "@/components/HeroSectionBusinessSuite";
import KeyFeaturesSectionBusinessSuite from "@/components/KeyFeaturesSectionBusinessSuite";
import SecureSectionBusinessSuite from "@/components/SecureSectionBusinessSuite";
import SeoHead from "@/components/SeoHead";
import WatchInActionSectionBusinessSuite from "@/components/WatchInActionSectionBusinessSuite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useScrollSnapKeyFeatures } from "@/hooks/useScrollSnapKeyFeatures";

function BusinessSuiteInner() {
  const keyFeaturesRef = useRef<HTMLDivElement | null>(null);
  const watchRef = useRef<HTMLDivElement | null>(null);

  useScrollSnapKeyFeatures({
    keyFeaturesRef,
    watchRef,
    rootMargin: "80% 0px 80% 0px",
    downDelayMs: 250,
  });

  return (
    <div className="relative w-full">
      <HeroSectionBusinessSuite />
      <SecureSectionBusinessSuite />
      <div ref={watchRef}>
        <WatchInActionSectionBusinessSuite />
      </div>
      <div ref={keyFeaturesRef}>
        <KeyFeaturesSectionBusinessSuite />
      </div>
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
