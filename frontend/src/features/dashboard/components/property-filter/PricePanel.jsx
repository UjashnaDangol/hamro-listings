import { useEffect, useMemo, useState } from "react";
import { RotateCcw, Wallet } from "lucide-react";
import PanelFooter from "./PanelFooter";

const PRICE_CONFIG = {
  Buy: {
    min: 0,
    max: 50000000,
    step: 500000,
    defaultRange: [5000000, 25000000],
    presets: [
      { label: "Any price", range: [0, 50000000] },
      { label: "Under 50 lakh", range: [0, 5000000] },
      { label: "50 lakh – 1 crore", range: [5000000, 10000000] },
      { label: "1 – 2 crore", range: [10000000, 20000000] },
      { label: "2 crore+", range: [20000000, 50000000] },
    ],
  },

  Rent: {
    min: 0,
    max: 100000,
    step: 1000,
    defaultRange: [10000, 50000],
    presets: [
      { label: "Any price", range: [0, 100000] },
      { label: "Under Rs. 10,000", range: [0, 10000] },
      { label: "Rs. 10k – 25k", range: [10000, 25000] },
      { label: "Rs. 25k – 50k", range: [25000, 50000] },
      { label: "Rs. 50k+", range: [50000, 100000] },
    ],
  },
};

function formatNumber(value) {
  return Number(value).toLocaleString("en-IN");
}

function getInitialRange(selected, config) {
  if (
    Array.isArray(selected) &&
    selected.length === 2 &&
    selected.every((value) => Number.isFinite(Number(value)))
  ) {
    return [Number(selected[0]), Number(selected[1])];
  }

  return [...config.defaultRange];
}

