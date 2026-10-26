
import { useState } from "react";
import { Search , MapPin} from "lucide-react";

import FilterField from "./property-filter/FilterField";
import LocationPanel from "./property-filter/LocationPanel";
import { set } from "react-hook-form";

const listingTypes = ["Buy", "Rent"];

export default function PropertySearchBar() {
  const [listingType, setListingType] = useState("Buy");
  const [searchQuery, setSearchQuery] = useState("");

  // Controls whether the location panel is visible.
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  // Stores the locations that have been applied.
  const [selectedLocations, setSelectedLocations] = useState([]);


  function handleSearch(event) {
    event.preventDefault();

    // Temporary frontend behavior until backend integration.
    console.log({
      listingType,
      searchQuery: searchQuery.trim(),
    });
  }

  return (
    <div className="rounded-xl border border-[#e8e5fa] bg-white p-3 shadow-lg sm:p-4">
      {/* Listing type selector */}
      <div
        className="mb-3 flex flex-wrap gap-2"
        aria-label="Listing type"
      >
        {listingTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setListingType(type)}
            aria-pressed={listingType === type}
            className={`
              rounded-lg px-4 py-2 text-sm font-medium
              transition-colors duration-200
              ${
                listingType === type
                  ? "bg-[#7061F5] text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-violet-50"
              }
            `}
          >
            {type}
          </button>
        ))}
      </div>

      {/*Location filter*/ }
<div className="relative z-50 mb-3">
  <FilterField
    label="Location"
    value={
      selectedLocations.length === 0
        ? "Any location"
        : selectedLocations.length === 1
          ? selectedLocations[0]
          : `${selectedLocations.length} locations selected`
    }
    active={isLocationOpen}
    onClick={() => setIsLocationOpen((current) => !current)}
    icon={<MapPin size={17} />}
  />

  {isLocationOpen && (
    <div className="absolute left-0 top-full z-50 mt-2 w-full max-w-sm">
      <LocationPanel
        selected={selectedLocations}
        onApply={setSelectedLocations}
        onClose={() => setIsLocationOpen(false)}
      />
    </div>
  )}
</div>
      {/* Keyword search */}
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-gray-200 px-3 py-3 focus-within:border-[#7061F5] focus-within:ring-2 focus-within:ring-violet-100">
          <Search
            size={19}
            className="shrink-0 text-[#7061F5]"
            aria-hidden="true"
          />

          <span className="sr-only">Search properties</span>

          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by property name or keyword"
            className="min-w-0 flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
        </label>

        <button
          type="submit"
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#7061F5] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5b4be0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7061F5] focus-visible:ring-offset-2 sm:w-auto"
        >
          <Search size={17} aria-hidden="true" />
          Search
        </button>
      </form>
    </div>
  );
}
