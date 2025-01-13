import { HomeFilterBar } from "@/components/HomeFilterBar";
import { MobileHeroImage } from "@/components/MobileHeroImage";
import { GooeyTextMorphing } from "@/components/ui/gooey-text-morphing";

export const MobileHero = () => {
  return (
    <section className="relative h-[calc(80vh-180px)] flex items-center justify-center bg-[#FFFFFF] md:hidden mt-0">
      <div className="absolute inset-0">
        <MobileHeroImage />
      </div>
      
      <div className="container relative z-10 px-4 pb-5">
        <div className="max-w-3xl mx-auto text-center mb-6">
          <GooeyTextMorphing 
            className="text-4xl font-semibold mb-2 text-white tracking-tight"
            texts={[
              "Fresh flowers,\ndelivered with care."
            ]}
          />
        </div>
        <div className="w-full max-w-4xl px-2">
          <HomeFilterBar />
        </div>
      </div>
    </section>
  );
};