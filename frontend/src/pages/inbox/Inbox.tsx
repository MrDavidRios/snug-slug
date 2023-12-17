import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../../components/UserContext";
import { ArchiveButton } from "../../components/button/archive-button/ArchiveButton";
import { ChatBox } from "../../components/chatBox/ChatBox";
import { ListingsView } from "../../components/listingsView/ListingsView";
import { LoadingIndicator } from "../../components/loadingIndicator/loadingIndicator";
import { LookingForToggle } from "../../components/lookingForToggle/LookingForToggle";
import { PersonCardList } from "../../components/personCardList/PersonCardList";
import { Listing } from "../../types/listing";
import { Slug } from "../../types/slug";
import { archiveListing, archiveUser } from "../../utils/archiveHelper";
import { getListing } from "../../utils/listingDataHelper";
import { getActivePeople, getArchivedPeople } from "../../utils/userDataHelper";

export const Inbox: React.FC = () => {
  const { slug } = useContext(UserContext) as UserContextType;

  const [lookingForApartment, setLookingForApartment] = useState<boolean>(true);
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();
  const [showArchived, setShowArchived] = useState<boolean>(false);

  const [listings, setListings] = useState<Listing[] | undefined>();
  const [people, setPeople] = useState<Slug[] | undefined>();

  useEffect(() => {
    const updateDisplayedInformation = async () => {
      if (!slug) return;

      // const listingsToDisplay = showArchived ? await getArchivedListings(slug) : await getActiveListings(slug);

      // Brian Lee's listing :)
      setListings([await getListing(14)]);

      const peopleToDisplay = showArchived ? await getArchivedPeople(slug) : await getActivePeople(slug);
      setPeople(peopleToDisplay);
    };

    updateDisplayedInformation();
  }, [showArchived, slug]);

  function resetSelection() {
    setSelectedUserId(undefined);
  }

  // TODO: implement this
  const confirmAction = () => {
    console.log("IMPLEMENT: confirm action");
  };

  const onArchive = (id: number, archivingListing: boolean) =>
    archivingListing ? archiveListing(id, slug) : archiveUser(id, slug);

  const onUnarchive = (id: number, archivingListing: boolean) =>
    archivingListing ? archiveListing(id, slug) : archiveUser(id, slug);

  return (
    <div id="inboxPageWrapper">
      {slug && listings && people ? (
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
                  listings={listings ?? []}
                  onSelectListing={(listing) => setSelectedUserId(listing.ownerId)}
                  selectedListingPredicate={(listing) => listing.ownerId === selectedUserId}
                  emptyMessage={`No listings ${showArchived ? "archived" : "found"}.`}
                />
              ) : (
                <PersonCardList
                  people={people ?? []}
                  currentUser={slug}
                  onSelectUser={(slug) => setSelectedUserId(slug.id)}
                  selectedUserId={selectedUserId}
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
            selectedUserId={selectedUserId}
            findingApartment={lookingForApartment}
            onArchive={onArchive}
            onUnarchive={onUnarchive}
            inArchiveView={showArchived}
            confirmAction={confirmAction}
          />
        </>
      ) : (
        <LoadingIndicator />
      )}
    </div>
  );
};
