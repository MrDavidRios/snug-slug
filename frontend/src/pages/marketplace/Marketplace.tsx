import { useState } from "react";
import { ListingsView } from "../../components/cardList/cardList";
import { DetailedListing } from "../../components/detailedListing/DetailedListing";
import { Listing } from "../../types/listing";

const sampleListings: Listing[] = [
  {
    location: "76th Street, Upper West Side",
    description: "1 Bedroom in a 3 Bedroom suite",
    features: ["In-unit washer", "Dog friendly"],
    dates: "May 15 - Aug 31",
    rent: 1500,
    apartmentImgUrl: "src/assets/apartment.png",
  },
  {
    location: "76th Street, Upper West Side",
    description: "1 Bedroom in a 3 Bedroom suite",
    features: ["In-unit washer", "Dog friendly"],
    dates: "May 15 - Aug 31",
    rent: 1500,
    apartmentImgUrl: "src/assets/apartment.png",
  },
  {
    location: "76th Street, Upper West Side",
    description: "1 Bedroom in a 3 Bedroom suite",
    features: ["In-unit washer", "Dog friendly"],
    dates: "May 15 - Aug 31",
    rent: 1500,
    apartmentImgUrl: "src/assets/apartment.png",
  },
  {
    location: "76th Street, Upper West Side",
    description: "1 Bedroom in a 3 Bedroom suite",
    features: ["In-unit washer", "Dog friendly"],
    dates: "May 15 - Aug 31",
    rent: 1500,
    apartmentImgUrl: "src/assets/apartment.png",
  },
];

export const Marketplace: React.FC = () => {
  const [showDetailedListing, setShowDetailedListing] = useState(false);

  return (
    <div id="marketplacePageWrapper">
      <ListingsView listings={sampleListings} />
      {showDetailedListing && (
        <DetailedListing listing={sampleListings[0]} onClose={() => setShowDetailedListing(false)} />
      )}
      <button onClick={() => setShowDetailedListing(true)}>Test show detailed listing</button>
    </div>
  );
};
