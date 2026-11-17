
import { useState } from "react";
import { Check, Star } from "lucide-react";

const tabs = ["Overview", "Amenities", "Reviews"];

export default function PropertyTabs({ property }) {
  const [activeTab, setActiveTab] = useState("Overview");

  const amenities = property.amenities ?? [];

  return (
    <section className="w-full min-w-0">
      {/* Tab navigation */}
      <div
        role="tablist"
        aria-label="Property information"
        className="flex gap-5 overflow-x-auto border-b border-slate-200"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            id={`tab-${tab.toLowerCase()}`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`panel-${tab.toLowerCase()}`}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 border-b-2 px-1 py-3 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-violet-600 text-violet-700"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Active tab content */}
      <div
        id={`panel-${activeTab.toLowerCase()}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab.toLowerCase()}`}
        className="py-5"
      >
        {activeTab === "Overview" && (
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              About this property
            </h2>

            <p className="mt-3 whitespace-pre-line break-words text-sm leading-7 text-slate-600">
              {property.description ||
                "No property description is available yet."}
            </p>
          </div>
        )}

        {activeTab === "Amenities" && (
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Property amenities
            </h2>

            {amenities.length > 0 ? (
              <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <Check
                      size={17}
                      className="shrink-0 text-violet-600"
                    />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-slate-500">
                No amenities have been listed yet.
              </p>
            )}
          </div>
        )}

        {activeTab === "Reviews" && (
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Property reviews
            </h2>

            <div className="mt-4 rounded-xl border border-slate-200 p-4">
              <div className="flex items-center gap-2">
                <Star size={18} className="text-amber-500" />
                <span className="text-sm font-medium text-slate-800">
                  Reviews
                </span>
              </div>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Reviews will appear here when they are available.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
