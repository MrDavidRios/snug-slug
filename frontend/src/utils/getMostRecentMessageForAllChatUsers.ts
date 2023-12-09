import { MessageHistory } from "../types/messageHistory";
import { Slug } from "../types/slug";

const getRecentMessagesForAllChatUsers = (currentUser: Slug) => {
  return currentUser.chatHistory.map((history: MessageHistory) => {
    // Determine the other user in the chat history
    const otherUser = history.slugA.id === currentUser.id ? history.slugB : history.slugA;

    // Determine the most recent message, if any
    const mostRecentMessage = history.messages.length > 0 
      ? history.messages[history.messages.length - 1].text 
      : 'No messages yet';

    return { otherUser, mostRecentMessage };
  });
};

export default getRecentMessagesForAllChatUsers;
// returns array of objects - each object caontins an 'otherUser' and the 'mostRecentMessage' 
// betwewen 'currentUser' and 'otherUser'