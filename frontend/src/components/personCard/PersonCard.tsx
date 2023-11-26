import { useState } from "react";
import { Person } from "../../types/person";
import { Card } from "../card/Card";


interface PersonCardProps {
    person: Person;
}
  
export const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
    const { firstName, lastName, age, affiliation, classYear, bio, personImg, email, budget, dates, pronouns} = person;
  
    const [isLiked, setIsLiked] = useState(false);
  
    const heartColor = isLiked ? "#FF0000" : "#BDBDBD";

    const [isArchived, setIsArchived] = useState(false);
  
    const archiveColor = isArchived ? "#FF0000" : "#BDBDBD";
  
    return (

      <Card className="personCard">
        <div className="topOfCard">
          <div className="side"> 
            <div className="name">{firstName + " " + lastName}</div>
            <div className="email">{email}</div>
            <div className="pronouns">{pronouns}</div>
          </div>
          
          <div className="side">
          <div className="imageContainer"><img src={personImg} alt="Profile Picture" /> </div>
          </div>
        </div>
        <div className="aboutMe">
            <p>Age: {age}</p>
            <p>School: {affiliation}</p>
            <p>Class: {classYear}</p>
            <p>Bio: {bio} </p>
        </div>

        <hr></hr>

        <div className="lookingFor">
            <p>Looking for a place: </p>
            <p>Budget: {budget}</p>
            <p>Dates: {dates}</p>
        </div>

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
                />
              </svg>
        </div>
        </div>

      </Card>
    );
  };
  
