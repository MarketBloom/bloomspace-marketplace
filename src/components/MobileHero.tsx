import { HomeFilterBar } from "@/components/HomeFilterBar";
import { MobileHeroImage } from "@/components/MobileHeroImage";

export const MobileHero = () => {
  return (
    <section className="relative h-[420px] flex items-end justify-center bg-[#FFFFFF] md:hidden">
      <MobileHeroImage />
      
      <div className="container relative z-10 px-4 pb-6">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 
            className="text-5xl font-semibold mb-2 text-white tracking-tight mt-[60px]"
          >
            Fresh flowers,
            <br />
            delivered with care.
          </h1>
          <p className="text-white/80 mt-[35px]">
            Discover our handpicked selection of exceptional local florists
          </p>
        </div>
        <div className="w-full max-w-4xl px-2">
          <HomeFilterBar />
        </div>
      </div>
    </section>
  );
};