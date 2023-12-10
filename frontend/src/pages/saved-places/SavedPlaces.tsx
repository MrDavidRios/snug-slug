import { useEffect, useState } from "react";
import { ListingsView } from "../../components/listingsView/ListingsView";
import { MapView } from "../../components/mapView/MapView";
import { Listing } from "../../types/listing";
import { savedListingsListener } from "../../utils/savedlistingslistener";

export const SavedPlaces: React.FC = () => {
  const savedListingsFromStorage = localStorage.getItem("savedListings");
  const [savedListings, setSavedListings] = useState<Listing[]>(JSON.parse(savedListingsFromStorage || "[]"));

  // Update saved listings in local storage whenever savedListings changes in local storage
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(savedListingsListener(setSavedListings), []);

  return (
    <div id="savedPlacesPageWrapper">
      {/* // Need to separate the map and listing cards into two separate containers so that the listings one is scrollable */}
      <div className="listings-and-map-page">
        <div className="listings-container">
          {savedListings.length > 0 ? (
            <ListingsView listings={savedListings} />
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
    </div>
  );
};
