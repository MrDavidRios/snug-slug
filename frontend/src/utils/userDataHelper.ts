import { ChatMessage } from "../types/chatMessage";
import { Listing } from "../types/listing";
import { Slug } from "../types/slug";
import {
  exampleUserA,
  exampleUserB,
  exampleUserC,
  exampleUserD,
  sampleListing,
  sampleListing2,
  sampleListing3,
} from "./inboxtestdata";

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

export function getArchivedPeople(slug: Slug): Slug[] {
  // use getListing from Flask to get relevant listings with IDs

  const archivedPeople: Slug[] = [];
  for (const id of slug.archivedUserIDs) {
    const person = getUserData(id);

    if (!person) {
      console.error(`Person not found - id: ${id}`);
      continue;
    }

    archivedPeople.push(person);
  }

  return archivedPeople;
}

const users = [exampleUserA, exampleUserB, exampleUserC, exampleUserD];
function getUserData(id: number): Slug | undefined {
  return users.find((user) => user.id === id);
}

/**
 * Gets all of the messages exchanged between two users
 */
export function getChatHistory(
  currentUserId: number,
  otherUserId: number,
  currentUserFindingApartment: boolean
): ChatMessage[] {
  // flask
  // temp: replace this with flask call
  const currentUser = getUserData(currentUserId);
  const otherUser = getUserData(otherUserId);

  if (!currentUser || !otherUser) {
    if (!currentUser) console.error("Current user not found");
    if (!otherUser) console.error("Other user not found");

    return [];
  }

  // Returns all of the messages where the other user is involved (since current user is implicitly involved, given
  // that we're using their chat history)
  return currentUser.chatHistory.filter((message) => {
    const otherUserPresent = message.sender.id === otherUserId || message.receiver.id === otherUserId;
    if (!otherUserPresent) return false;

    const relevantListing = currentUserFindingApartment ? otherUser.activeListing : currentUser.activeListing;
    return message.listingId === relevantListing?.id;
  });
}

export function updateUserData(user: Slug) {
  // flask
  // temp: replace this with flask call
  const index = users.findIndex((u) => u.id === user.id);

  if (index === -1) {
    console.error("User not found");
    return;
  }

  users[index] = user;
}

/**
 * This function returns a list of listings that the user has active chats related to
 * - does not include their own
 */
export function getActiveListings(user: Slug) {
  const activeListingIDs: Set<number> = new Set();

  for (let i = 0; i < user.chatHistory.length; i++) {
    const message = user.chatHistory[i];
    const otherUser = message.receiver.id === user.id ? message.sender : message.receiver;
    const correspondingListingID = otherUser.activeListing?.id;

    // if the other user has an active listing and it's not archived, it's active
    if (correspondingListingID && !user.archivedListingIDs.includes(correspondingListingID)) {
      activeListingIDs.add(correspondingListingID);
    }
  }

  return getListings([...activeListingIDs]);
}

export function getActivePeople(user: Slug): Slug[] {
  const activePeopleIDs: Set<number> = new Set();

  if (!user.activeListing) return [];

  for (let i = 0; i < user.chatHistory.length; i++) {
    const message = user.chatHistory[i];
    const otherUser = message.receiver.id === user.id ? message.sender : message.receiver;
    const correspondingUserID = otherUser.id;

    // if the other user has an active listing and it's not archived, it's active
    if (
      correspondingUserID &&
      message.listingId === user.activeListing!.id &&
      !user.archivedUserIDs.includes(correspondingUserID)
    ) {
      activePeopleIDs.add(correspondingUserID);
    }
  }

  const activePeople: Slug[] = [];
  for (const personID of activePeopleIDs) {
    const person = getUserData(personID);

    if (!person) {
      console.error(`Person not found - id: ${personID}`);
      continue;
    }

    activePeople.push(person);
  }

  return activePeople;
}
