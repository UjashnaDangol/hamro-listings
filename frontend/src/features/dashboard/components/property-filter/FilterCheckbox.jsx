
export default function FilterCheckbox({
  checked = false,
  onChange,
  label,
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-[#0F0B3D]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange?.(event.target.checked)
        }
        className="h-4 w-4 accent-[#6C5CE7]"
      />

      <span>{label}</span>
    </label>
  );
}
