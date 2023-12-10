import { useState } from "react";
import { ArchiveButton } from "../../components/button/archive-button/ArchiveButton";
import { ChatBox } from "../../components/chatBox/ChatBox";
import { ListingsView } from "../../components/listingsView/listingsView";
import { LookingForToggle } from "../../components/lookingForToggle/LookingForToggle";
import { PersonCardList } from "../../components/personCardList/PersonCardList";
import { Listing } from "../../types/listing";
import { Slug } from "../../types/slug";

interface InboxProps {
  currentUser: Slug;
}

export const Inbox: React.FC<InboxProps> = ({ currentUser }) => {
  const [lookingForApartment, setLookingForApartment] = useState<boolean>(true);

  const [selectedUser, setSelectedUser] = useState<Slug | null>(null);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const [showArchived, setShowArchived] = useState<boolean>(false);

  // To ensure that whenever currentUser.chatHistory changes
  // upon archiving action
  // useEffect(() => {
  //   setArchivedListings(getArchivedListings());
  //   setActiveListings(getActiveListings());
  // }, [currentUser.chatHistory]);

  const [archivedListings, setArchivedListings] = useState<Listing[]>([]);
  const [activeListings, setActiveListings] = useState<Listing[]>([]);

  // Getter functions for associated entries

  // Prepare the user-message pairs
  const getUserMessagePairs = (showArchived: boolean) => {
    return currentUser.chatHistory
      .filter((history) => {
        // Check if the chat is archived or not as per the required status
        const isArchivedCheck = history.isArchived === showArchived;

        // Check if the associated listing of the chat is the current user's active listing
        const isNotCurrentUsersListing = history.associatedListing?.id === currentUser.activeListing?.id;

        return isArchivedCheck && isNotCurrentUsersListing;
      })
      .map((history) => {
        const otherUser = history.slugA.id === currentUser.id ? history.slugB : history.slugA;
        const mostRecentMessage =
          history.messages.length > 0 ? history.messages[history.messages.length - 1].text : "No messages yet";
        return { otherUser, mostRecentMessage };
      });
  };

  // Function to get listings associated with archived chats, excluding the current user's active listing
  const getArchivedListings = () => {
    return currentUser.chatHistory
      .filter(
        (history) =>
          history.isArchived &&
          history.associatedListing !== null &&
          history.associatedListing.id !== currentUser.activeListing?.id
      )
      .map((history) => history.associatedListing)
      .filter((listing, index, self) => self.findIndex((l) => l.id === listing.id) === index);
  };

  // Function to get listings associated with non-archived chats, excluding the current user's active listing
  const getActiveListings = () => {
    return currentUser.chatHistory
      .filter(
        (history) =>
          !history.isArchived &&
          history.associatedListing !== null &&
          history.associatedListing.id !== currentUser.activeListing?.id
      )
      .map((history) => history.associatedListing)
      .filter((listing, index, self) => self.findIndex((l) => l.id === listing.id) === index);
  };

  // Function used for both archiving and unarchiving
  const archiveChat = (listingId: number | null, userId: number | null, archiveStatus: boolean) => {
    const updatedChatHistory = currentUser.chatHistory.map((chat) => {
      if (
        (listingId && chat.associatedListing?.id === listingId) ||
        (userId && (chat.slugA.id === userId || chat.slugB.id === userId))
      ) {
        return { ...chat, isArchived: archiveStatus };
      }
      return chat;
    });

    // update currentUser's chatHistory
    currentUser.chatHistory = updatedChatHistory;

    // Update the states for archived and active listings
    setArchivedListings(getArchivedListings());
    setActiveListings(getActiveListings());

    setSelectedUser(null);
    setSelectedListing(null);
  };

  const confirmAction = () => {
    if (selectedListing) {
      // Set the current user's active listing to null
      currentUser.activeListing = null;
      // Move the listing to archived listings
      currentUser.archivedListings.push(selectedListing);

      // Update states to reflect changes
      setArchivedListings(getArchivedListings());
      setActiveListings(getActiveListings());

      setSelectedUser(null);
      setSelectedListing(null);
    }
  };

  return (
    <div id="inboxPageWrapper">
      <div className="listings-container">
        <div id="inboxActionButtonWrapper">
          <LookingForToggle lookingForApartment={lookingForApartment} onChange={setLookingForApartment} />
          <ArchiveButton
            onClick={() => {
              setShowArchived(!showArchived);
              setSelectedUser(null);
              setSelectedListing(null);
            }}
            isArchivedView={showArchived}
          />
        </div>

        <div id="cardList">
          {lookingForApartment ? (
            <ListingsView
              listings={showArchived ? getArchivedListings() : getActiveListings()}
              onSelectListing={(listing) => setSelectedListing(listing)}
              selectedListing={selectedListing}
            />
          ) : (
            <PersonCardList
              userMessagePairs={getUserMessagePairs(showArchived)}
              onSelectUser={(user) => setSelectedUser(user)}
              selectedUser={selectedUser}
            />
          )}
        </div>
      </div>
      <div className="chatbox-container">
        <ChatBox
          slugA={currentUser}
          selectedUser={selectedUser}
          selectedListing={selectedListing}
          findingApartment={lookingForApartment}
          onArchiveChat={() => archiveChat(selectedListing?.id || null, selectedUser?.id || null, true)}
          onUnarchiveChat={() => archiveChat(selectedListing?.id || null, selectedUser?.id || null, false)}
          inArchiveView={showArchived}
          confirmAction={confirmAction}
        />
      </div>
    </div>
  );
};
