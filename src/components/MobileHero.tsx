import { HomeFilterBar } from "@/components/HomeFilterBar";
import { MobileHeroImage } from "@/components/MobileHeroImage";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

export const MobileHero = () => {
  return (
    <section className="relative h-[420px] flex items-end justify-center bg-[#FFFFFF] md:hidden pb-6">
      <MobileHeroImage />
      
      <div className="container relative z-10 px-4 -mb-[205px]">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 
            className="text-3xl font-semibold mb-2 text-white tracking-tight"
            style={{ transform: 'translateY(9px)' }}
          >
            Fresh flowers,
            <br />
            <GooeyText 
              texts={[
                "delivered with care",
                "crafted with love",
                "arranged by experts",
                "bringing joy daily"
              ]}
              className="h-[36px] mt-1"
              textClassName="text-2xl"
            />
          </h1>
        </div>
        <div className="w-full max-w-4xl px-2 -mt-[9px]">
          <HomeFilterBar />
        </div>
      </div>
    </section>
  );
};