
import { useState } from "react";
import { Check, House, Building2, Blocks, LandPlot } from "lucide-react";
import PanelFooter from "./PanelFooter";

const PROPERTY_TYPES = {
  House: [
    "Residential House",
    "Independent House",
    "Villa",
    "Bungalow",
    "Duplex",
    "Cottage",
    "Townhouse",
    "Farmhouse",
  ],
  Apartment: [
    "Studio",
    "1 BHK",
    "2 BHK",
    "3 BHK",
    "4+ BHK",
    "Penthouse",
    "Serviced Apartment",
    "Duplex Apartment",
  ],
  Project: [
    "Residential Project",
    "Housing Colony",
    "Apartment Project",
  ],
  Land: [
    "Residential Land",
    "Commercial Land",
    "Agricultural Land",
    "Industrial Land",
  ],
};

const TYPE_OPTIONS = [
  { name: "House", icon: House },
  { name: "Apartment", icon: Building2 },
  { name: "Project", icon: Blocks },
  { name: "Land", icon: LandPlot },
];

export default function TypePanel({
  selected = { category: "", subcategories: [] },
  onApply,
  onClose,
}) {
  const [draft, setDraft] = useState(() => ({
    category: selected.category || "",
    subcategories: selected.subcategories || [],
  }));

  function chooseCategory(category) {
    setDraft((current) => ({
      category,
      subcategories:
        current.category === category
          ? current.subcategories
          : [],
    }));
  }

  function toggleSubcategory(subcategory, checked) {
    setDraft((current) => ({
      ...current,
      subcategories: checked
        ? current.subcategories.includes(subcategory)
          ? current.subcategories
          : [...current.subcategories, subcategory]
        : current.subcategories.filter(
            (item) => item !== subcategory
          ),
    }));
  }

  function reset() {
    setDraft({
      category: "",
      subcategories: [],
    });
  }

  function apply() {
    onApply?.(draft);
    onClose?.();
  }

  const subcategories = PROPERTY_TYPES[draft.category] || [];

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
      <div className="p-4 sm:p-5">
        <h3 className="mb-3 text-sm font-semibold text-[#0F0B3D]">
          Property type
        </h3>

        <div className="grid grid-cols-2 gap-2">
          {TYPE_OPTIONS.map(({ name, icon: Icon }) => {
            const active = draft.category === name;

            return (
              <button
                key={name}
                type="button"
                onClick={() => chooseCategory(name)}
                aria-pressed={active}
                className={`
                  flex min-w-0 items-center gap-2 rounded-xl border
                  p-3 text-left transition-colors
                  ${
                    active
                      ? "border-[#7061F5] bg-violet-50 text-[#7061F5]"
                      : "border-gray-200 bg-white text-gray-600 hover:border-violet-300"
                  }
                `}
              >
                <Icon size={19} className="shrink-0" />

                <span className="text-sm font-medium">
                  {name}
                </span>

                {active && (
                  <Check size={15} className="ml-auto shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {draft.category && (
          <div className="mt-5">
            <h4 className="mb-3 text-sm font-medium text-[#0F0B3D]">
              {draft.category} subcategories
            </h4>

            <div className="max-h-52 space-y-3 overflow-y-auto">
              {subcategories.map((subcategory) => (
                <label
                  key={subcategory}
                  className="flex cursor-pointer items-center gap-3 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={draft.subcategories.includes(subcategory)}
                    onChange={(event) =>
                      toggleSubcategory(
                        subcategory,
                        event.target.checked
                      )
                    }
                    className="size-4 accent-[#7061F5]"
                  />

                  <span>{subcategory}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <p className="mt-4 text-xs text-gray-500">
          {draft.category
            ? `${draft.category}${
                draft.subcategories.length
                  ? ` · ${draft.subcategories.length} selected`
                  : ""
              }`
            : "Select a property category"}
        </p>
      </div>

      <PanelFooter
        onReset={reset}
        onApply={apply}
        applyLabel="Apply type"
      />
    </div>
  );
}
