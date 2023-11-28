import { Listing } from "../../types/listing";
import { Modal } from "../modal/Modal";

interface DetailedListingProps {
  listing: Listing;
  onClose?: () => void;
}

export const DetailedListing: React.FC<DetailedListingProps> = ({ listing, onClose }) => {
  return (
    <Modal title={listing.location} id="detailedListing" onClose={onClose}>
      {listing.location}
    </Modal>
  );
};
