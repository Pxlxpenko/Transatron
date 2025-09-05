import SecureStep from "./SecureStep";

export default function SecureSectionBusinessSuite() {
  // const allTexts = [
  //   {
  //     text: "Secure",
  //   },
  //   {
  //     text: "Simple",
  //   },
  //   {
  //     text: "Compliant",
  //   },
  //   {
  //     text: (
  //       <>
  //         Crypto payments
  //         <br /> for your business
  //       </>
  //     ),
  //     textClassname: "md:text-[72px]",
  //   },
  // ];

  // const allCoinImages = [
  //   "/coins1bg.svg",
  //   "/coins2bg.svg",
  //   "/coins3bg.svg",
  //   "/coins4bg.svg",
  // ];

  return (
    <div className="bg-white snap-start">
      <SecureStep frames={[0, 30, 56, 93]} className="scale-150 md:scale-100" />
    </div>
  );
}
