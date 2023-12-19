import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { UserContext, UserContextType } from "../../components/UserContext";
import { Button } from "../../components/button/Button";
import { DatePickerDropdown } from "../../components/datePickerDropdown/DatePickerDropdown";
import { DetailedListing } from "../../components/detailedListing/DetailedListing";
import { Dropdown } from "../../components/dropdown/Dropdown";
import { Input } from "../../components/input/Input";
import { ListingsView } from "../../components/listingsView/ListingsView";
import { MapView } from "../../components/mapView/MapView";
import { Modal } from "../../components/modal/Modal";
import { Listing } from "../../types/listing";
import { getYMDString } from "../../utils/datefunctions";

export const Marketplace: React.FC = () => {
  const searchStr = useLocation().search;
  const query = new URLSearchParams(searchStr);

  // if min price doesn't have $, add it (prevents bug where dropdown doesn't show dollar sign on load)
  let queryMinPrice = query.get("minPrice");
  let queryMaxPrice = query.get("maxPrice");

  if (queryMinPrice && !queryMinPrice.startsWith("$")) {
    queryMinPrice = `$${queryMinPrice}`;
  }

  if (queryMaxPrice && !queryMaxPrice.startsWith("$")) {
    queryMaxPrice = `$${queryMaxPrice}`;
  }

  const { slug } = useContext(UserContext) as UserContextType;

  const [location, setLocation] = useState(query.get("location") || "");
  const [minPrice, setMinPrice] = useState(queryMinPrice || "$0");
  const [maxPrice, setMaxPrice] = useState(queryMaxPrice || "$9900");
  const [startDate, setStartDate] = useState(query.get("startDate") || "");
  const [endDate, setEndDate] = useState(query.get("endDate") || "");

  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | undefined>(undefined);

  const [searchParams, setSearchParams] = useSearchParams();

  // Only fetch listings based on query parameters on page load
  useEffect(() => {
    const loadFromQueryParams = async () => {
      const params = new URLSearchParams(window.location.search);
      const location = params.get("location");
      const minPrice = params.get("minPrice");
      const maxPrice = params.get("maxPrice");
      const startDate = params.get("startDate");
      const endDate = params.get("endDate");

      const parsedMinPrice = minPrice?.replace("$", "") || 0;
      const parsedMaxPrice = maxPrice?.replace("$", "") || 9900;

      const response = await fetch(
        `http://127.0.0.1:8080/api/snugslug/searchListing?location=${location}&minPrice=${parsedMinPrice}&maxPrice=${parsedMaxPrice}&startDate=${startDate}&endDate=${endDate}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setListings(data);
    };

    loadFromQueryParams();
  }, [searchParams]);

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

  const handleSearch = () => {
    searchParams.set("location", location);
    searchParams.set("minPrice", minPrice);
    searchParams.set("maxPrice", maxPrice);
    searchParams.set("startDate", startDate);
    searchParams.set("endDate", endDate);

    setSearchParams(searchParams);
  };

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
          startDate={startDate === "" ? null : new Date(startDate)}
          endDate={endDate === "" ? null : new Date(endDate)}
          placeholder="Select Dates"
          onChange={(e) => {
            setStartDate(getYMDString(e.startDate));
            setEndDate(getYMDString(e.endDate));
          }}
        />
        <Button onClick={handleSearch} text="Search" className="action" />
        <div id="advancedSearch">Advanced search</div>
      </div>
      <div className="listings-and-map-page">
        <div className="listings-container">
          <ListingsView listings={listings} onSelectListing={(listing) => setSelectedListing(listing)} />
        </div>
        <div className="map-container">
          <div>
            <MapView></MapView>
          </div>
        </div>
      </div>
      {selectedListing && (
        <>
          {slug ? (
            <DetailedListing
              listing={selectedListing}
              onClose={() => setSelectedListing(undefined)}
              inMarketplace={true}
            />
          ) : (
            <Modal style={{ padding: "0 40px 40px 40px" }} onClose={() => setSelectedListing(undefined)}>
              <h3>Log in to view</h3>
              <br />
              <p>Log in to save a listing or view listing in more detail!</p>
              <Link to="/login">
                <Button text="Log in" className="action" style={{ marginTop: 32 }} />
              </Link>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};
