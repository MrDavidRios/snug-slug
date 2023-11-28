import { useState } from "react";
import marker from "../../assets/Marker.svg";
import { Listing } from "../../types/listing";
import { HeartButton } from "../button/heart-button/HeartButton";
import { Card } from "../card/Card";

interface ListingCardProps {
  listing: Listing;
  locationIndex: number;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, locationIndex }) => {
  const { location, description, features, dates, rent, apartmentImgUrl: apartmentImg } = listing;
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="listing-card">
      <div className="image-container">
        <div className="marker">
          <div className="location-number"> {locationIndex} </div>
          <img src={marker} />
        </div>
        <img src={apartmentImg} alt="Apartment" />
      </div>

      <div className="text">
        <div className="location-text">{location}</div>
        <hr />
        <div className="description">{description}</div>

        <div className="all-tags">
          {features.map((feature, index) => (
            <div key={index} className="tag">
              {feature}
            </div>
          ))}
        </div>

        <div className="bottom-row">
          <div className="dates-rent">
            {dates}
            <p>${rent}/month</p>
          </div>
          <HeartButton onChange={setIsLiked} />
        </div>
      </div>
    </Card>
  );
};
