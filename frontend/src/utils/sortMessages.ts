import { ChatMessage } from "../types/chatMessage";

export function sortMessagesByTimestamp(messages: ChatMessage[]): ChatMessage[] {
  return messages.sort((a, b) => a.timeStamp.getTime() - b.timeStamp.getTime());
}