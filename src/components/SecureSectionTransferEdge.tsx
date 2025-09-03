import SecureStep from "./SecureStep";

export default function SecureSectionTransferEdge() {
  const allTexts = [
    {
      text: (
        <>
          powerful
          <br /> integration
        </>
      ),
    },
    {
      text: (
        <>
          for <br /> non-custodial
        </>
      ),
    },
    {
      text: (
        <>
          wallet <br /> providers
        </>
      ),
    },
  ];

  const allCoinImages = ["/coins1bg.svg", "/coins2bg.svg", "/coins3bg.svg"];

  return (
    <div className="bg-white snap-start">
      <SecureStep
        totalSteps={3}
        textColor="text-accent-pink"
        allTexts={allTexts}
        allCoinImages={allCoinImages}
      />
    </div>
  );
}
