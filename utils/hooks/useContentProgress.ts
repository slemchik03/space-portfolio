import { useScroll } from "framer-motion";
import { RefObject, createRef, useEffect, useState } from "react";

export default function useContentProgress({
  contentSectionCount,
}: {
  contentSectionCount: number;
}) {
  const initialRefs = Array(contentSectionCount).fill(createRef());
  const [contentSectionRefs, setContentSectionRefs] =
    useState<RefObject<HTMLDivElement>[]>(initialRefs);
  const [step, setStep] = useState(1);
  const [stepProgress, setStepProgress] = useState(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    function scrollHandler(y: number) {
      const refs = contentSectionRefs;
      let activeIdx = 0;
      let activeRect: DOMRect = new DOMRect();

      refs.forEach((ref, idx) => {
        const rect = ref.current?.getBoundingClientRect();
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
  }, [contentSectionRefs, scrollY, step]);

  useEffect(() => {
    // Creating new refs
    setContentSectionRefs(
      Array(contentSectionCount)
        .fill(0)
        .map(() => {
          return createRef<HTMLDivElement>();
        })
    );
  }, [contentSectionCount]);

  return {
    contentSectionRefs,
    stepProgress,
    step,
  };
}
