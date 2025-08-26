import FadeInSection from "@/components/FadeInSection";
import SeoHead from "@/components/SeoHead";
import { useEffect } from "react";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <SeoHead title="Privacy Policy" path="/privacy-policy" noIndex />
      <div className="relative pt-30.5 pb-18.5 w-full">
        <div className="top-0 left-0 absolute w-full h-[700px] hero-bg" />
        <div className="top-[700px] bottom-0 absolute bg-[#060B08]/95 w-full" />
        <div className="relative mx-auto px-10 w-full max-w-[1360px] text-sm leading-5 tracking-[0.6px]">
          <a
            href="/"
            className="text-white hover:text-white transition-colors duration-200"
          >
            HOME
          </a>{" "}
          / <span className="text-white uppercase">PRIVACY POLICY</span>
        </div>
        <FadeInSection className="z-10 relative mx-auto mt-8 px-10 lg:px-0 max-w-214 font-normal text-xl leading-7 tracking-[0.6px]">
          <h1 className="relative mb-[58px] font-bold text-[54px] text-white text-center leading-16 tracking-[0.6px]">
            Privacy policy
          </h1>
          This Privacy Policy describes how your personal information is
          collected, used, and shared when you visit the{" "}
          <a
            href="https://www.agger-labs.com/"
            className="text-white underline"
            target="_blank"
          >
            https://www.agger-labs.com/
          </a>
          <br />
          <br />
          <span className="font-bold text-2xl">
            Personal Information We Collect
          </span>
          <br />
          <br />
          When you visit the Site, we automatically collect certain information
          about your device, including information about your web browser, IP
          address, time zone, and some of the cookies that are installed on your
          device. Additionally, as you browse the Site, we collect information
          about the individual web pages or products that you view, what
          websites or search terms referred you to the Site, and information
          about how you interact with the Site. We collect Device Information
          using the following technologies:
          <br />
          <ul className="list-disc list-inside">
            <li>
              “Cookies” are data files that are placed on your device or
              computer and often include an anonymous unique identifier.
            </li>
            <li>
              “Log files” track actions occurring on the Site and collect data
              including your IP address, browser type, Internet service
              provider, referring/exit pages, and date/time stamps.
            </li>
            <li>
              “Web beacons”, “tags” and “pixels” are electronic files used to
              record information about how you browse the Site.
            </li>
          </ul>
          <br />
          <span className="font-bold">
            How Do We Use Your Personal Information?
          </span>
          <br />
          <br />
          We use the Device Information that we collect to help us screen for
          potential risk and fraud (in particular, your IP address), and more
          generally to improve and optimise our Site (for example, by generating
          analytics about how our customers browse and interact with the Site).
          <br />
          <br />
          <span className="font-bold">Sharing Your Personal Information </span>
          <br />
          <br />
          We do not sell, trade, or otherwise transfer your personal information
          to outside parties. This does not include trusted third parties who
          assist us in operating our website, conducting our business, or
          servicing you, so long as those parties agree to keep this information
          confidential.
          <br />
          <br />
          <span className="font-bold">Changes </span>
          <br />
          <br />
          We may update this privacy policy from time to time in order to
          reflect, for example, changes to our practices or for other
          operational, legal, or regulatory reasons.
          <br />
          <br />
          <span className="font-bold">Contact Us </span>
          <br />
          <br />
          For more information about our privacy practices, if you have
          questions, or if you would like to make a complaint, please contact us
          by e-mail at you would like to make a complaint, please contact us by
          e-mail at info@agger-labs.com.
        </FadeInSection>
      </div>
    </>
  );
}
