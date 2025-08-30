import { type ClassValue, clsx } from "clsx";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const useScrollToHash = () => {
  const router = useRouter();

  useEffect(() => {
    const scrollToHash = (url?: string) => {
      const target = url ?? router.asPath;
      const hashIndex = target.indexOf("#");
      if (hashIndex !== -1) {
        const hash = target.substring(hashIndex + 1);
        // Delay to ensure content is rendered
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 50);
      }
    };

    const handleRouteChangeComplete = (url: string) => scrollToHash(url);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    // Handle initial load with hash
    scrollToHash();
    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);
};

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export const openCalendlyPopup = (url: string) => {
  if (typeof window === "undefined") return;
  // Calendly script attaches a global object
  const calendly = (
    window as unknown as {
      Calendly?: { initPopupWidget?: (opts: { url: string }) => void };
    }
  ).Calendly;
  if (calendly && typeof calendly.initPopupWidget === "function") {
    calendly.initPopupWidget({ url });
  } else {
    // Fallback: open in a new tab if widget not yet loaded
    window.open(url, "_blank", "noopener,noreferrer");
  }
};
