import FadeInSection from "@/components/FadeInSection";
import { Button } from "@/components/ui/button";
import { openCalendlyPopup } from "@/lib/utils";

export default function WatchInActionSectionTransferEdge() {
  return (
    <div className="flex flex-col justify-center items-center py-15 w-full min-h-screen bg-accent-dark snap-start">
      <FadeInSection
        triggerOnMount
        className="relative flex flex-col items-center gap-16 mx-auto px-10 md:px-25 w-full max-w-[1360px]"
      >
        <h1 className="font-black text-[40px] text-white sm:text-[58px] md:text-8xl text-center uppercase">
          WATCH IN ACTION
        </h1>
        <div className="flex lg:flex-row flex-col gap-10 w-full">
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
          className="hover:bg-transparent shadow-none px-12! border border-white hover:border-transparent rounded-full w-fit h-14! text-2xl bg-accent-dark"
          onClick={() =>
            openCalendlyPopup("https://calendly.com/hello-glenn/30min")
          }
        >
          Book a demo
        </Button>
      </FadeInSection>
    </div>
  );
}
