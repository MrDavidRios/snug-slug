import React from "react";
import { Slug } from "../../types/slug";
import { PersonCard } from "../personCard/PersonCard";
interface PersonCardListProps {
  //   currentUser: Slug;
  userMessagePairs: UserMessagePair[];
  onSelectUser: (user: Slug) => void;
  selectedUser: Slug | null;
  //   showArchived: boolean;
  displayArchiveButton?: boolean;
  archived?: boolean;
  onArchive: (user: Slug) => void;
  onUnarchive: (user: Slug) => void;
  emptyMessage?: string;
}

// user-message pairs
interface UserMessagePair {
  otherUser: Slug;
  mostRecentMessage: string;
}

export const PersonCardList: React.FC<PersonCardListProps> = ({
  /*currentUser,*/ userMessagePairs,
  onSelectUser,
  selectedUser,
  displayArchiveButton = false,
  archived = false,
  onArchive,
  onUnarchive,
  emptyMessage = "",
}) => {
  // TODO: Implement backend logic

  // const [userMessagePairs, setUserMessagePairs] = useState<UserMessagePair[]>([]);

  // useEffect(()=>{
  //     const recentMessages = getRecentMessagesForAllChatUsers(currentUser);
  //     setUserMessagePairs(recentMessages);
  // }, [currentUser]); // Runs when user prop changes

  // useEffect(() => {
  //     // Filter the chat history based on the isArchived flag
  //     const filteredChatHistory = currentUser.chatHistory.filter(history => history.isArchived === showArchived);

  //     // Extract userMessagePairs from the filtered chat history
  //     const recentMessages = filteredChatHistory.map(history => {
  //         const otherUser = history.slugA.id === currentUser.id ? history.slugB : history.slugA;
  //         const mostRecentMessage = history.messages.length > 0 ? history.messages[history.messages.length - 1].text : "No messages yet";

  //         return { otherUser, mostRecentMessage };
  //     });

  //     setUserMessagePairs(recentMessages);
  // }, [currentUser, showArchived]); // Also depend on showArchived

  return (
    <>
      <div className="listingGrid">
        {userMessagePairs.length === 0 && <p>{emptyMessage}</p>}
        {userMessagePairs.map(({ otherUser, mostRecentMessage }, index) => (
          <div
            onClick={() => onSelectUser(otherUser)}
            key={index}
            className={selectedUser && selectedUser.id === otherUser.id ? "selectedCard" : ""}
          >
            <PersonCard
              user={otherUser}
              mostRecentChatMessage={mostRecentMessage}
              displayArchiveButton={displayArchiveButton}
              archived={archived}
              onArchive={onArchive}
              onUnarchive={onUnarchive}
            />
          </div>
        ))}
      </div>
    </>
  );
};
