import { HomeFilterBar } from "@/components/HomeFilterBar";
import { MobileHeroImage } from "@/components/MobileHeroImage";

export const MobileHero = () => {
  return (
    <section className="relative h-[420px] flex items-end justify-center bg-[#FFFFFF] md:hidden pb-6">
      <MobileHeroImage />
      
      <div className="container relative z-10 px-4 -mb-[205px]">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-semibold mb-2 text-white tracking-tight pt-[3px]">
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