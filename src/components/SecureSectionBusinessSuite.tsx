import AnimatedSecureSection from "@/components/AnimatedSecureSection";

export default function SecureSectionBusinessSuite() {
  const allTexts = [
    "Secure",
    "Simple",
    "Compliant",
    "Crypto payments for your business",
  ];

  const allCoinImages = [
    "/coins1bg.svg",
    "/coins2bg.svg",
    "/coins3bg.svg",
    "/coins4bg.svg",
  ];

  return (
    <div className="bg-white snap-mandatory snap-y">
      <AnimatedSecureSection
        allTexts={allTexts}
        allCoinImages={allCoinImages}
        textColor="text-accent-dark"
      />
    </div>
  );
}
