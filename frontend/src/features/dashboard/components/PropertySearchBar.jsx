import { useEffect, useRef, useState } from "react";
import { Search, MapPin, House, Tag, ChevronDown } from "lucide-react";

import FilterField from "./property-filter/FilterField";
import LocationPanel from "./property-filter/LocationPanel";
import TypePanel from "./property-filter/TypePanel";
import PricePanel from "./property-filter/PricePanel";

export default function PropertySearchBar() {
  const [listingType, setListingType] = useState("Buy");
  const [searchQuery, setSearchQuery] = useState("");

  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [selectedType, setSelectedType] = useState({
    category: "",
    subcategories: [],
  });

  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const locationRef = useRef(null);
  const typeRef = useRef(null);
  const priceRef = useRef(null);

  // Close a panel when a click happens outside it.
  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target)
      ) {
        setIsLocationOpen(false);
      }

      if (typeRef.current && !typeRef.current.contains(event.target)) {
        setIsTypeOpen(false);
      }

      if (priceRef.current && !priceRef.current.contains(event.target)) {
        setIsPriceOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Reset the selected price when switching between Buy and Rent.
  useEffect(() => {
    setSelectedPrice(null);
    setIsPriceOpen(false);
  }, [listingType]);

  function handleLocationApply(locations) {
    setSelectedLocations(locations);
    setIsLocationOpen(false);
  }

  function handleTypeApply(type) {
    setSelectedType(type);
    setIsTypeOpen(false);
  }

  function handlePriceApply(price) {
    setSelectedPrice(price);
    setIsPriceOpen(false);
  }

  function formatPrice(price) {
    if (!price) return "Any price";

    const min = Number(price[0]).toLocaleString("en-IN");
    const max = Number(price[1]).toLocaleString("en-IN");

    return `Rs. ${min} – ${max}`;
  }

  function handleSearch(event) {
    event.preventDefault();

    const filters = {
      listingType,
      searchQuery: searchQuery.trim(),
      locations: selectedLocations,
      propertyType: selectedType,
      priceRange: selectedPrice,
    };

    console.log("Search filters:", filters);

    // Connect this object to the property-search API when ready.
  }

  return (
    <form
      onSubmit={handleSearch}
      className="relative z-20 w-full rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur-xl sm:p-5"
    >
      {/* Buy / Rent */}
      <div className="mb-4 flex items-center gap-2">
        {["Buy", "Rent"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setListingType(type)}
            className={`rounded-xl px-5 py-2 text-sm font-semibold transition ${
              listingType === type
                ? "bg-[#7061F5] text-white shadow-md shadow-[#7061F5]/20"
                : "border border-gray-200 bg-white text-gray-600 hover:border-[#7061F5]/40 hover:text-[#7061F5]"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Location, Property Type, and Price Range */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {/* Location */}
        <div ref={locationRef} className="relative min-w-0 w-full">
          <FilterField
            label="Location"
            value={
              selectedLocations.length
                ? selectedLocations.length === 1
                  ? selectedLocations[0]
                  : `${selectedLocations.length} locations selected`
                : "Any location"
            }
            active={isLocationOpen}
            icon={MapPin}
            onClick={() => {
              setIsLocationOpen((open) => !open);
              setIsTypeOpen(false);
              setIsPriceOpen(false);
            }}
          />

          {isLocationOpen && (
            <div className="absolute left-0 top-full z-50 mt-2 w-[min(420px,calc(100vw-2rem))] max-w-[calc(100vw-2rem)]">
              <LocationPanel
                selected={selectedLocations}
                onApply={handleLocationApply}
                onClose={() => setIsLocationOpen(false)}
              />
            </div>
          )}
        </div>

        {/* Property Type */}
        <div ref={typeRef} className="relative min-w-0 w-full">
          <FilterField
            label="Property Type"
            value={selectedType.category || "Any type"}
            active={isTypeOpen}
            icon={House}
            onClick={() => {
              setIsTypeOpen((open) => !open);
              setIsLocationOpen(false);
              setIsPriceOpen(false);
            }}
          />

          {isTypeOpen && (
            <div className="absolute left-0 top-full z-50 mt-2 w-[min(420px,calc(100vw-2rem))] max-w-[calc(100vw-2rem)]">
              <TypePanel
                selected={selectedType}
                onApply={handleTypeApply}
                onClose={() => setIsTypeOpen(false)}
              />
            </div>
          )}
        </div>

        {/* Price Range */}
        <div ref={priceRef} className="relative min-w-0 w-full">
          <FilterField
            label="Price Range"
            value={formatPrice(selectedPrice)}
            active={isPriceOpen}
            icon={Tag}
            onClick={() => {
              setIsPriceOpen((open) => !open);
              setIsLocationOpen(false);
              setIsTypeOpen(false);
            }}
          />

          {isPriceOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-[min(495px,calc(100vw-2rem))] max-w-[calc(100vw-2rem)]">
              <PricePanel
                key={listingType}
                listingType={listingType}
                selected={selectedPrice}
                onApply={handlePriceApply}
                onClose={() => setIsPriceOpen(false)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Keyword Search */}
      <div className="mt-4 flex min-w-0 items-center gap-2 rounded-xl border border-gray-200 bg-white p-1.5 transition focus-within:border-[#7061F5]/60 focus-within:ring-2 focus-within:ring-[#7061F5]/10">
        <Search className="ml-2 h-5 w-5 shrink-0 text-gray-400" />

        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search by property name, area, or keyword..."
          className="min-w-0 flex-1 bg-transparent px-2 py-2 text-sm text-[#0F0B3D] outline-none placeholder:text-gray-400"
        />

        <button
          type="submit"
          className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#7061F5] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5F50E8]"
        >
          <Search size={16} />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>
    </form>
  );
}