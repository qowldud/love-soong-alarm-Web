import { useLayoutEffect } from "react";

export function useLockAppHeight() {
  useLayoutEffect(() => {
    const set = () => {
      const h = window.visualViewport?.height ?? window.innerHeight;
      document.documentElement.style.setProperty("--app-height", `${h}px`);
    };

    set();
    window.addEventListener("resize", set);
    window.addEventListener("orientationchange", set);
    window.visualViewport?.addEventListener("resize", set);

    return () => {
      window.removeEventListener("resize", set);
      window.removeEventListener("orientationchange", set);
      window.visualViewport?.removeEventListener("resize", set);
    };
  }, []);
}
