import React from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      className="input-box"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    ></input>
  );
};
