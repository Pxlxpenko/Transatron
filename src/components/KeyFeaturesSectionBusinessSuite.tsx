import FadeInSection from "@/components/FadeInSection";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";
import { openCalendlyPopup } from "@/lib/utils";

const features = [
  {
    title: "Significant Cost Savings",
    description:
      "Leverage our optimized transaction routing to cut network fees by as much as 60%, boosting your bottom line.",
    image: "/features1-business.png",
  },
  {
    title: "Complete Asset Control",
    description:
      "Your funds are always yours. Operate with the peace of mind that comes from a fully non-custodial platform where only you can access your assets.",
    image: "/features2-business.png",
  },
  {
    title: "Built-in Compliance Tools",
    description:
      "Simplify your regulatory requirements with automated AML screening and a mandatory verified address book, making compliance a seamless part of your operations.",
    image: "/features3-business.png",
  },
  {
    title: "Effortless Payment Workflows",
    description:
      "Manage high-volume payouts with our bulk-sending feature and simplify bookkeeping with automated, consolidated financial reporting.",
    image: "/features4-business.png",
  },
  {
    title: "Flexible Fee Payments",
    description:
      "Forget about stocking up on various native tokens. Our platform gives you the flexibility to pay transaction fees without holding specific network coins.",
    image: "/features5-business.png",
  },
  {
    title: "Powerful API Integration",
    description:
      "Build our cost-saving and compliance features directly into your existing software and platforms with our robust, developer-friendly API.",
    image: "/features6-business.png",
  },
];

export default function KeyFeaturesSectionBusinessSuite() {
  return (
    <div className="flex flex-col justify-center items-center bg-primary py-10 md:py-15 w-full">
      <FadeInSection
        triggerOnMount
        className="relative flex flex-col items-center gap-[40px] md:gap-[75px] px-4 md:px-25 w-full max-w-[1360px]"
      >
        <div className="flex flex-col justify-center items-center gap-10 md:gap-20 w-full">
          <h1 className="max-w-[924px] font-black text-[48px] text-white md:text-8xl text-center uppercase">
            Key features
          </h1>
          <div className="gap-7.5 grid grid-cols-1 md:grid-cols-3">
            {features.map((feature) => (
              <div
                className={cn(
                  "flex flex-col items-center gap-7.5 px-7.5 py-[30px] rounded-[32px] w-full bg-accent-dark"
                )}
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={308}
                  height={308}
                  className="size-[308px]"
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
            openCalendlyPopup("https://calendly.com/transatron/30min")
          }
        >
          Find out more
        </Button>
      </FadeInSection>
    </div>
  );
}
