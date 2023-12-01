import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { ListingsView } from "../../components/cardList/cardList";
import { DatePickerDropdown } from "../../components/datePickerDropdown/DatePickerDropdown";
import { Dropdown } from "../../components/dropdown/Dropdown";
import { Input } from "../../components/input/Input";
import { MapView } from "../../components/mapView/MapView";
import { Listing } from "../../types/listing";
import { getYMDString } from "../../utils/datefunctions";

export const Marketplace: React.FC = () => {
  const searchStr = useLocation().search;
  const query = new URLSearchParams(searchStr);

  const [location, setLocation] = useState(query.get("query") || "");
  const [minPrice, setMinPrice] = useState(query.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(query.get("maxPrice") || "");
  const [startDate, setStartDate] = useState(query.get("startDate") || getYMDString(new Date()));
  const [endDate, setEndDate] = useState(query.get("endDate") || getYMDString(new Date()));

  const [listings, setListings] = useState<Listing[]>([]);

  // Only fetch listings based on query parameters on page load
  useEffect(() => {
    fetchSearchResults(location, minPrice, maxPrice, startDate, endDate).then((data) => {
      console.log("Listings loaded!!", data);

      setListings(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generatePriceOptions = () => {
    const options = [];
    for (let i = 0; i <= 9999; i += 100) {
      // Change 100 to your desired increment
      options.push(`$${i}`);
    }
    return options;
  };

  const priceOptions = generatePriceOptions();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleMinPriceChange = (selectedOption: string) => {
    setMinPrice(selectedOption);
  };

  const handleMaxPriceChange = (selectedOption: string) => {
    setMaxPrice(selectedOption);
  };

  async function fetchSearchResults(
    location: string,
    minPrice: string,
    maxPrice: string,
    startDate: string,
    endDate: string
  ) {
    console.log("Start and end date: ", startDate, endDate);

    try {
      const response = await fetch(`http://localhost:5000/api/search`, {
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

  return (
    <div id="marketplacePageWrapper">
      {/* // Need to separate the map and listing cards into two separate containers so that the listings one is scrollable */}
      <div id="marketPlaceSearchBar">
        <Input value={location} onChange={handleInputChange} placeholder="Search..." />

        <Dropdown
          options={priceOptions}
          placeholder="Min Price"
          defaultSelection={minPrice}
          onChange={handleMinPriceChange}
        />
        <Dropdown
          options={priceOptions}
          placeholder="Max Price"
          defaultSelection={maxPrice}
          onChange={handleMaxPriceChange}
        />

        <DatePickerDropdown
          startDate={new Date(startDate)}
          endDate={new Date(endDate)}
          onChange={(e) => {
            setStartDate(getYMDString(e.startDate));
            setEndDate(getYMDString(e.endDate));
          }}
        />
        <Button
          onClick={() =>
            fetchSearchResults(location, minPrice, maxPrice, startDate, endDate).then((data) => setListings(data))
          }
          text="Search"
          className="action"
        />
        <div id="advancedSearch">Advanced search</div>
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
