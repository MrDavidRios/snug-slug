import React from "react";
import { Listing } from "../../types/listing";
import { ListingCard } from "../apartmentCard/ListingCard";

interface ListingViewProps {
  listings: Listing[];
}

export const ListingView: React.FC<ListingViewProps> = ({ listings }) => {
  return (
    <>
      {/* Create a 3-card wide grid */}
      <div className="listingGrid">
        {listings.map((listing: Listing, index: number) => (
          <ListingCard listing={listing} locationIndex={index + 1} key={index + 1} />
        ))}
      </div>
    </>
  );
};
