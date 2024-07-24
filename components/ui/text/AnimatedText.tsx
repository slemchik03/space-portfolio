import clsx from "@/utils/clsx";
import { Variants, motion } from "framer-motion";
import { FC } from "react";

type AnimatedTextType = "scaling" | "opacity";

interface AnimatedTextProps {
  value: string;
  type: AnimatedTextType;
  calcDelay?: (letterIdx: number) => number;
  baseDelay?: number;
  className?: string;
}

const animatedTextVariants: Record<AnimatedTextType, Variants> = {
  scaling: {
    initial: {
      display: "inline-flex",
      scale: 0.2,
    },
    animate: {
      scale: [0.2, 1],
    },
  },
  opacity: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  },
} as const;

export default function AnimatedText({
  value,
  type,
  baseDelay = 0,
  calcDelay,
  className,
}: AnimatedTextProps) {
  const valueToRender = value.split(" ");
  const variants = animatedTextVariants[type];
  return (
    <motion.div
      className={clsx("inline-flex justify-center gap-4 flex-wrap", className)}
      transition={{ delayChildren: baseDelay }}
    >
      {valueToRender.map((word, idx) => {
        const letters = word.split("");
        return (
          <p key={idx}>
            {letters.map((letter, idx) => {
              const delay = calcDelay?.(idx) || (idx + 1) * 0.2;
              return (
                <motion.span
                  key={idx}
                  transition={{ ease: "easeInOut", delay, duration: 0.3 }}
                  initial="initial"
                  animate="animate"
                  variants={variants}
                >
                  {letter}
                </motion.span>
              );
            })}
          </p>
        );
      })}
    </motion.div>
  );
}
