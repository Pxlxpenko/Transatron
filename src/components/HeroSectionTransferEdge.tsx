import FadeInSection from "@/components/FadeInSection";
import { Button } from "@/components/ui/button";
import { openCalendlyPopup } from "@/lib/utils";
import Image from "next/image";

export default function HeroSectionTransferEdge() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto px-5 md:px-10 pb-5 w-full max-w-[1360px] min-h-[calc(100dvh-72px)] md:min-h-screen snap-start">
      <FadeInSection
        triggerOnMount
        className="relative flex lg:flex-row flex-col-reverse justify-between items-center gap-6 mx-auto p-5 md:p-14 rounded-[48px] w-full bg-accent-pink"
      >
        <div className="flex flex-col gap-6 md:gap-10.5 lg:max-w-[748px]">
          <h1 className="font-black text-[42px] text-white md:text-8xl! uppercase">
            Transfer edge
          </h1>
          <p className="font-bold text-[22px] text-white md:text-[48px] leading-[130%]">
            Cheaper and efficient payments integration for non-custodial wallets
          </p>
          <div className="flex md:flex-row flex-col gap-[22.5px] md:gap-4">
            <Button
              variant="default"
              className="bg-transparent hover:bg-[#1E1E1E] shadow-none border border-white rounded-full h-14! text-2xl"
              onClick={() =>
                openCalendlyPopup("https://calendly.com/hello-glenn/30min")
              }
            >
              Get in touch
            </Button>
            <Button
              variant="default"
              className="bg-transparent hover:bg-[#1E1E1E] shadow-none border border-white rounded-full h-14! text-2xl"
              onClick={() =>
                document
                  .getElementById("watch-in-action")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              Watch in action
            </Button>
          </div>
        </div>
        <Image src="/hero1.svg" alt="Hero 2" width={471} height={403} />
      </FadeInSection>
    </div>
  );
}
