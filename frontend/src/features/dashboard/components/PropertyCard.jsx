
import {
  Heart,
  BedDouble,
  Bath,
  Ruler,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function PropertyCard({ property }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <article className="relative min-w-0 rounded-lg border border-violet-100 bg-white transition-shadow duration-200 hover:shadow-md">

      {/* Clickable property content */}
      <Link
        to={`/properties/${property.id}`}
        aria-label={`View details for ${property.title}`}
        className="block"
      >
        {/* Property image + popular badge */}
        <div className="relative">

          {/* Image */}
          <div className="aspect-[16/9] w-full overflow-hidden rounded-t-lg">
            <img
              src={property.image}
              alt={property.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Popular badge */}
          {property.popular && (
            <div className="pointer-events-none absolute -bottom-5 -left-3 z-10">

              {/* Badge */}
              <div className="flex items-center gap-1.5 rounded-xl rounded-bl-none bg-violet-500 px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-white sm:px-4 sm:py-2.5 sm:text-xs">
                <Sparkles
                  size={14}
                  strokeWidth={2}
                  fill="currentColor"
                />
                <span>Popular</span>
              </div>

              {/* Folded corner */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-full h-3 w-3 bg-violet-700"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                }}
              />
            </div>
          )}
        </div>

        {/* Property information */}
        <div className={`p-3 sm:p-3.5 ${
          property.popular ? "pt-8 sm:pt-9" : ""
        }`}>

          {/* Price */}
          <p className="min-w-0 text-base font-bold tracking-tight text-violet-500 sm:text-lg">
            NPR {property.price.toLocaleString("en-IN")}

            {property.listingType === "rent" && (
              <span className="ml-1 text-[10px] font-normal text-gray-500 sm:text-xs">
                /month
              </span>
            )}
          </p>

          {/* Property title */}
          <h3 className="mt-1 truncate text-sm font-bold tracking-tight text-slate-950 sm:text-base">
            {property.title}
          </h3>

          {/* Property location */}
          <p className="mt-1 truncate text-xs text-slate-500">
            {property.location}
          </p>

          {/* Divider */}
          <div className="my-3 border-t border-violet-100" />

          {/* Property details */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-slate-600 sm:text-xs">

            <div className="flex items-center gap-1">
              <BedDouble
                size={15}
                strokeWidth={1.8}
                className="shrink-0 text-violet-500"
              />
              <span>{property.bedrooms} Beds</span>
            </div>

            <div className="flex items-center gap-1">
              <Bath
                size={15}
                strokeWidth={1.8}
                className="shrink-0 text-violet-500"
              />
              <span>{property.bathrooms} Baths</span>
            </div>

            <div className="flex items-center gap-1">
              <Ruler
                size={15}
                strokeWidth={1.8}
                className="shrink-0 text-violet-500"
              />
              <span>
                {property.area.toLocaleString("en-IN")} sq. ft.
              </span>
            </div>

          </div>
        </div>
      </Link>

      {/* Favorite button */}
      <div className="flex justify-end px-3 pb-3 sm:px-3.5">
        <button
          type="button"
          onClick={() => setIsFavorite((prev) => !prev)}
          aria-label={
            isFavorite
              ? `Remove ${property.title} from favorites`
              : `Add ${property.title} to favorites`
          }
          aria-pressed={isFavorite}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors ${
            isFavorite
              ? "border-violet-500 bg-violet-500 text-white"
              : "border-violet-100 text-violet-500 hover:bg-violet-50"
          }`}
        >
          <Heart
            size={17}
            strokeWidth={1.8}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>
      </div>

    </article>
  );
}
