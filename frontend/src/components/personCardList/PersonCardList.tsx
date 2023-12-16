import React from "react";
import { Slug } from "../../types/slug";
import { PersonCard } from "../personCard/PersonCard";
interface PersonCardListProps {
  people: Slug[];
  currentUser: Slug;
  onSelectUser: (user: Slug) => void;
  selectedUserId?: number;
  displayArchiveButton?: boolean;
  archived?: boolean;
  onArchive: (id: number, archivingListing: boolean) => void;
  onUnarchive: (id: number, unarchivingListing: boolean) => void;
  emptyMessage?: string;
}

export const PersonCardList: React.FC<PersonCardListProps> = ({
  people,
  currentUser,
  onSelectUser,
  selectedUserId,
  archived = false,
  onArchive,
  onUnarchive,
  emptyMessage = "",
}) => {
  return (
    <>
      <div className="listingGrid">
        {people.length === 0 && <p>{emptyMessage}</p>}
        {people.map((otherUser, index) => (
          <PersonCard
            person={otherUser}
            currentUser={currentUser}
            inInbox={true}
            archived={archived}
            onArchive={onArchive}
            onUnarchive={onUnarchive}
            onClick={() => onSelectUser(otherUser)}
            key={index}
            className={selectedUserId && selectedUserId === otherUser.id ? "selected" : ""}
          />
        ))}
      </div>
    </>
  );
};
