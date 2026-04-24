"use client";

import { useEffect, useState, type RefObject } from "react";
import { useMotionValue, useSpring } from "framer-motion";

const DESKTOP_PANEL_QUERY = "(min-width: 64rem)";

export function useResponsiveScrollProgress(
  scrollRef: RefObject<HTMLElement | null>,
) {
  const scrollYProgress = useMotionValue(0);
  const [usesPanelScroll, setUsesPanelScroll] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_PANEL_QUERY);
    let frame: number | null = null;

    const getProgress = () => {
      if (mediaQuery.matches) {
        const container = scrollRef.current;
        const scrollableHeight = container
          ? container.scrollHeight - container.clientHeight
          : 0;

        return scrollableHeight <= 0 || !container
          ? 0
          : container.scrollTop / scrollableHeight;
      }

      const documentElement = document.documentElement;
      const scrollableHeight = documentElement.scrollHeight - window.innerHeight;
      const scrollTop =
        window.scrollY ||
        documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      return scrollableHeight <= 0 ? 0 : scrollTop / scrollableHeight;
    };

    const updateProgress = () => {
      frame = null;
      scrollYProgress.set(getProgress());
    };

    const scheduleUpdate = () => {
      if (frame !== null) {
        return;
      }

      frame = window.requestAnimationFrame(updateProgress);
    };

    const syncScrollMode = () => {
      setUsesPanelScroll(mediaQuery.matches);
      scheduleUpdate();
    };

    const container = scrollRef.current;

    syncScrollMode();
    container?.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    mediaQuery.addEventListener("change", syncScrollMode);

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }

      container?.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      mediaQuery.removeEventListener("change", syncScrollMode);
    };
  }, [scrollRef, scrollYProgress]);

  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.35,
  });

  return { progress, usesPanelScroll };
}
