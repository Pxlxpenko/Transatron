import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeInSection from "@/components/FadeInSection";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSecureSectionProps {
  allTexts: { text: React.ReactNode; textClassname?: string }[];
  allCoinImages: string[];
  textColor: string;
}

export default function AnimatedSecureSection({
  allTexts,
  allCoinImages,
  textColor,
}: AnimatedSecureSectionProps) {
  return (
    <div>
      {allTexts.map((text, index) => (
        <ParallaxSection
          key={index}
          text={text.text}
          textClassname={text.textClassname}
          imageSrc={allCoinImages[index]}
          textColor={textColor}
        />
      ))}
    </div>
  );
}

interface ParallaxSectionProps {
  text: React.ReactNode;
  imageSrc: string;
  textColor: string;
  textClassname?: string;
}

function ParallaxSection({
  text,
  imageSrc,
  textColor,
  textClassname,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const coinY = useTransform(scrollYProgress, [0, 0.5, 1], [140, -20, -220]);
  const coinScale = useTransform(scrollYProgress, [0, 1], [1.15, 0.97]);
  const coinOpacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.5, 0.7],
    [0, 1, 0.6, 0.3]
  );

  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.85, 1],
    [0, 1, 1, 0]
  );
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -20]);

  return (
    <motion.section
      ref={sectionRef}
      className="relative flex justify-center items-center gap-6 mx-auto w-full h-screen overflow-x-hidden overflow-y-hidden snap-always snap-start"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.6 }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          y: coinY,
          scale: coinScale,
          opacity: coinOpacity,
          filter: "blur(0px)",
        }}
      >
        <Image
          src={imageSrc}
          alt="Coins"
          width={1173}
          height={582}
          className="w-full h-full object-contain md:object-cover will-change-transform"
        />
      </motion.div>

      <FadeInSection
        triggerOnMount
        className="z-10 relative flex flex-col justify-center items-center px-10 w-full max-w-[1360px] h-full overflow-x-hidden"
      >
        <motion.div
          className={cn(
            `font-black text-[48px] md:text-[128px] text-center uppercase whitespace-nowrap`,
            textColor,
            textClassname
          )}
          style={{ opacity: textOpacity, y: textY }}
        >
          {text}
        </motion.div>
      </FadeInSection>
    </motion.section>
  );
}
