import FadeInSection from "@/components/FadeInSection";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

const features = [
  {
    title: "Massive Fee Discounts",
    description:
      "Users save significantly on network fees for every transaction, making your wallet the most cost-effective choice on the market.",
    image: "/features1-transfer.svg",
  },
  {
    title: "Pay Without Native Coins",
    description:
      "Removes the major friction point of needing to hold specific coins (like ETH or TRX) just to pay for gas, creating a superior user experience.",
    image: "/features2-transfer.svg",
  },
  {
    title: "Seamless & Secure",
    description:
      "The entire process is integrated into your existing wallet UI, allowing users to transact with the full security of their own non-custodial wallet.",
    image: "/features3-transfer.svg",
  },
  {
    title: "Earn Cashback Revenue",
    description:
      "Generate a new, passive revenue stream. Receive cashback rewards for every single transaction your users process through the TransferEdge network.",
    image: "/benefits1-transfer.svg",
  },
  {
    title: "Increase User Retention",
    description:
      "Attract and retain more users by offering them the market's most competitive transaction rates and innovative features.",
    image: "/benefits2-transfer.svg",
  },
  {
    title: "Native RPC & API Integration",
    description:
      "Access our features through a simple RPC endpoint for direct wallet interactions.",
    image: "/benefits3-transfer.svg",
  },
];

export default function KeyFeaturesSectionTransferEdge() {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-primary py-10 md:py-15 w-full">
        <FadeInSection
          triggerOnMount
          className="relative flex flex-col items-center gap-[40px] md:gap-[75px] mx-auto px-4 md:px-25 w-full max-w-[1360px]"
        >
          <div className="flex flex-col justify-center items-center gap-10 md:gap-20 w-full max-w-[924px] min-h-screen">
            <h1 className="font-black text-[48px] text-white md:text-8xl text-center uppercase">
              benefits for your users
            </h1>
            {features.slice(0, 3).map((feature, i) => (
              <div
                className={cn(
                  "flex flex-col-reverse justify-between items-center gap-10 md:px-12.5 w-full",
                  {
                    "md:flex-row-reverse": i % 2 === 0,
                    "md:flex-row": i % 2 !== 0,
                  }
                )}
              >
                <div className="flex flex-col gap-4">
                  <h3 className="font-bold text-[24px] text-white md:text-4xl leading-[130%]">
                    {feature.title}
                  </h3>
                  <p className="font-normal text-[18px] text-white md:text-2xl leading-[130%]">
                    {feature.description}
                  </p>
                </div>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={200}
                  height={200}
                />
              </div>
            ))}
          </div>
          <Button className="hover:bg-[#1E1E1E] shadow-none px-12 border border-white rounded-full h-14! text-2xl bg-accent-dark">
            Find out more
          </Button>
        </FadeInSection>
      </div>

      <div className="flex flex-col justify-center items-center py-15 w-full bg-accent-pink">
        <FadeInSection className="relative flex flex-col items-center gap-[40px] md:gap-[75px] mx-auto px-4 md:px-25 w-full max-w-[1360px]">
          <div className="flex flex-col items-center gap-10 w-full max-w-[924px] bg-accent-pink">
            <h1 className="font-black text-[48px] text-white md:text-8xl text-center uppercase">
              benefits for your wallet
            </h1>
            {features.slice(3).map((feature, i) => (
              <div
                className={cn(
                  "flex flex-col-reverse justify-between items-center gap-10 md:px-12.5 w-full",
                  {
                    "md:flex-row-reverse": i % 2 === 0,
                    "md:flex-row": i % 2 !== 0,
                  }
                )}
              >
                <div className="flex flex-col gap-4">
                  <h3 className="font-bold text-[24px] text-white md:text-4xl leading-[130%]">
                    {feature.title}
                  </h3>
                  <p className="font-normal text-[18px] text-white md:text-2xl leading-[130%]">
                    {feature.description}
                  </p>
                </div>
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={200}
                  height={200}
                  className="size-[100px] md:size-[200px]"
                />
              </div>
            ))}
          </div>
          <Button className="bg-transparent hover:bg-[#1E1E1E] shadow-none px-12 border border-white rounded-full h-14! text-2xl">
            Find out more
          </Button>
        </FadeInSection>
      </div>
    </>
  );
}
