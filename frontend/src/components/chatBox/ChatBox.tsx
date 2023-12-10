import React, { useEffect, useRef, useState } from "react";
import { ChatMessage } from "../../types/chatMessage";
import { Slug } from "../../types/slug";
import { sortMessagesByTimestamp } from "../../utils/sortMessages";
import { getChatHistory } from "../../utils/userDataHelper";
import { Button } from "../button/Button";
import { ArchiveIconButton } from "../button/archive-button/ArchiveIconButton";
import { ConfirmButton } from "../button/confirm-button/ConfirmButton";
import { HeartButton } from "../button/heart-button/HeartButton";
import { ChatBoxSublessor } from "../chatBoxSublessor/ChatBoxSublessor";
import { ChatBubble } from "../chatBubble/ChatBubble";
import { ChatInput } from "../chatInput/ChatInput";
import { PopUpWindow } from "../popUpWindow/PopUpWindow";

interface ChatBoxProps {
  currentUser: Slug; // Self
  selectedUser?: Slug;
  findingApartment: boolean;
  onArchive: (id: number, archivingListing: boolean) => void;
  onUnarchive: (id: number, unarchivingListing: boolean) => void;
  inArchiveView: boolean;

  /**
   * Actions carried out when confirming sublease
   */
  confirmAction: (userId?: number) => void;
}

export const ChatBox: React.FC<ChatBoxProps> = ({
  currentUser,
  selectedUser,
  findingApartment,
  onArchive,
  onUnarchive,
  inArchiveView,
  confirmAction,
}) => {
  const confirmationMessage = (
    <>
      <p>Note that by clicking confirm your listing will be no longer be active.</p>
      <p>To reactivate, go to your profile.</p>
    </>
  );

  const [showPopup, setShowPopup] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const messageHistory = selectedUser ? getChatHistory(currentUser.id, selectedUser?.id) : [];
    setMessages(messageHistory);
  }, [currentUser, selectedUser]);

  const sortedMessages = messages ? sortMessagesByTimestamp(messages) : [];
  const handleSendMessage = (newMessage: string) => {
    if (!selectedUser) return;

    if (newMessage.trim() === "") return;

    const newChatMessage: ChatMessage = {
      sender: currentUser,
      receiver: selectedUser,
      timestamp: new Date(),
      text: newMessage,
    };

    setMessages((prevMessages) => [...prevMessages, newChatMessage]);

    // TODO: Backend integration
    return;
  };

  const handleSubleaseConfirmation = () => {
    confirmAction(selectedUser?.id);
    setShowPopup(false);
  };

  // Logic for automatic bottom scrolling for new messages
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Display text
  const listing = selectedUser?.activeListing;

  let subject = findingApartment && listing ? listing.location : "Select a User or Listing";
  if (!findingApartment) subject = selectedUser?.name || "Select a User or Listing";

  return (
    <div id="chatBoxContainer">
      {showPopup && (
        <div id="popup">
          <PopUpWindow
            message={confirmationMessage}
            onConfirm={handleSubleaseConfirmation}
            onClose={() => setShowPopup(false)}
          />
        </div>
      )}

      <div id="chatBoxTabBar">
        <div id="leftSideTabBar">
          <div id="heartButton">
            <HeartButton liked={false} />
          </div>
          <div id="listingLocation">{subject}</div>
        </div>
        {selectedUser && (
          <div className="action-button-wrapper">
            {inArchiveView ? (
              <Button
                onClick={() => onUnarchive(selectedUser.id, findingApartment)}
                text="Unarchive"
                className="unarchive"
              />
            ) : (
              <ArchiveIconButton onClick={() => onArchive(selectedUser.id, findingApartment)} />
            )}
            {selectedUser && !findingApartment && <ConfirmButton onClick={() => setShowPopup(true)} />}
          </div>
        )}
      </div>

      <div id="mainChatBox">
        {findingApartment && (
          <div id="sublessorInfo">{findingApartment && <ChatBoxSublessor user={selectedUser} />}</div>
        )}

        <div id="messages" className={findingApartment ? "messages-sublessor" : "messages-without-sublessor"}>
          {/* Mapping of chats here */}

          {sortedMessages.map((chatMessage, index) => (
            <ChatBubble key={index} message={chatMessage.text} isSender={chatMessage.sender.id === currentUser.id} />
          ))}
          {/* Invisible div for scrolling */}
          <div ref={messagesEndRef} />
        </div>

        {selectedUser && (
          <div id="input">
            <ChatInput onSend={handleSendMessage} />
          </div>
        )}
      </div>
    </div>
  );
};
