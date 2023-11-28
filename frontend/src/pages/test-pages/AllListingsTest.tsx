import { ListingsView } from "../../components/cardList/cardList";
import { Listing } from "../../types/listing";

export function AllListingsTest() {
  const sampleListings: Listing[] = [
    {
      location: "76th Street, Upper West Side",
      description: "1 Bedroom in a 3 Bedroom suite",
      features: ["In-unit washer", "Dog friendly"],
      dates: "May 15 - Aug 31",
      rent: 1500,
      apartmentImgUrl: "src/assets/apartment.png",
    },
    {
      location: "76th Street, Upper West Side",
      description: "1 Bedroom in a 3 Bedroom suite",
      features: ["In-unit washer", "Dog friendly"],
      dates: "May 15 - Aug 31",
      rent: 1500,
      apartmentImgUrl: "src/assets/apartment.png",
    },
    {
      location: "76th Street, Upper West Side",
      description: "1 Bedroom in a 3 Bedroom suite",
      features: ["In-unit washer", "Dog friendly"],
      dates: "May 15 - Aug 31",
      rent: 1500,
      apartmentImgUrl: "src/assets/apartment.png",
    },
    {
      location: "76th Street, Upper West Side",
      description: "1 Bedroom in a 3 Bedroom suite",
      features: ["In-unit washer", "Dog friendly"],
      dates: "May 15 - Aug 31",
      rent: 1500,
      apartmentImgUrl: "src/assets/apartment.png",
    },
  ];

  return <ListingsView listings={sampleListings} />;
}
