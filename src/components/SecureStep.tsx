"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeInSection from "@/components/FadeInSection";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SecureStepProps {
  totalSteps: number;
  textColor: string;
  allTexts: { text: React.ReactNode; textClassname?: string }[];
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

  const smoothStepIndex = useTransform(scrollYProgress, (progress) => {
    return progress * (totalSteps - 1);
  });

  const coinOpacities = [
    useTransform(smoothStepIndex, [-0.5, 0, 0.5], [0, 1, 0]),
    useTransform(smoothStepIndex, [0.5, 1, 1.5], [0, 1, 0]),
    useTransform(smoothStepIndex, [1.5, 2, 2.5], [0, 1, 0]),
    useTransform(smoothStepIndex, [2.5, 3, 3.5], [0, 1, 0]),
  ];
  const coinYTransforms = [
    useTransform(smoothStepIndex, [-0.5, 0, 0.5], [100, 0, -100]),
    useTransform(smoothStepIndex, [0.5, 1, 1.5], [100, 0, -100]),
    useTransform(smoothStepIndex, [1.5, 2, 2.5], [100, 0, -100]),
    useTransform(smoothStepIndex, [2.5, 3, 3.5], [100, 0, -100]),
  ];
  const textOpacities = [
    useTransform(smoothStepIndex, [-0.5, 0, 0.5], [0, 1, 0]),
    useTransform(smoothStepIndex, [0.5, 1, 1.5], [0, 1, 0]),
    useTransform(smoothStepIndex, [1.5, 2, 2.5], [0, 1, 0]),
    useTransform(smoothStepIndex, [2.5, 3, 3.5], [0, 1, 0]),
  ];
  const textYTransforms = [
    useTransform(smoothStepIndex, [-0.5, 0, 0.5], [50, 0, -50]),
    useTransform(smoothStepIndex, [0.5, 1, 1.5], [50, 0, -50]),
    useTransform(smoothStepIndex, [1.5, 2, 2.5], [50, 0, -50]),
    useTransform(smoothStepIndex, [2.5, 3, 3.5], [50, 0, -50]),
  ];

  // Internal step snapping
  const isActiveRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const lastSnapTimeRef = useRef<number>(0);
  const unlockTimeoutRef = useRef<number | null>(null);
  const minSnapIntervalMs = 600; // Increased interval to reduce aggressive snapping
  // const wheelDeltaRef = useRef<number>(0);
  // const wheelResetTimeoutRef = useRef<number | null>(null);
  // const wheelGestureStartRef = useRef<number | null>(null);
  const touchGestureStartRef = useRef<number | null>(null);

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
      // Use immediate jump to avoid native momentum skipping over steps.
      const rawTargetTop = getStepTop(index);
      const maxTop = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const targetTop = Math.min(rawTargetTop, maxTop);
      console.debug("SecureStep:scrollToIndex", {
        index,
        rawTargetTop,
        maxTop,
        targetTop,
      });
      window.scrollTo({ top: targetTop, behavior: "auto" });

      // Stabilize: repeatedly set scrollTop for a few frames to avoid
      // any browser momentum/scroll rounding that could push us past
      // the intended target. After stabilization, clear animating flag.
      let attempts = 0;
      const stabilize = () => {
        attempts += 1;
        console.debug("SecureStep:stabilize", {
          attempt: attempts,
          scrollY: window.scrollY,
          targetTop,
        });
        window.scrollTo({ top: targetTop, behavior: "auto" });
        // Force-set scrollTop on document elements as well to overcome
        // potential CSS/scroll snapping or other handlers that prevent
        // a single jump to the target.
        try {
          document.documentElement.scrollTop = targetTop;
          (document.scrollingElement as HTMLElement).scrollTop = targetTop;
          document.body.scrollTop = targetTop;
        } catch {
          // ignore
        }
        if (Math.abs(window.scrollY - targetTop) > 1 && attempts < 10) {
          requestAnimationFrame(stabilize);
        } else {
          // small delay to let other frame work finish
          window.setTimeout(() => {
            isAnimatingRef.current = false;
            console.debug("SecureStep:stabilize:done", {
              finalScrollY: window.scrollY,
              targetTop,
              attempts,
            });
          }, 50);
        }
      };
      requestAnimationFrame(stabilize);
    };

    const scheduleUnlock = (delay = 600) => {
      if (unlockTimeoutRef.current) {
        window.clearTimeout(unlockTimeoutRef.current);
        unlockTimeoutRef.current = null;
      }
      unlockTimeoutRef.current = window.setTimeout(() => {
        isAnimatingRef.current = false;
      }, delay);
    };

    const onWheel = () => {
      // console.debug("SecureStep:onWheel fired", {
      //   deltaY: e.deltaY,
      //   isActive: isActiveRef.current,
      //   isAnimating: isAnimatingRef.current,
      // });
      // if (!isActiveRef.current) return;
      // // If we're animating a programmatic snap, lock native scrolling by
      // // preventing default — this avoids momentum taking the page past
      // // the intended step.
      // if (isAnimatingRef.current) {
      //   e.preventDefault();
      //   return;
      // }
      // // accumulate wheel delta because many small deltas arrive per gesture
      // // do NOT preventDefault here to avoid blocking outer scrolling unless
      // // we decide to snap — preventing by default causes the section to trap
      // // the scroll input.
      // wheelDeltaRef.current += e.deltaY;
      // // reset accumulator shortly after user stops scrolling
      // if (wheelResetTimeoutRef.current) {
      //   window.clearTimeout(wheelResetTimeoutRef.current);
      // }
      // wheelResetTimeoutRef.current = window.setTimeout(() => {
      //   wheelDeltaRef.current = 0;
      //   wheelResetTimeoutRef.current = null;
      // }, 150);
      // // if user changes direction, reset accumulator
      // if (wheelDeltaRef.current > 0 && e.deltaY < 0)
      //   wheelDeltaRef.current = e.deltaY;
      // if (wheelDeltaRef.current < 0 && e.deltaY > 0)
      //   wheelDeltaRef.current = e.deltaY;
      // const abs = Math.abs(wheelDeltaRef.current);
      // const threshold = 80; // pixels accumulated required to trigger a snap
      // if (abs < threshold) return;
      // const now = performance.now();
      // if (now - lastSnapTimeRef.current < minSnapIntervalMs) {
      //   wheelDeltaRef.current = 0;
      //   return;
      // }
      // // Use the gesture start index to avoid native scroll movement
      // // during the gesture causing us to jump multiple steps.
      // if (wheelGestureStartRef.current == null) {
      //   wheelGestureStartRef.current = currentIndex;
      // }
      // const direction = wheelDeltaRef.current > 0 ? 1 : -1;
      // const next = clamp(
      //   (wheelGestureStartRef.current ?? currentIndex) + direction,
      //   0,
      //   totalSteps - 1
      // );
      // console.debug("SecureStep:onWheel computed", {
      //   currentIndex,
      //   direction,
      //   next,
      //   wheelDelta: wheelDeltaRef.current,
      // });
      // if (next === (wheelGestureStartRef.current ?? currentIndex)) {
      //   wheelDeltaRef.current = 0;
      //   wheelGestureStartRef.current = null;
      //   return;
      // }
      // // Now that we are committing to a snap, prevent the native scroll
      // // so the page doesn't continue scrolling while we programmatically
      // // scroll to the step. Also stop propagation so other handlers don't
      // // respond and cause unexpected behavior.
      // if (typeof e.preventDefault === "function") e.preventDefault();
      // const ev = e as unknown as Event & {
      //   stopImmediatePropagation?: () => void;
      //   stopPropagation?: () => void;
      // };
      // if (typeof ev.stopImmediatePropagation === "function") {
      //   ev.stopImmediatePropagation();
      // }
      // if (typeof ev.stopPropagation === "function") {
      //   ev.stopPropagation();
      // }
      // // clear accumulator timer
      // if (wheelResetTimeoutRef.current) {
      //   window.clearTimeout(wheelResetTimeoutRef.current);
      //   wheelResetTimeoutRef.current = null;
      // }
      // lastSnapTimeRef.current = now;
      // currentIndex = next;
      // wheelDeltaRef.current = 0;
      // wheelGestureStartRef.current = null;
      // scrollToIndex(currentIndex);
      // scheduleUnlock(800);
    };

    const onTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0]?.clientY ?? null;
      console.debug("SecureStep:onTouchMove fired", {
        touchY,
        touchStart: touchStartYRef.current,
        isActive: isActiveRef.current,
      });
      if (!isActiveRef.current) return;
      // lock during animation to avoid momentum skipping the step
      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }
      if (touchStartYRef.current == null) return;
      const dy =
        touchStartYRef.current -
        (e.touches[0]?.clientY ?? touchStartYRef.current);

      if (Math.abs(dy) < 40) return;

      if (isAnimatingRef.current) return;
      const now = performance.now();
      if (now - lastSnapTimeRef.current < minSnapIntervalMs) return;
      // Record the gesture start index so quick drags don't accumulate
      // the page scroll and cause multi-step jumps.
      if (touchGestureStartRef.current == null) {
        touchGestureStartRef.current = currentIndex;
      }
      const direction = dy > 0 ? 1 : -1;
      const next = clamp(
        (touchGestureStartRef.current ?? currentIndex) + direction,
        0,
        totalSteps - 1
      );
      console.debug("SecureStep:onTouchMove computed", {
        currentIndex,
        direction,
        next,
      });
      if (next === (touchGestureStartRef.current ?? currentIndex)) {
        touchGestureStartRef.current = null;
        return;
      }
      e.preventDefault();
      lastSnapTimeRef.current = now;
      currentIndex = next;
      scrollToIndex(currentIndex);
      touchStartYRef.current = null;
      touchGestureStartRef.current = null;
      scheduleUnlock(800);
    };

    const onTouchEnd = () => {
      console.debug("SecureStep:onTouchEnd fired", {
        isActive: isActiveRef.current,
        isAnimating: isAnimatingRef.current,
      });
      if (!isActiveRef.current) return;
      if (isAnimatingRef.current) return;
      updateCurrentIndex();
      scrollToIndex(currentIndex);
      scheduleUnlock(600);
    };

    const onTouchStart = (e: TouchEvent) => {
      console.debug("SecureStep:onTouchStart fired", {
        isActive: isActiveRef.current,
      });
      if (!isActiveRef.current) return;
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!isActiveRef.current) return;
      // lock during animation
      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }

      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const now = performance.now();
        if (now - lastSnapTimeRef.current < minSnapIntervalMs) return;
        updateCurrentIndex();
        const direction = e.key === "ArrowDown" ? 1 : -1;
        const next = clamp(currentIndex + direction, 0, totalSteps - 1);
        if (next === currentIndex) return;
        lastSnapTimeRef.current = now;
        currentIndex = next;
        scrollToIndex(currentIndex);
        scheduleUnlock(800);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const inView = entry.isIntersecting;
        console.debug("SecureStep:IO", {
          inView,
          intersectionRatio: entry.intersectionRatio,
        });
        isActiveRef.current = inView;

        // Auto-focus the container when it becomes active so it receives
        // keyboard events (ArrowUp/ArrowDown). Use preventScroll to avoid
        // moving the viewport when focusing.
        try {
          if (inView) {
            const el = container as HTMLElement;
            if (typeof el.focus === "function") {
              // preventScroll option isn't available in all browsers typings
              try {
                el.focus({ preventScroll: true } as unknown as FocusOptions);
              } catch {
                el.focus();
              }
            }
          } else if (document.activeElement === container) {
            const el = container as HTMLElement;
            if (typeof el.blur === "function") el.blur();
          }
        } catch {
          // ignore focus errors
        }

        if (inView && !isAnimatingRef.current) {
          const containerRect = container.getBoundingClientRect();
          const isEnteringFromTop =
            containerRect.top <= window.innerHeight * 0.5 &&
            containerRect.top >= -window.innerHeight * 0.5;

          if (isEnteringFromTop) {
            updateCurrentIndex();
            const rel = window.scrollY - getContainerTop();
            if (rel < window.innerHeight * 0.05) {
              currentIndex = 0;
            }
          }
        }
      },
      { threshold: [0.1, 0.5] } // Added multiple thresholds for better detection
    );
    io.observe(container);
    // keyboard support: attach to container so focus is required to use arrows
    container.addEventListener("keydown", onKeyDown as EventListener);

    // Attach interaction listeners to the container so they only run
    // when the SecureStep section is active and to avoid global conflicts.
    container.addEventListener("wheel", onWheel as EventListener, {
      passive: false,
    });
    container.addEventListener("touchstart", onTouchStart as EventListener, {
      passive: false,
    });
    container.addEventListener("touchmove", onTouchMove as EventListener, {
      passive: false,
    });
    container.addEventListener("touchend", onTouchEnd as EventListener, {
      passive: false,
    });

    const onResize = () => updateCurrentIndex();
    window.addEventListener("resize", onResize);

    return () => {
      io.disconnect();
      if (unlockTimeoutRef.current) {
        window.clearTimeout(unlockTimeoutRef.current);
        unlockTimeoutRef.current = null;
      }
      container.removeEventListener("wheel", onWheel as EventListener);
      container.removeEventListener(
        "touchstart",
        onTouchStart as EventListener
      );
      container.removeEventListener("touchmove", onTouchMove as EventListener);
      container.removeEventListener("touchend", onTouchEnd as EventListener);
      container.removeEventListener("keydown", onKeyDown as EventListener);
      window.removeEventListener("resize", onResize);
    };
  }, [totalSteps]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
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
                y: coinYTransforms[index],
              }}
            >
              <Image
                src={image || "/placeholder.svg"}
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
                  className={cn(
                    `font-black text-[40px] md:text-[128px] uppercase whitespace-nowrap text-center ${textColor} absolute`,
                    textItem.textClassname
                  )}
                  style={{
                    opacity: textOpacities[index],
                    y: textYTransforms[index],
                  }}
                >
                  {textItem.text}
                </motion.div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
}
