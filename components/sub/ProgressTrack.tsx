"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect } from "react";
export function ProgressPin() {
  return (
    <div className="bg-white py-[8px] absolute left-[1px] z-20 lg:left-[-67px]">
      <div className="z-20 ml-[-3px] h-[12px] w-[12px] origin-center transform rounded-full border-[2px] transition-transform border-white bg-indigo-500 ring-[2px] ring-indigo-500"></div>
    </div>
  );
}
export default function ProgressTrack() {
  const { scrollYProgress, scrollY } = useScroll();

  useEffect(() => {
    scrollY.on("change", (v) => {
    });
  });

  return (
    <div className="h-[calc(100%-160px)] mt-[160px] relative">
      <motion.div
        initial={{ transformOrigin: "0% 0%" }}
        style={{ scaleY: scrollYProgress}}
        className="absolute h-full top-0 left-0 rounded-md w-[2px] pl-2 bg-purple-500"
      ></motion.div>
    </div>
  );
}
