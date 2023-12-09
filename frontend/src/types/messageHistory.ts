import { Slug } from "./slug";
import { ChatMessage } from "./chatMessage";
import { Listing } from "./listing";

export type MessageHistory = {
    slugA: Slug; // Current user
    slugB: Slug; // Other user

    messages: ChatMessage[]; // list of messages each with a timestamp
    isArchived: boolean; // Indicate if the chat is archived

    associatedListing: Listing; // Listing associated with the messageHistory, can be slugA or B
  };
  
  