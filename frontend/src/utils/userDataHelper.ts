import { ChatMessage } from "../types/chatMessage";
import { Listing } from "../types/listing";
import { Slug } from "../types/slug";
import { sampleListing, sampleListing2, sampleListing3 } from "./inboxtestdata";

const listings = [sampleListing, sampleListing2, sampleListing3];
function getListings(ids: number[]): Listing[] {
  // use getListing from Flask to get relevant listings with IDs

  // temp: replace this with flask call
  return listings.filter((listing) => ids.includes(listing.id));
}

export function getArchivedListings(slug: Slug): Listing[] {
  // use getListing from Flask to get relevant listings with IDs

  return getListings(slug.archivedListingIDs);
}

export async function getArchivedPeople(slug: Slug): Promise<Slug[]> {
  // use getListing from Flask to get relevant listings with IDs

  const archivedPeople: Slug[] = [];
  for (const id of slug.archivedUserIDs) {
    const person = await getUserData(id);

    if (!person) {
      console.error(`Person not found - id: ${id}`);
      continue;
    }

    archivedPeople.push(person);
  }

  return archivedPeople;
}

export async function getUserData(id: number): Promise<Slug | undefined> {
  console.error("TRYNA GET USER DATA");

  const response = await fetch(`http://127.0.0.1:8080/api/snugslug/getUser/${id}`);

  console.log(response);

  return (await response.json()) as Slug | undefined;
}

/**
 * Gets all of the messages exchanged between two users
 */
export async function getChatHistory(
  currentUserId: number,
  otherUserId: number,
  currentUserFindingApartment: boolean
): Promise<ChatMessage[]> {
  // flask
  // temp: replace this with flask call
  const currentUser = await getUserData(currentUserId);
  const otherUser = await getUserData(otherUserId);

  if (!currentUser || !otherUser) {
    if (!currentUser) console.error("Current user not found");
    if (!otherUser) console.error("Other user not found");

    return [];
  }

  // Returns all of the messages where the other user is involved (since current user is implicitly involved, given
  // that we're using their chat history)
  const chatHistory = [...currentUser.sentMessages, ...currentUser.receivedMessages];
  return chatHistory.filter((message) => {
    const otherUserPresent = message.senderId === otherUserId || message.receiverId === otherUserId;
    if (!otherUserPresent) return false;

    const relevantListing = currentUserFindingApartment ? otherUser.activeListing : currentUser.activeListing;
    return message.listingId === relevantListing?.id;
  });
}

export async function updateUserData(user: Slug) {
  // flask
  const response = await fetch("http://127.0.0.1:8080/api/snugslug/createUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}`);
    return;
  }

  const updatedUser = await response.json();
  return updatedUser;
}

/**
 * This function returns a list of listings that the user has active chats related to
 * - does not include their own
 */
export async function getActiveListings(user: Slug): Promise<Listing[]> {
  const activeListingIDs: Set<number> = new Set();

  for (let i = 0; i < user.sentMessages.length; i++) {
    const otherUserId = user.sentMessages[i].receiverId;

    // get user active listing ID
    const otherUser = await getUserData(otherUserId);

    if (!otherUser) {
      console.error(`Other user not found - id: ${otherUserId}`);
      continue;
    }

    const correspondingListingID = otherUser.activeListing?.id;

    // if the other user has an active listing and it's not archived, it's active
    if (correspondingListingID && !user.archivedListingIDs.includes(correspondingListingID)) {
      activeListingIDs.add(correspondingListingID);
    }
  }

  return getListings([...activeListingIDs]);
}

export async function getActivePeople(user: Slug): Promise<Slug[]> {
  const activePeopleIDs: Set<number> = new Set();

  if (!user.activeListing) return [];

  for (let i = 0; i < user.sentMessages.length; i++) {
    const otherUserId = user.sentMessages[i].receiverId;

    if (!otherUserId) continue;

    // if the other user has an active listing and it's not archived, it's active
    if (!user.archivedUserIDs.includes(otherUserId)) {
      activePeopleIDs.add(otherUserId);
    }
  }

  const activePeople: Slug[] = [];
  for (const personID of activePeopleIDs) {
    const person = await getUserData(personID);

    if (!person) {
      console.error(`Person not found - id: ${personID}`);
      continue;
    }

    activePeople.push(person);
  }

  return activePeople;
}
