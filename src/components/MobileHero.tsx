import { HomeFilterBar } from "@/components/HomeFilterBar";
import { MobileHeroImage } from "@/components/MobileHeroImage";

export const MobileHero = () => {
  return (
    <section className="relative h-[380px] flex items-center justify-center bg-[#FFFFFF] md:hidden">
      <MobileHeroImage />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-4">
          <h1 className="text-3xl font-semibold text-white tracking-tight">
            Fresh flowers,
            <br />
            delivered with care.
          </h1>
        </div>
        <div className="w-full max-w-4xl px-2">
          <HomeFilterBar />
        </div>
      </div>
    </section>
  );
};