import { useScroll } from "framer-motion";
import { RefObject, useEffect, useMemo, useState } from "react";

export interface UseOpacityTextAnimationProps {
  containerRef: RefObject<HTMLElement>;
  charCount: number;
  initialOpacityValue: number;
}

export default function useOpacityTextAnimation({
  containerRef,
  charCount,
  initialOpacityValue,
}: UseOpacityTextAnimationProps): number[] {
  const { scrollY } = useScroll();
  const initialOpacityValues = useMemo(
    () => Array(charCount).fill(initialOpacityValue),
    [charCount, initialOpacityValue]
  );

  const [charOpacityValues, setCharOpacityValues] =
    useState<number[]>(initialOpacityValues);

  useEffect(() => {
    function scrollHandler(absoluteY: number) {
      const containerRect = containerRef.current?.getBoundingClientRect();

      if (!containerRect) return;

      const trackHeight = containerRect.height;
      const heightPerChar = Math.floor(trackHeight / charCount);
      // Normalized scroll y
      const y = Math.min(
        Math.max(absoluteY - containerRect.top, 0),
        trackHeight
      );
      const visibleCharsCount = Math.floor(absoluteY / heightPerChar);
      const lastCharOpacity = Math.max(
        (y % heightPerChar) / (heightPerChar / 100) / 100,
        initialOpacityValue
      );
      setCharOpacityValues((oldValues) =>
        oldValues.map((_, idx) => {
          if (idx < visibleCharsCount) {
            return 1;
          } else if (idx === visibleCharsCount) {
            return lastCharOpacity;
          }
          return initialOpacityValue;
        })
      );
    }
    scrollY.on("change", scrollHandler);
    return () => {
      scrollY.clearListeners();
    };
  }, [charCount, containerRef, initialOpacityValue, scrollY]);

  return charOpacityValues;
}
