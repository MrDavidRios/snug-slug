import React, { useEffect, useRef, useState } from "react";
import { ChatMessage } from "../../types/chatMessage";
import { Listing } from "../../types/listing";
import { Slug } from "../../types/slug";
import { sortMessagesByTimestamp } from "../../utils/sortMessages";
import { Button } from "../button/Button";
import { ArchiveIconButton } from "../button/archive-button/ArchiveIconButton";
import { ConfirmButton } from "../button/confirm-button/ConfirmButton";
import { HeartButton } from "../button/heart-button/HeartButton";
import { ChatBoxSublessor } from "../chatBoxSublessor/ChatBoxSublessor";
import { ChatBubble } from "../chatBubble/ChatBubble";
import { ChatInput } from "../chatInput/ChatInput";
import { PopUpWindow } from "../popUpWindow/PopUpWindow";

interface ChatBoxProps {
  slugA: Slug; // Self
  selectedListing: Listing | null;
  selectedUser: Slug | null;
  findingApartment: boolean;
  onArchiveChat: (listingId?: number, userId?: number) => void;
  onUnarchiveChat: (listingId?: number, userId?: number) => void;
  // if above true, then include sublessor details ChatBoxSublessor component
  inArchiveView: boolean;
  confirmAction: (userId?: number) => void; // used when confirming sublease
}

export const ChatBox: React.FC<ChatBoxProps> = ({
  slugA,
  selectedUser,
  selectedListing,
  findingApartment,
  onArchiveChat,
  onUnarchiveChat,
  inArchiveView,
  confirmAction,
}) => {
  const confirmationMessage = (
    <>
      <p>Note that by clicking confirm your listing will be no longer be active.</p>
      <p>To reactivate, go to your profile.</p>
    </>
  );
  // Like states
  const [liked, setLiked] = useState(false);

  const likeUpdate = (listing: Listing, newLikedState: boolean) => {
    setLiked(newLikedState);
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleConfirmClick = () => {
    setShowPopup(true);
  };

  const handleSubleaseConfirmation = () => {
    confirmAction(selectedUser?.id);
    setShowPopup(false);
  };

  const findChatHistory = () => {
    // Logic to find the correct chat history
    if (!findingApartment && selectedUser) {
      return slugA.chatHistory.find(
        (history) => history.slugA.id === selectedUser.id || history.slugB.id === selectedUser.id
      );
    }

    if (findingApartment && selectedListing) {
      return slugA.chatHistory.find(
        (history) =>
          (history.slugA.id === selectedListing.owner.id || history.slugB.id === selectedListing.owner.id) &&
          history.associatedListing?.id === selectedListing.id
      );
    }
  };

  const messageHistory = findChatHistory();
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
  const displayText =
    findingApartment && selectedListing
      ? selectedListing.location
      : !findingApartment && selectedUser
      ? selectedUser.name
      : "Select a User or Listing";

  const listingOwner = selectedListing?.owner;

  // Handling archive button click
  const handleArchiveClick = () => {
    onArchiveChat();
  };

  const handleUnarchiveClick = () => {
    onUnarchiveChat();
  };

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
            <HeartButton
              liked={liked}
              onClick={() => {
                if (listing) {
                  likeUpdate(listing, !liked);
                }
              }}
            />
          </div>
          <div id="listingLocation">{displayText}</div>
        </div>
        {(selectedListing || selectedUser) && (
          <div className="action-button-wrapper">
            {inArchiveView ? (
              <Button onClick={handleUnarchiveClick} text="Unarchive" className="unarchive" />
            ) : (
              <ArchiveIconButton onClick={handleArchiveClick} />
            )}
            {selectedUser && !findingApartment && <ConfirmButton onClick={handleConfirmClick} />}
          </div>
        )}
      </div>

      <div id="mainChatBox">
        {selectedListing && (
          <div id="sublessorInfo">{findingApartment && <ChatBoxSublessor user={listingOwner} />}</div>
        )}

        <div id="messages" className={findingApartment ? "messages-sublessor" : "messages-without-sublessor"}>
          {/* Mapping of chats here */}

          {sortedMessages.map((chatMessage, index) => (
            <ChatBubble key={index} message={chatMessage.text} isSender={chatMessage.sender.id === slugA.id} />
          ))}
          {/* Invisible div for scrolling */}
          <div ref={messagesEndRef} />
        </div>

        {(selectedUser || selectedListing) && (
          <div id="input">
            <ChatInput onSend={handleSendMessage} />
          </div>
        )}
      </div>
    </div>
  );
};
