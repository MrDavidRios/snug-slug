import { Button } from "../../components/button/Button";
import { DatePickerDropdown } from "../../components/datePickerDropdown/DatePickerDropdown";
import { Dropdown } from "../../components/dropdown/Dropdown";
import { Hero } from "../../components/hero/Hero";
import { Input } from "../../components/input/Input";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getYMDString } from "../../utils/datefunctions";

export const Homepage: React.FC = () => {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [startDate, setStartDate] = useState(getYMDString(new Date()));
  const [endDate, setEndDate] = useState(getYMDString(new Date()));

  // Need to define the dropdown props

  // Likely need to pass in props - all listings

  // Function to generate price options
  const generatePriceOptions = () => {
    const options = [];
    for (let i = 0; i <= 9999; i += 100) {
      // Change 100 to your desired increment
      options.push(`$${i}`);
    }
    return options;
  };

  const priceOptions = generatePriceOptions();

  // Functions to handle input change

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleMinPriceChange = (selectedOption: string) => {
    setMinPrice(selectedOption);
  };

  const handleMaxPriceChange = (selectedOption: string) => {
    setMaxPrice(selectedOption);
  };

  const navigate = useNavigate();

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(
      `/marketplace?query=${location}&minPrice=${minPrice}&maxPrice=${maxPrice}&startDate=${startDate}&endDate=${endDate}`
    );
  };

  return (
    <div id="homepageWrapper">
      <Hero vertical={true} />
      <p className="italics" style={{ padding: 10 }}>
        The trusted subleasing platform for our Columbia University community.
      </p>
      <div id="homepageSearch">
        <div id="searchWrapper">
          <Input value={location} onChange={handleInputChange} placeholder="Search location..." />
          <Button onClick={handleSearch} text="Search" />
        </div>
        <div id="searchOptions">
          <Dropdown options={priceOptions} placeholder="Min Price" onChange={handleMinPriceChange} />
          <Dropdown options={priceOptions} placeholder="Max Price" onChange={handleMaxPriceChange} />

          <DatePickerDropdown
            startDate={new Date(startDate)}
            endDate={new Date(endDate)}
            onChange={(e) => {
              setStartDate(getYMDString(e.startDate));
              setEndDate(getYMDString(e.endDate));
            }}
          />
        </div>
        <div id="advancedSearch">Advanced search</div>
        {/* Need to update the above to also render additional search criteria */}
      </div>
    </div>
  );
};
