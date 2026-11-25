import { useEffect } from "react";

// React creates the sections after the browser's initial fragment lookup.
// Align once the initial layout is ready, without taking over later navigation.
export default function useInitialHash() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash === "#") return;
    if (performance.getEntriesByType("navigation")[0]?.type === "back_forward") return;

    let id;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }
    if (!document.getElementById(id)) return;

    let frame = 0;
    let cancelled = false;
    const interrupts = ["wheel", "touchstart", "pointerdown", "keydown", "hashchange", "popstate"];

    const cancel = () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      interrupts.forEach((event) => window.removeEventListener(event, cancel));
    };

    const scheduleAlignment = () => {
      if (cancelled) return;
      cancelAnimationFrame(frame);
      // Let the gallery's responsive layout and its measurements commit first.
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          if (cancelled || window.location.hash !== hash) return;
          document.getElementById(id)?.scrollIntoView({
            behavior: "instant",
            block: "start",
          });
        });
      });
    };

    interrupts.forEach((event) => window.addEventListener(event, cancel, { passive: true }));
    scheduleAlignment();
    // Fonts can shift sections after the first layout. Stop if the visitor
    // has already scrolled, touched, clicked, typed or navigated elsewhere.
    document.fonts?.ready.then(scheduleAlignment);

    return cancel;
  }, []);
}
