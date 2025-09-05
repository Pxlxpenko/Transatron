"use client";

import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import defaultAnimationData from "@/assets/transatron1.json";

type SecureStepProps = {
  animationData?: object;
  startFrame?: number;
  endFrame?: number;
  keyStep?: number;
  frames?: readonly number[] | number[];
};

export default function SecureStep({
  animationData = defaultAnimationData as unknown as object,
  startFrame,
  endFrame,
  keyStep,
  frames: frames,
}: SecureStepProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const isActiveRef = useRef<boolean>(false);
  const touchStartYRef = useRef<number | null>(null);
  const progressRef = useRef<number>(0); // 0..1
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const instance = lottieRef.current;
    const effectiveFrames = frames && frames.length > 0 ? frames : frames;
    const start = startFrame ?? effectiveFrames[0];
    const end = endFrame ?? effectiveFrames[effectiveFrames.length - 1];
    const frameSpan = end - start;

    const renderAtProgress = (p: number) => {
      const clamped = Math.max(0, Math.min(1, p));
      progressRef.current = clamped;
      const frameFloat = start + clamped * frameSpan;
      const frame = Math.round(frameFloat);
      instance?.goToAndStop(frame, true);
    };

    renderAtProgress(0);

    const scheduleRender = (p: number) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => renderAtProgress(p));
    };

    // Sensitivities (slower progression)
    const SCROLL_SENS = 1 / 3000; // pixels -> progress
    const KEY_STEP = keyStep ?? 0.12; // progress per key press
    const TOUCH_SENS = 1 / 3000; // pixels -> progress

    // Boundary leave threshold to avoid sticky edge cases
    const EPS = 0.02; // 2%

    const canLeave = (direction: 1 | -1) => {
      const p = progressRef.current;
      if (direction === 1) return p >= 1 - EPS;
      return p <= EPS;
    };

    const snapBoundaryIfLeaving = (direction: 1 | -1) => {
      if (direction === 1) {
        renderAtProgress(1);
      } else {
        renderAtProgress(0);
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (!isActiveRef.current) return;
      const direction: 1 | -1 = e.deltaY > 0 ? 1 : -1;
      if (canLeave(direction)) {
        snapBoundaryIfLeaving(direction);
        return; // let native scroll move to adjacent section
      }
      e.preventDefault();
      if (e.deltaY === 0) return;
      const delta = e.deltaY * SCROLL_SENS; // positive when scrolling down
      const next = progressRef.current + delta;
      scheduleRender(next);
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
      if (Math.abs(dy) < 8) return;
      const direction: 1 | -1 = dy > 0 ? 1 : -1;
      if (canLeave(direction)) {
        snapBoundaryIfLeaving(direction);
        return; // allow native scroll to leave
      }
      e.preventDefault();
      const delta = dy * TOUCH_SENS; // drag up => positive => progress forward
      const next = progressRef.current + delta;
      scheduleRender(next);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isActiveRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          try {
            container.focus({ preventScroll: true } as unknown as FocusOptions);
          } catch {
            container.focus();
          }
          // Snap exactly to 0/1 if we re-enter near a boundary to avoid residual frames
          const p = progressRef.current;
          if (p <= EPS) renderAtProgress(0);
          if (p >= 1 - EPS) renderAtProgress(1);
        }
      },
      { threshold: [0.01, 0.5] }
    );
    io.observe(container);

    container.addEventListener(
      "wheel",
      onWheel as EventListener,
      { passive: false } as AddEventListenerOptions
    );

    const onKeyDownAny = (e: KeyboardEvent) => {
      if (!isActiveRef.current) return;
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        if (canLeave(1)) {
          snapBoundaryIfLeaving(1);
          return; // let page scroll
        }
        e.preventDefault();
        scheduleRender(progressRef.current + KEY_STEP);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        if (canLeave(-1)) {
          snapBoundaryIfLeaving(-1);
          return; // let page scroll
        }
        e.preventDefault();
        scheduleRender(progressRef.current - KEY_STEP);
      }
    };

    container.addEventListener(
      "keydown",
      onKeyDownAny as EventListener,
      { passive: false } as AddEventListenerOptions
    );

    container.addEventListener(
      "touchstart",
      onTouchStart as EventListener,
      { passive: false } as AddEventListenerOptions
    );
    container.addEventListener(
      "touchmove",
      onTouchMove as EventListener,
      { passive: false } as AddEventListenerOptions
    );

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      io.disconnect();
      container.removeEventListener("wheel", onWheel as EventListener);
      container.removeEventListener("keydown", onKeyDownAny as EventListener);
      container.removeEventListener(
        "touchstart",
        onTouchStart as EventListener
      );
      container.removeEventListener("touchmove", onTouchMove as EventListener);
    };
  }, [startFrame, endFrame, keyStep, frames]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="relative w-full"
      style={{ height: "100vh" }}
    >
      <div className="top-0 sticky">
        <div className="relative flex justify-center items-center bg-white mx-auto w-full h-screen overflow-hidden">
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            autoplay={false}
            loop={false}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
