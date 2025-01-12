import { HomeFilterBar } from "@/components/HomeFilterBar";
import { MobileHeroImage } from "@/components/MobileHeroImage";

export const MobileHero = () => {
  return (
    <section className="relative h-[360px] flex items-center justify-center bg-[#FFFFFF] md:hidden mt-[200px]">
      <MobileHeroImage />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-6">
          <h1 className="text-5xl font-semibold mb-2 text-white tracking-tight">
            Fresh flowers,
            <br />
            delivered with care.
          </h1>
          <p className="text-white/80 mt-4">
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