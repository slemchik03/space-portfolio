"use client";

import useOpacityTextAnimation, {
  UseOpacityTextAnimationProps,
} from "@/utils/hooks/useOpacityTextAnimation";
import { motion } from "framer-motion";
import { ComponentProps, useMemo } from "react";

interface Props extends Omit<UseOpacityTextAnimationProps, "charCount"> {
  containerProps?: ComponentProps<typeof motion.div>;
  wordClassName?: string;
  text: string;
}

export default function TextWithOpacityAnimation({
  text,
  containerProps,
  wordClassName,
  ...props
}: Props) {
  const opacityList = useOpacityTextAnimation({
    ...props,
    charCount: text.length,
  });
  const words = useMemo(() => text.split(" "), [text]);
  let letterIdx = 0;

  return (
    <motion.div {...containerProps}>
      {words.map((word, idx) => {
        if (!word) return;
        const letters = word.split("");
        return (
          <div className={wordClassName} key={idx}>
            {letters.map((letter) => {
              return (
                <motion.div
                  key={letterIdx}
                  initial={{
                    opacity: props.initialOpacityValue,
                  }}
                  animate={{
                    opacity: opacityList[letterIdx],
                    scale: Math.max(opacityList[letterIdx++], 0.4),
                  }}
                  transition={{ ease: "easeInOut" }}
                >
                  {letter}
                </motion.div>
              );
            })}
          </div>
        );
      })}
    </motion.div>
  );
}
