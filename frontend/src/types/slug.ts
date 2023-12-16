import { ChatMessage } from "./chatMessage";
import { Listing } from "./listing";

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

  /**
   * Listing that the user currently has posted
   */
  activeListing?: Listing;

  /**
   * Listings that the user has saved
   */
  savedListings: Listing[];

  /**
   * Users that the user has archived
   */
  archivedUserIDs: number[];

  /**
   * Listings that the user has archived
   */
  archivedListingIDs: number[];

  /**
   * A user's chat history - used to construct inbox view
   */
  sentMessages: ChatMessage[];
  receivedMessages: ChatMessage[];
};
