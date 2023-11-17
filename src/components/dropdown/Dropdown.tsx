import React, { useState, useRef, useEffect } from "react";
import DropdownArrow from "../../assets/dropdown-arrow.svg";
import ClearButton from "../../assets/clear.svg";

type DropdownProps = {
  options: string[];
  defaultOption: string;
};

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  defaultOption,
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownIcon, setDropdownIcon] = useState(DropdownArrow);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    setDropdownIcon(ClearButton);
  };

  const clearOption = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (selectedOption !== defaultOption) {
      setSelectedOption(defaultOption);
      setDropdownIcon(DropdownArrow);
    }

    event.stopPropagation();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}

        {selectedOption !== defaultOption ? (
          <span className="icon-wrapper" onClick={(e) => clearOption(e)}>
            <img src={ClearButton} alt="Clear icon" />
          </span>
        ) : (
          <span className="icon-wrapper" onClick={() => setIsOpen(!isOpen)}>
            <img src={dropdownIcon} alt="Dropdown icon" />
          </span>
        )}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <div className="option-container">
              <li
                className="dropdown-item"
                key={option}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
