import React from "react";

export const MapView: React.FC = () => {
  return (
    <div>
      <img
        className="map-view"
        src="https://www.theagencyre.com/static-map?height=640&marker_size=32&markers=%5B%5B-73.94823%2C40.77903%5D%5D&style=road&width=640&zoom=16"
        alt="Map View"
      />
    </div>
  );
};
