import React from "react";
import { Link } from "react-router-dom";
import SnugSlugLogo from "../../assets/Logo.png";
import { Size } from "../../types/size";

interface HeroProps {
  redirectToHome?: boolean;
  size?: Size;
  vertical?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ redirectToHome = false, size = Size.Large, vertical = false }) => {
  return (
    <>
      {redirectToHome ? (
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <HeroContents size={size} vertical={vertical} />
        </Link>
      ) : (
        <HeroContents size={size} vertical={vertical} />
      )}
    </>
  );
};

const HeroContents: React.FC<{ size?: Size; vertical?: boolean }> = ({ size = Size.Large, vertical = false }) => {
  return (
    <div className={`hero size-${size} ${vertical ? "vertical" : ""}`}>
      <img src={SnugSlugLogo} alt="Logo" />

      {/* Different heading sizes */}
      {size === Size.Large && <h1>Snug Slug</h1>}
      {size === Size.Medium && <h2>Snug Slug</h2>}
      {size === Size.Small && <h3>Snug Slug</h3>}
    </div>
  );
};
