import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function usePageAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.from(ref.current.children, {
        opacity: 0,
        y: 16,
        duration: 0.4,
        stagger: 0.06,
        ease: "power2.out",
      });
    },
    { scope: ref }
  );

  return ref;
}
