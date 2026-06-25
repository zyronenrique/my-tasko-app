import type { InputHTMLAttributes } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const CustomInput = ({
  label,
  value,
  className = "",
  ...props
}: CustomInputProps) => {
  return (
    <div className="mt-4 mb-2 text-left relative">
      <input
        {...props}
        value={value}
        placeholder=" "
        className={`w-full p-4 border rounded-sm transition-all duration-300 focus:ring-2 focus:ring-[#2C3E50] focus:outline-none ${
          value ? "border-[#2C3E50]" : "border-gray-300"
        } ${className}`}
      />
      <label
        className={`absolute left-4 px-1 transition-all duration-300 ${
          value
            ? "bg-white -top-2.5 text-sm text-[#2C3E50]"
            : "top-4 text-base text-gray-500"
        }`}
      >
        {label === "Due Date" && value ? label : ""}
      </label>
    </div>
  );
};

export default CustomInput;
