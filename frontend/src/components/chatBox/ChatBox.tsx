import React, { useEffect, useRef, useState } from "react";
import { ChatMessage } from "../../types/chatMessage";
import { Listing } from "../../types/listing";
import { Slug } from "../../types/slug";
import { sendChatMessage } from "../../utils/chatHelper";
import { getListing } from "../../utils/listingDataHelper";
import { getChatHistory, getUserData } from "../../utils/userDataHelper";
import { Button } from "../button/Button";
import { ArchiveIconButton } from "../button/archive-button/ArchiveIconButton";
import { ConfirmButton } from "../button/confirm-button/ConfirmButton";
import { ChatBoxSublessor } from "../chatBoxSublessor/ChatBoxSublessor";
import { ChatBubble } from "../chatBubble/ChatBubble";
import { ChatInput } from "../chatInput/ChatInput";
import { PopUpWindow } from "../popUpWindow/PopUpWindow";

interface ChatBoxProps {
  currentUser: Slug; // Self
  selectedUserId?: number;
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
  selectedUserId,
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

  const [selectedUser, setSelectedUser] = useState<Slug | undefined>(undefined); // Selected user to chat with
  const [showPopup, setShowPopup] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [listing, setListing] = useState<Listing | undefined>(undefined);

  // Load selected user data
  useEffect(() => {
    const getSelectedUser = async () => {
      setSelectedUser(await getUserData(selectedUserId!));
    };

    const getCorrespondingListing = async () => {
      const listing = findingApartment ? await getListing(selectedUserId!) : await getListing(currentUser.id);
      setListing(listing);
    };

    if (!selectedUserId) {
      setSelectedUser(undefined);
      setListing(undefined);
      setMessages([]);
      return;
    }

    const loadMessages = async () => {
      if (!currentUser.id || !selectedUserId || !listing?.id) return;

      const messageHistory = await getChatHistory(currentUser.id, selectedUserId, listing?.id);
      setMessages(messageHistory);
    };

    getSelectedUser();
    getCorrespondingListing();
    loadMessages();
  }, [selectedUserId, currentUser.id, findingApartment, listing?.id]);

  const handleSendMessage = (newMessage: string) => {
    if (!selectedUser || !listing) return;
    if (newMessage.trim() === "") return;

    const newChatMessage: ChatMessage = {
      senderId: currentUser.id,
      recipientId: selectedUser.id,
      listingId: listing?.id,
      timestamp: new Date(),
      text: newMessage,
    };

    setMessages((prevMessages) => [...prevMessages, newChatMessage]);

    sendChatMessage(newChatMessage);
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
          <div id="listingLocation">{subject}</div>
        </div>
        {selectedUserId && (
          <div className="action-button-wrapper">
            {inArchiveView ? (
              <Button
                onClick={() => onUnarchive(selectedUserId, findingApartment)}
                text="Unarchive"
                className="unarchive"
              />
            ) : (
              <ArchiveIconButton onClick={() => onArchive(selectedUserId, findingApartment)} />
            )}
            {selectedUserId && !findingApartment && <ConfirmButton onClick={() => setShowPopup(true)} />}
          </div>
        )}
      </div>

      <div id="mainChatBox">
        {findingApartment && (
          <div id="sublessorInfo">{findingApartment && <ChatBoxSublessor user={selectedUser} />}</div>
        )}

        <div id="messages" className={findingApartment ? "messages-sublessor" : "messages-without-sublessor"}>
          {/* Mapping of chats here */}

          {messages.map((chatMessage, index) => (
            <ChatBubble key={index} message={chatMessage.text} isSender={chatMessage.senderId === currentUser.id} />
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
