import React from "react";
import homeIcon from "../../assets/home.svg";
import personIcon from "../../assets/person.svg";

interface LookingForToggleProps {
  lookingForApartment: boolean;
  onChange: (lookingForApartment: boolean) => void;
}

export const LookingForToggle: React.FC<LookingForToggleProps> = ({ lookingForApartment, onChange }) => {
  return (
    <div className="looking-for-toggle-wrapper">
      <div className={`selected-rectangle-overlay ${lookingForApartment ? "left" : "right"}`}></div>
      <button
        className={`${lookingForApartment ? "selected" : ""}`}
        onClick={() => {
          onChange(true);
        }}
      >
        <img src={homeIcon} />
        <p>Apartment</p>
      </button>
      <button
        className={`${!lookingForApartment ? "selected" : ""}`}
        onClick={() => {
          onChange(false);
        }}
      >
        <img src={personIcon} />
        <p>Person</p>
      </button>
    </div>
  );
};
