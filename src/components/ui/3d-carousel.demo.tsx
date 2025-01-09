import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel"

export function ThreeDPhotoCarouselDemo() {
  const demoCards = [
    "https://picsum.photos/200/300?night",
    "https://picsum.photos/200/300?city",
    "https://picsum.photos/200/300?sky",
    "https://picsum.photos/200/300?sunset",
    "https://picsum.photos/200/300?sunrise",
    "https://picsum.photos/200/300?winter",
    "https://picsum.photos/200/300?skyscraper",
    "https://picsum.photos/200/300?building",
  ]

  return (
    <div className="w-full max-w-4xl">
      <div className="min-h-[500px] flex flex-col justify-center border border-dashed rounded-lg space-y-4">
        <div className="p-2">
          <ThreeDPhotoCarousel cards={demoCards} />
        </div>
      </div>
    </div>
  )
}