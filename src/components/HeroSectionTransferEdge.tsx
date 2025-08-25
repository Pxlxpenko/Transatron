import FadeInSection from "@/components/FadeInSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HeroSectionTransferEdge() {
  return (
    <div className="flex flex-col justify-center items-center pt-[134px] w-full h-screen snap-start">
      <FadeInSection
        triggerOnMount
        className="relative flex justify-between gap-6 mx-auto mb-15 p-14 rounded-[48px] w-full max-w-[1360px] bg-accent-pink"
      >
        <div className="flex flex-col gap-10.5 max-w-[748px]">
          <h1 className="font-black text-white text-8xl uppercase">
            Transfer edge
          </h1>
          <p className="font-bold text-[40px] text-white leading-[130%]">
            Cheaper and efficient payments integration for non-custodial wallets
          </p>
          <Button
            variant="default"
            className="bg-transparent hover:bg-transparent shadow-none px-12! border border-white hover:border-transparent rounded-full w-fit h-14! text-2xl"
          >
            Get in touch
          </Button>
        </div>
        <Image src="/hero1.svg" alt="Hero 2" width={471} height={403} />
      </FadeInSection>
    </div>
  );
}
