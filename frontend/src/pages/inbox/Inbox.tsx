import { useState } from "react";
import { ArchiveButton } from "../../components/button/archive-button/ArchiveButton";
import { ChatBox } from "../../components/chatBox/ChatBox";
import { ListingsView } from "../../components/listingsView/listingsView";
import { LookingForToggle } from "../../components/lookingForToggle/LookingForToggle";
import { Listing } from "../../types/listing";
import { Slug } from "../../types/slug";
import { PersonCardList } from "../../components/personCardList/PersonCardList";

interface InboxProps {
  currentUser: Slug;
}

export const Inbox: React.FC<InboxProps> = ({currentUser}) => {

  // All states
  const [lookingForApartment, setLookingForApartment] = useState<boolean>(true);

  const [selectedUser, setSelectedUser] = useState<Slug | null>(null);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const [showArchived, setShowArchived] = useState<boolean>(false);

  return (
    <div id="inboxPageWrapper">
        <div className="listings-container">
          <div id="inboxActionButtonWrapper">
            <LookingForToggle lookingForApartment={lookingForApartment} onChange={setLookingForApartment} />
            <ArchiveButton onClick={() => setShowArchived(!showArchived)} isArchivedView={showArchived} />

          </div>

          <div id="cardList">
            {lookingForApartment ? (
              showArchived ? (
                // Display archived listings
                <ListingsView 
                  listings={currentUser.chatListings}
                  onSelectListing={(listing) => setSelectedListing(listing)}
                  selectedListing={selectedListing}
                />
              ) : (
                // Display current chat listings
                <ListingsView 
                  listings={currentUser.chatListings}
                  onSelectListing={(listing) => setSelectedListing(listing)}
                  selectedListing={selectedListing}
                />
              )
            ) : (
              showArchived ? (
                // Display archived users
                <PersonCardList 
                  currentUser={currentUser}
                  onSelectUser={(user) => setSelectedUser(user)}
                  selectedUser={selectedUser}
                  showArchived={true}
                />
              ) : (
                // Display current users (sublessor view)
                <PersonCardList 
                  currentUser={currentUser}
                  onSelectUser={(user) => setSelectedUser(user)}
                  selectedUser={selectedUser}
                  showArchived={false}
                />
              )
            )}
          </div>
        </div>
        <div className="chatbox-container">
          <ChatBox slugA={ currentUser } selectedUser={ selectedUser } selectedListing={ selectedListing } findingApartment={lookingForApartment} />
        </div>
      </div>
    // </div>
  );
};
