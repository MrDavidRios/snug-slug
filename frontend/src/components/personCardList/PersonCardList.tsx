import React from "react";
import { PersonCard } from "../personCard/PersonCard";
import { Slug } from "../../types/slug";
interface PersonCardListProps {
//   currentUser: Slug;
  userMessagePairs: UserMessagePair[];
  onSelectUser: (user:Slug) => void;
  selectedUser: Slug | null;
//   showArchived: boolean;
}

// user-message pairs
interface UserMessagePair { 
    otherUser: Slug;
    mostRecentMessage: string;
  }
  

export const PersonCardList: React.FC<PersonCardListProps> = ({ /*currentUser,*/ userMessagePairs, onSelectUser, selectedUser}) => {

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
            {userMessagePairs.map(({ otherUser, mostRecentMessage }, index) => (
            <div 
                onClick={() => onSelectUser(otherUser)} 
                key={index}
                className={selectedUser && selectedUser.id === otherUser.id ? 'selectedCard' : ''}>

                <PersonCard
                user={otherUser}
                mostRecentChatMessage={mostRecentMessage}
                />
            </div>
            ))}
        </div>
        </>
    );
};
