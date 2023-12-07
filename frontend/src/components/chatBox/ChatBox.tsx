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

interface ChatBoxProps {
  slugA: Slug; // Self
  slugB: Slug; // Other user
  findingApartment: boolean;
  // if above true, then include sublessor details ChatBoxSublessor component
}

export const ChatBox: React.FC<ChatBoxProps> = ({ slugA, slugB, findingApartment }) => {
  const listing = slugB.activeListing;
  const [liked, setLiked] = useState(false);

  const likeUpdate = (listing: Listing, newLikedState: boolean) => {
    setLiked(newLikedState);
  };

  // Find the message history between slugA and slugB
  const messageHistory = slugA.chatHistory.find((history) => history.slugB.id === slugB.id);
  const [messages, setMessages] = useState([...(messageHistory ? messageHistory.messages : [])]);

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
  const messagesEndRef = useRef(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div id="chatBoxContainer">
      <div id="chatBoxTabBar">
        <div id="leftSideTabBar">
          <div id="heartButton">
            <HeartButton
              liked={liked}
              onClick={() => {
                likeUpdate(listing, !liked);
              }}
            />
          </div>
          <div id="listingLocation">{listing.location}</div>
        </div>
        <div className="action-button-wrapper">
          <ArchiveIconButton />
          {!findingApartment && <ConfirmButton />}
        </div>
      </div>

      <div id="mainChatBox">
        <div id="sublessorInfo">{findingApartment && <ChatBoxSublessor user={slugB} />}</div>

        <div id="messages">
          {/* Mapping of chats here */}

          {sortedMessages.map((chatMessage, index) => (
            <ChatBubble key={index} message={chatMessage.text} isSender={chatMessage.sender.id === slugA.id} />
          ))}
          {/* Invisible div for scrolling */}
          <div ref={messagesEndRef} />
        </div>

        <div id="input">
          <ChatInput onSend={handleSendMessage} />
        </div>
      </div>

      <div></div>
    </div>
  );
};
