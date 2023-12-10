import { Slug } from "./slug";

export type ChatMessage = {
  sender: Slug;
  receiver: Slug;
  /**
   * The listingId is used to identify the listing that this message is about. For example, if two users are interested
   * in each other's listings, they will have two different chat threads - one for each listing.
   */
  listingId: number;
  text: string;
  timestamp: Date;
};
