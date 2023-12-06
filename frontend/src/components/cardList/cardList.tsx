import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Listing } from "../../types/listing";
import { savedListingsListener } from "../../utils/savedlistingslistener";
import { ListingCard } from "../apartmentCard/ListingCard";

interface ListingsViewProps {
  listings: Listing[];
}

export const ListingsView: React.FC<ListingsViewProps> = ({ listings }) => {
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
    <>
      {/* Create a 3-card wide grid */}
      <div className="listingGrid">
        {listings.map((listing: Listing, index: number) => (
          <ListingCard
            listing={listing}
            liked={_.some(savedListings, listing)}
            likeUpdate={handleLikeUpdate}
            locationIndex={index + 1}
            key={index + 1}
          />
        ))}
      </div>
    </>
  );
};
