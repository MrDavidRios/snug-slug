import { Slug } from "../../types/slug";
import { Button } from "../button/Button";
import { ArchiveIconButton } from "../button/archive-button/ArchiveIconButton";
import { Card } from "../card/Card";
import { PersonCardMessageBox } from "../personCardMessageBox/PersonCardMessageBox";

interface PersonCardProps {
  user: Slug;
  mostRecentChatMessage: string; // to be used only in inbox
  displayArchiveButton?: boolean;
  archived: boolean;
  onArchive: (user: Slug) => void;
  onUnarchive: (user: Slug) => void;
}

export const PersonCard: React.FC<PersonCardProps> = ({
  user,
  mostRecentChatMessage,
  displayArchiveButton,
  archived,
  onArchive,
  onUnarchive,
}) => {
  const { name, email, age, school, classYear, pronouns, profilePicUrl, bio, budget, dates } = user;

  // If there is no URL to the profile picture, display a gray circle
  const profileImage = user.profilePicUrl ? (
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

  return (
    <Card className="person-card">
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
          <p>Budget: {budget}</p>
          <p>Dates: {dates}</p>
        </div>
      </div>

      <div className="actions-messagebox">
        {/* Below only renders in Inbox page */}
        {mostRecentChatMessage && <PersonCardMessageBox message={mostRecentChatMessage} />}

        <div className="actions">
          {displayArchiveButton && (
            <>
              {archived ? (
                <Button onClick={() => onUnarchive(user)} text="Unarchive" className="unarchive" />
              ) : (
                <ArchiveIconButton style={{ width: 40, height: 40 }} onClick={() => onArchive(user)} />
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
};
