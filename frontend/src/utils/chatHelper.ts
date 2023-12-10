import { LastMessagePair } from "../types/lastMessagePair";
import { Slug } from "../types/slug";
import { getChatHistory } from "./userDataHelper";

export function getLastMessage(slugA: Slug, slugB: Slug, slugAFindingApartment: boolean): LastMessagePair {
  const chatHistory = getChatHistory(slugA.id, slugB.id, slugAFindingApartment);

  if (chatHistory.length === 0) {
    return { otherUser: slugB, lastMessage: "No messages yet" };
  }

  return { otherUser: slugB, lastMessage: chatHistory[chatHistory.length - 1].text };
}
