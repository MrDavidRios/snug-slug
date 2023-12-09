import { useState } from "react";
// import { Person } from "../../types/person";
import { Card } from "../card/Card";

import { Slug } from "../../types/slug";
import { PersonCardMessageBox } from "../personCardMessageBox/PersonCardMessageBox";


interface PersonCardProps {
    user: Slug;
    mostRecentChatMessage: string; // to be used only in inbox
}
  
export const PersonCard: React.FC<PersonCardProps> = ({ user, mostRecentChatMessage }) => {
    // const { firstName, lastName, age, affiliation, classYear, bio, personImg, email, budget, dates, pronouns} = person;
    const { name, email, age, school, classYear, pronouns, profilePicUrl, bio, budget, dates }  = user;
  
    const [isLiked, setIsLiked] = useState(false);
  
    const heartColor = isLiked ? "#FF0000" : "#BDBDBD";

    const [isArchived, setIsArchived] = useState(false);
  
    const archiveColor = isArchived ? "#FF0000" : "#BDBDBD";

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

      <Card className="personCard">

        <div className="topOfCard">
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

        {/* <div className="biograhy-container"> */}
          <div className="biography">
              <p>Bio: {bio}</p>
          </div>
        {/* </div> */}

        {/* <hr></hr> */}

        <div className="lookingFor">
            {/* <p>Looking for: </p> */}
            <p>Budget: {budget}</p>
            <p>Dates: {dates}</p>
        </div>

        <div>
        </div>

        <div className="actions-messagebox">

          {/* Below only renders in Inbox page */}
          {mostRecentChatMessage &&
          <PersonCardMessageBox message={mostRecentChatMessage}/>
          }

            <div className="actions">
              <div className="archive" onClick={() => setIsArchived(!isArchived)}>
              <svg width="40" height="40" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2.14307" y="8.57129" width="25.7143" height="17.1429" fill={archiveColor}/>
                  <rect x="0.75" y="0.75" width="28.5" height="7.07143" stroke={archiveColor} stroke-width="1.5"/>
                  <rect x="10.7144" y="15.8569" width="8.57143" height="2.57143" fill="white"/>
              </svg>
              </div>
                
            <div className="heart" onClick={() => setIsLiked(!isLiked)}>
                  {/* Heart icon */}
                  <svg width="40" height="40" viewBox="0 0 55 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.9055 13.3268L27.5493 27.9707L42.1932 13.3268"
                      stroke={heartColor}
                      strokeWidth="25.4675"
                      strokeLinecap="round"
                    /></svg>
            </div>
          </div>
        </div>

      </Card>
    );
  };
  
