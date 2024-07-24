"use client";

import Projects from "@/components/main/Projects";
import Skills from "@/components/main/Skills";
import HeroContent from "@/components/sub/HeroContent";
import ProgressTrack from "@/components/sub/progress-track";
import useContentProgress from "@/utils/hooks/useContentProgress";

export default function Home() {
  const { contentSectionElements, step, stepProgress } = useContentProgress({
    contentSectionCount: 3,
  });
  const skillsProgress = step === 2 ? stepProgress : 0;
  const projectsProgress = step === 3 ? stepProgress : 0;

  return (
    <main className="relative grid grid-cols-[0px_1fr] md:grid-cols-[60px_1fr] h-full w-full max-w-[1210px] mx-auto">
      <ProgressTrack
        stepProgress={stepProgress}
        currentStep={step}
        stepCount={3}
      />
      <div className="flex flex-col gap-20">
        <HeroContent contentSectionElements={contentSectionElements} />
        <Skills
          stepProgress={skillsProgress}
          contentSectionElements={contentSectionElements}
        />
        <Projects
          stepProgress={projectsProgress}
          contentSectionElements={contentSectionElements}
        />
      </div>
    </main>
  );
}
