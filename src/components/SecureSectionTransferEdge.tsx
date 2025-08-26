import FadeInSection from "@/components/FadeInSection";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export default function SecureSectionTransferEdge() {
  const [activeCoin, setActiveCoin] = useState(0);

  return (
    <div
      className="relative flex justify-center items-center gap-6 bg-white mx-auto w-full min-h-screen snap-start cursor-pointer"
      onClick={() => setActiveCoin((prev) => (prev + 1) % 3)}
    >
      <FadeInSection
        triggerOnMount
        className="relative flex flex-col justify-center items-center px-10 w-full max-w-[1360px] h-full"
      >
        <Image
          src="/coins1bg.svg"
          alt="Coins"
          width={1173}
          height={582}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity  duration-1000",
            {
              "opacity-100": activeCoin === 0,
              "opacity-0": activeCoin !== 0,
            }
          )}
        />
        <Image
          src="/coins2bg.svg"
          alt="Coins"
          width={1173}
          height={582}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000",
            {
              "opacity-100": activeCoin === 1,
              "opacity-0": activeCoin !== 1,
            }
          )}
        />
        <Image
          src="/coins3bg.svg"
          alt="Coins"
          width={1173}
          height={582}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity  duration-1000",
            {
              "opacity-100": activeCoin === 2,
              "opacity-0": activeCoin !== 2,
            }
          )}
        />{" "}
        <div className="z-10 flex justify-center items-center h-[320px] overflow-hidden">
          <div
            className="font-black text-[128px] uppercase whitespace-nowrap transition-transform duration-700 ease-in-out text-accent-dark text-accent-pink"
            style={{
              transform: `translateY(${640 - (activeCoin + 1) * 320}px)`,
            }}
          >
            <div className="flex justify-center items-center w-full h-[320px] text-[40px] md:text-[128px] text-center">
              powerful <br /> integration
            </div>
            <div className="flex justify-center items-center w-full h-[320px] text-[40px] md:text-[128px] text-center">
              for
              <br /> non-custodial
            </div>
            <div className="flex justify-center items-center w-full h-[320px] text-[40px] md:text-[128px] text-center">
              wallet <br /> providers
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
