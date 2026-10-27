
export default function FilterField({
  label,
  value,
  active = false,
  onClick,
  icon: Icon,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={active}
      className={`w-full min-w-0 rounded-xl border bg-white px-3 py-3 text-left transition ${
        active
          ? "border-[#7061F5] ring-2 ring-[#7061F5]/10"
          : "border-gray-200 hover:border-[#7061F5]/50"
      }`}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        {Icon && (
          <Icon
            size={18}
            className="shrink-0 text-[#7061F5]"
            aria-hidden="true"
          />
        )}

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-gray-500">
            {label}
          </p>

          <p className="truncate text-sm font-semibold text-[#0F0B3D]">
            {value}
          </p>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 text-gray-400 transition-transform ${
            active ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </button>
  );
}
