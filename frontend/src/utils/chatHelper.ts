import { LastMessagePair } from "../types/lastMessagePair";
import { Slug } from "../types/slug";
import { getChatHistory } from "./userDataHelper";

export async function getLastMessage(
  slugA: Slug,
  slugB: Slug,
  slugAFindingApartment: boolean
): Promise<LastMessagePair> {
  const chatHistory = await getChatHistory(slugA.id, slugB.id, slugAFindingApartment);

  if (chatHistory.length === 0) {
    return { otherUser: slugB, message: "No messages yet" };
  }

  return { otherUser: slugB, message: chatHistory[chatHistory.length - 1].text };
}
