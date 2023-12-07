import React from "react";

interface ConfirmButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({ onClick }) => {
  return (
    <button className="icon-button lg" style={{ padding: 6 }} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 33 27" fill="none">
        <path d="M29 3.75L10.25 22.5L4 16.25" stroke="#9BDDFF" stroke-width="5.30223" stroke-linecap="square" />
      </svg>
    </button>
  );
};
