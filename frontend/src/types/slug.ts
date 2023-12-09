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
  classYear: number;
  pronouns: string;
  profilePicUrl: string;
  bio: string;

  budget: string;  
  dates: string;  

  // Associated type object lists
  activeListing: Listing | null;
  archivedListings: Listing[]; // listings of current user that have been archived
  savedListings: Listing[]; // listings marked with hearts
  chatListings: Listing[]; // listings with chathistories

  archivedUsers: Slug[];
  savedUsers: Slug[];

  chatHistory: MessageHistory[];
};
