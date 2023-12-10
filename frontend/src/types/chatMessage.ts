import { Slug } from "./slug";

export type ChatMessage = {
  sender: Slug;
  receiver: Slug;
  text: string;
  timestamp: Date;
};
