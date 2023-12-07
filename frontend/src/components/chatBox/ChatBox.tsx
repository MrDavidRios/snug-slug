import React, { useState } from "react";
import { Slug } from "../../types/slug";
import { sortMessagesByTimestamp } from "../../utils/sortMessages";
import { ArchiveButton } from "../button/archive-button/ArchiveButton";
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

  const likeUpdate = (listing, newLikedState) => {
    setLiked(newLikedState);
  };

  // Find the message history between slugA and slugB
  const messageHistory = slugA.chatHistory.find((history) => history.slugB.id === slugB.id);

  const [messages, setMessages] = useState([...(messageHistory ? messageHistory.messages : [])]);

  const sortedMessages = messageHistory ? sortMessagesByTimestamp(messageHistory.messages) : [];

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

  // Action bar options
  const actions = ["Confirm sublease", "Archive chat"];

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
          <ArchiveButton />
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
        </div>

        <div id="input">
          <ChatInput onSend={handleSendMessage} />
        </div>
      </div>

      <div></div>
    </div>
  );
};
