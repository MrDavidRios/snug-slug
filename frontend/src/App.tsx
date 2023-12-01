import React from "react";
import { Dropdown } from "./components/dropdown/Dropdown";

const App: React.FC = () => {
  return (
    <>
      <div>Snug Slug</div>
      <div className="dropdown-container">
        <Dropdown
          options={["Option 1", "Option 2", "Option 3"]}
          defaultOption="Select an Option"
        />

        <Dropdown
          options={["Option 1", "Option 2", "Option 3"]}
          defaultOption="Select an Option"
        />
      </div>
    </>
  );
};

export default App;
