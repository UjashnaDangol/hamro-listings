
import { ChevronDown } from "lucide-react";

export default function FilterField({
  label,
  value,
  active = false,
  onClick,
  icon,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={active}
      className={`flex min-w-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition ${
        active
          ? "border-[#6C5CE7] bg-purple-50"
          : "border-gray-200 bg-white hover:border-[#6C5CE7]"
      }`}
    >
      {icon && (
        <span className="shrink-0 text-[#6C5CE7]">
          {icon}
        </span>
      )}

      <span className="min-w-0 flex-1">
        <span className="block text-xs text-gray-500">
          {label}
        </span>

        <span className="block truncate text-sm font-medium text-[#0F0B3D]">
          {value}
        </span>
      </span>

      <ChevronDown
        size={16}
        className={`shrink-0 text-gray-500 transition-transform ${
          active ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}
