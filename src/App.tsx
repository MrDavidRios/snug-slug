import { useState } from "react";
import { Button } from "./components/button/Button";
import { Dropdown } from "./components/dropdown/Dropdown";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Snug Slug</h1>
      <div className="card">
        <p>{`Count is ${count}`}</p>
        <br />
        <Button
          onClick={() => setCount((count) => count + 1)}
          text="Click me!"
        />
        <Dropdown
          options={["Option 1", "Option 2", "Option 3"]}
          defaultOption="Select an Option"
        />
      </div>
    </>
  );
}

export default App;
