import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export interface UseOpacityTextAnimationProps {
  containerEl: HTMLElement | null;
  charCount: number;
  initialOpacityValue: number;
}

export default function useOpacityTextAnimation({
  containerEl,
  charCount,
  initialOpacityValue,
}: UseOpacityTextAnimationProps): number[] {
  const { scrollY } = useScroll();
  const initialOpacityValues = Array(charCount).fill(initialOpacityValue);

  const [charOpacityValues, setCharOpacityValues] =
    useState<number[]>(initialOpacityValues);

  useMotionValueEvent(scrollY, "change", (absoluteY: number) => {
    const containerRect = containerEl?.getBoundingClientRect();

    if (!containerRect) return;

    const trackHeight = containerRect.height;
    const heightPerChar = Math.floor(trackHeight / charCount);
    const visibleCharsCount = Math.floor(absoluteY / heightPerChar);
    const lastCharOpacity = Math.max(
      (absoluteY % heightPerChar) / (heightPerChar / 100) / 100,
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
  });

  return charOpacityValues;
}
