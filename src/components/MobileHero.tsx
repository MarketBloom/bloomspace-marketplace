import { HomeFilterBar } from "@/components/HomeFilterBar";
import { MobileHeroImage } from "@/components/MobileHeroImage";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

export const MobileHero = () => {
  return (
    <section className="relative h-[calc(80vh-5px)] flex items-center justify-center bg-[#FFFFFF] md:hidden mt-[-5px]">
      <div className="absolute inset-0">
        <MobileHeroImage />
      </div>
      
      <div className="container relative z-10 px-8 flex flex-col items-center">
        <div className="max-w-3xl mx-auto text-center mb-8 mt-8">
          <GooeyText
            texts={[
              ["Your Cities", "Best Florists"],
              "All in One Place"
            ]}
            className="h-[72px]"
            textClassName="text-4xl font-semibold tracking-tight text-white whitespace-nowrap"
            morphTime={1}
            cooldownTime={3}
          />
        </div>
        <div className="w-full max-w-4xl -mt-[50px]">
          <HomeFilterBar />
        </div>
      </div>
    </section>
  );
};