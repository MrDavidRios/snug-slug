import { useState } from "react";
import { ListingCard } from "./components/apartmentCard/ListingCard";
import { Button } from "./components/button/Button";
import { Dropdown } from "./components/dropdown/Dropdown";
import { Listing } from "./types/listing";

const testListing: Listing = {
  location: "1234 Test Street",
  description: "This is a test description",
  features: ["Test Feature 1", "Test Feature 2", "Test Feature 3"],
  dates: "Test Dates",
  rent: 1234,
  apartmentImg: "https://via.placeholder.com/150",
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Snug Slug</h1>
      <div className="card">
        <p>{`Count is ${count}`}</p>
        <br />
        <Button onClick={() => setCount((count) => count + 1)} text="Click me!" />
        <Dropdown options={["Option 1", "Option 2", "Option 3"]} defaultOption="Select an Option" />
        <ListingCard listing={testListing} locationIndex={0} />
      </div>
    </>
  );
}

export default App;
