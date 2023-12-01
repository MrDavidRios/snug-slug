import { useState } from "react";
import { ListingsView } from "../../components/cardList/cardList";
import { Listing } from "../../types/listing";
import { MapView } from "../../components/mapView/MapView";
import { Input } from "../../components/input/Input";
import { Dropdown } from "../../components/dropdown/Dropdown";
import DatePickerDropdown from "../../components/datePicker/Datepicker";

// import { DatePickerDropdown }

const sampleListings: Listing[] = [
  {
    location: "76th Street, Upper West Side",
    overview: "1 Bedroom in a 3 Bedroom suite",
    details: ["In-unit washer", "Dog friendly"],
    tags: ["In-unit washer", "Dog friendly"],
    requirements: ["No smoking", "Interview required"],
    additionalInfo: ["Pets allowed"],
    dates: "May 15 - Aug 31",
    rent: 1500,
    apartmentImgUrls: [
      "src/assets/apartment.png",
      "https://www.apartments.com/blog/sites/default/files/styles/x_large_hq/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg?itok=kQmw64UU",
      "https://cdn.vox-cdn.com/thumbor/zVuv0s-NzoqRQef_zb91-X8sT88=/0x0:1800x1168/1200x800/filters:focal(733x429:1021x717)/cdn.vox-cdn.com/uploads/chorus_image/image/63048549/logan_apartments.6.jpg",
      "https://www.interiorzine.com/wp-content/uploads/2017/11/50-ways-to-make-a-small-space-more-livable.jpg",
    ],
  },
  {
    location: "76th Street, Upper West Side",
    overview: "1 Bedroom in a 3 Bedroom suite",
    details: ["In-unit washer", "Dog friendly"],
    tags: ["In-unit washer", "Dog friendly"],
    requirements: ["No smoking", "Interview required"],
    additionalInfo: ["Pets allowed"],
    dates: "May 15 - Aug 31",
    rent: 1500,
    apartmentImgUrls: ["src/assets/apartment.png"],
  },
  {
    location: "76th Street, Upper West Side",
    overview: "1 Bedroom in a 3 Bedroom suite",
    details: ["In-unit washer", "Dog friendly"],
    tags: ["In-unit washer", "Dog friendly"],
    requirements: ["No smoking", "Interview required"],
    additionalInfo: ["Pets allowed"],
    dates: "May 15 - Aug 31",
    rent: 1500,
    apartmentImgUrls: ["src/assets/apartment.png"],
  },
  {
    location: "76th Street, Upper West Side",
    overview: "1 Bedroom in a 3 Bedroom suite",
    details: ["In-unit washer", "Dog friendly"],
    tags: ["In-unit washer", "Dog friendly"],
    requirements: ["No smoking", "Interview required"],
    additionalInfo: ["Pets allowed"],
    dates: "May 15 - Aug 31",
    rent: 1500,
    apartmentImgUrls: ["src/assets/apartment.png"],
  },
];



// would likely need to introduce states for startdate, end date, min price, max price, and the input
export const Marketplace: React.FC = () => {

  // States
  const [searchInput, setSearchInput] = useState("");
  
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Need to define the dropdown props

  // Likely need to pass in props - all listings

  // Function to generate price options
  const generatePriceOptions = () => {
    const options = [];
    for (let i = 0; i <= 9999; i += 100) { // Change 100 to your desired increment
      options.push(`$${i}`);
    }
    return options;
  };

  const priceOptions = generatePriceOptions()

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

  return (
    <div id="marketplacePageWrapper">
      {/* // Need to separate the map and listing cards into two separate containers so that the listings one is scrollable */}
      <div id="cardsAndMap">
        <div id="listingsContainer">
          <div id="marketPlaceSearchBar">
          <Input value={searchInput} onChange={handleInputChange} placeholder = "Search..." />
          <Dropdown options={priceOptions} defaultOption="Min Price" onChange={handleMinPriceChange}/>
          <Dropdown options={priceOptions} defaultOption="Max Price" onChange={handleMaxPriceChange}/>

          <DatePickerDropdown/> 
          <div id="advancedSearch">Advanced search</div>
          </div>
          <ListingsView listings={sampleListings} />
        </div>
        <div id="mapContainer">
          <div id="map"><MapView></MapView></div>
        </div>
      </div>
    </div>
  );
};
