import React from "react";
import './hero.scss';
import SnugSlugLogo from "../../assets/SnugSlugLogo.png";

export const Hero: React.FC = () => {
  return (
    <div className="hero">
      <img src = {SnugSlugLogo} alt = "Logo"/>
    </div>
  );
};
