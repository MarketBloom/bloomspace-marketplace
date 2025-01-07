import { HomeFilterBar } from "@/components/HomeFilterBar";
import { MobileHeroImage } from "@/components/MobileHeroImage";

export const MobileHero = () => {
  return (
    <section className="relative h-[420px] flex flex-col justify-start bg-[#FFFFFF] md:hidden">
      <div className="container relative z-10 px-4">
        <div className="max-w-3xl mx-auto text-center mb-6">
          <h1 className="text-3xl font-semibold mb-2 text-foreground tracking-tight">
            Fresh flowers,
            <br />
            delivered with care.
          </h1>
          <p className="text-base text-muted-foreground font-light max-w-xl mx-auto leading-relaxed mb-6 whitespace-normal">
            Support local florists and get fresh arrangements delivered right to your door.
          </p>
        </div>
        <div className="w-full max-w-4xl px-2">
          <HomeFilterBar />
        </div>
      </div>

      <div className="relative h-[420px] mt-6">
        <MobileHeroImage />
      </div>
    </section>
  );
};