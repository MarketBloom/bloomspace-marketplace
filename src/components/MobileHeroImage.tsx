export const MobileHeroImage = () => {
  return (
    <div className="absolute inset-0">
      <img 
        src="/lovable-uploads/772494bc-3f97-4373-a19b-a65990d45123.png"
        alt="Beautiful pink and coral carnations arranged with dramatic shadows"
        className="h-full w-full object-cover"
        style={{ 
          objectPosition: '50% 35%',
          objectFit: 'cover',
          scale: '2.04'  // Increased scale by 2% from 2.0
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-black/40" />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};