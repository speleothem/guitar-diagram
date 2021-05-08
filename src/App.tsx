import React, { useState } from "react";
import Guitar from "./Guitar";
import "./guitar.css";

function App() {
  const [state, setState] = useState();

  return (
    <div className="container">
      {/* @ts-ignore */}
      <Guitar state={state} onChange={setState} />
    </div>
  );
}

export default App;
