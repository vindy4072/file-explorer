import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FileExplorer from "./FileExplorer";
import { Files } from "./constants";

function App() {
  return (
    <div className="App">
      <FileExplorer files={Files} />
    </div>
  );
}

export default App;
