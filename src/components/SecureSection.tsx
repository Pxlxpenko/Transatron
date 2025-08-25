import FadeInSection from "@/components/FadeInSection";
import Image from "next/image";

export default function SecureSection() {
  return (
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
  );
}
