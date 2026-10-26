
import { useMemo, useState } from "react";
import { MapPin, Search, X } from "lucide-react";
import { ALL_CITIES } from "../../data/propertyFilterData";
import FilterCheckbox from "./FilterCheckbox";
import PanelFooter from "./PanelFooter";

export default function LocationPanel({
  selected = [],
  onApply,
  onClose,
}) {
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState(selected);

  const filteredCities = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return ALL_CITIES.filter((city) =>
      city.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  function toggleCity(city, checked) {
    setDraft((current) => {
      if (checked) {
        return current.includes(city)
          ? current
          : [...current, city];
      }

      return current.filter((item) => item !== city);
    });
  }

  function removeCity(city) {
    setDraft((current) =>
      current.filter((item) => item !== city)
    );
  }

  function reset() {
    setDraft([]);
    setQuery("");
  }

  function apply() {
    onApply?.(draft);
    onClose?.();
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
      <div className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <MapPin size={18} className="text-[#6C5CE7]" />

          <h3 className="font-semibold text-[#0F0B3D]">
            Select location
          </h3>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 focus-within:border-[#6C5CE7]">
          <Search size={17} className="shrink-0 text-gray-400" />

          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search city..."
            aria-label="Search locations"
            className="w-full bg-transparent text-sm text-[#0F0B3D] outline-none placeholder:text-gray-400"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear location search"
              className="text-gray-400 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {draft.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {draft.map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1.5 text-xs font-medium text-[#6C5CE7]"
              >
                {city}

                <button
                  type="button"
                  onClick={() => removeCity(city)}
                  aria-label={`Remove ${city}`}
                  className="hover:text-[#0F0B3D]"
                >
                  <X size={13} />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 max-h-56 space-y-3 overflow-y-auto">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <FilterCheckbox
                key={city}
                label={city}
                checked={draft.includes(city)}
                onChange={(checked) =>
                  toggleCity(city, checked)
                }
              />
            ))
          ) : (
            <p className="py-5 text-center text-sm text-gray-500">
              No locations found.
            </p>
          )}
        </div>

        <p className="mt-3 text-xs text-gray-400">
          {draft.length} location{draft.length === 1 ? "" : "s"} selected
        </p>
      </div>

      <PanelFooter
        onReset={reset}
        onApply={apply}
        applyLabel="Apply locations"
      />
    </div>
  );
}
