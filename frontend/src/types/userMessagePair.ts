import { Slug } from "../types/slug"; 

// Used in personcard for inbox page to display most recent message

export interface UserMessagePair {
  otherUser: Slug;
  mostRecentMessage: string;
}
