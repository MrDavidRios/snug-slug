import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Listing } from "../../types/listing";
import { savedListingsListener } from "../../utils/savedlistingslistener";
import { ListingCard } from "../apartmentCard/ListingCard";

interface ListingsViewProps {
  listings: Listing[];
  onSelectListing: (listing: Listing) => void;
  selectedListingPredicate?: (listing: Listing) => boolean;
  emptyMessage?: string;
}

export const ListingsView: React.FC<ListingsViewProps> = ({
  listings,
  onSelectListing,
  selectedListingPredicate,
  emptyMessage = "",
}) => {
  const savedListingsFromStorage = localStorage.getItem("savedListings");
  const [savedListings, setSavedListings] = useState<Listing[]>(JSON.parse(savedListingsFromStorage || "[]"));

  // Update saved listings in local storage whenever savedListings changes in local storage
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(savedListingsListener(setSavedListings), []);

  const handleLikeUpdate = (listing: Listing, liked: boolean) => {
    if (liked) {
      // Add listing to saved listings
      const updatedSavedListings = [...savedListings, listing];
      localStorage.setItem("savedListings", JSON.stringify(updatedSavedListings));
      setSavedListings(updatedSavedListings);
    } else {
      // Remove listing from saved listings
      const updatedSavedListings = savedListings.filter((savedListing) => !_.isEqual(listing, savedListing));
      localStorage.setItem("savedListings", JSON.stringify(updatedSavedListings));
      setSavedListings(updatedSavedListings);
    }

    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="listingGrid">
      {listings.length === 0 && <p>{emptyMessage}</p>}
      {listings.map((listing, index) => {
        return (
          <ListingCard
            listing={listing}
            liked={_.some(savedListings, listing)}
            likeUpdate={handleLikeUpdate}
            key={index}
            locationIndex={index + 1}
            onClick={() => onSelectListing(listing)}
            className={selectedListingPredicate && selectedListingPredicate(listing) ? "selected" : ""}
          />
        );
      })}
    </div>
  );
};
