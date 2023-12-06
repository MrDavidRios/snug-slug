import { useEffect, useState } from "react";
import { ListingsView } from "../../components/cardList/cardList";
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
      <div id="cardsAndMap" className="listings-and-map-page">
        <div className="listings-container">
          <ListingsView listings={savedListings} />
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
