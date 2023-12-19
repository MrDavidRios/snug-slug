import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext, UserContextType } from "../../components/UserContext";
import { ListingCard } from "../../components/apartmentCard/ListingCard";
import { Button } from "../../components/button/Button";
import { DetailedListing } from "../../components/detailedListing/DetailedListing";
import { Listing } from "../../types/listing";
import { getActiveListing } from "../../utils/listingDataHelper";

export const ListingPage: React.FC = () => {
  const [showDetailedListing, setShowDetailedListing] = useState(false);
  const { slug } = useContext(UserContext) as UserContextType;

  const [activeListing, setActiveListing] = useState<Listing | undefined>(undefined);

  useEffect(() => {
    const updateActiveListing = async () => {
      if (!slug) return;

      setActiveListing(await getActiveListing(slug!.id));
    };

    updateActiveListing();
  }, [slug]);

  console.log(activeListing);

  return (
    <div id="listingPageWrapper">
      <div className="action-bar">
        <h4>ACTIVE LISTING</h4>
        <div>
          <Button text="Archive" className="secondary" />
          <Button text="Archived Listings" className="secondary" />
          {activeListing ? (
            <Button text="Edit Listing" className="action" />
          ) : (
            <Link to="/listing-creation">
              <Button text="Create Listing" className="action" />
            </Link>
          )}
        </div>
      </div>
      <div>
        {activeListing ? (
          <ListingCard listing={activeListing} onClick={() => setShowDetailedListing(true)} locationIndex={-1} />
        ) : (
          <p>No active listing.</p>
        )}
      </div>
      {showDetailedListing && activeListing && (
        <DetailedListing listing={activeListing} onClose={() => setShowDetailedListing(false)} />
      )}
    </div>
  );
};
