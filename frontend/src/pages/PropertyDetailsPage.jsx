
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { useEffect } from "react";

import { allProperties } from "../features/dashboard/data/dashboardMockData";

import PropertyGallery from "../features/properties/components/PropertyGallery";
import PropertySummary from "../features/properties/components/PropertySummary";
import PropertyTabs from "../features/properties/components/PropertyTabs";
import AgentCard from "../features/properties/components/AgentCard";
import SimilarProperties from "../features/properties/components/SimilarProperties";

export default function PropertyDetailsPage() {
  const { id } = useParams();

    useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  // Find the property matching the ID in the URL
  const property = allProperties.find(
    (property) => property.id === id
  );

  // Handle invalid property IDs
  if (!property) {
    return (
      <div className="mx-auto w-full max-w-7xl p-6">
        <h1 className="text-xl font-semibold text-slate-900">
          Property not found
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          The property you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-violet-600 hover:text-violet-700"
        >
          <ArrowLeft size={16} />
          Back to properties
        </Link>
      </div>
    );
  }

  // Temporary booking handler
  const handleBookVisit = () => {
    console.log("Book a visit clicked:", property.id);
  };

  // Temporary agent profile handler
  const handleViewAgent = () => {
    console.log("View agent profile clicked:", property.agent?.name);
  };

  return (
    <div className="mx-auto w-full max-w-7xl min-w-0 space-y-5">

      {/* Back Navigation */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 transition hover:text-violet-800"
      >
        <ArrowLeft size={16} />
        Back
      </Link>

      {/* Property Image Gallery */}
      <PropertyGallery
        images={
          property.images ??
          (property.image ? [property.image] : [])
        }
        title={property.title}
      />

      {/* Main Property Information Card */}
      <div className="grid grid-cols-1 items-start gap-8 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(300px,1fr)]">

        {/* LEFT COLUMN */}
        <div className="min-w-0 space-y-6">

          {/* Property Summary */}
          <PropertySummary
            property={property}
            onBook={handleBookVisit}
          />

          {/* Overview, Amenities and Reviews */}
          <PropertyTabs property={property} />

        </div>

        {/* RIGHT COLUMN */}
        <aside className="min-w-0 space-y-6">

          {/* Property Agent */}
          {property.agent && (
            <AgentCard
              agent={property.agent}
              onBook={handleBookVisit}
              onViewProfile={handleViewAgent}
            />
          )}

          {/* Property Location */}
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">

            <div className="flex items-center justify-between p-4">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Location
                </h2>

                <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                  <MapPin size={13} />
                  {property.location}
                </p>
              </div>

              <button
                type="button"
                className="text-xs font-medium text-violet-600 hover:text-violet-700"
                onClick={() => console.log("View full map")}
              >
                See All →
              </button>
            </div>

            {/* Map placeholder - Google Maps integration later */}
            <div className="relative flex min-h-64 items-center justify-center bg-slate-100 p-6 text-center sm:min-h-72">
              <div className="max-w-xs">
                <MapPin
                  size={30}
                  className="mx-auto text-violet-600"
                />

                <p className="mt-2 text-sm font-medium text-slate-700">
                  {property.city}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Map integration will be added here.
                </p>
              </div>
            </div>
          </section>

        </aside>
      </div>

      {/* Similar Properties */}
      <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
        <SimilarProperties currentProperty={property} />
      </section>

    </div>
  );
}
