import marker from "../../assets/Marker.svg";
import { Listing } from "../../types/listing";
import { HeartButton } from "../button/heart-button/HeartButton";
import { Card } from "../card/Card";

interface ListingCardProps {
  locationIndex: number;
  listing: Listing;
  liked: boolean;
  likeUpdate: (listing: Listing, liked: boolean) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ locationIndex, listing, liked, likeUpdate }) => {
  const {
    location,
    overview,
    tags,
    dates,
    rent,
    apartmentImgUrls: [apartmentImg],
  } = listing;
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
        <div className="overview">{overview}</div>

        <div className="all-tags">
          {tags.map((tag, index) => (
            <div key={index} className="tag">
              {tag}
            </div>
          ))}
        </div>

        <div className="bottom-row">
          <div className="dates-rent">
            {dates}
            <p>${rent}/month</p>
          </div>
          <div>{liked}</div>
          <HeartButton
            liked={liked}
            onClick={() => {
              likeUpdate(listing, !liked);
            }}
          />
        </div>
      </div>
    </Card>
  );
};
