import { useContext, useState } from "react";
import { UserContext, UserContextType } from "../../components/UserContext";
import { ArchiveButton } from "../../components/button/archive-button/ArchiveButton";
import { ChatBox } from "../../components/chatBox/ChatBox";
import { ListingsView } from "../../components/listingsView/ListingsView";
import { LookingForToggle } from "../../components/lookingForToggle/LookingForToggle";
import { PersonCardList } from "../../components/personCardList/PersonCardList";
import { Slug } from "../../types/slug";
import { archiveListing, archiveUser } from "../../utils/archiveHelper";
import { getActiveListings, getActivePeople, getArchivedListings, getArchivedPeople } from "../../utils/userDataHelper";

export const Inbox: React.FC = () => {
  const { slug } = useContext(UserContext) as UserContextType;

  const [lookingForApartment, setLookingForApartment] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<Slug>();
  const [showArchived, setShowArchived] = useState<boolean>(false);

  function resetSelection() {
    setSelectedUser(undefined);
  }

  const confirmAction = () => {
    if (slug && selectedUser?.activeListing) {
      // Clear current slug's active listing

      /**
       * Create slug data clone and pass it into setUserData() using Flask
       */
      slug.activeListing = undefined;
      slug.archivedListingIDs.push(selectedUser.activeListing.id);

      resetSelection();
    }
  };

  const onArchive = (id: number, archivingListing: boolean) =>
    archivingListing ? archiveListing(id, slug) : archiveUser(id, slug);

  const onUnarchive = (id: number, archivingListing: boolean) =>
    archivingListing ? archiveListing(id, slug) : archiveUser(id, slug);

  return (
    <div id="inboxPageWrapper">
      {slug !== undefined ? (
        <>
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
                  listings={showArchived ? getArchivedListings(slug) : getActiveListings(slug)}
                  onSelectListing={(listing) => setSelectedUser(listing.owner)}
                  selectedListing={selectedUser?.activeListing}
                  emptyMessage={`No listings ${showArchived ? "archived" : "found"}.`}
                />
              ) : (
                <PersonCardList
                  people={showArchived ? getArchivedPeople(slug) : getActivePeople(slug)}
                  currentUser={slug}
                  onSelectUser={(slug) => setSelectedUser(slug)}
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
            currentUser={slug}
            selectedUser={selectedUser}
            findingApartment={lookingForApartment}
            onArchive={onArchive}
            onUnarchive={onUnarchive}
            inArchiveView={showArchived}
            confirmAction={confirmAction}
          />
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};
