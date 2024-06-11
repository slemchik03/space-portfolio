"use client";

import Projects from "@/components/main/Projects";
import Skills from "@/components/main/Skills";
import HeroContent from "@/components/sub/HeroContent";
import ProgressTrack from "@/components/sub/ProgressTrack";
import useContentProgress from "@/utils/hooks/useContentProgress";

export default function Home() {
  const { contentSectionRefs, step, stepProgress } = useContentProgress({
    contentSectionCount: 3,
  });
  const projectsProgress = step == 3 ? stepProgress : 0;
  return (
    <main className="relative grid grid-cols-[0px_1fr] md:grid-cols-[60px_1fr] h-full w-full max-w-[1210px] mx-auto">
      <ProgressTrack
        stepProgress={stepProgress}
        currentStep={step}
        stepCount={3}
      />
      <div className="flex flex-col gap-20">
        <HeroContent containerRef={contentSectionRefs.at(0)!} />
        <Skills containerRef={contentSectionRefs.at(1)!} />
        <Projects
          stepProgress={projectsProgress}
          containerRef={contentSectionRefs.at(2)!}
        />
      </div>
    </main>
  );
}
