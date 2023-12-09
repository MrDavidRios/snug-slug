import React, { useEffect, useRef, useState } from "react";
import { Listing } from "../../types/listing";
import { Slug } from "../../types/slug";
import { sortMessagesByTimestamp } from "../../utils/sortMessages";
import { ArchiveIconButton } from "../button/archive-button/ArchiveIconButton";
import { ConfirmButton } from "../button/confirm-button/ConfirmButton";
import { HeartButton } from "../button/heart-button/HeartButton";
import { ChatBoxSublessor } from "../chatBoxSublessor/ChatBoxSublessor";
import { ChatBubble } from "../chatBubble/ChatBubble";
import { ChatInput } from "../chatInput/ChatInput";
import { ChatMessage } from "../../types/chatMessage";
import { MessageHistory } from "../../types/messageHistory";

interface ChatBoxProps {
  slugA: Slug; // Self
  selectedListing: Listing | null;
  selectedUser: Slug | null;
  findingApartment: boolean;
  // if above true, then include sublessor details ChatBoxSublessor component
}

export const ChatBox: React.FC<ChatBoxProps> = ({ slugA, selectedUser, selectedListing, findingApartment }) => {

    // Like states
    const [liked, setLiked] = useState(false);

    const likeUpdate = (listing: Listing, newLikedState: boolean) => {
        setLiked(newLikedState);
    };

    // Find the message history
    let messageHistory: MessageHistory | undefined | null;
    if (findingApartment && selectedListing) {
        messageHistory = slugA.chatHistory.find(history => history.slugB.id === selectedListing.owner.id);
        console.log(messageHistory)
    } else if (!findingApartment && selectedUser) {
        messageHistory = slugA.chatHistory.find(history => history.slugB.id === selectedUser.id);
        console.log(messageHistory)
    } else {
        messageHistory = null;
    }
    // const messageHistory = selectedUser ? slugA.chatHistory.find(history => history.slugB.id === selectedUser.id) : null;
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    
    useEffect(() => {
        setMessages(messageHistory ? messageHistory.messages : []);
    }, [messageHistory]);

    const sortedMessages = messages ? sortMessagesByTimestamp(messages) : [];
    const handleSendMessage = (newMessage: string) => {
        if (newMessage.trim() === "") return;

        const newChatMessage = {
        sender: slugA,
        timeStamp: new Date(),
        text: newMessage,
        };

        setMessages((prevMessages) => [...prevMessages, newChatMessage]);

        // TODO: Backend integration
        return;
    };

    // Logic for automatic bottom scrolling for new messages
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Display text
    const listing = selectedUser?.activeListing;
    const displayText = findingApartment && selectedListing 
                        ? selectedListing.location 
                        : !findingApartment && selectedUser 
                        ? selectedUser.name 
                        : 'Select a User or Listing';

    const listingOwner = selectedListing?.owner;

  return (
    <div id="chatBoxContainer">
      <div id="chatBoxTabBar">
        <div id="leftSideTabBar">
          <div id="heartButton">
            <HeartButton
              liked={liked}
              onClick={() => {
                if (listing){
                    likeUpdate(listing, !liked);
                }
              }}
            />
          </div>
          <div id="listingLocation">{displayText}</div>
        </div>
        <div className="action-button-wrapper">
          <ArchiveIconButton />
          {!findingApartment && <ConfirmButton />}
        </div>
      </div>

      <div id="mainChatBox">
        {selectedListing &&
        <div id="sublessorInfo">{findingApartment && <ChatBoxSublessor user={listingOwner} />}</div>}

        <div id="messages" className={findingApartment ? "messages-sublessor":"messages-without-sublessor"}>
          {/* Mapping of chats here */}

          {sortedMessages.map((chatMessage, index) => (
            <ChatBubble key={index} message={chatMessage.text} isSender={chatMessage.sender.id === slugA.id} />
          ))}
          {/* Invisible div for scrolling */}
          <div ref={messagesEndRef} />
        </div>

        {(selectedUser || selectedListing) &&
        <div id="input">
          <ChatInput onSend={handleSendMessage} />
        </div>
    }
      </div>
    </div>
  );
};
