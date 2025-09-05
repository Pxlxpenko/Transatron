import FadeInSection from "@/components/FadeInSection";
import { Button } from "@/components/ui/button";
import { openCalendlyPopup } from "@/lib/utils";
import Image from "next/image";

export default function HeroSectionBusinessSuite() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto px-5 md:px-10 pb-5 w-full max-w-[1360px] min-h-[calc(100dvh-72px)] md:min-h-screen snap-start">
      <FadeInSection
        triggerOnMount
        className="relative flex xl:flex-row flex-col-reverse justify-between gap-6 mx-auto p-5 md:p-14 rounded-[48px] w-full bg-accent-dark"
      >
        <div className="flex flex-col gap-6 md:gap-10.5">
          <h1 className="font-black text-[42px] text-white md:text-8xl! uppercase">
            Business Suite
          </h1>
          <p className="font-bold text-[22px] text-white md:text-[48px] leading-[130%]">
            A crypto payment one-stop shop for businesses
          </p>
          <div className="flex md:flex-row flex-col gap-[22.5px] md:gap-4">
            <Button
              variant="default"
              className="hover:bg-[#1E1E1E] shadow-none border border-white rounded-full h-14! text-2xl bg-accent-dark"
              onClick={() =>
                openCalendlyPopup("https://calendly.com/hello-glenn/30min")
              }
            >
              Get in touch
            </Button>
            <Button
              variant="default"
              className="hover:bg-[#1E1E1E] shadow-none border border-white rounded-full h-14! text-2xl bg-accent-dark"
              onClick={() =>
                openCalendlyPopup("https://calendly.com/hello-glenn/30min")
              }
            >
              Watch in action
            </Button>
          </div>
        </div>
        <Image
          src="/hero2.svg"
          className="mx-auto"
          alt="Hero 2"
          width={471}
          height={403}
        />
      </FadeInSection>
    </div>
  );
}
