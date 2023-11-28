import { Listing } from "../../types/listing";
import { Carousel } from "../carousel/Carousel";
import { Modal } from "../modal/Modal";

interface DetailedListingProps {
  listing: Listing;
  onClose?: () => void;
}

export const DetailedListing: React.FC<DetailedListingProps> = ({ listing, onClose }) => {
  return (
    <Modal title={listing.location} id="detailedListing" onClose={onClose}>
      <div id="left"></div>
      <div id="right">
        <Carousel imgUrls={listing.apartmentImgUrls} />
      </div>
      {listing.location}
    </Modal>
  );
};
