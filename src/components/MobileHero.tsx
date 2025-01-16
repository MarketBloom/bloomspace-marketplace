import { HomeFilterBar } from "@/components/HomeFilterBar";
import { MobileHeroImage } from "@/components/MobileHeroImage";

export const MobileHero = () => {
  return (
    <section className="relative h-[calc(80vh-5px)] flex items-center justify-center bg-[#FFFFFF] md:hidden mt-[5px]">
      <div className="absolute inset-0">
        <MobileHeroImage />
      </div>
      
      <div className="container relative z-10 px-8 flex flex-col items-center">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-semibold tracking-tight text-white">
            Your City's Best Florists
          </h1>
          <p className="text-xl text-white mt-2">All in One Place</p>
        </div>
        <div className="w-full max-w-4xl">
          <HomeFilterBar />
        </div>
      </div>
    </section>
  );
};