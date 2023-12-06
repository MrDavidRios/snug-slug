import { Listing } from "./listing";
import { MessageHistory } from "./messageHistory";

/** User type for SnugSlug platform */

export type Slug = { // User

    // Basic user profile information
    id: number;
    name: string;
    email: string;
    age: number;
    school: string;
    class: number;
    profilePicUrl: string;

    // Associated type object lists
    createdListings: Listing[];
    savedListings: Listing[];
    chatListings: Listing[];

    archivedUsers: Slug[];
    savedUsers: Slug[];
    chatUsers: Slug[];

    chatHistory: MessageHistory[];
  };
  