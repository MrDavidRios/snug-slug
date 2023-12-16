import { ChatMessage } from "../types/chatMessage";
import { Listing } from "../types/listing";
import { Slug } from "../types/slug";

export const exampleUserA: Slug = {
  id: 1,
  name: "A Smith",
  email: "bs1234@columbia.edu",
  age: 19,
  school: "Columbia Enginering",
  classYear: 2025,
  pronouns: "he/him/his",
  profilePicUrl: "",
  bio: "",

  budget: "$1500",
  dates: "",

  archivedListingIDs: [],
  archivedUserIDs: [],

  savedListings: [],
  sentMessages: [],
  receivedMessages: [],
};

export const exampleUserB: Slug = {
  id: 2,
  name: "B Doe",
  email: "jd1234@columbia.edu",
  age: 19,
  school: "Columbia College",
  classYear: 2024,
  pronouns: "he/him/his",
  profilePicUrl: "",
  bio: "",

  budget: "$1500",
  dates: "",

  archivedListingIDs: [],
  archivedUserIDs: [],

  savedListings: [],
  sentMessages: [],
  receivedMessages: [],
};

export const exampleUserC: Slug = {
  id: 3,
  name: "C Dong",
  email: "jd1234@columbia.edu",
  age: 19,
  school: "Columbia College",
  classYear: 2024,
  pronouns: "she/her/hers",
  profilePicUrl: "",
  bio: "",

  budget: "$1500",
  dates: "",

  archivedListingIDs: [],
  archivedUserIDs: [],

  savedListings: [],
  sentMessages: [],
  receivedMessages: [],
};

export const exampleUserD: Slug = {
  id: 4,
  name: "D Do",
  email: "jd1234@columbia.edu",
  age: 22,
  school: "Columbia College",
  classYear: 2024,
  pronouns: "he/him/his",
  profilePicUrl: "",
  bio: "",

  budget: "$1500",
  dates: "",

  archivedListingIDs: [],
  archivedUserIDs: [],

  savedListings: [],
  sentMessages: [],
  receivedMessages: [],
};

export const sampleListing: Listing = {
  id: 1,
  ownerId: exampleUserB.id,
  location: "123 Main St, Anytown, USA",
  overview: "1 Bedroom in a 3 Bedroom suite",
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
  tags: ["city view", "pet-friendly", "gym"],
  rent: 2500,
  dates: "June 1, 2023, - June 1, 2024",
  apartmentImgUrls: [
    "https://media.istockphoto.com/id/1127580796/photo/3d-illustration-of-a-new-modern-city-loft-apartment.jpg?s=612x612&w=0&k=20&c=fnA4265CyfboDls6iEP8azUGyDxlPgnno9EHkORu-0w=",
  ],
};

export const sampleListing2: Listing = {
  id: 2,
  ownerId: exampleUserA.id,
  location: "ID 2 St, Anytown, USA",
  overview: "1 Bedroom in a 3 Bedroom suite",
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
  tags: ["city view", "pet-friendly", "gym"],
  rent: 2500,
  dates: "June 1, 2023, - June 1, 2024",
  apartmentImgUrls: [
    "https://media.istockphoto.com/id/1127580796/photo/3d-illustration-of-a-new-modern-city-loft-apartment.jpg?s=612x612&w=0&k=20&c=fnA4265CyfboDls6iEP8azUGyDxlPgnno9EHkORu-0w=",
  ],
};

export const sampleListing3: Listing = {
  id: 3,
  ownerId: exampleUserD.id,
  location: "ID 3 St, Anytown, USA",
  overview: "1 Bedroom in a 3 Bedroom suite",
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
  tags: ["city view", "pet-friendly", "gym"],
  rent: 2500,
  dates: "June 1, 2023, - June 1, 2024",
  apartmentImgUrls: [
    "https://media.istockphoto.com/id/1127580796/photo/3d-illustration-of-a-new-modern-city-loft-apartment.jpg?s=612x612&w=0&k=20&c=fnA4265CyfboDls6iEP8azUGyDxlPgnno9EHkORu-0w=",
  ],
};

