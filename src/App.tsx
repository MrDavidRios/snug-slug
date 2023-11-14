import { useState } from "react";
import { Button } from "./components/button/Button";

function App() {
  const [count, setCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);

  let otherOtherCount = 0;

  return (
    <>
      <h1>Snug Slug</h1>
      <div className="card">
        <p>{`Count is ${count}`}</p>
        <p>{`Other count is ${otherCount}`}</p>
        <p>{`Other other count is ${otherOtherCount}`}</p>
        <br />
        <Button onClick={() => setCount((count) => count + 1)} text="Click me!" />
        <Button onClick={() => setOtherCount((count) => count + 1)} text="Click me too!" />
        <Button onClick={() => otherOtherCount++} text="Click me three!" />
      </div>
    </>
  );
}

export default App;
