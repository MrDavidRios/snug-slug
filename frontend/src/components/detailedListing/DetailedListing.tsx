import { Listing } from "../../types/listing";
import { Card } from "../card/Card";

interface DetailedListingProps {
  listing: Listing;
}

export const DetailedListing: React.FC<DetailedListingProps> = ({ listing }) => {
  return <Card id="detailedListing">{listing.location}</Card>;
};
