import { useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

        const updatePreference = () => {
            setPrefersReducedMotion(mediaQuery.matches);
        };

        updatePreference();
        mediaQuery.addEventListener("change", updatePreference);

        return () => {
            mediaQuery.removeEventListener("change", updatePreference);
        };
    }, []);

    return prefersReducedMotion;
}

export function useInViewOnce(threshold = 0.25, rootMargin = "0px 0px -10% 0px") {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        if (isInView) {
            return;
        }

        const element = ref.current;
        if (!element) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [isInView, rootMargin, threshold]);

    return [ref, isInView] as const;
}
