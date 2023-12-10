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
  chatHistory: [],
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
  chatHistory: [],
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
  chatHistory: [],
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
  chatHistory: [],
};

export const sampleListing: Listing = {
  id: 1,
  owner: exampleUserB,
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
  owner: exampleUserA,
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
  owner: exampleUserD,
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

export const sampleMessageHistory: ChatMessage[] = [
  {
    sender: exampleUserA,
    receiver: exampleUserB,
    listingId: exampleUserB.activeListing!.id,
    timestamp: new Date("2023-10-01T09:00:00"),
    text: "Hey, I saw your listing! Is it still available?",
  },
  {
    sender: exampleUserB,
    receiver: exampleUserA,
    listingId: exampleUserB.activeListing!.id,
    timestamp: new Date("2023-10-01T09:05:00"),
    text: "Yes, it is! Would you like to know more?",
  },
  {
    sender: exampleUserA,
    receiver: exampleUserB,
    listingId: exampleUserB.activeListing!.id,
    timestamp: new Date("2023-10-01T09:10:00"),
    text: "Definitely! Can we schedule a visit?",
  },
];

export const sampleMessageHistory2: ChatMessage[] = [
  {
    sender: exampleUserC,
    receiver: exampleUserA,
    listingId: exampleUserA.activeListing!.id,
    timestamp: new Date("2023-10-01T09:00:00"),
    text: "Hi! How are you? I am interested in your listing",
  },
  {
    sender: exampleUserA,
    receiver: exampleUserC,
    listingId: exampleUserA.activeListing!.id,
    timestamp: new Date("2023-10-01T09:05:00"),
    text: "Hi! Yes, it is available.",
  },
  {
    sender: exampleUserC,
    receiver: exampleUserA,
    listingId: exampleUserA.activeListing!.id,
    timestamp: new Date("2023-10-01T09:10:00"),
    text: "Can I schedule a visit?",
  },
];

export const sampleMessageHistory3: ChatMessage[] = [
  {
    sender: exampleUserD,
    receiver: exampleUserA,

    listingId: exampleUserA.activeListing!.id,
    timestamp: new Date("2023-10-01T09:00:00"),
    text: "Hi A! Can I stay at your place?",
  },
  {
    sender: exampleUserA,
    receiver: exampleUserD,
    listingId: exampleUserA.activeListing!.id,
    timestamp: new Date("2023-10-01T09:05:00"),
    text: "Hi D! Yes, it is available.",
  },
  {
    sender: exampleUserD,
    receiver: exampleUserA,
    listingId: exampleUserA.activeListing!.id,
    timestamp: new Date("2023-10-01T09:10:00"),
    text: "Can I schedule a visit?",
  },
];

export const sampleMessageHistory4: ChatMessage[] = [
  {
    sender: exampleUserA,
    receiver: exampleUserD,
    listingId: exampleUserD.activeListing!.id,
    timestamp: new Date("2023-10-01T09:00:00"),
    text: "Hi D!",
  },
  {
    sender: exampleUserD,
    receiver: exampleUserA,
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
exampleUserA.chatHistory = [...exampleUserA.chatHistory, ...sampleMessageHistory];

// A-C, C is interested in A, not archived
exampleUserA.chatHistory = [...exampleUserA.chatHistory, ...sampleMessageHistory2];

// A-D, D is interested in A, archived
exampleUserA.chatHistory = [...exampleUserA.chatHistory, ...sampleMessageHistory3];

// A-D, A is interested in D, archived
exampleUserA.chatHistory = [...exampleUserA.chatHistory, ...sampleMessageHistory4];
