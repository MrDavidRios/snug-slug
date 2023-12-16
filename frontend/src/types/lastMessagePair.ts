import { Slug } from "./slug";

/**
 * Used in PersonCard for inbox page to display most recent message
 */
export interface LastMessagePair {
  otherUser: Slug;
  message: string;
}
