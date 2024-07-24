"use client";

import clsx from "@/utils/clsx";
import { Variants, motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { useNavbarStatus } from "@/utils/store/useNavbarStatus";
import TrackItem from "./TrackItem";

interface ProgressTrackProps {
  currentStep: number;
  stepCount: number;
  stepProgress: number;
}

function getProgressTrackVariants({ isTablet }: { isTablet: boolean }) {
  const openedTranslateY = `${isTablet ? 65 : 100}px`;
  const variants: Variants = {
    navbarClosed: {
      translateY: [openedTranslateY, "0px"],
    },
    navbarOpened: {
      translateY: ["0px", openedTranslateY],
    },
  };
  return variants;
}
export default function ProgressTrack({
  currentStep,
  stepCount,
  stepProgress,
}: ProgressTrackProps) {
  const { isOpen: isNavbarOpen } = useNavbarStatus();
  const isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const variants = getProgressTrackVariants({ isTablet });

  return (
    <div className="min-h-[min-content]">
      <motion.div
        variants={variants}
        animate={isNavbarOpen ? "navbarOpened" : "navbarClosed"}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className={clsx(
          "sticky max-h-[100px] md:max-h-full min-w-[100vw] translate-y-[65px] md:translate-y-[100px] z-[50]",
          "left-0 top-0 flex justify-center backdrop-blur-md md:block md:min-w-[min-content]"
        )}
      >
        <div className="grid relative grid-flow-col min-w-[min-content] md:grid-flow-row gap-5 md:gap-4 border border-[#7042f88b] p-1 rounded-full transition-all">
          {Array(stepCount)
            .fill(0)
            .map((_, idx) => {
              const isPassed = idx < currentStep;
              const isCurrent = idx === currentStep;
              return (
                <TrackItem
                  key={idx}
                  value={idx + 1}
                  offset={isCurrent ? 100 : 0}
                  vertical={!isTablet}
                  active={isPassed}
                  progressBar={idx !== 0}
                  progress={isCurrent ? stepProgress : isPassed ? 100 : 0}
                />
              );
            })}
        </div>
      </motion.div>
    </div>
  );
}
