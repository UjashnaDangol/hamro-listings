
import { useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

export default function PropertyGallery({ images = [], title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Handle properties without images
  if (!images.length) {
    return (
      <div className="flex aspect-[16/9] items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
        No property images available
      </div>
    );
  }

  // Show previous image
  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  // Show next image
  const showNext = () => {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section className="w-full min-w-0">
      <div className="group relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100 sm:aspect-[2.2/1] lg:aspect-[3/1]">
        <img
          src={images[activeIndex]}
          alt={`${title} - photo ${activeIndex + 1}`}
          className="h-full w-full object-cover"
        />

        {/* Previous and Next buttons */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow transition hover:bg-white sm:left-4"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={showNext}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 shadow transition hover:bg-white sm:right-4"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Favorite button */}
        <button
          type="button"
          onClick={() => setIsFavorite((current) => !current)}
          aria-label={isFavorite ? "Remove favorite" : "Add favorite"}
          aria-pressed={isFavorite}
          className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-white/90 shadow transition hover:bg-white sm:right-4 sm:top-4"
        >
          <Heart
            size={20}
            className={
              isFavorite
                ?  "fill-violet-500 text-violet-500"
                : "text-slate-700"
            }
          />
        </button>
      </div>

      {/* Image navigation dots */}
      {images.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show photo ${index + 1}`}
              aria-pressed={activeIndex === index}
              className={`h-2 rounded-full transition-all ${
                activeIndex === index
                  ? "w-6 bg-violet-600"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
