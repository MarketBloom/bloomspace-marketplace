import { HomeFilterBar } from "@/components/HomeFilterBar";
import { MobileHeroImage } from "@/components/MobileHeroImage";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

export const MobileHero = () => {
  return (
    <section className="relative h-[calc(80vh-180px)] flex items-center justify-center bg-[#FFFFFF] md:hidden mt-0">
      <div className="absolute inset-0">
        <MobileHeroImage />
      </div>
      
      <div className="container relative z-10 px-4 pb-5">
        <div className="max-w-3xl mx-auto text-center mb-6 mt-5">
          <GooeyText
            texts={[
              "Your City's\nBest Florists",
              "All in One Place"
            ]}
            className="h-[96px]"
            textClassName="text-5xl font-semibold tracking-tight text-white whitespace-pre-line"
            morphTime={1}
            cooldownTime={3}
          />
        </div>
        <div className="w-full max-w-4xl px-2 -mt-5">
          <HomeFilterBar />
        </div>
      </div>
    </section>
  );
};