import { Listing } from "../../types/listing";
import { Carousel } from "../carousel/Carousel";
import { MapView } from "../mapView/MapView";
import { Modal } from "../modal/Modal";
import { PersonCard } from "../personCard/PersonCard";

interface DetailedListingProps {
  listing: Listing;
  onClose: () => void;
}

export const DetailedListing: React.FC<DetailedListingProps> = ({ listing, onClose }) => {
  const { location, dates, rent, overview, details, requirements, additionalInfo, apartmentImgUrls } = listing;

  return (
    <Modal id="detailedListing" onClose={onClose} blurBackdrop={true}>
      <div className="left">
        <div>
          <h1 className="location">{location}</h1>
          <h2 className="dates">{dates}</h2>
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
          <PersonCard person={listing.owner} />
        </div>
      </div>
    </Modal>
  );
};
