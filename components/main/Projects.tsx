import React, { ComponentProps, RefObject } from "react";
import ProjectCard from "../sub/ProjectCard";
import calculateOpacityByProgress from "@/utils/calculateOpacityByProgress";

interface Props {
  contentSectionElements: RefObject<HTMLDivElement[]>;
  stepProgress: number;
}
const projects: ComponentProps<typeof ProjectCard>[] = [
  {
    src: "/NextWebsite.png",
    title: "Modern Next.js Portfolio",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    src: "/CardImage.png",
    title: "Interactive Website Cards",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    src: "/SpaceWebsite.png",
    title: "Space Themed Website",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];
const Projects = ({ contentSectionElements, stepProgress }: Props) => {
  return (
    <div
      ref={(el) =>
        (contentSectionElements.current![2] =
          contentSectionElements.current![2] || el)
      }
      className="min-h-[400vh]"
      id="projects"
    >
      <div className="sticky top-0 flex flex-col items-center justify-center py-20">
        <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20">
          My Projects
        </h1>
        <div className="h-full w-full flex flex-col md:flex-row gap-10 px-10">
          {projects.map((props, idx) => {
            const opacity = calculateOpacityByProgress({
              countOfElements: projects.length,
              progress: stepProgress,
              currentElementIdx: idx,
            });
            return <ProjectCard {...props} opacity={opacity} key={idx} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
