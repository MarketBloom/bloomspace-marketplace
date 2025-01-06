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
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay with noise texture */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/60"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.1
        }}
      />
      
      <div className="container relative z-10 px-4 md:px-8 flex flex-col items-center">
        <div 
          ref={textRef}
          className="max-w-3xl mx-auto text-center mb-8 md:mb-12"
        >
          <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 text-[#EFEEEA] tracking-tight leading-tight">
            Same-Day Flowers,
            <br />
            Delivered with Care
          </h1>
          <p className="text-lg md:text-xl text-[#EFEEEA]/90 font-light max-w-xl mx-auto leading-relaxed mb-8">
            Support local florists and discover the perfect arrangement for any occasion
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              className="px-8 py-3 bg-[#050407]/40 backdrop-blur-md border border-[#EFEEEA]/20 text-[#EFEEEA] 
                         rounded-full hover:bg-[#050407]/60 transition-all duration-300 
                         hover:shadow-[0_0_20px_rgba(239,238,234,0.1)] text-sm md:text-base"
            >
              Browse Florists
            </button>
            <button 
              className="px-8 py-3 bg-[#FCBA24] text-[#050407] rounded-full 
                         hover:bg-[#FCBA24]/90 transition-all duration-300 
                         hover:shadow-[0_0_20px_rgba(252,186,36,0.3)] text-sm md:text-base"
            >
              Explore Bouquets
            </button>
          </div>
        </div>
        
        <div className="w-full max-w-4xl">
          <HomeFilterBar />
        </div>
      </div>
    </section>
  );
};