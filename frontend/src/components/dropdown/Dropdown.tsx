import React, { useEffect, useRef, useState } from "react";
import clearIcon from "../../assets/clear.svg";
import dropdownArrow from "../../assets/dropdown-arrow.svg";

type DropdownProps = {
  options: string[];
  defaultSelection?: string;
  placeholder: string;
  onChange: (selectedOption: string) => void;
};

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder,
  defaultSelection,
  onChange,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    defaultSelection
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  const clearOption = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setSelectedOption(undefined);
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
        {selectedOption !== undefined ? (
          <>
            {selectedOption}
            <span className="icon-wrapper" onClick={(e) => clearOption(e)}>
              <img src={clearIcon} alt="Clear selection" />
            </span>
          </>
        ) : (
          <>
            {placeholder}
            <span className="icon-wrapper" onClick={() => setIsOpen(!isOpen)}>
              <img src={dropdownArrow} alt="Open dropdown" />
            </span>
          </>
        )}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, idx) => (
            <div className="option-container" key={idx}>
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
