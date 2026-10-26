import { RotateCcw } from "lucide-react";

export default function PanelFooter({
    onReset,
    onApply,
    applyLabel="Apply" //fallback value
}){

    return(
        <div className="flex items-center justify-between gap-3 border-t border-gray-100 bg-gray-50/70 p-4">
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-[#0F0B3D]"
      >
        <RotateCcw size={15} />
        Reset
      </button>

      <button
        type="button"
        onClick={onApply}
        className="rounded-lg bg-[#6C5CE7] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5A4BD1] focus:outline-none focus:ring-2 focus:ring-[#6C5CE7] focus:ring-offset-2"
      >
        {applyLabel}
      </button>
    </div>
    )
}