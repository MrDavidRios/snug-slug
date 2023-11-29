import { useState } from "react";
import { ListingsView } from "../../components/cardList/cardList";
import { DetailedListing } from "../../components/detailedListing/DetailedListing";
import { Listing } from "../../types/listing";

const sampleListings: Listing[] = [
  {
    location: "76th Street, Upper West Side",
    overview: "1 Bedroom in a 3 Bedroom suite",
    details: ["In-unit washer", "Dog friendly"],
    tags: ["In-unit washer", "Dog friendly"],
    requirements: ["No smoking", "Interview required"],
    additionalInfo: ["Pets allowed"],
    dates: "May 15 - Aug 31",
    rent: 1500,
    apartmentImgUrls: [
      "src/assets/apartment.png",
      "https://www.apartments.com/blog/sites/default/files/styles/x_large_hq/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg?itok=kQmw64UU",
      "https://cdn.vox-cdn.com/thumbor/zVuv0s-NzoqRQef_zb91-X8sT88=/0x0:1800x1168/1200x800/filters:focal(733x429:1021x717)/cdn.vox-cdn.com/uploads/chorus_image/image/63048549/logan_apartments.6.jpg",
      "https://www.interiorzine.com/wp-content/uploads/2017/11/50-ways-to-make-a-small-space-more-livable.jpg",
    ],
  },
  {
    location: "76th Street, Upper West Side",
    overview: "1 Bedroom in a 3 Bedroom suite",
    details: ["In-unit washer", "Dog friendly"],
    tags: ["In-unit washer", "Dog friendly"],
    requirements: ["No smoking", "Interview required"],
    additionalInfo: ["Pets allowed"],
    dates: "May 15 - Aug 31",
    rent: 1500,
    apartmentImgUrls: ["src/assets/apartment.png"],
  },
  {
    location: "76th Street, Upper West Side",
    overview: "1 Bedroom in a 3 Bedroom suite",
    details: ["In-unit washer", "Dog friendly"],
    tags: ["In-unit washer", "Dog friendly"],
    requirements: ["No smoking", "Interview required"],
    additionalInfo: ["Pets allowed"],
    dates: "May 15 - Aug 31",
    rent: 1500,
    apartmentImgUrls: ["src/assets/apartment.png"],
  },
  {
    location: "76th Street, Upper West Side",
    overview: "1 Bedroom in a 3 Bedroom suite",
    details: ["In-unit washer", "Dog friendly"],
    tags: ["In-unit washer", "Dog friendly"],
    requirements: ["No smoking", "Interview required"],
    additionalInfo: ["Pets allowed"],
    dates: "May 15 - Aug 31",
    rent: 1500,
    apartmentImgUrls: ["src/assets/apartment.png"],
  },
];

export const Marketplace: React.FC = () => {
  const [showDetailedListing, setShowDetailedListing] = useState(false);

  return (
    <div id="marketplacePageWrapper">
      <ListingsView listings={sampleListings} />
      {showDetailedListing && (
        <DetailedListing listing={sampleListings[0]} onClose={() => setShowDetailedListing(false)} />
      )}
      <button onClick={() => setShowDetailedListing(true)}>Test show detailed listing</button>
    </div>
  );
};
