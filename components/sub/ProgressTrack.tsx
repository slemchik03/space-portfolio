"use client";

import clsx from "@/utils/clsx";
import { Variants, motion } from "framer-motion";
import Link from "next/link";
import { navbarLinks } from "../main/Header/Navbar";
import { useMediaQuery } from "react-responsive";
import { useNavbarStatus } from "@/utils/store/useNavbarStatus";

interface ProgressTrackProps {
  currentStep: number;
  stepCount: number;
  stepProgress: number;
}

interface TrackItemProps {
  value: number;
  offsetTop?: number;
  offsetLeft?: number;
  active?: boolean;
  progress: number;
  progressBar?: boolean;
  vertical?: boolean;
}
function TrackItem({
  value,
  offsetTop,
  offsetLeft,
  active,
  progress,
  vertical,
  progressBar,
}: TrackItemProps) {
  return (
    <Link className="relative" href={navbarLinks[value - 1]}>
      <motion.div
        style={{
          marginTop: (offsetTop || 0) + "px",
          marginLeft: (offsetLeft || 0) + "px",
        }}
        className={clsx(
          "relative p-4 text-white font-bold md:text-xl text-center z-10 transition-all cursor-pointer",
          !active && "opacity-70"
        )}
        transition={{ ease: "easeInOut", duration: 0.29 }}
      >
        {value}
        <div
          style={{ opacity: progress / 100 }}
          className="track-item-bg"
        ></div>
      </motion.div>
      {progressBar && (
        <div
          className={clsx(
            vertical ? "track-progress-bar" : "track-progress-bar-horizontal"
          )}
          style={{
            [vertical ? "height" : "width"]: progress + "%",
          }}
        ></div>
      )}
    </Link>
  );
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
          "sticky min-w-[100vw] translate-y-[65px] md:translate-y-[100px] z-[50]",
          "left-0 top-0 flex justify-center backdrop-blur-md md:block md:min-w-[min-content]"
        )}
      >
        <div className="grid grid-flow-col min-w-[min-content] md:grid-flow-row gap-5 md:gap-4 border border-[#7042f88b] p-1 rounded-full transition-all">
          {Array(stepCount)
            .fill(0)
            .map((_, idx) => {
              const isPassed = idx < currentStep;
              const isCurrent = idx === currentStep;
              return (
                <TrackItem
                  key={idx}
                  value={idx + 1}
                  offsetLeft={isCurrent && isTablet ? 100 : undefined}
                  offsetTop={isCurrent && !isTablet ? 100 : undefined}
                  vertical={!isTablet}
                  active={isPassed}
                  progressBar={idx !== 0}
                  progress={
                    idx === currentStep ? stepProgress : isPassed ? 100 : 0
                  }
                />
              );
            })}
        </div>
      </motion.div>
    </div>
  );
}
