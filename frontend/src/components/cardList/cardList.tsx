import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Listing } from "../../types/listing";
import { ListingCard } from "../apartmentCard/ListingCard";

interface ListingsViewProps {
  listings: Listing[];
}

export const ListingsView: React.FC<ListingsViewProps> = ({ listings }) => {
  const savedListingsFromStorage = localStorage.getItem("savedListings");
  const [savedListings, setSavedListings] = useState<Listing[]>(JSON.parse(savedListingsFromStorage || "[]"));

  console.log("savedListings", savedListings);

  // Update saved listings in local storage whenever savedListings changes in local storage
  useEffect(() => {
    const updatedSavedListings = () => {
      console.log("hey there", JSON.parse(localStorage.getItem("savedListings") ?? "[]"));

      setSavedListings(JSON.parse(savedListingsFromStorage || "[]"));
    };

    window.addEventListener("storage", updatedSavedListings);

    return () => {
      window.removeEventListener("storage", updatedSavedListings);
    };
  }, []);

  const handleLikeUpdate = (listing: Listing, liked: boolean) => {
    if (liked) {
      // Add listing to saved listings
      const updatedSavedListings = [...savedListings, listing];
      localStorage.setItem("savedListings", JSON.stringify(updatedSavedListings));
      setSavedListings(updatedSavedListings);
    } else {
      // Remove listing from saved listings
      console.log("Removing listing...", savedListings, listing);

      const updatedSavedListings = savedListings.filter((savedListing) => !_.isEqual(listing, savedListing));
      localStorage.setItem("savedListings", JSON.stringify(updatedSavedListings));
      setSavedListings(updatedSavedListings);
    }

    console.log("storage event!!!");
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
