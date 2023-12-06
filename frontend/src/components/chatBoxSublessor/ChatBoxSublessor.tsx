import { useState } from "react";
import { Slug } from "../../types/slug";

interface ChatBoxSublessorProps {
    user:Slug;
}

export const ChatBoxSublessor: React.FC<ChatBoxSublessorProps> = ({ user }) => {

    // If there is no URL to the profile picture, display a gray circle
    const profileImage = user.profilePicUrl ? (
        <img src={user.profilePicUrl} alt={`${user.name}'s profile picture`} />
      ) : (
        <div style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'gray',
          borderRadius: '50%'
        }} />
      );
      
  return (
    <div id="ChatBoxSublessorContainer">
        <div id="ProfileImg">
           {profileImage}
        </div>
        <div id="ProfileText">
            <div id="UserName">{user.name}</div>
            <div id="Email">{user.email}</div>
            <div id="Details">
                <div>Age: {user.age}</div>
                <div>School: {user.school}</div>
                <div>Class: {user.class}</div>
            </div>
        </div>
    </div>
  );
};
