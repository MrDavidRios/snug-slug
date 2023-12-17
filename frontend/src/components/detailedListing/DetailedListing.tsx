import { useEffect, useState } from "react";
import { Listing } from "../../types/listing";
import { Slug } from "../../types/slug";
import { getUserData } from "../../utils/userDataHelper";
import { Carousel } from "../carousel/Carousel";
import { LoadingIndicator } from "../loadingIndicator/loadingIndicator";
import { MapView } from "../mapView/MapView";
import { Modal } from "../modal/Modal";
import { PersonCard } from "../personCard/PersonCard";

interface DetailedListingProps {
  listing: Listing;
  onClose: () => void;
}

export const DetailedListing: React.FC<DetailedListingProps> = ({ listing, onClose }) => {
  const { location, startDate, endDate, rent, overview, details, requirements, additionalInfo, apartmentImgUrls } =
    listing;

  const [owner, setOwner] = useState<Slug | undefined>(undefined);

  useEffect(() => {
    const getOwner = async () => {
      setOwner(await getUserData(listing.ownerId));
    };

    getOwner();
  }, [listing.ownerId]);

  return (
    <Modal id="detailedListing" onClose={onClose} blurBackdrop={true}>
      <div className="left">
        <div>
          <h1 className="location">{location}</h1>
          <h2 className="dates">{`${startDate} to ${endDate}`}</h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2>{`$${rent}`}</h2>
            <h2 style={{ color: "var(--dark-gray)", marginBottom: 2 }}>/month</h2>
          </div>
          <p className="overview">{overview}</p>
        </div>
        <hr />
        <div>
          <h3>Details</h3>
          <ul>
            {details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Requirements</h3>
          <ul>
            {requirements.map((requirement, idx) => (
              <li key={idx}>{requirement}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Additional Information</h3>
          <ul>
            {additionalInfo.map((infoPoint, idx) => (
              <li key={idx}>{infoPoint}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Location</h3>
          <p>Exact location to be shared after agreement.</p>
          <MapView />
        </div>
      </div>
      <div className="right">
        <Carousel imgUrls={apartmentImgUrls} />
        <div className="sublessor-wrapper">
          <h3>Meet the sublessor!</h3>
          {owner ? <PersonCard person={owner} /> : <LoadingIndicator />}
        </div>
      </div>
    </Modal>
  );
};
