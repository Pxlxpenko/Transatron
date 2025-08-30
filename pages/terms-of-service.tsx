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
      <div className="relative flex flex-col gap-8 pt-25 pb-12.5 w-full max-w-dvw min-h-screen overflow-hidden">
        <FadeInSection
          triggerOnMount
          className="relative flex flex-col gap-8 mx-auto px-10 w-full max-w-[1360px] text-sm leading-5 tracking-[0.6px]"
        >
          <div className="relative mx-auto w-full text-sm leading-5 tracking-[0.6px]">
            <a
              href="/"
              className="text-white hover:text-white transition-colors duration-200"
            >
              HOME
            </a>{" "}
            / <span className="text-white uppercase">PRIVACY POLICY</span>
          </div>
          <header>
            <h1 className="mb-6 font-bold text-white text-5xl leading-16 tracking-[0.6px]">
              Terms of Service
            </h1>
            <div className="bg-primary mt-6 w-full h-[1px]" />
          </header>
        </FadeInSection>

        <section className="bg-[#E8E4F5] py-10">
          <div className="mx-auto px-10 w-full max-w-[1360px]">
            <div className="max-w-[800px] prose prose-lg">
              Effective Date: [Placeholder Date] Welcome to [Crypto Startup
              Name]. These Terms of Service ("Terms") govern your access to and
              use of our platform, applications, and services (collectively, the
              "Services"). By accessing or using our Services, you agree to be
              bound by these Terms. If you do not agree, you may not access or
              use the Services.
              <br />
              <br />
              <span className="font-bold text-2xl">Eligibility</span>
              <br />
              <br />
              You must be at least 18 years of age, or the age of majority in
              your jurisdiction, to access and use the Services. By creating an
              account, you represent that you meet these requirements and that
              all information you provide is accurate, complete, and current.
              <br />
              <br />
              <span className="font-bold text-2xl">Account Registration</span>
              <br />
              <br />
              To access certain features, you may need to register for an
              account. You are responsible for safeguarding your account
              credentials and for all activities that occur under your account.
              You agree to notify us immediately of any unauthorized access or
              use of your account.
              <br />
              <br />
              <span className="font-bold text-2xl">Use of Services</span>
              <br />
              <br />
              The Services allow users to buy, sell, trade, or otherwise
              interact with digital assets. You agree to use the Services only
              for lawful purposes and in compliance with all applicable laws and
              regulations, including those related to anti-money laundering,
              counter-terrorist financing, and sanctions.
              <br />
              <br />
              <span className="font-bold text-2xl">Prohibited Conduct </span>
              <br />
              <br />
              You agree not to engage in:
              <ul className="list-disc list-inside">
                <li>Fraudulent, deceptive, or manipulative activities;</li>
                <li>
                  Attempts to gain unauthorized access to our systems or disrupt
                  operations;
                </li>
                <li>
                  Use of the Services in connection with illegal activities,
                  including money laundering or terrorist financing;
                </li>
                <li>
                  Violations of intellectual property or third-party rights.
                </li>
              </ul>
              <br />
              <br />
              <span className="font-bold text-2xl">Fees </span>
              <br />
              <br />
              Certain transactions may be subject to fees. Fees will be
              disclosed prior to transaction confirmation. By using the
              Services, you agree to pay all applicable fees.
              <br />
              <br />
              <span className="font-bold text-2xl">
                Suspension and Termination{" "}
              </span>
              <br />
              <br />
              We reserve the right to suspend or terminate your access to the
              Services at our discretion if we believe you have violated these
              Terms, applicable laws, or engaged in conduct harmful to other
              users or our platform.
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
