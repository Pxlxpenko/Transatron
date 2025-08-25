import FadeInSection from "@/components/FadeInSection";
import { cn } from "@/lib/utils";
import Image from "next/image";

const features = [
  {
    title: "Significant Cost Savings",
    description:
      "Leverage our optimized transaction routing to cut network fees by as much as 60%, boosting your bottom line.",
    image: "/features1-business.svg",
  },
  {
    title: "Complete Asset Control",
    description:
      "Your funds are always yours. Operate with the peace of mind that comes from a fully non-custodial platform where only you can access your assets.",
    image: "/features2-business.svg",
  },
  {
    title: "Built-in Compliance Tools",
    description:
      "Simplify your regulatory requirements with automated AML screening and a mandatory verified address book, making compliance a seamless part of your operations.",
    image: "/features3-business.svg",
  },
  {
    title: "Effortless Payment Workflows",
    description:
      "Manage high-volume payouts with our bulk-sending feature and simplify bookkeeping with automated, consolidated financial reporting.",
    image: "/features4-business.svg",
  },
  {
    title: "Flexible Fee Payments",
    description:
      "Forget about stocking up on various native tokens. Our platform gives you the flexibility to pay transaction fees without holding specific network coins.",
    image: "/features5-business.svg",
  },
  {
    title: "Powerful API Integration",
    description:
      "Build our cost-saving and compliance features directly into your existing software and platforms with our robust, developer-friendly API.",
    image: "/features6-business.svg",
  },
];

export default function KeyFeaturesSection() {
  return (
    <div className="flex flex-col justify-center items-center bg-primary py-15 w-full">
      <FadeInSection
        triggerOnMount
        className="relative flex flex-col items-center mx-auto px-25 w-full max-w-[1360px]"
      >
        <div className="flex flex-col justify-center items-center gap-10 w-full max-w-[924px] h-screen snap-start">
          <h1 className="font-black text-white text-8xl text-center uppercase">
            Key features
          </h1>
          {features.slice(0, 3).map((feature, i) => (
            <div
              className={cn(
                "flex justify-between gap-10 px-12.5 w-full",
                i % 2 === 0 && "flex-row-reverse"
              )}
            >
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-white text-4xl leading-[130%]">
                  {feature.title}
                </h3>
                <p className="font-normal text-white text-2xl leading-[130%]">
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
        <div className="flex flex-col items-center gap-10 w-full max-w-[924px] snap-start">
          {features.slice(3).map((feature, i) => (
            <div
              className={cn(
                "flex justify-between gap-10 px-12.5 w-full",
                i % 2 === 0 && "flex-row-reverse"
              )}
            >
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-white text-4xl leading-[130%]">
                  {feature.title}
                </h3>
                <p className="font-normal text-white text-2xl leading-[130%]">
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
      </FadeInSection>
    </div>
  );
}
