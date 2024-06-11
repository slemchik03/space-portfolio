"use client";

import useOpacityTextAnimation, {
  UseOpacityTextAnimationProps,
} from "@/utils/hooks/useOpacityTextAnimation";
import { motion } from "framer-motion";
import { ComponentProps, Fragment, useMemo, useRef } from "react";

interface Props
  extends Omit<UseOpacityTextAnimationProps, "charCount" | "targetRef"> {
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
  const targetRef = useRef<HTMLDivElement | null>(null);
  const opacityList = useOpacityTextAnimation({
    ...props,
    targetRef,
    charCount: text.length,
  });
  const words = useMemo(() => text.split(" "), [text]);
  let letterIdx = 0;
  return (
    <motion.div ref={targetRef} {...containerProps}>
      {words.map((word, idx) => {
        if (!word) return <Fragment key={idx}></Fragment>;
        return (
          <div className={wordClassName} key={idx}>
            {word.split("").map((letter) => {
              return (
                <motion.div
                  key={letterIdx}
                  initial={{
                    opacity: props.initialOpacityValue,
                  }}
                  animate={{ opacity: opacityList[letterIdx++] }}
                  transition={{ease: "linear"}}
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
