import marker from "../../assets/Marker.svg";
import { Listing } from "../../types/listing";
import { formatListingDate } from "../../utils/datefunctions";
import { HeartButton } from "../button/heart-button/HeartButton";
import { Card, CardProps } from "../card/Card";

interface ListingCardProps extends CardProps {
  locationIndex: number;
  listing: Listing;
  liked?: boolean;
  likeUpdate?: (listing: Listing, liked: boolean) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  locationIndex,
  listing,
  liked,
  likeUpdate,
  className,
  onClick,
}) => {
  const {
    location,
    overview,
    tags,
    startDate,
    endDate,
    rent,
    apartmentImgUrls: [apartmentImg],
  } = listing;

  const formattedStartDate = formatListingDate(startDate);
  const formattedEndDate = formatListingDate(endDate);

  return (
    <Card className={`listing-card ${className}`} onClick={onClick}>
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
            {`${formattedStartDate} - ${formattedEndDate}`}
            <p>${rent}/month</p>
          </div>
          <div>{liked}</div>
          {liked !== undefined && (
            <HeartButton
              liked={liked ?? false}
              onClick={() => {
                if (likeUpdate) likeUpdate(listing, !liked);
              }}
            />
          )}
        </div>
      </div>
    </Card>
  );
};
