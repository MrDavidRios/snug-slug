import { useState } from "react";
import { ListingCard } from "../../components/apartmentCard/ListingCard";
import { Button } from "../../components/button/Button";
import { DetailedListing } from "../../components/detailedListing/DetailedListing";
import { Listing } from "../../types/listing";

const sampleListing: Listing = {
  location: "123 Main St, Anytown, USA",
  overview:
    "Beautiful 2-bedroom apartment in the heart of the city with a scenic city view, available for immediate occupancy.",
  details: [
    "2 bedrooms, 2 full baths",
    "Fully equipped modern kitchen",
    "Spacious living room with balcony access",
    "In-unit washer and dryer",
    "Central air conditioning",
  ],
  requirements: [
    "No smoking",
    "Credit check required",
    "Minimum 1-year lease",
    "Security deposit and first month’s rent due at signing",
  ],
  additionalInfo: [
    "Pet-friendly building (up to 25 lbs)",
    "24-hour concierge service",
    "Fitness center and swimming pool on premises",
    "Dedicated parking spot in underground garage",
    "Storage unit included",
  ],
  tags: ["city view", "modern", "pet-friendly", "gym", "parking"],
  dates: "Available from June 1, 2023, to June 1, 2024",
  rent: 2500,
  apartmentImgUrls: [
    "https://example.com/images/apartment1.jpg",
    "https://example.com/images/apartment2.jpg",
    "https://example.com/images/apartment3.jpg",
  ],
};

export const ListingPage: React.FC = () => {
  const [showDetailedListing, setShowDetailedListing] = useState(false);

  return (
    <div id="listingPageWrapper">
      <div className="action-bar">
        <h4>ACTIVE LISTING</h4>
        <div>
          <Button text="Archive" className="secondary" />
          <Button text="Archived Listings" className="secondary" />
          <Button text="Edit Listing" className="action" />
        </div>
      </div>
      <div>
        <ListingCard listing={sampleListing} onClick={() => setShowDetailedListing(true)} locationIndex={0} />
      </div>
      {showDetailedListing && <DetailedListing listing={sampleListing} onClose={() => setShowDetailedListing(false)} />}
    </div>
  );
};
