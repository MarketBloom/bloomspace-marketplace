import { HomeFilterBar } from "@/components/HomeFilterBar";
import { MobileHeroImage } from "@/components/MobileHeroImage";
import { WordPullUp } from "@/components/ui/word-pull-up";

export const MobileHero = () => {
  return (
    <section className="relative h-[420px] flex items-end justify-center bg-[#FFFFFF] md:hidden pb-6">
      <MobileHeroImage />
      
      <div className="container relative z-10 px-4 -mb-[205px]">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <WordPullUp 
            words="Fresh flowers, delivered with care"
            className="text-4xl font-semibold text-white tracking-tight leading-tight"
          />
        </div>
        <div className="w-full max-w-4xl px-2 -mt-[9px]">
          <HomeFilterBar />
        </div>
      </div>
    </section>
  );
};