import { HomeFilterBar } from "@/components/HomeFilterBar";
import { MobileHero } from "@/components/MobileHero";
import { HeroBackground } from "@/components/HeroBackground";

export const Hero = () => {
  return (
    <>
      <MobileHero />
      <section className="relative h-[50vh] min-h-[600px] hidden md:flex items-center justify-center bg-[#FFFFFF]">
        <HeroBackground />
        <div className="container relative z-10 px-8 flex flex-col items-center">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-6xl font-semibold mb-3 text-white tracking-tight">
              Fresh flowers,
              <br />
              delivered with care.
            </h1>
            <p className="text-white/90 font-light max-w-xl mx-auto leading-relaxed mb-8 whitespace-nowrap text-lg">
              Support local florists and get fresh arrangements delivered right to your door.
            </p>
          </div>
          <div className="w-full max-w-4xl">
            <HomeFilterBar />
          </div>
        </div>
      </section>
    </>
  );
};