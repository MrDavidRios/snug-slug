import { useEffect, useState } from "react";
import { Slug } from "../../types/slug";
import { getLastMessage } from "../../utils/chatHelper";
import { PersonCardMessageBox } from "../PersonCardMessageBox/PersonCardMessageBox";
import { Button } from "../button/Button";
import { ArchiveIconButton } from "../button/archive-button/ArchiveIconButton";
import { Card, CardProps } from "../card/Card";

interface PersonCardProps extends CardProps {
  person: Partial<Slug> | Slug;
  currentUser?: Slug;
  archived?: boolean;
  onArchive?: (id: number, archivingListing: boolean) => void;
  onUnarchive?: (id: number, unarchivingListing: boolean) => void;
  inInbox?: boolean;
}

export const PersonCard: React.FC<PersonCardProps> = ({
  person,
  currentUser,
  archived,
  onArchive,
  onUnarchive,
  inInbox = false,
  className,
  onClick,
}) => {
  const { id, name, email, age, school, classYear, pronouns, profilePicUrl, bio, budget, startDate, endDate } = person;

  const [lastMessage, setLastMessage] = useState<string | undefined>();

  useEffect(() => {
    const updateLastMessage = async () => {
      if (!currentUser || !person) return;

      const lastMessage = await getLastMessage(currentUser, person as Slug, false);
      setLastMessage(lastMessage.message);
    };

    updateLastMessage();
  }, [currentUser, person]);

  // If there is no URL to the profile picture, display a gray circle
  const profileImage = profilePicUrl ? (
    <img src={profilePicUrl} alt={`${name}'s profile picture`} />
  ) : (
    <div
      style={{
        width: "90px",
        height: "90px",
        backgroundColor: "gray",
        borderRadius: "50%",
      }}
    />
  );

  if (inInbox && !currentUser) throw new Error("Cannot be in inbox without a current user");
  if (inInbox && (!onArchive || !onUnarchive)) throw new Error("Cannot be in inbox without archive functionality");

  return (
    <Card className={`person-card ${className}`} onClick={onClick}>
      <div className="info">
        <div className="top-of-card">
          <div className="left-side">
            <div className="name">{name}</div>
            <div className="email">{email}</div>
            <div className="pronouns">{pronouns}</div>
            <p>Age: {age}</p>
            <p>School: {school}</p>
            <p>Class: {classYear}</p>
          </div>

          <div className="image-container">{profileImage}</div>
        </div>

        <div className="biography">
          <p>Bio: {bio}</p>
        </div>

        <div className="looking-for">
          {budget && <p>Budget: {budget}</p>}
          {startDate && endDate && <p>{`Dates: ${startDate} - ${endDate}`}</p>}
        </div>
      </div>

      <div className="actions-messagebox">
        {/* Below only renders in Inbox page */}
        {inInbox && <PersonCardMessageBox message={lastMessage ?? "Loading most recent message..."} />}

        <div className="actions">
          {inInbox && (
            <>
              {archived ? (
                <Button onClick={() => onUnarchive!(id!, false)} text="Unarchive" className="unarchive" />
              ) : (
                <ArchiveIconButton style={{ width: 40, height: 40 }} onClick={() => onArchive!(id!, false)} />
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
};
