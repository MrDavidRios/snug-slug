import React from "react";
import { Link } from "react-router-dom";
import SnugSlugLogo from "../../assets/SnugSlugLogo.png";
import { Size } from "../../types/size";

interface HeroProps {
  redirectToHome?: boolean;
  size?: Size;
}

export const Hero: React.FC<HeroProps> = ({ redirectToHome = false, size = Size.Large }) => {
  return (
    <div className={`hero size-${size}`}>
      {redirectToHome ? (
        <Link to="/">
          <img src={SnugSlugLogo} alt="Logo" />
        </Link>
      ) : (
        <img src={SnugSlugLogo} alt="Logo" />
      )}
    </div>
  );
};
