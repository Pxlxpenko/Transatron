import HeroSectionTransferEdge from "@/components/HeroSectionTransferEdge";
import KeyFeaturesSectionTransferEdge from "@/components/KeyFeaturesSectionTransferEdge";
import SecureSectionTransferEdge from "@/components/SecureSectionTransferEdge";
import SeoHead from "@/components/SeoHead";
import WatchInActionSectionTransferEdge from "@/components/WatchInActionSectionTransferEdge";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useScrollSnapKeyFeatures } from "@/hooks/useScrollSnapKeyFeatures";

function TransferEdgeInner() {
  const keyFeaturesRef = useRef<HTMLDivElement | null>(null);
  const watchRef = useRef<HTMLDivElement | null>(null);
  const secureRef = useRef<HTMLDivElement | null>(null);

  useScrollSnapKeyFeatures({
    keyFeaturesRef,
    watchRef,
    rootMargin: "80% 0px 80% 0px",
    downDelayMs: 250,
    freeScrollRefs: [],
    secureRefs: [secureRef],
  });

  return (
    <div className="relative w-full">
      <HeroSectionTransferEdge />
      <div ref={secureRef}>
        <SecureSectionTransferEdge />
      </div>
      <div ref={watchRef}>
        <WatchInActionSectionTransferEdge />
      </div>
      <div ref={keyFeaturesRef}>
        <KeyFeaturesSectionTransferEdge />
      </div>
    </div>
  );
}

export default function BusinessSuitePage() {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <SeoHead title="TransferEdge" path="/transfer-edge" />
      <TransferEdgeInner />
    </QueryClientProvider>
  );
}
