import { useState } from "react";
import { ArchiveButton } from "../../components/button/archive-button/ArchiveButton";
import { ChatBox } from "../../components/chatBox/ChatBox";
import { ListingsView } from "../../components/listingsView/ListingsView";
import { LookingForToggle } from "../../components/lookingForToggle/LookingForToggle";
import { PersonCardList } from "../../components/personCardList/PersonCardList";
import { Slug } from "../../types/slug";
import { archiveListing, archiveUser } from "../../utils/archiveHelper";
import { getActiveListings, getActivePeople, getArchivedListings, getArchivedPeople } from "../../utils/userDataHelper";

interface InboxProps {
  currentUser: Slug;
}

export const Inbox: React.FC<InboxProps> = ({ currentUser }) => {
  const [lookingForApartment, setLookingForApartment] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<Slug>();
  const [showArchived, setShowArchived] = useState<boolean>(false);

  function resetSelection() {
    setSelectedUser(undefined);
  }

  const confirmAction = () => {
    if (selectedUser?.activeListing) {
      // Clear current user's active listing

      /**
       * Create user data clone and pass it into setUserData() using Flask
       */
      currentUser.activeListing = undefined;
      currentUser.archivedListingIDs.push(selectedUser.activeListing.id);

      resetSelection();
    }
  };

  const onArchive = (id: number, archivingListing: boolean) =>
    archivingListing ? archiveListing(id, currentUser) : archiveUser(id, currentUser);

  const onUnarchive = (id: number, archivingListing: boolean) =>
    archivingListing ? archiveListing(id, currentUser) : archiveUser(id, currentUser);

  return (
    <div id="inboxPageWrapper">
      <div className="listings-container">
        <div id="inboxActionButtonWrapper">
          <LookingForToggle
            lookingForApartment={lookingForApartment}
            onChange={(lookingForApartment) => {
              setLookingForApartment(lookingForApartment);
              resetSelection();
            }}
          />
          <ArchiveButton
            onClick={() => {
              setShowArchived(!showArchived);
              resetSelection();
            }}
            isArchivedView={showArchived}
          />
        </div>

        <div id="cardList">
          {lookingForApartment ? (
            <ListingsView
              listings={showArchived ? getArchivedListings(currentUser) : getActiveListings(currentUser)}
              onSelectListing={(listing) => setSelectedUser(listing.owner)}
              selectedListing={selectedUser?.activeListing}
              emptyMessage={`No listings ${showArchived ? "archived" : "found"}.`}
            />
          ) : (
            <PersonCardList
              people={showArchived ? getArchivedPeople(currentUser) : getActivePeople(currentUser)}
              currentUser={currentUser}
              onSelectUser={(user) => setSelectedUser(user)}
              selectedUser={selectedUser}
              onArchive={onArchive}
              onUnarchive={onUnarchive}
              displayArchiveButton={true}
              archived={showArchived}
              emptyMessage="Nobody here."
            />
          )}
        </div>
      </div>
      <ChatBox
        currentUser={currentUser}
        selectedUser={selectedUser}
        findingApartment={lookingForApartment}
        onArchive={onArchive}
        onUnarchive={onUnarchive}
        inArchiveView={showArchived}
        confirmAction={confirmAction}
      />
    </div>
  );
};
