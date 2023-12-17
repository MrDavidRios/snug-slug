import { ChatMessage } from "../types/chatMessage";
import { LastMessagePair } from "../types/lastMessagePair";
import { Slug } from "../types/slug";
import { getChatHistory } from "./userDataHelper";

export async function getLastMessage(slugA: Slug, slugB: Slug, listingId: number): Promise<LastMessagePair> {
  const chatHistory = await getChatHistory(slugA.id, slugB.id, listingId);

  if (chatHistory.length === 0) {
    return { otherUser: slugB, message: "No messages yet" };
  }

  return { otherUser: slugB, message: chatHistory[chatHistory.length - 1].text };
}

export async function sendChatMessage(message: ChatMessage) {
  const { senderId, recipientId: receiverId, listingId, text } = message;

  const messageWithoutTimestamp: Omit<ChatMessage, "timestamp"> = {
    senderId,
    recipientId: receiverId,
    listingId,
    text,
  };

  const response = await fetch("http://127.0.0.1:8080/api/snugslug/addChatMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messageWithoutTimestamp),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function getChatMessages(
  senderId: number,
  recipientId: number,
  listingId: number
): Promise<ChatMessage[]> {
  const response = await fetch(
    `http://127.0.0.1:8080/api/snugslug/getChatMessages?senderId=${senderId}&recipientId=${recipientId}&listingId=${listingId}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = (await response.json()) as {
    id: number;
    listing_id: number;
    sender_id: number;
    recipient_id: number;
    text: string;
    timestamp: string;
  }[];

  const messages = data.map((message) => ({
    id: message.id,
    listingId: message.listing_id,
    senderId: message.sender_id,
    recipientId: message.recipient_id,
    text: message.text,
    timestamp: new Date(message.timestamp),
  }));

  return messages;
}
