import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  id?: string;
  enableFadeOut?: boolean;
  // When true, animate on mount instead of waiting for in-view
  triggerOnMount?: boolean;
}

export default function FadeInSection({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
  id,
  enableFadeOut = true,
  triggerOnMount = false,
}: FadeInSectionProps) {
  const baseProps = {
    initial: { opacity: 0, y: 20 },
    transition: { duration, delay, ease: "easeOut" },
    exit: enableFadeOut ? { opacity: 0, y: 20 } : undefined,
  } as const;

  return (
    <motion.div
      {...baseProps}
      {...(triggerOnMount
        ? { animate: { opacity: 1, y: 0 } }
        : {
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: !enableFadeOut, margin: "-100px" },
          })}
      id={id}
      className={className}
    >
      {children}
    </motion.div>
  );
}
