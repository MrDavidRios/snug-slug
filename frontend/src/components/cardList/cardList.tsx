import React from "react";
import { Listing } from "../../types/listing";
import { ListingCard } from "../apartmentCard/ListingCard";

interface ListingsViewProps {
  listings: Listing[];
}

export const ListingsView: React.FC<ListingsViewProps> = ({ listings }) => {
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
