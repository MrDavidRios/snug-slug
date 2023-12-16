import React from "react";
import { exampleUserA } from "../../utils/inboxtestdata";
import { updateUserData } from "../../utils/userDataHelper";
import { Inbox } from "../inbox/Inbox";

export const InboxTest: React.FC = () => {
  return (
    <div>
      {/* Pass the exampleUser object as a prop to ChatBoxSublessor */}
      {/* <ChatBoxSublessor user={exampleUser} /> */}
      {/* <ChatBox slugA={exampleUserA} slugB={exampleUserB} findingApartment={true}></ChatBox> */}
      <Inbox />
      {/* <ListingsView listings={[sampleListing]} onSelectListing={function (listing: Listing): void {
        throw new Error('Function not implemented.');
      } } selectedListing={null}></ListingsView> */}
      {/* <PersonCardList currentUser={exampleUserA}/> */}
      {/* <PopUpWindow message='Note that by clicking confirm your listing will be no longer be active. To reactivate, go to your profile.'/> */}
      <button
        onClick={async () => {
          const user = await updateUserData(exampleUserA);
          console.log("User added:", user);
        }}
      >
        Test adding sample user A
      </button>
    </div>
  );
};
