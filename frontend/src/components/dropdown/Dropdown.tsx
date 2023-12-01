import React, { useEffect, useRef, useState } from "react";
import clearIcon from "../../assets/clear.svg";
import dropdownArrow from "../../assets/dropdown-arrow.svg";

type DropdownProps = {
  options: string[];
  defaultOption: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Dropdown: React.FC<DropdownProps> = ({ options, defaultOption, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const clearOption = (event: React.MouseEvent<HTMLElement>) => {
    if (selectedOption !== defaultOption) {
      setSelectedOption(defaultOption);
    }

    event.stopPropagation();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
            <img src={clearIcon} alt="Clear selection" />
          </span>
        ) : (
          <span className="icon-wrapper" onClick={() => setIsOpen(!isOpen)}>
            <img src={dropdownArrow} alt="Open dropdown" />
          </span>
        )}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, idx) => (
            <div className="option-container" key={idx}>
              <li className="dropdown-item" key={option} onClick={() => handleOptionClick(option)}>
                {option}
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
