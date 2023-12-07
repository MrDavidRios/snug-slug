import { useState } from "react";
import { ArchiveButton } from "../../components/button/archive-button/ArchiveButton";
import { ChatBox } from "../../components/chatBox/ChatBox";
import { ListingsView } from "../../components/listingsView/listingsView";
import { LookingForToggle } from "../../components/lookingForToggle/LookingForToggle";
import { Listing } from "../../types/listing";
import { Slug } from "../../types/slug";

const sampleListing: Listing = {
  location: "123 Main St, Anytown, USA",
  overview:
    "Beautiful 2-bedroom apartment in the heart of the city with a scenic city view, available for immediate occupancy.",
  details: [
    "2 bedrooms, 2 full baths",
    "Fully equipped modern kitchen",
    "Spacious living room with balcony access",
    "In-unit washer and dryer",
    "Central air conditioning",
  ],
  requirements: [
    "No smoking",
    "Credit check required",
    "Minimum 1-year lease",
    "Security deposit and first month’s rent due at signing",
  ],
  additionalInfo: [
    "Pet-friendly building (up to 25 lbs)",
    "24-hour concierge service",
    "Fitness center and swimming pool on premises",
    "Dedicated parking spot in underground garage",
    "Storage unit included",
  ],
  tags: ["city view", "modern", "pet-friendly", "gym", "parking"],
  dates: "Available from June 1, 2023, to June 1, 2024",
  rent: 2500,
  apartmentImgUrls: [
    "https://example.com/images/apartment1.jpg",
    "https://example.com/images/apartment2.jpg",
    "https://example.com/images/apartment3.jpg",
  ],
};

// Example Slug object
const exampleUserA: Slug = {
  id: 1,
  name: "Beatric Smith",
  email: "bs1234@columbia.edu",
  age: 19,
  school: "Columbia Enginering",
  class: 2025,
  profilePicUrl: "",
  activeListing: sampleListing,
  archivedListings: [],
  savedListings: [],
  chatListings: [],
  archivedUsers: [],
  savedUsers: [],
  chatUsers: [],
  chatHistory: [],
};
const exampleUserB: Slug = {
  id: 2,
  name: "Jane Doe",
  email: "jd1234@columbia.edu",
  age: 19,
  school: "Columbia College",
  class: 2024,
  profilePicUrl: "",
  activeListing: sampleListing,
  archivedListings: [],
  savedListings: [],
  chatListings: [],
  archivedUsers: [],
  savedUsers: [],
  chatUsers: [],
  chatHistory: [],
};

export const Inbox: React.FC = () => {
  const [lookingForApartment, setLookingForApartment] = useState<boolean>(true);

  return (
    <div id="inboxPageWrapper">
      {/* Need to separate the map and listing cards into two separate containers so that the listings one is scrollable */}
      <div className="listings-and-map-page">
        <div className="listings-container">
          <div id="inboxActionButtonWrapper">
            <LookingForToggle lookingForApartment={lookingForApartment} onChange={setLookingForApartment} />
            <ArchiveButton />
          </div>
          {lookingForApartment ? <ListingsView listings={[]} /> : <></>}
          {/* {savedListings.length > 0 ? (
            <ListingsView listings={savedListings} />
          ) : (
            <p id="emptyListText">It's lonely here. Go find some places!</p>
          )} */}
        </div>
        <div className="chatbox-container">
          <ChatBox slugA={exampleUserA} slugB={exampleUserB} findingApartment={lookingForApartment} />
        </div>
      </div>
    </div>
  );
};
