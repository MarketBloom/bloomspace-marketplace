import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel"

export function ThreeDPhotoCarouselDemo() {
  const demoCards = Array(8).fill(null).map((_, i) => (
    <div key={i} className="bg-slate-800 rounded-lg p-8 w-[300px] h-[400px] flex items-center justify-center">
      <h3 className="text-white text-2xl">Card {i + 1}</h3>
    </div>
  ));

  return (
    <div className="w-full max-w-4xl">
      <div className="min-h-[500px] flex flex-col justify-center border border-dashed rounded-lg space-y-4">
        <div className="p-2">
          <ThreeDPhotoCarousel cards={demoCards} />
        </div>
      </div>
    </div>
  );
}