import { useState } from "react";
import { ListingsView } from "../../components/cardList/cardList";
import { MapView } from "../../components/mapView/MapView";
import { Listing } from "../../types/listing";

export const SavedPlaces: React.FC = () => {
  const [savedPlaces, setSavedPlaces] = useState<Listing[]>([]);

  return (
    <div id="savedPlacesPageWrapper">
      {/* // Need to separate the map and listing cards into two separate containers so that the listings one is scrollable */}
      <div id="cardsAndMap" className="listings-and-map-page">
        <div className="listings-container">
          <ListingsView listings={savedPlaces} />
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
