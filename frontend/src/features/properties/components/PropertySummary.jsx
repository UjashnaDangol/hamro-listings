
import {
  BedDouble,
  Bath,
  Ruler,
  MapPin,
  CalendarDays,
} from "lucide-react";

export default function PropertySummary({ property, onBook }) {
  if (!property) {
    return null;
  }

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <section className="w-full min-w-0">
      {/* Price and listing type */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-2xl font-bold tracking-tight text-violet-700 sm:text-3xl">
            Rs. {formattedPrice}
            {property.listingType === "rent" && (
              <span className="ml-1 text-sm font-normal text-slate-500">
                /month
              </span>
            )}
          </p>

          <span className="mt-2 inline-block rounded-full bg-violet-50 px-3 py-1 text-xs font-medium capitalize text-violet-700">
            For {property.listingType}
          </span>
        </div>
      </div>

      {/* Property title and address */}
      <h1 className="mt-4 break-words text-xl font-bold text-slate-900 sm:text-2xl">
        {property.title}
      </h1>

      <p className="mt-2 flex items-start gap-2 text-sm text-slate-500">
        <MapPin size={18} className="mt-0.5 shrink-0 text-violet-600" />
        <span>{property.location}</span>
      </p>

      {/* Property specifications */}
      <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-4">
        <div className="flex min-w-0 flex-col items-center gap-2 rounded-xl border border-slate-200 p-3 text-center sm:flex-row sm:justify-center sm:p-4">
          <BedDouble size={20} className="shrink-0 text-violet-600" />
          <span className="text-xs text-slate-700 sm:text-sm">
            {property.bedrooms} Beds
          </span>
        </div>

        <div className="flex min-w-0 flex-col items-center gap-2 rounded-xl border border-slate-200 p-3 text-center sm:flex-row sm:justify-center sm:p-4">
          <Bath size={20} className="shrink-0 text-violet-600" />
          <span className="text-xs text-slate-700 sm:text-sm">
            {property.bathrooms} Baths
          </span>
        </div>

        <div className="flex min-w-0 flex-col items-center gap-2 rounded-xl border border-slate-200 p-3 text-center sm:flex-row sm:justify-center sm:p-4">
          <Ruler size={20} className="shrink-0 text-violet-600" />
          <span className="text-xs text-slate-700 sm:text-sm">
            {Number(property.area).toLocaleString("en-IN")} sq. ft.
          </span>
        </div>
      </div>

      {/* Book a visit */}
      <button
        type="button"
        onClick={onBook}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
      >
        <CalendarDays size={18} />
        Book a Visit
      </button>
    </section>
  );
}
