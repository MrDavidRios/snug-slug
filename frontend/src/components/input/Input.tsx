import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ value, onChange, placeholder, style }) => {
  return (
    <input
      className="input-box"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={style}
    />
  );
};
