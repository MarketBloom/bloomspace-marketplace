import { useEffect, useRef } from "react";
import { HomeFilterBar } from "@/components/HomeFilterBar";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for the background image
      gsap.to(heroRef.current, {
        backgroundPositionY: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Fade in text animation
      gsap.from(textRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out"
      });

      // Fade in overlay
      gsap.from(overlayRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.out"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center bg-[#050407]"
      style={{ 
        backgroundImage: 'url("/lovable-uploads/772494bc-3f97-4373-a19b-a65990d45123.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        filter: 'contrast(1.05) brightness(0.95)'
      }}
    >
      {/* Grain effect overlay */}
      <div 
        className="absolute inset-0 mix-blend-overlay opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />
      
      {/* Light gradient overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/30"
        style={{
          backdropFilter: 'brightness(0.95)',
        }}
      />
      
      <div className="container relative z-10 px-4 md:px-8 flex flex-col items-center">
        <div 
          ref={textRef}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white tracking-tight leading-[1.1] drop-shadow-lg">
            Same-Day Flowers,
            <br />
            Delivered with Care
          </h1>
          <p className="text-base md:text-xl text-white/95 font-light mx-auto leading-relaxed drop-shadow-md max-w-[800px]">
            Support local florists and discover the perfect arrangement for any occasion
          </p>
        </div>
        
        <div className="w-full max-w-4xl">
          <HomeFilterBar />
        </div>
      </div>
    </section>
  );
};