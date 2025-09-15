import Lottie from "lottie-react";
import animationData from "@/assets/transferEdgeAnimation.json";

export default function SecureSectionTransferEdge() {
  return (
    <div className="bg-white snap-start">
      <div className="relative flex justify-center items-center mx-auto w-full h-[333px] md:h-screen overflow-hidden">
        <Lottie
          animationData={animationData as unknown as object}
          autoplay
          loop
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

// function LottieWrapper() {
//   const lottieRef = useRef<LottieRefCurrentProps>(null);

//   useEffect(() => {
//     const instance = lottieRef.current;
//     if (!instance) return;

//     const applySegment = () => {
//       const totalFrames = instance.getDuration?.(true) as number | undefined;
//       if (typeof totalFrames === "number" && totalFrames > 0) {
//         const endFrame = Math.floor(totalFrames * 0.79);
//         instance.playSegments([0, endFrame], true);
//         return;
//       }
//       requestAnimationFrame(applySegment);
//     };

//     applySegment();
//   }, []);

//   return (
//     <Lottie
//       lottieRef={lottieRef}
//       animationData={animationData as unknown as object}
//       autoplay
//       loop
//       className="w-full h-full object-contain"
//     />
//   );
// }
