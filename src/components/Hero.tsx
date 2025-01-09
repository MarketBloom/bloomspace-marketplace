import { HomeFilterBar } from "@/components/HomeFilterBar";
import { WordPullUp } from "@/components/ui/word-pull-up";

export const Hero = () => {
  return (
    <section className="relative h-[420px] hidden md:flex items-end justify-center bg-[#FFFFFF] pb-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
      
      <div className="container relative z-10 px-4 -mb-[205px]">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <WordPullUp 
            words="Fresh flowers, delivered with care"
            className="text-5xl font-semibold text-white tracking-tight leading-tight md:text-6xl"
          />
        </div>
        <div className="w-full max-w-4xl mx-auto">
          <HomeFilterBar />
        </div>
      </div>
    </section>
  );
};