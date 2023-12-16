import React from "react";

interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  style?: React.CSSProperties;
}

export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder,
  style, 
}) => {
  return (
    <textarea
      className="textArea"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={style} // Apply the style here
    ></textarea>
  );
};
