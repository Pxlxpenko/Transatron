import { useEffect, useRef } from "react";
import SecureSectionBusinessSuite from "@/components/SecureSectionBusinessSuite";
import HeroSectionBusinessSuite from "@/components/HeroSectionBusinessSuite";
import WatchInActionSectionBusinessSuite from "@/components/WatchInActionSectionBusinessSuite";
import KeyFeaturesSectionBusinessSuite from "@/components/KeyFeaturesSectionBusinessSuite";
import FadeInSection from "@/components/FadeInSection";

export default function BusinessSuitePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const secureRef = useRef<HTMLDivElement>(null);
  const additionalRef = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("[v0] Setting up snap scroll system");

    // Start with snap enabled
    document.documentElement.classList.add("snap-enabled");

    // Track scroll direction
    let lastScrollY = window.scrollY;
    let scrollDirection: "up" | "down" = "down";
    let snapDisabledByScrollDown = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollDirection = currentScrollY > lastScrollY ? "down" : "up";
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          console.log(
            "[v0] Section observed:",
            target.id,
            "intersecting:",
            entry.isIntersecting,
            "direction:",
            scrollDirection
          );

          if (entry.isIntersecting) {
            if (target.id === "section-4") {
              // When section-4 comes into view, disable snap and mark it
              console.log("[v0] Disabling snap scroll - reached section 4");
              document.documentElement.classList.remove("snap-enabled");
              document.documentElement.classList.add("snap-disabled");
              snapDisabledByScrollDown = true;
            } else if (
              target.id === "additional-content" &&
              scrollDirection === "up" &&
              snapDisabledByScrollDown
            ) {
              // Only re-enable snap when scrolling up to additional-content with 10% threshold
              if (entry.intersectionRatio > 0.1) {
                console.log(
                  "[v0] Re-enabling snap scroll - scrolling up to additional content"
                );
                document.documentElement.classList.add("snap-enabled");
                document.documentElement.classList.remove("snap-disabled");
                snapDisabledByScrollDown = false;
              }
            } else if (
              (target.id === "hero" ||
                target.id === "secure-section" ||
                target.id === "additional-content") &&
              !snapDisabledByScrollDown
            ) {
              // Enable snap for the first 3 sections only if not disabled by scrolling down
              if (entry.intersectionRatio > 0.7) {
                console.log("[v0] Enabling snap scroll");
                document.documentElement.classList.add("snap-enabled");
                document.documentElement.classList.remove("snap-disabled");
              }
            }
          }
        });
      },
      {
        threshold: [0.01, 0.7], // Multiple thresholds for different behaviors
        rootMargin: "0px",
      }
    );

    // Observe all sections
    const sections = [
      heroRef.current,
      secureRef.current,
      additionalRef.current,
      section4Ref.current,
    ];
    sections.forEach((section) => {
      if (section) {
        observer.observe(section);
        console.log("[v0] Observing section:", section.id);
      }
    });

    return () => {
      console.log("[v0] Cleaning up snap scroll");
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      document.documentElement.classList.remove(
        "snap-enabled",
        "snap-disabled"
      );
    };
  }, []);

  return (
    <div className="relative w-full">
      <div
        ref={heroRef}
        id="hero"
        className="flex justify-center items-center bg-snap-section"
      >
        <FadeInSection className="flex justify-center items-center">
          <HeroSectionBusinessSuite />
        </FadeInSection>
      </div>

      <div
        ref={secureRef}
        id="secure-section"
        className="bg-white snap-section"
      >
        <FadeInSection className="flex justify-center items-center w-full">
          <SecureSectionBusinessSuite />
        </FadeInSection>
      </div>

      <div
        ref={additionalRef}
        id="additional-content"
        className="flex justify-center items-center w-full bg-accent-dark snap-section"
      >
        <FadeInSection className="flex justify-center items-center">
          <WatchInActionSectionBusinessSuite />
        </FadeInSection>
      </div>

      <div
        ref={section4Ref}
        id="section-4"
        className="flex justify-center items-center"
      >
        <FadeInSection className="flex justify-center items-center">
          <KeyFeaturesSectionBusinessSuite />
        </FadeInSection>
      </div>
    </div>
  );
}
