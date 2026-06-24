import { ChevronDown } from "lucide-react";
import type { SelectHTMLAttributes } from "react";

interface SelectOptionProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

const CustomSelect = ({
  label,
  options,
  ...props
}: SelectOptionProps) => (
  <div className="mt-4 mb-2 text-left relative">
    <select
      {...props}
      className={`w-full p-4 border rounded-sm transition-all duration-300 focus:ring-2 focus:ring-[#2C3E50] focus:outline-none appearance-none ${
        props.value ? "border-[#2C3E50]" : "border-gray-300"
      }`}
    >
      <option value=""/>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
      <ChevronDown size={20} />
    </span>
    <label
        className={`absolute text-lg font-medium left-4 text-[#2C3E50] px-1 transition-all duration-300 transform ${
          props.value
          ? "bg-white -top-2.5 text-[#2C3E50] text-sm"
          : "top-4 text-gray-500 text-base"
      }`}
    >
      {label}
    </label>
  </div>
);

export default CustomSelect;
