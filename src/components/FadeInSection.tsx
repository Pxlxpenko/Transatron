import { motion, useAnimation, useInView } from "framer-motion";
import {
  ReactNode,
  forwardRef,
  useRef,
  useEffect,
  MutableRefObject,
} from "react";
import { useRouter } from "next/router";

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  id?: string;
  enableFadeOut?: boolean;
  // When true, animate on mount instead of waiting for in-view
  triggerOnMount?: boolean;
  // When true, remount internal motion node on route change to retrigger inView after soft nav
  resetOnRouteChange?: boolean;
}

function FadeInSection(
  {
    children,
    delay = 0,
    duration = 0.6,
    className = "",
    id,
    enableFadeOut = true,
    triggerOnMount = false,
    resetOnRouteChange = true,
  }: FadeInSectionProps,
  ref: React.Ref<HTMLDivElement>
) {
  const router = useRouter();
  const localRef = useRef<HTMLDivElement | null>(null);
  const controls = useAnimation();
  const inView = useInView(localRef, {
    margin: "0px 0px -20% 0px",
    amount: 0.1,
    once: !enableFadeOut,
  });

  useEffect(() => {
    if (triggerOnMount || inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration, delay, ease: "easeOut" },
      });
    } else if (enableFadeOut) {
      controls.start({
        opacity: 0,
        y: 20,
        transition: { duration, delay, ease: "easeOut" },
      });
    }
  }, [inView, triggerOnMount, enableFadeOut, controls, duration, delay]);

  useEffect(() => {
    if (!resetOnRouteChange) return;
    controls.set({ opacity: 0, y: 20 });
  }, [router.asPath, resetOnRouteChange, controls]);

  const setRefs = (node: HTMLDivElement | null) => {
    localRef.current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (
      ref &&
      typeof (ref as MutableRefObject<HTMLDivElement | null>).current !==
        "undefined"
    ) {
      (ref as MutableRefObject<HTMLDivElement | null>).current = node;
    }
  };

  return (
    <motion.div
      ref={setRefs}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      exit={enableFadeOut ? { opacity: 0, y: 20 } : undefined}
    >
      {children}
    </motion.div>
  );
}

export default forwardRef(FadeInSection);
