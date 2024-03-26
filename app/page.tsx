import Projects from "@/components/main/Projects";
import Skills from "@/components/main/Skills";
import HeroContent from "@/components/sub/HeroContent";
import ProgressTrack from "@/components/sub/ProgressTrack";

export default function Home() {
  return (
    <main className="relative grid grid-cols-[8px_1fr] h-full w-full max-w-[1210px] mx-auto">
      <ProgressTrack />
      <div className="flex flex-col gap-20">
        <HeroContent />
        <Skills />
        <Projects />
      </div>
    </main>
  );
}
