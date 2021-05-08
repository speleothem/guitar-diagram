import React, { useState } from "react";
import Guitar, { NotePosition, INITIAL_STATE } from "./Guitar";
import "./guitar.css";

function App() {
  const [state, setState] = useState(INITIAL_STATE);

  function handleClickChangeFunctionWhatever(mcnote: NotePosition) {
    setState({ ...state, selectedRoot: mcnote });
  }

  return (
    <div className="container">
      <Guitar state={state} onChange={handleClickChangeFunctionWhatever} />
    </div>
  );
}

export default App;
