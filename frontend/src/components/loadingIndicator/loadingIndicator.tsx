import React from "react";
import { BeatLoader } from "react-spinners";

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="loading-indicator">
      <BeatLoader color="var(--accent-color)" />
    </div>
  );
};
