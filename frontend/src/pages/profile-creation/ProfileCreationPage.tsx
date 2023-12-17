import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import marker from "../../assets/addProfilePic.svg";
import Jenny from "../../assets/testprofile.svg";
import { UserContext, UserContextType } from "../../components/UserContext";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { LoadingIndicator } from "../../components/loadingIndicator/loadingIndicator";
import { Modal } from "../../components/modal/Modal";
import { PersonCard } from "../../components/personCard/PersonCard";
import { TextArea } from "../../components/textArea/TextArea";
import { Slug } from "../../types/slug";
import { createUser } from "../../utils/userDataHelper";

export const ProfileCreationPage: React.FC = () => {
  const { setSlug } = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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
  const handlePost = async () => {
    console.log("we here");
    setLoading(true);

    constructedUser.startDate = "2024-06-01";
    constructedUser.endDate = "2024-08-30";
    constructedUser.email = `sample${Math.round(Math.random() * 1000)}@email.com`;

    const newUserData = (await createUser(constructedUser)) as { message: string; user_id: number };

    console.log("User created! Result: ", newUserData);
    constructedUser.id = newUserData.user_id;

    const fullUser: Slug = {
      name: constructedUser.name!,
      pronouns: constructedUser.pronouns!,
      age: constructedUser.age!,
      school: constructedUser.school!,
      classYear: constructedUser.classYear!,
      bio: constructedUser.bio!,
      profilePicUrl: constructedUser.profilePicUrl!,
      startDate: constructedUser.startDate,
      endDate: constructedUser.endDate,
      email: constructedUser.email,
      id: newUserData.user_id,
      budget: "$1300",
      savedListings: [],
      archivedUserIDs: [],
      archivedListingIDs: [],
      sentMessages: [],
      receivedMessages: [],
    };

    setLoading(false);
    setSlug(fullUser);

    navigate("/new-user");
  };

  const constructedUser: Partial<Slug> = {
    name: `${firstName} ${lastName}`,
    pronouns: pronouns,
    age: age.trim() === "" ? undefined : parseInt(age),
    school: affiliation,
    classYear: classYear.trim() === "" ? undefined : parseInt(classYear),
    bio: bio,
    profilePicUrl: Jenny,
  };

  return (
    <div id="profileCreationPageWrapper">
      <div id="profileCreation">
        <div>
          <h1>Let's work on your profile!</h1>

          <div className="section" id="mainDetails">
            <div id="entry">
              <Input value={firstName} onChange={handleFirstNameChange} placeholder="First Name" />
              <Input value={lastName} onChange={handleLastNameChange} placeholder="Last Name" />
              <Input value={pronouns} onChange={handlePronounsChange} placeholder="Pronouns" />
              <Input value={age} onChange={handleAgeChange} numbersOnly={true} maxLength={3} placeholder="Age" />
              <Input value={affiliation} onChange={handleAffiliationChange} placeholder="School + Major/Program" />
              <Input
                value={classYear}
                onChange={handleClassYearChange}
                numbersOnly={true}
                maxLength={4}
                placeholder="Class Year"
              />
            </div>
            <div id="entry">
              <div id="container">
                <img src={marker} alt="Example SVG" />
              </div>
              <div id="container">Share an image for your profile!</div>
            </div>
          </div>
          <div className="section" id="bio">
            <TextArea
              value={bio}
              onChange={handleBioChange}
              placeholder="Bio - tell people more about yourself and why you are looking for a space!"
              style={{ height: "100px" }}
            />
          </div>
        </div>
        <br />
        <Button onClick={handlePost} text="Create Profile" className="action" />
      </div>
      <div id="livePreview">
        <h3>This is what your profile card looks like!</h3>
        <PersonCard person={constructedUser} />
      </div>
      {loading && (
        <Modal
          title="Creating Profile"
          style={{ padding: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}
          showCloseButton={false}
        >
          <p>Getting everything ready for you...</p>
          <LoadingIndicator />
        </Modal>
      )}
    </div>
  );
};
