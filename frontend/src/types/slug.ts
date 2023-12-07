import { Listing } from "./listing";
import { MessageHistory } from "./messageHistory";

/**
 * User type for SnugSlug platform
 */
export type Slug = {
  // Basic user profile information
  id: number;
  name: string;
  email: string;
  age: number;
  school: string;
  class: number;
  profilePicUrl: string;

  // Associated type object lists
  activeListing: Listing;
  archivedListings: Listing[];
  savedListings: Listing[]; // listings marked with hearts
  chatListings: Listing[]; // listings with chathistories

  archivedUsers: Slug[];
  savedUsers: Slug[];
  chatUsers: Slug[];

  chatHistory: MessageHistory[];
};
