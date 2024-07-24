"use client";

import { motion } from "framer-motion";
import { slideInFromLeft, slideInFromTop } from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import TextWithOpacityAnimation from "./TextWithOpacityAnimation";
import { MyDescription } from "@/constants";
import clsx from "@/utils/clsx";
import { RefObject } from "react";
import useNavbar from "@/utils/hooks/useNavbar";
import AnimatedText from "../ui/text/AnimatedText";

interface Props {
  contentSectionElements: RefObject<HTMLDivElement[]>;
}

const HeroContent = ({ contentSectionElements }: Props) => {
  const { isOpen: isNavbarOpen } = useNavbar();
  return (
    <div
      className={clsx(
        "min-h-[400vh] relative flex flex-col items-center h-full w-full"
      )}
      id="about-me"
      ref={(el) =>
        (contentSectionElements.current![0] =
          contentSectionElements.current![0] || el)
      }
    >
      <motion.div
        animate={{ top: !isNavbarOpen ? "50px" : "0px" }}
        transition={{ ease: "linear", duration: 0.1 }}
        className="sticky top-0 left-0 min-h-[600px] px-5 md:px-10 xl:px-20 mt-40 z-20 transition-all"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-row items-center justify-center w-full"
        >
          <div className="h-full flex flex-col mt-5 md:mt-0 gap-5 justify-center items-center text-center">
            <motion.div
              variants={slideInFromTop}
              className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
            >
              <SparklesIcon className="text-[#b49bff] mr-[10px] h-5 w-5" />
              <h1 className="Welcome-text text-[13px]">
                Fullstack Developer Portfolio
              </h1>
            </motion.div>

            <motion.div
              // variants={slideInFromLeft(0.5)}
              className="flex flex-col gap-6 mt-6 md:text-6xl text-4xl xl:text-7xl font-bold text-white max-w-[650px] h-auto"
            >
              <span>
                <AnimatedText
                  type="opacity"
                  value="Providing"
                  calcDelay={(idx) => ((idx + 1) / 2) * 0.1}
                />{" "}
                <span className="hero-content-gradient-bg inline-block">
                  the best
                </span>
                <AnimatedText
                  type="opacity"
                  value="project exprience"
                  calcDelay={(idx) => ((idx + 1) / 2) * 0.1}
                />
              </span>
            </motion.div>

            <TextWithOpacityAnimation
              text={MyDescription}
              containerProps={{
                variants: slideInFromLeft(0.8),
                className:
                  "text-center text-gray-400 my-5 max-w-[600px] inline-flex justify-center flex-wrap gap-1",
              }}
              wordClassName="inline-flex text-xl md:text-2xl"
              containerEl={contentSectionElements.current?.[0] || null}
              initialOpacityValue={0}
            />
            <motion.a
              variants={slideInFromLeft(1)}
              className="p-2 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
            >
              Learn More!
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroContent;
