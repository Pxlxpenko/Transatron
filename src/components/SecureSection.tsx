import FadeInSection from "@/components/FadeInSection";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export default function SecureSection() {
  const [activeCoin, setActiveCoin] = useState(0);

  return (
    <div
      className="relative flex justify-center items-center gap-6 bg-white mx-auto w-full h-screen snap-start cursor-pointer"
      onClick={() => setActiveCoin((prev) => (prev + 1) % 4)}
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
            "absolute inset-0 w-full h-full transition-opacity duration-1000",
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
            "absolute inset-0 w-full h-full transition-opacity duration-1000",
            {
              "opacity-100": activeCoin === 2,
              "opacity-0": activeCoin !== 2,
            }
          )}
        />{" "}
        <Image
          src="/coins4bg.svg"
          alt="Coins"
          width={1173}
          height={582}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000",
            {
              "opacity-100": activeCoin === 3,
              "opacity-0": activeCoin !== 3,
            }
          )}
        />
        <div className="z-10 flex justify-center items-center h-[280px] overflow-hidden">
          <div
            className="font-black text-[128px] uppercase whitespace-nowrap transition-transform duration-700 ease-in-out text-accent-dark"
            style={{
              transform: `translateY(${740 - (activeCoin + 1) * 280}px)`,
            }}
          >
            <div className="flex justify-center items-center w-full h-[280px]">
              Secure
            </div>
            <div className="flex justify-center items-center w-full h-[280px]">
              Simple
            </div>
            <div className="flex justify-center items-center w-full h-[280px]">
              Compliant
            </div>
            <div className="flex justify-center items-center w-full h-[280px] text-[64px] text-center">
              Crypto payments
              <br /> for your business
            </div>
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
