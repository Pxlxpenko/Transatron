import Lottie from "lottie-react";
import animationData from "@/assets/businessSuiteAnimation.json";

export default function SecureSectionBusinessSuite() {
  return (
    <div className="bg-white snap-start">
      <div className="relative flex justify-center items-center mx-auto w-full h-screen overflow-hidden">
        <Lottie
          animationData={animationData as unknown as object}
          autoplay
          loop
          className="w-full h-full object-contain scale-150 md:scale-100"
        />
      </div>
    </div>
  );
}