export default function PricePanel({
  listingType = "Buy",
  selected = null,
  onApply,
  onClose,
}) {
  const config = PRICE_CONFIG[listingType] || PRICE_CONFIG.Buy;

  const [range, setRange] = useState(() =>
    getInitialRange(selected, config)
  );

  const [minInput, setMinInput] = useState(String(range[0]));
  const [maxInput, setMaxInput] = useState(String(range[1]));

  useEffect(() => {
    const nextRange = getInitialRange(selected, config);

    setRange(nextRange);
    setMinInput(String(nextRange[0]));
    setMaxInput(String(nextRange[1]));
  }, [selected, config]);

  const histogram = useMemo(
    () => [
      10, 15, 20, 18, 25, 30, 24, 35, 42, 38,
      45, 52, 40, 60, 48, 55, 68, 58, 72, 62,
      80, 66, 75, 55, 68, 48, 60, 42, 50, 36,
      45, 30, 38, 25, 32, 20, 28, 15, 20, 10,
    ],
    []
  );

  function updateRange(index, rawValue) {
    const value = Number(rawValue);

    setRange((current) => {
      const next = [...current];

      if (index === 0) {
        next[0] = Math.min(value, current[1]);
      } else {
        next[1] = Math.max(value, current[0]);
      }

      return next;
    });

    if (index === 0) {
      setMinInput(String(value));
    } else {
      setMaxInput(String(value));
    }
  }

  function commitMinInput() {
    const parsed = Number(minInput);
    const value = Number.isFinite(parsed)
      ? Math.max(config.min, Math.min(parsed, range[1]))
      : range[0];

    setRange([value, range[1]]);
    setMinInput(String(value));
  }

  function commitMaxInput() {
    const parsed = Number(maxInput);
    const value = Number.isFinite(parsed)
      ? Math.min(config.max, Math.max(parsed, range[0]))
      : range[1];

    setRange([range[0], value]);
    setMaxInput(String(value));
  }

  function choosePreset(presetRange) {
    const nextRange = [...presetRange];

    setRange(nextRange);
    setMinInput(String(nextRange[0]));
    setMaxInput(String(nextRange[1]));
  }

  function reset() {
    const nextRange = [config.min, config.max];

    setRange(nextRange);
    setMinInput(String(nextRange[0]));
    setMaxInput(String(nextRange[1]));
  }

  function apply() {
    onApply?.(range);
    onClose?.();
  }

  const leftPercent =
    ((range[0] - config.min) / (config.max - config.min)) * 100;

  const rightPercent =
    ((range[1] - config.min) / (config.max - config.min)) * 100;

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Wallet size={18} className="text-[#7061F5]" />

              <h3 className="text-sm font-semibold text-[#0F0B3D]">
                Price Range
              </h3>
            </div>

            <p className="mt-1 text-xs text-gray-500">
              Set the minimum and maximum price.
            </p>
          </div>

          <button
            type="button"
            onClick={reset}
            className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-gray-500 transition hover:bg-gray-100 hover:text-[#7061F5]"
          >
            <RotateCcw size={13} />
            Reset
          </button>
        </div>

        {/* Selected range */}
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-xs text-gray-500">Selected range</span>

          <span className="text-sm font-semibold text-[#7061F5]">
            Rs. {formatNumber(range[0])} – {formatNumber(range[1])}
          </span>
        </div>

        {/* Histogram */}
        <div className="relative mb-2 flex h-16 items-end gap-[3px] overflow-hidden">
          {histogram.map((height, index) => {
            const barPosition = (index / (histogram.length - 1)) * 100;
            const inSelectedRange =
              barPosition >= leftPercent && barPosition <= rightPercent;

            return (
              <div
                key={index}
                className={`min-w-0 flex-1 rounded-t-sm transition-colors ${
                  inSelectedRange ? "bg-[#7061F5]/60" : "bg-gray-200"
                }`}
                style={{ height: `${height}%` }}
              />
            );
          })}
        </div>

        {/* Dual range slider */}
        <div className="relative mb-5 h-6">
          <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-gray-200" />

          <div
            className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#7061F5]"
            style={{
              left: `${leftPercent}%`,
              width: `${rightPercent - leftPercent}%`,
            }}
          />

          <input
            type="range"
            min={config.min}
            max={config.max}
            step={config.step}
            value={range[0]}
            onChange={(event) => updateRange(0, event.target.value)}
            aria-label="Minimum price"
            className="price-range-slider absolute inset-0 z-20 h-6 w-full cursor-pointer appearance-none bg-transparent"
          />

          <input
            type="range"
            min={config.min}
            max={config.max}
            step={config.step}
            value={range[1]}
            onChange={(event) => updateRange(1, event.target.value)}
            aria-label="Maximum price"
            className="price-range-slider absolute inset-0 z-10 h-6 w-full cursor-pointer appearance-none bg-transparent"
          />
        </div>

        {/* Min and Max inputs */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          <label className="min-w-0">
            <span className="mb-1.5 block text-xs font-medium text-gray-600">
              Minimum price
            </span>

            <div className="flex min-w-0 items-center rounded-xl border border-gray-200 bg-white px-3 focus-within:border-[#7061F5]">
              <span className="mr-1 text-xs text-gray-400">Rs.</span>

              <input
                type="number"
                min={config.min}
                max={config.max}
                step={config.step}
                value={minInput}
                onChange={(event) => setMinInput(event.target.value)}
                onBlur={commitMinInput}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    commitMinInput();
                  }
                }}
                className="w-full min-w-0 bg-transparent py-2.5 text-sm text-[#0F0B3D] outline-none"
              />
            </div>
          </label>

          <label className="min-w-0">
            <span className="mb-1.5 block text-xs font-medium text-gray-600">
              Maximum price
            </span>

            <div className="flex min-w-0 items-center rounded-xl border border-gray-200 bg-white px-3 focus-within:border-[#7061F5]">
              <span className="mr-1 text-xs text-gray-400">Rs.</span>

              <input
                type="number"
                min={config.min}
                max={config.max}
                step={config.step}
                value={maxInput}
                onChange={(event) => setMaxInput(event.target.value)}
                onBlur={commitMaxInput}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    commitMaxInput();
                  }
                }}
                className="w-full min-w-0 bg-transparent py-2.5 text-sm text-[#0F0B3D] outline-none"
              />
            </div>
          </label>
        </div>

        {/* Preset ranges */}
        <div>
          <h4 className="mb-2 text-xs font-semibold text-[#0F0B3D]">
            Popular ranges
          </h4>

          <div className="flex flex-wrap gap-2">
            {config.presets.map((preset) => {
              const isSelected =
                range[0] === preset.range[0] &&
                range[1] === preset.range[1];

              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => choosePreset(preset.range)}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                    isSelected
                      ? "border-[#7061F5] bg-[#7061F5]/10 text-[#7061F5]"
                      : "border-gray-200 bg-white text-gray-600 hover:border-[#7061F5]/50 hover:text-[#7061F5]"
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <PanelFooter
        onReset={reset}
        onApply={apply}
        applyLabel="Apply Price"
      />

      <style>{`
        .price-range-slider {
          pointer-events: none;
          margin: 0;
        }

        .price-range-slider::-webkit-slider-thumb {
          pointer-events: auto;
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          border: 3px solid white;
          background: #7061F5;
          box-shadow: 0 0 0 1px #7061F5;
          cursor: grab;
        }

        .price-range-slider::-moz-range-thumb {
          pointer-events: auto;
          width: 12px;
          height: 12px;
          border-radius: 9999px;
          border: 3px solid white;
          background: #7061F5;
          box-shadow: 0 0 0 1px #7061F5;
          cursor: grab;
        }

        .price-range-slider::-webkit-slider-runnable-track {
          background: transparent;
        }

        .price-range-slider::-moz-range-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}