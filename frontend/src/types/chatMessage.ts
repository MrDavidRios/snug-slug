import { Slug } from "./slug";

export type ChatMessage = {
    sender: Slug;
    timeStamp:Date;
    text:string;
  };
  
