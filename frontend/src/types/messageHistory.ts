import { Slug } from "./slug";
import { ChatMessage } from "./chatMessage";

export type MessageHistory = {
    slugA: Slug;
    slugB: Slug;

    messages: ChatMessage[];
  };
  
  