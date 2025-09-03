import SeoHead from "@/components/SeoHead";
import Image from "next/image";
import Link from "next/link";
import Shape1Svg from "public/shape1.svg?react";
import Shape2Svg from "public/shape2.svg?react";

export default function IndexPage() {
  return (
    <div className="relative flex justify-center items-center bg-primary mx-auto px-10 w-full max-w-[1360px] grow">
      <SeoHead title="Home" path="/" />
      <div className="hidden relative xl:flex justify-center items-center w-full max-w-[1280px] h-[536px]">
        <Link
          href={"/business-suite"}
          style={{
            clipPath: "polygon(0% 0%, 8% 0%, 87% 100%, 0% 100%)",
          }}
          className="group left-0 absolute flex flex-col justify-center items-center pr-22 w-full max-h-[536px]"
        >
          <Shape1Svg
            width={1094}
            height={536}
            className="z-10 self-start w-full max-w-[1094px] aspect-[1094/536] group-hover:[&>path]:fill-accent-dark-hover"
          />
          <Image
            alt="Hero lines"
            src="/herolines1.svg"
            width={557}
            height={288}
            className="top-0 left-[77px] absolute"
          />

          <div className="z-20 relative flex w-full h-full">
            <div className="bottom-0 left-0 absolute flex flex-col gap-4 p-15">
              <p className="max-w-[400px] font-bold text-[#DBD2FF] xl:text-[28px] text-base leading-[110%]">
                A crypto payment one-stop
                <br /> shop for businesses
              </p>
              <h1 className="max-w-[480px] font-black text-white sm:text-5xl text-7xl md:text-8xl!! uppercase group-hover:scale-102 transition-all duration-150">
                Business Suite
              </h1>
            </div>
          </div>
        </Link>
        <Link
          href={"/transfer-edge"}
          style={{
            clipPath: "polygon(0 0%, 100% 0%, 100% 116%, 0 -17%)",
          }}
          className="group right-0 absolute flex flex-col justify-center items-center pl-21 w-full max-h-[536px]"
        >
          <Shape2Svg
            width={1106}
            height={536}
            className="z-10 self-end w-full max-w-[1106px] aspect-[1106/536] group-hover:[&>path]:fill-accent-pink-hover"
          />
          <Image
            alt="Hero lines"
            src="/herolines2.svg"
            width={557}
            height={288}
            className="right-[77px] bottom-0 absolute"
          />

          <div className="top-0 right-0 z-20 absolute flex flex-col gap-4">
            <div className="flex flex-col items-end gap-4 p-15">
              <h1 className="max-w-[540px] font-black text-white sm:text-5xl text-7xl md:text-8xl!! text-end uppercase group-hover:scale-102! transition-all duration-150">
                Transfer Edge
              </h1>
              <p className="font-bold text-white xl:text-[28px] text-base text-end leading-[110%]">
                Cheaper and efficient
                <br /> payments integration for <br /> non-custodial wallets
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="xl:hidden relative flex flex-col justify-center items-center gap-5">
        <Link
          href={"/transfer-edge"}
          className="group flex flex-col rounded-2xl bg-accent-pink"
        >
          <div className="flex flex-col gap-4 p-10 md:p-15">
            <h1 className="font-black text-[32px] text-white sm:text-[58px] md:text-8xl!! uppercase leading-none group-hover:scale-102! transition-all duration-150">
              Transfer Edge
            </h1>
            <p className="font-bold text-white md:text-[28px] text-base leading-[110%]">
              Cheaper and efficient
              <br /> payments integration for <br /> non-custodial wallets
            </p>
          </div>
        </Link>
        <Link
          href={"/business-suite"}
          className="group flex flex-col bg-accent rounded-2xl"
        >
          <div className="flex flex-col gap-4 p-10 md:p-15">
            <h1 className="font-black text-[32px] text-white sm:text-[58px] md:text-8xl!! uppercase leading-none group-hover:scale-102 transition-all duration-150">
              Business Suite
            </h1>
            <p className="max-w-[400px] font-bold text-[#DBD2FF] md:text-[28px] text-base leading-[110%]">
              A crypto payment one-stop
              <br /> shop for businesses
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
