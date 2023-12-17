import { useState } from "react";
import marker from "../../assets/addProfilePic.svg";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { TextArea } from "../../components/textArea/TextArea";

export const ProfileCreationPage: React.FC = () => {
  // firstName
  const [firstName, setFirstName] = useState("");
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  // firstName
  const [lastName, setLastName] = useState("");
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  // pronouns
  const [pronouns, setPronouns] = useState("");
  const handlePronounsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPronouns(e.target.value);
  };

  // age
  const [age, setAge] = useState("");
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };

  // school affilation
  const [affiliation, setAffiliation] = useState("");
  const handleAffiliationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAffiliation(e.target.value);
  };

  // classYear
  const [classYear, setClassYear] = useState("");
  const handleClassYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClassYear(e.target.value);
  };

  // bio
  const [bio, setBio] = useState("");
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  // post - TO-DO!
  const handlePost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div id="profileCreationPageWrapper">
      <div>
        <h1>Let's work on your profile!</h1>

        <div id="section">
          <div id="entry">
            <div id="entry2">
              <Input value={firstName} onChange={handleFirstNameChange} placeholder="First Name" />
            </div>
            <div id="entry2">
              <Input value={lastName} onChange={handleLastNameChange} placeholder="Last Name" />
            </div>
            <div id="entry2">
              <Input value={pronouns} onChange={handlePronounsChange} placeholder="Pronouns" />
            </div>
            <div id="entry2">
              <Input value={age} onChange={handleAgeChange} placeholder="Age" />
            </div>
            <div id="entry2">
              <Input value={affiliation} onChange={handleAffiliationChange} placeholder="School + Major/Program" />
            </div>
            <div id="entry2">
              <Input value={classYear} onChange={handleClassYearChange} placeholder="Class Year" />
            </div>
          </div>
          <div id="entry">
            <div id="container">
              <img src={marker} alt="Example SVG" />
            </div>
            <div id="container">Share an image for your profile!</div>
          </div>
        </div>
        <div id="section">
          <TextArea
            value={bio}
            onChange={handleBioChange}
            placeholder="Bio - tell people more about yourself and why you are looking for a space!"
            style={{ height: "100px" }}
          />
        </div>
      </div>
      <br />
      <Button onClick={handlePost} text="All done! Ready to share my profile!" className="action" />
    </div>
  );
};
