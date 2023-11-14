import { useState } from "react";
import { Button } from "./components/button/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Snug Slug</h1>
      <div className="card">
        <p>{`Count is ${count}`}</p>
        <br />
        <Button onClick={() => setCount((count) => count + 1)} text="Click me!" />
      </div>
    </>
  );
}

export default App;
