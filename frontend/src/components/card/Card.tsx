import React, { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ children, className, id }) => {
  return (
    <div className={`card ${className}`} id={id}>
      {children}
    </div>
  );
};
