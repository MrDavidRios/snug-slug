import React from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({ onClick, text, className, style }) => {
  return (
    <button className={`button ${className}`} onClick={onClick} style={style}>
      {text}
    </button>
  );
};
