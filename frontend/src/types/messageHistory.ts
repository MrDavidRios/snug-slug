import { Slug } from "./slug";
import { ChatMessage } from "./chatMessage";

export type MessageHistory = {
    slugA: Slug; // Current user
    slugB: Slug; // Other user

    messages: ChatMessage[];
    // should be a list of messages each with a timestamp
    isArchived: boolean; // Indicate if the chat is archived
  };
  
  