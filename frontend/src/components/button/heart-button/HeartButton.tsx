import React, { useState } from "react";

interface HeartButtonProps {
  onChange: (liked: boolean) => void;
}

export const HeartButton: React.FC<HeartButtonProps> = ({ onChange }) => {
  const [isLiked, setIsLiked] = useState(false);
  const heartColor = isLiked ? "#FF0000" : "#BDBDBD";

  return (
    <div
      className="heart"
      onClick={() => {
        setIsLiked(!isLiked);
        onChange(!isLiked);
      }}
    >
      {/* Heart icon */}
      <svg width="40" height="40" viewBox="0 0 55 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.9055 13.3268L27.5493 27.9707L42.1932 13.3268"
          stroke={heartColor}
          strokeWidth="25.4675"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
