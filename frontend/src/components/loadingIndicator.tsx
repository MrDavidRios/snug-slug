import React from "react";
import { BeatLoader } from "react-spinners";

export const LoadingIndicator: React.FC = () => {
  return <BeatLoader color="var(--accent-color)" />;
};
