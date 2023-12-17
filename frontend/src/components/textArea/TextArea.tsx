import React from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea: React.FC<TextAreaProps> = ({ value, onChange, placeholder, style }) => {
  return (
    <textarea
      className="text-area"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={style} // Apply the style here
    />
  );
};
