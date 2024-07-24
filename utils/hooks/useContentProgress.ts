import { useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function useContentProgress({
  contentSectionCount,
}: {
  contentSectionCount: number;
}) {
  const contentSectionElements = useRef<HTMLDivElement[]>([]);
  const [step, setStep] = useState(1);
  const [stepProgress, setStepProgress] = useState(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    function scrollHandler(y: number) {
      const elements = contentSectionElements;
      let activeIdx = 0;
      let activeRect: DOMRect = new DOMRect();

      elements.current.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        if (!rect) return;
        if (rect.top <= 0) {
          activeIdx = idx;
          activeRect = rect;
        }
      });
      // y coordinate relative to document
      let containerTop = y + activeRect.top;

      // Using to make last section handle progress properly
      // TODO: add some content after last section
      if (step === contentSectionCount) {
        containerTop -= window.innerHeight;
      }

      const progress = (y - containerTop) / (activeRect.height / 100);

      setStepProgress(Math.min(progress, 100));
      setStep(activeIdx + 1);
    }
    scrollY.on("change", scrollHandler);

    return () => scrollY.clearListeners();
  }, [contentSectionElements, scrollY, step]);

  return {
    contentSectionElements,
    stepProgress,
    step,
  };
}
