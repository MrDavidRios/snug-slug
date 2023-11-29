import { ListingsView } from "../../components/cardList/cardList";
import { Listing } from "../../types/listing";

export function AllListingsTest() {
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

  return <ListingsView listings={sampleListings} />;
}
