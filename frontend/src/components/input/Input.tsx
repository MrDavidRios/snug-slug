import React from "react";

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  style?: React.CSSProperties;
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  style, 
}) => {
  return (
    <input
      className="input-box"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={style} // Apply the style here
    ></input>
  );
};
