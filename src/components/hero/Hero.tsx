import React from "react";
import SnugSlugLogo from "../../assets/SnugSlugLogo.png";
import { Size } from "../../types/size";

interface HeroProps {
  size?: Size;
}

export const Hero: React.FC<HeroProps> = ({ size = Size.Large }) => {
  return (
    <div className={`hero size-${size}`}>
      <img src={SnugSlugLogo} alt="Logo" />
    </div>
  );
};
