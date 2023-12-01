import { useEffect, useState } from "react";
import { ListingsView } from "../../components/cardList/cardList";
import DatePickerDropdown from "../../components/datePicker/Datepicker";
import { Dropdown } from "../../components/dropdown/Dropdown";
import { Input } from "../../components/input/Input";
import { MapView } from "../../components/mapView/MapView";
import { Listing } from "../../types/listing";
import { useLocation } from "react-router-dom";
import { set } from "firebase/database";

// import { DatePickerDropdown }

// would likely need to introduce states for startdate, end date, min price, max price, and the input
export const Marketplace: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [listings, setListings] = useState<Listing[]>([]);

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

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleMinPriceChange = (selectedOption) => {
    setMinPrice(selectedOption);
  };

  const handleMaxPriceChange = (selectedOption) => {
    setMaxPrice(selectedOption);
  };

  async function fetchSearchResults(
    location,
    minPrice,
    maxPrice,
    startDate,
    endDate
  ) {
    try {
      const response = await fetch(`http://localhost:5000/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: location,
          minPrice: minPrice,
          maxPrice: maxPrice,
          startDate: startDate,
          endDate: endDate,
        }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetching search results failed:", error);
      return [];
    }
  }

  useEffect(() => {
    if (query.get("query")) {
      setLocation(query.get("query"));
    }
    if (query.get("minPrice")) {
      setMinPrice(query.get("minPrice"));
    }
    if (query.get("maxPrice")) {
      setMaxPrice(query.get("maxPrice"));
    }
    if (query.get("startDate")) {
      setStartDate(query.get("startDate"));
    }
    if (query.get("endDate")) {
      setEndDate(query.get("endDate"));
    }

    fetchSearchResults(location, minPrice, maxPrice, startDate, endDate).then(
      (data) => {
        setListings(data);
      }
    );
  }, [location, minPrice, maxPrice, startDate, endDate]);

  return (
    <div id="marketplacePageWrapper">
      {/* // Need to separate the map and listing cards into two separate containers so that the listings one is scrollable */}
      <div id="marketPlaceSearchBar">
        <Input
          value={location}
          onChange={handleInputChange}
          placeholder="Search..."
        />

        <Dropdown
          options={priceOptions}
          defaultOption="Min Price"
          onChange={handleMinPriceChange}
        />
        <Dropdown
          options={priceOptions}
          defaultOption="Max Price"
          onChange={handleMaxPriceChange}
        />

        <DatePickerDropdown />
        <div id="advancedSearch">Advanced search</div>
        {/* Need to update the above to also render additional search criteria */}
      </div>
      <div id="cardsAndMap">
        <div id="listingsContainer">
          <ListingsView listings={listings} />
        </div>
        <div id="mapContainer">
          <div id="map">
            <MapView></MapView>
          </div>
        </div>
      </div>
    </div>
  );
};
