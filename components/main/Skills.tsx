"use client";

import { Backend_skill, Skill_data } from "@/constants";
import SkillDataProvider from "../sub/SkillDataProvider";
import SkillText from "../sub/SkillText";
import { motion } from "framer-motion";
import { RefObject } from "react";
interface Props {
  containerRef: RefObject<HTMLDivElement>;
}
const Skills = ({ containerRef }: Props) => {
  return (
    <div ref={containerRef} className="min-h-[400vh]" id="skills">
      <div className="sticky top-0 left-0">
        <motion.section
          id="skills"
          className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden pb-10 py-20"
          style={{ transform: "scale(0.9)" }}
        >
          <SkillText />
          <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
            {Skill_data.map((image, index) => (
              <SkillDataProvider
                key={index}
                src={image.Image}
                width={image.width}
                height={image.height}
                index={index}
              />
            ))}
          </div>
          <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
            {Backend_skill.map((image, index) => (
              <SkillDataProvider
                key={index}
                src={image.Image}
                width={image.width}
                height={image.height}
                index={index}
              />
            ))}
          </div>
          <div className="w-full h-full absolute">
            <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
              <video
                className="w-full h-auto"
                preload="false"
                playsInline
                loop
                muted
                autoPlay
                src="/cards-video.webm"
              />
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Skills;