exampleUserA.activeListing = sampleListing2;
exampleUserB.activeListing = sampleListing;
exampleUserD.activeListing = sampleListing3;

export const sampleUserASentMessages: ChatMessage[] = [
  {
    senderId: exampleUserA.id,
    receiverId: exampleUserB.id,
    listingId: exampleUserB.activeListing!.id,
    timestamp: new Date("2023-10-01T09:00:00"),
    text: "Hey, I saw your listing! Is it still available?",
  },
  {
    senderId: exampleUserA.id,
    receiverId: exampleUserB.id,
    listingId: exampleUserB.activeListing!.id,
    timestamp: new Date("2023-10-01T09:10:00"),
    text: "Definitely! Can we schedule a visit?",
  },
  {
    senderId: exampleUserA.id,
    receiverId: exampleUserC.id,
    listingId: exampleUserA.activeListing!.id,
    timestamp: new Date("2023-10-01T09:00:00"),
    text: "Hi! Yes, it is available.",
  },
  {
    senderId: exampleUserA.id,
    receiverId: exampleUserC.id,
    listingId: exampleUserA.activeListing!.id,
    timestamp: new Date("2023-10-01T09:10:00"),
    text: "Can I schedule a visit?",
  },
  {
    senderId: exampleUserA.id,
    receiverId: exampleUserD.id,
    listingId: exampleUserD.activeListing!.id,
    timestamp: new Date("2023-10-01T09:00:00"),
    text: "Hi D!",
  },
];

export const sampleUserBSentMessages: ChatMessage[] = [
  {
    senderId: exampleUserB.id,
    receiverId: exampleUserA.id,
    listingId: exampleUserB.activeListing!.id,
    timestamp: new Date("2023-10-01T09:05:00"),
    text: "Yes, it is! Would you like to know more?",
  },
];

export const sampleUserCSentMessages: ChatMessage[] = [
  {
    senderId: exampleUserC.id,
    receiverId: exampleUserA.id,
    listingId: exampleUserA.activeListing!.id,
    timestamp: new Date("2023-10-01T09:00:00"),
    text: "Hi! How are you? I am interested in your listing",
  },
  {
    senderId: exampleUserC.id,
    receiverId: exampleUserA.id,
    listingId: exampleUserA.activeListing!.id,
    timestamp: new Date("2023-10-01T09:10:00"),
    text: "Can I schedule a visit?",
  },
];

export const sampleUserDSentMessages: ChatMessage[] = [
  {
    senderId: exampleUserD.id,
    receiverId: exampleUserA.id,
    listingId: exampleUserA.activeListing!.id,
    timestamp: new Date("2023-10-01T09:00:00"),
    text: "Hi A! Can I stay at your place?",
  },
  {
    senderId: exampleUserD.id,
    receiverId: exampleUserA.id,
    listingId: exampleUserA.activeListing!.id,
    timestamp: new Date("2023-10-01T09:10:00"),
    text: "Can I schedule a visit?",
  },
  {
    senderId: exampleUserD.id,
    receiverId: exampleUserA.id,
    listingId: exampleUserD.activeListing!.id,
    timestamp: new Date("2023-10-01T09:05:00"),
    text: "Hi A!",
  },
];

// Dummy data -
// A has a listing (sampleListing)
// B has a listing （sampleListing)

// A is interested in B's listing and has a chat history with B - A should see B's listing in non-archived 'Apartment'
// A is also interested in D's listing and has a chat history with D but is archived - A should see D in archived 'Apartment'
// C is interested in A's listing and has a chat history with A - A should see C in non-archived 'Person'
// D is interested in A's listing and has a chat history with A but is archived - A should see D in archived 'Person'

// Should see B's listing
// Should see C in people (not archived) and D in people (archived)
// A-B, A is interested in B (archived chat)
