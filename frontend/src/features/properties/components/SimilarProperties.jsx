
import { allProperties } from "../../dashboard/data/dashboardMockData";
import PropertyCard from "../../dashboard/components/PropertyCard";
import { getSimilarProperties } from "../utils/getSimilarProperties";

export default function SimilarProperties({ currentProperty }) {
  const similarProperties = getSimilarProperties(
    currentProperty,
    allProperties,
    3
  );

  if (similarProperties.length === 0) return null;

  console.log(
  "Current property:",
  currentProperty.id,
  currentProperty.title
);

console.table(
  similarProperties.map((property) => ({
    id: property.id,
    title: property.title,
  }))
);
  return (
    <section className="w-full min-w-0">
      <h2 className="mb-5 text-xl font-semibold text-slate-900">
        Similar Properties
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {similarProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}
      </div>
    </section>
  );
}
