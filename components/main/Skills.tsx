"use client";

import { Backend_skill, SkillItem, Skill_data } from "@/constants";
import SkillDataProvider from "../sub/SkillDataProvider";
import SkillText from "../sub/SkillText";
import { motion } from "framer-motion";
import { RefObject } from "react";
import calculateOpacityByProgress from "@/utils/calculateOpacityByProgress";
interface SkillsProps {
  contentSectionElements: RefObject<HTMLDivElement[]>;
  stepProgress: number;
}
interface SkillsListProps {
  skillsGroup: SkillItem[][];
  progress: number;
}
function SkillsList({ skillsGroup, progress }: SkillsListProps) {
  return skillsGroup.map((skills, idx) => {
    const skillsElements = skills.map((image, skillIdx) => {
      const scale = calculateOpacityByProgress({
        countOfElements: skills.length,
        currentElementIdx: skillIdx,
        progress,
      });
      return (
        <SkillDataProvider
          key={image.src}
          src={image.src}
          width={image.width}
          height={image.height}
          scale={scale}
          index={skillIdx}
        />
      );
    });
    return (
      <div
        key={idx}
        className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center"
      >
        {idx % 2 ? skillsElements : skillsElements.reverse()}
      </div>
    );
  });
}
const Skills = ({ contentSectionElements, stepProgress }: SkillsProps) => {
  const skillsGroup = [Skill_data, Backend_skill];
  return (
    <div
      ref={(el) =>
        (contentSectionElements.current![1] =
          contentSectionElements.current![1] || el)
      }
      className="min-h-[400vh]"
      id="skills"
    >
      <div className="sticky top-0 left-0">
        <motion.section
          id="skills"
          className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden pb-10 py-20"
          style={{ transform: "scale(0.9)" }}
        >
          <SkillText />
          <SkillsList skillsGroup={skillsGroup} progress={stepProgress} />
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
