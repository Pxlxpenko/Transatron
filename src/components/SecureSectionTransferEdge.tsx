import SecureStep from "./SecureStep";
import animationData from "@/assets/transatron2.json";

export default function SecureSectionTransferEdge() {
  // const allTexts = [
  //   {
  //     text: (
  //       <>
  //         powerful
  //         <br /> integration
  //       </>
  //     ),
  //   },
  //   {
  //     text: (
  //       <>
  //         for <br /> non-custodial
  //       </>
  //     ),
  //   },
  //   {
  //     text: (
  //       <>
  //         wallet <br /> providers
  //       </>
  //     ),
  //   },
  // ];

  // const allCoinImages = ["/coins1bg.svg", "/coins2bg.svg", "/coins3bg.svg"];

  return (
    <div className="bg-white snap-start">
      <SecureStep
        animationData={animationData as unknown as object}
        endFrame={96}
        keyStep={1 / 3}
        frames={[0, 48, 96]}
      />
    </div>
  );
}
