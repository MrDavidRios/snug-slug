import { useState } from "react";
import { ListingCard } from "../../components/apartmentCard/ListingCard";
import { Button } from "../../components/button/Button";
import { DetailedListing } from "../../components/detailedListing/DetailedListing";
import { sampleListing } from "../../utils/inboxtestdata";

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
