import Footer from "@/components/Footer";
import HeroSectionTransferEdge from "@/components/HeroSectionTransferEdge";
import KeyFeaturesSectionTransferEdge from "@/components/KeyFeaturesSectionTransferEdge";
import SecureSectionTransferEdge from "@/components/SecureSectionTransferEdge";
import SeoHead from "@/components/SeoHead";
import WatchInActionSectionTransferEdge from "@/components/WatchInActionSectionTransferEdge";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function TransferEdgeInner() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative w-full h-screen overflow-y-auto snap-mandatory snap-y">
      <HeroSectionTransferEdge />
      <SecureSectionTransferEdge />
      <WatchInActionSectionTransferEdge />
      <KeyFeaturesSectionTransferEdge />
      <Footer />
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
