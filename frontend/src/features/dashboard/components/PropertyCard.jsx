
import {
  Heart,
  BedDouble,
  Bath,
  Ruler,
  Sparkles,
} from "lucide-react";

import { useState } from "react";

export default function PropertyCard({ property }) {
    const [isFavorite , setIsFavorite] =useState(false);
  return (
    <article className="min-w-0 overflow-hidden rounded-lg border border-violet-100 bg-white transition-shadow duration-200 hover:shadow-md">
      {/* Property image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Popular tag */}
        {property.popular && (
          <div className="absolute bottom-0 left-0 flex items-center gap-1.5 rounded-tr-lg bg-violet-500 px-3 py-1.5 text-[10px] font-semibold text-white sm:text-xs">
            <Sparkles size={13} />
            <span>POPULAR</span>
          </div>
        )}
      </div>

      {/* Property information */}
      <div className="p-3 sm:p-3.5">
        {/* Price and favorite button */}
        <div className="flex items-center justify-between gap-2">
          <p className="min-w-0 text-base font-bold tracking-tight text-violet-500 sm:text-lg">
            NPR {property.price.toLocaleString("en-IN")}

            {property.listingType === "rent" && (
              <span className="ml-1 text-[10px] font-normal text-gray-500 sm:text-xs">
                /month
              </span>
            )}
          </p>

          <button 
            type="button"
            onClick = {() => setIsFavorite(!isFavorite)}
            aria-label={
                isFavorite ? `Remove ${property.title} from favorites` : `Add ${property.title} from favorites`
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
            <span>{property.area.toLocaleString("en-IN")} sq. ft.</span>
          </div>
        </div>
      </div>
    </article>
  );
}
