import FadeInSection from "@/components/FadeInSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSection() {
  return (
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
  );
}
