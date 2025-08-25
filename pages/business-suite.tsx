import FadeInSection from "@/components/FadeInSection";
import Footer from "@/components/Footer";
import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";

function BusinessSuiteInner() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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

  return (
    <div className="relative w-full h-screen overflow-y-auto snap-mandatory snap-y">
      <div className="flex flex-col justify-center items-center pt-[134px] w-full h-screen snap-start">
        <FadeInSection
          triggerOnMount
          className="relative flex justify-between gap-6 mx-auto mb-15 p-14 rounded-[48px] w-full max-w-[1360px] bg-accent-dark"
        >
          <div className="flex flex-col gap-10.5 max-w-[558px]">
            <h1 className="font-black text-white text-8xl uppercase">
              Business Suite
            </h1>
            <p className="font-bold text-[40px] text-white leading-[130%]">
              A crypto payment one-stop shop for businesses
            </p>
            <Button
              variant="default"
              className="hover:bg-transparent px-12! border border-white hover:border-transparent rounded-full w-fit h-14! text-2xl bg-accent-dark"
            >
              Get in touch
            </Button>
          </div>
          <Image src="/hero2.svg" alt="Hero 2" width={471} height={403} />
        </FadeInSection>
      </div>
      <div className="relative flex justify-center items-center gap-6 bg-white mx-auto w-full h-screen snap-start">
        <FadeInSection
          triggerOnMount
          className="relative flex flex-col justify-center items-center px-10 w-full max-w-[1360px] h-full"
        >
          <Image
            src="/coinsbg.svg"
            alt="Coins"
            width={1173}
            height={582}
            className="absolute inset-0 w-full h-full"
          />
          <h2 className="z-10 font-black text-8xl uppercase text-accent-dark">
            Secure
          </h2>
        </FadeInSection>
      </div>
      <div className="flex flex-col justify-center items-center py-15 w-full h-screen bg-accent-dark snap-start">
        <FadeInSection
          triggerOnMount
          className="relative flex flex-col items-center gap-16 mx-auto px-25 w-full max-w-[1360px]"
        >
          <h1 className="font-black text-white text-8xl uppercase">
            WATCH IN ACTION
          </h1>
          <div className="flex gap-10 w-full">
            <div className="flex flex-col gap-4 bg-white p-10 rounded-[40px] w-full">
              <div className="bg-[#DDD4FF] rounded-[30px] w-full h-[309px]" />
              <p className="font-bold text-[#313131] text-[32px] leading-[130%]">
                Significant Cost Savings
              </p>
            </div>
            <div className="flex flex-col gap-4 bg-white p-10 rounded-[40px] w-full">
              <div className="bg-[#DDD4FF] rounded-[30px] w-full h-[309px]" />
              <p className="font-bold text-[#313131] text-[32px] leading-[130%]">
                Significant Cost Savings
              </p>
            </div>
          </div>
          <Button
            variant="default"
            className="hover:bg-transparent px-12! border border-white hover:border-transparent rounded-full w-fit h-14! text-2xl bg-accent-dark"
          >
            Book a demo
          </Button>
        </FadeInSection>
      </div>
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
      <Footer />
    </div>
  );
}

export default function BusinessSuitePage() {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <SeoHead title="BusinessSuite" path="/business-suite" />
      <BusinessSuiteInner />
    </QueryClientProvider>
  );
}
