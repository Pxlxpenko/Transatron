import FadeInSection from "@/components/FadeInSection";
import SeoHead from "@/components/SeoHead";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function TransferEdgeInner() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-primary">
      <FadeInSection
        triggerOnMount
        className="relative flex flex-col gap-6 mx-auto px-10 w-full max-w-[1360px]"
      >
        dasd
      </FadeInSection>
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
