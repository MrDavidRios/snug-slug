import { Listing } from "../../types/listing";
import { Carousel } from "../carousel/Carousel";
import { MapView } from "../mapView/MapView";
import { Modal } from "../modal/Modal";

interface DetailedListingProps {
  listing: Listing;
  onClose: () => void;
}

export const DetailedListing: React.FC<DetailedListingProps> = ({ listing, onClose }) => {
  const { location, dates, rent, overview, details, requirements, additionalInfo, apartmentImgUrls } = listing;

  return (
    <Modal title={location} id="detailedListing" onClose={onClose} blurBackdrop={true}>
      <div className="left">
        <h2>{dates}</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>{`$${rent}`}</h2>
          <h2 style={{ color: "var(--dark-gray)", marginBottom: 2 }}>/month</h2>
        </div>
        <p>{overview}</p>
        <hr />
        <h3>Details</h3>
        <ul>
          {details.map((detail, idx) => (
            <li key={idx}>{detail}</li>
          ))}
        </ul>
        <h3>Requirements</h3>
        <ul>
          {requirements.map((requirement, idx) => (
            <li key={idx}>{requirement}</li>
          ))}
        </ul>
        <h3>Additional Information</h3>
        <ul>
          {additionalInfo.map((infoPoint, idx) => (
            <li key={idx}>{infoPoint}</li>
          ))}
        </ul>
        <h3>Location</h3>
        <MapView />
      </div>
      <div className="right">
        <Carousel imgUrls={apartmentImgUrls} />
        <div>
          <h3>Meet the sublessor!</h3>
          {/* <PersonCard /> */}
        </div>
      </div>
    </Modal>
  );
};
