import { Listing } from "../../types/listing";
import { Carousel } from "../carousel/Carousel";
import { Modal } from "../modal/Modal";

interface DetailedListingProps {
  listing: Listing;
  onClose?: () => void;
}

export const DetailedListing: React.FC<DetailedListingProps> = ({ listing, onClose }) => {
  const { location, dates, rent, description, apartmentImgUrls } = listing;

  return (
    <Modal title={location} id="detailedListing" onClose={onClose}>
      <div className="left">
        <h2>{dates}</h2>
        <h2>{`$${rent}/month`}</h2>
        <p>{description}</p>
        <hr />
        <h4>Details</h4>
        <ul>{/* li .map */}</ul>
        <h4>Requirements</h4>
        <ul>{/* li .map */}</ul>
        <h4>Additional Information</h4>
        <ul>{/* li .map */}</ul>
        <h4>Location</h4>
        {/* <MapView /> */}
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
