import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import { Listing } from "../../types/listing";
import { getSavedListings, modifySavedListing } from "../../utils/listingDataHelper";
import { UserContext, UserContextType } from "../UserContext";
import { ListingCard } from "../apartmentCard/ListingCard";

interface ListingsViewProps {
  listings: Listing[];
  onSelectListing: (listing: Listing) => void;
  selectedListingPredicate?: (listing: Listing) => boolean;
  emptyMessage?: string;
  hideIfUnliked?: boolean;
}

export const ListingsView: React.FC<ListingsViewProps> = ({
  listings,
  onSelectListing,
  selectedListingPredicate,
  emptyMessage = "",
  hideIfUnliked = false,
}) => {
  const [savedListings, setSavedListings] = useState<Listing[]>([]);

  const { slug } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    const updateSavedListings = async () => {
      if (!slug) return;

      setSavedListings(await getSavedListings(slug.id));
    };

    updateSavedListings();
  }, [slug]);

  const handleLikeUpdate = (listing: Listing, liked: boolean) => {
    if (!slug) return;

    if (liked) {
      // Add listing to saved listings
      modifySavedListing(slug.id, listing.id, false);

      // Update saved listings
      setSavedListings(_.concat(savedListings, listing));
    } else {
      // Remove listing from saved listings
      modifySavedListing(slug.id, listing.id, true);

      const savedListingsCopy = _.cloneDeep(savedListings);
      _.remove(savedListingsCopy, (l) => l.id === listing.id);

      setSavedListings(savedListingsCopy);
    }
  };

  return (
    <div className="listingGrid">
      {listings.length === 0 && <p>{emptyMessage}</p>}
      {listings.map((listing, index) => {
        if (slug && hideIfUnliked && !_.some(savedListings, listing)) return null;

        return (
          <ListingCard
            listing={listing}
            liked={slug ? _.some(savedListings, listing) : undefined}
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
