import { Slug } from "../../types/slug";

interface ChatBoxSublessorProps {
  user: Slug;
}

export const ChatBoxSublessor: React.FC<ChatBoxSublessorProps> = ({ user }) => {
  // If there is no URL to the profile picture, display a gray circle
  const profileImage = user.profilePicUrl ? (
    <img src={user.profilePicUrl} alt={`${user.name}'s profile picture`} />
  ) : (
    <div
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "gray",
        borderRadius: "50%",
      }}
    />
  );

  return (
    <div id="chatBoxSublessorContainer">
      <div id="profileImg">{profileImage}</div>
      <div id="profileText">
        <div id="userName">{user.name}</div>
        <div id="email">{user.email}</div>
        <div id="details">
          <div>Age: {user.age}</div>
          <div>School: {user.school}</div>
          <div>Class: {user.class}</div>
        </div>
      </div>
    </div>
  );
};
