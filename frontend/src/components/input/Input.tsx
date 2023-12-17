import React, { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  numbersOnly?: boolean;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  style,
  numbersOnly = false,
  maxLength,
}) => {
  const [finalValue, setValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!numbersOnly || newValue.match(/^\d*$/)) {
      setValue(newValue);
    }
  };

  return (
    <input
      className="input-box"
      type="text"
      value={finalValue}
      maxLength={maxLength}
      onChange={(e) => {
        handleChange(e);
        onChange?.(e);
      }}
      placeholder={placeholder}
      style={style}
    />
  );
};
