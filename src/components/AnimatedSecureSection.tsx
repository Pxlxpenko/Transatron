import Image from "next/image";
import { motion } from "framer-motion";
import FadeInSection from "@/components/FadeInSection";

interface AnimatedSecureSectionProps {
  allTexts: string[];
  allCoinImages: string[];
  textColor: string;
}

export default function AnimatedSecureSection({
  allTexts,
  allCoinImages,
  textColor,
}: AnimatedSecureSectionProps) {
  const totalSteps = Math.min(allTexts.length, allCoinImages.length, 4);
  return (
    <div>
      {allTexts.slice(0, totalSteps).map((text, index) => (
        <motion.section
          key={index}
          className="relative flex justify-center items-center gap-6 bg-white mx-auto w-full h-screen overflow-hidden snap-always snap-start"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: false, amount: 0.6 }}
        >
          <Image
            src={allCoinImages[index]}
            alt="Coins"
            width={1173}
            height={582}
            className="absolute inset-0 w-full h-full object-contain sm:object-cover"
          />

          <FadeInSection
            triggerOnMount
            className="z-10 relative flex flex-col justify-center items-center px-10 w-full max-w-[1360px] h-full"
          >
            <motion.div
              className={`font-black text-[40px] md:text-[128px] uppercase whitespace-nowrap text-center ${textColor}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              viewport={{ once: false, amount: 0.6 }}
            >
              {text}
            </motion.div>
          </FadeInSection>
        </motion.section>
      ))}
    </div>
  );
}
