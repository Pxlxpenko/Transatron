import FadeInSection from "@/components/FadeInSection";
import { Button } from "@/components/ui/button";
import { openCalendlyPopup } from "@/lib/utils";
import Image from "next/image";

export default function HeroSectionBusinessSuite() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto px-5 md:px-10 pt-[100px] md:pt-[40px] pb-5 w-full max-w-[1360px] min-h-screen snap-start">
      <FadeInSection
        triggerOnMount
        className="relative flex xl:flex-row flex-col-reverse justify-between gap-6 mx-auto p-14 rounded-[48px] w-full bg-accent-dark"
      >
        <div className="flex flex-col gap-10.5">
          <h1 className="font-black text-[40px] text-white sm:text-[58px] md:text-8xl uppercase">
            Business Suite
          </h1>
          <p className="font-bold text-[40px] text-white leading-[130%]">
            A crypto payment one-stop shop for businesses
          </p>
          <Button
            variant="default"
            className="hover:bg-transparent shadow-none px-12! border border-white hover:border-transparent rounded-full w-fit h-14! text-2xl bg-accent-dark"
            onClick={() =>
              openCalendlyPopup("https://calendly.com/hello-glenn/30min")
            }
          >
            Get in touch
          </Button>
        </div>
        <Image src="/hero2.svg" alt="Hero 2" width={471} height={403} />
      </FadeInSection>
    </div>
  );
}
