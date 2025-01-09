import { HomeFilterBar } from "@/components/HomeFilterBar";
import { MobileHeroImage } from "@/components/MobileHeroImage";

export const MobileHero = () => {
  return (
    <section className="relative h-[420px] flex items-end justify-center bg-[#FFFFFF] md:hidden pb-1">
      <MobileHeroImage />
      
      <div className="container relative z-10 px-4 -mb-[200px]">
        <div className="max-w-3xl mx-auto text-center mb-6">
          <h1 className="text-3xl font-semibold mb-2 text-white tracking-tight">
            Fresh flowers,
            <br />
            delivered with care.
          </h1>
          <p className="text-base text-white/90 font-light max-w-xl mx-auto leading-relaxed mb-6">
            Order from our curated selection of local florists, delivering beautiful arrangements to your door.
          </p>
        </div>
        <div className="w-full max-w-4xl px-2">
          <HomeFilterBar />
        </div>
      </div>
    </section>
  );
};