import { useMemo, useState } from "react";
import { MapPin, Search, X } from "lucide-react";
import PanelFooter from "./PanelFooter";

const ALL_CITIES = [
  "Kathmandu",
  "Lalitpur",
  "Bhaktapur",
  "Kirtipur",
  "Madhyapur Thimi",
  "Pokhara",
  "Bharatpur",
  "Biratnagar",
  "Birgunj",
  "Butwal",
  "Dharan",
  "Hetauda",
  "Janakpur",
  "Nepalgunj",
  "Dhangadhi",
];

export default function LocationPanel({
  selected = [],
  onApply,
  onClose,
}) {
  const [draft, setDraft] = useState(selected);
  const [query, setQuery] = useState("");

  const filteredCities = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return ALL_CITIES.filter((city) =>
      city.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  function toggleCity(city, checked) {
    setDraft((current) => {
      if (checked) {
        return current.includes(city) ? current : [...current, city];
      }

      return current.filter((item) => item !== city);
    });
  }

  function removeCity(city) {
    setDraft((current) => current.filter((item) => item !== city));
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
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
          <MapPin size={18} className="text-[#7061F5]" />

          <div>
            <h3 className="text-sm font-semibold text-[#0F0B3D]">
              Select location
            </h3>

            <p className="mt-0.5 text-xs text-gray-500">
              Choose one or more cities.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 focus-within:border-[#7061F5]">
          <Search size={16} className="shrink-0 text-gray-400" />

          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search cities..."
            className="min-w-0 flex-1 bg-transparent text-sm text-[#0F0B3D] outline-none placeholder:text-gray-400"
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

        {/* Selected city chips */}
        {draft.length > 0 && (
          <div className="mt-3">
            <p className="mb-2 text-xs font-medium text-gray-500">
              Selected ({draft.length})
            </p>

            <div className="flex flex-wrap gap-2">
              {draft.map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#7061F5]/20 bg-[#7061F5]/10 px-2.5 py-1.5 text-xs font-medium text-[#7061F5]"
                >
                  {city}

                  <button
                    type="button"
                    onClick={() => removeCity(city)}
                    aria-label={`Remove ${city}`}
                    className="rounded-full hover:text-[#0F0B3D]"
                  >
                    <X size={13} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* City list */}
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-xs font-semibold text-[#0F0B3D]">
              Cities
            </h4>

            <span className="text-xs text-gray-400">
              {filteredCities.length} found
            </span>
          </div>

          <div className="max-h-52 space-y-1 overflow-y-auto pr-1">
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => {
                const checked = draft.includes(city);

                return (
                  <label
                    key={city}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition ${
                      checked
                        ? "bg-[#7061F5]/10"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(event) =>
                        toggleCity(city, event.target.checked)
                      }
                      className="h-4 w-4 accent-[#7061F5]"
                    />

                    <span
                      className={`text-sm ${
                        checked
                          ? "font-medium text-[#7061F5]"
                          : "text-gray-700"
                      }`}
                    >
                      {city}
                    </span>
                  </label>
                );
              })
            ) : (
              <p className="py-6 text-center text-sm text-gray-400">
                No cities found.
              </p>
            )}
          </div>
        </div>
      </div>

      <PanelFooter
        onReset={reset}
        onApply={apply}
        applyLabel={`Apply${draft.length ? ` (${draft.length})` : ""}`}
      />
    </div>
  );
}