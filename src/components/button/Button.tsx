import React from "react";

type ButtonProps = {
  onClick: () => void;
  text: string;
};

export const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};