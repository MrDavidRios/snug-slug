import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../../components/UserContext";
import { DetailedListing } from "../../components/detailedListing/DetailedListing";
import { ListingsView } from "../../components/listingsView/ListingsView";
import { MapView } from "../../components/mapView/MapView";
import { Listing } from "../../types/listing";
import { getSavedListings } from "../../utils/listingDataHelper";

export const SavedPlaces: React.FC = () => {
  const [savedListings, setSavedListings] = useState<Listing[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | undefined>(undefined);

  const { slug } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    const updateSavedListings = async () => {
      if (!slug) return;

      setSavedListings(await getSavedListings(slug.id));
    };

    updateSavedListings();
  }, [slug]);

  return (
    <div id="savedPlacesPageWrapper">
      {/* // Need to separate the map and listing cards into two separate containers so that the listings one is scrollable */}
      <div className="listings-and-map-page">
        <div className="listings-container">
          {savedListings.length > 0 ? (
            <ListingsView
              listings={savedListings}
              onSelectListing={(listing) => setSelectedListing(listing)}
              hideIfUnliked={true}
            />
          ) : (
            <p id="emptyListText">It's lonely here. Go find some places!</p>
          )}
        </div>
        <div className="map-container">
          <div>
            <MapView></MapView>
          </div>
        </div>
      </div>
      {selectedListing && <DetailedListing listing={selectedListing} onClose={() => setSelectedListing(undefined)} />}
    </div>
  );
};
