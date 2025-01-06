import { useEffect, useRef } from "react";
import { HomeFilterBar } from "@/components/HomeFilterBar";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in text animation
      gsap.from(textRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-[80vh] bg-primary flex items-center">
      <div className="container relative z-10 px-4 md:px-8 flex flex-col items-center">
        <div 
          ref={textRef}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-hero font-bold mb-6 text-black tracking-tight leading-[1.1]">
            Fresh flowers,
            <br />
            delivered with care
          </h1>
          <p className="text-base md:text-xl text-black/80 font-light mx-auto leading-relaxed max-w-[800px]">
            Order beautiful bouquets from local florists and get them delivered today. Support local businesses while making someone's day special.
          </p>
        </div>
        
        <div className="w-full max-w-4xl">
          <HomeFilterBar />
        </div>
      </div>
    </section>
  );
};