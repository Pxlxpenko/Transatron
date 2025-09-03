import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeInSection from "@/components/FadeInSection";
import { useEffect, useRef } from "react";

interface SecureStepProps {
  totalSteps: number;
  textColor: string;
  allTexts: string[];
  allCoinImages: string[];
}

export default function SecureStep({
  totalSteps,
  textColor,
  allTexts,
  allCoinImages,
}: SecureStepProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate which step should be visible based on scroll progress
  const currentStepIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, totalSteps - 1]
  );

  // Predefine transforms for up to 4 steps (fits current usage: 3-4 slides)
  const coinOpacities = [
    useTransform(currentStepIndex, [-0.5, 0, 0.5], [0, 1, 0]),
    useTransform(currentStepIndex, [0.5, 1, 1.5], [0, 1, 0]),
    useTransform(currentStepIndex, [1.5, 2, 2.5], [0, 1, 0]),
    useTransform(currentStepIndex, [2.5, 3, 3.5], [0, 1, 0]),
  ];
  const textOpacities = [
    useTransform(currentStepIndex, [-0.5, 0, 0.5], [0, 1, 0]),
    useTransform(currentStepIndex, [0.5, 1, 1.5], [0, 1, 0]),
    useTransform(currentStepIndex, [1.5, 2, 2.5], [0, 1, 0]),
    useTransform(currentStepIndex, [2.5, 3, 3.5], [0, 1, 0]),
  ];
  const textYTransforms = [
    useTransform(currentStepIndex, [-0.5, 0, 0.5], [50, 0, -50]),
    useTransform(currentStepIndex, [0.5, 1, 1.5], [50, 0, -50]),
    useTransform(currentStepIndex, [1.5, 2, 2.5], [50, 0, -50]),
    useTransform(currentStepIndex, [2.5, 3, 3.5], [50, 0, -50]),
  ];

  // Internal step snapping
  const isActiveRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const lastSnapTimeRef = useRef<number>(0);
  const unlockTimeoutRef = useRef<number | null>(null);
  const minSnapIntervalMs = 400;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getContainerTop = () =>
      container.getBoundingClientRect().top + window.scrollY;
    const getStepTop = (index: number) =>
      getContainerTop() + index * window.innerHeight;
    const clamp = (n: number, min: number, max: number) =>
      Math.max(min, Math.min(max, n));
    let currentIndex = 0;

    const updateCurrentIndex = () => {
      const rel = window.scrollY - getContainerTop();
      currentIndex = clamp(
        Math.round(rel / window.innerHeight),
        0,
        totalSteps - 1
      );
    };

    const scrollToIndex = (index: number) => {
      isAnimatingRef.current = true;
      window.scrollTo({ top: getStepTop(index), behavior: "smooth" });
    };

    const scheduleUnlock = () => {
      if (unlockTimeoutRef.current) {
        window.clearTimeout(unlockTimeoutRef.current);
        unlockTimeoutRef.current = null;
      }
      unlockTimeoutRef.current = window.setTimeout(
        () => {
          isAnimatingRef.current = false;
        },
        Math.max(250, minSnapIntervalMs - 50)
      );
    };

    const onScrollMonitor = () => {
      if (!isAnimatingRef.current) return;
      const targetTop = getStepTop(currentIndex);
      if (Math.abs(window.scrollY - targetTop) < 2) {
        scheduleUnlock();
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (!isActiveRef.current) return;
      if (isAnimatingRef.current) return;
      const now = performance.now();
      if (now - lastSnapTimeRef.current < minSnapIntervalMs) return;
      updateCurrentIndex();
      const direction = e.deltaY > 0 ? 1 : -1;
      const next = clamp(currentIndex + direction, 0, totalSteps - 1);
      if (next === currentIndex) {
        // allow page scroll when trying to go out of bounds
        return;
      }
      e.preventDefault();
      lastSnapTimeRef.current = now;
      currentIndex = next;
      scrollToIndex(currentIndex);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!isActiveRef.current) return;
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isActiveRef.current) return;
      if (touchStartYRef.current == null) return;
      const dy =
        touchStartYRef.current -
        (e.touches[0]?.clientY ?? touchStartYRef.current);
      if (Math.abs(dy) < 16) return;
      if (isAnimatingRef.current) return;
      const now = performance.now();
      if (now - lastSnapTimeRef.current < minSnapIntervalMs) return;
      updateCurrentIndex();
      const direction = dy > 0 ? 1 : -1;
      const next = clamp(currentIndex + direction, 0, totalSteps - 1);
      if (next === currentIndex) {
        // allow page to scroll when trying to leave bounds
        return;
      }
      e.preventDefault();
      lastSnapTimeRef.current = now;
      currentIndex = next;
      scrollToIndex(currentIndex);
      touchStartYRef.current = null;
    };

    const io = new IntersectionObserver(
      (entries) => {
        const inView = entries.some((e) => e.isIntersecting);
        isActiveRef.current = inView;
        // do not force snap on entry; allow natural position (so users can scroll into/out of section)
      },
      { threshold: 0.01 }
    );
    io.observe(container);

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("scroll", onScrollMonitor, { passive: true });

    const onResize = () => updateCurrentIndex();
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      if (unlockTimeoutRef.current) {
        window.clearTimeout(unlockTimeoutRef.current);
        unlockTimeoutRef.current = null;
      }
      window.removeEventListener("wheel", onWheel as EventListener);
      window.removeEventListener("touchstart", onTouchStart as EventListener);
      window.removeEventListener("touchmove", onTouchMove as EventListener);
      window.removeEventListener("scroll", onScrollMonitor as EventListener);
      window.removeEventListener("resize", onResize);
    };
  }, [totalSteps]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${totalSteps * 100}vh` }}
    >
      <div className="top-0 sticky">
        <div className="relative flex justify-center items-center gap-6 bg-white mx-auto w-full h-screen overflow-hidden">
          {allCoinImages.slice(0, 4).map((image, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 w-full h-full"
              style={{
                opacity: coinOpacities[index],
              }}
            >
              <Image
                src={image}
                alt="Coins"
                width={1173}
                height={582}
                className="w-full h-full object-contain sm:object-cover"
              />
            </motion.div>
          ))}

          <FadeInSection
            triggerOnMount
            className="z-10 relative flex flex-col justify-center items-center px-10 w-full max-w-[1360px] h-full"
          >
            <div className="z-10 flex justify-center items-center h-[320px] overflow-hidden">
              {allTexts.slice(0, 4).map((textItem, index) => (
                <motion.div
                  key={index}
                  className={`font-black text-[40px] md:text-[128px] uppercase whitespace-nowrap text-center ${textColor} absolute`}
                  style={{
                    opacity: textOpacities[index],
                    y: textYTransforms[index],
                  }}
                >
                  {textItem}
                </motion.div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
}
