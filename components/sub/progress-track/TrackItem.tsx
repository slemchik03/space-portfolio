import { navbarLinks } from "@/components/main/Header/Navbar";
import clsx from "@/utils/clsx";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

interface TrackItemProps {
  value: number;
  offset?: number;
  active?: boolean;
  progress: number;
  progressBar?: boolean;
  vertical?: boolean;
}
interface AnimatedTrackItemBgProps {
  active?: boolean;
  progress: number;
}

function ProgressBar({
  vertical,
  progress,
}: {
  vertical?: boolean;
  progress: number;
}) {
  const progressMotionValue = useMotionValue(progress);
  const magnitude = useTransform(progressMotionValue, [0, 100], ["0%", "100%"]);
  return (
    <div
      className={clsx(
        vertical ? "track-progress-bar" : "track-progress-bar-horizontal"
      )}
      style={{
        [vertical ? "height" : "width"]: magnitude.get(),
      }}
    ></div>
  );
}
function AnimatedTrackItemBg({ active, progress }: AnimatedTrackItemBgProps) {
  const progressMotionValue = useMotionValue(progress);
  const opacity = useTransform(progressMotionValue, [0, 100], [0, 1]);

  return (
    <motion.div
      style={{ opacity }}
      className={clsx(
        "track-item-bg",
        active &&
          "animate-[bg-pulse-slow_1s_linear_infinite,_spin-slow_10s_linear_infinite]"
      )}
    ></motion.div>
  );
}
export default function TrackItem({
  value,
  offset,
  active,
  progress,
  vertical,
  progressBar,
}: TrackItemProps) {
  const progressMotionValue = useMotionValue(progress);
  const scale = useTransform(progressMotionValue, [0, 100], [1, 1.2]);

  useEffect(() => {
    progressMotionValue.set(progress);
  }, [progress]);
  const isActive = progress >= 100;
  return (
    <Link className="relative" href={navbarLinks[value - 1]}>
      <motion.div
        style={{
          [vertical ? "marginTop" : "marginLeft"]: offset + "px",
          scale,
        }}
        className={clsx(
          "relative w-[60px] h-[55px] p-4 text-white font-bold md:text-xl text-center z-10 transition-all cursor-pointer",
          !active && "opacity-70"
        )}
        transition={{ ease: "easeInOut", duration: 0.29 }}
      >
        {value}
        <AnimatedTrackItemBg
          key={progress}
          progress={progress}
          active={isActive}
        />
      </motion.div>
      {progressBar && (
        <ProgressBar key={progress} vertical={vertical} progress={progress} />
      )}
    </Link>
  );
}
