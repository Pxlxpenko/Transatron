import FadeInSection from "@/components/FadeInSection";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { openCalendlyPopup } from "@/lib/utils";

const features = [
  {
    title: "Massive Fee Discounts",
    description:
      "Users save significantly on network fees for every transaction, making your wallet the most cost-effective choice on the market.",
    image: "/benefits2-transfer.png",
  },
  {
    title: "Pay Without Native Coins",
    description:
      "Removes the major friction point of needing to hold specific coins (like ETH or TRX) just to pay for gas, creating a superior user experience.",
    image: "/benefits1-transfer.png",
  },
  {
    title: "Seamless & Secure",
    description:
      "The entire process is integrated into your existing wallet UI, allowing users to transact with the full security of their own non-custodial wallet.",
    image: "/benefits3-transfer.png",
  },
  {
    title: "Earn Cashback Revenue",
    description:
      "Generate a new, passive revenue stream. Receive cashback rewards for every single transaction your users process through the TransferEdge network.",
    image: "/benefits4-transfer.png",
  },
  {
    title: "Increase User Retention",
    description:
      "Attract and retain more users by offering them the market's most competitive transaction rates and innovative features.",
    image: "/benefits5-transfer.png",
  },
  {
    title: "Native RPC & API Integration",
    description:
      "Access our features through a simple RPC endpoint for direct wallet interactions.",
    image: "/benefits6-transfer.png",
  },
];

export default function KeyFeaturesSectionTransferEdge() {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-primary py-10 md:py-15 w-full">
        <FadeInSection
          triggerOnMount
          className="relative flex flex-col items-center gap-[40px] md:gap-[75px] px-4 md:px-25 w-full max-w-[1360px]"
        >
          <div className="flex flex-col justify-center items-center gap-10 md:gap-20 w-full">
            <h1 className="max-w-[924px] font-black text-[48px] text-white md:text-8xl text-center uppercase">
              benefits for users
            </h1>
            <div className="gap-7.5 grid grid-cols-1 md:grid-cols-3">
              {features.slice(0, 3).map((feature) => (
                <div
                  className={cn(
                    "flex flex-col items-center gap-7.5 px-7.5 py-[30px] rounded-[32px] w-full bg-accent-dark"
                  )}
                  key={feature.title}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={308}
                    height={308}
                  />
                  <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-[24px] text-white leading-[130%]">
                      {feature.title}
                    </h3>
                    <p className="font-normal text-[20px] text-white leading-[130%]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button
            className="hover:bg-[#1E1E1E] shadow-none px-12 border border-white rounded-full h-14! text-2xl bg-accent-dark"
            onClick={() =>
              openCalendlyPopup("https://calendly.com/mtiutin/30min")
            }
          >
            Find out more
          </Button>
        </FadeInSection>
      </div>

      <div className="flex flex-col justify-center items-center py-10 md:py-15 w-full bg-accent-pink">
        <FadeInSection className="relative flex flex-col items-center gap-[40px] md:gap-[75px] mx-auto px-4 md:px-25 w-full max-w-[1360px]">
          <div className="flex flex-col justify-center items-center gap-10 md:gap-20 w-full bg-accent-pink">
            <h1 className="max-w-[924px] font-black text-[48px] text-white md:text-8xl text-center uppercase">
              benefits for wallets
            </h1>
            <div className="gap-7.5 grid grid-cols-1 md:grid-cols-3">
              {features.slice(3).map((feature) => (
                <div
                  className={cn(
                    "flex flex-col items-center gap-7.5 bg-[#A12CA9] px-7.5 py-[30px] rounded-[32px] w-full"
                  )}
                  key={feature.title}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={308}
                    height={308}
                  />
                  <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-[24px] text-white leading-[130%]">
                      {feature.title}
                    </h3>
                    <p className="font-normal text-[20px] text-white leading-[130%]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button
            className="bg-transparent hover:bg-[#1E1E1E] shadow-none px-12 border border-white rounded-full h-14! text-2xl"
            onClick={() =>
              openCalendlyPopup("https://calendly.com/mtiutin/30min")
            }
          >
            Find out more
          </Button>
        </FadeInSection>
      </div>
    </>
  );
}
