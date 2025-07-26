import React from "react";

const LabeledInput: React.FC<LabeledInputProps> = ({
  value,
  onChange,
  placeholder,
  size = "chapter",
}) => {
  const sizeClass =
    size === "title" ? "text-xl border-gray-300" : "text-lg border-gray-200";

  return (
    <input
      className={`w-full p-2 border-b ${sizeClass}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
};

export default LabeledInput;
