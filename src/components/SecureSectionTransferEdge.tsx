import AnimatedSecureSection from "@/components/AnimatedSecureSection";

export default function SecureSectionTransferEdge() {
  const allTexts = [
    "powerful integration",
    "for non-custodial",
    "wallet providers",
  ];

  const allCoinImages = ["/coins1bg.svg", "/coins2bg.svg", "/coins3bg.svg"];

  return (
    <div className="bg-white snap-mandatory snap-y">
      <AnimatedSecureSection
        allTexts={allTexts}
        allCoinImages={allCoinImages}
        textColor="text-accent-pink"
      />
    </div>
  );
}
