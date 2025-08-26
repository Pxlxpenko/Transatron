import { useEffect, useRef } from "react";

type Direction = "up" | "down";

export interface UseScrollSnapKeyFeaturesOptions {
  keyFeaturesRef: React.RefObject<HTMLDivElement>;
  watchRef?: React.RefObject<HTMLDivElement>;
  rootMargin?: string; // e.g. "80% 0px 80% 0px"
  downDelayMs?: number; // delay before switching to mandatory when scrolling down
}

export function useScrollSnapKeyFeatures(
  options: UseScrollSnapKeyFeaturesOptions
) {
  const {
    keyFeaturesRef,
    watchRef,
    rootMargin = "80% 0px 80% 0px",
    downDelayMs = 250,
  } = options;

  const reenableTimerRef = useRef<number | null>(null);
  const lastScrollYRef = useRef<number>(0);
  const scrollDirectionRef = useRef<Direction>("down");
  const isWatchInViewRef = useRef<boolean>(false);

  useEffect(() => {
    const setSnap = (value: string) => {
      document.body.style.setProperty("scroll-snap-type", value);
      document.documentElement.style.setProperty("scroll-snap-type", value);
    };

    // enable snap by default
    setSnap("y mandatory");

    const element = keyFeaturesRef.current;
    lastScrollYRef.current = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      scrollDirectionRef.current =
        currentY < lastScrollYRef.current ? "up" : "down";
      lastScrollYRef.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((e) => e.isIntersecting);
        if (reenableTimerRef.current) {
          window.clearTimeout(reenableTimerRef.current);
          reenableTimerRef.current = null;
        }
        if (isIntersecting) {
          setSnap("none");
        } else {
          if (isWatchInViewRef.current) {
            setSnap("y mandatory");
          } else if (scrollDirectionRef.current === "up") {
            setSnap("y mandatory");
          } else {
            setSnap("y proximity");
            reenableTimerRef.current = window.setTimeout(() => {
              setSnap("y mandatory");
            }, downDelayMs);
          }
        }
      },
      {
        threshold: 0,
        rootMargin,
      }
    );

    if (element) observer.observe(element);

    // Optional: Watch In Action gating
    const watchElement = watchRef?.current || null;
    const watchObserver = new IntersectionObserver(
      (entries) => {
        isWatchInViewRef.current = entries.some((e) => e.isIntersecting);
      },
      { threshold: 0 }
    );
    if (watchElement) watchObserver.observe(watchElement);

    return () => {
      if (reenableTimerRef.current) {
        window.clearTimeout(reenableTimerRef.current);
        reenableTimerRef.current = null;
      }
      window.removeEventListener("scroll", onScroll);
      if (element) observer.unobserve(element);
      observer.disconnect();
      if (watchElement) watchObserver.unobserve(watchElement);
      watchObserver.disconnect();
      // clear to default
      setSnap("");
    };
  }, [downDelayMs, keyFeaturesRef, rootMargin, watchRef]);
}
