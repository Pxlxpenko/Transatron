import { useEffect, useRef } from "react";

type Direction = "up" | "down";

export interface UseScrollSnapKeyFeaturesOptions {
  keyFeaturesRef: React.RefObject<HTMLDivElement>;
  watchRef?: React.RefObject<HTMLDivElement>;
  rootMargin?: string; // e.g. "80% 0px 80% 0px"
  downDelayMs?: number; // delay before switching to mandatory when scrolling down
  freeScrollRefs?: Array<React.RefObject<HTMLElement | null>>; // disable snap while any are in view
  secureRefs?: Array<React.RefObject<HTMLElement | null>>; // enforce strong snap while in view
}

export function useScrollSnapKeyFeatures(
  options: UseScrollSnapKeyFeaturesOptions
) {
  const {
    keyFeaturesRef,
    watchRef,
    rootMargin = "80% 0px 80% 0px",
    downDelayMs = 250,
    freeScrollRefs = [],
    secureRefs = [],
  } = options;

  const reenableTimerRef = useRef<number | null>(null);
  const lastScrollYRef = useRef<number>(0);
  const scrollDirectionRef = useRef<Direction>("down");
  const isWatchInViewRef = useRef<boolean>(false);
  const isFreeInViewRef = useRef<boolean>(false);
  const isSecureInViewRef = useRef<boolean>(false);

  const applySnap = (value: string) => {
    document.body.style.setProperty("scroll-snap-type", value);
    document.documentElement.style.setProperty("scroll-snap-type", value);
  };

  useEffect(() => {
    const updateSnapMode = () => {
      if (isFreeInViewRef.current) {
        applySnap("none");
        return;
      }
      if (isSecureInViewRef.current) {
        // Secure steps: enforce strict snapping between steps
        applySnap("y mandatory");
        return;
      }
      // Default and Watch section: proximity (easy pass-through)
      applySnap("y proximity");
    };

    // enable snap by default
    applySnap("y mandatory");

    const element = keyFeaturesRef.current;
    lastScrollYRef.current = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      scrollDirectionRef.current =
        currentY < lastScrollYRef.current ? "up" : "down";
      lastScrollYRef.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Observe key features only to influence after it becomes visible (no longer disables snap directly)
    const keyObserver = new IntersectionObserver(
      () => {
        // When key features comes into view, we simply recompute per watch/free state
        updateSnapMode();
      },
      { threshold: 0, rootMargin }
    );
    if (element) keyObserver.observe(element);

    // Observe sections that should free-scroll (disable snap while in view)
    const freeObserver = new IntersectionObserver(
      (entries) => {
        const anyInView = entries.some((e) => e.isIntersecting);
        isFreeInViewRef.current = anyInView;
        updateSnapMode();
      },
      { threshold: 0 }
    );
    freeScrollRefs.forEach((ref) => {
      const node = ref.current;
      if (node) freeObserver.observe(node);
    });

    // Observe secure sections to enforce mandatory snapping while in view
    const secureObserver = new IntersectionObserver(
      (entries) => {
        const anyInView = entries.some((e) => e.isIntersecting);
        isSecureInViewRef.current = anyInView;
        updateSnapMode();
      },
      { threshold: 0 }
    );
    secureRefs.forEach((ref) => {
      const node = ref.current;
      if (node) secureObserver.observe(node);
    });

    // Watch In Action: when in view, we prefer proximity (handled by default branch)
    const watchElement = watchRef?.current || null;
    const watchObserver = new IntersectionObserver(
      (entries) => {
        isWatchInViewRef.current = entries.some((e) => e.isIntersecting);
        updateSnapMode();
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
      if (element) keyObserver.unobserve(element);
      keyObserver.disconnect();
      freeScrollRefs.forEach((ref) => {
        const node = ref.current;
        if (node) freeObserver.unobserve(node);
      });
      freeObserver.disconnect();
      secureRefs.forEach((ref) => {
        const node = ref.current;
        if (node) secureObserver.unobserve(node);
      });
      secureObserver.disconnect();
      if (watchElement) watchObserver.unobserve(watchElement);
      watchObserver.disconnect();
      // clear to default
      applySnap("");
    };
  }, [
    downDelayMs,
    freeScrollRefs,
    keyFeaturesRef,
    rootMargin,
    watchRef,
    secureRefs,
  ]);
}
