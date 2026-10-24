
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { recommendedProperties } from "../data/dashboardMockData";
import PropertyCard from "./PropertyCard";

export default function RecommendedProperties() {
  return (
    <section className="mt-6 min-w-0 sm:mt-8">
      {/* Section heading */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
            Based on your location
          </h2>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Discover properties that might be right for you.
          </p>
        </div>

        <Link
          to="/listings"
          className="inline-flex w-fit shrink-0 items-center gap-2 text-sm font-semibold text-violet-600 transition-colors hover:text-violet-800"
        >
          Browse more
          <ArrowRight size={17} />
        </Link>
      </div>

      {/* Responsive property grid */}
      {recommendedProperties.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recommendedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 px-5 py-10 text-center">
          <h3 className="font-semibold text-slate-800">
            No properties to show yet
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            New properties will appear here when available.
          </p>
        </div>
      )}
    </section>
  );
}
