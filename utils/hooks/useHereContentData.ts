import { useEffect, useRef, useState } from "react";

export default function useHeroContentData() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    function scrollHandler(e: Event) {
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      const y = window.scrollY - containerRect.top;

      if (y > 100) {
        return setIsActive(true);
      }
      setIsActive(false);
    }
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [containerRef]);
  return {
    isActive,
    containerRef,
  };
}
